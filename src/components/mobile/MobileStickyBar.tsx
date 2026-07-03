import React from 'react';
import Link from 'next/link';
import WhatsAppLeadButton from '@/components/contact/WhatsAppLeadButton';

export default function MobileStickyBar({ locale, dict }: { locale: string; dict: any }) {
    const l = (path: string) => locale === 'en' ? path : `/${locale}${path === '/' ? '' : path}`;

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            width: 'auto',
            maxWidth: '100vw',
            boxSizing: 'border-box',
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
                flex: '1 1 0',
                minWidth: 0,
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
                textDecoration: 'none',
                lineHeight: 1.2,
                textAlign: 'center'
            }}>
                <span style={{ fontSize: '18px' }}>📝</span> {dict.products.getSolution}
            </Link>

            {/* WhatsApp / Chat */}
            <WhatsAppLeadButton sourceLabel="mobile_sticky_whatsapp" style={{
                flex: '1 1 0',
                minWidth: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: '#25D366',
                color: '#fff',
                height: '46px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none',
                lineHeight: 1.2,
                textAlign: 'center'
            }}>
                <span style={{ fontSize: '18px' }}>💬</span> {dict.products.whatsapp}
            </WhatsAppLeadButton>
        </div>
    );
}
