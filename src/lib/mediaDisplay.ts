export function getLocalizedMediaDate(date: string, locale: string) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  if (locale === 'ru') {
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(parsed);
  }

  if (locale === 'es') {
    return new Intl.DateTimeFormat('es-419', {
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
