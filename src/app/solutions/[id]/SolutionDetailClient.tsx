'use client';

import React, { useState } from 'react';
import InPageNav from '@/components/products/InPageNav';
import InquiryForm from '@/components/products/InquiryForm';
import UniversalGallery from '@/components/common/UniversalGallery';
import ProductGridCard from '@/components/products/ProductGridCard';

export default function SolutionDetailClient({ solution, recommendedProducts }: { solution: any, recommendedProducts: any[] }) {
  // Create an array of images (Mock more if only one exists for gallery testing)
  const images = solution.main_image ? [solution.main_image, solution.main_image, solution.main_image] : ['/images/solutions/placeholder.jpg'];

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'specs', label: 'Specifications' },
    { id: 'inquiry', label: 'Inquiry' },
  ];

  return (
    <div className="solution-detail-page" style={{ paddingTop: '112px' }}>
      <main>
        {/* 1. Breadcrumb Row */}
        <div className="product-breadcrumb-nav">
          <div className="container">
            <div className="breadcrumb-path">
              <a href="/">Home</a> &gt; <a href="/solutions">Solutions</a> &gt; <a href={`/solutions/category/${solution.category_id}`}>{solution.category_name}</a> &gt; {solution.title_en}
            </div>
          </div>
        </div>

        {/* 2. Hero Section (Matched with Product Detail Gallery) */}
        <section id="overview" className="product-hero" style={{ padding: '40px 0 20px', background: '#fff' }}>
          <div className="container">
            <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>

              {/* Image Gallery Area (Standardized Component) */}
              <div className="gallery-main-area">
                <UniversalGallery images={images} />
              </div>

              {/* Product Info Area */}
              <div className="product-info">
                <h1 style={{ fontSize: '4.8rem', fontWeight: '900', marginBottom: '20px', lineHeight: '1.1', color: '#333' }}>
                  {solution.title_en}
                </h1>

                <div className="drone-specs" style={{ marginBottom: '40px' }}>
                  <div style={{ fontSize: '1.8rem', color: '#525a66', marginBottom: '8px', lineHeight: '1.4' }}>
                    {solution.key_application_en}
                  </div>
                  <div style={{ fontSize: '1.8rem', color: '#525a66', marginBottom: '8px', lineHeight: '1.4' }}>
                    {solution.key_parameter_1_en}
                  </div>
                  <div style={{ fontSize: '1.8rem', color: '#525a66', marginBottom: '8px', lineHeight: '1.4' }}>
                    {solution.key_parameter_2_en}
                  </div>
                </div>

                <div className="cta-group" style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
                  <a href="#inquiry" className="btn-cta" style={{ background: '#ff9800', color: '#fff', borderRadius: '4px', textTransform: 'none', fontSize: '2rem', flex: 1, height: '60px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', textDecoration: 'none' }}>
                    Get quotation
                  </a>
                  <a href="https://wa.me/+8613761974616" className="btn-cta" style={{ background: '#ff9800', color: '#fff', borderRadius: '4px', textTransform: 'none', fontSize: '2rem', flex: 1, height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', fontWeight: '700', textDecoration: 'none' }}>
                    WhatsApp
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
              {solution.summary_en}
            </div>
          </div>
        </section>

        {/* 3. Sticky Nav */}
        <InPageNav items={navItems} />

        {/* 4. Detail HTML */}
        {solution.detail_html_en && (
          <section id="features" className="detail-section" style={{ padding: '100px 0', backgroundColor: '#f8f9fa' }}>
            <div className="container">
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '50px' }}>Tactical Advantages</h2>
              <div
                className="rich-content"
                dangerouslySetInnerHTML={{ __html: solution.detail_html_en }}
                style={{ fontSize: '1.8rem', lineHeight: '1.8' }}
              />
            </div>
          </section>
        )}

        {/* 5. Parameters Table */}
        {solution.parameters_en && (
          <section id="specs" className="detail-section" style={{ padding: '100px 0', backgroundColor: '#fff' }}>
            <div className="container">
              <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '50px' }}>Technical Parameters</h2>
              <div style={{ border: '1px solid #eee' }}>
                <table className="spec-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f4f7fa', borderBottom: '2px solid #315ba4' }}>
                      <th style={{ padding: '20px 30px', textAlign: 'left', fontSize: '1.6rem', fontWeight: 'bold' }}>Feature / Indicator</th>
                      <th style={{ padding: '20px 30px', textAlign: 'left', fontSize: '1.6rem', fontWeight: 'bold' }}>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(solution.parameters_en).map(([param, val], idx) => (
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

        {/* 5.5 Related Products Section (New) */}
        {recommendedProducts.length > 0 && (
          <section id="products" className="detail-section" style={{ padding: '100px 0', backgroundColor: '#f4f7fa' }}>
            <div className="container">
              <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '50px' }}>Related Equipment</h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                gap: '30px' 
              }}>
                {recommendedProducts.map((product, idx) => (
                  <ProductGridCard key={idx} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 6. Contact Form (Matched Standard Section) */}
        <section id="inquiry" className="detail-section alt">
          <div className="container" style={{ maxWidth: '1200px' }}>
            <InquiryForm />
          </div>
        </section>
      </main>
    </div>
  );
}
