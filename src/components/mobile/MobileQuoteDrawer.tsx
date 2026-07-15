'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { getInquiryFormUxCopy } from '@/lib/inquiryFormUx';
import MobileInquiryForm from './MobileInquiryForm';
import styles from './MobileQuoteDrawer.module.css';

type MobileQuoteDrawerProps = {
  dict: any;
  open: boolean;
  onClose: () => void;
};

export default function MobileQuoteDrawer({ dict, open, onClose }: MobileQuoteDrawerProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const ux = getInquiryFormUxCopy(pathname);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className={styles.backdrop} role="presentation" onMouseDown={onClose}>
      <div
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-quote-title"
        tabIndex={-1}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className={styles.handle} aria-hidden="true" />
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>N-TET · C-UAS</p>
            <h2 id="mobile-quote-title" className={styles.title}>
              {dict?.inquiry?.title || 'Get Expert Drone Defense!'}
            </h2>
          </div>
          <button type="button" className={styles.close} onClick={onClose} aria-label={ux.closeQuote}>
            <X size={20} />
          </button>
        </header>
        <div className={styles.content}>
          <MobileInquiryForm dict={dict} variant="drawer" />
        </div>
      </div>
    </div>,
    document.body,
  );
}
