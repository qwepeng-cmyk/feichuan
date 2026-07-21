'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './MobileProductDetail.module.css';
import MobileInquiryForm from './MobileInquiryForm';
import OptimizedRichText from '../common/OptimizedRichText';
import { localePath } from '@/lib/localePath';
import { withStaticAssetVersion } from '@/lib/assetVersion';
import { getArabicTechnicalHighlight, getArabicTechnicalParameters } from '@/lib/arabicTechnicalCopy';
import ProductBrochureDownload from '@/components/products/ProductBrochureDownload';

interface ProductProps {
    product: any;
    locale: string;
    dict: any;
    basePath?: '/products' | '/accessories';
    catalogLabel?: string;
    brochurePageCount?: number;
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

function isCategorySpecLine(value?: string | null) {
    const text = value?.trim();
    if (!text) return false;
    const separatorIndex = text.search(/[:\uFF1A]/);
    if (separatorIndex <= 0) return false;
    const label = text
        .slice(0, separatorIndex)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toLowerCase();

    return [
        'category',
        'categoria',
        '\u5206\u7c7b',
        '\u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f',
        '\u0627\u0644\u0641\u0626\u0629',
    ].includes(label);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

function stringifyMobileValue(value: unknown): string {
    if (Array.isArray(value)) {
        return value
            .filter((item) => item !== null && item !== undefined && String(item).trim())
            .map((item) => String(item).trim())
            .join(' / ');
    }
    if (value === null || value === undefined) return '';
    return String(value);
}

function hasMobileValue(value: unknown): boolean {
    if (Array.isArray(value)) return value.some(hasMobileValue);
    if (isPlainObject(value)) return Object.values(value).some(hasMobileValue);
    return stringifyMobileValue(value).trim().length > 0;
}

function isMatrix(value: unknown): value is unknown[][] {
    return Array.isArray(value) && value.length > 0 && value.every((row) =>
        Array.isArray(row) && row.every((cell) => !Array.isArray(cell) && !isPlainObject(cell))
    );
}

function isPrimitiveList(value: unknown[]): boolean {
    return value.every((item) => !Array.isArray(item) && !isPlainObject(item));
}

function isAuxiliaryKey(key: string): boolean {
    return key === '原图文件' || key === '审计' || key === '_sections';
}

function isTableDataKey(key: string): boolean {
    return ['表格数据', 'Table Data', 'Табличные данные', 'Datos de tabla'].includes(key);
}

function shouldRenderMobileSections(parameters: Record<string, unknown>): boolean {
    return Object.values(parameters).some((value) => {
        if (isMatrix(value)) return true;
        if (isPlainObject(value)) return true;
        return Array.isArray(value) && !isPrimitiveList(value);
    });
}

function renderMobileMatrixRows(rows: unknown[][], keyPrefix: string): React.ReactNode[] {
    const maxCols = Math.max(...rows.map((row) => row.length));
    return rows
        .filter((row) => row.some((cell) => stringifyMobileValue(cell).trim()))
        .slice(0, 120)
        .map((row, rowIndex) => {
            const normalized = [...row, ...Array(Math.max(0, maxCols - row.length)).fill('')];
            const nonEmptyCount = normalized.filter((cell) => stringifyMobileValue(cell).trim()).length;
            const isHeaderRow = rowIndex === 0 || nonEmptyCount >= Math.max(2, Math.floor(maxCols / 2));
            return (
                <tr key={`${keyPrefix}-${rowIndex}`} className={isHeaderRow ? styles.tableHeader : ''}>
                    {normalized.map((cell, cellIndex) => (
                        <td key={cellIndex} className={isHeaderRow ? styles.specLabel : styles.specValue}>
                            {stringifyMobileValue(cell)}
                        </td>
                    ))}
                </tr>
            );
        });
}

function renderMobileValueRows(value: unknown, keyPrefix: string): React.ReactNode[] {
    if (isMatrix(value)) return renderMobileMatrixRows(value, keyPrefix);

    if (Array.isArray(value)) {
        if (isPrimitiveList(value)) {
            return [
                <tr key={keyPrefix}>
                    <td className={styles.specValue} colSpan={2}>{stringifyMobileValue(value)}</td>
                </tr>
            ];
        }
        return value.flatMap((item, index) => renderMobileValueRows(item, `${keyPrefix}-${index}`));
    }

    if (isPlainObject(value)) {
        const tableData = Object.entries(value).find(([key]) => isTableDataKey(key))?.[1];
        if (isMatrix(tableData)) return renderMobileMatrixRows(tableData, `${keyPrefix}-table`);
        if (Array.isArray(tableData)) {
            return tableData.flatMap((item, index) => {
                if (isMatrix(item)) return renderMobileMatrixRows(item, `${keyPrefix}-table-${index}`);
                if (!isPlainObject(item) || !isMatrix(item['表格数据'])) return [];
                return renderMobileMatrixRows(item['表格数据'], `${keyPrefix}-table-${index}`);
            });
        }

        return Object.entries(value)
            .filter(([param, val]) => !isAuxiliaryKey(param) && hasMobileValue(val))
            .flatMap(([param, val], idx) => {
                if (isPlainObject(val) || isMatrix(val) || (Array.isArray(val) && !isPrimitiveList(val))) {
                    return [
                        <tr key={`${keyPrefix}-${param}-group`} className={styles.tableHeader}>
                            <td colSpan={2} className={styles.specLabel}>{param}</td>
                        </tr>,
                        ...renderMobileValueRows(val, `${keyPrefix}-${param}-${idx}`)
                    ];
                }

                return [
                    <tr key={`${keyPrefix}-${param}-${idx}`}>
                        <td className={styles.specLabel}>{param}</td>
                        <td className={styles.specValue}>{stringifyMobileValue(val)}</td>
                    </tr>
                ];
            });
    }

    return [
        <tr key={keyPrefix}>
            <td className={styles.specValue} colSpan={2}>{stringifyMobileValue(value)}</td>
        </tr>
    ];
}

function renderMobileSpecRows(parameters: any): React.ReactNode {
    if (isMatrix(parameters)) return renderMobileMatrixRows(parameters, 'root');

    if (!isPlainObject(parameters)) return null;

    if (!shouldRenderMobileSections(parameters)) {
        return Object.entries(parameters)
            .filter(([param, val]) => !isAuxiliaryKey(param) && hasMobileValue(val))
            .map(([param, val], idx) => (
                <tr key={`root-${param}-${idx}`}>
                    <td className={styles.specLabel}>{param}</td>
                    <td className={styles.specValue}>{stringifyMobileValue(val)}</td>
                </tr>
            ));
    }

    return Object.entries(parameters).flatMap(([param, val], idx) => {
        return [
            <tr key={`${param}-group-${idx}`} className={styles.tableHeader}>
                <td colSpan={2} className={styles.specLabel}>{param}</td>
            </tr>,
            ...renderMobileValueRows(val, `${param}-${idx}`)
        ];
    });
}

export default function MobileProductDetail({ product, locale, dict, basePath = '/products', catalogLabel, brochurePageCount }: ProductProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('overview');

    // Localized field selection
    const name = product[`product_name_${locale}`] || product.product_name_en || product.name;
    const summary = product[`summary_${locale}`] || product.summary_en;
    const keyApp = product[`key_application_${locale}`] || product.key_application_en;
    const keyParam1 = getArabicTechnicalHighlight(product, 'key_parameter_1', locale);
    const keyParam2 = getArabicTechnicalHighlight(product, 'key_parameter_2', locale);
    const detailHtml = product[`detail_html_${locale}`] || product.detail_html_en;
    const sectionLabel = catalogLabel || dict.nav.products;
    
    let parameters: any = null;
    try {
        const rawParams = getArabicTechnicalParameters(product, locale);
        parameters = typeof rawParams === 'string' ? JSON.parse(rawParams) : rawParams;
    } catch (e) {
        parameters = {};
    }

    const mainImg = product.main_image;

    const displayImages = mainImg ? [mainImg] : [];
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
                        {keyParam2 && !isCategorySpecLine(keyParam2) && <div className={styles.paramItem}>{formatSpecLine(keyParam2)}</div>}
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

                {brochurePageCount && (
                    <ProductBrochureDownload
                        productHandle={product.handle}
                        productName={name}
                        pageCount={brochurePageCount}
                        compact
                    />
                )}

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

