'use client';

import React from 'react';

interface Product {
    name: string;
    handle: string;
    image: string;
}

export default function ProductGridCard({ product }: { product: Product }) {
    return (
        <a 
            href={`/products/${product.handle}`} 
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
                overflow: 'hidden'
            }}>
                <img src={product.image} alt={product.name} style={{ 
                    maxWidth: '95%', 
                    maxHeight: '95%', 
                    objectFit: 'contain',
                    transition: 'transform 0.5s ease'
                }} />
            </div>
            <div className="p-card-content" style={{ padding: '25px', textAlign: 'center', borderTop: '1px solid #eee' }}>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#333', margin: 0, transition: 'color 0.3s' }}>{product.name}</h3>
            </div>
        </a>
    );
}
