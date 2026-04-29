'use client';
import React from 'react';
import InquiryForm from '@/components/products/InquiryForm';
import MobileMediaDetail from '@/components/mobile/MobileMediaDetail';
import NEWS_DATA from '../../../../public/media/news_data.json';

export default function NewsDetailPage({ params }: { params: { id: string } }) {
    // Dynamically find news based on the ID in the URL
    const news = NEWS_DATA.find(n => n.id === params.id) || NEWS_DATA[0];

    if (!news) {
        return <div style={{ padding: '200px', textAlign: 'center', fontSize: '2rem' }}>News Article Not Found.</div>;
    }

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

            {/* PC VIEW */}
            <div className="pc_only">
                <div className="news-detail-page" style={{ paddingTop: '112px', backgroundColor: '#fff' }}>
                    {/* 1. Breadcrumb Row */}
                    <div className="product-breadcrumb-nav">
                        <div className="container">
                            <div className="breadcrumb-path">
                                <a href="/">Home</a> &gt; <a href="/media">Media Center</a> &gt; {news.title}
                            </div>
                        </div>
                    </div>

                    {/* 2. Banner Section */}
                    <section className="product-banner" style={{ 
                        height: '40vh',
                        minHeight: '320px',
                        maxHeight: '450px', 
                        backgroundImage: "url('/media/media_banner.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        borderBottom: '1px solid #e1e8f0'
                    }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', zIndex: 0 }}></div>
                        
                        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ maxWidth: '800px' }}>
                                <h1 style={{ fontSize: '5.2rem', fontWeight: 900, color: '#fff', marginBottom: '15px', lineHeight: 1.1 }}>Insights & Global Feed</h1>
                                <p style={{ fontSize: '2rem', color: '#fff', lineHeight: 1.5, opacity: 0.95 }}>Stay updated with the latest technological breakthroughs and industry analysis from N-TET.</p>
                            </div>
                        </div>
                    </section>

                    {/* 3. News Main Content */}
                    <article style={{ padding: '80px 0' }}>
                        <div className="container" style={{ maxWidth: '1200px' }}>
                            {/* Title & Meta */}
                            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                                <h1 style={{ fontSize: '4.8rem', fontWeight: 900, color: '#333', lineHeight: '1.2', marginBottom: '30px' }}>{news.title}</h1>
                                <div style={{ fontSize: '1.8rem', color: '#666', fontWeight: 500 }}>Published on: {news.date}</div>
                            </div>

                            {/* Featured Image */}
                            <div style={{ marginBottom: '50px' }}>
                                <img src={news.image} alt={news.title} style={{ width: '100%', maxHeight: '600px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }} />
                            </div>

                            {/* Rich Content Area */}
                            <div className="news-rich-content" style={{
                                fontSize: '1.8rem',
                                lineHeight: '1.8',
                                color: '#444'
                            }}>
                                <p>{news.content}</p>
                            </div>
                        </div>
                    </article>

                    {/* 4. Global Inquiry Module */}
                    <section style={{ padding: '100px 0', backgroundColor: '#f9f9f9', borderTop: '1px solid #eee' }}>
                        <div className="container" style={{ maxWidth: '1200px' }}>
                            <InquiryForm />
                        </div>
                    </section>
                </div>
            </div>

            {/* MOBILE VIEW */}
            <div className="mobile_only">
                <MobileMediaDetail news={news} />
            </div>

            <style jsx global>{`
                .news-rich-content p { margin-bottom: 25px; }
                .news-rich-content h3 { 
                    font-size: 2.8rem; 
                    font-weight: 800; 
                    color: #333; 
                    margin: 40px 0 20px; 
                }
                .news-rich-content img { border-radius: 4px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
            `}</style>
        </>
    );
}
