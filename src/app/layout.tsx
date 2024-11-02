import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Inter } from 'next/font/google'
import { Container } from '@/components/bootstrap';
import NavBar from "./NavBar";

const inter = Inter({subsets: ["latin"]});

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Robert's nextjs project",
  description: "nextjs project by Robert",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <NavBar />
          <main>
        <Container className="py-4">
          {children}
        </Container>
        </main>
      </body>
    </html>
  );
}
