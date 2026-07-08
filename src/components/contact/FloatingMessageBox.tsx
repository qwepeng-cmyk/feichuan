'use client';

import { MessageSquareText, Minus, Send } from 'lucide-react';
import { usePathname } from 'next/navigation';
import type { CSSProperties, FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import styles from './FloatingMessageBox.module.css';

type ChatSettingsResponse = {
  success?: boolean;
  data?: {
    messageBoxEnabled?: boolean;
  };
};

const emptyForm = {
  name: '',
  email: '',
  countryCode: '',
  phone: '',
  message: '',
};

const AUTO_OPEN_DELAY_MS = 20000;
const AUTO_OPEN_SESSION_KEY = 'ntet-floating-message-auto-opened';

export default function FloatingMessageBox() {
  const pathname = usePathname();
  const visitStartedAt = useRef(Date.now());
  const [enabled, setEnabled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [panelHeight, setPanelHeight] = useState<number | null>(null);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    let isMounted = true;
    const mediaQuery = window.matchMedia('(min-width: 992px)');

    const syncDesktopState = () => {
      if (!isMounted) return;
      setIsDesktop(mediaQuery.matches);
    };

    syncDesktopState();
    mediaQuery.addEventListener('change', syncDesktopState);

    return () => {
      isMounted = false;
      mediaQuery.removeEventListener('change', syncDesktopState);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      setEnabled(false);
      setIsVisible(false);
      setMinimized(false);
      setPanelHeight(null);
      return;
    }

    let isMounted = true;

    fetch('/api/site/chat-settings', { cache: 'no-store' })
      .then((res) => res.json())
      .then((json: ChatSettingsResponse) => {
        if (!isMounted) return;
        setEnabled(Boolean(json?.success && json?.data?.messageBoxEnabled));
      })
      .catch(() => {
        if (isMounted) setEnabled(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isDesktop]);

  useEffect(() => {
    if (!enabled || !isDesktop) {
      setIsVisible(false);
      setMinimized(false);
      return;
    }

    if (isVisible) return;

    if (window.sessionStorage.getItem(AUTO_OPEN_SESSION_KEY) === 'true') {
      setIsVisible(true);
      return;
    }

    const elapsed = Date.now() - visitStartedAt.current;
    const delay = Math.max(0, AUTO_OPEN_DELAY_MS - elapsed);
    const autoOpenTimer = window.setTimeout(() => {
      window.sessionStorage.setItem(AUTO_OPEN_SESSION_KEY, 'true');
      setIsVisible(true);
    }, delay);

    return () => {
      window.clearTimeout(autoOpenTimer);
    };
  }, [enabled, isDesktop, isVisible]);

  useEffect(() => {
    if (!enabled || !isDesktop) return;

    const measurePanelHeight = () => {
      const topButton = document.querySelector<HTMLElement>('[aria-label="Quick contact"] [aria-label="Back to top"]');
      if (!topButton) return;

      const topButtonTop = topButton.getBoundingClientRect().top;
      const nextHeight = Math.max(320, Math.round(window.innerHeight - topButtonTop - 2));
      setPanelHeight(nextHeight);
    };

    measurePanelHeight();
    const firstTimer = window.setTimeout(measurePanelHeight, 250);
    const secondTimer = window.setTimeout(measurePanelHeight, 900);
    window.addEventListener('resize', measurePanelHeight);

    return () => {
      window.clearTimeout(firstTimer);
      window.clearTimeout(secondTimer);
      window.removeEventListener('resize', measurePanelHeight);
    };
  }, [enabled, isDesktop]);

  const submitMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);
    setStatus('idle');
    setErrorMessage('');

    const phone = formData.phone.trim();
    const countryCode = formData.countryCode.trim();
    const hasInternationalPrefix = /^\+/.test(phone);
    const hasUsableCountryCode = /^\+\d{1,4}$/.test(countryCode);

    if (!hasInternationalPrefix && !hasUsableCountryCode) {
      setErrorMessage('Please add a country code, or enter the full number with +.');
      setStatus('error');
      setIsSending(false);
      return;
    }

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone,
          contactMethod: 'Floating Message',
          countryCode: hasInternationalPrefix ? '' : countryCode,
          demands: ['Floating message box'],
          message: formData.message.trim(),
          sourcePage: `floating_message_box:${pathname}`,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || result?.success !== true || !result?.inquiryId) {
        throw new Error(result?.error || 'Failed to submit message');
      }

      setFormData(emptyForm);
      setStatus('success');
    } catch (error) {
      console.error('Floating message submit failed:', error);
      setErrorMessage('Could not submit. Please try again or contact us by WhatsApp.');
      setStatus('error');
    } finally {
      setIsSending(false);
    }
  };

  if (!enabled || !isVisible) return null;

  const shellStyle = panelHeight
    ? ({ '--floating-message-height': `${panelHeight}px` } as CSSProperties)
    : undefined;

  return (
    <aside className={styles.shell} style={shellStyle} aria-label="Floating message box">
      {minimized ? (
        <button type="button" className={styles.minimized} onClick={() => setMinimized(false)}>
          <MessageSquareText size={20} />
          <span>Leave a Message</span>
        </button>
      ) : (
        <div className={styles.panel} role="dialog" aria-label="Leave a message">
          <div className={styles.header}>
              <div>
                <p className={styles.eyebrow}>Quick Message</p>
              <h2 className={styles.title}>Find the Right C-UAS Setup for Your Site</h2>
              <p className={styles.headerText}>Tell us your site type, project stage, or equipment needs. We can send suitable options, specs, or a quick quotation.</p>
            </div>
            <button type="button" className={styles.iconButton} onClick={() => setMinimized(true)} aria-label="Minimize message box">
              <Minus size={18} />
            </button>
          </div>

          <form className={styles.form} onSubmit={submitMessage}>
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
              <span className={styles.label}>Email *</span>
              <input
                className={styles.input}
                type="email"
                value={formData.email}
                onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                autoComplete="email"
                placeholder="you@example.com"
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
                    setFormData((prev) => ({ ...prev, countryCode: normalizedValue.slice(0, 5) }));
                  }}
                  inputMode="tel"
                  autoComplete="tel-country-code"
                  placeholder="e.g. +1"
                  aria-label="Country code"
                />
                <input
                  className={styles.input}
                  type="tel"
                  value={formData.phone}
                  onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
                  autoComplete="tel"
                  placeholder="WhatsApp number, or full number with +"
                  required
                />
              </div>
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Message *</span>
              <textarea
                className={styles.textarea}
                value={formData.message}
                onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value.slice(0, 700) }))}
                placeholder="Example: airport perimeter, prison, border site, event security, or request brochure / specs / quotation."
                required
              />
            </label>

            {status === 'success' && <p className={styles.success}>Message received. Our team will get back to you soon.</p>}
            {status === 'error' && <p className={styles.error}>{errorMessage}</p>}
            <p className={styles.note}>A short message is enough. Our team can follow up by email or WhatsApp.</p>

            <button type="submit" className={styles.submitButton} disabled={isSending}>
              <Send size={16} />
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      )}
    </aside>
  );
}
