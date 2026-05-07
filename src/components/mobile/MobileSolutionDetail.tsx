'use client';

import React, { useState } from 'react';
import styles from './MobileSolutionDetail.module.css';
import MobileInquiryForm from './MobileInquiryForm';
import Link from 'next/link';

interface SolutionProps {
    solution: any;
    recommendedProducts: any[];
}

export default function MobileSolutionDetail({ solution, recommendedProducts }: SolutionProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('overview');

    const rawGallery = solution.solution_images || solution.Solution_Images || [];
    const mainImg = solution.main_image;
    
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
    
    // Combine and remove duplicates
    let displayImages = Array.from(new Set([mainImg, ...rawGallery])).filter(Boolean) as string[];
    if (displayImages.length === 0) displayImages = ['/images/solutions/placeholder.jpg'];

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
                <a href="/solutions">Solutions</a>
                <span className={styles.breadcrumbSeparator}>/</span>
                <a href={`/solutions/category/${solution.category_id}`}>{solution.category_name}</a>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbActive}>
                    {solution.title_en}
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
                        <img src={displayImages[activeIndex]} alt={solution.title_en} />

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
                <h1 className={styles.title}>{solution.title_en}</h1>

                {/* Info Content */}
                <div className={styles.infoContent}>
                    {/* Key Parameters */}
                    <div className={styles.keyParams}>
                        {solution.key_application_en && <div className={styles.paramItem}>{solution.key_application_en}</div>}
                        {solution.key_parameter_1_en && <div className={styles.paramItem}>{solution.key_parameter_1_en}</div>}
                        {solution.key_parameter_2_en && <div className={styles.paramItem}>{solution.key_parameter_2_en}</div>}
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
                    GET QUOTATION
                </a>

                {/* Summary */}
                {solution.summary_en && (
                    <div className={styles.summaryBox}>
                        {solution.summary_en}
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
                {solution.detail_html_en ? (
                    <div 
                        className={styles.richText}
                        dangerouslySetInnerHTML={{ __html: solution.detail_html_en }}
                    />
                ) : (
                    <p className={styles.richText}>No detailed description available.</p>
                )}
            </section>

            {/* 5. Technical Specifications Section */}
            {solution.parameters_en && Object.keys(solution.parameters_en).length > 0 && (
                <section className={styles.section}>
                    <h2 id="specs-title" className={styles.sectionTitleCenter}>Technical Specifications</h2>
                    <table className={styles.specsTable}>
                        <tbody>
                            {Object.entries(solution.parameters_en).map(([param, val], idx) => (
                                <tr key={idx}>
                                    <td className={styles.specLabel}>{param}</td>
                                    <td className={styles.specValue}>{val as string}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            )}

            {/* 5.5 Related Products (if any) */}
            {recommendedProducts && recommendedProducts.length > 0 && (
                <section className={styles.section} style={{ background: '#f8faff', paddingBottom: '30px' }}>
                    <h2 className={styles.sectionTitleCenter}>Related Equipment</h2>
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
