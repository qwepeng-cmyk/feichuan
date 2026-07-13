import type { Locale } from './config';
import { getCuasDictionaryOverrides, mergeLocaleDictionary } from '@/lib/cuasLocaleCopy';

// We enumerate manually so webpack can static-analyze imports
const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  ru: () => import('../dictionaries/ru.json').then((module) => module.default),
  es: () => import('../dictionaries/es.json').then((module) => module.default),
  ar: () => import('../dictionaries/ar.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  const loader = dictionaries[locale] || dictionaries.en;
  const dictionary = await loader();
  return mergeLocaleDictionary(dictionary, getCuasDictionaryOverrides(locale));
};
