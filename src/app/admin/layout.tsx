import React from 'react';
import styles from './admin.module.css';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopBar from '@/components/admin/AdminTopBar';

export const metadata = {
    title: 'N-TET Admin',
    robots: 'noindex, nofollow'
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.adminRoot}>
            {/* 魔法样式：彻底隐藏前台的 Header/Footer/StickyBar 等元素 */}
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
    );
}
