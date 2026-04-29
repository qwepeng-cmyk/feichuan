'use client';

import React from 'react';

export default function MobileStickyBar() {
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
            {/* 图 4：Get Solution 按钮 */}
            <a href="/contact" style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: '#4a79d1',
                color: '#fff',
                height: '46px',
                borderRadius: '4px',
                fontSize: '15px',
                fontWeight: 700,
                textDecoration: 'none'
            }}>
                <span style={{ fontSize: '18px' }}>📝</span> Get Solution
            </a>

            {/* 图 4：Online Chat 按钮 */}
            <a href="#" style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: '#ff9800',
                color: '#fff',
                height: '46px',
                borderRadius: '4px',
                fontSize: '15px',
                fontWeight: 700,
                textDecoration: 'none'
            }}>
                <span style={{ fontSize: '18px' }}>💬</span> Online Chat
            </a>
        </div>
    );
}
