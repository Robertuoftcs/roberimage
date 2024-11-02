import { GetStaticProps, GetStaticPaths } from 'next';
import { UnsplashImage } from '@/models/unsplash-image';
import Image from 'next/image';
import { Alert } from 'react-bootstrap';
import styles from './page.module.css';


export const getStaticPaths: GetStaticPaths = async () => {
  // Define your static paths here
  return {
    paths: [
      { params: { topic: 'nature' } },
      { params: { topic: 'technology' } },
      // Add more paths as needed
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const topic = params?.topic as string;
  const response = await fetch(`https://api.unsplash.com/search/photos?query=${topic}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
  const images: UnsplashImage[] = await response.json();

  return {
    props: {
      params: {
        topic,
      },
      images,
    },
  };
};

export default function Page({ params: { topic }, images }: { params: { topic: string }, images: UnsplashImage[] }) {
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