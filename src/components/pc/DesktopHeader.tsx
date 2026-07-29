'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { withStaticAssetVersion } from '@/lib/assetVersion';
import { localePath } from '@/lib/localePath';
import { CONTACT_EMAIL } from '@/lib/contactSettings';
import type { ProductCategoryId } from '@/lib/productCategoryVisibility';
import { localizedefenseTree } from '@/lib/localeCopy';
import {
    Building2,
    CalendarDays,
    Factory,
    Globe2,
    Landmark,
    Plane,
    ShieldCheck,
    Ship,
    UserRoundCheck,
    Zap,
} from 'lucide-react';

export default function Header({
    locale,
    dict
}: {
    locale: string;
    dict: any;
    visibleProductCategoryIds?: ProductCategoryId[];
    showLaserPreview?: boolean;
}) {
    const l = (path: string) => localePath(locale, path);
    const logoSrc = withStaticAssetVersion('/logo-header.webp');
    const pathname = usePathname();
    const isHome = pathname === '/';
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const headerClass = `site-header ${isHome ? 'header-home' : 'header-inner'} ${scrolled ? 'scrolled' : ''}`;
    const solutionMenuItems = [
        { label: 'Critical Infrastructure', href: '/solutions/critical-infrastructure-airspace-monitoring', icon: Factory },
        { label: 'Power Plants', href: '/solutions/power-plant-airspace-monitoring', icon: Zap },
        { label: 'Airport', href: '/solutions/airport-security-protection', icon: Plane },
        { label: 'Border', href: '/solutions/border-airspace-monitoring', icon: Globe2 },
        { label: 'Public Safety', href: '/solutions/public-safety-airspace-monitoring', icon: ShieldCheck },
        { label: 'Prison', href: '/solutions/correctional-facility-airspace-monitoring', icon: Landmark },
        { label: 'Port Security', href: '/solutions/port-airspace-monitoring', icon: Ship },
        { label: 'Mass Events', href: '/solutions/mass-event-airspace-monitoring', icon: CalendarDays },
        { label: "VIP's and Private Property", href: '/solutions/vip-private-property-airspace-monitoring', icon: UserRoundCheck },
        { label: 'Enterprises', href: '/solutions/enterprise-airspace-monitoring', icon: Building2 },
    ];
    const defenseProductMegaGroups: Array<{
        title: string;
        href: string;
        items: Array<{ label: string; href: string; image?: string }>;
    }> = [
        {
            title: 'Mobile / Portable Low-Altitude Defense',
            href: '/products#portable-defense-devices',
            items: [
                { label: 'PL280H Handheld RF Detection System', href: '/products/handheld-rf-detection-system-mini', image: '/products/02-detection-monitoring/handheld-rf-detection-system-pl280h.webp' },
                { label: 'Portable RF Identification System', href: '/products/portable-rf-detection-case', image: '/products/02-detection-monitoring/portable-rf-detection-case.webp' },
                { label: 'Handheld Integrated SDR Monitoring System', href: '/products/handheld-integrated-sdr-low-altitude-monitoring', image: '/products/rf-systems/portable-integrated-rf-analysis-unit.webp' },
            ],
        },
        {
            title: 'Fixed-Site Low-Altitude Defense',
            href: '/products#fixed-site-defense-systems',
            items: [
                { label: 'Stationary RF Identification System', href: '/products/stationary-rf-detection-system', image: '/products/02-detection-monitoring/stationary-rf-detection-system.webp' },
                { label: 'Low-Altitude Early-Warning Radar (Ku-Band)', href: '/products/low-altitude-detection-radar-ku-band', image: '/products/02-detection-monitoring/low-altitude-detection-radar.webp' },
                { label: 'Low-Altitude Early-Warning Radar (X-Band)', href: '/products/low-altitude-3d-pulse-doppler-radar', image: '/products/02-detection-monitoring/low-altitude-detection-radar-x-band.webp' },
                { label: 'Electro-Optical (EO) Tracking System', href: '/products/composite-electro-optical-tracking-system', image: '/products/02-detection-monitoring/electro-optical-tracking-system.webp' },
                { label: 'Aerial Platform Remote ID Recognition System', href: '/products/aerial-remote-id-monitoring-system', image: '/products/aerial-systems/aerial-Remote-ID-Monitoring-System.webp' },
            ],
        },
        {
            title: 'Vehicle-Mounted Low-Altitude Defense',
            href: '/products#vehicle-mounted-defense',
            items: [
                { label: 'Vehicle-Mounted Low-Altitude Defense Configuration', href: '/products#vehicle-mounted-defense', image: '/solutions/low-altitude-airspace-monitoring/vehicle-mobile-defense.webp' },
            ],
        },
        {
            title: 'Low-Altitude Defense Control Platform',
            href: '/products#defense-control-platform',
            items: [
                { label: 'Low-Altitude Defense Control Platform Configuration', href: '/products#defense-control-platform', image: '/solutions/low-altitude-airspace-monitoring/ppt-platform-interface.webp' },
            ],
        },
    ];
    return localizedefenseTree(locale, (
        <header id="site-header" className={headerClass} style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            '--mega-top': !isHome ? '112px' : '80px',
            background: isHome && !scrolled ? 'transparent' : '#000f24',
            display: 'flex',
            flexDirection: 'column',
            margin: 0,
            padding: 0,
            border: 'none'
        } as any}>
            {/* Top Bar - Now INSIDE fixed header to ensure zero gaps */}
            {!isHome && (
                <div className="top-bar" style={{ 
                    background: '#071a33',
                    color: 'rgba(255,255,255,0.76)',
                    fontSize: '12px', 
                    height: '32px',
                    width: '100%',
                    display: 'block',
                    borderBottom: '1px solid rgba(118, 158, 216, 0.22)'
                }}>
                    <div className="container" style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        height: '100%' 
                    }}>
                        <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            Email: {CONTACT_EMAIL}
                        </a>
                        
                        <Link prefetch={false} href={l("/contact")} className="top-bar-quote-link">
                            <span>{dict?.products?.getQuote || dict?.nav?.contact || 'Get a Quote'}</span>
                            <svg aria-hidden="true" viewBox="0 0 16 16">
                                <path d="M4 12 12 4M6 4h6v6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            )}

            {/* Nav Bar Wrap */}
            <div className="nav-bar-wrap" style={{ height: '80px', width: '100%' }}>
                <div className={isHome ? "container-wide" : "container"} style={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'stretch',
                    justifyContent: 'space-between'
                }}>
                    <Link prefetch={false} href={l("/")} className="logo" style={{ display: 'flex', alignItems: 'center' }}>
                        <Image
                            src={logoSrc}
                            alt="N-TET Logo"
                            width={107}
                            height={64}
                            className="logo-light"
                            priority
                            style={{ height: '48px', width: 'auto', filter: 'brightness(0) invert(1)' }}
                        />
                        <Image
                            src={logoSrc}
                            alt="N-TET Logo"
                            width={107}
                            height={64}
                            className="logo-dark"
                            priority
                            style={{ height: '48px', width: 'auto' }}
                        />
                    </Link>

                    <nav className="main-nav" style={{ display: 'flex', height: '100%' }}>
                        <div className={`nav-item ${pathname === l("/") ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <Link prefetch={false} href={l("/")} className="nav-link">{dict?.nav?.home || 'Home'}</Link>
                        </div>


                        <div className={`nav-item ${pathname.startsWith(l('/products')) ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <Link prefetch={false} href={l("/products")} className="nav-link">{dict?.nav?.products || 'Products'}</Link>
                            <div className="mega-menu">
                                <div className={`container product-mega-container product-mega-container-v2 ${isHome ? 'home-mega-container' : 'inner-mega-container'}`}>
                                    <div className="product-mega-defense-grid">
                                        {defenseProductMegaGroups.map((group) => (
                                            <div className="product-mega-defense-card" key={group.title}>
                                                <div className="product-mega-defense-body">
                                                    <h3 className="mega-title">
                                                        <Link prefetch={false} href={l(group.href)}>{group.title}</Link>
                                                    </h3>
                                                    <ul className="mega-list product-mega-defense-list">
                                                        {group.items.map((item) => (
                                                            <li key={item.href}>
                                                                <Link prefetch={false} href={l(item.href)} className="product-mega-defense-item">
                                                                    <span>{item.label}</span>
                                                                    {item.image && (
                                                                        <span className="product-mega-defense-thumb">
                                                                            <Image
                                                                                src={item.image}
                                                                                alt={item.label}
                                                                                width={220}
                                                                                height={120}
                                                                                className="product-mega-defense-thumb-media"
                                                                            />
                                                                        </span>
                                                                    )}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`nav-item ${pathname.startsWith(l('/solutions')) ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <Link prefetch={false} href={l("/solutions")} className="nav-link">{dict?.nav?.solutions || 'Solutions'}</Link>
                            <div className="mega-menu solutions-mega-menu solutions-mega-menu-english">
                                <div className={`solutions-mega-shell ${isHome ? 'home-mega-container' : 'inner-mega-container'}`}>
                                    <div className="solutions-mega-grid">
                                        {solutionMenuItems.map((item) => {
                                            const Icon = item.icon;
                                            return (
                                                <Link
                                                    prefetch={false}
                                                    href={l(item.href)}
                                                    className="solutions-mega-card"
                                                    key={item.href}
                                                >
                                                    <Icon className="solutions-mega-icon" strokeWidth={1.35} aria-hidden="true" />
                                                    <span>{item.label}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`nav-item ${pathname.startsWith(l('/cases')) ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <Link prefetch={false} href={l("/cases")} className="nav-link">{dict?.nav?.cases || 'Cases'}</Link>
                        </div>
                        <div className={`nav-item ${pathname.startsWith(l('/media')) || pathname.startsWith(l('/news')) ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <Link prefetch={false} href={l("/media")} className="nav-link">{dict?.nav?.media || 'News'}</Link>
                        </div>
                        <div className={`nav-item ${pathname.startsWith(l('/about')) || pathname.startsWith(l('/contact')) ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <Link prefetch={false} href={l("/about")} className="nav-link">{dict?.nav?.about || 'About'}</Link>
                            <div className="dropdown-menu" style={{ left: 'auto', right: 0 }}>
                                <ul className="dropdown-list">
                                    <li><Link prefetch={false} href={l("/about")}>{dict?.nav?.aboutUs || 'About Us'}</Link></li>
                                    <li><Link prefetch={false} href={l("/contact")}>{dict?.nav?.contact || 'Contact'}</Link></li>
                                </ul>
                            </div>
                        </div>

                    </nav>
                </div>
            </div>
        </header>
    ));
}
