import Image from 'next/image';
import Link from 'next/link';

interface Product {
    name: string;
    product_name_en?: string;
    product_name_ru?: string;
    name_en?: string;
    name_ru?: string;
    handle: string;
    image: string;
}

export default function ProductGridCard({ product, locale, dict, priority = false }: { product: Product; locale?: string; dict?: any; priority?: boolean }) {
    const l = (path: string) => locale ? `/${locale}${path === '/' ? '' : path}` : path;
    const prodName = locale === 'ru' ? (product.product_name_ru || product.name_ru || product.name) : (product.product_name_en || product.name_en || product.name);

    return (
        <Link prefetch={false} 
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
                    src={product.image || '/logo1-small.webp'} 
                    alt={prodName} 
                    fill
                    style={{ 
                        padding: '15px',
                        objectFit: 'contain',
                        transition: 'transform 0.5s ease'
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


