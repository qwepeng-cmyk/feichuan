import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { getAllProducts } from '@/lib/products';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import { buildSeoMetadata } from '@/lib/seoMetadata';
import CuasProductCenter from '@/components/products/CuasProductCenter';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
    return buildSeoMetadata({
        locale: params.locale,
        path: '/products',
        fallbackTitle: 'Professional C-UAS Equipment',
        fallbackDescription: 'Explore portable, fixed-site and vehicle-mounted C-UAS equipment plus unified airspace monitoring platforms for detection, identification and tracking.',
    });
}

async function ProductsDataWrapper({ locale, dict }: { locale: Locale; dict: any }) {
    const categoriesData = await getAllProducts(locale);
    return (
        <CuasProductCenter
            products={categoriesData['drone-detection'] || []}
            opticalProducts={categoriesData['perimeter-intelligence'] || []}
            locale={locale}
            dict={dict}
            showLaserPreview={process.env.LOCAL_LASER_PREVIEW === '1'}
        />
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
