'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import NEWS_DATA from '../../../public/media/news_data.json';
import { products, solutions, homeCases } from '@/constants/homeData';

// Dynamic imports for better performance
const HomeCases = dynamic(() => import('../home/sections/HomeCases'), { 
    ssr: true,
    loading: () => <div style={{ minHeight: '600px', background: '#f8f9fa' }} /> 
});
const HomeNews = dynamic(() => import('../home/sections/HomeNews'), { 
    ssr: true,
    loading: () => <div style={{ minHeight: '500px', background: '#f8f9fa' }} /> 
});

export default function DesktopHome({ 
    locale,
    dict
}: { 
    locale: string,
    dict: any
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const solutionTrackRef = useRef<HTMLDivElement>(null);

    // Get latest 3 news
    const latestNews = NEWS_DATA.slice(0, 3);

    const switchProduct = (index: number) => {
        setCurrentIndex(index);
    };

    const currentProduct = products[currentIndex];
    const localizedProductMain = locale === 'ru' ? currentProduct.main_ru : currentProduct.main;
    const localizedProductDesc = locale === 'ru' ? currentProduct.desc_ru : currentProduct.desc;
    const localizedProductTop = locale === 'ru' ? currentProduct.top_ru : currentProduct.top;

    // Drag logic for solutions track
    useEffect(() => {
        const track = solutionTrackRef.current;
        if (!track) return;

        let dragging = false;
        let startX = 0;
        let startLeft = 0;

        const startDrag = (event: PointerEvent) => {
            if (track.scrollWidth <= track.clientWidth) return;
            dragging = true;
            startX = event.clientX;
            startLeft = track.scrollLeft;
            track.classList.add("is-dragging");
            track.setPointerCapture(event.pointerId);
        };

        const dragMove = (event: PointerEvent) => {
            if (!dragging) return;
            const delta = event.clientX - startX;
            track.scrollLeft = startLeft - delta;
        };

        const stopDrag = () => {
            dragging = false;
            track.classList.remove("is-dragging");
        };

        track.addEventListener("pointerdown", startDrag as any);
        track.addEventListener("pointermove", dragMove as any);
        track.addEventListener("pointerup", stopDrag as any);
        track.addEventListener("pointercancel", stopDrag as any);

        return () => {
            track.removeEventListener("pointerdown", startDrag as any);
            track.removeEventListener("pointermove", dragMove as any);
            track.removeEventListener("pointerup", stopDrag as any);
            track.removeEventListener("pointercancel", stopDrag as any);
        };
    }, []);

    return (
        <main>
            {/* SCREEN 1: HERO */}
            <section className="hero">
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    preload="metadata"
                    style={{ backgroundColor: '#000' }}
                >
                    <source src="/index_banner_bg_3.mp4" type="video/mp4" />
                </video>
                <div className="hero-overlay"></div>
                <div className="container-wide hero-content">
                    <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: dict.home.hero.title }}></h1>
                    <p className="hero-subtitle">{dict.home.hero.subtitle}</p>
                    <Link href={`/${locale}/solutions`} className="btn btn-orange">{dict.home.hero.button} ↗</Link>
                </div>
            </section>

            {/* SCREEN 2: SOLUTIONS */}
            <section className="section-solutions" id="solutions">
                <div className="container-wide">
                    <h2 className="solutions-heading" style={{ textAlign: 'center' }}>{dict.home.sections.solutions}</h2>
                    <div className="solutions-track" id="solutions-track" ref={solutionTrackRef}>
                        {solutions.map((sol) => {
                            const solMap: Record<string, string> = {
                                '01_BorderPatrol': dict.solutions.categories.border,
                                '02_InfrastructureProtection': dict.solutions.categories.infrastructure,
                                '03_KeyAreaSecurity': dict.solutions.categories.security,
                                '04_EmergencyRescue': dict.solutions.categories.emergency
                            };
                            const solName = solMap[sol.id] || sol.title;

                            return (
                                <Link key={sol.id} className="solution-card" href={`/${locale}${sol.link}`}>
                                    <div className="solution-media" style={{ position: 'relative', width: '100%', height: '100%' }}>
                                        <Image 
                                            src={sol.img} 
                                            alt={solName} 
                                            fill 
                                            style={{ objectFit: 'cover' }}
                                            sizes="(max-width: 1200px) 50vw, 25vw"
                                        />
                                    </div>
                                    <h3 className="solution-title">{solName}</h3>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* SCREEN 3: PRODUCT CENTER 2 */}
            <section className="product-center-2" id="product-center-2" style={{ padding: '50px 0 40px', background: '#f2f6ff' }}>
                <div className="container-wide">
                    <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '3.6rem', color: 'var(--primary)' }}>{dict.home.sections.products}</h2>
                        <div style={{ width: '60px', height: '4px', background: 'var(--accent)', margin: '20px auto' }}></div>
                    </div>

                    <div className="pc2-stage-wrap" style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                        <button className="pc2-arrow" onClick={() => switchProduct((currentIndex - 1 + products.length) % products.length)} style={{ fontSize: '30px', background: 'none', border: 'none', cursor: 'pointer' }}>&#10094;</button>

                        <div className="pc2-stage" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', alignItems: 'center', flex: 1 }}>
                            <div className="pc2-content">
                                <h3 style={{ color: 'var(--secondary)', fontSize: '2rem', fontWeight: 600, marginBottom: '15px' }}>{localizedProductTop}</h3>
                                <h2 style={{ fontSize: '4.8rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '25px', lineHeight: 1.1 }}>{localizedProductMain}</h2>
                                <p style={{ fontSize: '1.8rem', color: '#555', lineHeight: 1.7, marginBottom: '40px' }}>{localizedProductDesc}</p>
                                <div className="pc2-actions" style={{ display: 'flex', gap: '20px' }}>
                                    <Link href={`/${locale}/contact`} className="btn btn-orange">{dict.products.getQuote}</Link>
                                    <Link href={`/${locale}/products/${currentProduct.handle}`} className="btn" style={{ border: '1px solid #ddd' }}>{dict.products.viewSpecs}</Link>
                                </div>
                            </div>
                            <div className="pc2-image-wrap" style={{
                                textAlign: 'center',
                                height: '480px',
                                minHeight: '480px',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1
                            }}>
                                <Link
                                    href={`/${locale}/products/${currentProduct.handle}`}
                                    className="pc2-image-link"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '100%',
                                        height: '100%',
                                        position: 'relative',
                                        transition: 'all 0.5s ease'
                                    }}
                                >
                                    <Image
                                        key={localizedProductMain}
                                        src={currentProduct.img}
                                        alt={localizedProductMain}
                                        fill
                                        style={{
                                            objectFit: 'contain',
                                            padding: '20px',
                                            transform: `scale(${currentProduct.scale}) translateY(${currentProduct.offsetY}px)`,
                                            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))'
                                        }}
                                        sizes="(max-width: 1200px) 100vw, 50vw"
                                    />
                                </Link>
                            </div>
                        </div>

                        <button className="pc2-arrow" onClick={() => switchProduct((currentIndex + 1) % products.length)} style={{ fontSize: '30px', background: 'none', border: 'none', cursor: 'pointer' }}>&#10095;</button>
                    </div>

                    <div className="pc2-pagination" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '60px', alignItems: 'center' }}>
                        {products.map((_, i) => (
                            <span key={i} className={`pc2-page ${i === currentIndex ? 'active' : ''}`} onClick={() => switchProduct(i)} style={{ cursor: 'pointer', fontSize: '1.6rem', fontWeight: i === currentIndex ? 700 : 400, color: i === currentIndex ? 'var(--accent)' : '#999', transition: '0.3s' }}>
                                {String(i + 1).padStart(2, '0')}
                            </span>
                        ))}
                        <Link href={`/${locale}/products`} style={{ marginLeft: '40px', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--primary)' }}>{dict.home.buttons.allProducts}</Link>
                    </div>
                </div>
            </section>

            {/* SCREEN 4: CUSTOMER CASES (DYNAMIC) */}
            <HomeCases locale={locale} dict={dict} homeCases={homeCases} />

            {/* SCREEN 5: ABOUT US */}
            <section className="aboutus-band" style={{
                position: 'relative',
                color: '#fff',
                height: '600px',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden'
            }}>
                <Image src="/index/about_bg.webp" fill style={{ objectFit: 'cover' }} alt={dict.home.sections.about} />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.4), rgba(0,0,0,0.7))',
                    zIndex: 1
                }}></div>

                <div className="container-wide" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{ maxWidth: '900px' }}>
                        <h2 style={{ fontSize: '4.8rem', fontWeight: 900, marginBottom: '30px', color: '#fff' }}>{dict.home.sections.about}</h2>
                        <p style={{ fontSize: '2rem', lineHeight: 1.6, marginBottom: '40px', opacity: 0.9 }}>{dict.home.about.content}</p>
                        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                            <Link href={`/${locale}/products`} className="btn btn-orange">{dict.home.sections.products}</Link>
                            <Link href={`/${locale}/about`} aria-label={`${dict.home.buttons.learnMore}: ${dict.home.sections.about}`} className="btn" style={{ border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(5px)' }}>{dict.home.buttons.learnMore}</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* SCREEN 6: NEWS (DYNAMIC) */}
            <HomeNews locale={locale} dict={dict} latestNews={latestNews} />

            <style jsx>{`
                .pc2-image-link:hover :global(img) {
                    transform: scale(${parseFloat(currentProduct.scale.toString()) * 1.05}) translateY(${currentProduct.offsetY - 10}px) !important;
                    filter: drop-shadow(0 20px 40px rgba(49, 91, 164, 0.25)) !important;
                }
            `}</style>
        </main>
    );
}

