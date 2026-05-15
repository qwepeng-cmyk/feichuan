'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer({ locale, dict }: { locale: string; dict: any }) {
    const l = (path: string) => locale === 'en' ? path : `/${locale}${path === '/' ? '' : path}`;

    return (
        <footer className="footer" style={{ background: '#111', color: '#888', padding: '100px 0 40px' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1.2fr', gap: '60px', marginBottom: '60px' }}>
                    <div>
                        <div style={{ position: 'relative', width: '168px', height: '56px', marginBottom: '30px' }}>
                            <Image src="/logo1-small.webp" alt="Logo" fill style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
                        </div>
                        <p style={{ lineHeight: 1.6, fontSize: '1.4rem' }}>{dict.footer.tagline}</p>
                    </div>
                    
                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '25px', fontSize: '1.8rem' }}>{dict.nav.solutions}</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '1.4rem' }}>
                            <li><Link prefetch={false} href={l("/solutions/category/01_BorderPatrol")} style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>{dict.solutionCategories.borderPatrol}</Link></li>
                            <li><Link prefetch={false} href={l("/solutions/category/02_InfrastructureProtection")} style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>{dict.solutionCategories.infrastructureProtection}</Link></li>
                            <li><Link prefetch={false} href={l("/solutions/category/03_KeyAreaSecurity")} style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>{dict.solutionCategories.keyAreaSecurity}</Link></li>
                            <li><Link prefetch={false} href={l("/solutions/category/04_EmergencyRescue")} style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>{dict.solutionCategories.emergencyRescue}</Link></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '25px', fontSize: '1.8rem' }}>{dict.nav.products}</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '1.4rem' }}>
                            <li><Link prefetch={false} href={l("/products#uav-drone-systems")} style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>{dict.megaMenu.uavSystems}</Link></li>
                            <li><Link prefetch={false} href={l("/products#anti-drone-cuas")} style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>{dict.megaMenu.antiDrone}</Link></li>
                            <li><Link prefetch={false} href={l("/products#security-screening")} style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>{dict.megaMenu.securityScreening}</Link></li>
                            <li><Link prefetch={false} href={l("/products#defense-engineering")} style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>{dict.megaMenu.defenseEngineering}</Link></li>
                            <li><Link prefetch={false} href={l("/products#field-hospitals")} style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>{dict.megaMenu.fieldHospitals}</Link></li>
                            <li><Link prefetch={false} href={l("/products#perimeter-intelligence")} style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>{dict.megaMenu.perimeterSurveillance}</Link></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '25px', fontSize: '1.8rem' }}>{dict.nav.contact}</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '1.4rem' }}>
                            <div>
                                <div style={{ color: '#555', marginBottom: '4px', fontSize: '1.2rem', textTransform: 'uppercase' }}>{dict.contact.whatsapp}</div>
                                <div style={{ color: '#888', fontWeight: 400 }}>+86 136 1371 4648</div>
                            </div>
                            <div>
                                <div style={{ color: '#555', marginBottom: '4px', fontSize: '1.2rem', textTransform: 'uppercase' }}>{dict.contact.email}</div>
                                <div style={{ color: '#888', fontWeight: 400 }}>info@n-tetbj.com</div>
                            </div>
                            <div>
                                <div style={{ color: '#555', marginBottom: '4px', fontSize: '1.2rem', textTransform: 'uppercase' }}>{dict.contact.salesHotline}</div>
                                <div style={{ color: '#888', fontWeight: 400 }}>+86 010 8362 2127</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style={{ borderTop: '1px solid #222', paddingTop: '40px', textAlign: 'center', fontSize: '1.3rem', color: '#666' }}>
                    {dict.footer.copyright}
                </div>
            </div>
        </footer>
    );
}


