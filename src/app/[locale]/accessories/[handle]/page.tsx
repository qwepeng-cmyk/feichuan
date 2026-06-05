import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import React, { Suspense } from 'react';
export const revalidate = 3600;
import { getAccessoryByHandle, getAllAccessoryHandles } from '@/lib/accessories';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import CatalogDetailContent from '@/components/products/CatalogDetailContent';
import { buildSeoMetadata } from '@/lib/seoMetadata';
import { isPublicComplianceContent } from '@/lib/complianceTaxonomy';

export const dynamicParams = false;

export async function generateStaticParams() {
  const handles = await getAllAccessoryHandles();
  return handles
    .filter((handle) => isPublicComplianceContent('product', handle))
    .map((handle) => ({ handle }));
}

export async function generateMetadata({ params }: { params: { handle: string; locale: Locale } }): Promise<Metadata> {
  if (!isPublicComplianceContent('product', params.handle)) return {};
  const product = await getAccessoryByHandle(params.handle);
  if (!product) return {};

  const name = product[`product_name_${params.locale}`] || product.product_name_en || product.name;
  const description = product[`summary_${params.locale}`] || product.summary_en || undefined;

  return buildSeoMetadata({
    locale: params.locale,
    path: `/accessories/${params.handle}`,
    fallbackTitle: `${name} | N-TET Drone Accessories`,
    fallbackDescription: description,
    fallbackKeywords: [name, 'drone accessories', 'UAV components', 'industrial UAV parts'],
    image: product.main_image,
  });
}

async function AccessoryDetailContent({ handle, locale }: { handle: string; locale: Locale }) {
  const dict = await getDictionary(locale);
  if (!isPublicComplianceContent('product', handle)) {
    notFound();
  }

  const product = await getAccessoryByHandle(handle);

  if (!product) {
    notFound();
  }

  return (
    <CatalogDetailContent
      product={product}
      handle={handle}
      locale={locale}
      dict={dict}
      basePath="/accessories"
      catalogLabel={dict.nav.accessories || dict.accessories.title}
    />
  );
}

export default async function AccessoryDetailPage({ params }: { params: { handle: string; locale: Locale } }) {
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
              <div style={{ aspectRatio: '1/1', backgroundColor: '#f5f5f5', borderRadius: '4px' }} />
              <div style={{ padding: '20px 0' }}>
                <div style={{ height: '48px', backgroundColor: '#f0f0f0', width: '70%', marginBottom: '30px' }} />
                <div style={{ height: '20px', backgroundColor: '#f5f5f5', width: '90%', marginBottom: '15px' }} />
                <div style={{ height: '20px', backgroundColor: '#f5f5f5', width: '85%', marginBottom: '15px' }} />
              </div>
            </div>
          </div>
        </div>
      }>
        <AccessoryDetailContent handle={handle} locale={locale} />
      </Suspense>
    </>
  );
}
