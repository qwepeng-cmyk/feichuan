'use client';

import { useEffect } from 'react';

export default function OpenLinksInNewTab() {
  useEffect(() => {
    const shouldStayInCurrentTab = (link: HTMLAnchorElement) => {
      const rawHref = link.getAttribute('href') || '';
      const href = rawHref.toLowerCase();
      const absoluteHref = link.href.toLowerCase();

      return (
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        absoluteHref.includes('wa.me/') ||
        absoluteHref.includes('whatsapp')
      );
    };

    const applyTarget = () => {
      document.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((link) => {
        if (shouldStayInCurrentTab(link)) {
          link.removeAttribute('target');
          link.removeAttribute('rel');
          return;
        }

        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      });
    };

    applyTarget();

    const observer = new MutationObserver(applyTarget);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
