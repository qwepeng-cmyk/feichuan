'use client';

import Image from 'next/image';

interface Product {
    name: string;
    product_name_en?: string;
    product_name_ru?: string;
    name_en?: string;
    name_ru?: string;
    handle: string;
    image: string;
}

export default function ProductGridCard({ product, locale, dict }: { product: Product; locale?: string; dict?: any }) {
    const l = (path: string) => locale ? `/${locale}${path === '/' ? '' : path}` : path;
    const prodName = locale === 'ru' ? (product.product_name_ru || product.name_ru || product.name) : (product.product_name_en || product.name_en || product.name);

    return (
        <a 
            href={l(`/products/${product.handle}`)} 
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
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderColor = '#315ba4';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#f0f0f0';
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
                    src={product.image || '/logo1.png'} 
                    alt={prodName} 
                    fill
                    style={{ 
                        padding: '15px',
                        objectFit: 'contain',
                        transition: 'transform 0.5s ease'
                    }} 
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
            </div>
            <div className="p-card-content" style={{ padding: '25px', textAlign: 'center', borderTop: '1px solid #eee' }}>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#333', margin: 0, transition: 'color 0.3s' }}>{prodName}</h3>
            </div>
        </a>
    );
}
