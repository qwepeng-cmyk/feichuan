import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { getAllCases } from '@/lib/cases';
import CasesPageClient from './CasesPageClient';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import { buildSeoMetadata } from '@/lib/seoMetadata';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
    return buildSeoMetadata({
        locale: params.locale,
        path: '/cases',
        fallbackTitle: 'UAV Deployment Cases',
        fallbackDescription: 'Deployment references for UAV inspection, patrol, emergency support, and low-altitude airspace monitoring.',
    });
}

// 1. Create a data fetching component
async function CasesDataWrapper({ locale, dict }: { locale: Locale; dict: any }) {
    const cases = await getAllCases();
    return <CasesPageClient allCases={cases} locale={locale} dict={dict} />;
}

// 2. The main page becomes synchronous for the shell
export default async function CasesPage({ params }: { params: { locale: Locale } }) {
    const { locale } = params;
    const dict = await getDictionary(locale);

    return (
        <div className="cases-page" style={{ backgroundColor: '#fff' }}>
            <main>
                <Suspense fallback={
                    <div style={{ padding: '20px 15px' }}>
                        {/* Skeleton for Banner */}
                        <div style={{ height: '120px', backgroundColor: '#f0f0f0', marginBottom: '20px' }} />
                        {/* Skeleton for Filters */}
                        <div style={{ height: '40px', backgroundColor: '#f0f0f0', marginBottom: '20px', width: '60%' }} />
                        {/* Skeleton for Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            {[1, 2, 3, 4].map(i => (
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
                    <CasesDataWrapper locale={locale} dict={dict} />
                </Suspense>
            </main>
        </div>
    );
}
