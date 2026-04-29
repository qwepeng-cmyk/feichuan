'use client';

import React, { useState } from 'react';
import styles from './MobileCaseDetail.module.css';
import MobileInquiryForm from './MobileInquiryForm';
import Link from 'next/link';

interface CaseProps {
    caseData: any;
    recommendedProducts: any[];
}

export default function MobileCaseDetail({ caseData, recommendedProducts }: CaseProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('overview');

    const displayImages = [caseData.main_image, ...(caseData.case_images || [])].filter(Boolean);
    if (displayImages.length === 0) displayImages.push('/images/placeholder.jpg');

    // Touch swipe logic
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEndHandler = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        
        if (isLeftSwipe || isRightSwipe) {
            if (isLeftSwipe) {
                setActiveIndex(prev => prev === displayImages.length - 1 ? 0 : prev + 1);
            } else {
                setActiveIndex(prev => prev === 0 ? displayImages.length - 1 : prev - 1);
            }
        }
    };

    const scrollToSection = (id: string) => {
        setActiveTab(id);
        const element = document.getElementById(id);
        if (element) {
            // 108 (header) + 52 (subnav) + 5 (gap) = 165
            const headerOffset = 165;
            const rect = element.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetY = rect.top + scrollTop - headerOffset;
            window.scrollTo({
                top: Math.max(0, targetY),
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className={styles.wrapper}>
            {/* 1. Breadcrumb */}
            <div className={styles.breadcrumb}>
                <a href="/">Home</a>
                <span className={styles.breadcrumbSeparator}>/</span>
                <a href="/cases">Cases</a>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbActive}>
                    {caseData.title_en}
                </span>
            </div>

            {/* 2. Main Hero Area */}
            <section className={styles.heroSection}>
                {/* Gallery */}
                <div className={styles.gallery}>
                    <div 
                        className={styles.mainImage}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEndHandler}
                    >
                        <img src={displayImages[activeIndex]} alt={caseData.title_en} />
                    </div>
                    {displayImages.length > 1 && (
                        <div className={styles.thumbTrack}>
                            {displayImages.map((img, idx) => (
                                <div 
                                    key={idx} 
                                    className={`${styles.thumbItem} ${activeIndex === idx ? styles.active : ''}`}
                                    onClick={() => setActiveIndex(idx)}
                                >
                                    <img src={img} alt={`Thumb ${idx}`} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Title */}
                <h1 className={styles.title}>{caseData.title_en}</h1>

                {/* Info Content - Equipment List */}
                <div className={styles.infoContent}>
                    <div className={styles.keyParams}>
                        <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#315ba4', marginBottom: '5px' }}>Equipment Used:</div>
                        {caseData.devices_en && caseData.devices_en.map((device: string, idx: number) => (
                            <div key={idx} className={styles.paramItem}>{device}</div>
                        ))}
                    </div>
                </div>

                {/* CTA Button */}
                <a 
                    href="#inquiry" 
                    className={styles.ctaButton}
                    onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('inquiry-title');
                    }}
                >
                    GET QUOTATION
                </a>
            </section>

            {/* 3. Sticky Sub-Nav */}
            <nav className={styles.stickyNav}>
                <div className={styles.navTrack}>
                    <button 
                        className={`${styles.navItem} ${activeTab === 'overview' ? styles.active : ''}`}
                        onClick={() => scrollToSection('overview-title')}
                    >
                        Overview
                    </button>
                    <button 
                        className={`${styles.navItem} ${activeTab === 'products' ? styles.active : ''}`}
                        onClick={() => scrollToSection('products-title')}
                    >
                        Equipment
                    </button>
                    <button 
                        className={`${styles.navItem} ${activeTab === 'inquiry' ? styles.active : ''}`}
                        onClick={() => scrollToSection('inquiry-title')}
                    >
                        Inquiry
                    </button>
                </div>
            </nav>

            {/* 4. Overview / Case Description Section */}
            <section className={styles.section}>
                <h2 id="overview-title" className={styles.sectionTitleCenter}>Case Details</h2>
                <div className={styles.richText}>
                    {caseData.description_en && caseData.description_en.split('\n').map((paragraph: string, idx: number) => (
                        paragraph.trim() ? <p key={idx} style={{ marginBottom: '15px' }}>{paragraph}</p> : null
                    ))}
                </div>
            </section>

            {/* 5. Related Equipment */}
            {recommendedProducts && recommendedProducts.length > 0 && (
                <section className={styles.section} style={{ background: '#f8faff', paddingBottom: '30px' }}>
                    <h2 id="products-title" className={styles.sectionTitleCenter}>Related Equipment</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                        {recommendedProducts.map((prod, idx) => (
                            <Link href={`/products/${prod.handle}`} key={idx} style={{ textDecoration: 'none', background: '#fff', border: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ aspectRatio: '4/3', padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src={prod.image} alt={prod.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                </div>
                                <div style={{ padding: '12px', textAlign: 'center' }}>
                                    <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#333', margin: 0 }}>{prod.name}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* 6. Inquiry Section */}
            <section className={styles.section} style={{ background: '#f8faff', paddingTop: '20px' }}>
                <MobileInquiryForm />
            </section>
        </div>
    );
}
