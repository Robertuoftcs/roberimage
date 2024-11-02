import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import styles from "./TopicPage.module.css";
import { Alert } from "@/components/bootstrap";
import { Metadata } from "next";

interface PageProps {
  params: {
    topic: string;
  };
}

export async function generateStaticParams() {
  return [
    { topic: 'nature' },
    { topic: 'technology' },
    { topic: 'food' },
    // Add more topics as needed
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const topic = params.topic;
  return {
    title: `Images of ${topic}`,
    description: `A collection of ${topic} images from Unsplash`,
  };
}

export default async function Page({ params }: PageProps) {
  const topic = params.topic;
  const response = await fetch(`https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
  const images: UnsplashImage[] = await response.json();

  return (
    <div>
      <Alert>
        This page uses <strong>generateStaticParams</strong> to render and cache static pages at build time, even though the URL has a dynamic parameter.
        Pages that are not included in generateStaticParams will be fetched & rendered on first access and then <strong>cached for subsequent requests</strong> (this can be disabled).
      </Alert>
      <h1>{topic}</h1>
      <div className={styles.imageGrid}>
        {images.map((image) => (
          <Image
            src={image.urls.regular}
            key={image.urls.regular}
            alt={image.description || "Unsplash Image"}
            width={250}
            height={250}
            priority={true}
            className={styles.image}
          />
        ))}
      </div>
    </div>
  );
}