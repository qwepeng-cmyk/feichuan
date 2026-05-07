'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './MobileHeader.module.css';

export default function MobileHeader() {
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
                <Link href="/" className={styles.logo}>
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
                <Link href="/" className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}>HOME</Link>
                <Link href="/products" className={`${styles.navLink} ${pathname.startsWith('/products') ? styles.active : ''}`}>PRODUCT</Link>
                <Link href="/solutions" className={`${styles.navLink} ${pathname.startsWith('/solutions') ? styles.active : ''}`}>SOLUTIONS</Link>
                <Link href="/cases" className={`${styles.navLink} ${pathname.startsWith('/cases') ? styles.active : ''}`}>CASES</Link>
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
                            <Link href={link.href} key={link.name} className={styles.drawerLink}>
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
