'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { localePath } from '@/lib/localePath';
import { withStaticAssetVersion } from '@/lib/assetVersion';
import { localizedField } from '@/lib/localization';

interface Product {
    name: string;
    product_name_en?: string;
    product_name_ru?: string;
    product_name_es?: string;
    product_name_ar?: string;
    name_en?: string;
    name_ru?: string;
    name_es?: string;
    name_ar?: string;
    handle: string;
    image: string;
}

function shouldBlendImageBackground(image?: string) {
    return Boolean(image?.includes('/products/aerial-systems/'));
}

export default function ProductGridCard({
    product,
    locale,
    dict,
    priority = false,
}: {
    product: Product;
    locale?: string;
    dict?: any;
    priority?: boolean;
}) {
    const [hovered, setHovered] = useState(false);
    const prodName = localizedField(product, 'product_name', locale) || localizedField(product, 'name', locale) || product.name;
    const blendImageBackground = shouldBlendImageBackground(product.image);
    const imagePadding = blendImageBackground ? '15px' : '5px';
    const imageTransform = hovered && !blendImageBackground ? 'scale(1.05)' : 'scale(1)';

    return (
        <Link prefetch={false}
            href={localePath(locale, `/products/${product.handle}`)}
            className="p-card-sbm"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
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
                padding: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
                isolation: 'isolate'
            }}>
                <Image
                    src={withStaticAssetVersion(product.image || '/logo1-small.webp')}
                    alt={prodName}
                    fill
                    style={{ 
                        padding: imagePadding,
                        objectFit: 'contain',
                        transition: 'transform 0.5s ease',
                        transform: imageTransform,
                        mixBlendMode: blendImageBackground ? 'multiply' : 'normal'
                    }} 
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    priority={priority}
                />
            </div>
            <div className="p-card-content" style={{ padding: '25px', textAlign: 'center', borderTop: '1px solid #eee' }}>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#333', margin: 0, transition: 'color 0.3s' }}>{prodName}</h3>
            </div>
        </Link>
    );
}
