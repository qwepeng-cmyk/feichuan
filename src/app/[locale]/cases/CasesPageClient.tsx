'use client';

import React, { useState, useMemo, useEffect } from 'react';
import MobileCaseCenter from '@/components/mobile/MobileCaseCenter';
import InquiryForm from '@/components/products/InquiryForm';
import Link from 'next/link';
import Image from 'next/image';
import { localePath } from '@/lib/localePath';
import { caseSolutionGroups, getCaseSolutionGroupId } from '@/lib/caseSolutionGroups';
import { withStaticAssetVersion } from '@/lib/assetVersion';
import { buildKeywordIntro, getSeoKeywordTarget } from '@/lib/seoKeywordTargets';

interface CaseItem {
    handle: string;
    title_en: string;
    main_image: string;
    region_en?: string;
    country_en?: string;
    solution_category_id?: string;
    [key: string]: any;
}

export default function CasesPageClient({ 
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
    const pageSize = 9;
    const seoTarget = getSeoKeywordTarget({
        route: '/cases',
        title: dict.cases.bannerTitle,
        pageKind: 'case_list',
        locale,
    });
    const bannerTitle = seoTarget.h1 || dict.cases.bannerTitle;
    const seoIntroTitle = seoTarget.overviewHeading || dict.cases.seoIntroTitle;
    const seoIntroBody = buildKeywordIntro(seoTarget, dict.cases.bannerTitle, locale) || dict.cases.seoIntroBody;

    const SOLUTION_CATEGORIES = [
        { id: 'all', name: dict.cases.filters.all },
        ...caseSolutionGroups.map((group) => ({
            id: group.id,
            name: dict?.solutionCenterGroups?.[group.labelKey] || group.fallbackLabel
        }))
    ];

    const REGIONS = [
        { id: 'all', name: dict.cases.filters.all },
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
            const matchesSolution = selectedSolution === 'all' || getCaseSolutionGroupId(item) === selectedSolution;

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

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedSolution, selectedRegionId]);

    const totalPages = Math.ceil(filteredCases.length / pageSize);
    const paginatedCases = filteredCases.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const renderRadioFilter = (
        label: string,
        items: { id: string, name: string }[],
        currentId: string,
        onSelect: (id: string) => void
    ) => (
        <div className="filter-row" style={{
            marginBottom: label === dict.cases.filters.regionLabel ? '25px' : '0',
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
        }}>
            <span style={{
                fontSize: '1.7rem',
                fontWeight: '800',
                color: '#333',
                minWidth: '90px'
            }}>{label}</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', alignItems: 'center' }}>
                {items.map(item => {
                    const isActive = currentId === item.id;
                    return (
                        <div
                            key={item.id}
                            onClick={() => onSelect(item.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                marginRight: '25px',
                                userSelect: 'none'
                            }}
                        >
                            {item.id === 'all' ? (
                                <button
                                    style={{
                                        padding: '5px 20px',
                                        backgroundColor: isActive ? '#315ba4' : '#fff',
                                        color: isActive ? '#fff' : '#333',
                                        border: isActive ? 'none' : '1px solid #dcdcdc',
                                        borderRadius: '4px',
                                        fontSize: '1.5rem',
                                        fontWeight: '800',
                                        cursor: 'pointer',
                                        marginRight: '15px',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {dict.cases.filters.all}
                                </button>
                            ) : (
                                <>
                                    <div style={{
                                        width: '18px',
                                        height: '18px',
                                        borderRadius: '50%',
                                        border: '1.5px solid #ccc',
                                        marginRight: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#fff',
                                        transition: 'all 0.2s'
                                    }}>
                                        {isActive && (
                                            <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#315ba4' }}></div>
                                        )}
                                    </div>
                                    <span style={{
                                        fontSize: '1.6rem',
                                        color: isActive ? '#315ba4' : '#666',
                                        fontWeight: isActive ? '700' : '600',
                                        whiteSpace: 'nowrap',
                                        transition: 'all 0.2s'
                                    }}>
                                        {item.name}
                                    </span>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                .mobile_only { display: none !important; }
                .pc_only { display: block !important; }
                @media (max-width: 991px) {
                    .mobile_only { display: block !important; }
                    .pc_only { display: none !important; }
                }
                .listing-seo-intro {
                    padding: 46px 0 8px;
                    background: #fff;
                }
                .listing-seo-intro-inner {
                    max-width: 920px;
                    margin: 0 auto;
                    text-align: center;
                }
                .listing-seo-intro h2 {
                    color: #1f2937;
                    font-size: 3.2rem;
                    font-weight: 850;
                    line-height: 1.2;
                    margin: 0 0 16px;
                }
                .listing-seo-intro p {
                    color: #4b5563;
                    font-size: 1.8rem;
                    line-height: 1.7;
                    margin: 0;
                }
            `}} />

            <div className="pc_only product-page-new" style={{ paddingTop: '112px' }}>
                <section className="product-banner" style={{
                    height: '400px',
                    minHeight: '400px',
                    maxHeight: '400px',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Image src={withStaticAssetVersion('/cases/case_banner_center_collage_v2.webp')} fill style={{ objectFit: 'cover', objectPosition: 'center' }} priority alt={bannerTitle} />
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1 }}></div>
                    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ maxWidth: '800px' }}>
                            <h1 style={{ fontSize: '5.2rem', fontWeight: 900, color: '#fff', marginBottom: '15px', lineHeight: 1.1 }}>{bannerTitle}</h1>
                            <p style={{ fontSize: '2rem', color: '#fff', lineHeight: 1.5, opacity: 0.95 }}>{dict.cases.bannerSubtitle}</p>
                        </div>
                    </div>
                </section>

                <div className="cases-page-client">
                    <section className="filter-bar" style={{
                        padding: '65px 0 40px 0',
                        backgroundColor: '#fff',
                        borderBottom: '1px solid #f0f3f7'
                    }}>
                        <div className="container">
                            <div className="filters-wrapper" style={{ maxWidth: '1240px', margin: '0 auto' }}>
                                {renderRadioFilter(dict.cases.filters.regionLabel, REGIONS, selectedRegionId, setSelectedRegionId)}
                                {renderRadioFilter(dict.cases.filters.solutionsLabel, SOLUTION_CATEGORIES, selectedSolution, setSelectedSolution)}
                            </div>
                        </div>
                    </section>

                    {seoIntroTitle && seoIntroBody && (
                        <section className="listing-seo-intro">
                            <div className="container">
                                <div className="listing-seo-intro-inner">
                                    <h2>{seoIntroTitle}</h2>
                                    <p>{seoIntroBody}</p>
                                </div>
                            </div>
                        </section>
                    )}

                    <div className="product-lists-wrap" style={{ padding: '48px 0 100px 0', backgroundColor: '#fcfdfe', minHeight: '600px' }}>
                        <div className="container">
                            {paginatedCases.length > 0 ? (
                                <>
                                    <div className="solution-grid" style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(3, 1fr)',
                                        gap: '40px'
                                    }}>
                                        {paginatedCases.map((item, idx) => {
                                            const caseTitle = item[`title_${locale}`] || item.title_en;
                                            return (
                                                <Link prefetch={false} href={localePath(locale, `/cases/${item.handle}`)} key={idx} className="catalog-card-item">
                                                    <div className="card-image" style={{ borderRadius: '0', overflow: 'hidden', position: 'relative', height: '240px' }}>
                                                        <Image
                                                            src={withStaticAssetVersion(item.main_image || '/images/solutions/placeholder.jpg')}
                                                            alt={caseTitle}
                                                            fill
                                                            style={{ objectFit: 'cover' }}
                                                            sizes="(max-width: 1200px) 33vw, 400px"
                                                            priority={currentPage === 1 && idx < 6}
                                                        />
                                                    </div>
                                                    <div className="card-content" style={{ padding: '25px', textAlign: 'center' }}>
                                                        <h3 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#333', margin: '0', lineHeight: '1.4' }}>
                                                            {caseTitle}
                                                        </h3>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>

                                    {totalPages >= 1 && (
                                        <div className="pagination-wrapper" style={{
                                            marginTop: '60px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            gap: '10px'
                                        }}>
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                                <div
                                                    key={p}
                                                    onClick={() => {
                                                        setCurrentPage(p);
                                                        window.scrollTo({ top: 300, behavior: 'smooth' });
                                                    }}
                                                    style={{
                                                        width: '45px',
                                                        height: '45px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        border: '1px solid #ddd',
                                                        fontSize: '1.6rem',
                                                        fontWeight: 600,
                                                        color: p === currentPage ? '#fff' : '#444',
                                                        backgroundColor: p === currentPage ? '#315ba4' : 'transparent',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s'
                                                    }}
                                                >
                                                    {p}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '120px 0', background: '#fff', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '5rem', marginBottom: '20px', opacity: 0.2 }}>...</div>
                                    <div style={{ fontSize: '1.8rem', color: '#999' }}>{dict.cases.noResults || 'No cases found matching your criteria.'}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* INQUIRY FORM */}
                <section id="inquiry" style={{ padding: '100px 0', background: '#f8f9fa', borderTop: '1px solid #eee' }}>
                    <div className="container" style={{ maxWidth: '1200px' }}>
                        <InquiryForm dict={dict} />
                    </div>
                </section>
            </div>

            <div className="mobile_only">
                <MobileCaseCenter allCases={allCases} locale={locale} dict={dict} />
            </div>
        </>
    );
}
