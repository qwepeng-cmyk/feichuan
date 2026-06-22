import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import InquiryForm from '@/components/products/InquiryForm';
import MobileContact from '@/components/mobile/MobileContact';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import { localePath } from '@/lib/localePath';
import { buildSeoMetadata } from '@/lib/seoMetadata';
import { buildKeywordIntro, getSeoKeywordTarget } from '@/lib/seoKeywordTargets';
import { CONTACT_EMAIL, CONTACT_WHATSAPP_DISPLAY } from '@/lib/contactSettings';
import WhatsAppLeadButton from '@/components/contact/WhatsAppLeadButton';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
    return buildSeoMetadata({
        locale: params.locale,
        path: '/contact',
        fallbackTitle: 'Contact N-TET | Industrial UAV Systems & Monitoring Equipment',
        fallbackDescription: 'Contact N-TET for industrial UAV systems, emergency response drones, inspection UAVs, low-altitude monitoring equipment, and security screening solutions.',
        image: '/about/contact_banner.png',
    });
}

async function ContactContent({ locale, dict }: { locale: Locale; dict: any }) {
    const seoTarget = getSeoKeywordTarget({
        route: '/contact',
        title: dict.contact.bannerTitle,
        pageKind: 'contact',
        locale,
    });
    const bannerTitle = seoTarget.h1 || dict.contact.bannerTitle;
    const seoIntroTitle = seoTarget.overviewHeading || dict.contact.seoIntroTitle;
    const seoIntroBody = buildKeywordIntro(seoTarget, dict.contact.bannerTitle, locale) || dict.contact.seoIntroBody;

    return (
        <>
            <div className="pc_only">
                <div className="contact-page" style={{ paddingTop: '112px', backgroundColor: '#fff' }}>
                    <main>
                        <div className="product-breadcrumb-nav" style={{ borderBottom: '1px solid #f0f0f0', padding: '15px 0' }}>
                            <div className="container">
                                <div className="breadcrumb-path" style={{ fontSize: '1.4rem', color: '#666' }}>
                                    <Link href={localePath(locale)} style={{ color: '#315ba4', textDecoration: 'none' }}>{dict.nav.home}</Link> &gt; {dict.nav.contact}
                                </div>
                            </div>
                        </div>

                        <section className="contact-banner" style={{ 
                            height: '35vh', 
                            minHeight: '280px', 
                            background: "url('/about/contact_banner.png') center center / cover no-repeat", 
                            position: 'relative', 
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            borderBottom: '1px solid #e0e6ed'
                        }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', zIndex: 0 }}></div>
                            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                                <div style={{ maxWidth: '800px' }}>
                                    <h1 style={{ fontSize: '5.2rem', fontWeight: 900, color: '#fff', marginBottom: '15px', lineHeight: 1.1 }}>{bannerTitle}</h1>
                                    <p style={{ fontSize: '2rem', color: '#fff', lineHeight: 1.5, opacity: 0.9 }}>
                                        {dict.contact.bannerDesc}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {seoIntroTitle && seoIntroBody && (
                            <section style={{ padding: '54px 0 8px', backgroundColor: '#fff' }}>
                                <div className="container">
                                    <div style={{ maxWidth: '920px', margin: '0 auto', textAlign: 'center' }}>
                                        <h2 style={{ fontSize: '3.2rem', lineHeight: 1.2, fontWeight: 850, color: '#1f2937', margin: '0 0 16px' }}>
                                            {seoIntroTitle}
                                        </h2>
                                        <p style={{ fontSize: '1.8rem', lineHeight: 1.7, color: '#4b5563', margin: 0 }}>
                                            {seoIntroBody}
                                        </p>
                                    </div>
                                </div>
                            </section>
                        )}

                        <section className="contact-main-content" style={{ padding: '80px 0' }}>
                            <div className="container">
                                <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr', gap: '40px' }}>
                                    <div className="contact-form-area" style={{ background: '#fff' }}>
                                        <InquiryForm dict={dict} />
                                    </div>

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
                                            <h3 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#333', marginBottom: '10px' }}>{dict.contact.directContact}</h3>
                                            
                                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                                <div style={{ width: '40px', color: '#25D366' }}>
                                                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-2.32 0-4.518.892-6.193 2.512-3.14 3.036-3.414 7.918-0.65 11.272l-1.01 3.518 3.65-0.941c1.332.71 2.825 1.082 4.343 1.083l0.005 0.001c4.545 0 8.245-3.627 8.247-8.087 0-2.161-0.854-4.191-2.406-5.717-1.551-1.527-3.615-2.369-5.811-2.371zM16.516 16.485c-0.247 0.686-1.443 1.253-1.99 1.341-0.547.087-1.253.134-3.193-0.627-2.396-0.939-3.943-3.328-4.06-3.483-0.12-0.155-0.976-1.275-0.976-2.433 0-1.159.605-1.728.823-1.954.218-0.226.478-0.283.637-0.283s.318.001.457.006c.142.005.333-0.053.523.402.193.466.66 1.58.717 1.693.056.113.1.245.021.396s-0.113.264-0.226.396c-0.113.132-0.239.294-0.342.396-0.113.113-0.231.237-0.1.458.132.221.584.949 1.257 1.536.866.755 1.597 0.991 1.82 1.093s.345.075.474-0.075c0.129-0.15 0.553-0.641.701-0.858.148-0.217.294-0.183.497-0.108.201.075 1.275.591 1.493.697s.361.16.415.253c.053.093.053.539-0.194 1.225z"/></svg>
                                                </div>
                                                <div>
                                                    <h4 style={{ fontSize: '1.6rem', color: '#666', marginBottom: '5px' }}>{dict.contact.whatsapp}</h4>
                                                    <WhatsAppLeadButton sourceLabel="contact_page_whatsapp" style={{ fontSize: '2rem', fontWeight: 700, color: '#315ba4', textDecoration: 'none' }}>{CONTACT_WHATSAPP_DISPLAY}</WhatsAppLeadButton>
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                                <div style={{ width: '40px', color: '#315ba4' }}>
                                                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                                                </div>
                                                <div>
                                                    <h4 style={{ fontSize: '1.6rem', color: '#666', marginBottom: '5px' }}>{dict.contact.email}</h4>
                                                    <a href={`mailto:${CONTACT_EMAIL}`} style={{ fontSize: '2rem', fontWeight: 700, color: '#333', textDecoration: 'none' }}>{CONTACT_EMAIL}</a>
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                                <div style={{ width: '40px', color: '#315ba4' }}>
                                                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.81 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                                                </div>
                                                <div>
                                                    <h4 style={{ fontSize: '1.6rem', color: '#666', marginBottom: '5px' }}>{dict.contact.salesHotline}</h4>
                                                    <div style={{ fontSize: '20px', fontWeight: 700, color: '#333' }}>+86 010 8362 2127</div>
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                                <div style={{ width: '40px', color: '#315ba4' }}>
                                                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                                                </div>
                                                <div>
                                                    <h4 style={{ fontSize: '1.6rem', color: '#666', marginBottom: '5px' }}>{dict.contact.companyAddress}</h4>
                                                    <div style={{ fontSize: '1.8rem', fontWeight: 600, color: '#333', lineHeight: '1.4' }}>
                                                        {dict.contact.address}
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
            </div>

            <div className="mobile_only">
                <MobileContact dict={dict} />
            </div>
        </>
    );
}

export default async function ContactPage({ params }: { params: { locale: Locale } }) {
    const { locale } = params;
    const dict = await getDictionary(locale);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: `
                .mobile_only { display: none !important; }
                .pc_only { display: block !important; }
                @media (max-width: 991px) {
                    .mobile_only { display: block !important; }
                    .pc_only { display: none !important; }
                }
            `}} />

            <Suspense fallback={
                <div style={{ paddingTop: '112px', minHeight: '100vh', backgroundColor: '#fff' }}>
                    <div style={{ height: '35vh', backgroundColor: '#f5f5f5' }} />
                    <div className="container" style={{ padding: '80px 15px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr', gap: '40px' }}>
                            <div style={{ height: '500px', backgroundColor: '#f9f9f9' }} />
                            <div style={{ height: '500px', backgroundColor: '#f4f7fa' }} />
                        </div>
                    </div>
                </div>
            }>
                <ContactContent locale={locale} dict={dict} />
            </Suspense>
        </>
    );
}
