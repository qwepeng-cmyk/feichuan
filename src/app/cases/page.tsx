import React from 'react';
import { getAllCases } from '@/lib/cases';
import CasesPageClient from './CasesPageClient';

export default async function CasesPage() {
    // 动态获取所有的真实 Cases 数据
    const cases = await getAllCases();

    return (
        <div className="cases-page" style={{ paddingTop: '114px', backgroundColor: '#fff' }}>
            <main>
                {/* 1. HERO BANNER */}
                <section className="product-banner" style={{
                    height: '40vh',
                minHeight: '320px',
                maxHeight: '450px',
                    backgroundImage: "url('/cases/case_banner_final_副本2.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '1px solid #e1e8f0'
                }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', zIndex: 0 }}></div>
                    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ maxWidth: '800px' }}>
                            <h1 style={{ fontSize: '5.2rem', fontWeight: 900, color: '#fff', marginBottom: '15px', lineHeight: 1.1 }}>Global Case Center</h1>
                            <p style={{ fontSize: '2rem', color: '#fff', lineHeight: 1.5, opacity: 0.95 }}>A global track record of mission success across border patrol, critical facility protection, and emergency rescue operations.</p>
                        </div>
                    </div>
                </section>

                {/* 2. CASE LISTS WITH FILTERS */}
                <CasesPageClient allCases={cases} />
            </main>
        </div>
    );
}
