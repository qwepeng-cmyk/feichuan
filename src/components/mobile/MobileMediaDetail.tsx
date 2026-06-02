'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './MobileMediaDetail.module.css';
import MobileInquiryForm from './MobileInquiryForm';
import OptimizedRichText from '../common/OptimizedRichText';
import { localePath } from '@/lib/localePath';
import { getLocalizedMediaDate, getLocalizedMediaTitle } from '@/lib/mediaDisplay';

interface MediaProps {
    news: any;
    locale: string;
    dict: any;
}

export default function MobileMediaDetail({ news, locale, dict }: MediaProps) {
    const newsTitle = getLocalizedMediaTitle(news, locale);
    const newsDate = getLocalizedMediaDate(news.date, locale);
    const newsContent = news[`content_${locale}`] || news.content_en || news.content;

    return (
        <div className={styles.wrapper}>
            {/* 1. Mini Banner - Consistent with Product Center */}
            <section className={styles.banner}>
                <div className={styles.bannerOverlay}></div>
                <div className={styles.bannerContent}>
                    <div className={styles.bannerTitle}>{dict.nav.media.toUpperCase()}</div>
                </div>
            </section>

            {/* 2. Breadcrumb */}
            <div className={styles.breadcrumb}>
                <Link href={localePath(locale)}>{dict.nav.home}</Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <Link href={localePath(locale, '/media')}>{dict.nav.media}</Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbActive}>
                    {newsTitle}
                </span>
            </div>

            {/* 3. News Content */}
            <article className={styles.articleContainer}>
                <div className={styles.newsTitle}>{newsTitle}</div>
                <div className={styles.newsMeta}>{newsDate}</div>

                {news.image && (
                    <div className={styles.featuredImage}>
                        <div className={styles.imageBox} style={{ position: 'relative', width: '100%', paddingTop: '56.25%', overflow: 'hidden' }}>
                            <Image src={news.image} alt={newsTitle} fill style={{ objectFit: 'cover' }} priority sizes="100vw" />
                        </div>
                    </div>
                )}

                <OptimizedRichText className={styles.richContent} html={newsContent} />
            </article>

            {/* 4. Inquiry Section */}
            <section className={styles.section} style={{ background: '#f8faff' }}>
                <MobileInquiryForm dict={dict} />
            </section>
        </div>
    );
}
