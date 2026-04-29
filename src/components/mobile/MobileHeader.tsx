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
                    <img src="/logo.png" alt="N-TET" style={{ height: '26px' }} />
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
            {menuOpen && (
                <div className={styles.drawerOverlay} onClick={() => setMenuOpen(false)}>
                    <div className={styles.drawerContent} onClick={e => e.stopPropagation()}>
                        <div className={styles.drawerHeader}>Navigation</div>
                        <div className={styles.drawerLinks}>
                            <Link href="/">Home</Link>
                            <Link href="/products">Products</Link>
                            <Link href="/solutions">Solutions</Link>
                            <Link href="/cases">Cases</Link>
                            <Link href="/media">Media</Link>
                            <Link href="/about">About Us</Link>
                            <Link href="/contact">Contact</Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
