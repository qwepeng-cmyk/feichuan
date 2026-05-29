import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { localePath } from '@/lib/localePath';
import { getLocalizedMediaDate, getLocalizedMediaTitle } from '@/lib/mediaDisplay';

interface HomeNewsProps {
    locale: string;
    dict: any;
    latestNews: any[];
}

export default function HomeNews({ locale, dict, latestNews }: HomeNewsProps) {
    return (
        <section className="section-news" style={{ padding: '60px 0 100px', background: '#fff', minHeight: '500px' }}>
            <div className="container-wide">
                <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '3.6rem', fontWeight: 600, color: '#333', letterSpacing: '2px', textTransform: 'uppercase' }}>{dict.home.sections.news}</h2>
                </div>
                <div className="news-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
                    {latestNews.map((item, i) => {
                        const localizedNewsTitle = getLocalizedMediaTitle(item, locale);
                        const localizedDate = getLocalizedMediaDate(item.date, locale);
                        return (
                            <Link key={i} href={localePath(locale, `/media/${item.id}`)} className="news-card" style={{
                                background: '#f8f8f8',
                                border: '1px solid #eee',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                textDecoration: 'none',
                                display: 'block'
                            }}>
                                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                                    <Image 
                                        src={item.image} 
                                        alt={localizedNewsTitle} 
                                        fill 
                                        style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                                        sizes="(max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                                <div className="news-card-content" style={{ padding: '25px', transition: 'background-color 0.3s ease' }}>
                                    <h3 style={{
                                        fontSize: '1.8rem',
                                        color: '#333',
                                        marginBottom: '15px',
                                        lineHeight: 1.4,
                                        fontWeight: 600,
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        transition: 'color 0.3s ease'
                                    }}>{localizedNewsTitle}</h3>
                                    <p style={{ color: '#999', fontSize: '1.4rem', transition: 'color 0.3s ease' }}>{localizedDate}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div style={{ textAlign: 'center', marginTop: '60px' }}>
                    <Link href={localePath(locale, '/media')} className="btn btn-orange" style={{ padding: '15px 40px' }}>{dict.home.buttons.viewAllNews}</Link>
                </div>
            </div>
            <style jsx>{`
                .news-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
                    border-color: var(--primary) !important;
                }
                .news-card:hover .news-card-content {
                    background-color: var(--primary) !important;
                }
                .news-card:hover :global(img) {
                    transform: scale(1.1);
                }
                .news-card:hover h3, .news-card:hover p {
                    color: #fff !important;
                }
            `}</style>
        </section>
    );
}
