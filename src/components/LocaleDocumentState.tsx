'use client';

import { useEffect } from 'react';
import type { Locale } from '@/i18n/config';

export default function LocaleDocumentState({ locale }: { locale: Locale }) {
  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = locale === 'ar' ? 'rtl' : 'ltr';
    root.dataset.locale = locale;
  }, [locale]);

  return null;
}
