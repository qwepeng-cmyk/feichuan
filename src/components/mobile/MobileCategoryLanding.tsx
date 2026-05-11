'use client';

import React from 'react';
import styles from './MobileCategoryLanding.module.css';
import MobileInquiryForm from './MobileInquiryForm';
import Link from 'next/link';

interface SubSolution {
    product_name: string;
    product_name_en: string;
    product_name_ru: string;
    summary: string;
    summary_en: string;
    summary_ru: string;
    main_image: string;
    handle: string;
}

interface Props {
    categoryId: string;
    categoryName: string;
    bannerImage: string;
    industryNeeds: string;
    subSolutions: SubSolution[];
    recommendedProducts: any[];
    locale: string;
    dict: any;
}

export default function MobileCategoryLanding({ 
    categoryName, 
    bannerImage, 
    industryNeeds, 
    subSolutions, 
    recommendedProducts,
    locale,
    dict
}: Props) {
    const l = (path: string) => `/${locale}${path === '/' ? '' : path}`;

    return (
        <div className={styles.wrapper}>
            {/* 1. Banner - Consistent with Product Center */}
            <section className={styles.banner} style={{ backgroundImage: `url('${bannerImage}')` }}>
                <div className={styles.bannerOverlay}></div>
                <div className={styles.bannerContent}>
                    <h1>{categoryName}</h1>
                </div>
            </section>
 
            {/* 2. Breadcrumb */}
            <div className={styles.breadcrumb}>
                <a href={l("/")}>{dict.nav.home}</a>
                <span className={styles.breadcrumbSeparator}>/</span>
                <a href={l("/solutions")}>{dict.nav.solutions}</a>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbActive}>{categoryName}</span>
            </div>

            {/* 3. Industry Needs */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>{dict.solutions.industryNeeds}</h2>
                <div className={styles.textContent}>
                    {industryNeeds}
                </div>
            </section>

            {/* 4. Solution Overview */}
            <section className={styles.section} style={{ background: '#f8fafc' }}>
                <h2 className={styles.sectionTitle}>{dict.solutions.pageTitle}</h2>
                <div className={styles.solutionsList}>
                    {subSolutions.map((sol) => {
                        const solName = locale === 'ru' ? sol.product_name_ru : sol.product_name_en;
                        const solSummary = locale === 'ru' ? sol.summary_ru : sol.summary_en;
                        return (
                            <div key={sol.handle} className={styles.solutionItem}>
                                <Link href={l(`/solutions/${sol.handle}`)} className={styles.solutionImage}>
                                    <img src={sol.main_image || '/images/solutions/placeholder.jpg'} alt={solName} />
                                </Link>
                                <div className={styles.solutionInfo}>
                                    <h3>{solName}</h3>
                                    <p>{solSummary}</p>
                                    <Link href={l(`/solutions/${sol.handle}`)} className={styles.viewDetailsBtn}>
                                        {dict.solutions.viewDetails}
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* 5. Product Recommendations - Dark Background as PC */}
            {recommendedProducts && recommendedProducts.length > 0 && (
                <section className={styles.recommendations}>
                    <h2 className={styles.recommendationsTitle}>{dict.solutions.recommendedProducts}</h2>
                    <div className={styles.productGrid}>
                        {recommendedProducts.map((prod, idx) => {
                             const prodName = locale === 'ru' ? (prod.product_name_ru || prod.name_ru || prod.name) : (prod.product_name_en || prod.name_en || prod.name);
                             const prodImage = prod.main_image || prod.image;
                             return (
                                <Link href={l(`/products/${prod.handle}`)} key={idx} className={styles.productCard}>
                                    <div className={styles.productImageBox}>
                                        <img src={prodImage} alt={prodName} />
                                    </div>
                                    <div className={styles.productInfo}>
                                        <h3>{prodName}</h3>
                                    </div>
                                </Link>
                             );
                        })}
                    </div>
                </section>
            )}

            {/* 6. Inquiry Section */}
            <section className={styles.section} style={{ background: '#f8f9fa' }}>
                <MobileInquiryForm dict={dict} />
            </section>
        </div>
    );
}
