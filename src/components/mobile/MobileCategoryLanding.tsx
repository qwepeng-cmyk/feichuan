'use client';

import React from 'react';
import styles from './MobileCategoryLanding.module.css';
import MobileInquiryForm from './MobileInquiryForm';
import Link from 'next/link';

interface SubSolution {
    product_name: string;
    product_name_en: string;
    summary: string;
    summary_en: string;
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
}

export default function MobileCategoryLanding({ 
    categoryName, 
    bannerImage, 
    industryNeeds, 
    subSolutions, 
    recommendedProducts 
}: Props) {
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
                <a href="/">Home</a>
                <span className={styles.breadcrumbSeparator}>/</span>
                <a href="/solutions">Solutions</a>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbActive}>{categoryName}</span>
            </div>

            {/* 3. Industry Needs */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Industry Needs</h2>
                <div className={styles.textContent}>
                    {industryNeeds}
                </div>
            </section>

            {/* 4. Solution Overview */}
            <section className={styles.section} style={{ background: '#f8fafc' }}>
                <h2 className={styles.sectionTitle}>Solution Overview</h2>
                <div className={styles.solutionsList}>
                    {subSolutions.map((sol) => (
                        <div key={sol.handle} className={styles.solutionItem}>
                            <Link href={`/solutions/${sol.handle}`} className={styles.solutionImage}>
                                <img src={sol.main_image || '/images/solutions/placeholder.jpg'} alt={sol.product_name_en} />
                            </Link>
                            <div className={styles.solutionInfo}>
                                <h3>{sol.product_name_en}</h3>
                                <p>{sol.summary_en}</p>
                                <Link href={`/solutions/${sol.handle}`} className={styles.viewDetailsBtn}>
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. Product Recommendations - Dark Background as PC */}
            {recommendedProducts && recommendedProducts.length > 0 && (
                <section className={styles.recommendations}>
                    <h2 className={styles.recommendationsTitle}>Product Recommendations</h2>
                    <div className={styles.productGrid}>
                        {recommendedProducts.map((prod, idx) => (
                            <Link href={`/products/${prod.handle}`} key={idx} className={styles.productCard}>
                                <div className={styles.productImageBox}>
                                    <img src={prod.main_image || prod.image} alt={prod.product_name_en || prod.name} />
                                </div>
                                <div className={styles.productInfo}>
                                    <h3>{prod.product_name_en || prod.name}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* 6. Inquiry Section */}
            <section className={styles.section} style={{ background: '#f8f9fa' }}>
                <MobileInquiryForm />
            </section>
        </div>
    );
}
