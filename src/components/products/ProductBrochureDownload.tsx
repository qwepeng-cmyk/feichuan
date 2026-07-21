'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronDown, Download, FileText, LockKeyhole, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { localePath } from '@/lib/localePath';
import styles from './ProductBrochureDownload.module.css';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

interface ProductBrochureDownloadProps {
  productHandle: string;
  productName: string;
  pageCount: number;
  compact?: boolean;
}

function track(event: string, pathname: string, productHandle: string, inquiryId?: string | null) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    event_category: 'micro_conversion',
    event_label: 'product_brochure',
    page_path: pathname,
    product_handle: productHandle,
    ...(inquiryId ? { inquiry_id: inquiryId } : {}),
  });
}

export default function ProductBrochureDownload({
  productHandle,
  productName,
  pageCount,
  compact = false,
}: ProductBrochureDownloadProps) {
  const pathname = usePathname();
  const emailId = useId();
  const phoneId = useId();
  const emailRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', phone: '', website: '' });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => emailRef.current?.focus(), 80);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSending) setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, isSending]);

  const openModal = () => {
    setError('');
    setIsComplete(false);
    setIsOpen(true);
    track('ntet_product_brochure_open', pathname, productHandle);
  };

  const closeModal = () => {
    if (!isSending) setIsOpen(false);
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSending(true);

    try {
      const response = await fetch('/api/product-brochures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          handle: productHandle,
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          website: formData.website,
          sourcePage: pathname,
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || 'We could not prepare the PDF. Please try again.');
      }

      const blob = await response.blob();
      const fileName = response.headers.get('X-Download-Filename') || `${productHandle}-product-brochure.pdf`;
      const inquiryId = response.headers.get('X-Inquiry-Id');
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1500);

      setIsComplete(true);
      track('ntet_product_brochure_download', pathname, productHandle, inquiryId);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'We could not prepare the PDF. Please try again.');
      track('ntet_product_brochure_error', pathname, productHandle);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className={`${styles.trigger} ${compact ? styles.triggerCompact : ''}`}
        onClick={openModal}
        aria-haspopup="dialog"
      >
        <span className={styles.triggerIcon} aria-hidden="true"><FileText size={compact ? 19 : 22} /></span>
        <span className={styles.triggerCopy}>
          <strong>Download technical brochure</strong>
          <small>PDF · {pageCount} pages · Email required</small>
        </span>
        <Download className={styles.triggerArrow} size={compact ? 19 : 21} aria-hidden="true" />
      </button>

      {mounted && isOpen && createPortal(
        <div className={styles.backdrop} onMouseDown={(event) => event.target === event.currentTarget && closeModal()}>
          <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="brochure-modal-title">
            <div className={styles.modalHeader}>
              <div className={styles.blueprintMark} aria-hidden="true">PDF</div>
              <div>
                <p className={styles.eyebrow}>N-TET / TECHNICAL BRIEF</p>
                <h2 id="brochure-modal-title">Get the product brochure</h2>
              </div>
              <button type="button" className={styles.closeButton} onClick={closeModal} aria-label="Close brochure form">
                <X size={19} />
              </button>
            </div>

            {isComplete ? (
              <div className={styles.successPanel}>
                <span className={styles.successIcon}><Check size={28} /></span>
                <p className={styles.successEyebrow}>DOWNLOAD READY</p>
                <h3>Your PDF is downloading</h3>
                <p>If your browser asks for permission, choose “Allow” to save the brochure.</p>
                <button type="button" className={styles.doneButton} onClick={closeModal}>Done</button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={submit}>
                <div className={styles.fileCard}>
                  <FileText size={25} aria-hidden="true" />
                  <div>
                    <strong>{productName}</strong>
                    <span>English PDF · {pageCount} pages</span>
                  </div>
                </div>

                <p className={styles.helper}>
                  Enter your work email for instant access to the product overview and technical specifications.
                </p>

                <label className={styles.field} htmlFor={emailId}>
                  <span>Work email <b>*</b></span>
                  <input
                    ref={emailRef}
                    id={emailId}
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                    onInvalid={(event) => event.currentTarget.setCustomValidity('Please enter your work email.')}
                    onInput={(event) => event.currentTarget.setCustomValidity('')}
                  />
                </label>

                <details className={styles.optionalDetails}>
                  <summary>
                    <ChevronDown size={16} />
                    <span className={styles.optionalSummaryCopy}>
                      <strong>Add WhatsApp/Phone for a faster reply</strong>
                      <small>(optional)</small>
                    </span>
                  </summary>
                  <label className={styles.field} htmlFor={phoneId}>
                    <span>Phone / WhatsApp</span>
                    <input
                      id={phoneId}
                      type="tel"
                      autoComplete="tel"
                      placeholder="Include country code, e.g. +1 555 123 4567"
                      value={formData.phone}
                      onChange={(event) => setFormData((current) => ({ ...current, phone: event.target.value }))}
                    />
                  </label>
                </details>

                <label className={styles.honeypot} aria-hidden="true">
                  Website
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={(event) => setFormData((current) => ({ ...current, website: event.target.value }))}
                  />
                </label>

                {error && <p className={styles.error} role="alert">{error}</p>}

                <button type="submit" className={styles.submitButton} disabled={isSending}>
                  {isSending ? 'Preparing your PDF…' : 'Download PDF'}
                  {!isSending && <Download size={18} />}
                </button>

                <p className={styles.privacyNote}>
                  <LockKeyhole size={14} aria-hidden="true" />
                  Your details are used only to provide this download and respond about this product. Read our{' '}
                  <Link href={localePath('en', '/privacy-policy')}>Privacy Policy</Link>.
                </p>
              </form>
            )}
          </section>
        </div>,
        document.body
      )}
    </>
  );
}
