'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
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

    return (
        <header id="site-header" className={headerClass} style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            '--mega-top': !isHome ? '112px' : '80px',
            background: isHome && !scrolled ? 'transparent' : '#fff',
            display: 'flex',
            flexDirection: 'column',
            margin: 0,
            padding: 0,
            border: 'none'
        } as any}>
            {/* Top Bar - Now INSIDE fixed header to ensure zero gaps */}
            {!isHome && (
                <div className="top-bar" style={{ 
                    background: '#444444', 
                    color: 'rgba(255,255,255,0.8)', 
                    fontSize: '12px', 
                    height: '32px',
                    width: '100%',
                    display: 'block' // Ensure it's a block container
                }}>
                    <div className="container" style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        height: '100%' 
                    }}>
                        <div>Email: info@n-tet.com</div>
                        
                        {/* Language Selector with Dropdown */}
                        <div className="lang-switch-top" style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                                Select Language <svg style={{ width: '12px', height: '12px' }} viewBox="0 0 1024 1024" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35.8L492.2 729c9.4 11.5 28.1 11.5 37.5 0L858.9 335.8c12.2-15 1.2-35.8-18.5-35.8z"></path>
                                </svg>
                            </div>
                            <ul className="lang-dropdown-inner" style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                background: '#444',
                                listStyle: 'none',
                                padding: '10px 0',
                                margin: 0,
                                width: '120px',
                                boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                                display: 'none',
                                zIndex: 1001
                            }}>
                                <li style={{ padding: '8px 20px', cursor: 'pointer' }}>English</li>
                                <li style={{ padding: '8px 20px', cursor: 'pointer' }}>中文</li>
                                <li style={{ padding: '8px 20px', cursor: 'pointer' }}>Русский</li>
                                <li style={{ padding: '8px 20px', cursor: 'pointer' }}>Español</li>
                            </ul>
                            <style jsx>{`
                                .lang-switch-top:hover .lang-dropdown-inner {
                                    display: block !important;
                                }
                                .lang-dropdown-inner li:hover {
                                    background: #555;
                                    color: #fff;
                                }
                            `}</style>
                        </div>
                    </div>
                </div>
            )}

            {/* Nav Bar Wrap */}
            <div className="nav-bar-wrap" style={{ height: '80px', width: '100%' }}>
                <div className={`${isHome ? "container-wide" : "container"}`} style={{ 
                    height: '100%', 
                    display: 'flex', 
                    alignItems: 'stretch',
                    justifyContent: 'space-between'
                }}>
                    <a href="/" className="logo" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src="/logo.png" alt="N-TET Logo" className="logo-light" style={{ filter: 'brightness(0) invert(1)' }} />
                        <img src="/logo.png" alt="N-TET Logo" className="logo-dark" />
                    </a>

                    <nav className="main-nav" style={{ display: 'flex', height: '100%' }}>
                        <div className={`nav-item ${pathname === '/' ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <a href="/" className="nav-link">Home</a>
                        </div>

                        <div className={`nav-item ${pathname.startsWith('/products') ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <a href="/products" className="nav-link">Products</a>
                            <div className="mega-menu">
                                <div className={isHome ? "container-wide" : "container"} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '50px', padding: '25px 0' }}>
                                    {/* Column 1: UAV Systems */}
                                    <div className="mega-column">
                                        <h3 className="mega-title">UAV & Drone Systems</h3>
                                        <div style={{ marginBottom: '15px' }}>
                                            <div className="mega-sub-header">By Flight Platform</div>
                                            <ul className="mega-list">
                                                <li><a href="/products#uav-drone-systems">Multi-Rotor UAVs</a></li>
                                                <li><a href="/products#uav-drone-systems">VTOL Fixed-Wing UAVs</a></li>
                                                <li><a href="/products#uav-drone-systems">Tethered UAVs</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <div className="mega-sub-header">By Mission & Application</div>
                                            <ul className="mega-list">
                                                <li><a href="/products#uav-drone-systems">Emergency & Rescue</a></li>
                                                <li><a href="/products#uav-drone-systems">Aerial Firefighting</a></li>
                                                <li><a href="/products#uav-drone-systems">Utility & Pipeline Inspection</a></li>
                                                <li><a href="/products#uav-drone-systems">Water & Environmental</a></li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Column 2: Anti-Drone / C-UAS Systems */}
                                    <div className="mega-column">
                                        <h3 className="mega-title">Anti-Drone / C-UAS Systems</h3>
                                        <div style={{ marginBottom: '12px' }}>
                                            <div className="mega-sub-header">Detection & Tracking</div>
                                            <ul className="mega-list">
                                                <li><a href="/products#anti-drone-cuas">Low-Altitude Detection Radars</a></li>
                                                <li><a href="/products#anti-drone-cuas">RF Detection Systems [Stationary & Portable]</a></li>
                                                <li><a href="/products#anti-drone-cuas">Electro-Optical (EO) Tracking Systems</a></li>
                                                <li><a href="/products#anti-drone-cuas">Remote ID & Monitoring Systems</a></li>
                                            </ul>
                                        </div>
                                        <div style={{ marginBottom: '12px' }}>
                                            <div className="mega-sub-header">Interference & Defeat</div>
                                            <ul className="mega-list">
                                                <li><a href="/products#anti-drone-cuas">Handheld Anti-Drone Guns & Shields</a></li>
                                                <li><a href="/products#anti-drone-cuas">RF Jamming Systems [Directional & Omni]</a></li>
                                                <li><a href="/products#anti-drone-cuas">Navigation Spoofing Systems</a></li>
                                                <li><a href="/products#anti-drone-cuas">Active RF Defense Systems</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <div className="mega-sub-header">Integrated Counter-UAS</div>
                                            <ul className="mega-list">
                                                <li><a href="/products#anti-drone-cuas">Portable Integrated C-UAS</a></li>
                                                <li><a href="/products#anti-drone-cuas">Stationary Integrated Defense</a></li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Column 3: Security Screening & Policing */}
                                    <div className="mega-column">
                                        <h3 className="mega-title">Security Screening & Policing</h3>
                                        <ul className="mega-list">
                                            <li><a href="/products#security-screening">X-Ray Baggage & Parcel Scanners</a></li>
                                            <li><a href="/products#security-screening">Metal & Contraband Detection</a></li>
                                            <li><a href="/products#security-screening">Walk-Through Metal Detectors</a></li>
                                            <li><a href="/products#security-screening">Smart Phone Detection Gates</a></li>
                                            <li><a href="/products#security-screening">Ferromagnetic Security Pillars</a></li>
                                            <li><a href="/products#security-screening">Handheld Metal Detectors</a></li>
                                            <li><a href="/products#security-screening">Explosive & Narcotics Detectors</a></li>
                                            <li><a href="/products#security-screening">Hazardous Liquid Inspectors</a></li>
                                            <li><a href="/products#security-screening">Explosion Protection</a></li>
                                            <li><a href="/products#security-screening">Radiation Detectors / Dosimeters</a></li>
                                            <li><a href="/products#security-screening">Access Control Turnstiles</a></li>
                                        </ul>
                                    </div>

                                    {/* Column 4: Engineering, Medical & Surveillance */}
                                    <div className="mega-column">
                                        <div style={{ marginBottom: '20px' }}>
                                            <h3 className="mega-title">Defense Engineering</h3>
                                            <ul className="mega-list">
                                                <li><a href="/products#defense-engineering">Prefabricated Steel Bridges / Bailey Bridges</a></li>
                                                <li><a href="/products#defense-engineering">Bridge Components & Accessories</a></li>
                                            </ul>
                                        </div>
                                        <div style={{ marginBottom: '20px' }}>
                                            <h3 className="mega-title">Field & Mobile Hospitals</h3>
                                            <ul className="mega-list">
                                                <li><a href="/products#field-hospitals">Containerized Medical Systems</a></li>
                                                <li><a href="/products#field-hospitals">Intelligent Mobile Cabin Hospitals</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="mega-title">Perimeter Surveillance</h3>
                                            <ul className="mega-list">
                                                <li><a href="/products#perimeter-intelligence">Smart Electronic Sentinels</a></li>
                                                <li><a href="/products#perimeter-intelligence">Radar-Vision Integration Systems</a></li>
                                                <li><a href="/products#perimeter-intelligence">Multi-Band EO/IR PTZ Cameras</a></li>
                                                <li><a href="/products#perimeter-intelligence">Dual-Band Thermal High-Speed Domes</a></li>
                                                <li><a href="/products#perimeter-intelligence">HD Laser Cameras</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`nav-item ${pathname.startsWith('/solutions') ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <a href="/solutions" className="nav-link">Solutions</a>
                            <div className="mega-menu">
                                <div className={isHome ? "container-wide" : "container"} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '60px', padding: '25px 0' }}>
                                    <div className="mega-column">
                                        <h3 className="mega-title">Border Patrol & Security</h3>
                                        <ul className="mega-list">
                                            <li><a href="/solutions/category/01_BorderPatrol">Drone Maritime Patrol</a></li>
                                            <li><a href="/solutions/category/01_BorderPatrol">Land-Based Maritime Surveillance</a></li>
                                            <li><a href="/solutions/category/01_BorderPatrol">Drone Maritime Emergency Rescue</a></li>
                                        </ul>
                                    </div>
                                    <div className="mega-column">
                                        <h3 className="mega-title">Critical Infrastructure Protection</h3>
                                        <ul className="mega-list">
                                            <li><a href="/solutions/category/02_InfrastructureProtection">Chemical Plant Area Protection</a></li>
                                            <li><a href="/solutions/category/02_InfrastructureProtection">Oil Production Base Protection</a></li>
                                            <li><a href="/solutions/category/02_InfrastructureProtection">Power & Hydroelectric Dam Protection</a></li>
                                            <li><a href="/solutions/category/02_InfrastructureProtection">Airport Anti-drone Application</a></li>
                                        </ul>
                                    </div>
                                    <div className="mega-column">
                                        <h3 className="mega-title">Key Area Security</h3>
                                        <ul className="mega-list">
                                            <li><a href="/solutions/category/03_KeyAreaSecurity">Judicial Department Security</a></li>
                                            <li><a href="/solutions/category/03_KeyAreaSecurity">Large-scale Sports Event Security</a></li>
                                            <li><a href="/solutions/category/03_KeyAreaSecurity">Traffic Hub Security Protection</a></li>
                                        </ul>
                                    </div>
                                    <div className="mega-column">
                                        <h3 className="mega-title">Emergency & Disaster Rescue</h3>
                                        <ul className="mega-list">
                                            <li><a href="/solutions/category/04_EmergencyRescue">Emergency Communication Drone</a></li>
                                            <li><a href="/solutions/category/04_EmergencyRescue">Emergency Reconnaissance Drone</a></li>
                                            <li><a href="/solutions/category/04_EmergencyRescue">Emergency Lighting Drone</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`nav-item ${pathname.startsWith('/cases') ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <Link href="/cases" className="nav-link">Cases</Link>
                        </div>
                        <div className={`nav-item ${pathname.startsWith('/media') || pathname.startsWith('/news') ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <Link href="/media" className="nav-link">Media</Link>
                        </div>
                        <div className={`nav-item ${pathname.startsWith('/about') || pathname.startsWith('/contact') ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
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
            </div>
        </header>
    );
}
