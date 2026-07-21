'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { CONTACT_EMAIL, CONTACT_WHATSAPP_DISPLAY } from '@/lib/contactSettings';
import PrimaryContactButton from '@/components/contact/PrimaryContactButton';
import { hasVisibleProductCategory, type ProductCategoryId } from '@/lib/productCategoryVisibility';
import { getFooterProductLinks, getFooterSolutionLinks } from '@/lib/footerLinks';
import { localizeCuasTree } from '@/lib/cuasLocaleCopy';

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
    const solutionLinks = getFooterSolutionLinks(locale, dict);
    const productLinks = getFooterProductLinks(locale, dict).filter((item) =>
        item.categoryId ? hasVisibleProductCategory(visibleProductCategoryIds, item.categoryId) : true
    );

    return localizeCuasTree(locale, (
        <footer className="footer desktop-footer" style={{ background: '#000f24', color: 'rgba(255,255,255,0.68)', padding: '100px 0 40px' }}>
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
                                    <Link
                                        prefetch={false}
                                        href={l(item.href)}
                                        target={item.newTab ? '_blank' : undefined}
                                        rel={item.newTab ? 'noopener noreferrer' : undefined}
                                        className="desktop-footer-link"
                                        onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.68)'}
                                    >
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
                                    <Link prefetch={false} href={l(item.href)} className="desktop-footer-link" onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.68)'}>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '25px', fontSize: '1.8rem' }}>{locale === 'ar' ? 'مكتب مبيعات ومشاريع C-UAS' : ['en', 'ru', 'es'].includes(locale) ? 'C-UAS Sales & Project Desk' : dict.nav.contact}</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '1.4rem' }}>
                            <div>
                                <div style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '4px', fontSize: '1.2rem', textTransform: 'uppercase' }}>{dict.contact.whatsapp}</div>
                                <PrimaryContactButton sourceLabel="desktop_footer_whatsapp" style={{ color: 'rgba(255,255,255,0.68)', fontWeight: 400, textDecoration: 'none' }}>{CONTACT_WHATSAPP_DISPLAY}</PrimaryContactButton>
                            </div>
                            <div>
                                <div style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '4px', fontSize: '1.2rem', textTransform: 'uppercase' }}>{dict.contact.email}</div>
                                <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'rgba(255,255,255,0.68)', fontWeight: 400, textDecoration: 'none' }}>{CONTACT_EMAIL}</a>
                            </div>
                            <div>
                                <div style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '4px', fontSize: '1.2rem', textTransform: 'uppercase' }}>{dict.contact.salesHotline}</div>
                                <div style={{ color: 'rgba(255,255,255,0.68)', fontWeight: 400 }}>+86 010 8362 2127</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="desktop-footer-legal">
                    <p>{dict.footer.copyright}</p>
                    <Link prefetch={false} href={l('/privacy-policy')} className="footer-privacy-link">
                        {dict.footer.privacyPolicy}
                    </Link>
                </div>
            </div>
        </footer>
    ));
}


