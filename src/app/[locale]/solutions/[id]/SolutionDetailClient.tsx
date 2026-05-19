'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import InPageNav from '@/components/products/InPageNav';
import InquiryForm from '@/components/products/InquiryForm';
import UniversalGallery from '@/components/common/UniversalGallery';
import ProductGridCard from '@/components/products/ProductGridCard';
import OptimizedRichText from '@/components/common/OptimizedRichText';

export default function SolutionDetailClient({ 
    solution, 
    recommendedProducts,
    locale,
    dict
}: { 
    solution: any, 
    recommendedProducts: any[],
    locale: string,
    dict: any
}) {
  // Localized field selection
  const name = solution[`product_name_${locale}`] || solution.product_name_en || solution.title_en;
  const summary = solution[`summary_${locale}`] || solution.summary_en;
  const keyApp = solution[`key_application_${locale}`] || solution.key_application_en;
  const keyParam1 = solution[`key_parameter_1_${locale}`] || solution.key_parameter_1_en;
  const keyParam2 = solution[`key_parameter_2_${locale}`] || solution.key_parameter_2_en;
  const detailHtml = solution[`detail_html_${locale}`] || solution.detail_html_en;
  
  let parameters: any = null;
  try {
      const rawParams = solution[`parameters_${locale}`] || solution.parameters_en;
      parameters = typeof rawParams === 'string' ? JSON.parse(rawParams) : rawParams;
  } catch (e) {
      parameters = {};
  }

  const images = solution.main_image ? [solution.main_image] : ['/images/solutions/placeholder.jpg'];

  const navItems = [
    { id: 'overview', label: dict.products.overview },
    { id: 'specs', label: dict.products.technicalSpecs },
    { id: 'inquiry', label: dict.nav.contact },
  ];

  return (
    <div className="solution-detail-page" style={{ paddingTop: '112px' }}>
      <main>
        {/* 1. Breadcrumb Row */}
        <div className="product-breadcrumb-nav">
          <div className="container">
            <div className="breadcrumb-path">
              <Link href={`/${locale}`}>{dict.nav.home}</Link> &gt; <Link href={`/${locale}/solutions`}>{dict.nav.solutions}</Link> &gt; <Link href={`/${locale}/solutions/category/${solution.category_id}`}>{solution.category_name}</Link> &gt; {name}
            </div>
          </div>
        </div>

        {/* 2. Hero Section */}
        <section id="overview" className="product-hero" style={{ padding: '40px 0 20px', background: '#fff' }}>
          <div className="container">
            <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>

              {/* Image Gallery Area */}
              <div className="gallery-main-area">
                <UniversalGallery images={images} alt={name} />
              </div>

              {/* Info Area */}
              <div className="product-info">
                <h1 style={{ fontSize: '4.8rem', fontWeight: '900', marginBottom: '20px', lineHeight: '1.1', color: '#333' }}>
                  {name}
                </h1>

                <div className="drone-specs" style={{ marginBottom: '40px' }}>
                  {keyApp && (
                    <div style={{ fontSize: '1.8rem', color: '#525a66', marginBottom: '8px', lineHeight: '1.4' }}>
                        {keyApp}
                    </div>
                  )}
                  {keyParam1 && (
                    <div style={{ fontSize: '1.8rem', color: '#525a66', marginBottom: '8px', lineHeight: '1.4' }}>
                        {keyParam1}
                    </div>
                  )}
                  {keyParam2 && (
                    <div style={{ fontSize: '1.8rem', color: '#525a66', marginBottom: '8px', lineHeight: '1.4' }}>
                        {keyParam2}
                    </div>
                  )}
                </div>

                <div className="cta-group" style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
                  <a href="#inquiry" className="btn-cta" style={{ background: '#ff9800', color: '#fff', borderRadius: '4px', textTransform: 'none', fontSize: '2rem', flex: 1, height: '60px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', textDecoration: 'none' }}>
                    {dict.products.getQuotation}
                  </a>
                  <a href="https://wa.me/+8613761974616" className="btn-cta" style={{ background: '#ff9800', color: '#fff', borderRadius: '4px', textTransform: 'none', fontSize: '2rem', flex: 1, height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', fontWeight: '700', textDecoration: 'none' }}>
                    {dict.products.whatsapp}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2.5 Summary Intro */}
        <section className="product-intro-section" style={{ padding: '60px 0', background: '#fff' }}>
          <div className="container">
            <div className="product-intro-text" style={{ fontSize: '1.8rem', color: '#444', lineHeight: '1.8', borderTop: '1px solid #eee', paddingTop: '40px' }}>
              {summary}
            </div>
          </div>
        </section>

        {/* 3. Sticky Nav */}
        <InPageNav items={navItems} />

        {/* 4. Detail HTML */}
        {detailHtml && (
          <section id="features" className="detail-section" style={{ padding: '100px 0', backgroundColor: '#f8f9fa' }}>
            <div className="container">
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '50px' }}>{dict.products.coreAdvantages || 'Core Advantages'}</h2>
              <OptimizedRichText
                className="rich-content"
                html={detailHtml}
              />
            </div>
          </section>
        )}

        {/* 5. Parameters Table */}
        {parameters && Object.keys(parameters).length > 0 && (
          <section id="specs" className="detail-section" style={{ padding: '100px 0', backgroundColor: '#fff' }}>
            <div className="container">
              <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '50px' }}>{dict.products.technicalSpecs}</h2>
              <div style={{ border: '1px solid #eee' }}>
                <table className="spec-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f4f7fa', borderBottom: '2px solid #315ba4' }}>
                      <th style={{ padding: '20px 30px', textAlign: 'left', fontSize: '1.6rem', fontWeight: 'bold' }}>{dict.products.parameter}</th>
                      <th style={{ padding: '20px 30px', textAlign: 'left', fontSize: '1.6rem', fontWeight: 'bold' }}>{dict.products.description}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(parameters).map(([param, val], idx) => (
                      <tr key={idx} style={{
                        background: idx % 2 === 0 ? '#fff' : '#fcfcfc',
                        borderBottom: '1px solid #eee'
                      }}>
                        <td style={{ padding: '20px 30px', fontWeight: 'bold', width: '40%', fontSize: '1.5rem' }}>{param}</td>
                        <td style={{ padding: '20px 30px', fontSize: '1.5rem' }}>{val as string}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* 5.5 Related Products Section */}
        {recommendedProducts.length > 0 && (
          <section id="products" className="detail-section" style={{ padding: '100px 0', backgroundColor: '#f4f7fa' }}>
            <div className="container">
              <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '50px' }}>{dict.products.relatedEquipment || 'Related Equipment'}</h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                gap: '30px' 
              }}>
                {recommendedProducts.map((product, idx) => (
                  <ProductGridCard key={idx} product={product} locale={locale} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 6. Contact Form */}
        <section id="inquiry" className="detail-section alt">
          <div className="container" style={{ maxWidth: '1200px' }}>
            <InquiryForm dict={dict} />
          </div>
        </section>
      </main>
    </div>
  );
}
