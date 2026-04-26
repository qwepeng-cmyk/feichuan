'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Distinguish between home and inner pages for styling
    const headerClass = `site-header ${isHome ? 'header-home' : 'header-inner'} ${scrolled ? 'scrolled' : ''}`;

    return (
        <>
            {!isHome && (
                <div className="top-utility-bar" style={{
                    height: '34px',
                    backgroundColor: '#444444',
                    color: '#b4b4b4',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '13px',
                    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1001,
                    borderBottom: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '0 20px' }}>
                        <div className="top-bar-left" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <span>We are UAV & Anti-Drone Equipment Specialists</span>
                            <span style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>
                            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#b4b4b4'}>
                                Hotline: +86-xxx-xxxx-xxxx
                            </span>
                        </div>
                        <div className="top-bar-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <span style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>
                            {/* Functional Top Bar Language Switcher */}
                            <div className="top-lang-switch" style={{ position: 'relative' }}>
                                <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', transition: 'color 0.2s' }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = '#fff';
                                        const dd = e.currentTarget.nextSibling as HTMLElement;
                                        if (dd) dd.style.display = 'block';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = '#b4b4b4';
                                        const dd = e.currentTarget.nextSibling as HTMLElement;
                                        if (dd) dd.style.display = 'none';
                                    }}>
                                    Select Language
                                    <svg style={{ width: '10px', height: '10px', marginLeft: '6px' }} viewBox="0 0 1024 1024" fill="currentColor">
                                        <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35.8L492.2 729c9.4 11.5 28.1 11.5 37.5 0L858.9 335.8c12.2-15 1.2-35.8-18.5-35.8z"></path>
                                    </svg>
                                </div>
                                <ul style={{
                                    display: 'none',
                                    position: 'absolute',
                                    top: '100%',
                                    right: 0,
                                    backgroundColor: '#444',
                                    listStyle: 'none',
                                    padding: '10px 0',
                                    margin: 0,
                                    width: '120px',
                                    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                                    zIndex: 1002
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.display = 'block'}
                                    onMouseLeave={(e) => e.currentTarget.style.display = 'none'}>
                                    {['中文', 'Русский', 'Español', 'English'].map(lang => (
                                        <li key={lang} style={{
                                            padding: '8px 15px',
                                            cursor: 'pointer',
                                            fontSize: '12px',
                                            transition: 'background 0.2s'
                                        }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = '#555'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                            {lang}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <header id="site-header" className={headerClass} style={{
                top: !isHome ? '34px' : '0',
                '--mega-top': !isHome ? '114px' : '80px'
            } as any}>
                <div className="container nav-container">
                    <a href="/" className="logo">
                        <img src="/logo.png" alt="N-TET Logo" className="logo-light" style={{ filter: 'brightness(0) invert(1)' }} />
                        <img src="/logo.png" alt="N-TET Logo" className="logo-dark" />
                    </a>

                    <nav className="main-nav">
                        <div className={`nav-item ${pathname === '/' ? 'active' : ''}`}>
                            <a href="/" className="nav-link">Home</a>
                        </div>

                        <div className={`nav-item ${pathname.startsWith('/products') ? 'active' : ''}`}>
                            <a href="/products" className="nav-link">Products</a>
                            <div className="mega-menu">
                                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '50px', width: '100%' }}>
                                    <div className="mega-column">
                                        <h3 className="mega-title">UAV & Drone Systems</h3>
                                        <ul className="mega-list">
                                            <li><a href="#">Multi-Rotor UAVs</a></li>
                                            <li><a href="#">VTOL Fixed-Wing</a></li>
                                            <li><a href="#">Tethered UAVs</a></li>
                                        </ul>
                                    </div>
                                    <div className="mega-column">
                                        <h3 className="mega-title">Anti-Drone / C-UAS</h3>
                                        <ul className="mega-list">
                                            <li><a href="#">Detection Radars</a></li>
                                            <li><a href="#">RF Detection Systems</a></li>
                                        </ul>
                                    </div>
                                    <div className="mega-column">
                                        <h3 className="mega-title">Security Screening</h3>
                                        <ul className="mega-list">
                                            <li><a href="#">X-Ray baggage scanners</a></li>
                                            <li><a href="#">Walk-through metal detectors</a></li>
                                        </ul>
                                    </div>
                                    <div className="mega-column">
                                        <h3 className="mega-title">Defense Logistics</h3>
                                        <ul className="mega-list">
                                            <li><a href="#">Prefabricated Steel Bridges</a></li>
                                            <li><a href="#">Containerized Medical Systems</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`nav-item ${pathname.startsWith('/solutions') ? 'active' : ''}`}>
                            <a href="/solutions" className="nav-link">Solutions</a>
                            <div className="mega-menu">
                                <div className="mega-column">
                                    <h3 className="mega-title">Border Patrol</h3>
                                    <ul className="mega-list">
                                        <li><a href="#">Drone Maritime Patrol</a></li>
                                    </ul>
                                </div>
                                <div className="mega-column">
                                    <h3 className="mega-title">Disaster Rescue</h3>
                                    <ul className="mega-list">
                                        <li><a href="#">Emergency Communication</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className={`nav-item ${pathname.startsWith('/cases') ? 'active' : ''}`}>
                            <Link href="/cases" className="nav-link">Cases</Link>
                        </div>
                        <div className={`nav-item ${pathname.startsWith('/media') || pathname.startsWith('/news') ? 'active' : ''}`}>
                            <Link href="/media" className="nav-link">Media</Link>
                        </div>
                        <div className={`nav-item ${pathname.startsWith('/about') || pathname.startsWith('/contact') ? 'active' : ''}`}>
                            <Link href="/about" className="nav-link">About</Link>
                            <div className="dropdown-menu" style={{ left: 'auto', right: 0 }}>
                                <ul className="dropdown-list">
                                    <li><Link href="/about">About us</Link></li>
                                    <li><Link href="/contact">Contact us</Link></li>
                                </ul>
                            </div>
                        </div>

                        {isHome && (
                            <div className="lang-switch">
                                <div className="lang-switch-text">
                                    English <svg style={{ width: '12px', height: '12px', marginLeft: '5px' }} viewBox="0 0 1024 1024" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35.8L492.2 729c9.4 11.5 28.1 11.5 37.5 0L858.9 335.8c12.2-15 1.2-35.8-18.5-35.8z"></path>
                                    </svg>
                                </div>
                                <ul className="lang-dropdown">
                                    <li>中文</li>
                                    <li>Русский</li>
                                    <li>Español</li>
                                </ul>
                            </div>
                        )}
                    </nav>
                </div>
            </header>
        </>
    );
}
