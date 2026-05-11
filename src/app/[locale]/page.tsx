import React from 'react';
import dynamic from 'next/dynamic';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';

// Use dynamic imports with no SSR for the client-side toggle to ensure only one version is processed
const DesktopHome = dynamic(() => import('@/components/pc/DesktopHome'), { 
    ssr: true,
    loading: () => <div style={{ minHeight: '100vh', background: '#fff' }} />
});
const MobileHome = dynamic(() => import('@/components/mobile/MobileHome'), { 
    ssr: true,
    loading: () => <div style={{ minHeight: '100vh', background: '#fff' }} />
});

export default async function Page({ params }: { params: { locale: Locale } }) {
    const { locale } = params;
    const dict = await getDictionary(locale);

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

            {/* In a real Next.js environment, we'd ideally use a more advanced strategy 
                to prevent the hidden component from even initializing its JS, 
                but separating them into dynamic chunks already helps significantly 
                by reducing the initial main bundle size. */}
            <div className="pc_only">
                <DesktopHome locale={locale} dict={dict} />
            </div>

            <div className="mobile_only">
                <MobileHome locale={locale} dict={dict} />
            </div>
        </>
    );
}
