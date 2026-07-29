import type { Locale } from '@/i18n/config';
import ru from '@/dictionaries/defense/ru.json';
import ruAi1 from '@/dictionaries/defense-ai/ru-1.json';
import ruAi2 from '@/dictionaries/defense-ai/ru-2.json';
import ruAi3 from '@/dictionaries/defense-ai/ru-3.json';
import ruDictionary from '@/dictionaries/defense-overrides/ru.json';
import { Children, cloneElement, isValidElement, type ReactNode } from 'react';
import { sanitizePublicCopy } from '@/lib/publicCopy';

type LocaleBundle = {
  strings: Record<string, string>;
  dictionary: Record<string, any>;
};

const bundles: Partial<Record<Locale, LocaleBundle>> = {
  ru: { strings: { ...ru.strings, ...ruAi1, ...ruAi2, ...ruAi3 }, dictionary: ruDictionary },
};

function normalizeSource(value: string) {
  return value.replace(/\s+/g, ' ').replaceAll('&amp;', '&').trim();
}

export function defenseText(locale: string, english: string) {
  const source = normalizeSource(english);
  return sanitizePublicCopy(bundles[locale as Locale]?.strings[source] || source);
}

const translatedPropNames = new Set(['alt', 'title', 'aria-label', 'placeholder']);

function localizeReactText(locale: string, value: string) {
  if (!value.trim()) return value;
  const leading = /^\s/.test(value) ? ' ' : '';
  const trailing = /\s$/.test(value) ? ' ' : '';
  return `${leading}${defenseText(locale, value)}${trailing}`;
}

export function localizedefenseTree(locale: string, node: ReactNode): ReactNode {
  if (typeof node === 'string') return localizeReactText(locale, node);
  if (Array.isArray(node)) return node.map((item) => localizedefenseTree(locale, item));
  if (!isValidElement(node)) return node;

  const props = node.props as Record<string, any>;
  const nextProps: Record<string, any> = {};
  for (const propName of Array.from(translatedPropNames)) {
    if (typeof props[propName] === 'string') {
      nextProps[propName] = defenseText(locale, props[propName]);
    }
  }
  if (props.children !== undefined) {
    nextProps.children = Children.map(props.children, (child) => localizedefenseTree(locale, child));
  }
  return cloneElement(node, nextProps);
}

export function localizedefenseValue<T>(locale: string, value: T): T {
  if (typeof value === 'string') {
    return defenseText(locale, value) as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => localizedefenseValue(locale, item)) as T;
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [
        key,
        localizedefenseValue(locale, item),
      ]),
    ) as T;
  }
  return value;
}

export function getdefenseDictionaryOverrides(locale: Locale) {
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
