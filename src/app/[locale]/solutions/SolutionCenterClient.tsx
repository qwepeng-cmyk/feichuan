'use client';

import MobileSolutionCenter from '@/components/mobile/MobileSolutionCenter';
import CategoryNav from '@/components/products/CategoryNav';
import InquiryForm from '@/components/products/InquiryForm';

interface Solution {
    id: string;
    title_en: string;
    main_image?: string;
    category_id: string;
    [key: string]: any;
}

export default function SolutionCenterClient({ 
    allSolutions,
    locale,
    dict
}: { 
    allSolutions: Solution[],
    locale: string,
    dict: any
}) {
    const CATEGORY_NAMES: Record<string, string> = {
        '01_BorderPatrol': dict.solutions.categories.border,
        '02_InfrastructureProtection': dict.solutions.categories.infrastructure,
        '03_KeyAreaSecurity': dict.solutions.categories.security,
        '04_EmergencyRescue': dict.solutions.categories.emergency
    };

    // Define common equipment components
    const ICON_CAMERA = (
        <g>
            <path d="M14 12h20l2 10H12l2-10z" fill="rgba(49, 91, 164, 0.05)" />
            <circle cx="24" cy="28" r="10" />
            <circle cx="24" cy="28" r="4" fill="#315ba4" stroke="none" />
            <path d="M14 28h20M24 18v20" strokeOpacity="0.2" />
            <rect x="20" y="38" width="8" height="4" />
            <path d="M12 22h24" strokeWidth="2" />
        </g>
    );

    const ICON_ANTIDRONE = (
        <g>
            <path d="M10 24a14 14 0 0 1 28 0H10z" fill="rgba(49, 91, 164, 0.05)" />
            <path d="M10 24h28M14 26h20v2H14z" />
            <path d="M24 28v4M18 42l6-10 6 10M24 32v2M20 37l-4 5m12-5l4 5" />
            <path d="M16 20c0-4.4 3.6-8 8-8s8 3.6 8 8" strokeDasharray="2 2" />
        </g>
    );

    const CATEGORY_ICONS: Record<string, React.ReactNode> = {
        '01_BorderPatrol': (
            <svg viewBox="0 0 110 48" fill="none" stroke="#315ba4" strokeWidth="1.5" style={{ height: '48px', width: 'auto' }}>
                <g transform="translate(0, 0)">
                    <path d="M24 10l2 24-2 4-2-4 2-24z" fill="rgba(49, 91, 164, 0.05)" />
                    <path d="M4 22l20-4 20 4-20 4L4 22z" strokeWidth="1.8" />
                    <path d="M18 36l6-2 6 2-6 2-6-2z" />
                    <g fill="#315ba4" stroke="none">
                        <rect x="10" y="16" width="1.5" height="12" rx="0.5" />
                        <rect x="37" y="16" width="1.5" height="12" rx="0.5" />
                    </g>
                </g>
                <path d="M52 24h6M55 21v6" stroke="#ff9800" strokeWidth="3" strokeLinecap="round" />
                <g transform="translate(62, 0)">{ICON_CAMERA}</g>
            </svg>
        ),
        '02_InfrastructureProtection': (
            <svg viewBox="0 0 110 48" fill="none" stroke="#315ba4" strokeWidth="1.5" style={{ height: '48px', width: 'auto' }}>
                <g transform="translate(0, 0)">{ICON_ANTIDRONE}</g>
                <path d="M52 24h6M55 21v6" stroke="#ff9800" strokeWidth="3" strokeLinecap="round" />
                <g transform="translate(62, 0)">{ICON_CAMERA}</g>
            </svg>
        ),
        '03_KeyAreaSecurity': (
            <svg viewBox="0 0 110 48" fill="none" stroke="#315ba4" strokeWidth="1.5" style={{ height: '48px', width: 'auto' }}>
                <g transform="translate(0, 0)">{ICON_ANTIDRONE}</g>
                <path d="M52 24h6M55 21v6" stroke="#ff9800" strokeWidth="3" strokeLinecap="round" />
                <g transform="translate(62, 0)">
                    <rect x="12" y="6" width="24" height="36" />
                    <path d="M16 6v36M32 6v36" strokeWidth="2" />
                    <rect x="18" y="8" width="12" height="6" fill="rgba(49, 91, 164, 0.1)" />
                    <path d="M12 18h24M12 24h24M12 30h24M12 36h24" strokeOpacity="0.3" />
                    <circle cx="24" cy="11" r="1.5" fill="#315ba4" stroke="none" />
                </g>
            </svg>
        ),
        '04_EmergencyRescue': (
            <svg viewBox="0 0 110 48" fill="none" stroke="#315ba4" strokeWidth="1.2" style={{ height: '48px', width: 'auto' }}>
                <g transform="translate(0, 0)">
                    <path d="M24 18l4 2v6l-4 3-4-3v-6l4-2z" fill="rgba(49, 91, 164, 0.1)" strokeWidth="1.5" />
                    <g strokeWidth="1.5" strokeLinecap="round">
                        <path d="M24 18V9M24 28v10" />
                        <path d="M21 19.5l-8-5M27 26.5l8 5M21 26.5l-8 5M27 19.5l8-5" />
                    </g>
                    <path d="M18 7c2-2 10-2 12 0M15 4c3-3 15-3 18 0M12 1c4-4 20-4 24 0" stroke="#ff9800" strokeWidth="2" strokeLinecap="round" />
                    <g fill="#315ba4" stroke="none">
                        <g transform="translate(24,9)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                        <g transform="translate(24,38)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                        <g transform="translate(13,14.5) rotate(60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                        <g transform="translate(35,31.5) rotate(60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                        <g transform="translate(13,31.5) rotate(-60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                        <g transform="translate(35,14.5) rotate(-60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                    </g>
                </g>
                <path d="M52 24h6M55 21v6" stroke="#ff9800" strokeWidth="3" strokeLinecap="round" />
                <g transform="translate(62, 0)">
                    <path d="M24 18l4 2v6l-4 3-4-3v-6l4-2z" fill="rgba(49, 91, 164, 0.1)" strokeWidth="1.5" />
                    <g strokeWidth="1.5" strokeLinecap="round">
                        <path d="M24 18V9M24 28v10" />
                        <path d="M21 19.5l-8-5M27 26.5l8 5M21 26.5l-8 5M27 19.5l8-5" />
                    </g>
                    <path d="M22 30l-10 16h24l-10-16z" fill="rgba(255, 152, 0, 0.25)" stroke="none" />
                    <path d="M18 42l-2 4M24 42v4M30 42l2 4" stroke="#ff9800" strokeWidth="1" strokeLinecap="round" />
                    <g fill="#315ba4" stroke="none">
                        <g transform="translate(24,9)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                        <g transform="translate(24,38)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                        <g transform="translate(13,14.5) rotate(60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                        <g transform="translate(35,31.5) rotate(60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                        <g transform="translate(13,31.5) rotate(-60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                        <g transform="translate(35,14.5) rotate(-60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                    </g>
                </g>
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
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                .mobile_only { display: none !important; }
                .pc_only { display: block !important; }
                @media (max-width: 991px) {
                    .mobile_only { display: block !important; }
                    .pc_only { display: none !important; }
                }
            `}} />

            <div className="pc_only">
                <div className="solution-center-page" style={{ paddingTop: '112px' }}>
                    <section className="product-banner" style={{
                        height: '40vh',
                        minHeight: '320px',
                        maxHeight: '450px',
                        backgroundImage: "url('/solutions/solution_center_banner_01.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        borderBottom: '1px solid #e1e8f0'
                    }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', zIndex: 0 }}></div>
                        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ maxWidth: '800px' }}>
                                <h1 style={{ fontSize: '5.2rem', fontWeight: 900, color: '#fff', marginBottom: '15px', lineHeight: 1.1 }}>{dict.solutions.bannerTitle}</h1>
                                <p style={{ fontSize: '2rem', color: '#fff', lineHeight: 1.5, opacity: 0.95 }}>{dict.solutions.bannerSubtitle}</p>
                            </div>
                        </div>
                    </section>

                    <CategoryNav categories={categoryList} />

                    <div className="solution-lists-wrap" style={{ padding: '80px 0' }}>
                        {categoryList.map((category) => (
                            <section key={category.id} id={category.id} style={{ marginBottom: '120px', scrollMarginTop: '300px' }}>
                                <div className="container">
                                    <div className="section-title-wrap" style={{ textAlign: 'center', marginBottom: '40px' }}>
                                        <h2 style={{ fontSize: '3.6rem', fontWeight: 800, color: '#333', textTransform: 'uppercase', letterSpacing: '2px' }}>{category.name}</h2>
                                        <div style={{ width: '60px', height: '4px', background: '#315ba4', margin: '20px auto' }}></div>
                                        <a href={`/${locale}/solutions/category/${category.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '16px', fontSize: '1.6rem', fontWeight: 700, color: '#fff', backgroundColor: '#315ba4', textDecoration: 'none', padding: '12px 32px', borderRadius: '4px', transition: 'all 0.3s ease' }}>
                                            {dict.solutions.exploreAll}
                                        </a>
                                    </div>

                                    <div className="solution-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
                                        {groupedSolutions[category.id]?.map((sol, idx) => {
                                            const solTitle = sol[`product_name_${locale}`] || sol.product_name_en || sol.title_en;
                                            return (
                                                <a href={`/${locale}/solutions/${sol.id}`} key={idx} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                    <div style={{ height: '240px', overflow: 'hidden', marginBottom: '15px' }}>
                                                        <img src={sol.main_image || '/images/solutions/placeholder.jpg'} alt={solTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    </div>
                                                    <h3 style={{ fontSize: '1.8rem', fontWeight: 700 }}>{solTitle}</h3>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* INQUIRY FORM */}
                    <section id="inquiry" style={{ padding: '100px 0', background: '#f8f9fa', borderTop: '1px solid #eee' }}>
                        <div className="container" style={{ maxWidth: '1200px' }}>
                            <InquiryForm dict={dict} />
                        </div>
                    </section>
                </div>
            </div>

            <div className="mobile_only">
                <MobileSolutionCenter allSolutions={allSolutions} locale={locale} dict={dict} />
            </div>
        </>
    );
}
