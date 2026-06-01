import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { localePath } from '@/lib/localePath';
import { getLocalizedMediaDate, getLocalizedMediaTitle } from '@/lib/mediaDisplay';
import { withStaticAssetVersion } from '@/lib/assetVersion';

interface MobileNewsProps {
    locale: string;
    dict: any;
    latestNews: any[];
}

export default function MobileNews({ locale, dict, latestNews }: MobileNewsProps) {
    return (
        <section style={{ padding: '40px 0', background: '#f8f9fa', minHeight: '350px' }}>
            <h2 style={{ fontSize: '24px', padding: '0 20px', marginBottom: '20px', color: '#003f98', fontWeight: 800 }}>{dict.home.sections.news}</h2>
            <div style={{ 
                display: 'flex', 
                overflowX: 'auto', 
                padding: '0 20px',
                gap: '15px',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none'
            }} className="no-scrollbar">
                {latestNews.map((news: any, idx: number) => {
                    const newsTitle = getLocalizedMediaTitle(news, locale);
                    const newsDate = getLocalizedMediaDate(news.date, locale);
                    return (
                        <Link key={idx} href={localePath(locale, `/media/${news.id}`)} style={{
                            flex: '0 0 75%',
                            background: '#fff',
                            overflow: 'hidden',
                            display: 'block',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                        }}>
                            <div style={{ aspectRatio: '1.6 / 1', overflow: 'hidden', position: 'relative' }}>
                                <Image 
                                    src={withStaticAssetVersion(news.image)} 
                                    alt={newsTitle} 
                                    fill 
                                    style={{ objectFit: 'cover' }}
                                    sizes="75vw"
                                />
                            </div>
                            <div style={{ padding: '15px' }}>
                                <h3 style={{ fontSize: '14px', color: '#333', fontWeight: 700, marginBottom: '8px', height: '36px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{newsTitle}</h3>
                                <span style={{ fontSize: '12px', color: '#666' }}>{newsDate}</span>
                            </div>
                        </Link>
                    );
                })}
            </div>
            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}
