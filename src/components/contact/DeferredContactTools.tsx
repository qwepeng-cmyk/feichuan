'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const FloatingMessageBox = dynamic(() => import('./FloatingMessageBox'), {
  ssr: false,
});

const ZoosnetBusinessChat = dynamic(() => import('./ZoosnetBusinessChat'), {
  ssr: false,
});

export default function DeferredContactTools() {
  const visitStartedAt = useRef(Date.now());
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const load = () => setShouldLoad(true);
    const supportsIdleCallback = 'requestIdleCallback' in window;
    let idleId: number | null = null;
    const delayId = window.setTimeout(() => {
      if (supportsIdleCallback) {
        idleId = window.requestIdleCallback(load, { timeout: 1500 });
      } else {
        load();
      }
    }, 2000);

    const loadImmediately = () => {
      window.clearTimeout(delayId);
      if (idleId !== null && supportsIdleCallback) {
        window.cancelIdleCallback(idleId);
      }
      load();
    };

    window.addEventListener('ntet:load-business-chat', loadImmediately, { once: true });

    return () => {
      window.removeEventListener('ntet:load-business-chat', loadImmediately);
      window.clearTimeout(delayId);
      if (idleId !== null && supportsIdleCallback) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  if (!shouldLoad) return null;

  return (
    <>
      <ZoosnetBusinessChat />
      <FloatingMessageBox visitStartedAtMs={visitStartedAt.current} />
    </>
  );
}
