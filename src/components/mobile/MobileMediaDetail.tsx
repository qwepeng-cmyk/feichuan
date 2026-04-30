'use client';

import React from 'react';
import styles from './MobileMediaDetail.module.css';
import MobileInquiryForm from './MobileInquiryForm';

interface MediaProps {
    news: any;
}

export default function MobileMediaDetail({ news }: MediaProps) {
    return (
        <div className={styles.wrapper}>
            {/* 1. Mini Banner - Consistent with Product Center */}
            <section className={styles.banner}>
                <div className={styles.bannerOverlay}></div>
                <div className={styles.bannerContent}>
                    <h1>MEDIA CENTER</h1>
                </div>
            </section>

            {/* 2. Breadcrumb */}
            <div className={styles.breadcrumb}>
                <a href="/">Home</a>
                <span className={styles.breadcrumbSeparator}>/</span>
                <a href="/media">Media Center</a>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbActive}>
                    {news.title}
                </span>
            </div>

            {/* 3. News Content */}
            <article className={styles.articleContainer}>
                <h1 className={styles.newsTitle}>{news.title}</h1>
                <div className={styles.newsMeta}>Published on: {news.date}</div>

                {news.image && (
                    <div className={styles.featuredImage}>
                        <img src={news.image} alt={news.title} />
                    </div>
                )}

                <div className={styles.richContent} dangerouslySetInnerHTML={{ __html: news.content }} />
            </article>

            {/* 4. Inquiry Section */}
            <section className={styles.section} style={{ background: '#f8faff' }}>
                <MobileInquiryForm />
            </section>
        </div>
    );
}
