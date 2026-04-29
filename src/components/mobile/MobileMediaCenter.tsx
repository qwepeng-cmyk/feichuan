'use client';

import React, { useState, useEffect, useMemo } from 'react';
import styles from './MobileMediaCenter.module.css';
import MobileInquiryForm from './MobileInquiryForm';
import Link from 'next/link';

interface NewsItem {
    id: string;
    title: string;
    date: string;
    category: string;
    image: string;
    content?: string;
}

const CATEGORIES = [
    { id: 'all', label: 'Latest' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'product', label: 'Product & Tech' },
    { id: 'industry', label: 'Industry' }
];

export default function MobileMediaCenter({ newsData }: { newsData: NewsItem[] }) {
    const [activeCategory, setActiveCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

    const filteredNews = useMemo(() => {
        return newsData.filter(n => activeCategory === 'all' || n.category === activeCategory);
    }, [newsData, activeCategory]);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory]);

    const totalPages = Math.ceil(filteredNews.length / pageSize);
    const paginatedNews = filteredNews.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = (p: number) => {
        setCurrentPage(p);
        const element = document.getElementById('news-grid-top');
        if (element) {
            const offset = 210;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className={styles.wrapper}>
            <section className={styles.banner}>
                <div className={styles.bannerOverlay}></div>
                <div className={styles.bannerContent}>
                    <h1>MEDIA CENTER</h1>
                </div>
            </section>

            <nav className={styles.stickyNav}>
                <div className={styles.tabTrack}>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            className={`${styles.tabItem} ${activeCategory === cat.id ? styles.active : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </nav>

            <div id="news-grid-top" className={styles.listContainer}>
                <div className={styles.grid}>
                    {paginatedNews.map((news) => (
                        <Link href={`/media/${news.id}`} key={news.id} className={styles.card}>
                            <div className={styles.imageBox}>
                                <img src={news.image} alt={news.title} />
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.date}>{news.date}</div>
                                <h3>{news.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                            <button 
                                key={p} 
                                className={`${styles.pageBtn} ${p === currentPage ? styles.active : ''}`}
                                onClick={() => handlePageChange(p)}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <MobileInquiryForm />
        </div>
    );
}
