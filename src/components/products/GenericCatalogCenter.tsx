import React from 'react';
import Image from 'next/image';
import InquiryForm from '@/components/products/InquiryForm';
import CategoryNav from '@/components/products/CategoryNav';
import ProductGridCard from '@/components/products/ProductGridCard';
import { AccessoryCategoryIcon } from '@/components/products/accessoryCategoryIcons';
import AccessoryCenterSeoContent from '@/components/products/AccessoryCenterSeoContent';

export interface CatalogCategory {
  id: string;
  name: string;
}

export default function GenericCatalogCenter({
  categoriesData,
  categories,
  locale,
  dict,
  bannerTitle,
  bannerDesc,
  basePath,
  bannerImage = '/solutions/solutions/power-line-uav-intelligent-inspection-banner-drone-clarity-v2.webp',
}: {
  categoriesData: Record<string, any[]>;
  categories: CatalogCategory[];
  locale: string;
  dict: any;
  bannerTitle: string;
  bannerDesc: string;
  basePath: '/products' | '/accessories';
  bannerImage?: string;
}) {
  const categoryList = categories.map((category) => ({
    ...category,
    icon: <AccessoryCategoryIcon id={category.id} />,
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
        <Image src={bannerImage} fill sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center 38%', filter: 'saturate(1.04) contrast(1.05)' }} priority alt={bannerTitle} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(5,18,37,0.58) 0%, rgba(5,18,37,0.36) 36%, rgba(5,18,37,0.1) 66%, rgba(5,18,37,0.02) 100%)', zIndex: 1 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '760px' }}>
            <h1 style={{ fontSize: '5.2rem', fontWeight: 900, color: '#fff', marginBottom: '15px', lineHeight: 1.1 }}>{bannerTitle}</h1>
            <p style={{ fontSize: '2rem', color: '#fff', lineHeight: 1.5, opacity: 0.9 }}>{bannerDesc}</p>
          </div>
        </div>
      </section>

      <CategoryNav categories={categoryList} />

      {basePath === '/accessories' && (
        <AccessoryCenterSeoContent locale={locale} />
      )}

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

      {basePath === '/accessories' && (
        <AccessoryCenterSeoContent locale={locale} placement="faq" />
      )}

      <section id="inquiry" style={{ padding: '100px 0', background: '#f8f9fa', borderTop: '1px solid #eee' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <InquiryForm dict={dict} />
        </div>
      </section>
    </div>
  );
}
