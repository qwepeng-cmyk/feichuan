'use client';

import React, { useState } from 'react';
import styles from './MobileProductDetail.module.css';
import MobileInquiryForm from './MobileInquiryForm';

interface ProductProps {
    product: any;
}

export default function MobileProductDetail({ product }: ProductProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('overview');

    // Support multiple images if available in JSON
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
                // Swiped left -> next image
                setActiveIndex(prev => prev === displayImages.length - 1 ? 0 : prev + 1);
            } else {
                // Swiped right -> prev image
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
            {/* 1. Breadcrumb - Clean Text Style */}
            <div className={styles.breadcrumb}>
                <a href="/">Home</a>
                <span className={styles.breadcrumbSeparator}>/</span>
                <a href="/products">Product</a>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbActive}>
                    {product.product_name_en}
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
                        <img src={displayImages[activeIndex]} alt={product.product_name_en} />

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

                {/* Title Second */}
                <h1 className={styles.title}>{product.product_name_en}</h1>

                {/* Info Content */}
                <div className={styles.infoContent}>
                    {/* Key Parameters */}
                    <div className={styles.keyParams}>
                        {product.key_parameter_1_en && <div className={styles.paramItem}>{product.key_parameter_1_en}</div>}
                        {product.key_parameter_2_en && <div className={styles.paramItem}>{product.key_parameter_2_en}</div>}
                        {product.key_application_en && <div className={styles.paramItem}>{product.key_application_en}</div>}
                    </div>
                </div>

                {/* Consolidated Button */}
                <a 
                    href="#inquiry" 
                    className={styles.ctaButton}
                    onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('inquiry');
                    }}
                >
                    GET QUOTATION
                </a>

                {/* Summary */}
                {product.summary_en && (
                    <div className={styles.summaryBox}>
                        {product.summary_en}
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
                        Overview
                    </button>
                    <button 
                        className={`${styles.navItem} ${activeTab === 'specs' ? styles.active : ''}`}
                        onClick={() => scrollToSection('specs-title')}
                    >
                        Specs
                    </button>
                    <button 
                        className={`${styles.navItem} ${activeTab === 'inquiry' ? styles.active : ''}`}
                        onClick={() => scrollToSection('inquiry-title')}
                    >
                        Inquiry
                    </button>
                </div>
            </nav>

            {/* 4. Overview Section */}
            <section className={styles.section}>
                <h2 id="overview-title" className={styles.sectionTitleCenter}>Overview</h2>
                {product.detail_html_en ? (
                    <div 
                        className={styles.richText}
                        dangerouslySetInnerHTML={{ __html: product.detail_html_en }}
                    />
                ) : (
                    <p className={styles.richText}>No detailed description available.</p>
                )}
            </section>

            {/* 5. Technical Specifications Section */}
            <section className={styles.section}>
                <h2 id="specs-title" className={styles.sectionTitleCenter}>Technical Specifications</h2>
                {product.parameters_en && Object.keys(product.parameters_en).length > 0 ? (
                    <table className={styles.specsTable}>
                        <tbody>
                            {Object.entries(product.parameters_en).map(([param, val], idx) => (
                                <tr key={idx}>
                                    <td className={styles.specLabel}>{param}</td>
                                    <td className={styles.specValue}>{val as string}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className={styles.richText}>Specifications are being updated.</p>
                )}
            </section>

            {/* 6. Inquiry Section */}
            <section className={styles.section} style={{ background: '#f8faff' }}>
                <MobileInquiryForm />
            </section>
        </div>
    );
}
