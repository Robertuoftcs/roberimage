"use client";

import { Button } from "react-bootstrap";

interface ErrowPageProps {
    error: Error,
    reset: () => void,
    }

export default function Error({error, reset}: ErrowPageProps)  {
  return (
    <div>
        <h1>Oops! Something went wrong.</h1>
        <p>{error.message}</p>
        <Button onClick={reset}>Try again</Button>
    </div>
  );
}