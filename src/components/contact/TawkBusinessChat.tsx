'use client';

import { useEffect, useState } from 'react';

const TAWK_PROPERTY_ID = '6a1e6979734ebd1c2f45a821';
const TAWK_WIDGET_ID = '1jq3co0p8';
const TAWK_SCRIPT_ID = 'tawk-business-chat-script';

declare global {
  interface Window {
    Tawk_API?: {
      getStatus?: () => string;
      maximize?: () => void;
      showWidget?: () => void;
    };
    Tawk_LoadStart?: Date;
  }
}

export default function TawkBusinessChat() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetch('/api/site/chat-settings', { cache: 'no-store' })
      .then((res) => res.json())
      .then((json) => {
        if (!isMounted) return;
        setEnabled(Boolean(json?.success && json?.data?.tawkEnabled));
      })
      .catch(() => {
        if (isMounted) setEnabled(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!enabled || document.getElementById(TAWK_SCRIPT_ID)) return;

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const script = document.createElement('script');
    script.id = TAWK_SCRIPT_ID;
    script.async = true;
    script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);
  }, [enabled]);

  return null;
}
