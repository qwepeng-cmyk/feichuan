'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './MobileSolutionDetail.module.css';
import OptimizedRichText from '../common/OptimizedRichText';
import MobileInquiryForm from './MobileInquiryForm';

interface SolutionProps {
    solution: any;
    recommendedProducts: any[];
    locale: string;
    dict: any;
}

export default function MobileSolutionDetail({ solution, recommendedProducts, locale, dict }: SolutionProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('overview');

    // Localized field selection
    const name = solution[`product_name_${locale}`] || solution.product_name_en || solution.title_en;
    const summary = solution[`summary_${locale}`] || solution.summary_en;
    const keyApp = solution[`key_application_${locale}`] || solution.key_application_en;
    const keyParam1 = solution[`key_parameter_1_${locale}`] || solution.key_parameter_1_en;
    const keyParam2 = solution[`key_parameter_2_${locale}`] || solution.key_parameter_2_en;
    const detailHtml = solution[`detail_html_${locale}`] || solution.detail_html_en;
    
    let parameters: any = null;
    try {
        const rawParams = solution[`parameters_${locale}`] || solution.parameters_en;
        parameters = typeof rawParams === 'string' ? JSON.parse(rawParams) : rawParams;
    } catch (e) {
        parameters = {};
    }

    let gallery = [];
    try {
        const rawGallery = solution.solution_images || solution.Solution_Images || [];
        gallery = typeof rawGallery === 'string' ? JSON.parse(rawGallery) : (rawGallery || []);
    } catch (e) {
        gallery = [];
    }
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
                setActiveIndex(prev => prev === displayImages.length - 1 ? 0 : prev + 1);
            } else {
                setActiveIndex(prev => prev === 0 ? displayImages.length - 1 : prev - 1);
            }
        }
    };
    
    let displayImages = Array.from(new Set([mainImg, ...gallery])).filter(Boolean) as string[];
    if (displayImages.length === 0) displayImages = ['/images/solutions/placeholder.jpg'];

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
                <Link href={`/${locale}`}>{dict.nav.home}</Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <Link href={`/${locale}/solutions`}>{dict.nav.solutions}</Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <Link href={`/${locale}/solutions/category/${solution.category_id}`}>{solution.category_name}</Link>
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
                        style={{ position: 'relative', width: '100%', paddingTop: '75%', overflow: 'hidden', background: '#fff', marginBottom: '10px' }}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEndHandler}
                    >
                        <Image src={displayImages[activeIndex]} alt={name} fill style={{ objectFit: 'cover' }} priority sizes="100vw" />
                    </div>
                    {displayImages.length >= 1 && (
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

                {/* Title Second */}
                <h1 className={styles.title}>{name}</h1>

                {/* Info Content */}
                <div className={styles.infoContent}>
                    {/* Key Parameters */}
                    <div className={styles.keyParams}>
                        {keyApp && <div className={styles.paramItem}>{keyApp}</div>}
                        {keyParam1 && <div className={styles.paramItem}>{keyParam1}</div>}
                        {keyParam2 && <div className={styles.paramItem}>{keyParam2}</div>}
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
                    <OptimizedRichText 
                        className={styles.richText}
                        html={detailHtml}
                    />
                ) : (
                    <p className={styles.richText}>{dict.products.noDetail || "No detailed description available."}</p>
                )}
            </section>

            {/* 5. Technical Specifications Section */}
            {parameters && Object.keys(parameters).length > 0 && (
                <section className={styles.section}>
                    <h2 id="specs-title" className={styles.sectionTitleCenter}>{dict.products.technicalSpecs}</h2>
                    <table className={styles.specsTable}>
                        <tbody>
                            {Object.entries(parameters).map(([param, val], idx) => (
                                <tr key={idx}>
                                    <td className={styles.specLabel}>{param}</td>
                                    <td className={styles.specValue}>{val as string}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            )}

            {/* 5.5 Related Products */}
            {recommendedProducts && recommendedProducts.length > 0 && (
                <section className={styles.section} style={{ background: '#f8faff', paddingBottom: '30px' }}>
                    <h2 className={styles.sectionTitleCenter}>{dict.products.relatedEquipment || 'Related Equipment'}</h2>
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

