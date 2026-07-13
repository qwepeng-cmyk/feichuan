'use client';

import React, { useState, useMemo } from 'react';
import styles from './MobileCaseCenter.module.css';
import MobileInquiryForm from './MobileInquiryForm';
import Link from 'next/link';
import Image from 'next/image';
import { localePath } from '@/lib/localePath';
import {
    caseCenterSolutionGroups,
    englishCuasCaseCenterSolutionGroups,
    getCaseSolutionGroupId,
    getEnglishCuasCaseSolutionGroupId,
} from '@/lib/caseSolutionGroups';
import { orderCasesForCasesPage } from '@/lib/caseDisplayOrder';
import { withStaticAssetVersion } from '@/lib/assetVersion';
import { localizeCuasTree } from '@/lib/cuasLocaleCopy';

interface CaseItem {
    handle: string;
    title_en: string;
    main_image: string;
    region_en?: string;
    country_en?: string;
    solution_category_id?: string;
    [key: string]: any;
}

export default function MobileCaseCenter({ 
    allCases,
    locale,
    dict
}: { 
    allCases: CaseItem[],
    locale: string,
    dict: any
}) {
    const [selectedSolution, setSelectedSolution] = useState('all');
    const [selectedRegionId, setSelectedRegionId] = useState('all');
    const [regionOpen, setRegionOpen] = useState(false);
    const [solutionOpen, setSolutionOpen] = useState(false);
    const isCuasPage = ['en', 'ru', 'es', 'ar'].includes(locale);
    const solutionGroups = isCuasPage ? englishCuasCaseCenterSolutionGroups : caseCenterSolutionGroups;

    const SOLUTION_CATEGORIES = [
        { id: 'all', name: dict.cases.filters.allSolutions || 'All Solutions' },
        ...solutionGroups.map((group) => ({
            id: group.id,
            name: dict?.solutionCenterGroups?.[group.labelKey] || group.fallbackLabel
        }))
    ];

    const REGIONS = [
        { id: 'all', name: dict.cases.filters.allRegions || 'All Regions' },
        { id: 'china', name: dict.cases.filters.regions.china },
        { id: 'Asia', name: dict.cases.filters.regions.asia },
        { id: 'Africa', name: dict.cases.filters.regions.africa },
        { id: 'North America', name: dict.cases.filters.regions.northAmerica },
        { id: 'South America', name: dict.cases.filters.regions.southAmerica },
        { id: 'Europe', name: dict.cases.filters.regions.europe },
        { id: 'Oceania', name: dict.cases.filters.regions.oceania }
    ];

    const orderedCases = useMemo(() => orderCasesForCasesPage(allCases), [allCases]);

    const filteredCases = useMemo(() => {
        return orderedCases.filter(item => {
            const itemSolutionId = isCuasPage
                ? getEnglishCuasCaseSolutionGroupId(item)
                : getCaseSolutionGroupId(item);
            const matchesSolution = selectedSolution === 'all' || itemSolutionId === selectedSolution;
            
            let matchesRegion = true;
            if (selectedRegionId === 'all') {
                matchesRegion = true;
            } else if (selectedRegionId === 'china') {
                matchesRegion = item.country_en === 'China';
            } else if (selectedRegionId === 'Asia') {
                matchesRegion = item.region_en === 'Asia' && item.country_en !== 'China';
            } else {
                matchesRegion = item.region_en === selectedRegionId;
            }
            
            return matchesSolution && matchesRegion;
        });
    }, [isCuasPage, orderedCases, selectedSolution, selectedRegionId]);

    return localizeCuasTree(locale, (
        <div className={styles.wrapper}>
            {(regionOpen || solutionOpen) && (
                <div className={styles.backdrop} onClick={() => {
                    setRegionOpen(false);
                    setSolutionOpen(false);
                }} />
            )}

            <section className={styles.banner}>
                <div className={styles.bannerOverlay}></div>
                <div className={styles.bannerContent}>
                    <div className={styles.bannerTitle}>{dict.cases.bannerTitle}</div>
                </div>
            </section>

            <section className={styles.filterSection}>
                <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>{dict.cases.filters.regionLabel || 'Region'}</label>
                    <div 
                        className={`${styles.selectBox} ${regionOpen ? styles.dropdownActive : ''}`}
                        onClick={() => {
                            setRegionOpen(!regionOpen);
                            setSolutionOpen(false);
                        }}
                    >
                        {REGIONS.find(r => r.id === selectedRegionId)?.name}
                        
                        {regionOpen && (
                            <div className={styles.dropdownList}>
                                {REGIONS.map(r => (
                                    <div 
                                        key={r.id}
                                        className={`${styles.dropdownItem} ${selectedRegionId === r.id ? styles.dropdownItemActive : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedRegionId(r.id);
                                            setRegionOpen(false);
                                        }}
                                    >
                                        {r.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>{dict.cases.filters.solutionsLabel || 'Solutions'}</label>
                    <div 
                        className={`${styles.selectBox} ${solutionOpen ? styles.dropdownActive : ''}`}
                        onClick={() => {
                            setSolutionOpen(!solutionOpen);
                            setRegionOpen(false);
                        }}
                    >
                        {SOLUTION_CATEGORIES.find(s => s.id === selectedSolution)?.name}

                        {solutionOpen && (
                            <div className={styles.dropdownList}>
                                {SOLUTION_CATEGORIES.map(s => (
                                    <div 
                                        key={s.id}
                                        className={`${styles.dropdownItem} ${selectedSolution === s.id ? styles.dropdownItemActive : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedSolution(s.id);
                                            setSolutionOpen(false);
                                        }}
                                    >
                                        {s.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {dict.cases.confidentialityNote && (
                <div className={styles.confidentialityNote}>
                    {dict.cases.confidentialityNote}
                </div>
            )}

            <div id="case-grid-top" className={styles.listContainer}>
                {filteredCases.length > 0 ? (
                    <>
                        <div className={styles.grid}>
                            {filteredCases.map((item) => {
                                const caseTitle = item[`title_${locale}`] || item.title_en;
                                return (
                                    <Link prefetch={false} href={localePath(locale, `/cases/${item.handle}`)} key={item.handle} className={styles.card}>
                                        <div className={styles.imageBox} style={{ position: 'relative', width: '100%', paddingTop: '75%', overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
                                            <Image src={withStaticAssetVersion(item.main_image || '/images/solutions/placeholder.jpg')} alt={caseTitle} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
                                        </div>
                                        <div className={styles.cardContent}>
                                            <h3>{caseTitle}</h3>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>...</div>
                        <p>{dict.cases.noResults || 'No cases found matching your selection.'}</p>
                    </div>
                )}
            </div>

            <MobileInquiryForm dict={dict} />
        </div>
    ));
}
