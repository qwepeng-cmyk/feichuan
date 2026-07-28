'use client';

import React, { useCallback, useState } from 'react';
import { FileText, MessageCircle } from 'lucide-react';
import PrimaryContactButton from '@/components/contact/PrimaryContactButton';
import MobileQuoteDrawer from './MobileQuoteDrawer';

export default function MobileStickyBar({ dict }: { locale: string; dict: any }) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const closeQuote = useCallback(() => setQuoteOpen(false), []);

  const buttonStyle: React.CSSProperties = {
    flex: '1 1 0',
    minWidth: 0,
    position: 'relative',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '52px',
    padding: '0 7px 0 29px',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '11.5px',
    fontWeight: 700,
    textDecoration: 'none',
    lineHeight: 1.2,
    textAlign: 'center',
    border: 'none',
    overflow: 'hidden',
  };

  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    left: '9px',
    top: '50%',
    flexShrink: 0,
    transform: 'translateY(-50%)',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    minWidth: 0,
    lineHeight: 1.15,
    overflowWrap: 'break-word',
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
      height: '78px',
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
        style={{ ...buttonStyle, background: '#4a79d1', cursor: 'pointer', fontSize: '11.5px' }}
      >
        <FileText size={15} style={iconStyle} aria-hidden="true" />
        <span style={labelStyle}>{dict.inquiry?.title || 'Get Expert Drone Defense Advice'}</span>
      </button>

      <PrimaryContactButton
        sourceLabel="mobile_sticky_whatsapp"
        style={{ ...buttonStyle, background: 'var(--contact-channel-accent)' }}
      >
        <MessageCircle size={15} style={iconStyle} aria-hidden="true" />
        <span style={labelStyle}>{dict.products.whatsapp}</span>
      </PrimaryContactButton>

      <MobileQuoteDrawer dict={dict} open={quoteOpen} onClose={closeQuote} />
    </div>
  );
}
