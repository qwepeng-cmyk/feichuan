'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { solutions as homeSolutions } from '@/constants/homeData';
import { localizedField } from '@/lib/localization';
import { CONTACT_EMAIL, CONTACT_WHATSAPP_DISPLAY } from '@/lib/contactSettings';
import WhatsAppLeadButton from '@/components/contact/WhatsAppLeadButton';
import { hasVisibleProductCategory, type ProductCategoryId } from '@/lib/productCategoryVisibility';

export default function Footer({
    locale,
    dict,
    visibleProductCategoryIds
}: {
    locale: string;
    dict: any;
    visibleProductCategoryIds?: ProductCategoryId[];
}) {
    const l = (path: string) => locale === 'en' ? path : `/${locale}${path === '/' ? '' : path}`;
    const footerSolutions = homeSolutions.slice(0, 6);
    const productLinks = [
        { id: 'uav-drone-systems' as const, href: '/products#uav-drone-systems', label: dict.megaMenu.uavSystems },
        { id: 'drone-detection' as const, href: '/products#drone-detection', label: dict.megaMenu.droneDetection },
        { id: 'security-screening' as const, href: '/products#security-screening', label: dict.megaMenu.securityScreening },
        { id: 'engineering-materials' as const, href: '/products#engineering-materials', label: dict.megaMenu.engineeringMaterials },
        { id: 'field-hospitals' as const, href: '/products#field-hospitals', label: dict.megaMenu.fieldHospitals },
        { id: 'perimeter-intelligence' as const, href: '/products#perimeter-intelligence', label: dict.megaMenu.perimeterSurveillance },
    ].filter((item) => hasVisibleProductCategory(visibleProductCategoryIds, item.id));

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
                            {footerSolutions.map((solution) => {
                                const title = localizedField(solution, 'title', locale);
                                return (
                                    <li key={solution.id}>
                                        <Link prefetch={false} href={l(solution.link)} style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>
                                            {title}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    
                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '25px', fontSize: '1.8rem' }}>{dict.nav.products}</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '1.4rem' }}>
                            {productLinks.map((item) => (
                                <li key={item.id}>
                                    <Link prefetch={false} href={l(item.href)} style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '25px', fontSize: '1.8rem' }}>{dict.nav.contact}</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '1.4rem' }}>
                            <div>
                                <div style={{ color: '#555', marginBottom: '4px', fontSize: '1.2rem', textTransform: 'uppercase' }}>{dict.contact.whatsapp}</div>
                                <WhatsAppLeadButton sourceLabel="desktop_footer_whatsapp" style={{ color: '#888', fontWeight: 400, textDecoration: 'none' }}>{CONTACT_WHATSAPP_DISPLAY}</WhatsAppLeadButton>
                            </div>
                            <div>
                                <div style={{ color: '#555', marginBottom: '4px', fontSize: '1.2rem', textTransform: 'uppercase' }}>{dict.contact.email}</div>
                                <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: '#888', fontWeight: 400, textDecoration: 'none' }}>{CONTACT_EMAIL}</a>
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


