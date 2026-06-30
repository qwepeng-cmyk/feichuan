import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import { getAllMedia } from '@/lib/media';
import { homeCases } from '@/constants/homeData';
import { buildSeoMetadata } from '@/lib/seoMetadata';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
    return buildSeoMetadata({
        locale: params.locale,
        path: '/',
        fallbackTitle: 'Industrial UAV & C-UAS Systems',
        fallbackDescription: 'Industrial UAV platforms, C-UAS detection systems, low-altitude airspace monitoring, and security screening equipment for infrastructure and public-site operators.',
    });
}

// Use dynamic imports
const DesktopHome = dynamic(() => import('@/components/pc/DesktopHome'), { 
    ssr: true,
    loading: () => <div style={{ minHeight: '100vh', background: '#fff' }} />
});
const MobileHome = dynamic(() => import('@/components/mobile/MobileHome'), { 
    ssr: true,
    loading: () => <div style={{ minHeight: '100vh', background: '#fff' }} />
});

// 1. Home Content Component (Streaming)
async function HomeContent({ locale }: { locale: Locale }) {
    const dict = await getDictionary(locale);
    const latestNews = (await getAllMedia()).slice(0, 5);

    return (
        <>
            <div className="pc_only">
                <DesktopHome locale={locale} dict={dict} latestNews={latestNews.slice(0, 3)} homeCases={homeCases} />
            </div>

            <div className="mobile_only">
                <MobileHome locale={locale} dict={dict} latestNews={latestNews} homeCases={homeCases} />
            </div>
        </>
    );
}

// 2. Entry Page Component (Instant Navigation)
export default async function Page({ params }: { params: { locale: Locale } }) {
    const { locale } = params;

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: `
                .pc_only { display: block; }
                .mobile_only { display: none; }

                @media (max-width: 991px) {
                    .pc_only { display: none !important; }
                    .mobile_only { display: block !important; }
                }
            `}} />

            <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: '#fff' }} />}>
                <HomeContent locale={locale} />
            </Suspense>
        </>
    );
}
