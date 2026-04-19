'use client';
import React from 'react';
import InquiryForm from '@/components/products/InquiryForm';

// Mock news catalog for matching
const MOCK_NEWS = [
    {
        id: 1,
        category: 'corporate',
        title: 'N-TET Signed Strategic Partnership for Border Security Equipment Supply',
        date: 'Oct 24, 2024',
        summary: 'In a significant move to enhance regional security, N-TET has entered into a strategic partnership with global defense agencies to provide advanced UAV and anti-drone surveillance systems.',
        content: `
            <p>Our commitment to global security has reached a new milestone. The agreement signed this week paves the way for a comprehensive deployment of long-range reconnaissance drones and signal jamming stations across critical border lines.</p>
            <img src="https://images.unsplash.com/photo-1454165833767-02654ef5c121?auto=format&fit=crop&q=80&w=1200" alt="Signing Ceremony" style="width:100%; margin: 30px 0;" />
            <p>The joint initiative focuses on "Total Tactical Advantage" — a multi-layered approach that integrates AI-driven analytics with rugged hardware capable of operating in extreme environments from -30°C to +55°C.</p>
            <h3>Technological Sophistication</h3>
            <p>The systems provided include the newly developed Sentinel-4 UAVs, which offer a flight endurance of over 10 hours and encrypted data transmission links secure against sophisticated cyber threats. By deploying these systems, local enforcement can achieve a 24/7 "Eye in the Sky" capability, significantly reducing illegal incursions.</p>
            <p>As part of the package, N-TET will also provide full training and 3-year on-site operational support to ensure the highest level of mission success.</p>
        `
    }
];

export default function NewsDetailPage({ params }: { params: { id: string } }) {
    // Dynamically find news based on the ID in the URL
    const newsId = parseInt(params.id);
    const news = MOCK_NEWS.find(n => n.id === newsId) || MOCK_NEWS[0]; // Fallback to first if not found

    if (!news) {
        return <div style={{ padding: '200px', textAlign: 'center', fontSize: '2rem' }}>News Article Not Found.</div>;
    }

    return (
        <div className="news-detail-page" style={{ paddingTop: '114px', backgroundColor: '#fff' }}>
            {/* 1. Breadcrumb Row (Shared Global Class) */}
            <div className="product-breadcrumb-nav">
                <div className="container">
                    <div className="breadcrumb-path">
                        <a href="/">Home</a> &gt; <a href="/media">Media Center</a> &gt; News Detail
                    </div>
                </div>
            </div>

            {/* 2. Banner Section */}
            <section className="internal-banner" style={{ 
                height: '30vh', 
                minHeight: '240px', 
                background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920") no-repeat center/cover',
                display: 'flex',
                alignItems: 'center',
                color: '#fff'
            }}>
                <div className="container">
                    <h2 style={{ fontSize: '3.6rem', fontWeight: 800, textTransform: 'uppercase' }}>Insights & Feed</h2>
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

                    {/* Summary Block */}
                    <div style={{ 
                        padding: '30px', 
                        background: '#f4f7fa', 
                        borderLeft: '5px solid #315ba4', 
                        marginBottom: '50px',
                        fontSize: '1.8rem',
                        lineHeight: '1.7',
                        color: '#555',
                        fontStyle: 'italic'
                    }}>
                        {news.summary}
                    </div>

                    {/* Rich Content Area */}
                    <div className="news-rich-content" dangerouslySetInnerHTML={{ __html: news.content }} style={{
                        fontSize: '1.8rem',
                        lineHeight: '1.8',
                        color: '#444'
                    }}>
                        {/* Styles for content injected via dangerouslySetInnerHTML */}
                    </div>
                </div>
            </article>

            {/* 4. Global Inquiry Module */}
            <section style={{ padding: '100px 0', backgroundColor: '#f9f9f9', borderTop: '1px solid #eee' }}>
                <div className="container" style={{ maxWidth: '1200px' }}>
                    <InquiryForm />
                </div>
            </section>

            {/* Styles for the rich content markup */}
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
        </div>
    );
}
