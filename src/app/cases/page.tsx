'use client';

import React from 'react';

export default function CasesPage() {
    // Standardized Case Data mapping to ProductCard Structure
    const cases = [
        { name: "UAV Maritime Emergency Search & Rescue", handle: "maritime-rescue", image: "/case_banner/3.png" },
        { name: "Border Security & Perimeter Intelligence", handle: "border-security", image: "/case_banner/1.png" },
        { name: "Critical Infrastructure Anti-Drone Protection", handle: "infrastructure-protection", image: "/case_banner/4.png" },
        { name: "Urban Public Safety & Event Surveillance", handle: "urban-safety", image: "/case_banner/8.png" },
        { name: "Industrial Forest Fire Prevention & Patrol", handle: "fire-prevention", image: "/case_banner/5.png" },
        { name: "Strategic Logistic Port Monitoring", handle: "port-monitoring", image: "/case_banner/6.png" }
    ];

    return (
        <div className="cases-page" style={{ paddingTop: '114px', backgroundColor: '#fff' }}>
            <main>
                {/* 1. HERO BANNER (Sync with latest asset) */}
                <section className="product-banner" style={{
                    height: '40vh',
                    minHeight: '320px',
                    backgroundImage: "url('/cases/case_banner_final_副本2.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', zIndex: 0 }}></div>
                    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ maxWidth: '800px' }}>
                            <h1 style={{ fontSize: '5.2rem', fontWeight: 900, color: '#fff', marginBottom: '15px', lineHeight: 1.1, textTransform: 'uppercase', letterSpacing: '4px' }}>Global Cases</h1>
                            <p style={{ fontSize: '2rem', color: '#fff', lineHeight: 1.5, opacity: 0.9 }}>Connected professional technology with tactical applications for a more secure world.</p>
                        </div>
                    </div>
                </section>

                {/* 2. CASE LISTS (Sync with Product Center: 3-Column Grid) */}
                <div className="product-lists-wrap" style={{ padding: '80px 0', backgroundColor: '#fcfdfe' }}>
                    <div className="container">
                        <div className="product-grid" style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '30px'
                        }}>
                            {cases.map((item, idx) => (
                                <a
                                    key={idx}
                                    href={`/cases/${item.handle}`}
                                    className="p-card-sbm"
                                    style={{
                                        display: 'block',
                                        background: '#fff',
                                        border: '1px solid #f0f0f0',
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        overflow: 'hidden'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-10px)';
                                        e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
                                        e.currentTarget.style.borderColor = '#315ba4';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                        e.currentTarget.style.borderColor = '#f0f0f0';
                                    }}
                                >
                                    <div className="p-card-img" style={{
                                        width: '100%',
                                        aspectRatio: '16 / 9',
                                        background: '#1a1a1a',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden'
                                    }}>
                                        <img src={item.image} alt={item.name} style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.5s ease'
                                        }} />
                                    </div>
                                    <div className="p-card-content" style={{ padding: '30px', textAlign: 'center', borderTop: '1px solid #eee' }}>
                                        <h3 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#333', margin: 0 }}>{item.name}</h3>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
