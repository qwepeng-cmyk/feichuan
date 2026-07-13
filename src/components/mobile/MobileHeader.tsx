'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './MobileHeader.module.css';
import { withStaticAssetVersion } from '@/lib/assetVersion';
import { languageLabels } from '@/lib/localization';
import { i18n } from '@/i18n/config';
import { cuasText } from '@/lib/cuasLocaleCopy';

export default function MobileHeader({ locale, dict }: { locale: string; dict: any }) {
    const l = (path: string) => locale === 'en' ? path : `/${locale}${path === '/' ? '' : path}`;
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(Boolean);
    const currentPathWithoutLocale = i18n.locales.includes(pathSegments[0] as any)
        ? `/${pathSegments.slice(1).join('/')}`.replace(/\/$/, '') || '/'
        : pathname || '/';
    const languageLinks = i18n.locales.map((itemLocale) => ({
        locale: itemLocale,
        href: itemLocale === i18n.defaultLocale
            ? (currentPathWithoutLocale === '/' ? '/' : currentPathWithoutLocale)
            : (currentPathWithoutLocale === '/' ? `/${itemLocale}` : `/${itemLocale}${currentPathWithoutLocale}`),
    }));
    const [menuOpen, setMenuOpen] = useState(false);
    const logoSrc = withStaticAssetVersion('/logo-header.webp');

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
                    <Image src={logoSrc} alt="N-TET" width={107} height={64} priority style={{ height: '42px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
                </Link>
                <button
                    className={styles.burger}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={cuasText(locale, menuOpen ? 'Close navigation menu' : 'Open navigation menu')}
                    aria-expanded={menuOpen}
                >
                    <div className={`${styles.burgerBar} ${menuOpen ? styles.open : ''}`}></div>
                    <div className={`${styles.burgerBar} ${menuOpen ? styles.open : ''}`}></div>
                    <div className={`${styles.burgerBar} ${menuOpen ? styles.open : ''}`}></div>
                </button>
            </div>

            {/* Row 2: Sub-navigation tabs */}
            <div className={styles.subNav}>
                <Link prefetch={false} href={l("/")} className={`${styles.navLink} ${pathname === l("/") ? styles.active : ''}`}>{dict?.mobileNav?.home || 'HOME'}</Link>
                <Link prefetch={false} href={l("/products")} className={`${styles.navLink} ${pathname.startsWith(l('/products')) || pathname.startsWith(l('/accessories')) ? styles.active : ''}`}>{dict?.mobileNav?.product || 'PRODUCTS'}</Link>
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
                        <div className={styles.drawerLanguageGroup}>
                            {languageLinks.map((item) => (
                                <Link
                                    key={item.locale}
                                    prefetch={false}
                                    href={item.href}
                                    className={`${styles.drawerLanguageLink} ${locale === item.locale ? styles.activeLanguage : ''}`}
                                >
                                    {languageLabels[item.locale]}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

