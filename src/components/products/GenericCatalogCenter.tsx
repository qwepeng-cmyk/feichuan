import React from 'react';
import Image from 'next/image';
import InquiryForm from '@/components/products/InquiryForm';
import CategoryNav from '@/components/products/CategoryNav';
import ProductGridCard from '@/components/products/ProductGridCard';

export interface CatalogCategory {
  id: string;
  name: string;
}

function AccessoryIcon({ id }: { id: string }) {
  const common = { viewBox: '0 0 48 48', fill: 'none', stroke: '#315ba4', strokeWidth: 1.6 };
  if (id.includes('gimbal')) {
    return <svg {...common}><circle cx="24" cy="24" r="12" /><path d="M12 24H6m36 0h-6M24 12V6m0 36v-6" /><circle cx="24" cy="24" r="5" fill="rgba(49,91,164,0.12)" /></svg>;
  }
  if (id.includes('engine') || id.includes('motor')) {
    return <svg {...common}><circle cx="24" cy="24" r="13" /><circle cx="24" cy="24" r="5" fill="rgba(49,91,164,0.12)" /><path d="M24 11v26M11 24h26M15 15l18 18M33 15L15 33" /></svg>;
  }
  if (id.includes('data')) {
    return <svg {...common}><rect x="10" y="16" width="28" height="16" rx="2" /><path d="M15 24h18M18 12c4-4 12-4 16 0M14 38c6 4 14 4 20 0" /></svg>;
  }
  if (id.includes('propeller')) {
    return <svg {...common}><circle cx="24" cy="24" r="3" fill="#315ba4" /><path d="M24 21c-8-9-16-8-18-3 5 4 12 5 21 6M24 27c8 9 16 8 18 3-5-4-12-5-21-6" /></svg>;
  }
  if (id.includes('batter')) {
    return <svg {...common}><rect x="9" y="15" width="30" height="20" rx="2" /><path d="M39 21h3v8h-3M16 25h16M24 18v14" /></svg>;
  }
  if (id.includes('remote')) {
    return <svg {...common}><rect x="10" y="14" width="28" height="24" rx="4" /><circle cx="18" cy="25" r="3" /><circle cx="30" cy="25" r="3" /><path d="M20 11h8M24 11V6" /></svg>;
  }
  return <svg {...common}><rect x="12" y="12" width="24" height="24" rx="3" /><path d="M18 18h12v12H18zM8 18h4m-4 12h4m36-12h-4m4 12h-4M18 8v4m12-4v4m-12 36v-4m12 4v-4" /></svg>;
}

export default function GenericCatalogCenter({
  categoriesData,
  categories,
  locale,
  dict,
  bannerTitle,
  bannerDesc,
  basePath,
}: {
  categoriesData: Record<string, any[]>;
  categories: CatalogCategory[];
  locale: string;
  dict: any;
  bannerTitle: string;
  bannerDesc: string;
  basePath: '/products' | '/accessories';
}) {
  const categoryList = categories.map((category) => ({
    ...category,
    icon: <AccessoryIcon id={category.id} />,
  }));

  return (
    <div className="product-page-new" style={{ paddingTop: '112px' }}>
      <section className="product-banner" style={{
        height: '40vh',
        minHeight: '320px',
        maxHeight: '450px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Image src="/solutions/solutions/power-line-uav-intelligent-inspection-banner-drone-clarity-v2.webp" fill sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center 38%', filter: 'saturate(1.04) contrast(1.05)' }} priority alt={bannerTitle} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(5,18,37,0.58) 0%, rgba(5,18,37,0.36) 36%, rgba(5,18,37,0.1) 66%, rgba(5,18,37,0.02) 100%)', zIndex: 1 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '760px' }}>
            <h1 style={{ fontSize: '5.2rem', fontWeight: 900, color: '#fff', marginBottom: '15px', lineHeight: 1.1 }}>{bannerTitle}</h1>
            <p style={{ fontSize: '2rem', color: '#fff', lineHeight: 1.5, opacity: 0.9 }}>{bannerDesc}</p>
          </div>
        </div>
      </section>

      <CategoryNav categories={categoryList} />

      <div className="product-lists-wrap" style={{ padding: '60px 0' }}>
        {categories.map((category) => (
          <section key={category.id} id={category.id} style={{ marginBottom: '100px', scrollMarginTop: '300px' }}>
            <div className="container">
              <div className="section-title-wrap" style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '3.4rem', fontWeight: 800, color: '#333', textTransform: 'uppercase', letterSpacing: '2px' }}>{category.name}</h2>
                <div style={{ width: '60px', height: '4px', background: '#315ba4', margin: '20px auto' }} />
              </div>
              <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
                {(categoriesData[category.id] || []).map((product, idx) => (
                  <ProductGridCard key={product.handle} product={product} locale={locale} dict={dict} priority={idx < 3} basePath={basePath} />
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <section id="inquiry" style={{ padding: '100px 0', background: '#f8f9fa', borderTop: '1px solid #eee' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <InquiryForm dict={dict} />
        </div>
      </section>
    </div>
  );
}
