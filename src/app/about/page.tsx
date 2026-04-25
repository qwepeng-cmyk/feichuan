import React from 'react';
import { Shield, Zap, Eye, Users, Settings } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="about-page" style={{ paddingTop: '114px', backgroundColor: '#fff' }}>
            <main>
                {/* 1. Breadcrumb Row */}
                <div className="product-breadcrumb-nav" style={{ borderBottom: '1px solid #f0f0f0', padding: '15px 0' }}>
                    <div className="container">
                        <div className="breadcrumb-path" style={{ fontSize: '1.4rem', color: '#666' }}>
                            <a href="/" style={{ color: '#315ba4', textDecoration: 'none' }}>Home</a> &gt; About Us
                        </div>
                    </div>
                </div>

                {/* 2. Banner Section */}
                <section className="product-banner" style={{
                    height: '40vh',
                minHeight: '320px',
                maxHeight: '450px',
                    backgroundImage: "url('/about/about_banner.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    borderBottom: '1px solid #e1e8f0'
                }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', zIndex: 0 }}></div>
                    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ maxWidth: '800px' }}>
                            <h1 style={{ fontSize: '5.2rem', fontWeight: 900, color: '#fff', marginBottom: '15px', lineHeight: 1.1 }}>Company Profile</h1>
                            <p style={{ fontSize: '2rem', color: '#fff', lineHeight: 1.5, opacity: 0.95 }}>
                                Dedicated to world safety through leading-edge unmanned systems and intelligent security solutions.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 3. Company Profile Section (Based on Image 1) */}
                <section style={{ padding: '100px 0', backgroundColor: '#fff' }}>
                    <div className="container">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
                            <div className="profile-image-wrap">
                                <div style={{
                                    width: '100%',
                                    aspectRatio: '16/9',
                                    backgroundColor: '#f8fafc',
                                    backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200")',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: '4px',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
                                }}></div>
                            </div>
                            <div className="profile-text-content">
                                <h2 style={{ fontSize: '3.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '30px', position: 'relative' }}>
                                    Company Profile
                                    <span style={{ display: 'block', width: '60px', height: '4px', background: '#315ba4', marginTop: '15px' }}></span>
                                </h2>
                                <div style={{ fontSize: '1.8rem', color: '#475569', lineHeight: 1.8, textAlign: 'justify' }}>
                                    <p style={{ marginBottom: '20px' }}>
                                        Beijing Feichuan Equipment Technology Co., Ltd. is headquartered in the Lize Financial Business District of Beijing. It is a high-tech enterprise focusing on the field of unmanned systems and intelligent security.
                                    </p>
                                    <p style={{ marginBottom: '20px' }}>
                                        Based on technological innovation, the company integrates global high-quality resources and market networks, and is committed to building an efficient and collaborative industrial ecosystem. Adhering to the development concept of "Connecting Technology with Applications, Integrating Domestic and International Markets", the company continues to provide leading intelligent security solutions for global customers and strives to become a technology enterprise with international influence.
                                    </p>
                                    <p>
                                        We uphold the development mission of "Connecting Technology with Applications, Integrating Domestic and International Markets" to provide top-tier integrated security services for global customers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. R&D Team Section (Based on Image 2) */}
                <section style={{ padding: '100px 0', backgroundColor: '#f8fafc' }}>
                    <div className="container">
                        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                            <h2 style={{ fontSize: '3.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '15px' }}>R&D Team</h2>
                            <p style={{ fontSize: '1.8rem', color: '#64748b' }}>Driving innovation with technical expertise and deep industry experience.</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '60px' }}>
                            {/* Left Box: Team Stats */}
                            <div style={{
                                background: '#315ba4',
                                color: '#fff',
                                padding: '50px 40px',
                                borderRadius: '12px',
                                boxShadow: '0 20px 40px rgba(49, 91, 164, 0.2)'
                            }}>
                                <div style={{ fontSize: '7.2rem', fontWeight: 900, marginBottom: '10px' }}>70%</div>
                                <h3 style={{ fontSize: '2.4rem', fontWeight: 700, marginBottom: '30px' }}>R&D Team Ratio</h3>
                                <p style={{ fontSize: '1.6rem', lineHeight: 1.6, opacity: 0.9, marginBottom: '40px' }}>
                                    The core R&D team is led by 10+ senior industry experts, with an average of over 15 years of experience, possessing both deep technical accumulation and mature civil scenario implementation capabilities.
                                </p>
                                <div style={{ paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                                    <h4 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <Settings size={20} /> R&D System
                                    </h4>
                                    <p style={{ fontSize: '1.5rem', opacity: 0.85, lineHeight: 1.5 }}>
                                        A reliability design system built based on intelligent industrial standards, adapted to civil market needs.
                                    </p>
                                </div>
                            </div>

                            {/* Right Section: Core Capabilities */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', justifyContent: 'center' }}>
                                <h3 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>Core Capabilities</h3>

                                <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
                                    <div style={{ minWidth: '60px', height: '60px', borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#315ba4' }}>
                                        <Shield size={32} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>UAV Reliability Design</h4>
                                        <p style={{ fontSize: '1.6rem', color: '#475569', lineHeight: 1.6 }}>
                                            Adopting redundant flight control architecture, combined with lightweight materials and adaptive control algorithms, ensuring stable operation of UAVs in complex environments, significantly enhancing anti-interference capability and mission continuity.
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
                                    <div style={{ minWidth: '60px', height: '60px', borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#315ba4' }}>
                                        <Zap size={32} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>UAV Countermeasure Intelligent Algorithms</h4>
                                        <p style={{ fontSize: '1.6rem', color: '#475569', lineHeight: 1.6 }}>
                                            Technology based on multi-sensor fusion, achieving fast threat identification and dynamic interference strategy optimization, supporting autonomous countermeasure and real-time response, effectively dealing with various illegal UAV intrusions.
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
                                    <div style={{ minWidth: '60px', height: '60px', borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#315ba4' }}>
                                        <Eye size={32} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>Optical Visual System AI Recognition Technology</h4>
                                        <p style={{ fontSize: '1.6rem', color: '#475569', lineHeight: 1.6 }}>
                                            AI-based image analysis and processing technology, providing users with comprehensive optical visual system solutions in long-distance, high-definition, intelligent, multi-purpose, all-weather, and complex environments.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
