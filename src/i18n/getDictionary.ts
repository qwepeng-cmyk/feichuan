import type { Locale } from './config';
import { getdefenseDictionaryOverrides, mergeLocaleDictionary } from '@/lib/localeCopy';

// We enumerate manually so webpack can static-analyze imports
const dictionaries = {
  ru: () => import('../dictionaries/ru.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  const loader = dictionaries[locale] || dictionaries.ru;
  const dictionary = await loader();
  return mergeLocaleDictionary(dictionary, getdefenseDictionaryOverrides(locale));
};
