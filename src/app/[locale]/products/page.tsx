import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { getAllProducts } from '@/lib/products';
import DesktopProductCenter from '@/components/pc/DesktopProductCenter';
import MobileProductCenterLoader from '@/components/products/MobileProductCenterLoader';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import { buildSeoMetadata } from '@/lib/seoMetadata';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
    return buildSeoMetadata({
        locale: params.locale,
        path: '/products',
        fallbackTitle: 'Industrial UAV & C-UAS Equipment',
        fallbackDescription: 'Explore N-TET industrial UAV platforms, C-UAS sensors, early-warning equipment, security screening systems, and UAV components organized by mission.',
    });
}

async function ProductsDataWrapper({ locale, dict }: { locale: Locale; dict: any }) {
    const categoriesData = await getAllProducts(locale);
    return (
        <>
            <div className="pc_only product-center-desktop-only">
                <DesktopProductCenter categoriesData={categoriesData} locale={locale} dict={dict} />
            </div>
            <div className="mobile_only product-center-mobile-only">
                <MobileProductCenterLoader locale={locale} dict={dict} />
            </div>
        </>
    );
}

export default async function ProductCenterPage({ params }: { params: { locale: Locale } }) {
    const { locale } = params;
    const dict = await getDictionary(locale);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: `
                .product-center-mobile-only { display: none !important; }
                .product-center-desktop-only { display: block !important; }
                @media (max-width: 991px) {
                    .product-center-mobile-only { display: block !important; }
                    .product-center-desktop-only {
                        display: none !important;
                        visibility: hidden !important;
                        height: 0 !important;
                        overflow: hidden !important;
                    }
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
                <ProductsDataWrapper locale={locale} dict={dict} />
            </Suspense>
        </>
    );
}
