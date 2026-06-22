'use client';

import React, { useState } from 'react';
import { Send, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { CONTACT_WHATSAPP_URL } from '@/lib/contactSettings';
import styles from './WhatsAppLeadButton.module.css';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

interface WhatsAppLeadButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  sourceLabel?: string;
  ariaLabel?: string;
}

export default function WhatsAppLeadButton({
  children,
  className,
  style,
  sourceLabel = 'whatsapp_cta',
  ariaLabel,
}: WhatsAppLeadButtonProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    countryCode: '+',
    phone: '',
  });

  const track = (event: string, payload: Record<string, unknown> = {}) => {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event,
      event_category: 'lead',
      event_label: sourceLabel,
      page_path: pathname,
      ...payload,
    });
  };

  const openModal = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setError('');
    setIsOpen(true);
    track('ntet_whatsapp_lead_open');
  };

  const closeModal = () => {
    if (isSending) return;
    setIsOpen(false);
  };

  const openWhatsApp = () => {
    const opened = window.open(CONTACT_WHATSAPP_URL, '_blank');
    if (opened) {
      opened.opener = null;
    } else {
      window.location.href = CONTACT_WHATSAPP_URL;
    }
  };

  const submitLead = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const countryCode = formData.countryCode.trim();
    const hasInternationalPrefix = /^\+/.test(phone);
    const hasUsableCountryCode = /^\+\d{1,4}$/.test(countryCode);

    if (!name) {
      setError('Please enter your name before opening WhatsApp.');
      return;
    }

    if (!phone) {
      setError('Please enter your WhatsApp number before continuing.');
      return;
    }

    if (!hasInternationalPrefix && !hasUsableCountryCode) {
      setError('Please enter a country code, or enter the full number with +.');
      return;
    }

    setIsSending(true);
    setIsOpen(false);
    openWhatsApp();

    fetch('/api/whatsapp-leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        ...formData,
        sourceLabel,
        pagePath: pathname,
      }),
    })
      .then(async (response) => {
        const result = await response.json().catch(() => null);
        if (!response.ok || result?.success !== true) {
          throw new Error(result?.error || 'Failed to save WhatsApp lead');
        }
        track('ntet_whatsapp_lead_submit', { inquiry_id: result.inquiryId });
      })
      .catch((err) => {
        console.error('WhatsApp lead capture failed:', err);
        track('ntet_whatsapp_lead_error');
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <>
      <a
        href={CONTACT_WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
        aria-label={ariaLabel}
        onClick={openModal}
      >
        {children}
      </a>

      {isOpen && (
        <div className={styles.modalBackdrop} role="presentation">
          <div className={styles.modalPanel} role="dialog" aria-modal="true" aria-labelledby="whatsapp-lead-title">
            <div className={styles.modalHeader}>
              <div>
                <p className={styles.eyebrow}>WhatsApp Consultation</p>
                <h2 id="whatsapp-lead-title" className={styles.title}>Confirm your contact details</h2>
              </div>
              <button type="button" className={styles.closeButton} onClick={closeModal} aria-label="Close WhatsApp contact form">
                <X size={18} />
              </button>
            </div>

            <form className={styles.form} onSubmit={submitLead}>
              <p className={styles.helper}>
                Leave your WhatsApp number first. Then we will open WhatsApp with a ready-to-send message.
              </p>

              <label className={styles.field}>
                <span className={styles.label}>Name *</span>
                <input
                  className={styles.input}
                  value={formData.name}
                  onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                  autoComplete="name"
                  required
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>WhatsApp / Phone *</span>
                <div className={styles.phoneRow}>
                  <input
                    className={`${styles.input} ${styles.countryCodeInput}`}
                    value={formData.countryCode}
                    onChange={(event) => {
                      const rawValue = event.target.value.replace(/[^\d+]/g, '');
                      const normalizedValue = rawValue.startsWith('+') ? rawValue : `+${rawValue.replace(/\+/g, '')}`;
                      setFormData((prev) => ({ ...prev, countryCode: normalizedValue.slice(0, 5) || '+' }));
                    }}
                    inputMode="tel"
                    autoComplete="tel-country-code"
                    aria-label="Country code"
                  />
                  <input
                    className={styles.input}
                    type="tel"
                    value={formData.phone}
                    onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
                    autoComplete="tel"
                    placeholder="WhatsApp number, or full number with +"
                  />
                </div>
              </label>

              {error && <p className={styles.error}>{error}</p>}

              <div className={styles.actions}>
                <button type="submit" className={styles.submitButton} disabled={isSending}>
                  {isSending ? 'Saving...' : 'Open WhatsApp'}
                  {!isSending && <Send size={16} />}
                </button>
                <span className={styles.note}>
                  The WhatsApp message is pre-filled, but the visitor still needs to press Send.
                </span>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
