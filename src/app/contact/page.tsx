import React from 'react';
import InquiryForm from '@/components/products/InquiryForm';

export default function ContactPage() {
    return (
        <div className="contact-page" style={{ paddingTop: '114px', backgroundColor: '#fff' }}>
            <main>
                {/* 1. Breadcrumb Row */}
                <div className="product-breadcrumb-nav">
                    <div className="container">
                        <div className="breadcrumb-path">
                            <a href="/">Home</a> &gt; Contact Us
                        </div>
                    </div>
                </div>

                {/* 2. Banner Section (Matches Product Center Style) */}
                <section className="contact-banner" style={{ 
                    height: '35vh', 
                    minHeight: '280px', 
                    background: 'linear-gradient(135deg, #f0f7ff 0%, #dce9f9 100%)', 
                    position: 'relative', 
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '1px solid #e0e6ed'
                }}>
                    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ maxWidth: '800px' }}>
                            <h1 style={{ fontSize: '5.2rem', fontWeight: 900, color: '#315ba4', marginBottom: '15px', lineHeight: 1.1 }}>Contact Us</h1>
                            <p style={{ fontSize: '2rem', color: '#525a66', lineHeight: 1.5, opacity: 0.9 }}>
                                We provide professional technical support and tactical solutions worldwide. Reach out to our expert team today.
                            </p>
                        </div>
                    </div>
                    {/* Visual Decor - Large Logo Watermark */}
                    <div style={{ position: 'absolute', right: '2%', bottom: '-10%', opacity: 0.04, transform: 'scale(1.5)' }}>
                        <img src="/logo.png" alt="" style={{ height: '350px' }} />
                    </div>
                </section>

                {/* 3. Main Content Section (Optimized 2 Columns) */}
                <section className="contact-main-content" style={{ padding: '80px 0' }}>
                    <div className="container">
                        <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr', gap: '40px' }}>
                            
                            {/* Left Side: Public Inquiry Form Component (Wider) */}
                            <div className="contact-form-area" style={{ background: '#fff' }}>
                                <InquiryForm />
                            </div>

                            {/* Right Side: Contact Details Card */}
                            <div className="contact-info-card">
                                <div style={{ 
                                    padding: '40px', 
                                    background: '#f4f7fa', 
                                    borderLeft: '4px solid #315ba4',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '40px'
                                }}>
                                    <h3 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#333', marginBottom: '10px' }}>Direct Contact</h3>
                                    
                                    {/* WhatsApp */}
                                    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                        <div style={{ width: '40px', color: '#25D366' }}>
                                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-2.32 0-4.518.892-6.193 2.512-3.14 3.036-3.414 7.918-0.65 11.272l-1.01 3.518 3.65-0.941c1.332.71 2.825 1.082 4.343 1.083l0.005 0.001c4.545 0 8.245-3.627 8.247-8.087 0-2.161-0.854-4.191-2.406-5.717-1.551-1.527-3.615-2.369-5.811-2.371zM16.516 16.485c-0.247 0.686-1.443 1.253-1.99 1.341-0.547.087-1.253.134-3.193-0.627-2.396-0.939-3.943-3.328-4.06-3.483-0.12-0.155-0.976-1.275-0.976-2.433 0-1.159.605-1.728.823-1.954.218-0.226.478-0.283.637-0.283s.318.001.457.006c.142.005.333-0.053.523.402.193.466.66 1.58.717 1.693.056.113.1.245.021.396s-0.113.264-0.226.396c-0.113.132-0.239.294-0.342.396-0.113.113-0.231.237-0.1.458.132.221.584.949 1.257 1.536.866.755 1.597 0.991 1.82 1.093s.345.075.474-0.075c0.129-0.15 0.553-0.641.701-0.858.148-0.217.294-0.183.497-0.108.201.075 1.275.591 1.493.697s.361.16.415.253c.053.093.053.539-0.194 1.225z"/></svg>
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '1.6rem', color: '#666', marginBottom: '5px' }}>WhatsApp</h4>
                                            <a href="https://wa.me/+8613761974616" style={{ fontSize: '2rem', fontWeight: 700, color: '#315ba4', textDecoration: 'none' }}>+86 13761974616</a>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                        <div style={{ width: '40px', color: '#315ba4' }}>
                                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '1.6rem', color: '#666', marginBottom: '5px' }}>Email</h4>
                                            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#333' }}>sales@fc-uav.com</div>
                                        </div>
                                    </div>

                                    {/* Hotline */}
                                    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                        <div style={{ width: '40px', color: '#315ba4' }}>
                                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.81 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '1.6rem', color: '#666', marginBottom: '5px' }}>Sales Hotline</h4>
                                            <div style={{ fontSize: '20px', fontWeight: 700, color: '#333' }}>+86 137 6197 4616</div>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                        <div style={{ width: '40px', color: '#315ba4' }}>
                                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '1.6rem', color: '#666', marginBottom: '5px' }}>Company Address</h4>
                                            <div style={{ fontSize: '1.8rem', fontWeight: 600, color: '#333', lineHeight: '1.4' }}>
                                                Shanghai Songjiang High Tech Park, <br/>
                                                388 Xxxx Road, Shanghai, China
                                            </div>
                                        </div>
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
