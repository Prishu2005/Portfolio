import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Prishu Kumar — AI-Focused Full-Stack Developer",
  description:
    "Portfolio of Prishu Kumar, an AI-focused Full-Stack Software Developer specializing in MERN stack, Generative AI integration, and building intelligent web applications.",
  keywords: [
    "Prishu Kumar",
    "Full-Stack Developer",
    "AI Developer",
    "MERN Stack",
    "React",
    "Node.js",
    "Generative AI",
    "Portfolio",
  ],
  authors: [{ name: "Prishu Kumar" }],
  openGraph: {
    title: "Prishu Kumar — AI-Focused Full-Stack Developer",
    description:
      "Building intelligent full-stack applications with MERN stack and Generative AI.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prishu Kumar — AI-Focused Full-Stack Developer",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="noise-bg grid-overlay antialiased">
        {children}
      </body>
    </html>
  );
}
