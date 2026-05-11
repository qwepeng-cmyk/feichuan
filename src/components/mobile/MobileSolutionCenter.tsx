'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './MobileSolutionCenter.module.css';
import MobileInquiryForm from './MobileInquiryForm';
import Link from 'next/link';
import Image from 'next/image';

interface Solution {
    id: string;
    title_en: string;
    product_name_en?: string;
    product_name_ru?: string;
    main_image?: string;
    category_id: string;
}

export default function MobileSolutionCenter({ 
    allSolutions,
    locale,
    dict
}: { 
    allSolutions: Solution[],
    locale: string,
    dict: any
}) {
    const CATEGORY_NAMES: Record<string, string> = {
        '01_BorderPatrol': dict.solutions.categories.border,
        '02_InfrastructureProtection': dict.solutions.categories.infrastructure,
        '03_KeyAreaSecurity': dict.solutions.categories.security,
        '04_EmergencyRescue': dict.solutions.categories.emergency
    };

    // Replicating PC Icon Components
    const ICON_CAMERA = (
        <g>
            <path d="M14 12h20l2 10H12l2-10z" fill="rgba(49, 91, 164, 0.05)" />
            <circle cx="24" cy="28" r="10" />
            <circle cx="24" cy="28" r="4" fill="#315ba4" stroke="none" />
            <path d="M14 28h20M24 18v20" strokeOpacity="0.2" />
            <rect x="20" y="38" width="8" height="4" />
            <path d="M12 22h24" strokeWidth="2" />
        </g>
    );

    const ICON_ANTIDRONE = (
        <g>
            <path d="M10 24a14 14 0 0 1 28 0H10z" fill="rgba(49, 91, 164, 0.05)" />
            <path d="M10 24h28M14 26h20v2H14z" />
            <path d="M24 28v4M18 42l6-10 6 10M24 32v2M20 37l-4 5m12-5l4 5" />
            <path d="M16 20c0-4.4 3.6-8 8-8s8 3.6 8 8" strokeDasharray="2 2" />
        </g>
    );

    const CATEGORY_ICONS: Record<string, React.ReactNode> = {
        '01_BorderPatrol': (
            <svg viewBox="0 0 110 48" fill="none" stroke="#315ba4" strokeWidth="1.5">
                <g transform="translate(0, 0)">
                    <path d="M24 10l2 24-2 4-2-4 2-24z" fill="rgba(49, 91, 164, 0.05)" />
                    <path d="M4 22l20-4 20 4-20 4L4 22z" strokeWidth="1.8" />
                    <path d="M18 36l6-2 6 2-6 2-6-2z" />
                    <g fill="#315ba4" stroke="none">
                        <rect x="10" y="16" width="1.5" height="12" rx="0.5" />
                        <rect x="37" y="16" width="1.5" height="12" rx="0.5" />
                    </g>
                </g>
                <path d="M52 24h6M55 21v6" stroke="#ff9800" strokeWidth="3" strokeLinecap="round" />
                <g transform="translate(62, 0)">{ICON_CAMERA}</g>
            </svg>
        ),
        '02_InfrastructureProtection': (
            <svg viewBox="0 0 110 48" fill="none" stroke="#315ba4" strokeWidth="1.5">
                <g transform="translate(0, 0)">{ICON_ANTIDRONE}</g>
                <path d="M52 24h6M55 21v6" stroke="#ff9800" strokeWidth="3" strokeLinecap="round" />
                <g transform="translate(62, 0)">{ICON_CAMERA}</g>
            </svg>
        ),
        '03_KeyAreaSecurity': (
            <svg viewBox="0 0 110 48" fill="none" stroke="#315ba4" strokeWidth="1.5">
                <g transform="translate(0, 0)">{ICON_ANTIDRONE}</g>
                <path d="M52 24h6M55 21v6" stroke="#ff9800" strokeWidth="3" strokeLinecap="round" />
                <g transform="translate(62, 0)">
                    <rect x="12" y="6" width="24" height="36" />
                    <path d="M16 6v36M32 6v36" strokeWidth="2" />
                    <rect x="18" y="8" width="12" height="6" fill="rgba(49, 91, 164, 0.1)" />
                    <path d="M12 18h24M12 24h24M12 30h24M12 36h24" strokeOpacity="0.3" />
                    <circle cx="24" cy="11" r="1.5" fill="#315ba4" stroke="none" />
                </g>
            </svg>
        ),
        '04_EmergencyRescue': (
            <svg viewBox="0 0 110 48" fill="none" stroke="#315ba4" strokeWidth="1.2">
                <g transform="translate(0, 0)">
                    <path d="M24 18l4 2v6l-4 3-4-3v-6l4-2z" fill="rgba(49, 91, 164, 0.1)" strokeWidth="1.5" />
                    <g strokeWidth="1.5" strokeLinecap="round">
                        <path d="M24 18V9M24 28v10" />
                        <path d="M21 19.5l-8-5M27 26.5l8 5M21 26.5l-8 5M27 19.5l8-5" />
                    </g>
                    <path d="M18 7c2-2 10-2 12 0M15 4c3-3 15-3 18 0M12 1c4-4 20-4 24 0" stroke="#ff9800" strokeWidth="2" strokeLinecap="round" />
                    <g fill="#315ba4" stroke="none">
                        <g transform="translate(24,9)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                        <g transform="translate(24,38)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                        <g transform="translate(13,14.5) rotate(60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                        <g transform="translate(35,31.5) rotate(60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                        <g transform="translate(13,31.5) rotate(-60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                        <g transform="translate(35,14.5) rotate(-60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                    </g>
                </g>
                <path d="M52 24h6M55 21v6" stroke="#ff9800" strokeWidth="3" strokeLinecap="round" />
                <g transform="translate(62, 0)">
                    <path d="M24 18l4 2v6l-4 3-4-3v-6l4-2z" fill="rgba(49, 91, 164, 0.1)" strokeWidth="1.5" />
                    <g strokeWidth="1.5" strokeLinecap="round">
                        <path d="M24 18V9M24 28v10" />
                        <path d="M21 19.5l-8-5M27 26.5l8 5M21 26.5l-8 5M27 19.5l8-5" />
                    </g>
                    <path d="M22 30l-10 16h24l-10-16z" fill="rgba(255, 152, 0, 0.25)" stroke="none" />
                    <path d="M18 42l-2 4M24 42v4M30 42l2 4" stroke="#ff9800" strokeWidth="1" strokeLinecap="round" />
                    <g fill="#315ba4" stroke="none">
                        <g transform="translate(24,9)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                        <g transform="translate(24,38)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                        <g transform="translate(13,14.5) rotate(60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                        <g transform="translate(35,31.5) rotate(60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                        <g transform="translate(13,31.5) rotate(-60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                        <g transform="translate(35,14.5) rotate(-60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                    </g>
                </g>
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

            const sections = categoryList.map(cat => document.getElementById(`mobile-sol-${cat.id}`));
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
        const element = document.getElementById(`mobile-sol-${id}`);
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
                    <h1>{dict.solutions.bannerTitle}</h1>
                </div>
            </section>

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
                    <section key={category.id} id={`mobile-sol-${category.id}`} className={styles.categorySection}>
                        <div className={styles.sectionHeader}>
                            <h2>{CATEGORY_NAMES[category.id]}</h2>
                        </div>

                        <div className={styles.grid}>
                            {allSolutions
                                .filter(s => s.category_id === category.id)
                                .map((sol, idx) => {
                                    const solTitle =
                                        locale === 'ru'
                                            ? (sol.product_name_ru || sol.product_name_en || sol.title_en)
                                            : (sol.product_name_en || sol.title_en);
                                    return (
                                        <Link href={`/${locale}/solutions/${sol.id}`} key={idx} className={styles.card}>
                                            <div className={styles.imageBox} style={{ position: 'relative', width: '100%', paddingTop: '75%', overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
                                                <Image src={sol.main_image || '/images/solutions/placeholder.jpg'} alt={solTitle} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" priority={idx < 2} />
                                            </div>
                                            <div className={styles.cardInfo}>
                                                <h3>{solTitle}</h3>
                                            </div>
                                        </Link>
                                    );
                                })}
                        </div>
                        <Link href={`/${locale}/solutions/category/${category.id}`} className={styles.viewMoreButton}>
                            {dict.solutions.viewDetails}
                        </Link>
                    </section>
                ))}
            </div>

            <MobileInquiryForm dict={dict} />
        </div>
    );
}
