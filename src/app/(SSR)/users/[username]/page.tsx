import type { Metadata } from "next";
import { UnsplashUser } from "@/models/unsplash-user";

interface PageProps {
  params: {
    username: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const response = await fetch(`https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
  const user: UnsplashUser = await response.json();

  return {
    title: `${user.username}'s Profile`,
    description: `Profile of ${user.username} on Unsplash`,
  };
}

export default async function Page({ params }: PageProps) {
  const { username } = await params;
  const response = await fetch(`https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
  const user: UnsplashUser = await response.json();

  return (
    <div>
      <h1>{user.username}</h1>
      <p>{user.first_name}</p>
      {/* Add more user details here */}
    </div>
  );
}