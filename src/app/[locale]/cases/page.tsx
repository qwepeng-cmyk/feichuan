import React from 'react';
import { getAllCases } from '@/lib/cases';
import CasesPageClient from './CasesPageClient';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';

export default async function CasesPage({ params }: { params: { locale: Locale } }) {
    const { locale } = params;
    const cases = await getAllCases();
    const dict = await getDictionary(locale);

    return (
        <div className="cases-page" style={{ backgroundColor: '#fff', paddingTop: '112px' }}>
            <main>
                <CasesPageClient allCases={cases} locale={locale} dict={dict} />
            </main>
        </div>
    );
}
