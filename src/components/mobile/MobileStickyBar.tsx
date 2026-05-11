import React from 'react';
import Link from 'next/link';

export default function MobileStickyBar({ locale, dict }: { locale: string; dict: any }) {
    const l = (path: string) => locale === 'en' ? path : `/${locale}${path === '/' ? '' : path}`;

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '70px',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            padding: '0 15px',
            gap: '12px',
            boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
            zIndex: 3000
        }}>
            {/* Get Solution */}
            <Link href={l("/contact")} style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: '#4a79d1',
                color: '#fff',
                height: '46px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none'
            }}>
                <span style={{ fontSize: '18px' }}>📝</span> {dict.products.getSolution}
            </Link>

            {/* WhatsApp / Chat */}
            <a href="https://wa.me/8615011035546" target="_blank" style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: '#ff9800',
                color: '#fff',
                height: '46px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none'
            }}>
                <span style={{ fontSize: '18px' }}>💬</span> {dict.products.whatsapp}
            </a>
        </div>
    );
}
