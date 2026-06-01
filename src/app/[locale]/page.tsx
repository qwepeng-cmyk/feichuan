import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import { getAllMedia } from '@/lib/media';
import { getAllCases } from '@/lib/cases';

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
    const homeCases = (await getAllCases()).slice(0, 6).map((item: any) => ({
        handle: item.handle,
        title: item.title_en,
        title_ru: item.title_en,
        img: item.main_image,
    }));

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
