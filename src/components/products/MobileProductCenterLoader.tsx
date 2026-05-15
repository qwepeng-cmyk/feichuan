'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const MobileProductCenter = dynamic(() => import('@/components/mobile/MobileProductCenter'), {
    ssr: false,
    loading: () => <MobileProductFallback />
});

function MobileProductFallback() {
    return (
        <div style={{ padding: '20px 15px' }}>
            <div style={{ height: '170px', backgroundColor: '#eef3fa', marginBottom: '18px' }} />
            <div style={{ display: 'flex', gap: '10px', overflow: 'hidden', marginBottom: '24px' }}>
                {[1, 2, 3].map((item) => (
                    <div key={item} style={{ flex: '0 0 32%', height: '64px', backgroundColor: '#f4f6fa' }} />
                ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                {[1, 2, 3, 4].map((item) => (
                    <div key={item} style={{ backgroundColor: '#fff', border: '1px solid #f0f0f0' }}>
                        <div style={{ paddingTop: '75%', backgroundColor: '#f5f5f5' }} />
                        <div style={{ padding: '10px' }}>
                            <div style={{ height: '12px', backgroundColor: '#f0f0f0', width: '80%' }} />
                        </div>
                    </div>
                ))}
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

        fetch(`/api/products?locale=${encodeURIComponent(locale)}`)
            .then((response) => response.json())
            .then((data) => {
                if (!cancelled) setCategoriesData(data);
            })
            .catch(() => {
                if (!cancelled) setCategoriesData({});
            });

        return () => {
            cancelled = true;
        };
    }, [categoriesData, locale, shouldLoad]);

    if (!shouldLoad || !categoriesData) {
        return <MobileProductFallback />;
    }

    return <MobileProductCenter categoriesData={categoriesData} locale={locale} dict={dict} />;
}
