import React from 'react';
import Link from 'next/link';
import ProductGallery from '@/components/products/ProductGallery';
import InPageNav from '@/components/products/InPageNav';
import InquiryForm from '@/components/products/InquiryForm';
import { getProductByHandle } from '@/lib/products';
import WhatsAppLeadButton from '@/components/contact/WhatsAppLeadButton';
import { notFound } from 'next/navigation';

export const metadata = {
    title: 'FC-YJTX-01 Emergency Communication Drone - FC Equipment',
    description: 'High-end tethered mission drone system for ultra-long endurance emergency communications.',
};

function formatSpecLine(value?: string | null, fallbackLabel?: string) {
    const text = value?.trim();
    if (!text) return null;

    const normalized = fallbackLabel && !/[:：]/.test(text) ? `${fallbackLabel}: ${text}` : text;
    const match = normalized.match(/^([^:：]+[:：])\s*(.*)$/);

    if (!match) return normalized;

    return (
        <>
            <strong style={{ fontWeight: 700, color: 'inherit' }}>{match[1]}</strong>
            {match[2] ? ` ${match[2]}` : ''}
        </>
    );
}

export default async function ProductDetailPage() {
    // Default to the Emergency Communication Drone for this specific test URL
    const product = await getProductByHandle('fc-yjtx-01-emergency-communication-drone');

    if (!product) {
        notFound();
    }

    const galleryImages = product.main_image ? [product.main_image] : [];

    const navItems = [
        { id: 'overview', label: 'Overview' },
        { id: 'specs', label: 'Technical Specifications' },
        { id: 'inquiry', label: 'Product Info & Pricing' },
    ];

    return (
        <div className="product-detail-page">
            <main>
                {/* Breadcrumb Row */}
                <div className="product-breadcrumb-nav">
                    <div className="container">
                        <div className="breadcrumb-path">
                            <Link href="/">Home</Link> &gt; <Link href="/products">Product</Link> &gt; {product.product_name_en}
                        </div>
                    </div>
                </div>

                {/* Hero Section */}
                <section id="overview" className="product-hero" style={{ padding: '40px 0 20px' }}>
                    <div className="container">
                        <div className="product-grid">
                            <div className="gallery-main-area">
                                <ProductGallery images={galleryImages} />
                            </div>

                            <div className="product-info">
                                <h1 style={{ fontSize: '4.8rem', fontWeight: '900', marginBottom: '20px', lineHeight: '1.1' }}>
                                    {product.product_name_en}
                                </h1>

                                <div className="drone-specs" style={{ marginBottom: '40px' }}>
                                    {product.key_parameter_1_en && (
                                        <div style={{ fontSize: '1.8rem', color: '#525a66', marginBottom: '8px', lineHeight: '1.4' }}>
                                            {formatSpecLine(product.key_parameter_1_en)}
                                        </div>
                                    )}
                                    {product.key_parameter_2_en && (
                                        <div style={{ fontSize: '1.8rem', color: '#525a66', marginBottom: '8px', lineHeight: '1.4' }}>
                                            {formatSpecLine(product.key_parameter_2_en)}
                                        </div>
                                    )}
                                    {product.key_application_en && (
                                        <div style={{ fontSize: '1.8rem', color: '#525a66', lineHeight: '1.4' }}>
                                            {formatSpecLine(product.key_application_en, 'Applications')}
                                        </div>
                                    )}
                                </div>

                                <div className="cta-group" style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
                                    <button className="btn-cta" style={{ background: '#ff9800', color: '#fff', borderRadius: '4px', textTransform: 'none', fontSize: '2rem', flex: 1, height: '60px', border: 'none', cursor: 'pointer' }}>
                                        Get quotation
                                    </button>
                                    <WhatsAppLeadButton sourceLabel="legacy_product_detail_whatsapp" className="btn-cta" style={{ background: '#25D366', color: '#fff', borderRadius: '4px', textTransform: 'none', fontSize: '2rem', flex: 1, height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}>
                                        WhatsApp
                                    </WhatsAppLeadButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Full Width Intro Text */}
                <section className="product-intro-section" style={{ paddingBottom: '60px' }}>
                    <div className="container">
                        <div className="product-intro-text" style={{ fontSize: '1.8rem', color: '#444', lineHeight: '1.8', borderTop: '1px solid #eee', paddingTop: '40px' }}>
                            {product.summary_en}
                        </div>
                    </div>
                </section>

                <InPageNav items={navItems} />

                {/* Detail HTML Content */}
                {product.detail_html_en && (
                    <section id="features" className="detail-section">
                        <div className="container">
                            <div
                                className="rich-content"
                                dangerouslySetInnerHTML={{ __html: product.detail_html_en }}
                            />
                        </div>
                    </section>
                )}

                {/* Specs Table Section */}
                {product.parameters_en && Object.keys(product.parameters_en).length > 0 && (
                    <section id="specs" className="detail-section">
                        <div className="container" style={{ maxWidth: '1200px' }}>
                            <h2 className="section-title">Technical Specifications</h2>
                            <div style={{ border: '1px solid #eee' }}>
                                <table className="spec-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ background: '#f4f7fa', color: 'var(--text-dark)', borderBottom: '2px solid var(--primary)' }}>
                                            <th style={{ padding: '20px 30px', textAlign: 'left', fontSize: '1.6rem', fontWeight: 'bold' }}>Parameter</th>
                                            <th style={{ padding: '20px 30px', textAlign: 'left', fontSize: '1.6rem', fontWeight: 'bold' }}>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(product.parameters_en).map(([param, val], idx) => (
                                            <tr key={idx} className="spec-row-hover" style={{
                                                background: idx % 2 === 0 ? '#fff' : '#fafafa',
                                                borderBottom: '1px solid #eee',
                                                transition: 'background 0.2s'
                                            }}>
                                                <td style={{ padding: '20px 30px', fontWeight: 'bold', width: '45%', fontSize: '1.5rem' }}>{param}</td>
                                                <td style={{ padding: '20px 30px', fontSize: '1.5rem' }}>{val as string}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                )}

                {/* Inquiry */}
                <section id="inquiry" className="detail-section alt">
                    <div className="container" style={{ maxWidth: '1200px' }}>
                        <InquiryForm />
                    </div>
                </section>
            </main>
        </div>
    );
}

