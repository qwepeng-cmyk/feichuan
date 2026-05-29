import { i18n } from '@/i18n/config';

export function localePath(locale: string | undefined, path: string = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (!locale || locale === i18n.defaultLocale) {
    return normalizedPath;
  }

  return `/${locale}${normalizedPath === '/' ? '' : normalizedPath}`;
}
