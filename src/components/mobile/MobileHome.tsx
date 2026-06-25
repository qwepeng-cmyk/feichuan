'use client';

import React from 'react';
import { products, homepageSolutions as solutions } from '@/constants/homeData';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { localePath } from '@/lib/localePath';
import { localizedField } from '@/lib/localization';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

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
    dict,
    latestNews,
    homeCases
}: { 
    locale: string,
    dict: any,
    latestNews: any[],
    homeCases: any[]
}) {
    const mobileSolutionsSectionRef = React.useRef<HTMLElement>(null);
    const mobileSolutionsRef = React.useRef<HTMLDivElement>(null);
    const [mobileSolutionProgress, setMobileSolutionProgress] = React.useState(0);

    const updateMobileSolutionProgress = () => {
        const track = mobileSolutionsRef.current;
        if (!track) return;
        const scrollable = track.scrollWidth - track.clientWidth;
        setMobileSolutionProgress(scrollable > 0 ? (track.scrollLeft / scrollable) * 100 : 0);
    };

    const scrollMobileSolutions = (direction: 'prev' | 'next') => {
        const track = mobileSolutionsRef.current;
        if (!track) return;
        track.scrollBy({ left: direction === 'next' ? track.clientWidth * 0.78 : -track.clientWidth * 0.78, behavior: 'smooth' });
    };

    React.useEffect(() => {
        const track = mobileSolutionsRef.current;
        if (!track) return;
        updateMobileSolutionProgress();
        window.addEventListener('resize', updateMobileSolutionProgress);
        return () => window.removeEventListener('resize', updateMobileSolutionProgress);
    }, []);

    React.useEffect(() => {
        const scrollToSolutionsHash = () => {
            if (window.location.hash !== '#solutions' || window.innerWidth > 991) return;
            mobileSolutionsSectionRef.current?.scrollIntoView({ block: 'start' });
        };

        scrollToSolutionsHash();
        window.requestAnimationFrame(scrollToSolutionsHash);
        const hashScrollTimer = window.setTimeout(scrollToSolutionsHash, 300);
        window.addEventListener('hashchange', scrollToSolutionsHash);
        return () => {
            window.clearTimeout(hashScrollTimer);
            window.removeEventListener('hashchange', scrollToSolutionsHash);
        };
    }, []);

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
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    preload="metadata"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', backgroundColor: '#000', filter: 'brightness(1.18) saturate(1.08)' }}
                >
                    <source src="/index_banner_bg_4.mp4" type="video/mp4" />
                </video>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, rgba(3, 10, 24, 0.34) 0%, rgba(3, 10, 24, 0.16) 52%, rgba(3, 10, 24, 0.08) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '0 20px',
                    color: '#ffffff'
                }}>
                    <div style={{ 
                        fontSize: '18px', 
                        fontWeight: 700, 
                        marginBottom: '15px',
                        lineHeight: '1.4',
                        color: '#ffffff',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                    }} dangerouslySetInnerHTML={{ __html: dict.home.hero.title }}>
                    </div>
                    <Link href={localePath(locale, '/solutions')} style={{
                        display: 'inline-block',
                        background: '#b65f00',
                        color: '#fff',
                        padding: '10px 20px',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        fontSize: '13px',
                        fontWeight: 700,
                        width: 'fit-content'
                    }}>{dict.home.hero.button}</Link>
                </div>
            </section>

            {/* 2. Solutions */}
            <section ref={mobileSolutionsSectionRef} style={{ padding: '26px 0 22px', background: '#f7f9fd' }}>
                <div style={{ padding: '0 18px', marginBottom: '12px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '21px', margin: 0, color: '#0f172a', fontWeight: 900, lineHeight: 1.15 }}>{dict.home.sections.solutions}</h2>
                </div>
                <div style={{ position: 'relative' }}>
                    <button type="button" aria-label="Previous solutions" onClick={() => scrollMobileSolutions('prev')} style={{
                        position: 'absolute',
                        left: '6px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 3,
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '1px solid rgba(255,255,255,0.7)',
                        background: 'rgba(255,255,255,0.86)',
                        color: '#315ba4',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 10px 24px rgba(15,23,42,0.18)'
                    }}><ChevronLeft size={18} /></button>
                    <button type="button" aria-label="Next solutions" onClick={() => scrollMobileSolutions('next')} style={{
                        position: 'absolute',
                        right: '6px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 3,
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '1px solid rgba(255,255,255,0.7)',
                        background: 'rgba(255,255,255,0.86)',
                        color: '#315ba4',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 10px 24px rgba(15,23,42,0.18)'
                    }}><ChevronRight size={18} /></button>
                    <div
                        ref={mobileSolutionsRef}
                        onScroll={updateMobileSolutionProgress}
                        style={{
                            display: 'flex',
                            overflowX: 'auto',
                            padding: '0 16px',
                            gap: '12px',
                            WebkitOverflowScrolling: 'touch',
                            scrollbarWidth: 'none'
                        }}
                        className="no-scrollbar"
                    >
                        {solutions.map((sol, idx) => {
                            const solName = localizedField(sol, 'title', locale);

                            return (
                                <Link key={sol.id} href={localePath(locale, sol.link)} style={{
                                    flex: '0 0 clamp(140px, 36vw, 220px)',
                                    position: 'relative',
                                    aspectRatio: '5 / 6',
                                    overflow: 'hidden',
                                    display: 'block',
                                    background: '#e8eef7',
                                    textDecoration: 'none',
                                    boxShadow: '0 16px 34px rgba(15, 23, 42, 0.12)'
                                }}>
                                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                                        <Image
                                            src={sol.mobileImg || sol.img}
                                            alt={solName}
                                            fill
                                            priority={idx === 0}
                                            style={{
                                                objectFit: 'cover',
                                                objectPosition: sol.objectPosition || '50% 50%',
                                                transform: `scale(${sol.imageScale || 1.02})`
                                            }}
                                            sizes="(max-width: 480px) 36vw, 220px"
                                        />
                                    </div>
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(180deg, rgba(3, 10, 24, 0.50) 0%, rgba(3, 10, 24, 0.20) 40%, rgba(3, 10, 24, 0.03) 100%)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        padding: '10px'
                                    }}>
                                        <div style={{ width: '100%' }}>
                                            <span style={{ color: '#f59e0b', fontSize: '11px', fontWeight: 900 }}>{String(idx + 1).padStart(2, '0')}</span>
                                            <h3 style={{ color: '#fff', fontSize: '13px', fontWeight: 900, margin: '4px 0 6px', lineHeight: '1.16', textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>{solName}</h3>
                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#fff', fontSize: '11px', fontWeight: 800 }}>
                                                {dict.solutions?.viewDetails || 'View Details'} <ArrowUpRight size={12} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    <div aria-hidden="true" style={{ width: '42%', height: '2px', margin: '12px auto 0', background: 'rgba(49,91,164,0.16)', overflow: 'hidden' }}>
                        <span style={{ display: 'block', minWidth: '18%', width: `${mobileSolutionProgress}%`, height: '100%', background: '#315ba4', transition: 'width 0.18s ease' }} />
                    </div>
                </div>
                <div style={{ padding: '18px 20px 0' }}>
                    <Link href={localePath(locale, '/solutions')} aria-label={`${dict.home.buttons.learnMore}: ${dict.home.sections.solutions}`} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#315ba4',
                        color: '#fff',
                        height: '42px',
                        borderRadius: '21px',
                        fontSize: '15px',
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
                        const productTitle = localizedField(item, 'main', locale);
                        return (
                            <Link key={idx} href={localePath(locale, `/products/${item.handle}`)} style={{
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
                                        src={item.mobileImg || item.img}
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
                    <Link href={localePath(locale, '/products')} style={{
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
                position: 'relative',
                padding: '60px 20px',
                color: '#fff',
                textAlign: 'center',
                overflow: 'hidden'
            }}>
                <Image src="/index/about_bg-mobile.webp" fill style={{ objectFit: 'cover' }} alt={dict.home.sections.about} />
                <div style={{ position: 'relative', zIndex: 1, background: 'rgba(0,0,0,0.6)', padding: '40px 20px' }}>
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
