'use client';

import React, { useState } from 'react';
import styles from './MobileProductDetail.module.css';
import MobileInquiryForm from './MobileInquiryForm';

interface ProductProps {
    product: any;
    locale: string;
    dict: any;
}

export default function MobileProductDetail({ product, locale, dict }: ProductProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('overview');

    // Localized field selection
    const name = product[`product_name_${locale}`] || product.product_name_en || product.name;
    const summary = product[`summary_${locale}`] || product.summary_en;
    const keyApp = product[`key_application_${locale}`] || product.key_application_en;
    const keyParam1 = product[`key_parameter_1_${locale}`] || product.key_parameter_1_en;
    const keyParam2 = product[`key_parameter_2_${locale}`] || product.key_parameter_2_en;
    const detailHtml = product[`detail_html_${locale}`] || product.detail_html_en;
    
    let parameters: any = null;
    try {
        const rawParams = product[`parameters_${locale}`] || product.parameters_en;
        parameters = typeof rawParams === 'string' ? JSON.parse(rawParams) : rawParams;
    } catch (e) {
        parameters = {};
    }

    const rawGallery = product.product_images || product.Product_Images || [];
    const mainImg = product.main_image;
    
    const displayImages = Array.from(new Set([mainImg, ...rawGallery])).filter(Boolean) as string[];
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
            {/* 1. Breadcrumb - Clean Text Style */}
            <div className={styles.breadcrumb}>
                <a href={`/${locale}`}>{dict.nav.home}</a>
                <span className={styles.breadcrumbSeparator}>/</span>
                <a href={`/${locale}/products`}>{dict.nav.products}</a>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbActive}>
                    {name}
                </span>
            </div>

            {/* 2. Main Hero Area */}
            <section className={styles.heroSection}>
                {/* Gallery First */}
                <div className={styles.gallery}>
                    <div 
                        className={styles.mainImage}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEndHandler}
                    >
                        <img src={displayImages[activeIndex]} alt={name} />
                    </div>
                    {displayImages.length >= 1 && (
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

                {/* Title Second */}
                <h1 className={styles.title}>{name}</h1>

                {/* Info Content */}
                <div className={styles.infoContent}>
                    {/* Key Parameters */}
                    <div className={styles.keyParams}>
                        {keyParam1 && <div className={styles.paramItem}>{keyParam1}</div>}
                        {keyParam2 && <div className={styles.paramItem}>{keyParam2}</div>}
                        {keyApp && <div className={styles.paramItem}>{keyApp}</div>}
                    </div>
                </div>

                {/* Consolidated Button */}
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

                {/* Summary */}
                {summary && (
                    <div className={styles.summaryBox}>
                        {summary}
                    </div>
                )}
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
                        className={`${styles.navItem} ${activeTab === 'specs' ? styles.active : ''}`}
                        onClick={() => scrollToSection('specs-title')}
                    >
                        {dict.products.technicalSpecs}
                    </button>
                    <button 
                        className={`${styles.navItem} ${activeTab === 'inquiry' ? styles.active : ''}`}
                        onClick={() => scrollToSection('inquiry-title')}
                    >
                        {dict.nav.contact}
                    </button>
                </div>
            </nav>

            {/* 4. Overview Section */}
            <section className={styles.section}>
                <h2 id="overview-title" className={styles.sectionTitleCenter}>{dict.products.overview}</h2>
                {detailHtml ? (
                    <div 
                        className={styles.richText}
                        dangerouslySetInnerHTML={{ __html: detailHtml }}
                    />
                ) : (
                    <p className={styles.richText}>{dict.products.noDetail || "No detailed description available."}</p>
                )}
            </section>

            {/* 5. Technical Specifications Section */}
            <section className={styles.section}>
                <h2 id="specs-title" className={styles.sectionTitleCenter}>{dict.products.technicalSpecs}</h2>
                {parameters && (Array.isArray(parameters) ? parameters.length > 0 : Object.keys(parameters).length > 0) ? (
                    <table className={styles.specsTable}>
                        <tbody>
                            {Array.isArray(parameters) ? (
                                parameters.map((row: string[], ri: number) => (
                                    <tr key={ri} className={ri === 0 ? styles.tableHeader : ''}>
                                        {row.map((cell: string, ci: number) => (
                                            <td key={ci} className={ri === 0 ? styles.specLabel : styles.specValue}>{cell}</td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                Object.entries(parameters).map(([param, val], idx) => (
                                    <tr key={idx}>
                                        <td className={styles.specLabel}>{param}</td>
                                        <td className={styles.specValue}>{val as string}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                ) : (
                    <p className={styles.richText}>{dict.products.specsUpdate || "Specifications are being updated."}</p>
                )}
            </section>

            {/* 6. Inquiry Section */}
            <section id="inquiry-title" className={styles.section} style={{ background: '#f8faff' }}>
                <MobileInquiryForm dict={dict} />
            </section>
        </div>
    );
}

