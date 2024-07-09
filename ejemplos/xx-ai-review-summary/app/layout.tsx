import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { games } from "@/lib/data";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Review summary",
  description: "AI summaries of user reviews for videogames",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="flex justify-around py-4 border-b mb-8">
          {Object.entries(games).map(([gameId, gameName]) => (
            <Link
              key={gameId}
              className="text-lg font-semibold"
              href={`/${gameId}`}
            >
              {gameName}
            </Link>
          ))}
        </nav>
        <main className="pt-6">{children}</main>
      </body>
    </html>
  );
}
