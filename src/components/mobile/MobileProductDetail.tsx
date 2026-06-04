'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './MobileProductDetail.module.css';
import MobileInquiryForm from './MobileInquiryForm';
import OptimizedRichText from '../common/OptimizedRichText';
import { localePath } from '@/lib/localePath';
import { withStaticAssetVersion } from '@/lib/assetVersion';

interface ProductProps {
    product: any;
    locale: string;
    dict: any;
    basePath?: '/products' | '/accessories';
    catalogLabel?: string;
}

function formatSpecLine(value?: string | null, fallbackLabel?: string) {
    const text = value?.trim();
    if (!text) return null;

    const normalized = fallbackLabel && !/[:：]/.test(text) ? `${fallbackLabel}: ${text}` : text;
    const match = normalized.match(/^([^:：]+[:：])\s*(.*)$/);

    if (!match) return normalized;

    return (
        <>
            <strong>{match[1]}</strong>
            {match[2] ? ` ${match[2]}` : ''}
        </>
    );
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

function renderMobileSpecRows(parameters: any): React.ReactNode {
    if (Array.isArray(parameters)) {
        return parameters.slice(0, 80).map((row: any, ri: number) => (
            <tr key={ri} className={ri === 0 ? styles.tableHeader : ''}>
                {(Array.isArray(row) ? row : [row]).map((cell: string, ci: number) => (
                    <td key={ci} className={ri === 0 ? styles.specLabel : styles.specValue}>{String(cell ?? '')}</td>
                ))}
            </tr>
        ));
    }

    if (!isPlainObject(parameters)) return null;

    return Object.entries(parameters).flatMap(([param, val], idx) => {
        if (isPlainObject(val)) {
            return [
                <tr key={`${param}-group`} className={styles.tableHeader}>
                    <td colSpan={2} className={styles.specLabel}>{param}</td>
                </tr>,
                ...Object.entries(val).map(([childParam, childValue], childIdx) => (
                    <tr key={`${param}-${childParam}-${childIdx}`}>
                        <td className={styles.specLabel}>{childParam}</td>
                        <td className={styles.specValue}>{Array.isArray(childValue) ? childValue.join(', ') : String(childValue ?? '')}</td>
                    </tr>
                ))
            ];
        }

        return [
            <tr key={idx}>
                <td className={styles.specLabel}>{param}</td>
                <td className={styles.specValue}>{Array.isArray(val) ? val.join(', ') : String(val ?? '')}</td>
            </tr>
        ];
    });
}

export default function MobileProductDetail({ product, locale, dict, basePath = '/products', catalogLabel }: ProductProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('overview');

    // Localized field selection
    const name = product[`product_name_${locale}`] || product.product_name_en || product.name;
    const summary = product[`summary_${locale}`] || product.summary_en;
    const keyApp = product[`key_application_${locale}`] || product.key_application_en;
    const keyParam1 = product[`key_parameter_1_${locale}`] || product.key_parameter_1_en;
    const keyParam2 = product[`key_parameter_2_${locale}`] || product.key_parameter_2_en;
    const detailHtml = product[`detail_html_${locale}`] || product.detail_html_en;
    const sectionLabel = catalogLabel || dict.nav.products;
    
    let parameters: any = null;
    try {
        const rawParams = product[`parameters_${locale}`] || product.parameters_en;
        parameters = typeof rawParams === 'string' ? JSON.parse(rawParams) : rawParams;
    } catch (e) {
        parameters = {};
    }

    let gallery = [];
    try {
        const rawGallery = product.product_images || product.Product_Images || [];
        gallery = typeof rawGallery === 'string' ? JSON.parse(rawGallery) : (rawGallery || []);
    } catch (e) {
        gallery = [];
    }
    const mainImg = product.main_image;
    
    const displayImages = Array.from(new Set([mainImg, ...gallery])).filter(Boolean) as string[];
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
                <Link href={localePath(locale)}>{dict.nav.home}</Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <Link href={localePath(locale, basePath)}>{sectionLabel}</Link>
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
                        <Image src={withStaticAssetVersion(displayImages[activeIndex])} alt={name} fill style={{ objectFit: 'contain' }} priority sizes="100vw" />
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
                                    <Image src={withStaticAssetVersion(img)} alt={`Thumb ${idx}`} fill style={{ objectFit: 'cover' }} sizes="20vw" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Title Second */}
                <div className={styles.title}>{name}</div>

                {/* Info Content */}
                <div className={styles.infoContent}>
                    {/* Key Parameters */}
                    <div className={styles.keyParams}>
                        {keyParam1 && <div className={styles.paramItem}>{formatSpecLine(keyParam1)}</div>}
                        {keyParam2 && <div className={styles.paramItem}>{formatSpecLine(keyParam2)}</div>}
                        {keyApp && <div className={styles.paramItem}>{formatSpecLine(keyApp, 'Applications')}</div>}
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
            <section className={styles.section} style={{ backgroundColor: '#f8fafc' }}>
                <h2 id="overview-title" className={styles.sectionTitleCenter}>{dict.products.overview}</h2>
                {detailHtml ? (
                    <OptimizedRichText 
                        className={`${styles.richText} rich-content`}
                        html={detailHtml}
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
                            {renderMobileSpecRows(parameters)}
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

