import ProductGallery from '@/components/products/ProductGallery';
import InPageNav from '@/components/products/InPageNav';
import InquiryForm from '@/components/products/InquiryForm';

export const metadata = {
    title: 'FC-YJTX-01 Emergency Communication Drone - FC Equipment',
    description: 'High-end tethered mission drone system for ultra-long endurance emergency communications.',
};

export default function ProductDetailPage() {
    const galleryImages = [
        '/products/uav-systems/FC-YJTX-01-Emergency-Communication-Drone.png',
        '/products/uav-systems/FC-YJTX-01-Emergency-Communication-Drone.png',
    ];

    const navItems = [
        { id: 'solutions', label: 'Applications' },
        { id: 'specs', label: 'Technical Specifications' },
        { id: 'inquiry', label: 'Get Solution & Quotation' },
    ];

    const advantages = [
        { 
            title: '12H+ Endurance', 
            image: '/products/uav-systems/FC-YJTX-01-Emergency-Communication-Drone.png', 
            desc: 'Supports up to 12 hours of uninterrupted flight using high-voltage power transmission through tethered cables.' 
        },
        { 
            title: 'Multi-Network Support', 
            image: '/products/uav-systems/FC-YJTX-01-Emergency-Communication-Drone.png', 
            desc: 'Deep integration with major telecom operators; supports 4G/5G, shortwave, and satellite relay.' 
        },
        { 
            title: 'Rapid Deployment', 
            image: '/products/uav-systems/FC-YJTX-01-Emergency-Communication-Drone.png', 
            desc: 'Quickly set up communication links in disaster-stricken areas or remote regions like Gobi and mines.' 
        },
        { 
            title: 'Intelligent Control', 
            image: '/products/uav-systems/FC-YJTX-01-Emergency-Communication-Drone.png', 
            desc: 'Automated take-off, landing, and cable management system for simplified operation in complex environments.' 
        },
    ];

    return (
        <div className="product-detail-page">
            <main>
                {/* Breadcrumb Row */}
                <div className="product-breadcrumb-nav">
                    <div className="container">
                        <div className="breadcrumb-path">
                            <a href="/">Home</a> &gt; <a href="/products">Product</a> &gt; FC-YJTX-01 Emergency Communication Drone
                        </div>
                    </div>
                </div>

                {/* Hero Section */}
                <section id="overview" className="product-hero" style={{ padding: '40px 0 20px' }}>
                    <div className="container">
                        <div className="product-grid">
                            <div className="gallery-main-area">
                                <ProductGallery images={galleryImages} />
                            </div>
                            
                            <div className="product-info">
                                <h1 style={{ fontSize: '6rem', fontWeight: '900', marginBottom: '20px', lineHeight: '1.1' }}>
                                    FC-YJTX-01 Emergency Communication Drone
                                </h1>

                                <div className="drone-specs" style={{ marginBottom: '40px' }}>
                                    <div style={{ fontSize: '3.2rem', fontWeight: 'bold', color: '#000', marginBottom: '10px' }}>
                                        Payload: Up to 15kg
                                    </div>
                                    <div style={{ fontSize: '1.8rem', color: '#666' }}>Max. Endurance: 12h+ (Tethered)</div>
                                    <div style={{ fontSize: '1.8rem', color: '#666' }}>Wind Resistance: Level 6</div>
                                    <div style={{ fontSize: '1.8rem', color: '#666' }}>IP Rating: IP54</div>
                                </div>

                                <div className="cta-group" style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
                                    <button className="btn-cta" style={{ background: '#3b82f6', color: '#fff', borderRadius: '4px', textTransform: 'none', fontSize: '2rem', flex: 1, height: '60px' }}>
                                        Chat online
                                    </button>
                                    <a href="https://wa.me/+8613761974616" className="btn-cta" style={{ background: '#25D366', color: '#fff', borderRadius: '4px', textTransform: 'none', fontSize: '2rem', flex: 1, height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Full Width Intro Text */}
                <section className="product-intro-section" style={{ paddingBottom: '60px' }}>
                    <div className="container">
                        <div className="product-intro-text" style={{ fontSize: '1.8rem', color: '#444', lineHeight: '1.8', borderTop: '1px solid #eee', paddingTop: '40px' }}>
                            The FC-YJTX-01 is a specialized tethered drone system designed for long-duration emergency communication tasks. 
                            It integrates AC/DC power conversion, high-voltage transmission, and automated cable management to provide stable, 
                            persistent network coverage in the most challenging environments. All indexes of FC-YJTX-01 on structure and 
                            tethered efficiency present advanced modern technologies.
                        </div>
                    </div>
                </section>

                <InPageNav items={navItems} />

                {/* Advantages */}
                <section id="advantages" className="detail-section">
                    <div className="container">
                        <h2 className="section-title">Key Advantages</h2>
                        <div className="adv-grid">
                            {advantages.map((adv, i) => (
                                <div key={i} className="adv-card">
                                    <div className="adv-img">
                                        <img src={adv.image} alt={adv.title} />
                                    </div>
                                    <div className="adv-content">
                                        <h4 style={{ color: 'var(--primary)', fontWeight: '900' }}>{adv.title}</h4>
                                        <p>{adv.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Applications */}
                <section id="solutions" className="detail-section alt">
                    <div className="container">
                        <h2 className="section-title">Typical Applications</h2>
                        <div className="adv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                            {[
                                { title: 'Disaster Emergency Response', desc: 'Rapidly rebuild communication links after earthquakes or floods to ensure rescue operations have stable signal.', img: galleryImages[0] },
                                { title: 'Signal Blank Area Coverage', desc: 'Providing persistent network infrastructure for remote mining sites, Gobi exploration, or temporary military logistics.', img: galleryImages[0] }
                            ].map((sol, i) => (
                                <div key={i} className="adv-card" style={{ display: 'flex', minHeight: '300px' }}>
                                    <div style={{ width: '40%', position: 'relative', overflow: 'hidden' }}>
                                        <img src={sol.img} alt={sol.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ width: '60%', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <h4 style={{ fontSize: '2.4rem', marginBottom: '15px' }}>{sol.title}</h4>
                                        <p style={{ color: '#666', fontSize: '1.6rem' }}>{sol.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Specs Table Section */}
                <section id="specs" className="detail-section">
                    <div className="container" style={{ maxWidth: '1000px' }}>
                        <h2 className="section-title">Technical Specifications</h2>
                        <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                            <thead>
                                <tr style={{ background: 'var(--primary)', color: '#fff' }}>
                                    <th style={{ padding: '20px', textAlign: 'left', fontSize: '1.8rem' }}>Parameter</th>
                                    <th style={{ padding: '20px', textAlign: 'left', fontSize: '1.8rem' }}>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ['Tethered Height', '50 - 100 meters'],
                                    ['Max Payload', '15 kg'],
                                    ['Flight Duration', '12h - 24h (Tethered)'],
                                    ['Power Input', 'AC 220V / 380V'],
                                    ['Communication Link', '4G / 5G / Shortwave / Satellite'],
                                    ['Wind Resistance', 'Level 6 (10.8-13.8 m/s)'],
                                    ['Environmental protection', 'IP54']
                                ].map(([param, val], idx) => (
                                    <tr key={idx} style={{ background: idx % 2 === 0 ? '#fff' : '#f8faff' }}>
                                        <td style={{ padding: '20px', borderBottom: '1px solid #eee', fontWeight: 'bold' }}>{param}</td>
                                        <td style={{ padding: '20px', borderBottom: '1px solid #eee' }}>{val}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Inquiry */}
                <section id="inquiry" className="detail-section alt">
                    <div className="container">
                        <InquiryForm />
                    </div>
                </section>
            </main>
        </div>
    );
}
