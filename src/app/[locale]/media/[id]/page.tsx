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

                    <article style={{ padding: '70px 0 80px' }}>
                        <div className="container" style={{ maxWidth: '1100px' }}>
                            <header style={{ textAlign: 'center', marginBottom: '48px' }}>
                                <h1 style={{ fontSize: '4.6rem', fontWeight: 900, color: '#333', lineHeight: '1.2', marginBottom: '22px', letterSpacing: 0 }}>{newsTitle}</h1>
                                <div style={{ fontSize: '1.7rem', color: '#666', fontWeight: 500 }}>
                                    <time dateTime={news.date}>{newsDate}</time>
                                </div>
                            </header>

                            <div style={{ marginBottom: '50px', position: 'relative', height: '500px', width: '100%', backgroundColor: '#f5f5f5' }}>
                                <Image src={news.image} alt={newsTitle} fill priority style={{ objectFit: 'cover', borderRadius: '8px' }} sizes="(min-width: 992px) 1100px, 100vw" />
                            </div>

                            <div className="news-rich-content" style={{ fontSize: '1.8rem', lineHeight: '1.8', color: '#444' }}>
                                <OptimizedRichText className="rich-content" html={newsContent} />
                            </div>
                        </div>
                    </article>

                    <section style={{ padding: '90px 0', backgroundColor: '#f9f9f9', borderTop: '1px solid #eee' }}>
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
    if (!isPublicComplianceContent('media', id)) {
        notFound();
    }

    const news = await getMediaById(id);
    if (!news) {
        notFound();
    }

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
                    <div className="container" style={{ padding: '70px 15px' }}>
                        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                            <div style={{ height: '40px', backgroundColor: '#f0f0f0', marginBottom: '30px' }} />
                            <div style={{ height: '20px', backgroundColor: '#f5f5f5', width: '20%', margin: '0 auto 50px' }} />
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
