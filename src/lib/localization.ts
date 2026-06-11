import { i18n, type Locale } from '@/i18n/config';

export type SupportedLocale = Locale | string | undefined | null;

export const languageLabels: Record<string, string> = {
  en: 'English',
  ru: 'Русский',
  es: 'Español',
  ar: 'العربية',
};

export function isSupportedLocale(value: string | undefined | null): value is Locale {
  return Boolean(value && i18n.locales.includes(value as Locale));
}

export function localeFromPathname(pathname: string | undefined | null): Locale {
  const firstSegment = String(pathname || '').split('/').filter(Boolean)[0];
  return isSupportedLocale(firstSegment) ? firstSegment : i18n.defaultLocale;
}

export function languageAlternates(path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return i18n.locales.map((locale) => ({
    locale,
    label: languageLabels[locale] || locale.toUpperCase(),
    href: locale === i18n.defaultLocale ? normalized : `/${locale}${normalized === '/' ? '' : normalized}`,
  }));
}

export function localizedField<T extends Record<string, any>>(
  item: T | undefined | null,
  field: string,
  locale: SupportedLocale,
  fallbackField?: string,
) {
  if (!item) return '';
  const safeLocale = isSupportedLocale(String(locale || '')) ? String(locale) : i18n.defaultLocale;
  const localizedKey = `${field}_${safeLocale}`;
  const englishKey = fallbackField || `${field}_${i18n.defaultLocale}`;

  return item[localizedKey] || item[englishKey] || item[field] || '';
}

export function localizedTitle<T extends Record<string, any>>(item: T | undefined | null, locale: SupportedLocale) {
  return localizedField(item, 'title', locale) || localizedField(item, 'product_name', locale) || item?.name || '';
}
