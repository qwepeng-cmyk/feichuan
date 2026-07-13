import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import SolutionCenterClient from './SolutionCenterClient';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import { buildSeoMetadata } from '@/lib/seoMetadata';
import { getCuasSolutions } from '@/lib/cuasSolutionCatalog';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
    return buildSeoMetadata({
        locale: params.locale,
        path: '/solutions',
        fallbackTitle: 'Integrated C-UAS System Solutions',
        fallbackDescription: 'C-UAS detection, identification, tracking and airspace-monitoring solutions for airports, energy facilities, industrial operations and major public venues.',
    });
}

async function SolutionsDataWrapper({ locale, dict }: { locale: Locale; dict: any }) {
    const pageSolutions = getCuasSolutions(locale);
    
    // Convert to a plain object array for safety during serialization
    const serializedSolutions = pageSolutions.map(s => ({
        id: s.id,
        handle: s.handle,
        title_en: s.title_en,
        product_name_en: s.product_name_en,
        product_name_ru: s.product_name_ru,
        product_name_es: s.product_name_es,
        product_name_ar: s.product_name_ar,
        summary_en: s.summary_en,
        summary_ru: s.summary_ru,
        summary_es: s.summary_es,
        summary_ar: s.summary_ar,
        main_image: s.main_image || undefined,
        category_id: s.category_id
    }));
    const clientDict = {
        inquiry: dict.inquiry,
        solutions: {
            bannerTitle: dict.solutions.bannerTitle,
            bannerSubtitle: dict.solutions.bannerSubtitle,
            exploreAll: dict.solutions.exploreAll,
        },
        solutionCenterGroups: {
            ...(dict.solutionCenterGroups || {}),
        },
    };

    return <SolutionCenterClient allSolutions={serializedSolutions} locale={locale} dict={clientDict} />;
}

export default async function SolutionCenterPage({ params }: { params: { locale: Locale } }) {
    const { locale } = params;
    const dict = await getDictionary(locale);

    return (
        <Suspense fallback={
            <div style={{ padding: '20px 15px' }}>
                <div style={{ height: '120px', backgroundColor: '#f0f0f0', marginBottom: '25px' }} />
                {[1, 2, 3].map(i => (
                    <div key={i} style={{ marginBottom: '25px', backgroundColor: '#fff', border: '1px solid #eee' }}>
                        <div style={{ paddingTop: '56.25%', backgroundColor: '#f5f5f5' }} />
                        <div style={{ padding: '20px' }}>
                            <div style={{ height: '20px', backgroundColor: '#f0f0f0', width: '70%', marginBottom: '10px' }} />
                            <div style={{ height: '14px', backgroundColor: '#f5f5f5', width: '90%' }} />
                        </div>
                    </div>
                ))}
            </div>
        }>
            <SolutionsDataWrapper locale={locale} dict={dict} />
        </Suspense>
    );
}
