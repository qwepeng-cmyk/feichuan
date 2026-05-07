import type { Locale } from './config';

// We enumerate manually so webpack can static-analyze imports
const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  ru: () => import('../dictionaries/ru.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};
