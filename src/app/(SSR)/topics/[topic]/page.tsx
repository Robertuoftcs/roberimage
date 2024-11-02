import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import styles from "./TopicPage.module.css";
import { Alert } from "@/components/bootstrap";
import { Metadata } from "next";

interface PageProps {
    params: { topic: string },
}

export function generateMetadata({ params: {topic} }: PageProps): Metadata {
    return {
        title: `Topic: ${topic}`,
        description: `Images related to the topic ${topic}`,
    };
}

export default async function Page({ params: {topic} }: PageProps) {
    const response = await fetch(`https://api.unsplash.com/photos/random?query=${topic}&count=6&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
    if (!response.ok) {
        console.error("Failed to fetch image from Unsplash", response.status, response.statusText);
        return <div>Error fetching image</div>;
    }

    const images: UnsplashImage[] = await response.json();
    
    return (
        <div>
            <Alert>
                This page fetches and caches data for the topic <strong>{topic}</strong> at build time
            </Alert>
            <h1>{topic}</h1>
            {
                images.map((image) => (
                    <Image
                        src={image.urls.regular}
                        key={image.urls.regular}
                        alt={image.description || "Unsplash Image"}
                        width={250}
                        height={250}
                        priority={true}
                        className={styles.image}
                    />
                ))
            }
        </div>
    );
}