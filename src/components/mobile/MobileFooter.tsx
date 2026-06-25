'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { solutions as homeSolutions } from '@/constants/homeData';
import { localizedField } from '@/lib/localization';
import { CONTACT_EMAIL, CONTACT_WHATSAPP_DISPLAY } from '@/lib/contactSettings';
import WhatsAppLeadButton from '@/components/contact/WhatsAppLeadButton';
import { hasVisibleProductCategory, type ProductCategoryId } from '@/lib/productCategoryVisibility';

export default function MobileFooter({
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
        <footer style={{ background: '#000f24', color: '#fff', padding: '50px 20px 120px' }}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <Image src="/logo1-small.webp" alt="Logo" width={140} height={48} style={{ height: '48px', width: 'auto', filter: 'brightness(0) invert(1)', marginBottom: '30px' }} />
                
                {/* Consultation button */}
                <Link prefetch={false} href={l("/contact")} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    background: 'transparent',
                    color: '#fff',
                    height: '48px',
                    borderRadius: '24px',
                    border: '1px solid #fff',
                    textDecoration: 'none',
                    fontSize: '18px',
                    fontWeight: 700,
                    margin: '0 auto 40px',
                    width: '90%'
                }}>
                    {dict.contact.consultation}
                </Link>
            </div>

            {/* Footer link sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                
                {/* About us */}
                <div>
                    <h4 style={{ color: '#fff', fontSize: '22px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '15px' }}>{dict.nav.aboutUs}</h4>
                    <p style={{ color: '#888', fontSize: '16px', lineHeight: '1.6' }}>
                        {dict.footer.tagline}
                    </p>
                </div>

                {/* Solutions */}
                <div>
                    <h4 style={{ color: '#fff', fontSize: '22px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '15px' }}>{dict.nav.solutions}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {footerSolutions.map((solution) => {
                            const title = localizedField(solution, 'title', locale);
                            return (
                                <Link key={solution.id} prefetch={false} href={l(solution.link)} style={{ color: '#888', fontSize: '16px' }}>
                                    {title}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Products */}
                <div>
                    <h4 style={{ color: '#fff', fontSize: '22px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '15px' }}>{dict.nav.products}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {productLinks.map((item) => (
                            <Link key={item.id} prefetch={false} href={l(item.href)} style={{ color: '#888', fontSize: '16px' }}>
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>


                {/* Contact us */}
                <div>
                    <h4 style={{ color: '#fff', fontSize: '22px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '20px' }}>{dict.nav.contact}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                        <div>
                            <div style={{ color: '#666', marginBottom: '6px', fontSize: '13px', textTransform: 'uppercase' }}>{dict.contact.whatsapp}</div>
                            <WhatsAppLeadButton sourceLabel="mobile_footer_whatsapp" style={{ color: '#888', fontSize: '16px', textDecoration: 'none' }}>{CONTACT_WHATSAPP_DISPLAY}</WhatsAppLeadButton>
                        </div>
                        <div>
                            <div style={{ color: '#666', marginBottom: '6px', fontSize: '13px', textTransform: 'uppercase' }}>{dict.contact.email}</div>
                            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: '#888', fontSize: '16px', textDecoration: 'none' }}>{CONTACT_EMAIL}</a>
                        </div>
                        <div>
                            <div style={{ color: '#666', marginBottom: '6px', fontSize: '13px', textTransform: 'uppercase' }}>{dict.contact.salesHotline}</div>
                            <div style={{ color: '#888', fontSize: '16px' }}>+86 010 8362 2127</div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '60px', textAlign: 'center', color: '#444', fontSize: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                <p>{dict.footer.copyright}</p>
            </div>
        </footer>
    );
}


