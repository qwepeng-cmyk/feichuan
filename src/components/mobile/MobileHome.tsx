'use client';

import React from 'react';
import { products, solutions, homeCases } from '@/constants/homeData';
import NEWS_DATA from '../../../public/media/news_data.json';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const MobileCases = dynamic(() => import('../home/sections/MobileCases'), {
    ssr: true,
    loading: () => <div style={{ minHeight: '800px', background: '#f8f9fa', margin: '20px 15px' }} />
});
const MobileNews = dynamic(() => import('../home/sections/MobileNews'), {
    ssr: true,
    loading: () => <div style={{ minHeight: '350px', background: '#f8f9fa', margin: '20px 0' }} />
});

export default function MobileHome({ 
    locale,
    dict
}: { 
    locale: string,
    dict: any
}) {
    const latestNews = NEWS_DATA.slice(0, 5);

    return (
        <main style={{ 
            overflowX: 'hidden', 
            width: '100%',
            paddingTop: '108px',
            background: '#fff'
        }}>
            {/* 1. Banner */}
            <section style={{ 
                position: 'relative', 
                width: '100%', 
                aspectRatio: '16/9', 
                background: '#000',
                overflow: 'hidden'
            }}>
                <video 
                    src="/index_banner_bg_1.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                ></video>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '0 20px',
                    color: '#ffffff'
                }}>
                    <h1 style={{ 
                        fontSize: '18px', 
                        fontWeight: 700, 
                        marginBottom: '15px',
                        lineHeight: '1.4',
                        color: '#ffffff',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                    }} dangerouslySetInnerHTML={{ __html: dict.home.hero.title }}>
                    </h1>
                    <Link href={`/${locale}/solutions`} style={{
                        display: 'inline-block',
                        background: '#ff9800',
                        color: '#fff',
                        padding: '10px 20px',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        fontSize: '13px',
                        fontWeight: 700,
                        width: 'fit-content'
                    }}>{dict.home.hero.button} ↗</Link>
                </div>
            </section>

            {/* 2. Solutions */}
            <section style={{ padding: '40px 0' }}>
                <h2 style={{ fontSize: '24px', padding: '0 20px', marginBottom: '20px', color: '#003f98', fontWeight: 800 }}>{dict.home.sections.solutions}</h2>
                <div style={{ 
                    display: 'flex', 
                    overflowX: 'auto', 
                    padding: '0 20px',
                    gap: '12px',
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none'
                }} className="no-scrollbar">
                    {solutions.map(sol => {
                        const solMap: Record<string, string> = {
                            '01_BorderPatrol': dict.solutions.categories.border,
                            '02_InfrastructureProtection': dict.solutions.categories.infrastructure,
                            '03_KeyAreaSecurity': dict.solutions.categories.security,
                            '04_EmergencyRescue': dict.solutions.categories.emergency
                        };
                        const solName = solMap[sol.id] || sol.title;

                        return (
                            <Link key={sol.id} href={`/${locale}${sol.link}`} style={{
                                flex: '0 0 42%',
                                position: 'relative',
                                aspectRatio: '0.79 / 1',
                                overflow: 'hidden',
                                display: 'block',
                                background: '#eee'
                            }}>
                                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                                    <Image 
                                        src={sol.img} 
                                        alt={solName} 
                                        fill 
                                        style={{ objectFit: 'cover' }}
                                        sizes="42vw"
                                    />
                                </div>
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    padding: '10px'
                                }}>
                                    <h3 style={{ color: '#fff', fontSize: '12px', fontWeight: 600, margin: 0, lineHeight: '1.2', textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>{solName}</h3>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div style={{ padding: '30px 20px 0' }}>
                    <Link href={`/${locale}/solutions`} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#315ba4',
                        color: '#fff',
                        height: '48px',
                        borderRadius: '24px',
                        fontSize: '16px',
                        fontWeight: 700,
                        textDecoration: 'none'
                    }}>
                        {dict.home.buttons.learnMore}
                    </Link>
                </div>
            </section>

            {/* 3. Product Center */}
            <section style={{ padding: '40px 15px', background: '#f2f6ff' }}>
                <h2 style={{ fontSize: '24px', marginBottom: '25px', color: '#003f98', fontWeight: 800 }}>{dict.home.sections.products}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    {products.slice(0, 6).map((item, idx) => {
                        const productTitle = locale === 'ru' ? item.main_ru : item.main;
                        return (
                            <Link key={idx} href={`/${locale}/products/${item.handle}`} style={{ 
                                background: '#fff', 
                                border: '1px solid #f0f0f0',
                                textDecoration: 'none',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <div style={{ 
                                    aspectRatio: '4 / 3', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    overflow: 'hidden',
                                    padding: '15px',
                                    position: 'relative'
                                }}>
                                    <Image 
                                        src={item.img} 
                                        alt={productTitle} 
                                        fill 
                                        style={{ objectFit: 'contain', padding: '15px' }}
                                        sizes="45vw"
                                    />
                                </div>
                                <div style={{ padding: '12px', textAlign: 'center' }}>
                                    <h3 style={{ 
                                        fontSize: '12px', 
                                        fontWeight: 800, 
                                        color: '#333', 
                                        lineHeight: '1.4',
                                        margin: 0,
                                        height: '34px',
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical'
                                    }}>{productTitle}</h3>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div style={{ padding: '30px 0 0' }}>
                    <Link href={`/${locale}/products`} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#315ba4',
                        color: '#fff',
                        height: '48px',
                        borderRadius: '24px',
                        fontSize: '16px',
                        fontWeight: 700,
                        textDecoration: 'none'
                    }}>
                        {dict.home.buttons.allProducts}
                    </Link>
                </div>
            </section>

            {/* 4. Customer Cases (DYNAMIC) */}
            <MobileCases locale={locale} dict={dict} homeCases={homeCases} />

            {/* 5. About Us */}
            <section style={{ 
                background: 'url(/index/about_bg.webp) center/cover',
                padding: '60px 20px',
                color: '#fff',
                textAlign: 'center'
            }}>
                <div style={{ background: 'rgba(0,0,0,0.6)', padding: '40px 20px' }}>
                    <h2 style={{ fontSize: '28px', marginBottom: '15px', color: '#ffffff', fontWeight: 900, textTransform: 'uppercase' }}>{dict.home.sections.about}</h2>
                    <p style={{ fontSize: '16px', lineHeight: '1.6', opacity: 0.9 }}>
                        {dict.home.about.content}
                    </p>
                </div>
            </section>

            {/* 6. Media (DYNAMIC) */}
            <MobileNews locale={locale} dict={dict} latestNews={latestNews} />

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </main>
    );
}

