import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: "N-TET - Industrial Security & Monitoring Solutions",
  description: "Industrial unmanned systems, monitoring equipment, and security technology for critical infrastructure.",
  icons: {
    icon: '/logo-header.webp?v=20260601',
  },
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
      <body className="font-sans antialiased">
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
