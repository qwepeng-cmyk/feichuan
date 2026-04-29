'use client';

import React, { useState, useMemo, useEffect } from 'react';
import MobileCaseCenter from '@/components/mobile/MobileCaseCenter';

interface CaseItem {
    handle: string;
    title_en: string;
    main_image: string;
    region_en?: string;
    country_en?: string;
    solution_category_id?: string;
}

const SOLUTION_CATEGORIES = [
    { id: 'all', name: 'All' },
    { id: '01_BorderPatrol', name: 'Border Patrol' },
    { id: '02_InfrastructureProtection', name: 'Infrastructure Protection' },
    { id: '03_KeyAreaSecurity', name: 'Key Area Security' },
    { id: '04_EmergencyRescue', name: 'Emergency & Disaster Rescue' }
];

const REGIONS = [
    { id: 'all', name: 'All' },
    { id: 'china', name: 'China' },
    { id: 'Asia', name: 'Asia' },
    { id: 'Africa', name: 'Africa' },
    { id: 'North America', name: 'North America' },
    { id: 'South America', name: 'South America' },
    { id: 'Europe', name: 'Europe' },
    { id: 'Oceania', name: 'Oceania' }
];

export default function CasesPageClient({ allCases }: { allCases: CaseItem[] }) {
    const [selectedSolution, setSelectedSolution] = useState('all');
    const [selectedRegionId, setSelectedRegionId] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 9;

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
            marginBottom: label === 'Region:' ? '25px' : '0', 
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
                                    All
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
            <style dangerouslySetInnerHTML={{ __html: `
                .mobile_only { display: none !important; }
                .pc_only { display: block !important; }
                @media (max-width: 991px) {
                    .mobile_only { display: block !important; }
                    .pc_only { display: none !important; }
                }
            `}} />

            <div className="pc_only">
                {/* 1. HERO BANNER (PC ONLY) */}
                <section className="product-banner" style={{
                    height: '40vh',
                    minHeight: '320px',
                    maxHeight: '450px',
                    backgroundImage: "url('/cases/case_banner_final_副本2.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    margin: 0,
                    border: 'none'
                }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', zIndex: 0 }}></div>
                    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ maxWidth: '800px' }}>
                            <h1 style={{ fontSize: '5.2rem', fontWeight: 900, color: '#fff', marginBottom: '15px', lineHeight: 1.1 }}>Global Case Center</h1>
                            <p style={{ fontSize: '2rem', color: '#fff', lineHeight: 1.5, opacity: 0.95 }}>A global track record of mission success across border patrol, critical facility protection, and emergency rescue operations.</p>
                        </div>
                    </div>
                </section>

                <div className="cases-page-client">
                    {/* Filter Section */}
                    <section className="filter-bar" style={{ 
                        padding: '65px 0 40px 0', 
                        backgroundColor: '#fff', 
                        borderBottom: '1px solid #f0f3f7'
                    }}>
                        <div className="container">
                            <div className="filters-wrapper" style={{ maxWidth: '1240px', margin: '0 auto' }}>
                                {renderRadioFilter('Region:', REGIONS, selectedRegionId, setSelectedRegionId)}
                                {renderRadioFilter('Solutions:', SOLUTION_CATEGORIES, selectedSolution, setSelectedSolution)}
                            </div>
                        </div>
                    </section>

                    {/* Cases Grid */}
                    <div className="product-lists-wrap" style={{ padding: '25px 0 100px 0', backgroundColor: '#fcfdfe', minHeight: '600px' }}>
                        <div className="container">
                            {paginatedCases.length > 0 ? (
                                <>
                                    <div className="solution-grid" style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(3, 1fr)',
                                        gap: '40px'
                                    }}>
                                        {paginatedCases.map((item, idx) => (
                                            <a href={`/cases/${item.handle}`} key={idx} className="catalog-card-item">
                                                <div className="card-image" style={{ borderRadius: '0', overflow: 'hidden' }}>
                                                    <img src={item.main_image || '/images/solutions/placeholder.jpg'} alt={item.title_en} />
                                                </div>
                                                <div className="card-content" style={{ padding: '25px', textAlign: 'center' }}>
                                                    <h3 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#333', margin: '0', lineHeight: '1.4' }}>
                                                        {item.title_en}
                                                    </h3>
                                                </div>
                                            </a>
                                        ))}
                                    </div>

                                    {/* Dynamic Pagination */}
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
                                    <div style={{ fontSize: '5rem', marginBottom: '20px', opacity: 0.2 }}>🔍</div>
                                    <div style={{ fontSize: '1.8rem', color: '#999' }}>No cases found matching your criteria.</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mobile_only">
                <MobileCaseCenter allCases={allCases} />
            </div>
        </>
    );
}
