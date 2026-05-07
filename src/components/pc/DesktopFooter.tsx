'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer({ locale }: { locale: string }) {
    const l = (path: string) => locale === 'en' ? path : `/${locale}${path === '/' ? '' : path}`;

    return (
        <footer className="footer" style={{ background: '#111', color: '#888', padding: '100px 0 40px' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1.2fr', gap: '60px', marginBottom: '60px' }}>
                    <div>
                        <img src="/logo1.png" alt="Logo" style={{ height: '56px', marginBottom: '30px', filter: 'brightness(0) invert(1)' }} />
                        <p style={{ lineHeight: 1.6, fontSize: '1.4rem' }}>Leading provider of intelligent UAV systems and integrated C-UAS technologies, dedicated to delivering advanced defense and security solutions worldwide.</p>
                    </div>
                    
                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '25px', fontSize: '1.8rem' }}>Solutions</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '1.4rem' }}>
                            <li><Link href={l("/solutions/category/01_BorderPatrol")} style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>Border Patrol</Link></li>
                            <li><Link href={l("/solutions/category/02_InfrastructureProtection")} style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>Infrastructure Protection</Link></li>
                            <li><Link href={l("/solutions/category/03_KeyAreaSecurity")} style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>Key Area Security</Link></li>
                            <li><Link href={l("/solutions/category/04_EmergencyRescue")} style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>Emergency Rescue</Link></li>

                        </ul>
                    </div>
                    
                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '25px', fontSize: '1.8rem' }}>Products</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '1.4rem' }}>
                            <li><Link href={l("/products#uav-drone-systems")} style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>UAV Systems</Link></li>
                            <li><Link href={l("/products#anti-drone-cuas")} style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>C-UAS Technologies</Link></li>
                            <li><Link href={l("/products#security-screening")} style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>Security Screening</Link></li>
                            <li><Link href={l("/products#defense-engineering")} style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>Defense Engineering</Link></li>
                            <li><Link href={l("/products#field-hospitals")} style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>Field Hospitals</Link></li>
                            <li><Link href={l("/products#perimeter-intelligence")} style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>Perimeter Surveillance</Link></li>

                        </ul>
                    </div>
                    
                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '25px', fontSize: '1.8rem' }}>Contact</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '1.4rem' }}>
                            <div>
                                <div style={{ color: '#555', marginBottom: '4px', fontSize: '1.2rem', textTransform: 'uppercase' }}>WhatsApp</div>
                                <div style={{ color: '#888', fontWeight: 400 }}>+86 136 1371 4648</div>
                            </div>
                            <div>
                                <div style={{ color: '#555', marginBottom: '4px', fontSize: '1.2rem', textTransform: 'uppercase' }}>Email</div>
                                <div style={{ color: '#888', fontWeight: 400 }}>info@n-tetbj.com</div>
                            </div>
                            <div>
                                <div style={{ color: '#555', marginBottom: '4px', fontSize: '1.2rem', textTransform: 'uppercase' }}>Sales Hotline</div>
                                <div style={{ color: '#888', fontWeight: 400 }}>+86 010 8362 2127</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style={{ borderTop: '1px solid #222', paddingTop: '40px', textAlign: 'center', fontSize: '1.3rem', color: '#666' }}>
                    © 2026 N-TET Technology. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}
