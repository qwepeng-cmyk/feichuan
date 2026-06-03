import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { getAllMedia } from '@/lib/media';
import MediaClient from './MediaClient';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import { buildSeoMetadata } from '@/lib/seoMetadata';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
    return buildSeoMetadata({
        locale: params.locale,
        path: '/media',
        fallbackTitle: 'Industrial UAV Insights & Low-Altitude Monitoring News',
        fallbackDescription: 'Read N-TET insights on industrial UAV operations, low-altitude economy trends, tethered UAV surveillance, redundancy, and infrastructure monitoring.',
    });
}

async function MediaDataWrapper({ locale, dict }: { locale: Locale; dict: any }) {
    const newsData = await getAllMedia();
    return <MediaClient newsData={newsData} locale={locale} dict={dict} />;
}

export default async function MediaPage({ params }: { params: { locale: Locale } }) {
    const { locale } = params;
    const dict = await getDictionary(locale);
    
    return (
        <Suspense fallback={
            <div style={{ padding: '20px 15px' }}>
                <div style={{ height: '120px', backgroundColor: '#f0f0f0', marginBottom: '30px' }} />
                {[1, 2, 3].map(i => (
                    <div key={i} style={{ display: 'flex', gap: '15px', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                        <div style={{ width: '120px', height: '90px', backgroundColor: '#f5f5f5', flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                            <div style={{ height: '16px', backgroundColor: '#f0f0f0', width: '90%', marginBottom: '10px' }} />
                            <div style={{ height: '12px', backgroundColor: '#f5f5f5', width: '40%' }} />
                        </div>
                    </div>
                ))}
            </div>
        }>
            <MediaDataWrapper locale={locale} dict={dict} />
        </Suspense>
    );
}
