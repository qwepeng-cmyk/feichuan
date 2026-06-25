'use client';

import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { usePathname } from 'next/navigation';
import WhatsAppLeadButton from './WhatsAppLeadButton';
import styles from './DesktopFloatingContact.module.css';

type FloatingContactProps = {
  dict?: any;
};

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 16 16" width="25" height="25" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M13.6 2.33A7.85 7.85 0 0 0 7.99 0C3.63 0 .07 3.56.06 7.93c0 1.4.37 2.76 1.06 3.96L0 16l4.2-1.1a7.93 7.93 0 0 0 3.79.96h.01c4.37 0 7.92-3.55 7.93-7.93a7.9 7.9 0 0 0-2.33-5.6ZM8 14.52a6.57 6.57 0 0 1-3.36-.92l-.24-.14-2.49.65.66-2.43-.15-.25a6.56 6.56 0 0 1-1.01-3.5A6.6 6.6 0 0 1 8 1.34a6.55 6.55 0 0 1 4.66 1.93 6.56 6.56 0 0 1 1.93 4.66A6.6 6.6 0 0 1 8 14.52Zm3.61-4.93c-.2-.1-1.17-.58-1.35-.65-.18-.06-.32-.1-.45.1-.13.2-.51.65-.63.78-.11.13-.23.15-.43.05-.2-.1-.84-.31-1.59-.99-.59-.52-.99-1.17-1.1-1.37-.12-.2-.01-.3.09-.4.09-.09.2-.23.3-.35.1-.11.13-.2.2-.33.06-.13.03-.25-.02-.35-.05-.1-.45-1.07-.61-1.47-.16-.39-.32-.34-.45-.34h-.38c-.13 0-.35.05-.53.25-.18.2-.69.68-.69 1.65 0 .98.71 1.92.81 2.05.1.13 1.39 2.13 3.38 2.99.47.2.84.33 1.13.42.48.15.9.13 1.25.08.38-.06 1.17-.48 1.34-.94.16-.47.16-.86.11-.94-.05-.08-.18-.13-.38-.23Z"
      />
    </svg>
  );
}

export default function DesktopFloatingContact({ dict }: FloatingContactProps) {
  const pathname = usePathname();
  const labels = dict?.inquiry || {};
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '',
    whatsapp: '',
    message: '',
  });

  const submitMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const countryCode = formData.countryCode.trim();

    if (!/^\+\d{1,4}$/.test(countryCode)) {
      alert('Please enter a valid country code, for example +86.');
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          company: '',
          email: formData.email,
          contactMethod: 'WhatsApp',
          countryCode,
          phone: formData.whatsapp,
          demands: ['Desktop floating message'],
          message: formData.message,
          pagePath: pathname,
        }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || result?.success !== true) {
        throw new Error(result?.error || 'Message submit failed');
      }

      setStatus('sent');
      setFormData({ name: '', email: '', countryCode: '', whatsapp: '', message: '' });
    } catch (error) {
      console.error('Floating message submit failed:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <aside className={`${styles.shell} ${isOpen ? styles.open : ''}`} aria-label="Quick contact">
      <div className={styles.actions}>
        <WhatsAppLeadButton
          sourceLabel="desktop_floating_whatsapp"
          className={`${styles.actionButton} ${styles.whatsapp}`}
          ariaLabel="Open WhatsApp contact"
        >
          <WhatsAppIcon />
          <span>WhatsApp</span>
        </WhatsAppLeadButton>

        <button
          type="button"
          className={`${styles.actionButton} ${styles.message}`}
          aria-expanded={isOpen}
          aria-controls="desktop-floating-message-panel"
          onClick={() => {
            setIsOpen((current) => !current);
            if (!isOpen) setStatus('idle');
          }}
        >
          <Mail size={25} strokeWidth={2.4} />
          <span>Message</span>
        </button>
      </div>

      <div id="desktop-floating-message-panel" className={styles.panel} aria-hidden={!isOpen}>
        {status === 'sent' ? (
          <div className={styles.success}>
            <strong>{labels.submitted?.title || 'SUBMITTED SUCCESSFULLY!'}</strong>
            <p>{labels.submitted?.subtitle || 'Thank you. Our team will get back to you soon.'}</p>
            <button type="button" onClick={() => setStatus('idle')}>
              {labels.submitted?.backButton || 'Send Another Message'}
            </button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={submitMessage}>
            <input
              type="text"
              name="name"
              placeholder={`${labels.name || 'Your Name'} *`}
              value={formData.name}
              onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
              autoComplete="name"
              required
            />
            <input
              type="email"
              name="email"
              placeholder={`${labels.email || 'Email'} *`}
              value={formData.email}
              onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
              autoComplete="email"
              required
            />
            <div className={styles.phoneRow}>
              <input
                type="tel"
                name="countryCode"
                placeholder={`${labels.countryCode || 'Country Code'} *`}
                value={formData.countryCode}
                onChange={(event) => {
                  const rawValue = event.target.value.replace(/[^\d+]/g, '');
                  const normalizedValue = rawValue.startsWith('+') ? rawValue : `+${rawValue.replace(/\+/g, '')}`;
                  setFormData((prev) => ({ ...prev, countryCode: normalizedValue.slice(0, 5) }));
                }}
                inputMode="tel"
                autoComplete="tel-country-code"
                required
                aria-label={labels.countryCode || 'Country Code'}
              />
              <input
                type="tel"
                name="whatsapp"
                placeholder="WhatsApp *"
                value={formData.whatsapp}
                onChange={(event) => setFormData((prev) => ({ ...prev, whatsapp: event.target.value }))}
                inputMode="tel"
                autoComplete="tel"
                required
              />
            </div>
            <span className={styles.privacy}>Your privacy is important to us - we never sell or share your information.</span>
            <textarea
              name="message"
              placeholder={`${labels.messageLabel || 'Message'} *`}
              value={formData.message}
              onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
              required
            />
            <button type="submit" className={styles.submitButton} disabled={isSending}>
              {isSending ? 'Sending...' : 'Send Now!'}
              {!isSending && <Send size={17} strokeWidth={2.5} />}
            </button>
          </form>
        )}
      </div>
    </aside>
  );
}
