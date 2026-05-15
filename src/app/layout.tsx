import { Inter, Outfit } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "N-TET - Advanced Defense & Security Solutions",
  description: "Global unmanned security field defense experts",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <NextTopLoader
          color="#315ba4"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #315ba4,0 0 5px #315ba4"
        />
        {children}
      </body>
    </html>
  );
}
