'use client';

import React from 'react';
import InquiryForm from '@/components/products/InquiryForm';
import CategoryNav from '@/components/products/CategoryNav';

interface Solution {
    id: string;
    title_en: string;
    main_image?: string;
    category_id: string;
}

export default function SolutionCenterClient({ allSolutions }: { allSolutions: Solution[] }) {
    const CATEGORY_NAMES: Record<string, string> = {
        '01_BorderPatrol': 'Border Patrol',
        '02_InfrastructureProtection': 'Infrastructure Protection',
        '03_KeyAreaSecurity': 'Key Area Security',
        '04_EmergencyRescue': 'Emergency & Disaster Rescue'
    };

    const CATEGORY_ICONS: Record<string, React.ReactNode> = {
        '01_BorderPatrol': (
            <svg viewBox="0 0 48 48" fill="none" stroke="#315ba4" strokeWidth="1.2">
                <path d="M24 4L4 12v12c0 11 10 20 20 20s20-9 20-20V12L24 4z" fill="rgba(49, 91, 164, 0.05)" />
                <circle cx="24" cy="22" r="8" />
                <path d="M24 14v16M16 22h16" />
                <path d="M10 38l4-4M38 38l-4-4" />
            </svg>
        ),
        '02_InfrastructureProtection': (
            <svg viewBox="0 0 48 48" fill="none" stroke="#315ba4" strokeWidth="1.2">
                <path d="M8 40l4-28h24l4 28" fill="rgba(49, 91, 164, 0.05)" />
                <path d="M12 12l2 28M34 12l-2 28M12 18h24M12 28h24" />
                <path d="M20 4h8v4h-8z" />
                <circle cx="24" cy="23" r="3" fill="#315ba4" />
            </svg>
        ),
        '03_KeyAreaSecurity': (
            <svg viewBox="0 0 48 48" fill="none" stroke="#315ba4" strokeWidth="1.2">
                <rect x="10" y="10" width="28" height="28" rx="2" fill="rgba(49, 91, 164, 0.05)" />
                <path d="M10 24h28M24 10v28" />
                <circle cx="24" cy="24" r="5" />
                <path d="M14 14l5 5M29 29l5 5M34 14l-5 5M19 29l-5 5" />
            </svg>
        ),
        '04_EmergencyRescue': (
            <svg viewBox="0 0 48 48" fill="none" stroke="#315ba4" strokeWidth="1.2">
                <circle cx="24" cy="24" r="20" fill="rgba(49, 91, 164, 0.05)" />
                <path d="M24 12v24M12 24h24" strokeWidth="3" />
                <path d="M16 16l16 16M32 16L16 32" strokeOpacity="0.3" />
            </svg>
        )
    };

    const groupedSolutions: Record<string, any[]> = {};
    Object.keys(CATEGORY_NAMES).forEach(catId => {
        groupedSolutions[catId] = allSolutions.filter(s => s.category_id === catId);
    });

    const categoryList = Object.keys(CATEGORY_NAMES).map(key => ({
        id: key,
        name: CATEGORY_NAMES[key],
        icon: CATEGORY_ICONS[key]
    }));

    return (
        <div className="solution-center-page" style={{ paddingTop: '114px' }}>
            <section className="product-banner" style={{
                height: '40vh',
                minHeight: '320px',
                backgroundImage: "url('/solutions/solution_center_banner_01.png')",
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #e1e8f0'
            }}>
                {/* 30% Dark overlay to ensure white text pops on any background */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', zIndex: 0 }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ maxWidth: '800px' }}>
                        <h1 style={{ fontSize: '5.2rem', fontWeight: 900, color: '#fff', marginBottom: '15px', lineHeight: 1.1 }}>Solution Center</h1>
                        <p style={{ fontSize: '2rem', color: '#fff', lineHeight: 1.5, opacity: 0.95 }}>Tailored tactical systems for border security, infrastructure protection, and emergency mission success.</p>
                    </div>
                </div>
            </section>

            <CategoryNav categories={categoryList} />

            <div className="solution-lists-wrap" style={{ padding: '80px 0' }}>
                {categoryList.map((category) => (
                    <section key={category.id} id={category.id} style={{ marginBottom: '120px', scrollMarginTop: '240px' }}>
                        <div className="container">
                            <div className="section-title-wrap" style={{ textAlign: 'center', marginBottom: '60px' }}>
                                <h2 style={{ fontSize: '3.6rem', fontWeight: 800, color: '#333', textTransform: 'uppercase', letterSpacing: '2px' }}>{category.name}</h2>
                                <div style={{ width: '60px', height: '4px', background: '#315ba4', margin: '20px auto' }}></div>
                                <a
                                    href={`/solutions/category/${category.id}`}
                                    className="solution-btn-animated"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        marginTop: '16px',
                                        fontSize: '1.6rem',
                                        fontWeight: 700,
                                        color: '#315ba4',
                                        textDecoration: 'none',
                                        padding: '10px 24px',
                                        border: '2px solid #315ba4',
                                        borderRadius: '0',
                                        transition: 'all 0.3s ease',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#315ba4';
                                        e.currentTarget.style.color = '#fff';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 10px 20px rgba(49, 91, 164, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.color = '#315ba4';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    Explore Complete Solution Suite
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s' }}>
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>

                            <div className="solution-grid" style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '30px'
                            }}>
                                {groupedSolutions[category.id]?.map((sol, idx) => (
                                    <a href={`/solutions/${sol.id}`} key={idx} className="catalog-card-item">
                                        <div className="card-image">
                                            <img src={sol.main_image || '/images/solutions/placeholder.jpg'} alt={sol.title_en} />
                                        </div>
                                        <div className="card-content">
                                            <h3>{sol.title_en}</h3>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            <section id="inquiry" style={{ padding: '120px 0', background: '#f8f9fa', borderTop: '1px solid #eee' }}>
                <div className="container" style={{ maxWidth: '1200px' }}>
                    <InquiryForm />
                </div>
            </section>

            <style jsx>{`
                .catalog-card-item {
                    text-decoration: none;
                    background: #fff;
                    border: 1px solid #f0f0f0;
                    transition: all 0.3s ease;
                    display: block;
                    overflow: hidden;
                }
                .card-image {
                    height: 240px;
                    overflow: hidden;
                    background: #f8f9fa;
                }
                .card-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s;
                }
                .card-content {
                    padding: 25px;
                    text-align: center;
                }
                .card-content h3 {
                    font-size: 1.8rem;
                    fontWeight: 700;
                    color: #333;
                    margin: 0;
                    line-height: 1.4;
                    transition: color 0.3s;
                }
                .catalog-card-item:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    border-color: #315ba4;
                }
                .catalog-card-item:hover h3 {
                    color: #315ba4;
                }
                .catalog-card-item:hover .card-image img {
                    transform: scale(1.05);
                }
            `}</style>
        </div>
    );
}
