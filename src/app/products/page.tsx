import React from 'react';
import { getAllProducts } from '@/lib/products';
import InquiryForm from '@/components/products/InquiryForm';
import CategoryNav from '@/components/products/CategoryNav';
import ProductGridCard from '@/components/products/ProductGridCard';

export default async function ProductCenterPage() {
    const categoriesData = await getAllProducts();

    const CATEGORY_ICONS: Record<string, React.ReactNode> = {
        'uav-drone-systems': (
            <svg viewBox="0 0 48 48" fill="none" stroke="#315ba4" strokeWidth="1.2">
                {/* Hexacopter - Blades Perpendicular to Arms (Deployed State) */}
                {/* Central Body Hull */}
                <path d="M24 18l4 2v6l-4 3-4-3v-6l4-2z" fill="rgba(49, 91, 164, 0.1)" strokeWidth="1.5" />
                
                {/* 6 Arms */}
                <g strokeWidth="1.5" strokeLinecap="round">
                    <path d="M24 18V9M24 28v10" />
                    <path d="M21 19.5l-8-5M27 26.5l8 5M21 26.5l-8 5M27 19.5l8-5" />
                </g>
                
                {/* Static Blades (Exactly 90° to Arms) */}
                <g fill="#315ba4" stroke="none">
                    {/* Top Motor (Vertical Arm -> Horizontal Blades) */}
                    <g transform="translate(24,9) rotate(0)">
                        <path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" />
                    </g>
                    {/* Bottom Motor (Vertical Arm -> Horizontal Blades) */}
                    <g transform="translate(24,38) rotate(0)">
                        <path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" />
                    </g>
                    {/* Top Left Motor (~30° from horizontal arm -> ~120°/60° perpendicular) */}
                    <g transform="translate(13,14.5) rotate(60)">
                        <path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" />
                    </g>
                    {/* Bottom Right Motor (Parallel to TL -> 60°) */}
                    <g transform="translate(35,31.5) rotate(60)">
                        <path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" />
                    </g>
                    {/* Bottom Left Motor (~30° down -> ~120°/-60°) */}
                    <g transform="translate(13,31.5) rotate(-60)">
                        <path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" />
                    </g>
                    {/* Top Right Motor (Parallel to BL -> -60°) */}
                    <g transform="translate(35,14.5) rotate(-60)">
                        <path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" />
                    </g>
                </g>
                
                {/* Hubs */}
                <circle cx="24" cy="9" r="1.2" fill="#315ba4" />
                <circle cx="24" cy="38" r="1.2" fill="#315ba4" />
                <circle cx="13" cy="14.5" r="1.2" fill="#315ba4" />
                <circle cx="35" cy="31.5" r="1.2" fill="#315ba4" />
                <circle cx="13" cy="31.5" r="1.2" fill="#315ba4" />
                <circle cx="35" cy="14.5" r="1.2" fill="#315ba4" />
            </svg>
        ),
        'anti-drone-cuas': (
            <svg viewBox="0 0 48 48" fill="none" stroke="#315ba4" strokeWidth="1.5">
                {/* Realistic RF Dome & Tripod */}
                <path d="M10 24a14 14 0 0 1 28 0H10z" fill="rgba(49, 91, 164, 0.05)" />
                <path d="M10 24h28M14 26h20v2H14z" />
                <path d="M24 28v4M18 42l6-10 6 10M24 32v2M20 37l-4 5m12-5l4 5" />
                <path d="M16 20c0-4.4 3.6-8 8-8s8 3.6 8 8" strokeDasharray="2 2" />
            </svg>
        ),
        'security-screening': (
            <svg viewBox="0 0 48 48" fill="none" stroke="#315ba4" strokeWidth="1.5">
                {/* Detailed Walk-through Metal Detector */}
                <rect x="12" y="6" width="24" height="36" />
                <path d="M16 6v36M32 6v36" strokeWidth="2" />
                <rect x="18" y="8" width="12" height="6" fill="rgba(49, 91, 164, 0.1)" />
                <path d="M12 18h24M12 24h24M12 30h24M12 36h24" strokeOpacity="0.3" />
                <circle cx="24" cy="11" r="1.5" fill="#315ba4" />
            </svg>
        ),
        'defense-engineering': (
            <svg viewBox="0 0 48 48" fill="none" stroke="#315ba4" strokeWidth="1.5">
                {/* Heavy Duty Bailey Bridge Section */}
                <path d="M4 28h40M4 36h40" strokeWidth="2" />
                <path d="M6 28l6 8M16 28l6 8M26 28l6 8M36 28l6 8" />
                <path d="M12 28l-6 8M22 28l-6 8M32 28l-6 8M42 28l-6 8" />
                <path d="M4 27h40v2H4z" fill="#315ba4" />
                <path d="M8 32h32M8 33h32" strokeOpacity="0.5" />
            </svg>
        ),
        'field-hospitals': (
            <svg viewBox="0 0 48 48" fill="none" stroke="#315ba4" strokeWidth="1.5">
                {/* Industrial Medical Command Case */}
                <rect x="8" y="14" width="32" height="24" rx="2" />
                <path d="M18 14V10a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" />
                <path d="M8 22h32M24 18v16M18 26h12" strokeWidth="3" />
                <rect x="12" y="18h4v4h-4zM32" />
                <path d="M12 30h4v4h-4zM32 30h4v4h-4z" fill="rgba(49, 91, 164, 0.1)" />
            </svg>
        ),
        'perimeter-intelligence': (
            <svg viewBox="0 0 48 48" fill="none" stroke="#315ba4" strokeWidth="1.5">
                {/* PTZ Surveillance Sentinel Camera */}
                <path d="M14 12h20l2 10H12l2-10z" fill="rgba(49, 91, 164, 0.05)" />
                <circle cx="24" cy="28" r="10" />
                {/* The "Eye" / Lens */}
                <circle cx="24" cy="28" r="4" fill="#315ba4" />
                <circle cx="26" cy="26" r="1" fill="#fff" />
                <path d="M14 28h20M24 18v20" strokeOpacity="0.2" />
                <rect x="20" y="38" width="8" height="4" />
                <path d="M12 22h24" strokeWidth="2" />
            </svg>
        )
    };

    const CATEGORY_NAMES: Record<string, string> = {
        'uav-drone-systems': 'UAV & Drone Systems',
        'anti-drone-cuas': 'Anti-Drone / C-UAS Systems',
        'security-screening': 'Security Screening & Policing',
        'defense-engineering': 'Defense Engineering & Logistics',
        'field-hospitals': 'Field & Mobile Hospitals',
        'perimeter-intelligence': 'Perimeter & Area Surveillance'
    };

    const categoryList = Object.keys(CATEGORY_NAMES).map(key => ({
        id: key,
        name: CATEGORY_NAMES[key],
        icon: CATEGORY_ICONS[key]
    }));

    return (
        <div className="product-page-new" style={{ paddingTop: '114px' }}>
            {/* HERO BANNER (HALF HEIGHT) */}
            <section className="product-banner" style={{ 
                height: '40vh',
                minHeight: '320px',
                maxHeight: '450px', 
                backgroundImage: "url('/products/products_center_banner.jpg')", 
                backgroundSize: 'cover', 
                backgroundRepeat: 'no-repeat', 
                position: 'relative', 
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center'
            }}>
                {/* Dark overlay for text readability */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', zIndex: 0 }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ maxWidth: '750px' }}>
                        <h1 style={{ fontSize: '5.2rem', fontWeight: 900, color: '#fff', marginBottom: '15px', lineHeight: 1.1 }}>Product Center</h1>
                        <p style={{ fontSize: '2rem', color: '#fff', lineHeight: 1.5, opacity: 0.9 }}>Connecting professional technology with tactical applications for a more secure world.</p>
                    </div>
                </div>
                {/* Visual Accent */}
                <div style={{ position: 'absolute', right: '5%', bottom: '-10%', opacity: 0.05, transform: 'scale(1.2)' }}>
                    <img src="/logo.png" alt="" style={{ height: '400px' }} />
                </div>
            </section>

            {/* STICKY CATEGORY NAV */}
            <CategoryNav categories={categoryList} />

            {/* PRODUCT LISTS */}
            <div className="product-lists-wrap" style={{ padding: '60px 0' }}>
                {categoryList.map((category) => (
                    <section key={category.id} id={category.id} style={{ marginBottom: '100px', scrollMarginTop: '300px' }}>
                        <div className="container">
                            <div className="section-title-wrap" style={{ textAlign: 'center', marginBottom: '40px' }}>
                                <h2 style={{ fontSize: '3.4rem', fontWeight: 800, color: '#333', textTransform: 'uppercase', letterSpacing: '2px' }}>{category.name}</h2>
                                <div style={{ width: '60px', height: '4px', background: '#315ba4', margin: '20px auto' }}></div>
                            </div>

                            <div className="product-grid" style={{ 
                                display: 'grid', 
                                gridTemplateColumns: 'repeat(3, 1fr)', 
                                gap: '30px' 
                            }}>
                                {categoriesData[category.id]?.map((product, idx) => (
                                    <ProductGridCard key={idx} product={product} />
                                ))}
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            {/* INQUIRY FORM */}
            <section id="inquiry" style={{ padding: '100px 0', background: '#f8f9fa', borderTop: '1px solid #eee' }}>
                <div className="container" style={{ maxWidth: '1200px' }}>
                    <InquiryForm />
                </div>
            </section>
        </div>
    );
}
