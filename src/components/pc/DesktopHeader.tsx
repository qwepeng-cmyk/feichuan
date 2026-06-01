'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { withStaticAssetVersion } from '@/lib/assetVersion';

export default function Header({ locale, dict }: { locale: string; dict: any }) {
    const l = (path: string) => locale === 'en' ? path : `/${locale}${path === '/' ? '' : path}`;
    const logoSrc = withStaticAssetVersion('/logo-header.webp');

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
    const uavCategoryPath = "/products#uav-drone-systems";
    const multiRotorGroup = {
        title: dict.megaMenu.multiRotor,
        image: "/products/uav-systems/FC-YJTX-01-Emergency-Communication-Drone.png",
        imageVariant: "multiRotor",
        items: [
            { label: dict.megaMenu.multiRotor3kgPayload, href: "/products/multi-rotor-3kg-payload-uav" },
            { label: dict.megaMenu.multiRotor8kgPayload, href: "/products/multi-rotor-8kg-payload-uav" },
            { label: dict.megaMenu.multiRotor20kgPayload, href: "/products/multi-rotor-20kg-payload-uav" },
            { label: dict.megaMenu.multiRotor50kgPayload, href: "/products/multi-rotor-50kg-payload-uav" },
        ],
    };
    const uavPlatformGroups = [
        {
            title: dict.megaMenu.vtol,
            image: "/products/uav-systems/FC-DLXJ-01-Power-Grid-Inspection-Drone.webp",
            imageVariant: "vtol",
            items: [
                { label: dict.megaMenu.vtol14kgMtow, href: "/products/vtol-14kg-mtow-uav" },
                { label: dict.megaMenu.vtol26kgMtow, href: "/products/vtol-26kg-mtow-uav" },
                { label: dict.megaMenu.vtol40kgMtow, href: "/products/vtol-40kg-mtow-uav" },
                { label: dict.megaMenu.vtol64kgMtow, href: "/products/vtol-64kg-mtow-uav" },
                { label: dict.megaMenu.vtol135kgMtow, href: "/products/vtol-135kg-mtow-uav" },
            ],
        },
        {
            title: dict.megaMenu.tethered,
            image: "/products/uav-systems/FC-YJXF-01-Aerial-Firefighting-Drone.webp",
            imageVariant: "tethered",
            items: [
                { label: dict.megaMenu.tetheredEmergencyCommunication, href: "/products/fc-yjtx-01-emergency-communication-drone" },
                { label: dict.megaMenu.tetheredEmergencyLighting, href: "/products/fc-yjzm-01-emergency-lighting-drone" },
                { label: dict.megaMenu.tetheredFirefighting, href: "/products/fc-yjxf-01-aerial-firefighting-drone" },
            ],
        },
    ];
    const uavMissionItems = [
        { label: dict.megaMenu.smartSubstationInspection, href: "/products/smart-substation-autonomous-inspection-system" },
        { label: dict.megaMenu.powerTowerInspection, href: "/products/power-tower-inspection-drone" },
        { label: dict.megaMenu.waterConservancyMonitoring, href: "/products/fc-sljc-01-water-conservancy-monitoring-drone" },
        { label: dict.megaMenu.emergencySearchRescue, href: "/products/emergency-search-rescue-drone" },
        { label: dict.megaMenu.emergencyCommunicationUav, href: "/products/fc-yjtx-01-emergency-communication-drone" },
        { label: dict.megaMenu.tetheredLightingUav, href: "/products/fc-yjzm-01-emergency-lighting-drone" },
        { label: dict.megaMenu.highRiseFirefightingUav, href: "/products/fc-yjxf-01-aerial-firefighting-drone" },
    ];
    const productMegaImages = {
        mission: "/products/uav-systems/FC-SLJC-01-Water-Conservancy-Monitoring-Drone.webp",
        security: "/products/security/Deluxe-Smart-Turnstile.webp",
        engineering: "/products/defense-eng/Bailey-Bridge-Steel-Prefab.webp",
        perimeter: "/products/surveillance/FC-DMS10-Series-Smart-Electronic-Sentinel.webp",
    };
    const renderMegaImage = (src: string, alt: string, variant = "standard") => (
        <span className={`mega-title-image mega-title-image-${variant}`} aria-hidden="true">
            <Image
                src={src}
                alt={alt}
                width={240}
                height={120}
                className="mega-title-image-media"
            />
        </span>
    );

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
                                <li style={{ padding: '8px 20px', cursor: 'pointer' }}><Link prefetch={false} href="/">English</Link></li>
                                <li style={{ padding: '8px 20px', cursor: 'pointer' }}><Link prefetch={false} href="/ru">Русский</Link></li>

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
                                <div className="container product-mega-container">
                                    <div className="product-mega-columns">
                                    {/* Column 1: UAV by mission and application */}
                                    <div className="mega-column">
                                        <h3 className="mega-title"><Link prefetch={false} href={l(uavCategoryPath)}>{dict.megaMenu.uavSystems}</Link></h3>
                                        <div>
                                            <div className="mega-sub-header">{dict.megaMenu.byMission}</div>
                                            {renderMegaImage(productMegaImages.mission, dict.megaMenu.byMission, "mission")}
                                            <ul className="mega-list">
                                                {uavMissionItems.map((item) => (
                                                    <li key={item.label}><Link prefetch={false} href={l(item.href)}>{item.label}</Link></li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="mega-menu-group mega-platform-under-mission">
                                            <div className="mega-sub-header">{dict.megaMenu.byFlightPlatform}</div>
                                            <Link prefetch={false} href={l(uavCategoryPath)} className="mega-group-title">{multiRotorGroup.title}</Link>
                                            {renderMegaImage(multiRotorGroup.image, multiRotorGroup.title, multiRotorGroup.imageVariant)}
                                            <ul className="mega-list mega-sub-list">
                                                {multiRotorGroup.items.map((item) => (
                                                    <li key={item.label}><Link prefetch={false} href={l(item.href)}>{item.label}</Link></li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Column 2: UAV by flight platform */}
                                    <div className="mega-column">
                                        <h3 className="mega-title"><Link prefetch={false} href={l(uavCategoryPath)}>{dict.megaMenu.uavSystems}</Link></h3>
                                        <div>
                                            <div className="mega-sub-header">{dict.megaMenu.byFlightPlatform}</div>
                                            {uavPlatformGroups.map((group) => (
                                                <div className="mega-menu-group" key={group.title}>
                                                    <Link prefetch={false} href={l(uavCategoryPath)} className="mega-group-title">{group.title}</Link>
                                                    {group.image && renderMegaImage(group.image, group.title, group.imageVariant)}
                                                    <ul className="mega-list mega-sub-list">
                                                        {group.items.map((item) => (
                                                            <li key={item.label}><Link prefetch={false} href={l(item.href)}>{item.label}</Link></li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Column 3: Drone detection and security screening */}
                                    <div className="mega-column">
                                        <div style={{ marginBottom: '20px' }}>
                                            <h3 className="mega-title"><Link prefetch={false} href={l("/products")}>{dict.megaMenu.droneDetection}</Link></h3>
                                            <div className="mega-sub-header">{dict.megaMenu.detectionTracking}</div>
                                            <ul className="mega-list">
                                                <li><Link prefetch={false} href={l("/products/low-altitude-detection-radar-ku-band")}>{dict.megaMenu.lowAltRadars}</Link></li>
                                                <li><Link prefetch={false} href={l("/products/stationary-rf-detection-system")}>{dict.megaMenu.rfDetection}</Link></li>
                                                <li><Link prefetch={false} href={l("/products/composite-electro-optical-tracking-system")}>{dict.megaMenu.eoTracking}</Link></li>
                                                <li><Link prefetch={false} href={l("/products/uav-remote-id-monitoring-system")}>{dict.megaMenu.remoteId}</Link></li>
                                            </ul>
                                        </div>
                                        <h3 className="mega-title"><Link prefetch={false} href={l("/products#security-screening")}>{dict.megaMenu.securityScreening}</Link></h3>
                                        {renderMegaImage(productMegaImages.security, dict.megaMenu.securityScreening, "security")}
                                        <ul className="mega-list">
                                            <li><Link prefetch={false} href={l("/products/fc6550-standard-x-ray-baggage-scanner")}>{dict.megaMenu.xrayScanner}</Link></li>
                                            <li><Link prefetch={false} href={l("/products/fc-c-lcd-walk-through-metal-detector")}>{dict.megaMenu.walkThrough}</Link></li>
                                            <li><Link prefetch={false} href={l("/products/fc-h-smart-phone-detection-gate")}>{dict.megaMenu.phoneDetection}</Link></li>
                                            <li><Link prefetch={false} href={l("/products/fc-3000-ferromagnetic-detection-column")}>{dict.megaMenu.ferromagnetic}</Link></li>
                                            <li><Link prefetch={false} href={l("/products/fc2088-handheld-metal-detector")}>{dict.megaMenu.handheldMetal}</Link></li>
                                            <li><Link prefetch={false} href={l("/products/fc1800t-desktop-explosives-narcotics-detector")}>{dict.megaMenu.explosiveDetectors}</Link></li>
                                            <li><Link prefetch={false} href={l("/products/fc1500b-desktop-liquid-security-inspector")}>{dict.megaMenu.liquidInspectors}</Link></li>
                                            <li><Link prefetch={false} href={l("/products/fbg-g15-fc06-explosion-containment-vessel")}>{dict.megaMenu.explosionProtection}</Link></li>
                                            <li><Link prefetch={false} href={l("/products/fc902-personal-radiation-dose-alarm")}>{dict.megaMenu.radiationDetectors}</Link></li>
                                            <li><Link prefetch={false} href={l("/products/fc-smart-swing-turnstile")}>{dict.megaMenu.accessControl}</Link></li>
                                        </ul>
                                    </div>

                                    {/* Column 4: Engineering, Medical & Surveillance */}
                                    <div className="mega-column">
                                        <div style={{ marginBottom: '20px' }}>
                                            <h3 className="mega-title"><Link prefetch={false} href={l("/products")}>{dict.megaMenu.engineeringMaterials}</Link></h3>
                                            {renderMegaImage(productMegaImages.engineering, dict.megaMenu.engineeringMaterials, "engineering")}
                                            <ul className="mega-list">
                                                <li><Link prefetch={false} href={l("/products/bailey-bridge")}>{dict.megaMenu.steelBridges}</Link></li>
                                                <li><Link prefetch={false} href={l("/products/bailey-bridge")}>{dict.megaMenu.bridgeComponents}</Link></li>
                                            </ul>
                                        </div>
                                        <div style={{ marginBottom: '20px' }}>
                                            <h3 className="mega-title"><Link prefetch={false} href={l("/products#field-hospitals")}>{dict.megaMenu.fieldHospitals}</Link></h3>
                                            <ul className="mega-list">
                                                <li><Link prefetch={false} href={l("/products/containerized-medical-rescue-system")}>{dict.megaMenu.containerizedMedical}</Link></li>
                                                <li><Link prefetch={false} href={l("/products/intelligent-mobile-cabin-hospital")}>{dict.megaMenu.mobileCabin}</Link></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="mega-title"><Link prefetch={false} href={l("/products#perimeter-intelligence")}>{dict.megaMenu.perimeterSurveillance}</Link></h3>
                                            {renderMegaImage(productMegaImages.perimeter, dict.megaMenu.perimeterSurveillance, "perimeter")}
                                            <ul className="mega-list">
                                                <li><Link prefetch={false} href={l("/products/fc-dms10-smart-electronic-sentinel")}>{dict.megaMenu.smartSentinels}</Link></li>
                                                <li><Link prefetch={false} href={l("/products/fc-rds500-4r-radar-vision-sentinel")}>{dict.megaMenu.radarVision}</Link></li>
                                                <li><Link prefetch={false} href={l("/products/fc-dma-long-range-optical-turntable")}>{dict.megaMenu.multiBandEOIR}</Link></li>
                                                <li><Link prefetch={false} href={l("/products/fc-dtvc-dual-band-thermal-ptz")}>{dict.megaMenu.dualBandThermal}</Link></li>
                                                <li><Link prefetch={false} href={l("/products/fc-rc-series-hd-laser-camera")}>{dict.megaMenu.hdLaser}</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`nav-item ${pathname.startsWith(l('/solutions')) ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <Link prefetch={false} href={l("/solutions")} className="nav-link">{dict?.nav?.solutions || 'Solutions'}</Link>
                            <div className="mega-menu">
                                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(460px, 1.7fr) minmax(200px, 0.9fr) minmax(200px, 0.9fr)', gap: '44px', padding: '25px 0' }}>
                                    <div className="mega-column">
                                        <h3 className="mega-title"><Link prefetch={false} href={l("/solutions")}>{dict?.megaMenu?.uavIndustryApplications || 'UAV Industry Applications'}</Link></h3>
                                        <div className="mega-split-grid">
                                            <ul className="mega-list">
                                                <li><Link prefetch={false} href={l("/solutions/power-line-uav-intelligent-inspection-solution")}>{dict?.megaMenu?.powerLineUavInspection || 'Power Line UAV Intelligent Inspection'}</Link></li>
                                                <li><Link prefetch={false} href={l("/solutions/smart-substation-unattended-uav-inspection-solution")}>{dict?.megaMenu?.smartSubstationUnattendedInspection || 'Smart Substation Unattended Inspection'}</Link></li>
                                                <li><Link prefetch={false} href={l("/solutions/water-conservancy-river-lake-uav-monitoring-solution")}>{dict?.megaMenu?.waterConservancyRiverLakeMonitoring || 'Water Conservancy & River-Lake Monitoring'}</Link></li>
                                                <li><Link prefetch={false} href={l("/solutions/urban-high-rise-firefighting-emergency-uav-solution")}>{dict?.megaMenu?.urbanHighRiseFirefightingRescue || 'Urban High-Rise Firefighting & Rescue'}</Link></li>
                                            </ul>
                                            <ul className="mega-list">
                                                <li><Link prefetch={false} href={l("/solutions/disaster-site-search-rescue-reconnaissance-uav-solution")}>{dict?.megaMenu?.disasterSiteSearchRescueRecon || 'Disaster-Site Search, Rescue & Reconnaissance'}</Link></li>
                                                <li><Link prefetch={false} href={l("/solutions/post-disaster-emergency-communication-support-uav-solution")}>{dict?.megaMenu?.postDisasterEmergencyCommunication || 'Post-Disaster Emergency Communication Support'}</Link></li>
                                                <li><Link prefetch={false} href={l("/solutions/night-emergency-lighting-support-uav-solution")}>{dict?.megaMenu?.nightEmergencyLightingSupport || 'Night Emergency Lighting Support'}</Link></li>
                                                <li><Link prefetch={false} href={l("/solutions/uav-maritime-patrol")}>{dict?.megaMenu?.borderCoastalDefense || 'Border Patrol & Coastal Defense'}</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mega-column">
                                        <h3 className="mega-title"><Link prefetch={false} href={l("/solutions/category/02_InfrastructureProtection")}>{dict?.megaMenu?.infrastructure}</Link></h3>
                                        <ul className="mega-list">
                                            <li><Link prefetch={false} href={l("/solutions/chemical-plant-protection")}>{dict?.megaMenu?.chemicalPlantProtection || 'Chemical Plant Protection'}</Link></li>
                                            <li><Link prefetch={false} href={l("/solutions/oil-production-base-protection")}>{dict?.megaMenu?.oilProductionBaseProtection || 'Oil Production Base Protection'}</Link></li>
                                            <li><Link prefetch={false} href={l("/solutions/hydroelectric-dam-protection")}>{dict?.megaMenu?.hydroelectricDamProtection || 'Hydroelectric Dam Protection'}</Link></li>
                                        </ul>
                                    </div>
                                    <div className="mega-column">
                                        <h3 className="mega-title"><Link prefetch={false} href={l("/solutions/category/03_KeyAreaSecurity")}>{dict?.megaMenu?.keyArea}</Link></h3>
                                        <ul className="mega-list">
                                            <li><Link prefetch={false} href={l("/solutions/judicial-sector-security")}>{dict?.megaMenu?.judicialSectorSecurity || 'Judicial Sector Security'}</Link></li>
                                            <li><Link prefetch={false} href={l("/solutions/sports-event-security")}>{dict?.megaMenu?.sportsEventSecurity || 'Sports Event Security'}</Link></li>
                                            <li><Link prefetch={false} href={l("/solutions/airport-security-protection")}>{dict?.megaMenu?.airportSecurityProtection || 'Airport Security Protection'}</Link></li>
                                        </ul>
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

                        {isHome && (
                            <div className="lang-switch">
                                <div className="lang-switch-text">
                                    {locale === 'ru' ? 'Русский' : 'English'} <svg style={{ width: '12px', height: '12px', marginLeft: '5px' }} viewBox="0 0 1024 1024" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35.8L492.2 729c9.4 11.5 28.1 11.5 37.5 0L858.9 335.8c12.2-15 1.2-35.8-18.5-35.8z"></path>
                                    </svg>
                                </div>
                                <ul className="lang-dropdown">
                                    <li><Link prefetch={false} href="/">English</Link></li>
                                    <li><Link prefetch={false} href="/ru">Русский</Link></li>
                                </ul>
                            </div>
                        )}

                    </nav>
                </div>
            </div>
        </header>
    );
}
