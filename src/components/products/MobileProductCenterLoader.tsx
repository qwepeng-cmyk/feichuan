'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { fetchProductsForClient } from '@/lib/clientProducts';

const MobileProductCenter = dynamic(() => import('@/components/mobile/MobileProductCenter'), {
    ssr: false,
    loading: () => <MobileProductFallback />
});

function MobileProductFallback({ dict }: { dict?: any }) {
    return (
        <div style={{ width: '100%', background: '#fff', paddingTop: '108px' }}>
            <section
                style={{
                    height: '120px',
                    width: '100%',
                    backgroundImage: "linear-gradient(90deg, rgba(5,18,37,0.72), rgba(5,18,37,0.18)), url('/solutions/solutions/power-line-uav-intelligent-inspection-banner-drone-clarity-v2.webp')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 38%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {dict?.products?.bannerTitle && (
                    <div
                        style={{
                            color: '#fff',
                            fontSize: '22px',
                            fontWeight: 900,
                            letterSpacing: '2px',
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                            margin: 0,
                            textAlign: 'center'
                        }}
                    >
                        {dict.products.bannerTitle}
                    </div>
                )}
            </section>
            <div style={{ height: '80px', borderBottom: '1px solid #eee', background: '#fff', overflow: 'hidden' }}>
                <div style={{ display: 'flex', gap: '8px', padding: '10px 5px', height: '100%', alignItems: 'center' }}>
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} style={{ width: '88px', flex: '0 0 auto' }}>
                            <div style={{ width: '32px', height: '32px', margin: '0 auto 8px', backgroundColor: '#eef3fa' }} />
                            <div style={{ height: '10px', backgroundColor: '#f4f6fa' }} />
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ padding: '30px 15px' }}>
                <div style={{ marginBottom: '25px', borderLeft: '4px solid #315ba4', paddingLeft: '15px' }}>
                    <div style={{ height: '22px', width: '65%', backgroundColor: '#eef3fa' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} style={{ backgroundColor: '#fff', border: '1px solid #f0f0f0' }}>
                            <div style={{ aspectRatio: '4 / 3', backgroundColor: '#f5f5f5' }} />
                            <div style={{ padding: '12px', minHeight: '58px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ height: '12px', backgroundColor: '#f0f0f0', width: '80%', margin: '0 auto' }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function MobileProductCenterLoader({
    locale,
    dict
}: {
    locale: string;
    dict: any;
}) {
    const [shouldLoad, setShouldLoad] = useState(false);
    const [categoriesData, setCategoriesData] = useState<any>(null);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 991px)');
        const update = () => setShouldLoad(mediaQuery.matches);

        update();
        mediaQuery.addEventListener('change', update);
        return () => mediaQuery.removeEventListener('change', update);
    }, []);

    useEffect(() => {
        if (!shouldLoad || categoriesData) return;

        let cancelled = false;

        fetchProductsForClient(locale)
            .then((data) => {
                if (!cancelled) setCategoriesData(data);
            });

        return () => {
            cancelled = true;
        };
    }, [categoriesData, locale, shouldLoad]);

    if (!shouldLoad || !categoriesData) {
        return <MobileProductFallback dict={dict} />;
    }

    return <MobileProductCenter categoriesData={categoriesData} locale={locale} dict={dict} />;
}
