'use client';

import React, { useEffect, useRef } from 'react';
import categoryLandingData from '@/lib/categoryLandingData';
import ProductGridCard from '@/components/products/ProductGridCard';
import InquiryForm from '@/components/products/InquiryForm';

interface SubSolution {
  product_name: string;
  product_name_en: string;
  summary: string;
  summary_en: string;
  key_parameter_1: string;
  key_parameter_1_en: string;
  key_parameter_2: string;
  key_parameter_2_en: string;
  main_image: string;
  handle: string;
}

interface Props {
  categoryId: string;
  subSolutions: SubSolution[];
  recommendedProducts: { name: string; handle: string; image: string }[];
}

export default function CategoryLandingClient({ categoryId, subSolutions, recommendedProducts }: Props) {
  const data = categoryLandingData[categoryId];

  // Intersection Observer for scroll animations
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-reveal');
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  if (!data) {
    return (
      <div style={{ paddingTop: '200px', textAlign: 'center', height: '100vh', background: '#020c1b', color: '#fff' }}>
        <h1 style={{ fontSize: '3rem' }}>Category Data Not Found</h1>
      </div>
    );
  }

  // Standard container width from globals.css is 1240px
  const containerStyle = { maxWidth: '1240px', margin: '0 auto', padding: '0 20px' };

  return (
    <div className="premium-landing-page" style={{ paddingTop: '114px', background: '#fff', color: '#0f172a', overflowX: 'hidden' }}>

      {/* ============================================ */}
      {/* 0. Breadcrumb Row                            */}
      {/* ============================================ */}
      <div className="product-breadcrumb-nav" style={{ background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
        <div className="container" style={containerStyle}>
          <div className="breadcrumb-path">
            <a href="/">Home</a> &gt; <a href="/solutions">Solutions</a> &gt; {data.name_en}
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* BANNER (Straight-edge, simple)               */}
      {/* ============================================ */}
      <section className="cl-hero" style={{
        position: 'relative',
        height: '40vh',
        minHeight: '320px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#020c1b'
      }}>
        {/* Background Image */}
        <div className="hero-bg-anim" style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('${data.bannerImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }} />
        {/* Dark Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 15, 40, 0.5)',
          zIndex: 1,
        }} />
        {/* Content */}
        <div className="container" style={{ ...containerStyle, position: 'relative', zIndex: 2 }}>
          <div className="hero-content-anim" style={{ textAlign: 'center', width: '100%' }}>
            <h1 style={{
              fontSize: '5.2rem',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.1,
              marginBottom: '30px',
              letterSpacing: '1px',
              textShadow: '0 4px 20px rgba(0,0,0,0.6)',
              textTransform: 'uppercase'
            }}>
              {data.name_en}
            </h1>
            <div>
              <a href="/contact" className="btn-premium primary" style={{ position: 'relative', zIndex: 10 }}>
                Consult Expert
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 1. 行业需求 (Industry Needs)                 */}
      {/* ============================================ */}
      <section className="cl-industry-needs" style={{
        padding: '60px 0',
        background: '#ffffff',
      }}>
        <div className="container" style={containerStyle}>
          <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '3.4rem', fontWeight: 800, color: '#333', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>
              INDUSTRY NEEDS
            </h2>
            <div style={{ width: '60px', height: '4px', background: '#315ba4', margin: '20px auto 0' }}></div>
          </div>
          <div className="reveal-on-scroll" style={{ transitionDelay: '100ms', borderTop: '1px solid #eee', paddingTop: '40px' }}>
            <p style={{
              fontSize: '1.8rem',
              color: '#444',
              lineHeight: 1.8,
              textAlign: 'justify',
              margin: 0
            }}>
              {data.industryNeeds_en}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 2. 方案概述 (Solution Overview - SIDE BY SIDE) */}
      {/* ============================================ */}
      <section id="sub-solutions" className="cl-sub-solutions" style={{
        padding: '60px 0',
        background: '#f8fafc',
      }}>
        <div className="container" style={containerStyle}>
          <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '3.4rem', fontWeight: 800, color: '#333', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>
              SOLUTION OVERVIEW
            </h2>
            <div style={{ width: '60px', height: '4px', background: '#315ba4', margin: '20px auto 0' }}></div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {subSolutions.map((sol, idx) => {
              const isReversed = idx % 2 === 1;
              return (
                <div
                  key={sol.handle}
                  className={`cl-subsolution-row reveal-on-scroll ${isReversed ? 'reversed' : ''}`}
                >

                  
                  <div style={{
                    display: 'flex',
                    flexDirection: isReversed ? 'row-reverse' : 'row',
                    alignItems: 'center',
                    background: '#fff',
                    border: '1px solid #eee',
                    overflow: 'hidden'
                  }}>
                    {/* Image Block */}
                    <a 
                      href={`/solutions/${sol.handle}`}
                      style={{ width: '50%', aspectRatio: '380 / 240', overflow: 'hidden', flexShrink: 0, display: 'block' }}
                    >
                      <img
                        src={sol.main_image || '/images/solutions/placeholder.jpg'}
                        alt={sol.product_name_en}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.5s ease'
                        }}
                        className="hover-zoom"
                      />
                    </a>

                    {/* Text Block */}
                    <div style={{
                      flex: 1,
                      padding: '40px 60px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}>
                    <a href={`/solutions/${sol.handle}`} style={{ textDecoration: 'none' }}>
                      <h3 style={{
                        fontSize: '3.2rem',
                        fontWeight: 700,
                        color: '#0f172a',
                        marginBottom: '20px',
                        lineHeight: 1.2,
                        transition: 'color 0.3s'
                      }} className="hover-color-primary">
                        {sol.product_name_en}
                      </h3>
                    </a>
                    <p style={{
                      fontSize: '1.8rem',
                      color: '#444',
                      lineHeight: 1.8,
                      marginBottom: '32px',
                    }}>
                      {sol.summary_en}
                    </p>

                    <div>
                      <a
                        href={`/solutions/${sol.handle}`}
                        className="btn-premium primary"
                        style={{
                          fontSize: '1.6rem',
                          fontWeight: 700,
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '12px 24px',
                          background: 'var(--accent)',
                          color: '#fff',
                          transition: 'all 0.3s'
                        }}
                      >
                        View Details
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
            })}
          </div>
        </div>
      </section>



      {/* ============================================ */}
      {/* 4. 产品推荐 (Product Recommendations)        */}
      {/* ============================================ */}
      <section className="cl-products" style={{
        padding: '60px 0',
        background: '#020c1b',
      }}>
        <div className="container" style={containerStyle}>
          <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '3.4rem', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>
              PRODUCT RECOMMENDATIONS
            </h2>
            <div style={{ width: '60px', height: '4px', background: 'var(--accent)', margin: '20px auto 0' }}></div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
          }}>
            {recommendedProducts.map((prod, idx) => (
              <ProductGridCard key={idx} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 5. 询盘表单 (Inquiry Form)                   */}
      {/* ============================================ */}
      <section id="inquiry" style={{ padding: '100px 0', background: '#f8f9fa', borderTop: '1px solid #eee' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <InquiryForm />
        </div>
      </section>

      {/* ============================================ */}
      {/* STYLES (Clean, no overlap, straight edges)  */}
      {/* ============================================ */}
      <style jsx>{`
        /* Scroll Reveal */
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .reveal-on-scroll.animate-reveal {
          opacity: 1;
          transform: translateY(0);
        }

        .hover-zoom {
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), filter 0.3s ease, box-shadow 0.3s ease !important;
        }

        .hover-zoom:hover {
          transform: scale(1.08) !important;
          filter: brightness(1.1);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          cursor: pointer;
        }

        .hover-color-primary {
          transition: color 0.3s ease !important;
        }

        .hover-color-primary:hover {
          color: var(--primary) !important;
          text-decoration: underline !important;
          cursor: pointer;
        }

        /* Hero Zoom */
        @keyframes subtleZoom {
          from { transform: scale(1.05); }
          to { transform: scale(1); }
        }
        .hero-bg-anim {
          animation: subtleZoom 8s ease-out forwards;
        }

        /* Buttons */
        .btn-premium {
          display: inline-flex;
          align-items: center;
          padding: 14px 32px;
          border-radius: 0;
          font-size: 1.6rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .btn-premium.primary {
          background: var(--accent);
          color: #fff;
        }
        .btn-premium.primary:hover {
          background: #f57c00;
          transform: translateY(-2px);
        }

        /* Scene Cards */
        .scene-card-simple {
          padding: 30px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          text-align: center;
          transition: all 0.3s;
        }
        .scene-card-simple:hover {
          border-color: var(--primary);
          background: #fff;
        }
        .scene-text {
          font-size: 1.8rem;
          font-weight: 600;
          color: #0f172a;
        }

        /* Product Cards */
        .product-card-simple {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 40px;
          text-align: center;
          transition: all 0.3s;
        }
        .product-card-simple:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--accent);
        }
        .product-card-simple h4 {
          font-size: 1.8rem;
          color: #fff;
          margin: 0;
        }

        @media (max-width: 991px) {
          .cl-subsolution-row { flex-direction: column !important; }
          .cl-hero h1 { font-size: 3.6rem !important; }
        }
      `}</style>
    </div>
  );
}
