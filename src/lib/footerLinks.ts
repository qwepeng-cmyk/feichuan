import type { ProductCategoryId } from './productCategoryVisibility';
import { englishdefenseSolutionCenterGroups } from './solutionCenterGroups';
import { intentText } from './intentLandingLocalization';
import type { Locale } from '@/i18n/config';

export type FooterLink = {
  href: string;
  label: string;
  categoryId?: ProductCategoryId;
  newTab?: boolean;
};

function productCategoryLink(categoryId: ProductCategoryId, href: string, label: string): FooterLink {
  return { categoryId, href, label };
}

function uniqueLinks(links: FooterLink[]) {
  return links.filter((item, index, items) =>
    items.findIndex((candidate) => candidate.href === item.href) === index
  );
}

export function getFooterSolutionLinks(locale: string, dict: any): FooterLink[] {
  const solutionIndex = {
    href: '/solutions',
    label: dict.solutions?.pageTitle || dict.nav?.solutions || 'Solutions',
  };

  const localizedIntentLandingLinks: FooterLink[] = [
    { href: '/solutions/low-altitude-radar-monitoring', label: intentText(locale as Locale, 'Target Detection Radar') },
    { href: '/solutions/portable-detection-system', label: intentText(locale as Locale, 'Portable Target Detection') },
    { href: '/solutions/multi-sensor-detection', label: intentText(locale as Locale, 'Target Detector'), newTab: true },
    { href: '/solutions/perimeter-defense-system', label: intentText(locale as Locale, 'Perimeter Defense'), newTab: true },
    { href: '/solutions/rf-target-positioning', label: intentText(locale as Locale, 'Target Locator'), newTab: true },
    { href: '/solutions/layered-site-protection', label: intentText(locale as Locale, 'Site Protection'), newTab: true },
  ];

  return uniqueLinks([
    solutionIndex,
    ...localizedIntentLandingLinks,
    ...englishdefenseSolutionCenterGroups.map((group) => ({
      href: `/solutions/${group.handles[0]}`,
      label: dict.solutionCenterGroups?.[group.labelKey] || group.fallbackLabel,
    })),
  ]);
}

export function getFooterProductLinks(locale: string, dict: any): FooterLink[] {
  void locale;
  void dict;
  return [
    productCategoryLink('detection-monitoring', '/products#portable-defense-devices', 'Переносные системы мониторинга'),
    productCategoryLink('detection-monitoring', '/products#fixed-site-defense-systems', 'Стационарные системы мониторинга'),
    productCategoryLink('detection-monitoring', '/products#vehicle-mounted-defense', 'Мобильные комплексы'),
    productCategoryLink('detection-monitoring', '/products#defense-control-platform', 'Платформа управления'),
    productCategoryLink('perimeter-intelligence', '/products#electro-optical-products', 'Оптико-электронное сопровождение'),
  ];
}
