'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './MobileCaseDetail.module.css';
import MobileInquiryForm from './MobileInquiryForm';

interface CaseProps {
    caseData: any;
    recommendedProducts: any[];
    locale: string;
    dict: any;
}

export default function MobileCaseDetail({ caseData, recommendedProducts, locale, dict }: CaseProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('overview');

    // Localized field selection
    const title = caseData[`title_${locale}`] || caseData.title_en;
    const description = caseData[`description_${locale}`] || caseData.description_en;
    
    let devices = [];
    try {
        const rawDevices = caseData[`devices_${locale}`] || caseData.devices_en;
        devices = typeof rawDevices === 'string' ? JSON.parse(rawDevices) : (rawDevices || []);
    } catch (e) {
        devices = [];
    }

    let gallery = [];
    try {
        const rawGallery = caseData.case_images || [];
        gallery = typeof rawGallery === 'string' ? JSON.parse(rawGallery) : (rawGallery || []);
    } catch (e) {
        gallery = [];
    }

    const displayImages = [caseData.main_image, ...gallery].filter(Boolean);
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
                <Link href={`/${locale}`}>{dict.nav.home}</Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <Link href={`/${locale}/cases`}>{dict.nav.cases}</Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbActive}>
                    {title}
                </span>
            </div>

            {/* 2. Main Hero Area */}
            <section className={styles.heroSection}>
                {/* Gallery */}
                <div className={styles.gallery}>
                    <div 
                        className={styles.mainImage}
                        style={{ position: 'relative', width: '100%', paddingTop: '75%', overflow: 'hidden', background: '#fff', marginBottom: '10px' }}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEndHandler}
                    >
                        <Image src={displayImages[activeIndex]} alt={title} fill style={{ objectFit: 'cover' }} priority sizes="100vw" />
                    </div>
                    {displayImages.length > 1 && (
                        <div className={styles.thumbTrack}>
                            {displayImages.map((img, idx) => (
                                <div 
                                    key={idx} 
                                    className={`${styles.thumbItem} ${activeIndex === idx ? styles.active : ''}`}
                                    style={{ position: 'relative', flex: '0 0 70px', height: '52px' }}
                                    onClick={() => setActiveIndex(idx)}
                                >
                                    <Image src={img} alt={`Thumb ${idx}`} fill style={{ objectFit: 'cover' }} sizes="20vw" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Title */}
                <h1 className={styles.title}>{title}</h1>

                {/* Info Content - Equipment List */}
                <div className={styles.infoContent}>
                    <div className={styles.keyParams}>
                        <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#315ba4', marginBottom: '5px' }}>
                            {dict.cases?.equipmentUsed || 'Equipment Used'}:
                        </div>
                        {devices && devices.map((device: string, idx: number) => (
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
                    {dict.products.getQuotation}
                </a>
            </section>

            {/* 3. Sticky Sub-Nav */}
            <nav className={styles.stickyNav}>
                <div className={styles.navTrack}>
                    <button 
                        className={`${styles.navItem} ${activeTab === 'overview' ? styles.active : ''}`}
                        onClick={() => scrollToSection('overview-title')}
                    >
                        {dict.products.overview}
                    </button>
                    <button 
                        className={`${styles.navItem} ${activeTab === 'products' ? styles.active : ''}`}
                        onClick={() => scrollToSection('products-title')}
                    >
                        {dict.products.relatedEquipment || 'Equipment'}
                    </button>
                    <button 
                        className={`${styles.navItem} ${activeTab === 'inquiry' ? styles.active : ''}`}
                        onClick={() => scrollToSection('inquiry-title')}
                    >
                        {dict.nav.contact}
                    </button>
                </div>
            </nav>

            {/* 4. Overview / Case Description Section */}
            <section className={styles.section}>
                <h2 id="overview-title" className={styles.sectionTitleCenter}>{dict.products.overview}</h2>
                <div className={styles.richText}>
                    {description && description.split('\n').map((paragraph: string, idx: number) => (
                        paragraph.trim() ? <p key={idx} style={{ marginBottom: '15px' }}>{paragraph}</p> : null
                    ))}
                </div>
            </section>

            {/* 5. Related Equipment */}
            {recommendedProducts && recommendedProducts.length > 0 && (
                <section className={styles.section} style={{ background: '#f8faff', paddingBottom: '30px' }}>
                    <h2 id="products-title" className={styles.sectionTitleCenter}>{dict.products.relatedEquipment || 'Related Equipment'}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                        {recommendedProducts.map((prod, idx) => (
                            <Link href={`/${locale}/products/${prod.handle}`} key={idx} style={{ textDecoration: 'none', background: '#fff', border: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ position: 'relative', width: '100%', paddingTop: '75%', overflow: 'hidden' }}>
                                    <Image src={prod.image} alt={prod.name} fill style={{ objectFit: 'contain', padding: '10px' }} sizes="45vw" />
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
            <section id="inquiry-title" className={styles.section} style={{ background: '#f8faff', paddingTop: '20px' }}>
                <MobileInquiryForm dict={dict} />
            </section>
        </div>
    );
}

