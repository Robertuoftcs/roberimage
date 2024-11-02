
import Image from "next/image";
import { Alert } from "@/components/bootstrap";

export const metadata = {
    title: "Random Image",
    description: "A random image from Unsplash dynamiclly",
};

export const revalidate = 0;

export default async function Page() {
    const response = await fetch("https://api.unsplash.com/photos/random?client_id=" + process.env.UNSPLASH_ACCESS_KEY);
    if (!response.ok) {
        console.error("Failed to fetch image from Unsplash", response.status, response.statusText);
        return <div>Error fetching image</div>;
    }

    const image = await response.json();
    console.log("Fetched image data:", image);

    if (!image || !image.urls || !image.urls.regular) {
        console.error("Invalid image data", image);
        return <div>Error fetching image</div>;
    }

    const width = Math.min(image.width, 500);
    const height = Math.round((width / image.width) * image.height);

    return (
        <div className="d-flex flex-column align-items-center">
            <Alert>This page <strong>fetches and caches data dynamiclly everytime you refresh it</strong></Alert>
             <Image
                src={image.urls.regular}
                alt={image.description || "Unsplash Image"}
                width={width}
                height={height}
                priority={true} // Add priority property
                className="rounded shadow mb-3 img-fluid img-thumbnail img-responsive img-rounded" 

            />
            <p>Photo by {image.user.username}</p>
        </div>
    );
}