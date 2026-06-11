'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { products, homepageSolutions as solutions } from '@/constants/homeData';
import { localePath } from '@/lib/localePath';
import { localizedField } from '@/lib/localization';

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
    dict,
    latestNews,
    homeCases
}: { 
    locale: string,
    dict: any,
    latestNews: any[],
    homeCases: any[]
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [solutionProgress, setSolutionProgress] = useState(0);
    const solutionSectionRef = useRef<HTMLElement>(null);
    const solutionTrackRef = useRef<HTMLDivElement>(null);

    const switchProduct = (index: number) => {
        setCurrentIndex(index);
    };

    const scrollSolutions = (direction: 'prev' | 'next') => {
        const track = solutionTrackRef.current;
        if (!track) return;
        const distance = Math.min(track.clientWidth * 0.86, 720);
        track.scrollBy({ left: direction === 'next' ? distance : -distance, behavior: 'smooth' });
    };

    const updateSolutionProgress = () => {
        const track = solutionTrackRef.current;
        if (!track) return;
        const scrollable = track.scrollWidth - track.clientWidth;
        setSolutionProgress(scrollable > 0 ? (track.scrollLeft / scrollable) * 100 : 0);
    };

    const currentProduct = products[currentIndex];
    const localizedProductMain = localizedField(currentProduct, 'main', locale);
    const localizedProductDesc = localizedField(currentProduct, 'desc', locale);
    const localizedProductTop = localizedField(currentProduct, 'top', locale);

    // Drag logic for solutions track
    useEffect(() => {
        const track = solutionTrackRef.current;
        if (!track) return;

        let dragging = false;
        let pendingDrag = false;
        let startX = 0;
        let startLeft = 0;
        let activePointerId: number | null = null;
        let suppressNextClick = false;

        const startDrag = (event: PointerEvent) => {
            if (track.scrollWidth <= track.clientWidth) return;
            pendingDrag = true;
            dragging = false;
            startX = event.clientX;
            startLeft = track.scrollLeft;
            activePointerId = event.pointerId;
        };

        const dragMove = (event: PointerEvent) => {
            if (!pendingDrag || activePointerId !== event.pointerId) return;
            const delta = event.clientX - startX;
            if (!dragging && Math.abs(delta) < 8) return;
            if (!dragging) {
                dragging = true;
                track.classList.add("is-dragging");
                track.setPointerCapture(event.pointerId);
            }
            event.preventDefault();
            track.scrollLeft = startLeft - delta;
        };

        const stopDrag = () => {
            if (dragging) {
                suppressNextClick = true;
            }
            if (activePointerId !== null && track.hasPointerCapture(activePointerId)) {
                track.releasePointerCapture(activePointerId);
            }
            pendingDrag = false;
            dragging = false;
            activePointerId = null;
            track.classList.remove("is-dragging");
        };

        const cancelClickAfterDrag = (event: MouseEvent) => {
            if (!suppressNextClick) return;
            suppressNextClick = false;
            event.preventDefault();
            event.stopPropagation();
        };

        track.addEventListener("pointerdown", startDrag as any);
        track.addEventListener("pointermove", dragMove as any);
        track.addEventListener("pointerup", stopDrag as any);
        track.addEventListener("pointercancel", stopDrag as any);
        track.addEventListener("click", cancelClickAfterDrag, true);
        track.addEventListener("scroll", updateSolutionProgress, { passive: true });
        window.addEventListener("resize", updateSolutionProgress);
        updateSolutionProgress();

        return () => {
            track.removeEventListener("pointerdown", startDrag as any);
            track.removeEventListener("pointermove", dragMove as any);
            track.removeEventListener("pointerup", stopDrag as any);
            track.removeEventListener("pointercancel", stopDrag as any);
            track.removeEventListener("click", cancelClickAfterDrag, true);
            track.removeEventListener("scroll", updateSolutionProgress);
            window.removeEventListener("resize", updateSolutionProgress);
        };
    }, []);

    useEffect(() => {
        const scrollToSolutionsHash = () => {
            if (window.location.hash !== '#solutions' || window.innerWidth <= 991) return;
            solutionSectionRef.current?.scrollIntoView({ block: 'start' });
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
                    <source src="/index_banner_bg_4.mp4" type="video/mp4" />
                </video>
                <div className="hero-overlay"></div>
                <div className="container-wide hero-content">
                    <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: dict.home.hero.title }}></h1>
                    <p className="hero-subtitle">{dict.home.hero.subtitle}</p>
                    <Link href={localePath(locale, '/solutions')} className="btn btn-orange">{dict.home.hero.button} ↗</Link>
                </div>
            </section>

            {/* SCREEN 2: SOLUTIONS */}
            <section className="section-solutions" ref={solutionSectionRef}>
                <div className="container-wide">
                    <div className="solutions-header-row">
                        <div>
                            <h2 className="solutions-heading">{dict.home.sections.solutions}</h2>
                        </div>
                    </div>
                    <div className="solutions-frame">
                        <div className="solutions-controls">
                            <button type="button" aria-label="Previous solutions" onClick={() => scrollSolutions('prev')}>
                                <ChevronLeft size={26} />
                            </button>
                            <button type="button" aria-label="Next solutions" onClick={() => scrollSolutions('next')}>
                                <ChevronRight size={26} />
                            </button>
                        </div>
                        <div className="solutions-track" id="solutions-track" ref={solutionTrackRef}>
                            {solutions.map((sol, index) => {
                                const solName = localizedField(sol, 'title', locale);

                                return (
                                    <Link
                                        key={sol.id}
                                        className="solution-card"
                                        href={localePath(locale, sol.link)}
                                        style={{
                                            '--solution-image-position': sol.objectPosition || '50% 50%',
                                            '--solution-image-scale': sol.imageScale || 1.02,
                                            '--solution-image-hover-scale': (sol.imageScale || 1.02) + 0.06,
                                        } as React.CSSProperties}
                                    >
                                        <div className="solution-media" style={{ position: 'relative', width: '100%', height: '100%' }}>
                                            <Image
                                                src={sol.img}
                                                alt={solName}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                sizes="(max-width: 1200px) 50vw, 25vw"
                                            />
                                        </div>
                                        <div className="solution-content">
                                            <span className="solution-index">{String(index + 1).padStart(2, '0')}</span>
                                            <h3 className="solution-title">{solName}</h3>
                                            <span className="solution-link-label">
                                                {dict.solutions?.viewDetails || 'View Details'} <ArrowUpRight size={16} />
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                    <div className="solutions-progress" aria-hidden="true">
                        <span style={{ width: `${solutionProgress}%` }} />
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

                    <div className="pc2-stage-wrap" style={{ display: 'flex', alignItems: 'center', gap: '40px', position: 'relative', padding: '0 72px' }}>
                        <button
                            type="button"
                            aria-label="Previous product"
                            className="pc2-arrow pc2-arrow-left"
                            onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                switchProduct((currentIndex - 1 + products.length) % products.length);
                            }}
                        >
                            &#10094;
                        </button>

                        <div className="pc2-stage" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', alignItems: 'center', flex: 1 }}>
                            <div className="pc2-content">
                                <h3 style={{ color: 'var(--secondary)', fontSize: '2rem', fontWeight: 600, marginBottom: '15px' }}>{localizedProductTop}</h3>
                                <h2 style={{ fontSize: '4.8rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '25px', lineHeight: 1.1 }}>{localizedProductMain}</h2>
                                <p style={{ fontSize: '1.8rem', color: '#555', lineHeight: 1.7, marginBottom: '40px' }}>{localizedProductDesc}</p>
                                <div className="pc2-actions" style={{ display: 'flex', gap: '20px' }}>
                                    <Link href={localePath(locale, '/contact')} className="btn btn-orange">{dict.products.getQuote}</Link>
                                    <Link href={localePath(locale, `/products/${currentProduct.handle}`)} className="btn" style={{ border: '1px solid #ddd' }}>{dict.products.viewSpecs}</Link>
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
                                    href={localePath(locale, `/products/${currentProduct.handle}`)}
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
                                            padding: currentProduct.imagePadding || '20px',
                                            transform: `scale(${currentProduct.scale}) translateY(${currentProduct.offsetY}px)`,
                                            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))'
                                        }}
                                        sizes="(max-width: 1200px) 100vw, 50vw"
                                    />
                                </Link>
                            </div>
                        </div>

                        <button
                            type="button"
                            aria-label="Next product"
                            className="pc2-arrow pc2-arrow-right"
                            onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                switchProduct((currentIndex + 1) % products.length);
                            }}
                        >
                            &#10095;
                        </button>
                    </div>

                    <div className="pc2-pagination" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '60px', alignItems: 'center' }}>
                        {products.map((_, i) => (
                            <span key={i} className={`pc2-page ${i === currentIndex ? 'active' : ''}`} onClick={() => switchProduct(i)} style={{ cursor: 'pointer', fontSize: '1.6rem', fontWeight: i === currentIndex ? 700 : 400, color: i === currentIndex ? 'var(--accent)' : '#999', transition: '0.3s' }}>
                                {String(i + 1).padStart(2, '0')}
                            </span>
                        ))}
                        <Link href={localePath(locale, '/products')} style={{ marginLeft: '40px', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--primary)' }}>{dict.home.buttons.allProducts}</Link>
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
                            <Link href={localePath(locale, '/products')} className="btn btn-orange">{dict.home.sections.products}</Link>
                            <Link href={localePath(locale, '/about')} aria-label={`${dict.home.buttons.learnMore}: ${dict.home.sections.about}`} className="btn" style={{ border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(5px)' }}>{dict.home.buttons.learnMore}</Link>
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
                .pc2-arrow {
                    position: absolute;
                    top: 50%;
                    z-index: 6;
                    width: 64px;
                    height: 112px;
                    transform: translateY(-50%);
                    border: 1px solid rgba(49, 91, 164, 0.18);
                    background: rgba(255, 255, 255, 0.78);
                    color: #003f98;
                    font-size: 32px;
                    font-weight: 700;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 16px 34px rgba(15, 23, 42, 0.12);
                    backdrop-filter: blur(8px);
                    transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .pc2-arrow:hover {
                    background: #315ba4;
                    color: #fff;
                    border-color: #315ba4;
                }
                .pc2-arrow-left {
                    left: 0;
                }
                .pc2-arrow-right {
                    right: 0;
                }
            `}</style>
        </main>
    );
}
