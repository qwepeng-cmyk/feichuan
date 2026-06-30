import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { getAllAccessories, ACCESSORY_CATEGORY_ORDER } from '@/lib/accessories';
import GenericCatalogCenter, { CatalogCategory } from '@/components/products/GenericCatalogCenter';
import MobileAccessoryCenterLoader from '@/components/products/MobileAccessoryCenterLoader';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import { buildSeoMetadata } from '@/lib/seoMetadata';

const ACCESSORIES_BANNER_IMAGE = '/products/uav-accessories/uav-accessories-banner-blue-aerial.webp';

function accessoryCategories(dict: any): CatalogCategory[] {
  return ACCESSORY_CATEGORY_ORDER.map((id) => ({
    id,
    name: dict.accessories.categories[id] || id,
  }));
}

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildSeoMetadata({
    locale: params.locale,
    path: '/accessories',
    fallbackTitle: 'Drone Accessories & UAV Components',
    fallbackDescription: 'Browse N-TET UAV components for flight control, propulsion, data links, power systems, EO payloads, integration, and maintenance.',
  });
}

async function AccessoriesDataWrapper({ locale, dict }: { locale: Locale; dict: any }) {
  const categoriesData = await getAllAccessories(locale);
  const categories = accessoryCategories(dict);

  return (
    <>
      <div className="pc_only">
        <GenericCatalogCenter
          categoriesData={categoriesData}
          categories={categories}
          locale={locale}
          dict={dict}
          bannerTitle={dict.accessories.bannerTitle}
          bannerDesc={dict.accessories.bannerDesc}
          basePath="/accessories"
          bannerImage={ACCESSORIES_BANNER_IMAGE}
        />
      </div>
      <div className="mobile_only">
        <MobileAccessoryCenterLoader locale={locale} dict={dict} categories={categories} />
      </div>
    </>
  );
}

export default async function AccessoriesPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const dict = await getDictionary(locale);

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
        <div style={{ padding: '20px 15px' }}>
          <div style={{ height: '120px', backgroundColor: '#f0f0f0', marginBottom: '30px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} style={{ backgroundColor: '#fff', border: '1px solid #f0f0f0' }}>
                <div style={{ paddingTop: '75%', backgroundColor: '#f5f5f5' }} />
                <div style={{ padding: '10px' }}>
                  <div style={{ height: '12px', backgroundColor: '#f0f0f0', width: '80%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      }>
        <AccessoriesDataWrapper locale={locale} dict={dict} />
      </Suspense>
    </>
  );
}
