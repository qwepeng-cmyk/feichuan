import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import InquiryForm from '@/components/products/InquiryForm';
import MobileMediaDetail from '@/components/mobile/MobileMediaDetail';
import { getMediaById, getAllMediaIds } from '@/lib/media';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import OptimizedRichText from '@/components/common/OptimizedRichText';
import JsonLd from '@/components/seo/JsonLd';
import { articleJsonLd, pageUrl, stripHtml } from '@/lib/structuredData';
import { localePath } from '@/lib/localePath';
import { getLocalizedMediaDate, getLocalizedMediaTitle } from '@/lib/mediaDisplay';
import { buildSeoMetadata } from '@/lib/seoMetadata';
import { isPublicComplianceContent } from '@/lib/complianceTaxonomy';

export async function generateStaticParams() {
    const ids = await getAllMediaIds();
    return ids
        .filter((id) => isPublicComplianceContent('media', id))
        .map((id) => ({
            id,
        }));
}

export async function generateMetadata({ params }: { params: { id: string; locale: Locale } }): Promise<Metadata> {
    if (!isPublicComplianceContent('media', params.id)) return {};
    const news = await getMediaById(params.id);
    if (!news) return {};

    const newsTitle = getLocalizedMediaTitle(news, params.locale);
    const newsContent = news[`content_${params.locale}`] || news.content_en || news.content;

    return buildSeoMetadata({
        locale: params.locale,
        path: `/media/${params.id}`,
        fallbackTitle: newsTitle,
        fallbackDescription: stripHtml(newsContent).slice(0, 240),
        image: news.image,
    });
}

// 1. Data Fetching Component (Streaming)
async function NewsDetailContent({ id, locale }: { id: string, locale: Locale }) {
    const dict = await getDictionary(locale);
    if (!isPublicComplianceContent('media', id)) {
        notFound();
    }

    const news = await getMediaById(id);
    if (!news) {
        notFound();
    }

    const newsTitle = getLocalizedMediaTitle(news, locale);
    const newsDate = getLocalizedMediaDate(news.date, locale);
    const newsContent = news[`content_${locale}`] || news.content_en || news.content;
    const jsonLd = articleJsonLd({
        locale,
        path: `/media/${id}`,
        title: newsTitle,
        description: stripHtml(newsContent).slice(0, 240),
        image: news.image,
        datePublished: news.date,
        dateModified: news.date,
        breadcrumbs: [
            { name: dict.nav.home, url: pageUrl(locale, '/') },
            { name: dict.nav.media, url: pageUrl(locale, '/media') },
            { name: newsTitle, url: pageUrl(locale, `/media/${id}`) },
        ],
    });

    return (
        <>
            <JsonLd data={jsonLd} />

            <div className="pc_only">
                <div className="news-detail-page" style={{ paddingTop: '112px', backgroundColor: '#fff' }}>
                    <div className="product-breadcrumb-nav" style={{ borderBottom: '1px solid #f0f0f0', padding: '15px 0' }}>
                        <div className="container">
                            <div className="breadcrumb-path" style={{ fontSize: '1.4rem', color: '#666' }}>
                                <Link href={localePath(locale)} style={{ color: '#315ba4', textDecoration: 'none' }}>{dict.nav.home}</Link> &gt; <Link href={localePath(locale, '/media')} style={{ color: '#315ba4', textDecoration: 'none' }}>{dict.nav.media}</Link> &gt; {newsTitle}
                            </div>
                        </div>
                    </div>

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
                        <Image
                            src="/media/news-center-expo-banner.webp"
                            fill
                            style={{ objectFit: 'cover', objectPosition: 'center' }}
                            priority
                            alt={dict.media.bannerTitle}
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(2, 10, 24, 0.82) 0%, rgba(13, 36, 75, 0.58) 42%, rgba(49, 91, 164, 0.12) 72%, rgba(1, 8, 18, 0.18) 100%)', zIndex: 1 }}></div>
                        
                        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ maxWidth: '700px', textShadow: '0 10px 28px rgba(0, 0, 0, 0.34)' }}>
                                <div style={{ fontSize: '5.2rem', fontWeight: 900, color: '#fff', marginBottom: '15px', lineHeight: 1.1 }}>{dict.media.bannerTitle}</div>
                                <p style={{ fontSize: '2rem', color: '#fff', lineHeight: 1.5, opacity: 0.95 }}>{dict.media.bannerSubtitle}</p>
                            </div>
                        </div>
                    </section>

                    <article style={{ padding: '80px 0' }}>
                        <div className="container" style={{ maxWidth: '1200px' }}>
                            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                                <h1 style={{ fontSize: '4.8rem', fontWeight: 900, color: '#333', lineHeight: '1.2', marginBottom: '30px' }}>{newsTitle}</h1>
                                <div style={{ fontSize: '1.8rem', color: '#666', fontWeight: 500 }}>{newsDate}</div>
                            </div>

                            <div style={{ marginBottom: '50px', position: 'relative', height: '500px', width: '100%', backgroundColor: '#f5f5f5' }}>
                                <Image src={news.image} alt={newsTitle} fill style={{ objectFit: 'cover', borderRadius: '8px' }} sizes="100vw" />
                            </div>

                            <div className="news-rich-content" style={{ fontSize: '1.8rem', lineHeight: '1.8', color: '#444' }}>
                                <OptimizedRichText className="rich-content" html={newsContent} />
                            </div>
                        </div>
                    </article>

                    <section style={{ padding: '100px 0', backgroundColor: '#f9f9f9', borderTop: '1px solid #eee' }}>
                        <div className="container" style={{ maxWidth: '1200px' }}>
                            <InquiryForm dict={dict} />
                        </div>
                    </section>
                </div>
            </div>

            <div className="mobile_only">
                <MobileMediaDetail news={news} locale={locale} dict={dict} />
            </div>
        </>
    );
}

// 2. Entry Page Component (Instant Navigation)
export default async function NewsDetailPage({ params }: { params: { id: string, locale: Locale } }) {
    const { id, locale } = params;

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
                    {/* Banner Skeleton */}
                    <div style={{ height: '35vh', backgroundColor: '#f5f5f5' }} />
                    <div className="container" style={{ padding: '60px 15px' }}>
                        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                            {/* Title Skeleton */}
                            <div style={{ height: '40px', backgroundColor: '#f0f0f0', marginBottom: '30px' }} />
                            {/* Date Skeleton */}
                            <div style={{ height: '20px', backgroundColor: '#f5f5f5', width: '20%', margin: '0 auto 50px' }} />
                            {/* Image Skeleton */}
                            <div style={{ width: '100%', height: '400px', backgroundColor: '#f5f5f5', borderRadius: '8px' }} />
                        </div>
                    </div>
                </div>
            }>
                <NewsDetailContent id={id} locale={locale} />
            </Suspense>
        </>
    );
}
