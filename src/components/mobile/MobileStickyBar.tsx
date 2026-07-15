'use client';

import React, { useCallback, useState } from 'react';
import { FileText, MessageCircle } from 'lucide-react';
import WhatsAppLeadButton from '@/components/contact/WhatsAppLeadButton';
import MobileQuoteDrawer from './MobileQuoteDrawer';

export default function MobileStickyBar({ dict }: { locale: string; dict: any }) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const closeQuote = useCallback(() => setQuoteOpen(false), []);

  const buttonStyle: React.CSSProperties = {
    flex: '1 1 0',
    minWidth: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    height: '46px',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 700,
    textDecoration: 'none',
    lineHeight: 1.2,
    textAlign: 'center',
    border: 'none',
  };

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
      zIndex: 3000,
    }}>
      <button
        type="button"
        onClick={() => setQuoteOpen(true)}
        style={{ ...buttonStyle, background: '#4a79d1', cursor: 'pointer', fontSize: '12px' }}
      >
        <FileText size={18} aria-hidden="true" />
        {dict.inquiry?.title || 'Get Expert Drone Defense Advice'}
      </button>

      <WhatsAppLeadButton
        sourceLabel="mobile_sticky_whatsapp"
        style={{ ...buttonStyle, background: '#25D366' }}
      >
        <MessageCircle size={18} aria-hidden="true" />
        {dict.products.whatsapp}
      </WhatsAppLeadButton>

      <MobileQuoteDrawer dict={dict} open={quoteOpen} onClose={closeQuote} />
    </div>
  );
}
