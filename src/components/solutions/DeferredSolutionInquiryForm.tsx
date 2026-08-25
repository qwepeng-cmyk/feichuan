'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import styles from './IntentLandingPage.module.css';

const InquiryForm = dynamic(() => import('@/components/products/InquiryForm'), {
  ssr: false,
  loading: () => <div className={styles.inquiryLoading}>Загрузка формы запроса…</div>,
});

export default function DeferredSolutionInquiryForm({ dict }: { dict: any }) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || shouldLoad) return;

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: '700px 0px' }
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={hostRef} className={styles.inquiryHost}>
      {shouldLoad ? (
        <InquiryForm dict={dict} />
      ) : (
        <div className={styles.inquiryPlaceholder} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      )}
    </div>
  );
}
