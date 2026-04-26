'use client';

import React, { useEffect, useState, useRef } from 'react';
import NEWS_DATA from '../../public/media/news_data.json';

const products = [
    {
        top: "Multi-Rotor UAV Platform",
        main: "FC-X6 Multi-Rotor UAV",
        desc: "Engineered with advanced industrial design and one-piece carbon-fiber structure for single-operator deployment and multi-payload mission flexibility.",
        img: "/products/01-uav-drone-systems/uav-systems.png",
        scale: 0.95,
        offsetY: 0,
        handle: "fc-dlxj-01-power-grid-inspection-drone"
    },
    {
        top: "Anti-Drone Response Platform",
        main: "Portable C-UAS Interception Unit",
        desc: "Portable multi-band suppression architecture for rapid anti-drone response in airports, events, and mission-critical areas.",
        img: "/products/02-anti-drone-cuas/anti-drone-systems.png",
        scale: 1.16,
        offsetY: 2,
        handle: "handheld-integrated-sdr-c-uas"
    },
    {
        top: "Security Screening Platform",
        main: "Smart Electronic Sentinel Suite",
        desc: "Integrates intelligent screening and anomaly recognition to improve throughput and security reliability.",
        img: "/products/03-security-screening/security-policing.png",
        scale: 1.14,
        offsetY: 8,
        handle: "fc-h-smart-phone-detection-gate"
    },
    {
        top: "Defense Logistics Platform",
        main: "Rapid Engineering Deployment Unit",
        desc: "Built for quick deployment and reliable operation in emergency bridges, rescue corridors, and field logistics support.",
        img: "/products/04-defense-engineering/defense-logistics.png",
        scale: 1.12,
        offsetY: 10,
        handle: "bailey-bridge"
    },
    {
        top: "Mobile Medical Platform",
        main: "Containerized Field Hospital Unit",
        desc: "Modular and mobile healthcare infrastructure designed for disaster response and complex mission environments.",
        img: "/products/05-field-mobile-hospitals/field-hospitals.png",
        scale: 1.12,
        offsetY: 14,
        handle: "containerized-medical-rescue-system"
    },
    {
        top: "Perimeter Intelligence Platform",
        main: "EO-IR Surveillance Node",
        desc: "Combines radar-vision fusion and all-weather monitoring to protect key infrastructure and sensitive zones.",
        img: "/products/06-perimeter-surveillance/perimeter-surveillance.png",
        scale: 1.1,
        offsetY: 12,
        handle: "fc-dms10-smart-electronic-sentinel"
    }
];

const solutions = [
    {
        id: "01",
        title: "Drone Border Patrol",
        img: "/solutions/01/Drone Border Patrol.png",
        link: "/solutions/category/01_BorderPatrol"
    },
    {
        id: "02",
        title: "Infrastructure Protection",
        img: "/solutions/02/Protection of Critical Facilities.png",
        link: "/solutions/category/02_InfrastructureProtection"
    },
    {
        id: "03",
        title: "Key Area Security",
        img: "/solutions/03/Security of important places 01.png",
        link: "/solutions/category/03_KeyAreaSecurity"
    },
    {
        id: "04",
        title: "Emergency and Disaster Rescue",
        img: "/solutions/04/Emergency Relief.png",
        link: "/solutions/category/04_EmergencyRescue"
    }
];

const homeCases = [
    {
        title: "Airport Low-Altitude Security",
        handle: "airport-security-application",
        img: "/cases/机场低空安防应用/main.png"
    },
    {
        title: "Pakistan Power Plant Anti-UAV",
        handle: "pakistan-power-plant-anti-uav",
        img: "/cases/巴基斯坦某电厂反无案例/main.png"
    },
    {
        title: "Asian Games Security",
        handle: "asian-games-security",
        img: "/cases/亚运会低空安防应用/main.png"
    },
    {
        title: "Water Conservancy Security",
        handle: "water-conservancy-security",
        img: "/cases/水利设施低空安保/main.png"
    },
    {
        title: "Brazil Refinery Anti-UAV",
        handle: "brazil-refinery-anti-uav",
        img: "/cases/巴西某炼油厂反无案例/main.png"
    },
    {
        title: "Nigeria Factory Anti-UAV",
        handle: "nigeria-factory-anti-uav",
        img: "/cases/尼日利亚某集团工厂反无案例/main.png"
    }
];

export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const solutionTrackRef = useRef<HTMLDivElement>(null);

    // Get latest 3 news
    const latestNews = NEWS_DATA.slice(0, 3);

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
            {/* SCREEN 1: HERO */}
            <section className="hero">
                <video src="/index_banner_bg_1.mp4" autoPlay loop muted playsInline></video>
                <div className="hero-overlay"></div>
                <div className="container-wide hero-content">
                    <h1 className="hero-title">Global unmanned security field<br />Defense experts</h1>
                    <p className="hero-subtitle">Connecting technology and applications, providing top-tier integrated security services to global clients.</p>
                    <a href="/solutions" className="btn btn-orange">Discover Solutions ↗</a>
                </div>
            </section>

            {/* SCREEN 2: SOLUTIONS */}
            <section className="section-solutions" id="solutions">
                <div className="container-wide">
                    <h2 className="solutions-heading" style={{ textAlign: 'center' }}>Solutions</h2>
                    <div className="solutions-track" id="solutions-track" ref={solutionTrackRef}>
                        {solutions.map((sol) => (
                            <a key={sol.id} className="solution-card" href={sol.link}>
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
                <div className="container-wide">
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
                                    <a href="/contact" className="btn btn-orange">Get the Price Now</a>
                                    <a href={`/products/${currentProduct.handle}`} className="btn" style={{ border: '1px solid #ddd' }}>View Specifications</a>
                                </div>
                            </div>
                            <div className="pc2-image-wrap" style={{
                                textAlign: 'center',
                                height: '480px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1
                            }}>
                                <a
                                    href={`/products/${currentProduct.handle}`}
                                    className="pc2-image-link"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '100%',
                                        height: '100%',
                                        transition: 'all 0.5s ease'
                                    }}
                                >
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
                                            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))'
                                        }}
                                    />
                                </a>
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
                        <a href="#" style={{ marginLeft: '40px', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--primary)' }}>ALL PRODUCTS</a>
                    </div>
                </div>
            </section>

            {/* SCREEN 4: CUSTOMER CASES */}
            <section className="section-cases" style={{ padding: '80px 0 100px', background: '#fff' }}>
                <div className="container-wide">
                    <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '3.6rem', fontWeight: 700 }}>Customer Cases</h2>
                        <div style={{ width: '60px', height: '4px', background: 'var(--accent)', margin: '20px auto' }}></div>
                    </div>
                    <div className="cases-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
                        {homeCases.map((item, idx) => (
                            <a
                                key={idx}
                                href={`/cases/${item.handle}`}
                                className="case-card-link"
                                style={{
                                    position: 'relative',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    height: '320px',
                                    display: 'block',
                                    textDecoration: 'none',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                    transition: 'all 0.4s ease'
                                }}
                            >
                                <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
                                <div className="case-overlay" style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                    padding: '30px',
                                    transition: 'background 0.4s ease'
                                }}>
                                    <span style={{ color: 'var(--accent)', fontSize: '1.2rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '10px', display: 'block', letterSpacing: '0.1em' }}>Success Case</span>
                                    <h3 style={{ color: '#fff', fontSize: '2.2rem', fontWeight: 700, margin: 0, lineHeight: 1.2 }}>{item.title}</h3>
                                </div>
                            </a>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '60px' }}>
                        <a href="/cases" className="btn btn-orange" style={{ padding: '15px 40px' }}>VIEW ALL CASES</a>
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

                <div className="container-wide" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
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
                <div className="container-wide">
                    <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '3.6rem', fontWeight: 600, color: '#333', letterSpacing: '2px', textTransform: 'uppercase' }}>News</h2>
                    </div>
                    <div className="news-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
                        {latestNews.map((item, i) => (
                            <a key={i} href={`/media/${item.id}`} className="news-card" style={{
                                background: '#f8f8f8',
                                border: '1px solid #eee',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                textDecoration: 'none',
                                display: 'block'
                            }}>
                                <div style={{ height: '220px', overflow: 'hidden' }}>
                                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                                </div>
                                <div className="news-card-content" style={{ padding: '25px', transition: 'background-color 0.3s ease' }}>
                                    <h3 style={{
                                        fontSize: '1.8rem',
                                        color: '#333',
                                        marginBottom: '15px',
                                        lineHeight: 1.4,
                                        fontWeight: 600,
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        transition: 'color 0.3s ease'
                                    }}>{item.title}</h3>
                                    <p style={{ color: '#999', fontSize: '1.4rem', transition: 'color 0.3s ease' }}>{item.date}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '60px' }}>
                        <a href="/media" className="btn btn-orange" style={{ padding: '15px 40px' }}>VIEW ALL NEWS</a>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .case-card-link:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                }
                .case-card-link:hover img {
                    transform: scale(1.1);
                }
                .case-card-link:hover .case-overlay {
                    background: linear-gradient(to top, rgba(49, 91, 164, 0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%);
                }
                .pc2-image-link:hover img {
                    transform: scale(${parseFloat(currentProduct.scale.toString()) * 1.05}) translateY(${currentProduct.offsetY - 10}px) !important;
                    filter: drop-shadow(0 20px 40px rgba(49, 91, 164, 0.25)) !important;
                }
                .news-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
                    border-color: var(--primary) !important;
                }
                .news-card:hover .news-card-content {
                    background-color: var(--primary) !important;
                }
                .news-card:hover img {
                    transform: scale(1.1);
                }
                .news-card:hover h3, .news-card:hover p {
                    color: #fff !important;
                }
            `}</style>
        </main>
    );
}
