import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import React, { Suspense } from 'react';
export const revalidate = 3600;
import { getCaseByHandle, getAllCaseHandles } from '@/lib/cases';
import { getProductByHandle } from '@/lib/products';
import UniversalGallery from '@/components/common/UniversalGallery';
import InPageNav from '@/components/products/InPageNav';
import ProductGridCard from '@/components/products/ProductGridCard';
import MobileCaseDetail from '@/components/mobile/MobileCaseDetail';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import dynamic from 'next/dynamic';
import JsonLd from '@/components/seo/JsonLd';
import RelatedPublicLinks from '@/components/seo/RelatedPublicLinks';
import { articleJsonLd, pageUrl } from '@/lib/structuredData';
import { localePath } from '@/lib/localePath';
import { buildSeoMetadata } from '@/lib/seoMetadata';
import PrimaryContactButton from '@/components/contact/PrimaryContactButton';
import { getSeoKeywordTarget } from '@/lib/seoKeywordTargets';
import CaseEquipmentList from '@/components/cases/CaseEquipmentList';
import { isCuasCaseHandle, isCuasProductCategory } from '@/lib/cuasIndexability';

const InquiryForm = dynamic(() => import('@/components/products/InquiryForm'), {
  ssr: true,
  loading: () => <div style={{ minHeight: '400px', background: '#f8fafc' }} />
});

export async function generateStaticParams() {
  const handles = await getAllCaseHandles();
  return handles
    .map((handle) => ({
      handle,
    }));
}

export async function generateMetadata({ params }: { params: { handle: string; locale: Locale } }): Promise<Metadata> {
  const caseData = await getCaseByHandle(params.handle);
  if (!caseData) return {};

  const title = caseData[`title_${params.locale}`] || caseData.title_en || caseData.title;
  const description = caseData[`description_${params.locale}`] || caseData.description_en || caseData.description || undefined;

  return buildSeoMetadata({
    locale: params.locale,
    path: `/cases/${params.handle}`,
    fallbackTitle: title,
    fallbackDescription: description,
    image: caseData.main_image,
    indexable: isCuasCaseHandle(params.handle),
  });
}

function parseList(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean).map(String);

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return [];

    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) return parsed.filter(Boolean).map(String);
    } catch (e) {
      // Some admin fields have historically been saved as plain strings.
    }

    return trimmed
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function uniqueItems(items: string[]) {
  return Array.from(new Set(items.filter(Boolean)));
}

function firstNonEmptyList(...values: unknown[]): string[] {
  for (const value of values) {
    const items = uniqueItems(parseList(value));
    if (items.length > 0) return items;
  }

  return [];
}

function localizeSnapshotLabel(label: string, dict: any) {
  return dict?.cases?.snapshotLabels?.[label] || label;
}

function parseSnapshot(value: unknown, dict: any): { label: string; value: string }[] {
  if (!value) return [];

  let source = value;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return [];
    try {
      source = JSON.parse(trimmed);
    } catch (e) {
      return [];
    }
  }

  if (!Array.isArray(source)) return [];
  return source
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const record = item as { label?: unknown; value?: unknown };
      const label = typeof record.label === 'string' ? record.label.trim() : '';
      const itemValue = typeof record.value === 'string' ? record.value.trim() : '';
      return label && itemValue ? { label: localizeSnapshotLabel(label, dict), value: itemValue } : null;
    })
    .filter((item): item is { label: string; value: string } => Boolean(item));
}

// 1. Data Fetching Component (Streaming)
async function CaseDetailContent({ handle, locale }: { handle: string; locale: Locale }) {
  const dict = await getDictionary(locale);

  const caseData = await getCaseByHandle(handle);

  if (!caseData) {
    notFound();
  }

  const title = caseData[`title_${locale}`] || caseData.title_en || caseData.title;
  const description = caseData[`description_${locale}`] || caseData.description_en || caseData.description;
  const seoTarget = getSeoKeywordTarget({
    route: `/cases/${handle}`,
    title,
    pageKind: 'case_detail',
    fallbackKeywords: [title],
    locale,
  });
  const overviewHeading = seoTarget.overviewHeading || dict.products.overview;
  const jsonLd = articleJsonLd({
    locale,
    path: `/cases/${handle}`,
    title,
    description,
    image: caseData.main_image || caseData.image,
    datePublished: caseData.date || caseData.created_at,
    dateModified: caseData.updated_at || caseData.date || caseData.created_at,
    breadcrumbs: [
      { name: dict.nav.home, url: pageUrl(locale, '/') },
      { name: dict.nav.cases, url: pageUrl(locale, '/cases') },
      { name: title, url: pageUrl(locale, `/cases/${handle}`) },
    ],
  });
  const caseSnapshot = parseSnapshot(caseData[`case_snapshot_${locale}`] || caseData.case_snapshot_en, dict);
  const equipmentItems = firstNonEmptyList(
    caseData[`devices_${locale}`],
    caseData.devices_en,
    caseData.devices
  );
  const recommendedProductHandles = uniqueItems([
    ...parseList(caseData.recommended_product_handles),
    ...parseList(caseData.recommendedProductHandles),
  ]);

  const recommendedProducts: any[] = [];
  for (const productHandle of recommendedProductHandles) {
    const product = await getProductByHandle(productHandle);
    if (product && isCuasProductCategory(product.category_primary || product.category)) {
      recommendedProducts.push({
        ...product,
        name: product[`product_name_${locale}`] || product.product_name_en || product.name,
        handle: product.handle || productHandle,
        image: product.main_image || product.image || '/logo1-small.webp',
      });
    }
  }

  const galleryImages = uniqueItems([
    caseData.main_image,
    caseData.image,
    ...parseList(caseData.case_images),
  ]);

  const navItems = [
    { id: 'overview', label: dict.products.overview },
    ...(recommendedProducts.length > 0
      ? [{ id: 'products', label: dict.products.relatedEquipment || 'Related Equipment' }]
      : []),
    { id: 'inquiry', label: dict.nav.contact },
  ];
  const relatedLinks = [
    ...(caseData.solution_category_id
      ? [{ href: `/solutions/category/${caseData.solution_category_id}`, label: dict.nav.solutions, description: 'Solution category for this deployment type' }]
      : []),
    { href: '/cases', label: dict.nav.cases, description: 'More public deployment references' },
    { href: '/products', label: dict.nav.products, description: 'Equipment families used in field projects' },
    { href: '/contact', label: dict.nav.contact, description: 'Project inquiry and quotation' },
  ];

  return (
    <>
      {isCuasCaseHandle(handle) && <JsonLd data={jsonLd} />}

      <div className="pc_only">
        <div className="product-detail-page" style={{ paddingTop: '112px' }}>
          <main>
            <div className="product-breadcrumb-nav">
              <div className="container">
                <div className="breadcrumb-path">
                  <Link href={localePath(locale)}>{dict.nav.home}</Link> &gt; <Link href={localePath(locale, '/cases')}>{dict.nav.cases}</Link> &gt; {title}
                </div>
              </div>
            </div>

            <section className="product-hero" style={{ padding: '40px 0 20px', background: '#fff' }}>
              <div className="container">
                <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'start' }}>
                  <div className="gallery-main-area">
                    <UniversalGallery images={galleryImages} alt={title} />
                  </div>
                  <div className="product-info">
                    <h1 style={{ fontSize: '4.8rem', fontWeight: '900', marginBottom: '20px', lineHeight: '1.1', color: '#333' }}>
                      {title}
                    </h1>
                    <CaseEquipmentList
                      heading={dict.cases?.equipmentUsed || 'Equipment Used'}
                      items={equipmentItems}
                    />
                    {caseSnapshot.length > 0 && (
                      <div className="case-snapshot" style={{ marginBottom: '40px', borderTop: '1px solid #e5ebf3', borderBottom: '1px solid #e5ebf3', padding: '22px 0' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#315ba4', marginBottom: '15px' }}>
                          {dict.cases?.projectOverview || 'Project Overview'}
                        </div>
                        {caseSnapshot.map((item, idx) => (
                          <div key={idx} style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '18px', fontSize: '1.65rem', lineHeight: '1.5', marginBottom: idx === caseSnapshot.length - 1 ? 0 : '12px' }}>
                            <div style={{ color: '#6b7280', fontWeight: 700 }}>{item.label}</div>
                            <div style={{ color: '#263241', fontWeight: 600 }}>{item.value}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="cta-group" style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
                      <a href="#inquiry" className="btn-cta" style={{ background: '#b45309', color: '#fff', borderRadius: '4px', fontSize: '2rem', flex: 1, height: '60px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', textDecoration: 'none' }}>
                        {dict.products.getQuotation}
                      </a>
                      <PrimaryContactButton sourceLabel="case_detail_whatsapp" className="btn-cta" style={{ background: 'var(--contact-channel-accent)', color: '#fff', borderRadius: '4px', fontSize: '2rem', flex: 1, height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', fontWeight: '700', textDecoration: 'none' }}>
                        {dict.products.whatsapp}
                      </PrimaryContactButton>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <InPageNav items={navItems} />

            <section id="overview" className="product-intro-section" style={{ padding: '70px 0', background: '#fff' }}>
              <div className="container">
                <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '34px' }}>{overviewHeading}</h2>
                <div className="product-intro-text" style={{ width: '100%', maxWidth: 'none', margin: 0, fontSize: '1.8rem', color: '#444', lineHeight: '1.85', textAlign: 'left' }}>
                  {typeof description === 'string' && description.split('\n').map((paragraph: string, idx: number) => (
                    paragraph.trim() ? <p key={idx} style={{ marginBottom: '20px' }}>{paragraph}</p> : null
                  ))}
                </div>
              </div>
            </section>

            {recommendedProducts.length > 0 && (
              <section id="products" className="detail-section" style={{ padding: '100px 0', backgroundColor: '#f4f7fa' }}>
                <div className="container">
                  <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '50px' }}>{dict.cases?.recommendedEquipment || dict.products.relatedEquipment || 'Recommended Equipment'}</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                    {recommendedProducts.map((product, idx) => (
                      <ProductGridCard key={idx} product={product} locale={locale} />
                    ))}
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
        <MobileCaseDetail
          caseData={caseData}
          recommendedProducts={recommendedProducts}
          locale={locale}
          dict={dict}
          equipmentItems={equipmentItems}
        />
      </div>

      <RelatedPublicLinks locale={locale} links={relatedLinks} />
    </>
  );
}

// 2. Entry Page Component (Instant Navigation)
export default async function CaseDetailPage({ params }: { params: { handle: string; locale: Locale } }) {
  const { handle, locale } = params;

  const caseData = await getCaseByHandle(handle);
  if (!caseData) {
    notFound();
  }

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

      <Suspense fallback={
        <div style={{ paddingTop: '112px', minHeight: '100vh', backgroundColor: '#fff' }}>
          <div className="container" style={{ padding: '40px 15px' }}>
            <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px' }}>
              {/* Image Skeleton */}
              <div style={{ aspectRatio: '4/3', backgroundColor: '#f5f5f5', borderRadius: '4px' }} />
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
        <CaseDetailContent handle={handle} locale={locale} />
      </Suspense>
    </>
  );
}

