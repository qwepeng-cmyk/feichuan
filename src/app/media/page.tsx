'use client';
import React from 'react';

// Mock news data structure for development
const MOCK_NEWS = [
    {
        id: 1,
        category: 'corporate',
        title: 'N-TET Signed Strategic Partnership for Border Security Equipment Supply',
        date: 'Oct 24, 2024',
        image: 'https://images.unsplash.com/photo-1454165833767-02654ef5c121?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 2,
        category: 'product',
        title: 'Launch of Next-Generation Anti-Drone System with AI-Target Tracking',
        date: 'Oct 15, 2024',
        image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 3,
        category: 'industry',
        title: 'Low-Altitude Economy: New Opportunities in Civil UAV Market Regulation',
        date: 'Sep 28, 2024',
        image: 'https://images.unsplash.com/photo-1473960104372-7bc7ae212a10?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 4,
        category: 'corporate',
        title: 'Company Delegation Visit to the International Defense Electronics Exhibition',
        date: 'Sep 12, 2024',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 5,
        category: 'product',
        title: 'Technical Breakthrough: Long-Range Wireless Power for Tethered UAVs',
        date: 'Aug 30, 2024',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 6,
        category: 'industry',
        title: 'Global Trends in Infrastructure Protection Against Unauthorized Drone Incursions',
        date: 'Aug 18, 2024',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    }
];

export default function MediaPage() {
    // Current category state for filtering
    const [activeCategory, setActiveCategory] = React.useState('all');

    // Title mapping based on selected category
    const categoryTitles: Record<string, string> = {
        'all': 'N-TET NEWS',
        'corporate': 'Corporate News',
        'product': 'Product & Tech',
        'industry': 'Industry Insights'
    };

    return (
        <div className="media-page" style={{ paddingTop: '114px', backgroundColor: '#fff' }}>
            {/* 2. Banner Section ( Matches Design ) */}
            <section className="media-banner" style={{ 
                height: '40vh', 
                minHeight: '320px', 
                background: 'linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url("/media/media_banner.jpg") no-repeat center/cover',
                display: 'flex',
                alignItems: 'center',
                color: '#fff'
            }}>
                <div className="container">
                    <div style={{ maxWidth: '800px' }}>
                        <h1 style={{ fontSize: '5.2rem', fontWeight: 900, marginBottom: '20px', textTransform: 'uppercase', color: '#fff' }}>Insights & Global Feed</h1>
                        <p style={{ fontSize: '2rem', opacity: 1, color: '#fff' }}>Stay updated with the latest technological breakthroughs and industry analysis from N-TET.</p>
                    </div>
                </div>
            </section>

            {/* 3. Category Filter (Now 100% Shared Secondary Nav Style) */}
            <div className="sticky-nav">
                <div className="container">
                    <ul className="nav-list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                        {[
                            { id: 'all', label: 'Latest' },
                            { id: 'corporate', label: 'Corporate News' },
                            { id: 'product', label: 'Product & Tech' },
                            { id: 'industry', label: 'Industry Insights' }
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

            {/* 4. News List Section */}
            <section style={{ padding: '80px 0' }}>
                <div className="container">
                    {/* DYNAMIC HEADING AREA (CENTERED STYLE) */}
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
                            {MOCK_NEWS.filter(n => activeCategory === 'all' || n.category === activeCategory).length} updates found
                        </div>
                    </div>

                    <div className="news-grid" style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(2, 1fr)', 
                        gap: '40px' 
                    }}>
                        {MOCK_NEWS.filter(n => activeCategory === 'all' || n.category === activeCategory).map((news) => (
                            <a href={`/media/${news.id}`} key={news.id} className="news-card-group" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                                <div className="news-image-wrapper" style={{ 
                                    height: '350px', 
                                    overflow: 'hidden', 
                                    position: 'relative',
                                    marginBottom: '0' 
                                }}>
                                    <img src={news.image} alt={news.title} style={{ 
                                        width: '100%', 
                                        height: '100%', 
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s ease'
                                    }} className="card-img" />
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
                                    }}>{news.date}</div>
                                    <h3 style={{ 
                                        fontSize: '2.2rem', 
                                        fontWeight: 700, 
                                        color: '#333', 
                                        lineHeight: '1.4',
                                        margin: 0
                                    }}>{news.title}</h3>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* 5. Pagination */}
                    <div className="pagination-wrapper" style={{ 
                        marginTop: '80px', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        gap: '10px' 
                    }}>
                        {[1, 2, 3].map(p => (
                            <div key={p} style={{ 
                                width: '45px', 
                                height: '45px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                border: '1px solid #ddd', 
                                fontSize: '1.6rem',
                                fontWeight: 600,
                                color: p === 1 ? '#fff' : '#444',
                                backgroundColor: p === 1 ? '#315ba4' : 'transparent',
                                cursor: 'pointer'
                            }}>{p}</div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CSS for custom hover in Media page */}
            <style jsx>{`
                .news-card-group:hover .news-text-content {
                    background-color: #315ba4 !important;
                    border-color: #315ba4 !important;
                }
                .news-card-group:hover h3, .news-card-group:hover .news-date {
                    color: #fff !important;
                }
                .news-card-group:hover .card-img {
                    transform: scale(1.05);
                }
            `}</style>
        </div>
    );
}
