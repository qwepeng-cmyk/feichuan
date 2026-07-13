'use client';

import React, { useMemo } from 'react';
import styles from './MobileSolutionCenter.module.css';
import MobileInquiryForm from './MobileInquiryForm';
import Link from 'next/link';
import Image from 'next/image';
import { localePath } from '@/lib/localePath';
import { localizedField } from '@/lib/localization';
import {
    englishCuasSolutionCenterGroups,
    solutionCenterCardImageByHandle,
    solutionCenterGroups,
    solutionCenterImageByHandle,
} from '@/lib/solutionCenterGroups';
import { localizeCuasTree } from '@/lib/cuasLocaleCopy';

interface Solution {
    id: string;
    title_en: string;
    product_name_en?: string;
    product_name_ru?: string;
    product_name_es?: string;
    product_name_ar?: string;
    summary_en?: string;
    summary_ru?: string;
    summary_es?: string;
    summary_ar?: string;
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

    const ICON_AIRSPACE = (
        <g>
            <path d="M10 24a14 14 0 0 1 28 0H10z" fill="rgba(49, 91, 164, 0.05)" />
            <path d="M10 24h28M14 26h20v2H14z" />
            <path d="M24 28v4M18 42l6-10 6 10M24 32v2M20 37l-4 5m12-5l4 5" />
            <path d="M16 20c0-4.4 3.6-8 8-8s8 3.6 8 8" strokeDasharray="2 2" />
        </g>
    );

    const GROUP_ICONS: Record<string, React.ReactNode> = {
        'uav-inspection-patrol': (
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
        'uav-emergency-response': (
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
        ),
        'critical-infrastructure-protection': (
            <svg viewBox="0 0 110 48" fill="none" stroke="#315ba4" strokeWidth="1.5">
                <g transform="translate(0, 0)">{ICON_AIRSPACE}</g>
                <path d="M52 24h6M55 21v6" stroke="#ff9800" strokeWidth="3" strokeLinecap="round" />
                <g transform="translate(62, 0)">{ICON_CAMERA}</g>
            </svg>
        ),
        'key-area-security': (
            <svg viewBox="0 0 110 48" fill="none" stroke="#315ba4" strokeWidth="1.5">
                <g transform="translate(0, 0)">{ICON_AIRSPACE}</g>
                <path d="M52 24h6M55 21v6" stroke="#ff9800" strokeWidth="3" strokeLinecap="round" />
                <g transform="translate(62, 0)">
                    <rect x="12" y="6" width="24" height="36" />
                    <path d="M16 6v36M32 6v36" strokeWidth="2" />
                    <rect x="18" y="8" width="12" height="6" fill="rgba(49, 91, 164, 0.1)" />
                    <path d="M12 18h24M12 24h24M12 30h24M12 36h24" strokeOpacity="0.3" />
                    <circle cx="24" cy="11" r="1.5" fill="#315ba4" stroke="none" />
                </g>
            </svg>
        )
    };

    type ActiveGroup = (typeof solutionCenterGroups)[number] | (typeof englishCuasSolutionCenterGroups)[number];
    const useCuasCenter = ['en', 'ru', 'es', 'ar'].includes(locale);
    const activeGroups: readonly ActiveGroup[] = useCuasCenter ? englishCuasSolutionCenterGroups : solutionCenterGroups;
    const defaultCuasIcon = (
        <svg viewBox="0 0 110 48" fill="none" stroke="#315ba4" strokeWidth="1.5" aria-hidden="true">
            <g transform="translate(0, 0)">{ICON_AIRSPACE}</g>
            <path d="M52 24h6M55 21v6" stroke="#ff9800" strokeWidth="3" strokeLinecap="round" />
            <g transform="translate(62, 0)">{ICON_CAMERA}</g>
        </svg>
    );

    const t = (group: ActiveGroup, field: 'label' | 'eyebrow' | 'description') => {
        if (field === 'label') {
            return dict?.solutionCenterGroups?.[group.labelKey] || group.fallbackLabel;
        }
        if (field === 'eyebrow') {
            return dict?.megaMenu?.[group.eyebrowKey] || group.fallbackEyebrow;
        }
        return dict?.solutionCenterGroups?.[group.descriptionKey] || group.fallbackDescription;
    };

    const displayGroups = useMemo(() => {
        const solutionsById = new Map(allSolutions.map((solution) => [solution.id, solution]));
        return activeGroups
            .map((group) => ({
                id: group.id,
                name: t(group, 'label'),
                categoryHref: group.categoryHref,
                icon: GROUP_ICONS[group.id] || defaultCuasIcon,
                solutions: group.handles
                    .map((handle) => solutionsById.get(handle))
                    .filter(Boolean) as Solution[],
            }))
            .filter((group) => group.solutions.length > 0);
    }, [allSolutions, dict, locale]);

    const getSolutionTitle = (solution: Solution) => localizedField(solution, 'product_name', locale) || localizedField(solution, 'title', locale);
    const overviewSolutions = Array.from(new Map(
        displayGroups.flatMap((group) => group.solutions).map((solution) => [solution.id, solution])
    ).values());

    const shouldUseProductImageTreatment = (image?: string) => (
        Boolean(image?.includes('/products/uav-systems/'))
    );

    return localizeCuasTree(locale, (
        <div className={styles.wrapper}>
            <section className={styles.banner}>
                <div className={styles.bannerOverlay}></div>
                <div className={styles.bannerContent}>
                    <div className={styles.bannerTitle}>{dict.solutions.bannerTitle}</div>
                </div>
            </section>

            <div className={styles.listContainer}>
                {useCuasCenter ? (
                    <section className={`${styles.categorySection} ${styles.overviewSection}`}>
                        <div className={styles.grid}>
                            {overviewSolutions.map((sol) => {
                                const solTitle = getSolutionTitle(sol);
                                const centerImage = solutionCenterCardImageByHandle[sol.id] || solutionCenterImageByHandle[sol.id] || sol.main_image;
                                const productImageTreatment = shouldUseProductImageTreatment(centerImage);
                                return (
                                    <Link prefetch={false} href={localePath(locale, `/solutions/${sol.id}`)} key={sol.id} className={styles.card}>
                                        <div className={styles.imageBox}>
                                            <Image
                                                src={centerImage || '/images/solutions/placeholder.jpg'}
                                                alt={solTitle}
                                                fill
                                                style={{
                                                    objectFit: productImageTreatment ? 'contain' : 'cover',
                                                    padding: productImageTreatment ? '5px' : 0,
                                                    mixBlendMode: productImageTreatment ? 'multiply' : 'normal'
                                                }}
                                                sizes="50vw"
                                            />
                                        </div>
                                        <div className={styles.cardInfo}>
                                            <h3>{solTitle}</h3>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                ) : displayGroups.map((group, groupIndex) => (
                    <section key={group.id} id={`mobile-sol-${group.id}`} className={`${styles.categorySection} ${groupIndex < 2 ? styles.priority : ''}`}>
                        <div className={styles.sectionHeader}>
                            <h2>{group.name}</h2>
                            <div className={styles.accentLine}></div>
                        </div>

                        <div className={styles.grid}>
                            {group.solutions.map((sol) => {
                                const solTitle = getSolutionTitle(sol);
                                const centerImage = solutionCenterImageByHandle[sol.id] || sol.main_image;
                                const productImageTreatment = shouldUseProductImageTreatment(centerImage);
                                return (
                                    <Link prefetch={false} href={localePath(locale, `/solutions/${sol.id}`)} key={sol.id} className={styles.card}>
                                        <div className={styles.imageBox}>
                                            <Image
                                                src={centerImage || '/images/solutions/placeholder.jpg'}
                                                alt={solTitle}
                                                fill
                                                style={{
                                                    objectFit: productImageTreatment ? 'contain' : 'cover',
                                                    padding: productImageTreatment ? '5px' : 0,
                                                    mixBlendMode: productImageTreatment ? 'multiply' : 'normal'
                                                }}
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        </div>
                                        <div className={styles.cardInfo}>
                                            <h3>{solTitle}</h3>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                        {group.categoryHref && (
                            <Link prefetch={false} href={localePath(locale, group.categoryHref)} className={styles.viewMoreButton}>
                                {dict.solutions.exploreAll}
                            </Link>
                        )}
                    </section>
                ))}
            </div>

            <MobileInquiryForm dict={dict} />
        </div>
    ));
}
