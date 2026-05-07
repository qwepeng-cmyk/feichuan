import React from 'react';
import { getAllCases } from '@/lib/cases';
import CasesPageClient from './CasesPageClient';

export default async function CasesPage() {
    // 动态获取所有的真实 Cases 数据
    const cases = await getAllCases();

    return (
        <div className="cases-page" style={{ backgroundColor: '#fff' }}>
            <main>
                {/* 2. CASE LISTS WITH FILTERS */}
                <CasesPageClient allCases={cases} />
            </main>
        </div>
    );
}
