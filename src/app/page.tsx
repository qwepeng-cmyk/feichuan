'use client';

import React, { useEffect, useState, useRef } from 'react';

const products = [
    {
        top: "Multi-Rotor UAV Platform",
        main: "FC-X6 Multi-Rotor UAV",
        desc: "Engineered with advanced industrial design and one-piece carbon-fiber structure for single-operator deployment and multi-payload mission flexibility.",
        img: "/products/01-uav-drone-systems/uav-systems.png",
        scale: 0.95,
        offsetY: 0
    },
    {
        top: "Anti-Drone Response Platform",
        main: "Portable C-UAS Interception Unit",
        desc: "Portable multi-band suppression architecture for rapid anti-drone response in airports, events, and mission-critical areas.",
        img: "/products/02-anti-drone-cuas/anti-drone-systems.png",
        scale: 1.16,
        offsetY: 2
    },
    {
        top: "Security Screening Platform",
        main: "Smart Electronic Sentinel Suite",
        desc: "Integrates intelligent screening and anomaly recognition to improve throughput and security reliability.",
        img: "/products/03-security-screening/security-policing.png",
        scale: 1.14,
        offsetY: 8
    },
    {
        top: "Defense Logistics Platform",
        main: "Rapid Engineering Deployment Unit",
        desc: "Built for quick deployment and reliable operation in emergency bridges, rescue corridors, and field logistics support.",
        img: "/products/04-defense-engineering/defense-logistics.png",
        scale: 1.12,
        offsetY: 10
    },
    {
        top: "Mobile Medical Platform",
        main: "Containerized Field Hospital Unit",
        desc: "Modular and mobile healthcare infrastructure designed for disaster response and complex mission environments.",
        img: "/products/05-field-mobile-hospitals/field-hospitals.png",
        scale: 1.12,
        offsetY: 14
    },
    {
        top: "Perimeter Intelligence Platform",
        main: "EO-IR Surveillance Node",
        desc: "Combines radar-vision fusion and all-weather monitoring to protect key infrastructure and sensitive zones.",
        img: "/products/06-perimeter-surveillance/perimeter-surveillance.png",
        scale: 1.1,
        offsetY: 12
    }
];

const solutions = [
    {
        id: "01",
        title: "Drone Border Patrol",
        img: "/solutions/01/Drone Border Patrol.png"
    },
    {
        id: "02",
        title: "Large-scale Event Low-Altitude Security",
        img: "/solutions/02/Protection of Critical Facilities.png"
    },
    {
        id: "03",
        title: "Emergency Rescue & Relief",
        img: "/solutions/03/Security of important places 01.png"
    },
    {
        id: "04",
        title: "Industrial Infrastructure Protection",
        img: "/solutions/04/Emergency Relief.png"
    }
];

export default function Home() {
    const [scrolled, setScrolled] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const solutionTrackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const switchProduct = (index: number) => {
        setCurrentIndex(index);
    };

    const currentProduct = products[currentIndex];

    // Drag logic for solutions track
    useEffect(() => {
        const track = solutionTrackRef.current;
        if (!track) return;

        let dragging = false;
        let startX = 0;
        let startLeft = 0;

        const startDrag = (event: PointerEvent) => {
            if (track.scrollWidth <= track.clientWidth) return;
            dragging = true;
            startX = event.clientX;
            startLeft = track.scrollLeft;
            track.classList.add("is-dragging");
            track.setPointerCapture(event.pointerId);
        };

        const dragMove = (event: PointerEvent) => {
            if (!dragging) return;
            const delta = event.clientX - startX;
            track.scrollLeft = startLeft - delta;
        };

        const stopDrag = () => {
            dragging = false;
            track.classList.remove("is-dragging");
        };

        track.addEventListener("pointerdown", startDrag as any);
        track.addEventListener("pointermove", dragMove as any);
        track.addEventListener("pointerup", stopDrag as any);
        track.addEventListener("pointercancel", stopDrag as any);
        
        return () => {
            track.removeEventListener("pointerdown", startDrag as any);
            track.removeEventListener("pointermove", dragMove as any);
            track.removeEventListener("pointerup", stopDrag as any);
            track.removeEventListener("pointercancel", stopDrag as any);
        };
    }, []);

    return (
        <main>
            {/* HEADER / NAVIGATION */}
            <header id="site-header" className={scrolled ? 'scrolled' : ''}>
                <div className="container nav-container">
                    <a href="#" className="logo">
                        <img src="/logo.png" alt="N-TET Logo" className="logo-light" style={{ filter: 'brightness(0) invert(1)' }} />
                        <img src="/logo.png" alt="N-TET Logo" className="logo-dark" />
                    </a>

                    <nav className="main-nav">
                        <div className="nav-item">
                            <div className="nav-link">Home</div>
                        </div>

                        <div className="nav-item">
                            <div className="nav-link">Products</div>
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

                        <div className="nav-item">
                            <div className="nav-link">Solutions</div>
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

                        <div className="nav-item"><div className="nav-link">Cases</div></div>
                        <div className="nav-item"><div className="nav-link">News</div></div>
                        <div className="nav-item"><div className="nav-link">About</div></div>

                        <div className="lang-switch">
                            <div className="lang-switch-text">
                                English <svg style={{ width: '12px', height: '12px', marginLeft: '5px' }} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35.8L492.2 729c9.4 11.5 28.1 11.5 37.5 0L858.9 335.8c12.2-15 1.2-35.8-18.5-35.8z"></path>
                                </svg>
                            </div>
                            <ul className="lang-dropdown">
                                <li>中文</li>
                                <li>Русский</li>
                                <li>Español</li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>

            {/* SCREEN 1: HERO */}
            <section className="hero">
                <video src="/index_banner_bg_1.mp4" autoPlay loop muted playsInline></video>
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <h1 className="hero-title">Global unmanned security field<br />Defense experts</h1>
                    <p className="hero-subtitle">Connecting technology and applications, providing top-tier integrated security services to global clients.</p>
                    <a href="#" className="btn btn-orange">Discover Solutions ↗</a>
                </div>
            </section>

            {/* SCREEN 2: SOLUTIONS */}
            <section className="section-solutions" id="solutions">
                <div className="container">
                    <h2 className="solutions-heading" style={{ textAlign: 'center' }}>Solutions</h2>
                    <div className="solutions-track" id="solutions-track" ref={solutionTrackRef}>
                        {solutions.map((sol) => (
                            <a key={sol.id} className="solution-card" href="#">
                                <div className="solution-media">
                                    <img src={sol.img} alt={sol.title} />
                                </div>
                                <h3 className="solution-title">{sol.title}</h3>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* SCREEN 3: PRODUCT CENTER 2 */}
            <section className="product-center-2" id="product-center-2" style={{ padding: '50px 0 40px', background: '#f2f6ff' }}>
                <div className="container">
                    <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '3.6rem', color: 'var(--primary)' }}>Product Center</h2>
                        <div style={{ width: '60px', height: '4px', background: 'var(--accent)', margin: '20px auto' }}></div>
                    </div>
                    
                    <div className="pc2-stage-wrap" style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                        <button className="pc2-arrow" onClick={() => switchProduct((currentIndex - 1 + products.length) % products.length)} style={{ fontSize: '30px', background: 'none', border: 'none', cursor: 'pointer' }}>&#10094;</button>
                        
                        <div className="pc2-stage" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', alignItems: 'center', flex: 1 }}>
                            <div className="pc2-content">
                                <h3 style={{ color: 'var(--secondary)', fontSize: '2rem', fontWeight: 600, marginBottom: '15px' }}>{currentProduct.top}</h3>
                                <h2 style={{ fontSize: '4.8rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '25px', lineHeight: 1.1 }}>{currentProduct.main}</h2>
                                <p style={{ fontSize: '1.8rem', color: '#555', lineHeight: 1.7, marginBottom: '40px' }}>{currentProduct.desc}</p>
                                <div className="pc2-actions" style={{ display: 'flex', gap: '20px' }}>
                                    <a href="#" className="btn btn-orange">Get the Price Now</a>
                                    <a href="#" className="btn" style={{ border: '1px solid #ddd' }}>View Specifications</a>
                                </div>
                            </div>
                            <div className="pc2-image-wrap" style={{ 
                                textAlign: 'center', 
                                height: '480px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justify_content: 'center',
                                flex: 1
                            }}>
                                <img 
                                    key={currentProduct.main} 
                                    src={currentProduct.img} 
                                    alt={currentProduct.main} 
                                    style={{ 
                                        maxHeight: '100%', 
                                        maxWidth: '100%', 
                                        width: 'auto', 
                                        height: 'auto', 
                                        objectFit: 'contain',
                                        transform: `scale(${currentProduct.scale}) translateY(${currentProduct.offsetY}px)`, 
                                        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' 
                                    }} 
                                />
                            </div>
                        </div>

                        <button className="pc2-arrow" onClick={() => switchProduct((currentIndex + 1) % products.length)} style={{ fontSize: '30px', background: 'none', border: 'none', cursor: 'pointer' }}>&#10095;</button>
                    </div>

                    <div className="pc2-pagination" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '60px', alignItems: 'center' }}>
                        {products.map((_, i) => (
                            <span key={i} className={`pc2-page ${i === currentIndex ? 'active' : ''}`} onClick={() => switchProduct(i)} style={{ cursor: 'pointer', fontSize: '1.6rem', fontWeight: i === currentIndex ? 700 : 400, color: i === currentIndex ? 'var(--accent)' : '#999', transition: '0.3s' }}>
                                {String(i + 1).padStart(2, '0')}
                            </span>
                        ))}
                        <a href="#" style={{ marginLeft: '40px', fontSize: '1.4rem', fontWeight: 700, lettersSpacing: '0.1em', color: 'var(--primary)' }}>ALL PRODUCTS</a>
                    </div>
                </div>
            </section>

            {/* SCREEN 4: CUSTOMER CASES */}
            <section className="section-cases" style={{ padding: '40px 0 100px', background: '#fff' }}>
                <div className="container">
                    <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '3.6rem' }}>Customer Cases</h2>
                    </div>
                    <div className="cases-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="case-card" style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '300px' }}>
                                <img src={`/cases/0${(i % 3) || 3}/case0${(i % 3) || 3}.png`} alt="Case" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div className="case-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', display: 'flex', alignItems: 'flex-end', padding: '30px' }}>
                                    <h3 style={{ color: '#fff', fontSize: '2rem' }}>Case Heading {i}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SCREEN 5: ABOUT US */}
            <section className="aboutus-band" style={{ 
                backgroundImage: 'url(/index/about_bg.jpg)', 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                color: '#fff', 
                height: '600px',
                display: 'flex',
                alignItems: 'center'
            }}>
                {/* Overlay for better text readability */}
                <div style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.4), rgba(0,0,0,0.7))' 
                }}></div>
                
                <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{ maxWidth: '900px' }}>
                        <h2 style={{ fontSize: '4.8rem', fontWeight: 900, marginBottom: '30px', color: '#fff' }}>ABOUT US</h2>
                        <p style={{ fontSize: '2rem', lineHeight: 1.6, marginBottom: '40px', opacity: 0.9 }}>N-TET is a technology-driven enterprise focused on low-altitude security systems, intelligent defense equipment, and integrated mission solutions. We combine R&D, engineering, and delivery to provide reliable deployment capabilities for critical infrastructure, major events, and emergency scenarios worldwide.</p>
                        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                            <a href="#" className="btn btn-orange">Product Center</a>
                            <a href="#" className="btn" style={{ border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(5px)' }}>Learn More</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* SCREEN 6: NEWS */}
            <section className="section-news" style={{ padding: '60px 0 100px', background: '#fff' }}>
                <div className="container">
                    <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '3.6rem', fontWeight: 600, color: '#333', letterSpacing: '2px', textTransform: 'uppercase' }}>News</h2>
                    </div>
                    <div className="news-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
                        {[
                            { 
                                title: "Unlocking the Full Value of Limestone! Industrial processing breakthroughs.", 
                                date: "2026/04/15", 
                                img: "/index/news_drone.png" 
                            },
                            { 
                                title: "N-TET Heavy Industry sincerely invites you to Mining World Russia 2026.", 
                                date: "2026/04/15", 
                                img: "/index/news_drone.png" 
                            },
                            { 
                                title: "N-TET sincerely invites you to Chihuahua International Convention of Mining.", 
                                date: "2026/04/14", 
                                img: "/index/news_drone.png" 
                            }
                        ].map((item, i) => (
                            <div key={i} className="news-card" style={{ 
                                background: '#f8f8f8', 
                                border: '1px solid #eee',
                                overflow: 'hidden', 
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}>
                                <div style={{ height: '220px', overflow: 'hidden' }}>
                                    <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                                </div>
                                <div style={{ padding: '25px' }}>
                                    <h3 style={{ 
                                        fontSize: '1.8rem', 
                                        color: '#333', 
                                        marginBottom: '15px', 
                                        lineHeight: 1.4, 
                                        fontWeight: 500, 
                                        display: '-webkit-box', 
                                        WebkitLineClamp: 2, 
                                        WebkitBoxOrient: 'vertical', 
                                        overflow: 'hidden' 
                                    }}>{item.title}</h3>
                                    <p style={{ color: '#999', fontSize: '1.4rem' }}>{item.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer" style={{ background: '#111', color: '#888', padding: '100px 0 40px' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '80px', marginBottom: '60px' }}>
                        <div>
                            <img src="/logo.png" alt="Logo" style={{ height: '40px', marginBottom: '30px', filter: 'brightness(0) invert(1)' }} />
                            <p style={{ lineHeight: 1.6 }}>Global leader in delivering mission-critical defense and security solutions.</p>
                        </div>
                        <div>
                            <h4 style={{ color: '#fff', marginBottom: '25px' }}>Solutions</h4>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <li>Border Patrol</li>
                                <li>Critical Infrastructure</li>
                                <li>Emergency Rescue</li>
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ color: '#fff', marginBottom: '25px' }}>Products</h4>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <li>UAV Systems</li>
                                <li>C-UAS Technologies</li>
                                <li>Security Screening</li>
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ color: '#fff', marginBottom: '25px' }}>Contact</h4>
                            <p>Email: info@n-tet.com</p>
                        </div>
                    </div>
                    <div style={{ borderTop: '1px solid #222', paddingTop: '40px', textAlign: 'center', fontSize: '1.4rem' }}>
                        © 2026 N-TET Technology. All Rights Reserved.
                    </div>
                </div>
            </footer>

            {/* STICKY BAR */}
            <div className="sticky-inquiry">
                <div className="sticky-item orange">
                    <svg style={{ width: '24px', height: '24px', fill: '#fff' }} viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                    <span>Get Price</span>
                </div>
            </div>
        </main>
    );
}
