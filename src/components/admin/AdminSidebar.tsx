'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, LayoutGrid, FolderOpen, Newspaper, MessageSquare, ExternalLink, Settings } from 'lucide-react';
import styles from '@/app/admin/admin.module.css';

export default function AdminSidebar() {
    const pathname = usePathname();

    const navItems = [
        { name: '数据看板', path: '/admin', icon: <LayoutDashboard size={20} /> },
        { name: '产品管理', path: '/admin/products', icon: <Package size={20} /> },
        { name: '方案管理', path: '/admin/solutions', icon: <LayoutGrid size={20} /> },
        { name: '案例管理', path: '/admin/cases', icon: <FolderOpen size={20} /> },
        { name: '新闻管理', path: '/admin/media', icon: <Newspaper size={20} /> },
        { name: '询价列表', path: '/admin/inquiries', icon: <MessageSquare size={20} /> },
        { name: '网站设置', path: '/admin/settings', icon: <Settings size={20} /> },
    ];

    // Don't render sidebar on login page
    if (pathname === '/admin/login') return null;

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarLogo}>
                N-TET 管理系统
            </div>
            <nav className={styles.sidebarNav}>
                {navItems.map(item => {
                    // Exact match for dashboard, startswith for others
                    const isActive = item.path === '/admin' 
                        ? pathname === '/admin' 
                        : pathname.startsWith(item.path);

                    return (
                        <Link 
                            key={item.path} 
                            href={item.path}
                            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    );
                })}

                <div style={{ margin: '20px 0', borderTop: '1px solid rgba(255,255,255,0.1)' }} />
                
                <Link 
                    href="/" 
                    target="_blank"
                    className={styles.navItem}
                    style={{ color: '#94a3b8' }}
                >
                    <ExternalLink size={20} />
                    返回前台首页
                </Link>
            </nav>
        </aside>
    );
}
