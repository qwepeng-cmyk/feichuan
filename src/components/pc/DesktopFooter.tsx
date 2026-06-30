'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { solutions as homeSolutions } from '@/constants/homeData';
import { localizedField } from '@/lib/localization';
import { CONTACT_EMAIL, CONTACT_WHATSAPP_DISPLAY } from '@/lib/contactSettings';
import WhatsAppLeadButton from '@/components/contact/WhatsAppLeadButton';
import { hasVisibleProductCategory, type ProductCategoryId } from '@/lib/productCategoryVisibility';

type FooterLink = {
    href: string;
    label: string;
    categoryId?: ProductCategoryId;
};

function productCategoryLink(categoryId: ProductCategoryId, href: string, label: string): FooterLink {
    return { categoryId, href, label };
}

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
    const pathname = usePathname();
    const normalizedPathname = pathname.replace(/\/$/, '') || '/';
    const localizedHomePath = locale === 'en' ? '/' : `/${locale}`;
    const isHomeFooter = normalizedPathname === localizedHomePath;
    const prioritySolutionLinks: FooterLink[] = [
        { href: '/solutions', label: dict.solutions?.pageTitle || dict.nav.solutions },
        { href: '/solutions/low-altitude-airspace-monitoring', label: 'Low-Altitude Airspace Monitoring' },
        { href: '/solutions/category/01_BorderPatrol', label: dict.solutionCategories?.borderPatrol || 'Border Patrol UAV Solutions' },
        { href: '/solutions/category/02_InfrastructureProtection', label: dict.solutionCategories?.infrastructureProtection || 'Critical Infrastructure Protection' },
        { href: '/solutions/category/03_KeyAreaSecurity', label: dict.solutionCategories?.keyAreaSecurity || 'Key Area Security' },
        { href: '/solutions/category/04_EmergencyRescue', label: dict.solutionCategories?.emergencyRescue || 'Emergency & Disaster Rescue' },
    ];
    const homepageSolutionLinks: FooterLink[] = homeSolutions.slice(0, 6).map((solution) => ({
        href: solution.link,
        label: localizedField(solution, 'title', locale),
    }));
    const solutionLinks = [...prioritySolutionLinks, ...homepageSolutionLinks].filter((item, index, items) =>
        items.findIndex((candidate) => candidate.href === item.href) === index
    );
    const productLinkCandidates: FooterLink[] = [
        { href: '/products', label: dict.products?.pageTitle || dict.nav.products },
        productCategoryLink('uav-drone-systems', '/products#uav-drone-systems', dict.megaMenu.uavSystems),
        productCategoryLink('drone-detection', '/products#drone-detection', dict.megaMenu.droneDetection),
        productCategoryLink('perimeter-intelligence', '/products#perimeter-intelligence', dict.products?.categories?.surveillance || dict.megaMenu.perimeterSurveillance),
        productCategoryLink('industrial-engine-microgrid', '/products#industrial-engine-microgrid', dict.products?.categories?.industrialEngineMicrogrid || 'Industrial Engines'),
        productCategoryLink('security-screening', '/products#security-screening', dict.megaMenu.securityScreening),
        productCategoryLink('engineering-materials', '/products#engineering-materials', dict.megaMenu.engineeringMaterials),
        productCategoryLink('field-hospitals', '/products#field-hospitals', dict.megaMenu.fieldHospitals),
        { href: '/accessories', label: dict.accessories?.title || dict.nav.accessories || 'Drone Accessories' },
    ];
    const productLinks = productLinkCandidates.filter((item) =>
        item.categoryId ? hasVisibleProductCategory(visibleProductCategoryIds, item.categoryId) : true
    );

    return (
        <footer className="footer desktop-footer" style={{ background: '#111', color: '#888', padding: '100px 0 40px' }}>
            <div className={`desktop-footer-shell ${isHomeFooter ? 'desktop-footer-shell-home' : 'desktop-footer-shell-inner'}`}>
                <div className="desktop-footer-grid">
                    <div>
                        <div style={{ position: 'relative', width: '168px', height: '56px', marginBottom: '30px' }}>
                            <Image src="/logo1-small.webp" alt="Logo" fill style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
                        </div>
                        <p style={{ lineHeight: 1.6, fontSize: '1.4rem' }}>{dict.footer.tagline}</p>
                    </div>
                    
                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '25px', fontSize: '1.8rem' }}>{dict.nav.solutions}</h4>
                        <ul className="desktop-footer-link-list">
                            {solutionLinks.map((item) => (
                                <li key={item.href}>
                                    <Link prefetch={false} href={l(item.href)} className="desktop-footer-link" onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '25px', fontSize: '1.8rem' }}>{dict.nav.products}</h4>
                        <ul className="desktop-footer-link-list desktop-footer-product-list">
                            {productLinks.map((item) => (
                                <li key={item.href}>
                                    <Link prefetch={false} href={l(item.href)} className="desktop-footer-link" onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>
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


