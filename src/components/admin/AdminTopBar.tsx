'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import styles from '@/app/admin/admin.module.css';
import { LogOut } from 'lucide-react';

export default function AdminTopBar() {
    const pathname = usePathname();

    // Don't render on login page
    if (pathname === '/admin/login') return null;

    // Simple breadcrumb logic
    const getPageTitle = () => {
        if (pathname === '/admin') return '数据看板 (Dashboard)';
        if (pathname.includes('/products')) return '产品管理 (Products)';
        if (pathname.includes('/solutions')) return '方案管理 (Solutions)';
        if (pathname.includes('/cases')) return '案例管理 (Cases)';
        if (pathname.includes('/media')) return '新闻管理 (Media)';
        if (pathname.includes('/inquiries')) return '询价列表 (Inquiries)';
        return '管理后台';
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/admin/auth', { method: 'DELETE' });
            window.location.href = '/admin/login';
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <header className={styles.topbar}>
            <div className={styles.topbarLeft}>
                {getPageTitle()}
            </div>
            <div className={styles.topbarRight}>
                <span style={{ fontSize: '1.3rem', color: '#94a3b8', fontWeight: 500 }}>管理员: admin</span>
                <button onClick={handleLogout} className={styles.logoutBtn} title="退出登录">
                    <LogOut size={18} /> 退出登录
                </button>
            </div>
        </header>
    );
}
