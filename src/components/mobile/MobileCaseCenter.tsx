'use client';

import React, { useState, useMemo, useEffect } from 'react';
import styles from './MobileCaseCenter.module.css';
import MobileInquiryForm from './MobileInquiryForm';
import Link from 'next/link';

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
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;
    const [regionOpen, setRegionOpen] = useState(false);
    const [solutionOpen, setSolutionOpen] = useState(false);

    const SOLUTION_CATEGORIES = [
        { id: 'all', name: dict.cases.filters.allSolutions || 'All Solutions' },
        { id: '01_BorderPatrol', name: dict.solutions.categories.border },
        { id: '02_InfrastructureProtection', name: dict.solutions.categories.infrastructure },
        { id: '03_KeyAreaSecurity', name: dict.solutions.categories.security },
        { id: '04_EmergencyRescue', name: dict.solutions.categories.emergency }
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

    const filteredCases = useMemo(() => {
        return allCases.filter(item => {
            const matchesSolution = selectedSolution === 'all' || item.solution_category_id === selectedSolution;
            
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
    }, [allCases, selectedSolution, selectedRegionId]);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedSolution, selectedRegionId]);

    const totalPages = Math.ceil(filteredCases.length / pageSize);
    const paginatedCases = filteredCases.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = (p: number) => {
        setCurrentPage(p);
        const element = document.getElementById('case-grid-top');
        if (element) {
            const offset = 190;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
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
                    <h1>{dict.cases.bannerTitle}</h1>
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

            <div id="case-grid-top" className={styles.listContainer}>
                {paginatedCases.length > 0 ? (
                    <>
                        <div className={styles.grid}>
                            {paginatedCases.map((item, idx) => {
                                const caseTitle = item[`title_${locale}`] || item.title_en;
                                return (
                                    <Link href={`/${locale}/cases/${item.handle}`} key={idx} className={styles.card}>
                                        <div className={styles.imageBox}>
                                            <img src={item.main_image || '/images/solutions/placeholder.jpg'} alt={caseTitle} />
                                        </div>
                                        <div className={styles.cardContent}>
                                            <h3>{caseTitle}</h3>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                        {totalPages > 1 && (
                            <div className={styles.pagination}>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                    <button 
                                        key={p} 
                                        className={`${styles.pageBtn} ${p === currentPage ? styles.active : ''}`}
                                        onClick={() => handlePageChange(p)}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>🔍</div>
                        <p>{dict.cases.noResults || 'No cases found matching your selection.'}</p>
                    </div>
                )}
            </div>

            <MobileInquiryForm dict={dict} />
        </div>
    );
}

