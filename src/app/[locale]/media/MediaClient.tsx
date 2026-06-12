'use client';
import React from 'react';
import MobileMediaCenter from '@/components/mobile/MobileMediaCenter';
import InquiryForm from '@/components/products/InquiryForm';
import Link from 'next/link';
import Image from 'next/image';
import { localePath } from '@/lib/localePath';
import { getLocalizedMediaDate, getLocalizedMediaTitle } from '@/lib/mediaDisplay';
import { getSeoKeywordTarget } from '@/lib/seoKeywordTargets';

export default function MediaClient({ 
    newsData,
    locale,
    dict
}: { 
    newsData: any[],
    locale: string,
    dict: any
}) {
    const [activeCategory, setActiveCategory] = React.useState('all');
    const [currentPage, setCurrentPage] = React.useState(1);
    const pageSize = 6;
    const seoTarget = getSeoKeywordTarget({
        route: '/media',
        title: dict.media.bannerTitle,
        pageKind: 'media',
        locale,
    });
    const bannerTitle = seoTarget.h1 || dict.media.bannerTitle;

    const categoryTitles: Record<string, string> = {
        'all': dict.media.categories.latest,
        'corporate': dict.media.categories.corporate,
        'product': dict.media.categories.product,
        'industry': dict.media.categories.industry
    };

    const filteredNews = newsData.filter(n => activeCategory === 'all' || n.category === activeCategory);
    
    React.useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory]);

    const totalPages = Math.ceil(filteredNews.length / pageSize);
    const paginatedNews = filteredNews.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
                <div className="media-page" style={{ paddingTop: '112px', backgroundColor: '#fff' }}>
                    <section className="product-banner" style={{ 
                        height: '40vh',
                        minHeight: '320px',
                        maxHeight: '450px', 
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        borderBottom: '1px solid #e1e8f0'
                    }}>
                        <Image
                            src="/media/news-center-expo-banner.webp"
                            fill
                            style={{ objectFit: 'cover', objectPosition: 'center' }}
                            priority
                            alt={bannerTitle}
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(2, 10, 24, 0.82) 0%, rgba(13, 36, 75, 0.58) 42%, rgba(49, 91, 164, 0.12) 72%, rgba(1, 8, 18, 0.18) 100%)', zIndex: 1 }}></div>
                        
                        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ maxWidth: '700px', textShadow: '0 10px 28px rgba(0, 0, 0, 0.34)' }}>
                                <h1 style={{ fontSize: '5.2rem', fontWeight: 900, color: '#fff', marginBottom: '15px', lineHeight: 1.1 }}>{bannerTitle}</h1>
                                <p style={{ fontSize: '2rem', color: '#fff', lineHeight: 1.5, opacity: 0.95 }}>{dict.media.bannerSubtitle}</p>
                            </div>
                        </div>
                    </section>

                    <div className="sticky-nav">
                        <div className="container">
                            <ul className="nav-list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                                {[
                                    { id: 'all', label: dict.media.categories.latest },
                                    { id: 'corporate', label: dict.media.categories.corporate },
                                    { id: 'product', label: dict.media.categories.product },
                                    { id: 'industry', label: dict.media.categories.industry }
                                ].map((cat) => (
                                    <li 
                                        key={cat.id} 
                                        className={`nav-link-item ${activeCategory === cat.id ? 'active' : ''}`}
                                        onClick={() => setActiveCategory(cat.id)}
                                    >
                                        {cat.label}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <section style={{ padding: '48px 0 80px' }}>
                        <div className="container">
                            <div className="category-heading-wrap" style={{ 
                                marginBottom: '60px', 
                                textAlign: 'center',
                                position: 'relative'
                            }}>
                                <h2 style={{ 
                                    fontSize: '4.2rem', 
                                    fontWeight: 800, 
                                    color: '#333', 
                                    textTransform: 'uppercase', 
                                    margin: '0 auto 15px', 
                                    letterSpacing: '2px',
                                    display: 'inline-block',
                                    position: 'relative'
                                }}>
                                    {categoryTitles[activeCategory]}
                                    <div style={{ 
                                        width: '60px', 
                                        height: '4px', 
                                        background: '#315ba4', 
                                        margin: '15px auto 0' 
                                    }}></div>
                                </h2>
                                <div style={{ fontSize: '1.4rem', color: '#888', fontWeight: 500, marginTop: '10px' }}>
                                    {filteredNews.length} {dict.media.updatesFound || 'updates found'}
                                </div>
                            </div>

                            <div className="news-grid" style={{ 
                                display: 'grid', 
                                gridTemplateColumns: 'repeat(2, 1fr)', 
                                gap: '40px' 
                            }}>
                                {paginatedNews.map((news) => {
                                    const newsTitle = getLocalizedMediaTitle(news, locale);
                                    const newsDate = getLocalizedMediaDate(news.date, locale);
                                    return (
                                        <Link prefetch={false} href={localePath(locale, `/media/${news.id}`)} key={news.id} className="news-card-group" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                                            <div className="news-image-wrapper" style={{ 
                                                height: '350px', 
                                                overflow: 'hidden', 
                                                position: 'relative',
                                                marginBottom: '0' 
                                            }}>
                                                <Image 
                                                    src={news.image} 
                                                    alt={newsTitle} 
                                                    fill 
                                                    style={{ 
                                                        objectFit: 'cover',
                                                        transition: 'transform 0.5s ease'
                                                    }} 
                                                    className="card-img" 
                                                    sizes="(max-width: 1200px) 50vw, 600px"
                                                />
                                            </div>
                                            <div className="news-text-content" style={{ 
                                                padding: '30px', 
                                                border: '1px solid #eee', 
                                                borderTop: 'none', 
                                                backgroundColor: '#fcfcfc',
                                                transition: 'all 0.3s ease'
                                            }}>
                                                <div className="news-date" style={{ 
                                                    fontSize: '1.4rem', 
                                                    color: '#315ba4', 
                                                    fontWeight: 600, 
                                                    marginBottom: '15px' 
                                                }}>{newsDate}</div>
                                                <h3 style={{ 
                                                    fontSize: '2.2rem', 
                                                    fontWeight: 700, 
                                                    color: '#333', 
                                                    lineHeight: '1.4',
                                                    margin: 0
                                                }}>{newsTitle}</h3>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>

                            {totalPages >= 1 && (
                                <div className="pagination-wrapper" style={{ 
                                    marginTop: '80px', 
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
                        </div>
                    </section>

                    {/* INQUIRY FORM */}
                    <section id="inquiry" style={{ padding: '100px 0', background: '#f8f9fa', borderTop: '1px solid #eee' }}>
                        <div className="container" style={{ maxWidth: '1200px' }}>
                            <InquiryForm dict={dict} />
                        </div>
                    </section>
                </div>
            </div>

            <div className="mobile_only">
                <MobileMediaCenter newsData={newsData} locale={locale} dict={dict} />
            </div>

            <style jsx>{`
                .pc_only .news-card-group {
                    transition: all 0.3s ease;
                }
                .pc_only .news-card-group:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
                }
                .pc_only .news-card-group:hover .news-text-content {
                    background-color: #315ba4 !important;
                    border-color: #315ba4 !important;
                }
                .pc_only .news-card-group:hover h3, .pc_only .news-card-group:hover .news-date {
                    color: #fff !important;
                }
                .pc_only .news-card-group:hover .card-img {
                    transform: scale(1.08);
                }
            `}</style>
        </>
    );
}

