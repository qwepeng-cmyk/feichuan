import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import InquiryForm from '@/components/products/InquiryForm';
import MobileMediaDetail from '@/components/mobile/MobileMediaDetail';
import { getMediaById, getAllMediaIds } from '@/lib/media';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';

export async function generateStaticParams() {
    const ids = await getAllMediaIds();
    return ids.map((id) => ({
        id,
    }));
}

export default async function NewsDetailPage({ params }: { params: { id: string, locale: Locale } }) {
    const { id, locale } = params;
    const news = await getMediaById(id);
    const dict = await getDictionary(locale);

    if (!news) {
        notFound();
    }

    const newsTitle = news[`title_${locale}`] || news.title_en || news.title;
    const newsContent = news[`content_${locale}`] || news.content_en || news.content;

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

            {/* PC VIEW */}
            <div className="pc_only">
                <div className="news-detail-page" style={{ paddingTop: '112px', backgroundColor: '#fff' }}>
                    {/* 1. Breadcrumb Row */}
                    <div className="product-breadcrumb-nav" style={{ borderBottom: '1px solid #f0f0f0', padding: '15px 0' }}>
                        <div className="container">
                            <div className="breadcrumb-path" style={{ fontSize: '1.4rem', color: '#666' }}>
                                <Link href={`/${locale}`} style={{ color: '#315ba4', textDecoration: 'none' }}>{dict.nav.home}</Link> &gt; <Link href={`/${locale}/media`} style={{ color: '#315ba4', textDecoration: 'none' }}>{dict.nav.media}</Link> &gt; {newsTitle}
                            </div>
                        </div>
                    </div>

                    {/* 2. Banner Section */}
                    <section className="product-banner" style={{ 
                        height: '40vh',
                        minHeight: '320px',
                        maxHeight: '450px', 
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        borderBottom: '1px solid #e1e8f0'
                    }}>
                        <Image src="/media/media_banner.jpg" fill style={{ objectFit: 'cover' }} priority alt={dict.media.bannerTitle} />
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1 }}></div>
                        
                        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ maxWidth: '800px' }}>
                                <h1 style={{ fontSize: '5.2rem', fontWeight: 900, color: '#fff', marginBottom: '15px', lineHeight: 1.1 }}>{dict.media.bannerTitle}</h1>
                                <p style={{ fontSize: '2rem', color: '#fff', lineHeight: 1.5, opacity: 0.95 }}>{dict.media.bannerSubtitle}</p>
                            </div>
                        </div>
                    </section>

                    {/* 3. News Main Content */}
                    <article style={{ padding: '80px 0' }}>
                        <div className="container" style={{ maxWidth: '1200px' }}>
                            {/* Title & Meta */}
                            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                                <h1 style={{ fontSize: '4.8rem', fontWeight: 900, color: '#333', lineHeight: '1.2', marginBottom: '30px' }}>{newsTitle}</h1>
                                <div style={{ fontSize: '1.8rem', color: '#666', fontWeight: 500 }}>{news.date}</div>
                            </div>

                            {/* Featured Image */}
                            <div style={{ marginBottom: '50px', position: 'relative', height: '500px', width: '100%' }}>
                                <Image src={news.image} alt={newsTitle} fill style={{ objectFit: 'cover', borderRadius: '8px' }} sizes="100vw" />
                            </div>

                            {/* Rich Content Area */}
                            <div className="news-rich-content" style={{
                                fontSize: '1.8rem',
                                lineHeight: '1.8',
                                color: '#444'
                            }}>
                                <div dangerouslySetInnerHTML={{ __html: newsContent }} />
                            </div>
                        </div>
                    </article>

                    {/* 4. Global Inquiry Module */}
                    <section style={{ padding: '100px 0', backgroundColor: '#f9f9f9', borderTop: '1px solid #eee' }}>
                        <div className="container" style={{ maxWidth: '1200px' }}>
                            <InquiryForm dict={dict} />
                        </div>
                    </section>
                </div>
            </div>

            {/* MOBILE VIEW */}
            <div className="mobile_only">
                <MobileMediaDetail news={news} locale={locale} dict={dict} />
            </div>
        </>
    );
}
