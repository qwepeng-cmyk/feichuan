import Link from 'next/link';
import React from 'react';
import dynamic from 'next/dynamic';
import MobileProductDetail from '@/components/mobile/MobileProductDetail';
import UniversalGallery from '@/components/common/UniversalGallery';
import InPageNav from '@/components/products/InPageNav';
import OptimizedRichText from '@/components/common/OptimizedRichText';
import JsonLd from '@/components/seo/JsonLd';
import { pageUrl, productJsonLd } from '@/lib/structuredData';
import { localePath } from '@/lib/localePath';
import PrimaryContactButton from '@/components/contact/PrimaryContactButton';
import type { Locale } from '@/i18n/config';
import SpecificationTable from './SpecificationTable';
import { buildKeywordIntro, getSeoKeywordTarget } from '@/lib/seoKeywordTargets';
import { getArabicTechnicalHighlight, getArabicTechnicalParameters } from '@/lib/arabicTechnicalCopy';
import { getProductBrochure } from '@/lib/productBrochures';
import ProductBrochureDownload from './ProductBrochureDownload';

const InquiryForm = dynamic(() => import('@/components/products/InquiryForm'), {
  ssr: true,
  loading: () => <div style={{ minHeight: '400px', background: '#f8fafc' }} />,
});

function parseOverviewLine(value?: string | null, fallbackLabel?: string) {
  const text = value?.trim();
  if (!text) return null;

  const separatorIndex = text.indexOf(':');
  if (separatorIndex > 0) {
    const label = text.slice(0, separatorIndex).trim();
    const itemValue = text.slice(separatorIndex + 1).trim();
    if (label && itemValue) return { label, value: itemValue };
  }

  if (!fallbackLabel) return null;
  return { label: fallbackLabel, value: text };
}

function isCategoryOverviewItem(item: { label: string; value: string }) {
  const normalizedLabel = item.label
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();

  return [
    'category',
    'categoria',
    '\u5206\u7c7b',
    '\u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f',
    '\u0627\u0644\u0641\u0626\u0629',
  ].includes(normalizedLabel);
}

function readJsonLike(value: unknown) {
  if (!value) return null;
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function readGalleryImages(product: any) {
  return product.main_image ? [product.main_image] : [];
}

export default function CatalogDetailContent({
  product,
  handle,
  locale,
  dict,
  basePath,
  catalogLabel,
  indexable = true,
}: {
  product: any;
  handle: string;
  locale: Locale;
  dict: any;
  basePath: '/products' | '/accessories';
  catalogLabel: string;
  indexable?: boolean;
}) {
  const name = product[`product_name_${locale}`] || product.product_name_en || product.name;
  const summary = product[`summary_${locale}`] || product.summary_en;
  const keyApp = product[`key_application_${locale}`] || product.key_application_en;
  const keyParam1 = getArabicTechnicalHighlight(product, 'key_parameter_1', locale);
  const keyParam2 = getArabicTechnicalHighlight(product, 'key_parameter_2', locale);
  const detailHtml = product[`detail_html_${locale}`] || product.detail_html_en;
  const parameters = readJsonLike(getArabicTechnicalParameters(product, locale));
  const seoTarget = getSeoKeywordTarget({
    route: `${basePath}/${handle}`,
    title: name,
    category: product.category_primary || product.category,
    pageKind: basePath === '/accessories' ? 'accessory_detail' : 'product_detail',
    fallbackKeywords: [name, product.category_primary || product.category].filter(Boolean),
    locale,
  });
  const displayName = seoTarget.h1 || name;
  const specsHeading = seoTarget.overviewHeading || dict.products.technicalSpecs;
  const keywordIntro = buildKeywordIntro(seoTarget, name, locale);
  const overviewTitle =
    locale === 'ar' ? 'نظرة عامة على المنتج' :
    locale === 'es' ? 'Resumen del producto' :
    locale === 'ru' ? 'Обзор продукта' :
    'Product Overview';
  const applicationLabel =
    locale === 'ar' ? 'التطبيق' :
    locale === 'es' ? 'Aplicación' :
    locale === 'ru' ? 'Применение' :
    'Application';
  const keyParameterLabel =
    locale === 'ar' ? 'المؤشر الرئيسي' :
    locale === 'es' ? 'Parámetro clave' :
    locale === 'ru' ? 'Ключевой параметр' :
    'Key Parameter';
  const productOverview = [
    parseOverviewLine(keyParam1, keyParameterLabel),
    parseOverviewLine(keyParam2, keyParameterLabel),
    parseOverviewLine(keyApp, applicationLabel),
  ].filter((item): item is { label: string; value: string } => Boolean(item))
    .filter((item) => !isCategoryOverviewItem(item));
  const galleryImages = readGalleryImages(product);
  const brochure = locale === 'en' && basePath === '/products' ? getProductBrochure(handle) : null;
  const jsonLd = productJsonLd({
    locale,
    handle,
    name,
    description: summary,
    image: product.main_image,
    category: product.category_primary || product.category,
    basePath,
    breadcrumbs: [
      { name: dict.nav.home, url: pageUrl(locale, '/') },
      { name: catalogLabel, url: pageUrl(locale, basePath) },
      { name, url: pageUrl(locale, `${basePath}/${handle}`) },
    ],
  });

  const navItems = [
    { id: 'overview', label: dict.products.overview },
    { id: 'specs', label: dict.products.technicalSpecs },
    { id: 'inquiry', label: dict.nav.contact },
  ];
  const hasParameters = parameters && (Array.isArray(parameters) ? parameters.length > 0 : Object.keys(parameters).length > 0);

  return (
    <>
      {indexable && <JsonLd data={jsonLd} />}

      <div className="pc_only">
        <div className="product-detail-page" style={{ paddingTop: '112px' }}>
          <main>
            <div className="product-breadcrumb-nav">
              <div className="container">
                <div className="breadcrumb-path">
                  <Link href={localePath(locale)}>{dict.nav.home}</Link> &gt; <Link href={localePath(locale, basePath)}>{catalogLabel}</Link> &gt; {displayName}
                </div>
              </div>
            </div>

            <section id="overview" className="product-hero" style={{ padding: '40px 0 20px', background: '#fff' }}>
              <div className="container">
                <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'start' }}>
                  <div className="gallery-main-area">
                    <UniversalGallery images={galleryImages.length ? galleryImages : ['/logo1-small.webp']} fit="contain" alt={displayName} aspectRatio="1.618 / 1" />
                  </div>
                  <div className="product-info" style={{ gap: 0 }}>
                    <h1 style={{ fontSize: '4.8rem', fontWeight: '900', marginBottom: '20px', lineHeight: '1.1', color: '#333' }}>
                      {displayName}
                    </h1>
                    {productOverview.length > 0 && (
                      <div className="product-snapshot" style={{ marginBottom: 0, borderTop: '1px solid #e5ebf3', borderBottom: '1px solid #e5ebf3', padding: '22px 0' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#315ba4', marginBottom: '15px' }}>
                          {overviewTitle}
                        </div>
                        {productOverview.map((item, idx) => (
                          <div key={`${item.label}-${idx}`} style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '18px', fontSize: '1.65rem', lineHeight: '1.5', marginBottom: idx === productOverview.length - 1 ? 0 : '12px' }}>
                            <div style={{ color: '#6b7280', fontWeight: 700 }}>{item.label}</div>
                            <div style={{ color: '#263241', fontWeight: 600 }}>{item.value}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="cta-group" style={{ display: 'flex', gap: '20px', marginTop: '28px' }}>
                      <a href="#inquiry" className="btn-cta" style={{ background: '#b45309', color: '#fff', borderRadius: '4px', fontSize: '2rem', flex: 1, height: '60px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', textDecoration: 'none' }}>
                        {dict.products.getQuotation}
                      </a>
                      <PrimaryContactButton sourceLabel="product_detail_whatsapp" className="btn-cta" style={{ background: 'var(--contact-channel-accent)', color: '#fff', borderRadius: '4px', fontSize: '2rem', flex: 1, height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', fontWeight: '700', textDecoration: 'none' }}>
                        {dict.products.whatsapp}
                      </PrimaryContactButton>
                    </div>
                    {brochure && (
                      <ProductBrochureDownload
                        productHandle={handle}
                        productName={name}
                        pageCount={brochure.pageCount}
                      />
                    )}
                  </div>
                </div>
              </div>
            </section>

            {summary && (
              <section className="product-intro-section" style={{ paddingBottom: '60px', background: '#fff' }}>
                <div className="container">
                  <div className="product-intro-text" style={{ fontSize: '1.8rem', color: '#444', lineHeight: '1.8', borderTop: '1px solid #eee', paddingTop: '40px' }}>
                    {keywordIntro && (
                      <p style={{ margin: '0 0 18px', color: '#263241', fontWeight: 650 }}>
                        {keywordIntro}
                      </p>
                    )}
                    {summary}
                  </div>
                </div>
              </section>
            )}

            <InPageNav items={navItems} />

            {detailHtml && (
              <section id="features" className="detail-section alt" style={{ padding: '100px 0', backgroundColor: '#f8fafc' }}>
                <div className="container">
                  <OptimizedRichText className="rich-content" html={detailHtml} />
                </div>
              </section>
            )}

            {hasParameters && (
              <section id="specs" className="detail-section" style={{ padding: '80px 0', backgroundColor: '#fff' }}>
                <div className="container">
                  <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '50px', fontSize: '3.6rem', fontWeight: 700 }}>{specsHeading}</h2>
                  <SpecificationTable parameters={parameters} parameterLabel={dict.products.parameter} descriptionLabel={dict.products.description} />
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
        <MobileProductDetail
          product={product}
          locale={locale}
          dict={dict}
          basePath={basePath}
          catalogLabel={catalogLabel}
          brochurePageCount={brochure?.pageCount}
        />
      </div>
    </>
  );
}
