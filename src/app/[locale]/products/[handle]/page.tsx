import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import React, { Suspense } from 'react';
export const revalidate = 3600; 
import { getProductByHandle, getAllProductHandles } from '@/lib/products';
import MobileProductDetail from '@/components/mobile/MobileProductDetail';
import UniversalGallery from '@/components/common/UniversalGallery';
import InPageNav from '@/components/products/InPageNav';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import dynamic from 'next/dynamic';
import OptimizedRichText from '@/components/common/OptimizedRichText';
import JsonLd from '@/components/seo/JsonLd';
import { pageUrl, productJsonLd } from '@/lib/structuredData';
import { localePath } from '@/lib/localePath';

const InquiryForm = dynamic(() => import('@/components/products/InquiryForm'), {
  ssr: true,
  loading: () => <div style={{ minHeight: '400px', background: '#f8fafc' }} />
});

function parseOverviewLine(value?: string | null, fallbackLabel?: string) {
  const text = value?.trim();
  if (!text) return null;

  const separatorIndex = text.indexOf(':');
  if (separatorIndex > 0) {
    const label = text.slice(0, separatorIndex).trim();
    const itemValue = text.slice(separatorIndex + 1).trim();
    if (!label || !itemValue) return null;
    return {
      label,
      value: itemValue,
    };
  }

  const match = text.match(/^([^:：]+)[:：]\s*(.*)$/);
  if (match && match[1]?.trim() && match[2]?.trim()) {
    return {
      label: match[1].trim(),
      value: match[2].trim(),
    };
  }

  if (!fallbackLabel) return null;
  return {
    label: fallbackLabel,
    value: text,
  };
}

export async function generateStaticParams() {
  const handles = await getAllProductHandles();
  return handles.map((handle) => ({
    handle,
  }));
}

export async function generateMetadata({ params }: { params: { handle: string; locale: Locale } }): Promise<Metadata> {
  const product = await getProductByHandle(params.handle);
  if (!product) return {};

  const name = product[`product_name_${params.locale}`] || product.product_name_en || product.name;
  const description = product[`summary_${params.locale}`] || product.summary_en || undefined;
  const canonical = params.locale === 'en' ? `/products/${params.handle}` : `/${params.locale}/products/${params.handle}`;
  const image = product.main_image ? new URL(product.main_image, 'https://n-tet.com').toString() : undefined;

  return {
    title: name,
    description,
    alternates: { canonical },
    openGraph: {
      title: name,
      description,
      url: canonical,
      images: image ? [{ url: image, alt: name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: name,
      description,
      images: image ? [image] : undefined,
    },
  };
}

// 1. Data Fetching Component (Streaming)
async function ProductDetailContent({ handle, locale }: { handle: string; locale: Locale }) {
  const dict = await getDictionary(locale);
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  // Localized field selection
  const name = product[`product_name_${locale}`] || product.product_name_en || product.name;
  const summary = product[`summary_${locale}`] || product.summary_en;
  const keyApp = product[`key_application_${locale}`] || product.key_application_en;
  const keyParam1 = product[`key_parameter_1_${locale}`] || product.key_parameter_1_en;
  const keyParam2 = product[`key_parameter_2_${locale}`] || product.key_parameter_2_en;
  const detailHtml = product[`detail_html_${locale}`] || product.detail_html_en;
  const applicationLabel = locale === 'ru' ? 'Применение' : 'Application';
  const productOverview = [
    parseOverviewLine(keyParam1, locale === 'ru' ? 'Ключевой параметр' : 'Key Parameter'),
    parseOverviewLine(keyParam2, locale === 'ru' ? 'Ключевой параметр' : 'Key Parameter'),
    parseOverviewLine(keyApp, applicationLabel),
  ].filter((item): item is { label: string; value: string } => Boolean(item));
  
  let parameters: any = null;
  try {
    const rawParams = product[`parameters_${locale}`] || product.parameters_en;
    parameters = typeof rawParams === 'string' ? JSON.parse(rawParams) : rawParams;
  } catch (e) {
    parameters = {};
  }

  const galleryImages = [product.main_image, ...(product.product_images || [])].filter(Boolean);
  const jsonLd = productJsonLd({
    locale,
    handle,
    name,
    description: summary,
    image: product.main_image,
    category: product.category_primary || product.category,
    breadcrumbs: [
      { name: dict.nav.home, url: pageUrl(locale, '/') },
      { name: dict.nav.products, url: pageUrl(locale, '/products') },
      { name, url: pageUrl(locale, `/products/${handle}`) },
    ],
  });

  const navItems = [
    { id: 'overview', label: dict.products.overview },
    { id: 'specs', label: dict.products.technicalSpecs },
    { id: 'inquiry', label: dict.nav.contact },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      <div className="pc_only">
        <div className="product-detail-page" style={{ paddingTop: '112px' }}>
          <main>
            <div className="product-breadcrumb-nav">
              <div className="container">
                <div className="breadcrumb-path">
                  <Link href={localePath(locale)}>{dict.nav.home}</Link> &gt; <Link href={localePath(locale, '/products')}>{dict.nav.products}</Link> &gt; {name}
                </div>
              </div>
            </div>

            <section id="overview" className="product-hero" style={{ padding: '40px 0 20px', background: '#fff' }}>
              <div className="container">
                <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'start' }}>
                  <div className="gallery-main-area">
                    <UniversalGallery images={galleryImages} fit="contain" alt={name} aspectRatio="1.618 / 1" />
                  </div>
                  <div className="product-info">
                    <h1 style={{ fontSize: '4.8rem', fontWeight: '900', marginBottom: '20px', lineHeight: '1.1', color: '#333' }}>
                      {name}
                    </h1>
                    {productOverview.length > 0 && (
                      <div className="product-snapshot" style={{ marginBottom: '40px', borderTop: '1px solid #e5ebf3', borderBottom: '1px solid #e5ebf3', padding: '22px 0' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#315ba4', marginBottom: '15px' }}>
                          Product Overview
                        </div>
                        {productOverview.map((item, idx) => (
                          <div key={`${item.label}-${idx}`} style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '18px', fontSize: '1.65rem', lineHeight: '1.5', marginBottom: idx === productOverview.length - 1 ? 0 : '12px' }}>
                            <div style={{ color: '#6b7280', fontWeight: 700 }}>{item.label}</div>
                            <div style={{ color: '#263241', fontWeight: 600 }}>{item.value}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="cta-group" style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
                      <a href="#inquiry" className="btn-cta" style={{ background: '#ff9800', color: '#fff', borderRadius: '4px', fontSize: '2rem', flex: 1, height: '60px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', textDecoration: 'none' }}>
                        {dict.products.getQuotation}
                      </a>
                      <a href="https://wa.me/+8613761974616" className="btn-cta" style={{ background: '#ff9800', color: '#fff', borderRadius: '4px', fontSize: '2rem', flex: 1, height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', fontWeight: '700', textDecoration: 'none' }}>
                        {dict.products.whatsapp}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="product-intro-section" style={{ paddingBottom: '60px', background: '#fff' }}>
              <div className="container">
                <div className="product-intro-text" style={{ fontSize: '1.8rem', color: '#444', lineHeight: '1.8', borderTop: '1px solid #eee', paddingTop: '40px' }}>
                  {summary}
                </div>
              </div>
            </section>

            <InPageNav items={navItems} />

            {detailHtml && (
              <section id="features" className="detail-section alt" style={{ padding: '100px 0', backgroundColor: '#f8fafc' }}>
                <div className="container">
                  <OptimizedRichText className="rich-content" html={detailHtml} />
                </div>
              </section>
            )}

            {parameters && (Array.isArray(parameters) ? parameters.length > 0 : Object.keys(parameters).length > 0) && (
              <section id="specs" className="detail-section" style={{ padding: '80px 0', backgroundColor: '#fff' }}>
                <div className="container">
                  <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '50px', fontSize: '3.6rem', fontWeight: 700 }}>{dict.products.technicalSpecs}</h2>
                  <div style={{ border: '1px solid #eee', overflowX: 'auto' }}>
                    <table className="spec-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                      {Array.isArray(parameters) ? (
                        <>
                          <thead>
                            <tr style={{ background: '#f4f7fa', color: '#333', borderBottom: '2px solid #315ba4' }}>
                              {parameters[0].map((cell: string, ci: number) => (
                                <th key={ci} style={{ padding: '20px 30px', textAlign: 'left', fontSize: '1.6rem', fontWeight: 'bold', borderRight: '1px solid #eee' }}>{cell}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {parameters.slice(1).map((row: string[], ri: number) => (
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
                              <th style={{ padding: '20px 30px', textAlign: 'left', fontSize: '1.6rem', fontWeight: 'bold' }}>{dict.products.parameter}</th>
                              <th style={{ padding: '20px 30px', textAlign: 'left', fontSize: '1.6rem', fontWeight: 'bold' }}>{dict.products.description}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(parameters).map(([param, val], idx) => (
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

            <section id="inquiry" className="detail-section alt" style={{ padding: '80px 0', background: '#f8fafc' }}>
              <div className="container" style={{ maxWidth: '1200px' }}>
                <InquiryForm dict={dict} />
              </div>
            </section>
          </main>
        </div>
      </div>

      <div className="mobile_only">
        <MobileProductDetail product={product} locale={locale} dict={dict} />
      </div>
    </>
  );
}

// 2. Entry Page Component (Instant Navigation)
export default async function ProductDetailPage({ params }: { params: { handle: string; locale: Locale } }) {
  const { handle, locale } = params;

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

      <Suspense fallback={
        <div style={{ paddingTop: '112px', minHeight: '100vh', backgroundColor: '#fff' }}>
          <div className="container" style={{ padding: '40px 15px' }}>
            <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px' }}>
              {/* Image Skeleton */}
              <div style={{ aspectRatio: '1/1', backgroundColor: '#f5f5f5', borderRadius: '4px' }} />
              {/* Info Skeleton */}
              <div style={{ padding: '20px 0' }}>
                <div style={{ height: '48px', backgroundColor: '#f0f0f0', width: '70%', marginBottom: '30px' }} />
                <div style={{ height: '20px', backgroundColor: '#f5f5f5', width: '90%', marginBottom: '15px' }} />
                <div style={{ height: '20px', backgroundColor: '#f5f5f5', width: '85%', marginBottom: '15px' }} />
                <div style={{ height: '20px', backgroundColor: '#f5f5f5', width: '40%', marginBottom: '50px' }} />
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ flex: 1, height: '60px', backgroundColor: '#f0f0f0', borderRadius: '4px' }} />
                  <div style={{ flex: 1, height: '60px', backgroundColor: '#f0f0f0', borderRadius: '4px' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      }>
        <ProductDetailContent handle={handle} locale={locale} />
      </Suspense>
    </>
  );
}
