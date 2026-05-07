'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './MobileHeader.module.css';

export default function MobileHeader({ locale }: { locale: string }) {
    const l = (path: string) => locale === 'en' ? path : `/${locale}${path === '/' ? '' : path}`;
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    // Prevent scrolling when drawer is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    return (
        <div className={styles.wrapper}>
            {/* Row 1: Top bar */}
            <div className={styles.topRow}>
                <Link href={l("/")} className={styles.logo}>
                    <img src="/logo1.png" alt="N-TET" style={{ height: '42px' }} />
                </Link>
                <button className={styles.burger} onClick={() => setMenuOpen(!menuOpen)}>
                    <div className={`${styles.burgerBar} ${menuOpen ? styles.open : ''}`}></div>
                    <div className={`${styles.burgerBar} ${menuOpen ? styles.open : ''}`}></div>
                    <div className={`${styles.burgerBar} ${menuOpen ? styles.open : ''}`}></div>
                </button>
            </div>

            {/* Row 2: Sub-navigation tabs */}
            <div className={styles.subNav}>
                <Link href={l("/")} className={`${styles.navLink} ${pathname === l("/") ? styles.active : ''}`}>HOME</Link>
                <Link href={l("/products")} className={`${styles.navLink} ${pathname.startsWith(l('/products')) ? styles.active : ''}`}>PRODUCT</Link>
                <Link href={l("/solutions")} className={`${styles.navLink} ${pathname.startsWith(l('/solutions')) ? styles.active : ''}`}>SOLUTIONS</Link>
                <Link href={l("/cases")} className={`${styles.navLink} ${pathname.startsWith(l('/cases')) ? styles.active : ''}`}>CASES</Link>
            </div>

            {/* Side Drawer Menu */}
            <div className={`${styles.drawerOverlay} ${menuOpen ? styles.show : ''}`} onClick={() => setMenuOpen(false)}>
                <div className={`${styles.drawerContent} ${menuOpen ? styles.open : ''}`} onClick={e => e.stopPropagation()}>
                    <div className={styles.drawerLinks}>
                        {[
                            { name: 'Home', href: '/' },
                            { name: 'Products', href: '/products' },
                            { name: 'Solutions', href: '/solutions' },
                            { name: 'Cases', href: '/cases' },
                            { name: 'Media', href: '/media' },
                            { name: 'About Us', href: '/about' },
                            { name: 'Contact', href: '/contact' }
                        ].map((link) => (
                            <Link href={l(link.href)} key={link.name} className={styles.drawerLink}>
                                <span>{link.name}</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#004a99" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
