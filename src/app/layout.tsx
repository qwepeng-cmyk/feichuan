import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: "N-TET - Industrial UAV Systems & Low-Altitude Monitoring",
  description: "Industrial UAV platforms, airspace monitoring equipment, event records, and compliant response workflows for infrastructure operators.",
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
    <html lang="en" dir="ltr" data-locale="en" suppressHydrationWarning>
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
