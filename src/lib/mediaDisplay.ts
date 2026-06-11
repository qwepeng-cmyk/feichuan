export function getLocalizedMediaDate(date: string, locale: string) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  const localeFormats: Record<string, string> = {
    ru: 'ru-RU',
    es: 'es-419',
    ar: 'ar',
  };
  const formatLocale = localeFormats[locale];

  if (formatLocale) {
    return new Intl.DateTimeFormat(formatLocale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(parsed);
  }

  return date;
}

export function getLocalizedMediaTitle(news: any, locale: string) {
  return news?.[`title_${locale}`] || news?.title_en || news?.title || '';
}
