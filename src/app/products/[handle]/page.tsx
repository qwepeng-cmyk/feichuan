import React from 'react';
import { notFound } from 'next/navigation';
import { getProductByHandle, getAllProductHandles } from '@/lib/products';
import UniversalGallery from '@/components/common/UniversalGallery';
import InPageNav from '@/components/products/InPageNav';
import InquiryForm from '@/components/products/InquiryForm';

export async function generateStaticParams() {
  const handles = await getAllProductHandles();
  return handles.map((handle) => ({
    handle,
  }));
}

import MobileProductDetail from '@/components/mobile/MobileProductDetail';

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProductByHandle(params.handle);

  if (!product) {
    notFound();
  }

  const galleryImages = product.main_image ? [product.main_image] : [];

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'specs', label: 'Technical Specifications' },
    { id: 'inquiry', label: 'Get Solution & Quotation' },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .mobile_only { display: none !important; }
        .pc_only { display: block !important; }
        @media (max-width: 991px) {
          .mobile_only { display: block !important; }
          .pc_only { display: none !important; }
        }
      `}} />

      {/* Desktop View */}
      <div className="pc_only">
        <div className="product-detail-page" style={{ paddingTop: '112px' }}>
          <main>
            {/* Breadcrumb Row */}
            <div className="product-breadcrumb-nav">
              <div className="container">
                <div className="breadcrumb-path">
                  <a href="/">Home</a> &gt; <a href="/products">Product</a> &gt; {product.product_name_en}
                </div>
              </div>
            </div>

            {/* Hero Section */}
            <section id="overview" className="product-hero" style={{ padding: '40px 0 20px' }}>
              <div className="container">
                <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'start' }}>
                  <div className="gallery-main-area">
                    <UniversalGallery images={galleryImages} />
                  </div>

                  <div className="product-info">
                    <h1 style={{ fontSize: '4.8rem', fontWeight: '900', marginBottom: '20px', lineHeight: '1.1' }}>
                      {product.product_name_en}
                    </h1>

                    <div className="drone-specs" style={{ marginBottom: '40px' }}>
                      {product.key_parameter_1_en && (
                        <div style={{ fontSize: '1.8rem', color: '#525a66', marginBottom: '8px', lineHeight: '1.4' }}>
                          {product.key_parameter_1_en}
                        </div>
                      )}
                      {product.key_parameter_2_en && (
                        <div style={{ fontSize: '1.8rem', color: '#525a66', marginBottom: '8px', lineHeight: '1.4' }}>
                          {product.key_parameter_2_en}
                        </div>
                      )}
                      {product.key_application_en && (
                        <div style={{ fontSize: '1.8rem', color: '#525a66', lineHeight: '1.4' }}>
                          {product.key_application_en}
                        </div>
                      )}
                    </div>

                    <div className="cta-group" style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
                      <button className="btn-cta" style={{ background: '#ff9800', color: '#fff', borderRadius: '4px', textTransform: 'none', fontSize: '2rem', flex: 1, height: '60px', border: 'none', cursor: 'pointer' }}>
                        Get quotation
                      </button>
                      <a href="https://wa.me/+8613761974616" className="btn-cta" style={{ background: '#ff9800', color: '#fff', borderRadius: '4px', textTransform: 'none', fontSize: '2rem', flex: 1, height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}>
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Summary Text */}
            <section className="product-intro-section" style={{ paddingBottom: '60px' }}>
              <div className="container">
                <div className="product-intro-text" style={{ fontSize: '1.8rem', color: '#444', lineHeight: '1.8', borderTop: '1px solid #eee', paddingTop: '40px' }}>
                  {product.summary_en}
                </div>
              </div>
            </section>

            <InPageNav items={navItems} />

            {/* Detail HTML Content (Features / Description) */}
            {product.detail_html_en && (
              <section id="features" className="detail-section alt" style={{ padding: '80px 0', background: '#f8fafc' }}>
                <div className="container">
                  <div
                    className="rich-content"
                    style={{ fontSize: '1.8rem', lineHeight: '1.8' }}
                    dangerouslySetInnerHTML={{ __html: product.detail_html_en }}
                  />
                </div>
              </section>
            )}

            {/* Specs Table Section */}
            {product.parameters_en && (Array.isArray(product.parameters_en) ? product.parameters_en.length > 0 : Object.keys(product.parameters_en).length > 0) && (
              <section id="specs" className="detail-section" style={{ padding: '80px 0' }}>
                <div className="container" style={{ maxWidth: '1200px' }}>
                  <h2 className="section-title" style={{ fontSize: '3.6rem', fontWeight: 700, marginBottom: '40px', textAlign: 'center' }}>Technical Specifications</h2>
                  <div style={{ border: '1px solid #eee', overflowX: 'auto' }}>
                    <table className="spec-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                      {Array.isArray(product.parameters_en) ? (
                        <>
                          <thead>
                            <tr style={{ background: '#f4f7fa', color: '#333', borderBottom: '2px solid #315ba4' }}>
                              {product.parameters_en[0].map((cell: string, ci: number) => (
                                <th key={ci} style={{ padding: '20px 30px', textAlign: 'left', fontSize: '1.6rem', fontWeight: 'bold', borderRight: '1px solid #eee' }}>{cell}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {product.parameters_en.slice(1).map((row: string[], ri: number) => (
                              <tr key={ri} style={{ background: ri % 2 === 0 ? '#fff' : '#fafafa', borderBottom: '1px solid #eee' }}>
                                {row.map((cell: string, ci: number) => (
                                  <td key={ci} style={{ padding: '20px 30px', fontSize: '1.5rem', borderRight: '1px solid #eee' }}>{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </>
                      ) : (
                        <>
                          <thead>
                            <tr style={{ background: '#f4f7fa', color: '#333', borderBottom: '2px solid #315ba4' }}>
                              <th style={{ padding: '20px 30px', textAlign: 'left', fontSize: '1.6rem', fontWeight: 'bold' }}>Parameter</th>
                              <th style={{ padding: '20px 30px', textAlign: 'left', fontSize: '1.6rem', fontWeight: 'bold' }}>Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(product.parameters_en).map(([param, val], idx) => (
                              <tr key={idx} style={{ background: idx % 2 === 0 ? '#fff' : '#fafafa', borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '20px 30px', fontWeight: 'bold', width: '45%', fontSize: '1.5rem' }}>{param}</td>
                                <td style={{ padding: '20px 30px', fontSize: '1.5rem' }}>{val as string}</td>
                              </tr>
                            ))}
                          </tbody>
                        </>
                      )}
                    </table>
                  </div>
                </div>
              </section>
            )}

            {/* Inquiry */}
            <section id="inquiry" className="detail-section alt" style={{ padding: '80px 0', background: '#f8fafc' }}>
              <div className="container" style={{ maxWidth: '1200px' }}>
                <InquiryForm />
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Mobile View */}
      <div className="mobile_only">
        <MobileProductDetail product={product} />
      </div>
    </>
  );
}
