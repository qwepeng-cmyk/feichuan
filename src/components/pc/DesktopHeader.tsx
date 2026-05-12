'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header({ locale, dict }: { locale: string; dict: any }) {
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
                                {dict.nav.selectLanguage} <svg style={{ width: '12px', height: '12px' }} viewBox="0 0 1024 1024" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
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
                        <Image 
                            src="/logo1.webp" 
                            alt="N-TET Logo" 
                            width={140} 
                            height={48} 
                            className="logo-light" 
                            style={{ height: '48px', width: 'auto', filter: 'brightness(0) invert(1)' }} 
                        />
                        <Image 
                            src="/logo1.webp" 
                            alt="N-TET Logo" 
                            width={140} 
                            height={48} 
                            className="logo-dark" 
                            style={{ height: '48px', width: 'auto' }}
                        />
                    </Link>

                    <nav className="main-nav" style={{ display: 'flex', height: '100%' }}>
                        <div className={`nav-item ${pathname === l("/") ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <Link href={l("/")} className="nav-link">{dict?.nav?.home || 'Home'}</Link>
                        </div>


                        <div className={`nav-item ${pathname.startsWith(l('/products')) ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <Link href={l("/products")} className="nav-link">{dict?.nav?.products || 'Products'}</Link>
                            <div className="mega-menu">
                                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '50px', padding: '25px 0' }}>
                                    {/* Column 1: UAV Systems */}
                                    <div className="mega-column">
                                        <h3 className="mega-title"><Link href={l("/products#uav-drone-systems")}>{dict.megaMenu.uavSystems}</Link></h3>
                                        <div style={{ marginBottom: '15px' }}>
                                            <div className="mega-sub-header">{dict.megaMenu.byFlightPlatform}</div>
                                            <ul className="mega-list">
                                                <li><Link href={l("/products#uav-drone-systems")}>{dict.megaMenu.multiRotor}</Link></li>
                                                <li><Link href={l("/products#uav-drone-systems")}>{dict.megaMenu.vtol}</Link></li>
                                                <li><Link href={l("/products#uav-drone-systems")}>{dict.megaMenu.tethered}</Link></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <div className="mega-sub-header">{dict.megaMenu.byMission}</div>
                                            <ul className="mega-list">
                                                <li><Link href={l("/products/fc-yjzc-01-emergency-reconnaissance-drone")}>{dict.megaMenu.emergencyRescue}</Link></li>
                                                <li><Link href={l("/products/fc-yjxf-01-aerial-firefighting-drone")}>{dict.megaMenu.aerialFirefighting}</Link></li>
                                                <li><Link href={l("/products/fc-yqxj-01-utility-inspection-drone")}>{dict.megaMenu.utilityInspection}</Link></li>
                                                <li><Link href={l("/products/fc-sljc-01-water-conservancy-monitoring-drone")}>{dict.megaMenu.waterEnvironmental}</Link></li>
                                                <li><Link href={l("/products/fc-yjtx-01-emergency-communication-drone")}>{dict.megaMenu.emergencyComm}</Link></li>
                                                <li><Link href={l("/products/fc-dlxj-01-power-grid-inspection-drone")}>{dict.megaMenu.powerGridInspection}</Link></li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Column 2: Anti-Drone / C-UAS Systems */}
                                    <div className="mega-column">
                                        <h3 className="mega-title"><Link href={l("/products#anti-drone-cuas")}>{dict.megaMenu.antiDrone}</Link></h3>
                                        <div style={{ marginBottom: '12px' }}>
                                            <div className="mega-sub-header">{dict.megaMenu.detectionTracking}</div>
                                            <ul className="mega-list">
                                                <li><Link href={l("/products/low-altitude-detection-radar-ku-band")}>{dict.megaMenu.lowAltRadars}</Link></li>
                                                <li><Link href={l("/products/stationary-rf-detection-system")}>{dict.megaMenu.rfDetection}</Link></li>
                                                <li><Link href={l("/products/composite-electro-optical-tracking-system")}>{dict.megaMenu.eoTracking}</Link></li>
                                                <li><Link href={l("/products/uav-remote-id-monitoring-system")}>{dict.megaMenu.remoteId}</Link></li>
                                            </ul>
                                        </div>
                                        <div style={{ marginBottom: '12px' }}>
                                            <div className="mega-sub-header">{dict.megaMenu.interference}</div>
                                            <ul className="mega-list">
                                                <li><Link href={l("/products/handheld-integrated-multi-band-jammer-gun")}>{dict.megaMenu.handheldGuns}</Link></li>
                                                <li><Link href={l("/products/omni-directional-rf-jammer")}>{dict.megaMenu.rfJamming}</Link></li>
                                                <li><Link href={l("/products/uav-navigation-spoofing-system")}>{dict.megaMenu.navSpoofing}</Link></li>
                                                <li><Link href={l("/products/stationary-active-rf-defense-system")}>{dict.megaMenu.activeRfDefense}</Link></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <div className="mega-sub-header">{dict.megaMenu.integratedCUAS}</div>
                                            <ul className="mega-list">
                                                <li><Link href={l("/products/portable-integrated-detection-jamming-c-uas-basic")}>{dict.megaMenu.portableCUAS}</Link></li>
                                                <li><Link href={l("/products/handheld-integrated-sdr-c-uas")}>{dict.megaMenu.handheldCUAS}</Link></li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Column 3: Security Screening & Policing */}
                                    <div className="mega-column">
                                        <h3 className="mega-title"><Link href={l("/products#security-screening")}>{dict.megaMenu.securityScreening}</Link></h3>
                                        <ul className="mega-list">
                                            <li><Link href={l("/products/fc6550-standard-x-ray-baggage-scanner")}>{dict.megaMenu.xrayScanner}</Link></li>
                                            <li><Link href={l("/products/fc-c-lcd-walk-through-metal-detector")}>{dict.megaMenu.walkThrough}</Link></li>
                                            <li><Link href={l("/products/fc-h-smart-phone-detection-gate")}>{dict.megaMenu.phoneDetection}</Link></li>
                                            <li><Link href={l("/products/fc-3000-ferromagnetic-detection-column")}>{dict.megaMenu.ferromagnetic}</Link></li>
                                            <li><Link href={l("/products/fc2088-handheld-metal-detector")}>{dict.megaMenu.handheldMetal}</Link></li>
                                            <li><Link href={l("/products/fc1800t-desktop-explosives-narcotics-detector")}>{dict.megaMenu.explosiveDetectors}</Link></li>
                                            <li><Link href={l("/products/fc1500b-desktop-liquid-security-inspector")}>{dict.megaMenu.liquidInspectors}</Link></li>
                                            <li><Link href={l("/products/fbg-g15-fc06-explosion-containment-vessel")}>{dict.megaMenu.explosionProtection}</Link></li>
                                            <li><Link href={l("/products/fc902-personal-radiation-dose-alarm")}>{dict.megaMenu.radiationDetectors}</Link></li>
                                            <li><Link href={l("/products/fc-smart-swing-turnstile")}>{dict.megaMenu.accessControl}</Link></li>
                                        </ul>
                                    </div>

                                    {/* Column 4: Engineering, Medical & Surveillance */}
                                    <div className="mega-column">
                                        <div style={{ marginBottom: '20px' }}>
                                            <h3 className="mega-title"><Link href={l("/products#defense-engineering")}>{dict.megaMenu.defenseEngineering}</Link></h3>
                                            <ul className="mega-list">
                                                <li><Link href={l("/products/bailey-bridge")}>{dict.megaMenu.steelBridges}</Link></li>
                                                <li><Link href={l("/products/bailey-bridge")}>{dict.megaMenu.bridgeComponents}</Link></li>
                                            </ul>
                                        </div>
                                        <div style={{ marginBottom: '20px' }}>
                                            <h3 className="mega-title"><Link href={l("/products#field-hospitals")}>{dict.megaMenu.fieldHospitals}</Link></h3>
                                            <ul className="mega-list">
                                                <li><Link href={l("/products/containerized-medical-rescue-system")}>{dict.megaMenu.containerizedMedical}</Link></li>
                                                <li><Link href={l("/products/intelligent-mobile-cabin-hospital")}>{dict.megaMenu.mobileCabin}</Link></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="mega-title"><Link href={l("/products#perimeter-intelligence")}>{dict.megaMenu.perimeterSurveillance}</Link></h3>
                                            <ul className="mega-list">
                                                <li><Link href={l("/products/fc-dms10-smart-electronic-sentinel")}>{dict.megaMenu.smartSentinels}</Link></li>
                                                <li><Link href={l("/products/fc-rds500-4r-radar-vision-sentinel")}>{dict.megaMenu.radarVision}</Link></li>
                                                <li><Link href={l("/products/fc-dma-long-range-optical-turntable")}>{dict.megaMenu.multiBandEOIR}</Link></li>
                                                <li><Link href={l("/products/fc-dtvc-dual-band-thermal-ptz")}>{dict.megaMenu.dualBandThermal}</Link></li>
                                                <li><Link href={l("/products/fc-rc-series-hd-laser-camera")}>{dict.megaMenu.hdLaser}</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`nav-item ${pathname.startsWith(l('/solutions')) ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <Link href={l("/solutions")} className="nav-link">{dict?.nav?.solutions || 'Solutions'}</Link>
                            <div className="mega-menu">
                                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '60px', padding: '25px 0' }}>
                                    <div className="mega-column">
                                        <h3 className="mega-title"><Link href={l("/solutions/category/01_BorderPatrol")}>{dict.megaMenu.borderPatrol}</Link></h3>
                                        <ul className="mega-list">
                                            <li><Link href={l("/solutions/uav-maritime-patrol")}>{dict.megaMenu.multiRotor}</Link></li>
                                            <li><Link href={l("/solutions/land-based-maritime-surveillance")}>{dict.megaMenu.perimeterSurveillance}</Link></li>
                                            <li><Link href={l("/solutions/uav-maritime-emergency-rescue")}>{dict.megaMenu.emergencyRescue}</Link></li>
                                        </ul>
                                    </div>
                                    <div className="mega-column">
                                        <h3 className="mega-title"><Link href={l("/solutions/category/02_InfrastructureProtection")}>{dict?.megaMenu?.infrastructure}</Link></h3>
                                        <ul className="mega-list">
                                            <li><Link href={l("/solutions/chemical-plant-protection")}>{dict?.megaMenu?.chemicalPlantProtection || 'Chemical Plant Protection'}</Link></li>
                                            <li><Link href={l("/solutions/oil-production-base-protection")}>{dict?.megaMenu?.oilProductionBaseProtection || 'Oil Production Base Protection'}</Link></li>
                                            <li><Link href={l("/solutions/power-generation-facility-anti-uav")}>{dict?.megaMenu?.powerGenerationFacilityAntiUAV || 'Power Generation Facility Anti-UAV'}</Link></li>
                                            <li><Link href={l("/solutions/hydroelectric-dam-protection")}>{dict?.megaMenu?.hydroelectricDamProtection || 'Hydroelectric Dam Protection'}</Link></li>
                                            <li><Link href={l("/solutions/airport-anti-uav")}>{dict?.megaMenu?.airportAntiUAV || 'Airport Anti-UAV'}</Link></li>
                                        </ul>
                                    </div>
                                    <div className="mega-column">
                                        <h3 className="mega-title"><Link href={l("/solutions/category/03_KeyAreaSecurity")}>{dict?.megaMenu?.keyArea}</Link></h3>
                                        <ul className="mega-list">
                                            <li><Link href={l("/solutions/judicial-sector-security")}>{dict?.megaMenu?.judicialSectorSecurity || 'Judicial Sector Security'}</Link></li>
                                            <li><Link href={l("/solutions/sports-event-security")}>{dict?.megaMenu?.sportsEventSecurity || 'Sports Event Security'}</Link></li>
                                            <li><Link href={l("/solutions/airport-security-protection")}>{dict?.megaMenu?.airportSecurityProtection || 'Airport Security Protection'}</Link></li>
                                        </ul>
                                    </div>
                                    <div className="mega-column">
                                        <h3 className="mega-title"><Link href={l("/solutions/category/04_EmergencyRescue")}>{dict?.megaMenu?.emergencyDisaster}</Link></h3>
                                        <ul className="mega-list">
                                            <li><Link href={l("/solutions/emergency-communication-uav")}>{dict?.megaMenu?.emergencyComm || 'Emergency Communication'}</Link></li>
                                            <li><Link href={l("/solutions/emergency-reconnaissance-uav")}>{dict?.megaMenu?.emergencyRescue || 'Emergency Reconnaissance'}</Link></li>
                                            <li><Link href={l("/solutions/emergency-lighting-uav")}>{dict?.megaMenu?.emergencyLightingUAV || 'Emergency Lighting'}</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`nav-item ${pathname.startsWith(l('/cases')) ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <Link href={l("/cases")} className="nav-link">{dict?.nav?.cases || 'Cases'}</Link>
                        </div>
                        <div className={`nav-item ${pathname.startsWith(l('/media')) || pathname.startsWith(l('/news')) ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <Link href={l("/media")} className="nav-link">{dict?.nav?.media || 'News'}</Link>
                        </div>
                        <div className={`nav-item ${pathname.startsWith(l('/about')) || pathname.startsWith(l('/contact')) ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <Link href={l("/about")} className="nav-link">{dict?.nav?.about || 'About'}</Link>
                            <div className="dropdown-menu" style={{ left: 'auto', right: 0 }}>
                                <ul className="dropdown-list">
                                    <li><Link href={l("/about")}>{dict?.nav?.aboutUs || 'About Us'}</Link></li>
                                    <li><Link href={l("/contact")}>{dict?.nav?.contact || 'Contact'}</Link></li>
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
