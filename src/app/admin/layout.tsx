import React from 'react';
import '../globals.css';
import NextTopLoader from 'nextjs-toploader';
import styles from './admin.module.css';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopBar from '@/components/admin/AdminTopBar';

export const metadata = {
    title: 'N-TET Admin',
    robots: 'noindex, nofollow',
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
                <div className={styles.adminRoot}>
                    {/* Keep the admin shell isolated from public chrome. */}
                    <style dangerouslySetInnerHTML={{ __html: `
                        .pc_only_container, .mobile_only_container, footer, .sticky-inquiry, .mobile_only {
                            display: none !important;
                        }
                        body {
                            margin: 0;
                            padding: 0;
                            background-color: #f4f6f9 !important;
                        }
                    `}} />

                    <AdminSidebar />
                    <div className={styles.mainWrapper}>
                        <AdminTopBar />
                        <main className={styles.mainContent}>
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
}
