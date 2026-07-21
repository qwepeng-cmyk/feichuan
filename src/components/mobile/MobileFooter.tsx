'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CONTACT_EMAIL, CONTACT_WHATSAPP_DISPLAY } from '@/lib/contactSettings';
import PrimaryContactButton from '@/components/contact/PrimaryContactButton';
import { hasVisibleProductCategory, type ProductCategoryId } from '@/lib/productCategoryVisibility';
import { getFooterProductLinks, getFooterSolutionLinks } from '@/lib/footerLinks';
import { localizeCuasTree } from '@/lib/cuasLocaleCopy';

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
    const solutionLinks = getFooterSolutionLinks(locale, dict);
    const productLinks = getFooterProductLinks(locale, dict).filter((item) =>
        item.categoryId ? hasVisibleProductCategory(visibleProductCategoryIds, item.categoryId) : true
    );

    return localizeCuasTree(locale, (
        <footer className="mobile-footer" style={{ background: '#000f24', color: '#fff', padding: '50px 20px 120px' }}>
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
                    <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: '16px', lineHeight: '1.6' }}>
                        {dict.footer.tagline}
                    </p>
                </div>

                {/* Solutions */}
                <div>
                    <h4 style={{ color: '#fff', fontSize: '22px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '15px' }}>{dict.nav.solutions}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {solutionLinks.map((item) => (
                            <Link
                                key={item.href}
                                prefetch={false}
                                href={l(item.href)}
                                target={item.newTab ? '_blank' : undefined}
                                rel={item.newTab ? 'noopener noreferrer' : undefined}
                                style={{ color: 'rgba(255,255,255,0.68)', fontSize: '16px', lineHeight: 1.45 }}
                            >
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
                            <Link key={item.href} prefetch={false} href={l(item.href)} style={{ color: 'rgba(255,255,255,0.68)', fontSize: '16px', lineHeight: 1.45 }}>
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Contact us */}
                <div>
                    <h4 style={{ color: '#fff', fontSize: '22px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '20px' }}>{locale === 'ar' ? 'مكتب مبيعات ومشاريع C-UAS' : ['en', 'ru', 'es'].includes(locale) ? 'C-UAS Sales & Project Desk' : dict.nav.contact}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                        <div>
                            <div style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontSize: '13px', textTransform: 'uppercase' }}>{dict.contact.whatsapp}</div>
                            <PrimaryContactButton sourceLabel="mobile_footer_whatsapp" style={{ color: 'rgba(255,255,255,0.68)', fontSize: '16px', textDecoration: 'none' }}>{CONTACT_WHATSAPP_DISPLAY}</PrimaryContactButton>
                        </div>
                        <div>
                            <div style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontSize: '13px', textTransform: 'uppercase' }}>{dict.contact.email}</div>
                            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'rgba(255,255,255,0.68)', fontSize: '16px', textDecoration: 'none' }}>{CONTACT_EMAIL}</a>
                        </div>
                        <div>
                            <div style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontSize: '13px', textTransform: 'uppercase' }}>{dict.contact.salesHotline}</div>
                            <div style={{ color: 'rgba(255,255,255,0.68)', fontSize: '16px' }}>+86 010 8362 2127</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mobile-footer-legal">
                <p>{dict.footer.copyright}</p>
                <Link prefetch={false} href={l('/privacy-policy')} className="footer-privacy-link">
                    {dict.footer.privacyPolicy}
                </Link>
            </div>
        </footer>
    ));
}


