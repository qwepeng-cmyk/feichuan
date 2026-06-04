'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { fetchAccessoriesForClient } from '@/lib/clientAccessories';
import type { CatalogCategory } from './GenericCatalogCenter';

const MobileGenericCatalogCenter = dynamic(() => import('@/components/mobile/MobileGenericCatalogCenter'), {
  ssr: false,
  loading: () => <MobileAccessoryFallback />,
});

function MobileAccessoryFallback({ title }: { title?: string }) {
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
          justifyContent: 'center',
        }}
      >
        {title && (
          <div style={{ color: '#fff', fontSize: '22px', fontWeight: 900, textAlign: 'center', padding: '0 18px' }}>
            {title}
          </div>
        )}
      </section>
      <div style={{ height: '80px', borderBottom: '1px solid #eee', background: '#fff' }} />
      <div style={{ padding: '30px 15px' }}>
        <div style={{ height: '22px', width: '65%', backgroundColor: '#eef3fa', marginBottom: '25px' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          {[1, 2, 3, 4].map((item) => (
            <div key={item} style={{ backgroundColor: '#fff', border: '1px solid #f0f0f0' }}>
              <div style={{ aspectRatio: '4 / 3', backgroundColor: '#f5f5f5' }} />
              <div style={{ padding: '12px' }}>
                <div style={{ height: '12px', backgroundColor: '#f0f0f0', width: '80%', margin: '0 auto' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MobileAccessoryCenterLoader({
  locale,
  dict,
  categories,
}: {
  locale: string;
  dict: any;
  categories: CatalogCategory[];
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
    fetchAccessoriesForClient(locale).then((data) => {
      if (!cancelled) setCategoriesData(data);
    });
    return () => {
      cancelled = true;
    };
  }, [categoriesData, locale, shouldLoad]);

  if (!shouldLoad || !categoriesData) {
    return <MobileAccessoryFallback title={dict.accessories?.bannerTitle} />;
  }

  return (
    <MobileGenericCatalogCenter
      categoriesData={categoriesData}
      categories={categories}
      locale={locale}
      dict={dict}
      bannerTitle={dict.accessories.bannerTitle}
      basePath="/accessories"
    />
  );
}
