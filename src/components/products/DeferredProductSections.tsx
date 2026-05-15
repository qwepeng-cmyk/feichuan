'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface CategoryMeta {
    id: string;
    name: string;
}

interface Product {
    name: string;
    handle: string;
    image: string;
}

function ProductCard({ product, locale }: { product: Product; locale: string }) {
    return (
        <Link
            prefetch={false}
            href={`/${locale}/products/${product.handle}`}
            className="p-card-sbm"
            style={{
                display: 'block',
                background: '#fff',
                border: '1px solid #f0f0f0',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                overflow: 'hidden'
            }}
        >
            <div className="p-card-img" style={{
                width: '100%',
                aspectRatio: '1.618 / 1',
                background: '#f8f9fa',
                padding: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative'
            }}>
                <Image
                    src={product.image || '/logo1.webp'}
                    alt={product.name}
                    fill
                    style={{
                        padding: '15px',
                        objectFit: 'contain',
                        transition: 'transform 0.5s ease'
                    }}
                    sizes="(max-width: 1200px) 33vw, 25vw"
                />
            </div>
            <div className="p-card-content" style={{ padding: '25px', textAlign: 'center', borderTop: '1px solid #eee' }}>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#333', margin: 0, transition: 'color 0.3s' }}>{product.name}</h3>
            </div>
        </Link>
    );
}

function ProductSkeleton() {
    return (
        <div style={{ background: '#fff', border: '1px solid #f0f0f0', overflow: 'hidden' }}>
            <div style={{ aspectRatio: '1.618 / 1', background: '#f5f5f5' }} />
            <div style={{ padding: '25px', borderTop: '1px solid #eee' }}>
                <div style={{ height: '18px', width: '70%', margin: '0 auto', background: '#f0f0f0' }} />
            </div>
        </div>
    );
}

export default function DeferredProductSections({
    categories,
    locale
}: {
    categories: CategoryMeta[];
    locale: string;
}) {
    const [categoriesData, setCategoriesData] = useState<Record<string, Product[]> | null>(null);

    useEffect(() => {
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
    }, [locale]);

    return (
        <>
            {categories.map((category) => (
                <section key={category.id} id={category.id} style={{ marginBottom: '100px', scrollMarginTop: '300px' }}>
                    <div className="container">
                        <div className="section-title-wrap" style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <h2 style={{ fontSize: '3.4rem', fontWeight: 800, color: '#333', textTransform: 'uppercase', letterSpacing: '2px' }}>{category.name}</h2>
                            <div style={{ width: '60px', height: '4px', background: '#315ba4', margin: '20px auto' }}></div>
                        </div>

                        <div className="product-grid" style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '30px'
                        }}>
                            {categoriesData
                                ? categoriesData[category.id]?.map((product) => (
                                    <ProductCard key={product.handle} product={product} locale={locale} />
                                ))
                                : [1, 2, 3].map((item) => <ProductSkeleton key={item} />)}
                        </div>
                    </div>
                </section>
            ))}
        </>
    );
}
