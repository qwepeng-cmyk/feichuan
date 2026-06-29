'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
                        {solutionLinks.map((item) => (
                            <Link key={item.href} prefetch={false} href={l(item.href)} style={{ color: '#888', fontSize: '16px', lineHeight: 1.45 }}>
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Products */}
                <div>
                    <h4 style={{ color: '#fff', fontSize: '22px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '15px' }}>{dict.nav.products}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {productLinks.map((item) => (
                            <Link key={item.href} prefetch={false} href={l(item.href)} style={{ color: '#888', fontSize: '16px', lineHeight: 1.45 }}>
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


