import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import InquiryForm from '@/components/products/InquiryForm';
import MobileMediaDetail from '@/components/mobile/MobileMediaDetail';
import ArticleEditorialSignals from '@/components/media/ArticleEditorialSignals';
import { getMediaById, getAllMediaIds } from '@/lib/media';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import OptimizedRichText from '@/components/common/OptimizedRichText';
import JsonLd from '@/components/seo/JsonLd';
import RelatedPublicLinks from '@/components/seo/RelatedPublicLinks';
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
    const newsSummary = stripHtml(newsContent).slice(0, 220);
    const relatedLinks = [
        { href: '/media', label: dict.nav.media, description: 'More N-TET technical articles' },
        { href: '/solutions', label: dict.nav.solutions, description: 'Related field operations' },
        { href: '/products', label: dict.nav.products, description: 'Industrial UAV and monitoring equipment' },
        { href: '/contact', label: dict.nav.contact, description: 'Project inquiry and quotation' },
    ];
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
                <div className="news-detail-page media-editorial-page">
                    <div className="media-editorial-bg" aria-hidden="true" />

                    <div className="media-article-shell">
                        <nav className="media-breadcrumb" aria-label="Breadcrumb">
                            <Link href={localePath(locale)}>{dict.nav.home}</Link>
                            <span>/</span>
                            <Link href={localePath(locale, '/media')}>{dict.nav.media}</Link>
                            <span>/</span>
                            <strong>{newsTitle}</strong>
                        </nav>

                        <header className="media-article-hero">
                            <div className="media-hero-copy">
                                <div className="media-kicker">
                                    <span>{news.category || dict.nav.media}</span>
                                    <time dateTime={news.date}>{newsDate}</time>
                                </div>
                                <h1>{newsTitle}</h1>
                                <p>{newsSummary}</p>
                                <div className="media-hero-signals" aria-label="Article signals">
                                    <span>Field operations</span>
                                    <span>Equipment fit</span>
                                    <span>AI citation ready</span>
                                </div>
                            </div>

                            <div className="media-hero-visual">
                                <Image src={news.image} alt={newsTitle} fill priority sizes="(min-width: 992px) 42vw, 100vw" />
                                <div className="media-visual-caption">
                                    <span>N-TET technical article</span>
                                    <strong>{dict.nav.media}</strong>
                                </div>
                            </div>
                        </header>

                        <article className="media-article-layout">
                            <aside className="media-article-rail" aria-label="Article summary">
                                <div className="media-rail-card">
                                    <span className="media-rail-label">Article type</span>
                                    <strong>Operational guide</strong>
                                </div>
                                <div className="media-rail-card">
                                    <span className="media-rail-label">Best for</span>
                                    <strong>Utility inspection teams</strong>
                                </div>
                                <div className="media-rail-card">
                                    <span className="media-rail-label">Use with</span>
                                    <strong>Products, solutions, and field evidence</strong>
                                </div>
                            </aside>

                            <div className="media-article-main">
                                <ArticleEditorialSignals locale={locale} title={newsTitle} date={newsDate} dateTime={news.date} />

                                <div className="news-rich-content media-rich-content">
                                    <OptimizedRichText className="rich-content" html={newsContent} />
                                </div>
                            </div>
                        </article>
                    </div>

                    <section style={{ padding: '90px 0', backgroundColor: '#f4f7fb', borderTop: '1px solid #dfe7f1' }}>
                        <div className="container" style={{ maxWidth: '1200px' }}>
                            <InquiryForm dict={dict} />
                        </div>
                    </section>
                </div>
            </div>

            <div className="mobile_only">
                <MobileMediaDetail news={news} locale={locale} dict={dict} />
            </div>

            <RelatedPublicLinks locale={locale} links={relatedLinks} />
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
                .media-editorial-page {
                    position: relative;
                    padding-top: 112px;
                    background: #f5f7fb;
                    color: #0c1424;
                    overflow: hidden;
                }
                .media-editorial-bg {
                    position: absolute;
                    inset: 112px 0 auto;
                    height: 720px;
                    background:
                        linear-gradient(135deg, rgba(11, 23, 42, 0.94) 0%, rgba(19, 47, 88, 0.88) 46%, rgba(49, 91, 164, 0.72) 100%),
                        url('/media/news-center-expo-banner.webp') center/cover;
                }
                .media-editorial-bg::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px);
                    background-size: 48px 48px;
                    opacity: 0.32;
                }
                .media-article-shell {
                    position: relative;
                    z-index: 1;
                    width: min(1160px, calc(100% - 48px));
                    margin: 0 auto;
                    padding: 26px 0 0;
                }
                .media-breadcrumb {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    min-width: 0;
                    margin-bottom: 28px;
                    color: rgba(255,255,255,0.76);
                    font-size: 1.35rem;
                    line-height: 1.4;
                }
                .media-breadcrumb a {
                    color: #ffffff;
                    text-decoration: none;
                    font-weight: 750;
                }
                .media-breadcrumb strong {
                    min-width: 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: rgba(255,255,255,0.82);
                    font-weight: 600;
                }
                .media-article-hero {
                    display: grid;
                    grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.72fr);
                    gap: 42px;
                    align-items: stretch;
                    margin-bottom: 42px;
                }
                .media-hero-copy {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    min-height: 440px;
                    padding: 48px 0 76px;
                    color: #fff;
                }
                .media-kicker {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 24px;
                    font-size: 1.28rem;
                    font-weight: 850;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: #cfe3ff;
                }
                .media-kicker span,
                .media-kicker time {
                    display: inline-flex;
                    align-items: center;
                    min-height: 34px;
                    padding: 0 13px;
                    border: 1px solid rgba(255,255,255,0.24);
                    background: rgba(255,255,255,0.08);
                }
                .media-hero-copy h1 {
                    max-width: 760px;
                    margin: 0;
                    color: #fff;
                    font-size: clamp(3.8rem, 3.85vw, 5.8rem);
                    line-height: 1.04;
                    font-weight: 950;
                    letter-spacing: 0;
                }
                .media-hero-copy p {
                    max-width: 720px;
                    margin: 28px 0 0;
                    color: rgba(244, 248, 255, 0.9);
                    font-size: 1.82rem;
                    line-height: 1.72;
                }
                .media-hero-signals {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                    margin-top: 34px;
                }
                .media-hero-signals span {
                    padding: 10px 14px;
                    border-left: 3px solid #8ebdff;
                    background: rgba(255,255,255,0.92);
                    color: #10213f;
                    font-size: 1.38rem;
                    font-weight: 800;
                    box-shadow: 0 14px 34px rgba(2, 12, 30, 0.16);
                }
                .media-hero-visual {
                    position: relative;
                    min-height: 520px;
                    overflow: hidden;
                    border: 1px solid rgba(255,255,255,0.28);
                    box-shadow: 0 34px 90px rgba(2, 12, 30, 0.34);
                    background: #0b172a;
                }
                .media-hero-visual img {
                    object-fit: cover;
                    object-position: center;
                    filter: saturate(1.04) contrast(1.03);
                }
                .media-hero-visual::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(180deg, rgba(3, 12, 28, 0.04), rgba(3, 12, 28, 0.56));
                }
                .media-visual-caption {
                    position: absolute;
                    left: 22px;
                    right: 22px;
                    bottom: 22px;
                    z-index: 1;
                    display: flex;
                    justify-content: space-between;
                    gap: 18px;
                    padding: 16px 18px;
                    background: rgba(6, 16, 34, 0.74);
                    border: 1px solid rgba(255,255,255,0.22);
                    color: #fff;
                    backdrop-filter: blur(12px);
                }
                .media-visual-caption span {
                    color: rgba(255,255,255,0.76);
                    font-size: 1.28rem;
                    font-weight: 700;
                }
                .media-visual-caption strong {
                    font-size: 1.28rem;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                }
                .media-article-layout {
                    display: grid;
                    grid-template-columns: 245px minmax(0, 1fr);
                    gap: 38px;
                    align-items: start;
                    padding: 44px 0 84px;
                }
                .media-article-rail {
                    position: sticky;
                    top: 134px;
                    display: grid;
                    gap: 14px;
                }
                .media-rail-card {
                    padding: 18px 18px 20px;
                    background: #ffffff;
                    border: 1px solid #dfe7f1;
                    border-top: 3px solid #315ba4;
                    box-shadow: 0 18px 42px rgba(15, 23, 42, 0.06);
                }
                .media-rail-label {
                    display: block;
                    margin-bottom: 9px;
                    color: #64748b;
                    font-size: 1.16rem;
                    font-weight: 900;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                }
                .media-rail-card strong {
                    display: block;
                    color: #12213a;
                    font-size: 1.48rem;
                    line-height: 1.45;
                    font-weight: 850;
                }
                .media-article-main {
                    min-width: 0;
                    padding: 42px 52px 58px;
                    background: #ffffff;
                    border: 1px solid #dfe7f1;
                    box-shadow: 0 26px 80px rgba(15, 23, 42, 0.08);
                }
                .media-article-main > section:first-child {
                    max-width: none !important;
                    margin: 0 0 48px !important;
                    border: 1px solid #cddced !important;
                    border-left: 5px solid #315ba4 !important;
                    background: linear-gradient(135deg, #f7fbff 0%, #eef5ff 100%) !important;
                    box-shadow: none !important;
                }
                .media-rich-content {
                    font-size: 1.78rem;
                    line-height: 1.86;
                    color: #263244;
                }
                .media-rich-content .rich-content > p:first-child {
                    font-size: 2.05rem;
                    line-height: 1.76;
                    color: #17233a;
                    padding-bottom: 28px;
                    margin-bottom: 34px;
                    border-bottom: 1px solid #e2e8f0;
                }
                .media-rich-content .rich-content h2,
                .media-rich-content .rich-content h3,
                .media-rich-content .rich-content h4 {
                    position: relative;
                    margin: 64px 0 22px;
                    color: #061126;
                    font-size: clamp(2.8rem, 3vw, 4.3rem);
                    line-height: 1.12;
                    font-weight: 950;
                    letter-spacing: 0;
                }
                .media-rich-content .rich-content h2::before,
                .media-rich-content .rich-content h3::before,
                .media-rich-content .rich-content h4::before {
                    content: '';
                    display: block;
                    width: 86px;
                    height: 5px;
                    margin-bottom: 18px;
                    background: linear-gradient(90deg, #315ba4, #74a8ff);
                }
                .media-rich-content .rich-content p {
                    margin: 0 0 25px;
                }
                .media-rich-content .rich-content ul,
                .media-rich-content .rich-content ol {
                    padding-left: 26px;
                    margin: 26px 0 34px;
                }
                .media-rich-content .rich-content li {
                    margin-bottom: 12px;
                    padding-left: 5px;
                }
                .media-rich-content .rich-content a {
                    color: #244f9d;
                    font-weight: 800;
                    text-decoration-thickness: 2px;
                    text-underline-offset: 4px;
                }
                .media-rich-content .rich-content .table-wrap {
                    margin: 38px -14px 52px;
                    border: 1px solid #d9e3ef;
                    overflow-x: auto;
                    box-shadow: 0 18px 48px rgba(15, 23, 42, 0.07);
                }
                .media-rich-content .rich-content table {
                    min-width: 720px;
                    border-collapse: separate;
                    border-spacing: 0;
                    font-size: 1.54rem;
                    line-height: 1.58;
                }
                .media-rich-content .rich-content table tr:first-child {
                    background: #10213f;
                    color: #ffffff;
                    border-bottom: none;
                }
                .media-rich-content .rich-content table th,
                .media-rich-content .rich-content table td {
                    padding: 20px 22px;
                    border-right: 1px solid #dfe7f1;
                    border-bottom: 1px solid #dfe7f1;
                }
                .media-rich-content .rich-content table tr:nth-child(odd):not(:first-child) {
                    background: #f8fbff;
                }
                .media-rich-content .rich-content table td:first-child {
                    color: #0f1f3a;
                    font-weight: 900;
                }
                .media-rich-content .rich-content img {
                    max-width: 100% !important;
                    border-radius: 0;
                    border: 1px solid #d9e3ef;
                    box-shadow: 0 18px 48px rgba(15, 23, 42, 0.08);
                }
                @media (max-width: 1180px) {
                    .media-article-hero {
                        grid-template-columns: 1fr;
                    }
                    .media-hero-copy {
                        min-height: auto;
                        padding-bottom: 14px;
                    }
                    .media-hero-visual {
                        min-height: 380px;
                    }
                    .media-article-layout {
                        grid-template-columns: 1fr;
                    }
                    .media-article-rail {
                        position: static;
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
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
