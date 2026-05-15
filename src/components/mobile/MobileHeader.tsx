'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './MobileHeader.module.css';

export default function MobileHeader({ locale, dict }: { locale: string; dict: any }) {
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
                <Link prefetch={false} href={l("/")} className={styles.logo}>
                    <Image src="/logo1.webp" alt="N-TET" width={120} height={42} style={{ height: '42px', width: 'auto' }} />
                </Link>
                <button className={styles.burger} onClick={() => setMenuOpen(!menuOpen)}>
                    <div className={`${styles.burgerBar} ${menuOpen ? styles.open : ''}`}></div>
                    <div className={`${styles.burgerBar} ${menuOpen ? styles.open : ''}`}></div>
                    <div className={`${styles.burgerBar} ${menuOpen ? styles.open : ''}`}></div>
                </button>
            </div>

            {/* Row 2: Sub-navigation tabs */}
            <div className={styles.subNav}>
                <Link prefetch={false} href={l("/")} className={`${styles.navLink} ${pathname === l("/") ? styles.active : ''}`}>{dict?.mobileNav?.home || 'HOME'}</Link>
                <Link prefetch={false} href={l("/products")} className={`${styles.navLink} ${pathname.startsWith(l('/products')) ? styles.active : ''}`}>{dict?.mobileNav?.product || 'PRODUCTS'}</Link>
                <Link prefetch={false} href={l("/solutions")} className={`${styles.navLink} ${pathname.startsWith(l('/solutions')) ? styles.active : ''}`}>{dict?.mobileNav?.solutions || 'SOLUTIONS'}</Link>
                <Link prefetch={false} href={l("/cases")} className={`${styles.navLink} ${pathname.startsWith(l('/cases')) ? styles.active : ''}`}>{dict?.mobileNav?.cases || 'CASES'}</Link>
            </div>

            {/* Side Drawer Menu */}
            <div className={`${styles.drawerOverlay} ${menuOpen ? styles.show : ''}`} onClick={() => setMenuOpen(false)}>
                <div className={`${styles.drawerContent} ${menuOpen ? styles.open : ''}`} onClick={e => e.stopPropagation()}>
                    <div className={styles.drawerLinks}>
                        {[
                            { name: dict?.nav?.home || 'Home', href: '/' },
                            { name: dict?.nav?.products || 'Products', href: '/products' },
                            { name: dict?.nav?.solutions || 'Solutions', href: '/solutions' },
                            { name: dict?.nav?.cases || 'Cases', href: '/cases' },
                            { name: dict?.nav?.media || 'News', href: '/media' },
                            { name: dict?.nav?.aboutUs || 'About Us', href: '/about' },
                            { name: dict?.nav?.contact || 'Contact', href: '/contact' }
                        ].map((link) => (
                            <Link prefetch={false} href={l(link.href)} key={link.href} className={styles.drawerLink}>
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

