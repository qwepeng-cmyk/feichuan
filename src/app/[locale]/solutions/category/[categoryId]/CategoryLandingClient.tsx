'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { CategoryLandingData } from '@/lib/categoryLandingData';
import ProductGridCard from '@/components/products/ProductGridCard';
import InquiryForm from '@/components/products/InquiryForm';
import MobileCategoryLanding from '@/components/mobile/MobileCategoryLanding';
import { localePath } from '@/lib/localePath';

interface SubSolution {
  product_name: string;
  product_name_en: string;
  product_name_ru: string;
  summary: string;
  summary_en: string;
  summary_ru: string;
  key_parameter_1: string;
  key_parameter_1_en: string;
  key_parameter_1_ru: string;
  key_parameter_2: string;
  key_parameter_2_en: string;
  key_parameter_2_ru: string;
  main_image: string;
  handle: string;
}

interface Props {
  categoryId: string;
  landingData?: CategoryLandingData;
  subSolutions: SubSolution[];
  recommendedProducts: { name: string; handle: string; image: string }[];
  locale: string;
  dict: any;
}

export default function CategoryLandingClient({ categoryId, landingData, subSolutions, recommendedProducts, locale, dict }: Props) {
  const data = landingData;
  const l = (path: string) => localePath(locale, path);

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

  const categoryName = locale === 'ru' ? data.name_ru : data.name_en;
  const industryNeeds = locale === 'ru' ? data.industryNeeds_ru : data.industryNeeds_en;

  // Standard container width from globals.css is 1240px
  const containerStyle = { maxWidth: '1240px', margin: '0 auto', padding: '0 20px' };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .mobile_only { display: none !important; }
        .pc_only { display: block !important; }
        @media (max-width: 991px) {
          .mobile_only { display: block !important; }
          .pc_only { display: none !important; }
        }
      `}} />

      {/* PC VIEW */}
      <div className="pc_only">
        <div className="premium-landing-page" style={{ paddingTop: '112px', background: '#fff', color: '#0f172a', overflowX: 'hidden' }}>

          {/* Breadcrumb Row */}
          <div className="product-breadcrumb-nav" style={{ background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
            <div className="container" style={containerStyle}>
              <div className="breadcrumb-path">
                <Link prefetch={false} href={l("/")}>{dict.nav.home}</Link> &gt; <Link prefetch={false} href={l("/solutions")}>{dict.nav.solutions}</Link> &gt; {categoryName}
              </div>
            </div>
          </div>

          {/* BANNER */}
          <section className="cl-hero" style={{
            position: 'relative',
            height: '40vh',
            minHeight: '320px',
            maxHeight: '450px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundColor: '#020c1b'
          }}>
            <Image src={data.bannerImage} fill style={{ objectFit: 'cover' }} priority alt={categoryName} />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.3)',
              zIndex: 1,
            }} />
            <div className="container" style={{ ...containerStyle, position: 'relative', zIndex: 2 }}>
              <div style={{ textAlign: 'left', width: '100%', maxWidth: '800px' }}>
                <h1 style={{ fontSize: '5.2rem', fontWeight: 900, color: '#ffffff', lineHeight: 1.1, marginBottom: '15px' }}>
                  {categoryName}
                </h1>
                <p style={{ fontSize: '2rem', color: '#fff', lineHeight: 1.5, opacity: 0.95 }}>
                  {dict.solutions.bannerSubtitle || dict.solutions.bannerDesc}
                </p>
              </div>
            </div>
          </section>

          {/* 1. Industry Needs */}
          <section className="cl-industry-needs" style={{ padding: '60px 0', background: '#ffffff' }}>
            <div className="container" style={containerStyle}>
              <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h2 style={{ fontSize: '3.4rem', fontWeight: 800, color: '#333', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>
                  {dict.solutions.industryNeeds}
                </h2>
                <div style={{ width: '60px', height: '4px', background: '#315ba4', margin: '20px auto 0' }}></div>
              </div>
              <div className="reveal-on-scroll" style={{ borderTop: '1px solid #eee', paddingTop: '40px' }}>
                <p style={{ fontSize: '1.8rem', color: '#444', lineHeight: 1.8, textAlign: 'justify', margin: 0 }}>
                  {industryNeeds}
                </p>
              </div>
            </div>
          </section>

          {/* 2. Solution Overview */}
          <section id="sub-solutions" style={{ padding: '60px 0', background: '#f8fafc' }}>
            <div className="container" style={containerStyle}>
              <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '80px' }}>
                <h2 style={{ fontSize: '3.4rem', fontWeight: 800, color: '#333', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>
                  {dict.solutions.pageTitle}
                </h2>
                <div style={{ width: '60px', height: '4px', background: '#315ba4', margin: '20px auto 0' }}></div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                {subSolutions.map((sol, idx) => {
                  const isReversed = idx % 2 === 1;
                  const solName = locale === 'ru' ? sol.product_name_ru : sol.product_name_en;
                  const solSummary = locale === 'ru' ? sol.summary_ru : sol.summary_en;

                  return (
                    <div key={sol.handle} className="reveal-on-scroll">
                      <div style={{
                        display: 'flex',
                        flexDirection: isReversed ? 'row-reverse' : 'row',
                        alignItems: 'center',
                        background: '#fff',
                        border: '1px solid #eee',
                        overflow: 'hidden'
                      }}>
                        <Link prefetch={false} href={l(`/solutions/${sol.handle}`)} style={{ width: '50%', aspectRatio: '380 / 240', display: 'block', position: 'relative' }}>
                          <Image src={sol.main_image || '/images/solutions/placeholder.jpg'} alt={solName} fill style={{ objectFit: 'cover' }} sizes="50vw" />
                        </Link>
                        <div style={{ flex: 1, padding: '40px 60px' }}>
                          <h3 style={{ fontSize: '3.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '20px' }}>{solName}</h3>
                          <p style={{ fontSize: '1.8rem', color: '#444', lineHeight: 1.8, marginBottom: '32px' }}>{solSummary}</p>
                          <Link prefetch={false} href={l(`/solutions/${sol.handle}`)} className="btn-premium primary" style={{
                            fontSize: '1.6rem', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#315ba4', color: '#fff'
                          }}>
                            {dict.solutions.viewDetails}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 4. Product Recommendations */}
          <section style={{ padding: '60px 0', background: '#020c1b' }}>
            <div className="container" style={containerStyle}>
              <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h2 style={{ fontSize: '3.4rem', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>
                  {dict.solutions.recommendedProducts}
                </h2>
                <div style={{ width: '60px', height: '4px', background: '#315ba4', margin: '20px auto 0' }}></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                {recommendedProducts.map((prod, idx) => (
                  <ProductGridCard key={idx} product={prod} locale={locale} dict={dict} />
                ))}
              </div>
            </div>
          </section>

          {/* 5. Inquiry Form */}
          <section id="inquiry" style={{ padding: '100px 0', background: '#f8f9fa', borderTop: '1px solid #eee' }}>
            <div className="container" style={{ maxWidth: '1200px' }}>
              <InquiryForm dict={dict} />
            </div>
          </section>
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="mobile_only">
        <MobileCategoryLanding
          categoryId={categoryId}
          categoryName={categoryName}
          bannerImage={data.bannerImage}
          industryNeeds={industryNeeds}
          subSolutions={subSolutions}
          recommendedProducts={recommendedProducts}
          locale={locale}
          dict={dict}
        />
      </div>
    </>
  );
}

