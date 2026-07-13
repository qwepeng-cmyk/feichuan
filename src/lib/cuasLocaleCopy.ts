import type { Locale } from '@/i18n/config';
import ru from '@/dictionaries/cuas/ru.json';
import es from '@/dictionaries/cuas/es.json';
import ar from '@/dictionaries/cuas/ar.json';
import ruAi1 from '@/dictionaries/cuas-ai/ru-1.json';
import ruAi2 from '@/dictionaries/cuas-ai/ru-2.json';
import ruAi3 from '@/dictionaries/cuas-ai/ru-3.json';
import esAi1 from '@/dictionaries/cuas-ai/es-1.json';
import esAi2 from '@/dictionaries/cuas-ai/es-2.json';
import esAi3 from '@/dictionaries/cuas-ai/es-3.json';
import arAi1 from '@/dictionaries/cuas-ai/ar-1.json';
import arAi2 from '@/dictionaries/cuas-ai/ar-2.json';
import arAi3 from '@/dictionaries/cuas-ai/ar-3.json';
import ruDictionary from '@/dictionaries/cuas-overrides/ru.json';
import esDictionary from '@/dictionaries/cuas-overrides/es.json';
import arDictionary from '@/dictionaries/cuas-overrides/ar.json';
import { Children, cloneElement, isValidElement, type ReactNode } from 'react';

type LocaleBundle = {
  strings: Record<string, string>;
  dictionary: Record<string, any>;
};

const bundles: Partial<Record<Locale, LocaleBundle>> = {
  ru: { strings: { ...ru.strings, ...ruAi1, ...ruAi2, ...ruAi3 }, dictionary: ruDictionary },
  es: { strings: { ...es.strings, ...esAi1, ...esAi2, ...esAi3 }, dictionary: esDictionary },
  ar: { strings: { ...ar.strings, ...arAi1, ...arAi2, ...arAi3 }, dictionary: arDictionary },
};

function normalizeSource(value: string) {
  return value.replace(/\s+/g, ' ').replaceAll('&amp;', '&').trim();
}

export function cuasText(locale: string, english: string) {
  const source = normalizeSource(english);
  return bundles[locale as Locale]?.strings[source] || source;
}

const translatedPropNames = new Set(['alt', 'title', 'aria-label', 'placeholder']);

function localizeReactText(locale: string, value: string) {
  if (!value.trim()) return value;
  const leading = /^\s/.test(value) ? ' ' : '';
  const trailing = /\s$/.test(value) ? ' ' : '';
  return `${leading}${cuasText(locale, value)}${trailing}`;
}

export function localizeCuasTree(locale: string, node: ReactNode): ReactNode {
  if (typeof node === 'string') return localizeReactText(locale, node);
  if (Array.isArray(node)) return node.map((item) => localizeCuasTree(locale, item));
  if (!isValidElement(node)) return node;

  const props = node.props as Record<string, any>;
  const nextProps: Record<string, any> = {};
  for (const propName of Array.from(translatedPropNames)) {
    if (typeof props[propName] === 'string') {
      nextProps[propName] = cuasText(locale, props[propName]);
    }
  }
  if (props.children !== undefined) {
    nextProps.children = Children.map(props.children, (child) => localizeCuasTree(locale, child));
  }
  return cloneElement(node, nextProps);
}

export function localizeCuasValue<T>(locale: string, value: T): T {
  if (typeof value === 'string') {
    return cuasText(locale, value) as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => localizeCuasValue(locale, item)) as T;
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [
        key,
        localizeCuasValue(locale, item),
      ]),
    ) as T;
  }
  return value;
}

export function getCuasDictionaryOverrides(locale: Locale) {
  return bundles[locale]?.dictionary || {};
}

export function mergeLocaleDictionary<T extends Record<string, any>>(base: T, override: Record<string, any>): T {
  const result: Record<string, any> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      base[key] &&
      typeof base[key] === 'object' &&
      !Array.isArray(base[key])
    ) {
      result[key] = mergeLocaleDictionary(base[key], value);
    } else {
      result[key] = value;
    }
  }
  return result as T;
}
