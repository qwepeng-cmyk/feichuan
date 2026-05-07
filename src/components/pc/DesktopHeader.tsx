'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header({ locale }: { locale: string }) {
    const l = (path: string) => locale === 'en' ? path : `/${locale}${path === '/' ? '' : path}`;

    const pathname = usePathname();
    const isHome = pathname === '/' || ['/en', '/ru'].some(locale => pathname === locale || pathname === `${locale}/`);
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
                        <div>Email: info@n-tetbj.com</div>
                        
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
                                <li style={{ padding: '8px 20px', cursor: 'pointer' }}><Link href="/">English</Link></li>
                                <li style={{ padding: '8px 20px', cursor: 'pointer' }}><Link href="/ru">Русский</Link></li>

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
                    <Link href={l("/")} className="logo" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src="/logo1.png" alt="N-TET Logo" className="logo-light" style={{ filter: 'brightness(0) invert(1)' }} />
                        <img src="/logo1.png" alt="N-TET Logo" className="logo-dark" />
                    </Link>

                    <nav className="main-nav" style={{ display: 'flex', height: '100%' }}>
                        <div className={`nav-item ${pathname === l("/") ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <Link href={l("/")} className="nav-link">Home</Link>
                        </div>


                        <div className={`nav-item ${pathname.startsWith(l('/products')) ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <Link href={l("/products")} className="nav-link">Products</Link>
                            <div className="mega-menu">
                                <div className={isHome ? "container-wide" : "container"} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '50px', padding: '25px 0' }}>
                                    {/* Column 1: UAV Systems */}
                                    <div className="mega-column">
                                        <h3 className="mega-title"><Link href={l("/products#uav-drone-systems")}>UAV & Drone Systems</Link></h3>
                                        <div style={{ marginBottom: '15px' }}>
                                            <div className="mega-sub-header">By Flight Platform</div>
                                            <ul className="mega-list">
                                                <li><Link href={l("/products#uav-drone-systems")}>Multi-Rotor UAVs</Link></li>
                                                <li><Link href={l("/products#uav-drone-systems")}>VTOL Fixed-Wing UAVs</Link></li>
                                                <li><Link href={l("/products#uav-drone-systems")}>Tethered UAVs</Link></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <div className="mega-sub-header">By Mission & Application</div>
                                            <ul className="mega-list">
                                                <li><Link href={l("/products/fc-yjzc-01-emergency-reconnaissance-drone")}>Emergency & Rescue</Link></li>
                                                <li><Link href={l("/products/fc-yjxf-01-aerial-firefighting-drone")}>Aerial Firefighting</Link></li>
                                                <li><Link href={l("/products/fc-yqxj-01-utility-inspection-drone")}>Utility & Pipeline Inspection</Link></li>
                                                <li><Link href={l("/products/fc-sljc-01-water-conservancy-monitoring-drone")}>Water & Environmental</Link></li>
                                                <li><Link href={l("/products/fc-yjtx-01-emergency-communication-drone")}>Emergency Communication</Link></li>
                                                <li><Link href={l("/products/fc-dlxj-01-power-grid-inspection-drone")}>Power Grid Inspection</Link></li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Column 2: Anti-Drone / C-UAS Systems */}
                                    <div className="mega-column">
                                        <h3 className="mega-title"><Link href={l("/products#anti-drone-cuas")}>Anti-Drone / C-UAS Systems</Link></h3>
                                        <div style={{ marginBottom: '12px' }}>
                                            <div className="mega-sub-header">Detection & Tracking</div>
                                            <ul className="mega-list">
                                                <li><Link href={l("/products/low-altitude-detection-radar-ku-band")}>Low-Altitude Detection Radars</Link></li>
                                                <li><Link href={l("/products/stationary-rf-detection-system")}>RF Detection Systems [Stationary & Portable]</Link></li>
                                                <li><Link href={l("/products/composite-electro-optical-tracking-system")}>Electro-Optical (EO) Tracking Systems</Link></li>
                                                <li><Link href={l("/products/uav-remote-id-monitoring-system")}>Remote ID & Monitoring Systems</Link></li>
                                            </ul>
                                        </div>
                                        <div style={{ marginBottom: '12px' }}>
                                            <div className="mega-sub-header">Interference & Defeat</div>
                                            <ul className="mega-list">
                                                <li><Link href={l("/products/handheld-integrated-multi-band-jammer-gun")}>Handheld Anti-Drone Guns & Shields</Link></li>
                                                <li><Link href={l("/products/omni-directional-rf-jammer")}>RF Jamming Systems [Directional & Omni]</Link></li>
                                                <li><Link href={l("/products/uav-navigation-spoofing-system")}>Navigation Spoofing Systems</Link></li>
                                                <li><Link href={l("/products/stationary-active-rf-defense-system")}>Active RF Defense Systems</Link></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <div className="mega-sub-header">Integrated Counter-UAS</div>
                                            <ul className="mega-list">
                                                <li><Link href={l("/products/portable-integrated-detection-jamming-c-uas-basic")}>Portable Integrated C-UAS</Link></li>
                                                <li><Link href={l("/products/handheld-integrated-sdr-c-uas")}>Handheld Integrated C-UAS</Link></li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Column 3: Security Screening & Policing */}
                                    <div className="mega-column">
                                        <h3 className="mega-title"><Link href={l("/products#security-screening")}>Security Screening & Policing</Link></h3>
                                        <ul className="mega-list">
                                            <li><Link href={l("/products/fc6550-standard-x-ray-baggage-scanner")}>X-Ray Baggage & Parcel Scanners</Link></li>
                                            <li><Link href={l("/products/fc-c-lcd-walk-through-metal-detector")}>Walk-Through Metal Detectors</Link></li>
                                            <li><Link href={l("/products/fc-h-smart-phone-detection-gate")}>Smart Phone Detection Gates</Link></li>
                                            <li><Link href={l("/products/fc-3000-ferromagnetic-detection-column")}>Ferromagnetic Security Pillars</Link></li>
                                            <li><Link href={l("/products/fc2088-handheld-metal-detector")}>Handheld Metal Detectors</Link></li>
                                            <li><Link href={l("/products/fc1800t-desktop-explosives-narcotics-detector")}>Explosive & Narcotics Detectors</Link></li>
                                            <li><Link href={l("/products/fc1500b-desktop-liquid-security-inspector")}>Hazardous Liquid Inspectors</Link></li>
                                            <li><Link href={l("/products/fbg-g15-fc06-explosion-containment-vessel")}>Explosion Protection</Link></li>
                                            <li><Link href={l("/products/fc902-personal-radiation-dose-alarm")}>Radiation Detectors / Dosimeters</Link></li>
                                            <li><Link href={l("/products/fc-smart-swing-turnstile")}>Access Control Turnstiles</Link></li>
                                        </ul>
                                    </div>

                                    {/* Column 4: Engineering, Medical & Surveillance */}
                                    <div className="mega-column">
                                        <div style={{ marginBottom: '20px' }}>
                                            <h3 className="mega-title"><Link href={l("/products#defense-engineering")}>Defense Engineering</Link></h3>
                                            <ul className="mega-list">
                                                <li><Link href={l("/products/bailey-bridge")}>Prefabricated Steel Bridges / Bailey Bridges</Link></li>
                                                <li><Link href={l("/products/bailey-bridge")}>Bridge Components & Accessories</Link></li>
                                            </ul>
                                        </div>
                                        <div style={{ marginBottom: '20px' }}>
                                            <h3 className="mega-title"><Link href={l("/products#field-hospitals")}>Field & Mobile Hospitals</Link></h3>
                                            <ul className="mega-list">
                                                <li><Link href={l("/products/containerized-medical-rescue-system")}>Containerized Medical Systems</Link></li>
                                                <li><Link href={l("/products/intelligent-mobile-cabin-hospital")}>Intelligent Mobile Cabin Hospitals</Link></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="mega-title"><Link href={l("/products#perimeter-intelligence")}>Perimeter Surveillance</Link></h3>
                                            <ul className="mega-list">
                                                <li><Link href={l("/products/fc-dms10-smart-electronic-sentinel")}>Smart Electronic Sentinels</Link></li>
                                                <li><Link href={l("/products/fc-rds500-4r-radar-vision-sentinel")}>Radar-Vision Integration Systems</Link></li>
                                                <li><Link href={l("/products/fc-dma-long-range-optical-turntable")}>Multi-Band EO/IR PTZ Cameras</Link></li>
                                                <li><Link href={l("/products/fc-dtvc-dual-band-thermal-ptz")}>Dual-Band Thermal High-Speed Domes</Link></li>
                                                <li><Link href={l("/products/fc-rc-series-hd-laser-camera")}>HD Laser Cameras</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`nav-item ${pathname.startsWith(l('/solutions')) ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <Link href={l("/solutions")} className="nav-link">Solutions</Link>
                            <div className="mega-menu">
                                <div className={isHome ? "container-wide" : "container"} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '60px', padding: '25px 0' }}>
                                    <div className="mega-column">
                                        <h3 className="mega-title"><Link href={l("/solutions/category/01_BorderPatrol")}>Border Patrol & Security</Link></h3>
                                        <ul className="mega-list">
                                            <li><Link href={l("/solutions/uav-maritime-patrol")}>UAV Maritime Patrol</Link></li>
                                            <li><Link href={l("/solutions/land-based-maritime-surveillance")}>Land-Based Maritime Surveillance</Link></li>
                                            <li><Link href={l("/solutions/uav-maritime-emergency-rescue")}>UAV Maritime Emergency Rescue</Link></li>
                                        </ul>
                                    </div>
                                    <div className="mega-column">
                                        <h3 className="mega-title"><Link href={l("/solutions/category/02_InfrastructureProtection")}>Critical Infrastructure Protection</Link></h3>
                                        <ul className="mega-list">
                                            <li><Link href={l("/solutions/chemical-plant-protection")}>Chemical Plant Protection</Link></li>
                                            <li><Link href={l("/solutions/oil-production-base-protection")}>Oil Production Base Protection</Link></li>
                                            <li><Link href={l("/solutions/power-generation-facility-anti-uav")}>Power Generation Facility Anti-UAV</Link></li>
                                            <li><Link href={l("/solutions/hydroelectric-dam-protection")}>Hydroelectric Dam Protection</Link></li>
                                            <li><Link href={l("/solutions/airport-anti-uav")}>Airport Anti-UAV Application</Link></li>
                                        </ul>
                                    </div>
                                    <div className="mega-column">
                                        <h3 className="mega-title"><Link href={l("/solutions/category/03_KeyAreaSecurity")}>Key Area Security</Link></h3>
                                        <ul className="mega-list">
                                            <li><Link href={l("/solutions/judicial-sector-security")}>Judicial Sector Security</Link></li>
                                            <li><Link href={l("/solutions/sports-event-security")}>Large Sports Event Security</Link></li>
                                            <li><Link href={l("/solutions/airport-security-protection")}>Airport Security Protection</Link></li>
                                        </ul>
                                    </div>
                                    <div className="mega-column">
                                        <h3 className="mega-title"><Link href={l("/solutions/category/04_EmergencyRescue")}>Emergency & Disaster Rescue</Link></h3>
                                        <ul className="mega-list">
                                            <li><Link href={l("/solutions/emergency-communication-uav")}>Emergency Communication UAV</Link></li>
                                            <li><Link href={l("/solutions/emergency-reconnaissance-uav")}>Emergency Reconnaissance UAV</Link></li>
                                            <li><Link href={l("/solutions/emergency-lighting-uav")}>Emergency Lighting UAV</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`nav-item ${pathname.startsWith(l('/cases')) ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <Link href={l("/cases")} className="nav-link">Cases</Link>
                        </div>
                        <div className={`nav-item ${pathname.startsWith(l('/media')) || pathname.startsWith(l('/news')) ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <Link href={l("/media")} className="nav-link">Media</Link>
                        </div>
                        <div className={`nav-item ${pathname.startsWith(l('/about')) || pathname.startsWith(l('/contact')) ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <Link href={l("/about")} className="nav-link">About</Link>
                            <div className="dropdown-menu" style={{ left: 'auto', right: 0 }}>
                                <ul className="dropdown-list">
                                    <li><Link href={l("/about")}>About us</Link></li>
                                    <li><Link href={l("/contact")}>Contact us</Link></li>
                                </ul>
                            </div>
                        </div>

                        {isHome && (
                            <div className="lang-switch">
                                <div className="lang-switch-text">
                                    {locale === 'ru' ? 'Русский' : 'English'} <svg style={{ width: '12px', height: '12px', marginLeft: '5px' }} viewBox="0 0 1024 1024" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35.8L492.2 729c9.4 11.5 28.1 11.5 37.5 0L858.9 335.8c12.2-15 1.2-35.8-18.5-35.8z"></path>
                                    </svg>
                                </div>
                                <ul className="lang-dropdown">
                                    <li><Link href="/">English</Link></li>
                                    <li><Link href="/ru">Русский</Link></li>
                                </ul>
                            </div>
                        )}

                    </nav>
                </div>
            </div>
        </header>
    );
}
