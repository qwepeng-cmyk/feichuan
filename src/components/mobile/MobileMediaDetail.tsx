'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './MobileMediaDetail.module.css';
import MobileInquiryForm from './MobileInquiryForm';

interface MediaProps {
    news: any;
    locale: string;
    dict: any;
}

export default function MobileMediaDetail({ news, locale, dict }: MediaProps) {
    const newsTitle = news[`title_${locale}`] || news.title_en || news.title;
    const newsContent = news[`content_${locale}`] || news.content_en || news.content;

    return (
        <div className={styles.wrapper}>
            {/* 1. Mini Banner - Consistent with Product Center */}
            <section className={styles.banner}>
                <div className={styles.bannerOverlay}></div>
                <div className={styles.bannerContent}>
                    <h1>{dict.nav.media.toUpperCase()}</h1>
                </div>
            </section>

            {/* 2. Breadcrumb */}
            <div className={styles.breadcrumb}>
                <Link href={`/${locale}`}>{dict.nav.home}</Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <Link href={`/${locale}/media`}>{dict.nav.media}</Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbActive}>
                    {newsTitle}
                </span>
            </div>

            {/* 3. News Content */}
            <article className={styles.articleContainer}>
                <h1 className={styles.newsTitle}>{newsTitle}</h1>
                <div className={styles.newsMeta}>{news.date}</div>

                {news.image && (
                    <div className={styles.featuredImage}>
                        <div className={styles.imageBox}>
                            <Image src={news.image} alt={newsTitle} fill style={{ objectFit: 'cover' }} priority sizes="100vw" />
                        </div>
                    </div>
                )}

                <div className={styles.richContent} dangerouslySetInnerHTML={{ __html: newsContent }} />
            </article>

            {/* 4. Inquiry Section */}
            <section className={styles.section} style={{ background: '#f8faff' }}>
                <MobileInquiryForm dict={dict} />
            </section>
        </div>
    );
}
