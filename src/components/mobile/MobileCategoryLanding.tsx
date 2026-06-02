'use client';

import React from 'react';
import styles from './MobileCategoryLanding.module.css';
import MobileInquiryForm from './MobileInquiryForm';
import Link from 'next/link';
import Image from 'next/image';
import { localePath } from '@/lib/localePath';
import { withStaticAssetVersion } from '@/lib/assetVersion';

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
    const l = (path: string) => localePath(locale, path);

    return (
        <div className={styles.wrapper}>
            {/* 1. Banner - Consistent with Product Center */}
            <section className={styles.banner} style={{ position: 'relative', overflow: 'hidden' }}>
                <Image src={withStaticAssetVersion(bannerImage)} fill style={{ objectFit: 'cover' }} priority alt={categoryName} />
                <div className={styles.bannerOverlay}></div>
                <div className={styles.bannerContent}>
                    <div className={styles.bannerTitle}>{categoryName}</div>
                </div>
            </section>
 
            {/* 2. Breadcrumb */}
            <div className="cl-m-breadcrumb" style={{ fontSize: '13px', color: '#666', marginBottom: '15px' }}>
                <Link prefetch={false} href={l("/")}>{dict.nav.home}</Link>
                <span style={{ margin: '0 5px' }}>&gt;</span>
                <Link prefetch={false} href={l("/solutions")}>{dict.nav.solutions}</Link>
                <span style={{ margin: '0 5px' }}>&gt;</span>
                <span>{categoryName}</span>
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
                                <Link prefetch={false} href={l(`/solutions/${sol.handle}`)} className={styles.solutionImage} style={{ position: 'relative', display: 'block', width: '100%', paddingTop: '56.25%', overflow: 'hidden' }}>
                                    <Image src={withStaticAssetVersion(sol.main_image || '/images/solutions/placeholder.jpg')} alt={solName} fill style={{ objectFit: 'cover' }} sizes="40vw" />
                                </Link>
                                <div className={styles.solutionInfo}>
                                    <h3>{solName}</h3>
                                    <p>{solSummary}</p>
                                    <Link prefetch={false} href={l(`/solutions/${sol.handle}`)} className={styles.viewDetailsBtn}>
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
                                <Link prefetch={false} href={l(`/products/${prod.handle}`)} key={idx} className={styles.productCard}>
                                    <div className={styles.productImageBox} style={{ position: 'relative', width: '100%', paddingTop: '75%', overflow: 'hidden' }}>
                                        <Image src={withStaticAssetVersion(prodImage)} alt={prodName} fill style={{ objectFit: 'cover' }} sizes="40vw" />
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

