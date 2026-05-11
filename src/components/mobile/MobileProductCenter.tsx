'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './MobileProductCenter.module.css';
import Link from 'next/link';
import Image from 'next/image';
import MobileInquiryForm from './MobileInquiryForm';

interface Product {
    name: string;
    description?: string;
    image: string;
    specs?: Record<string, string>;
    handle: string;
}

export default function MobileProductCenter({ 
    categoriesData,
    locale,
    dict
}: { 
    categoriesData: any,
    locale: string,
    dict: any
}) {
    const CATEGORY_NAMES: Record<string, string> = {
        'uav-drone-systems': dict.products.categories.uav,
        'anti-drone-cuas': dict.products.categories.antiDrone,
        'security-screening': dict.products.categories.security,
        'defense-engineering': dict.products.categories.defense,
        'field-hospitals': dict.products.categories.medical,
        'perimeter-intelligence': dict.products.categories.surveillance
    };

    const CATEGORY_ICONS: Record<string, React.ReactNode> = {
        'uav-drone-systems': (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M24 18l4 2v6l-4 3-4-3v-6l4-2z" fill="rgba(49, 91, 164, 0.1)" strokeWidth="1.5" />
                <g strokeWidth="1.5" strokeLinecap="round"><path d="M24 18V9M24 28v10" /><path d="M21 19.5l-8-5M27 26.5l8 5M21 26.5l-8 5M27 19.5l8-5" /></g>
                <g fill="currentColor" stroke="none">
                    <g transform="translate(24,9)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                    <g transform="translate(24,38)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                    <g transform="translate(13,14.5) rotate(60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                    <g transform="translate(35,31.5) rotate(60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                    <g transform="translate(13,31.5) rotate(-60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                    <g transform="translate(35,14.5) rotate(-60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                </g>
            </svg>
        ),
        'anti-drone-cuas': (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 24a14 14 0 0 1 28 0H10z" fill="rgba(49, 91, 164, 0.05)" />
                <path d="M10 24h28M14 26h20v2H14z" /><path d="M24 28v4M18 42l6-10 6 10M24 32v2M20 37l-4 5m12-5l4 5" />
                <path d="M16 20c0-4.4 3.6-8 8-8s8 3.6 8 8" strokeDasharray="2 2" />
            </svg>
        ),
        'security-screening': (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="12" y="6" width="24" height="36" />
                <path d="M16 6v36M32 6v36" strokeWidth="2" />
                <rect x="18" y="8" width="12" height="6" fill="rgba(49, 91, 164, 0.1)" />
                <path d="M12 18h24M12 24h24M12 30h24M12 36h24" strokeOpacity="0.3" />
                <circle cx="24" cy="11" r="1.5" fill="currentColor" />
            </svg>
        ),
        'defense-engineering': (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 28h40M4 36h40" strokeWidth="2" /><path d="M6 28l6 8M16 28l6 8M26 28l6 8M36 28l6 8" /><path d="M12 28l-6 8M22 28l-6 8M32 28l-6 8M42 28l-6 8" />
                <path d="M4 27h40v2H4z" fill="currentColor" />
            </svg>
        ),
        'field-hospitals': (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="8" y="14" width="32" height="24" rx="2" /><path d="M18 14V10a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" /><path d="M8 22h32M24 18v16M18 26h12" strokeWidth="3" />
            </svg>
        ),
        'perimeter-intelligence': (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 12h20l2 10H12l2-10z" fill="rgba(49, 91, 164, 0.05)" />
                <circle cx="24" cy="28" r="10" /><circle cx="24" cy="28" r="4" fill="currentColor" /><circle cx="26" cy="26" r="1" fill="#fff" /><path d="M12 22h24" strokeWidth="2" />
            </svg>
        )
    };

    const categoryList = Object.keys(CATEGORY_NAMES).map(key => ({
        id: key,
        name: CATEGORY_NAMES[key],
        icon: CATEGORY_ICONS[key]
    }));

    const [activeCategory, setActiveCategory] = useState(categoryList[0].id);
    const [isFixed, setIsFixed] = useState(false);
    const bannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (bannerRef.current) {
                const bannerBottom = bannerRef.current.getBoundingClientRect().bottom;
                setIsFixed(bannerBottom <= 108);
            }

            const sections = categoryList.map(cat => document.getElementById(`mobile-${cat.id}`));
            const scrollPos = window.scrollY + 250;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section) {
                    const top = section.getBoundingClientRect().top + window.pageYOffset;
                    if (scrollPos >= top - 200) {
                        setActiveCategory(categoryList[i].id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [categoryList]);

    const scrollToCategory = (id: string) => {
        const element = document.getElementById(`mobile-${id}`);
        if (element) {
            const totalOffset = 198;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - totalOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setActiveCategory(id);
        }
    };

    return (
        <div className={styles.wrapper}>
            <section className={styles.banner} ref={bannerRef}>
                <div className={styles.bannerOverlay}></div>
                <div className={styles.bannerContent}>
                    <h1>{dict.products.bannerTitle}</h1>
                </div>
            </section>

            {/* Placeholder to prevent content jump */}
            {isFixed && <div style={{ height: '80px' }}></div>}

            <div className={`${styles.stickyNav} ${isFixed ? styles.fixed : ''}`}>
                <div className={styles.tabTrack}>
                    {categoryList.map((cat) => (
                        <button
                            key={cat.id}
                            className={`${styles.tabItem} ${activeCategory === cat.id ? styles.active : ''}`}
                            onClick={() => scrollToCategory(cat.id)}
                        >
                            <div className={styles.iconBox}>{cat.icon}</div>
                            <span className={styles.tabText}>{cat.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.listContainer}>
                {categoryList.map((category) => (
                    <section key={category.id} id={`mobile-${category.id}`} className={styles.categorySection}>
                        <div className={styles.sectionHeader}>
                            <h2>{CATEGORY_NAMES[category.id]}</h2>
                            <div className={styles.accentLine}></div>
                        </div>

                        <div className={styles.grid}>
                            {categoriesData[category.id]?.map((product: Product, idx: number) => (
                                <Link href={`/${locale}/products/${product.handle}`} key={idx} className={styles.productCard}>
                                    <div className={styles.imageBox}>
                                        <Image src={product.image} alt={product.name} fill style={{ objectFit: 'contain', padding: '10px' }} sizes="45vw" />
                                    </div>
                                    <div className={styles.cardInfo}>
                                        <h3>{product.name}</h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            {/* Mobile Inquiry Form */}
            <MobileInquiryForm dict={dict} />
        </div>
    );
}

