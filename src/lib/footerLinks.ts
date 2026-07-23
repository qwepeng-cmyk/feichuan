import type { ProductCategoryId } from './productCategoryVisibility';
import { englishCuasSolutionCenterGroups } from './solutionCenterGroups';
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

  const lowAltitudeTopic = {
    href: '/solutions/low-altitude-airspace-monitoring',
    label: dict.megaMenu?.lowAltitudeAirspaceMonitoring || 'Low-Altitude Airspace Monitoring Solution',
  };

  const localizedIntentLandingLinks: FooterLink[] = ['en', 'ru'].includes(locale)
    ? [
        { href: '/solutions/drone-radar-detection', label: intentText(locale as Locale, 'Drone Radar Detection') },
        { href: '/solutions/portable-drone-detection', label: intentText(locale as Locale, 'Portable Drone Detection') },
        { href: '/solutions/drone-detector', label: intentText(locale as Locale, 'Drone Detector'), newTab: true },
        { href: '/solutions/drone-defender', label: intentText(locale as Locale, 'Drone Defender'), newTab: true },
        { href: '/solutions/drone-locator', label: intentText(locale as Locale, 'Drone Locator'), newTab: true },
        { href: '/solutions/drone-shield', label: intentText(locale as Locale, 'Drone Shield'), newTab: true },
        { href: '/solutions/drone-jammer', label: intentText(locale as Locale, 'Drone Jammer'), newTab: true },
      ]
    : [];

  if (['en', 'ru', 'es', 'ar'].includes(locale)) {
    return uniqueLinks([
      solutionIndex,
      lowAltitudeTopic,
      ...localizedIntentLandingLinks,
      ...englishCuasSolutionCenterGroups.map((group) => ({
        href: `/solutions/${group.handles[0]}`,
        label: dict.solutionCenterGroups?.[group.labelKey] || group.fallbackLabel,
      })),
    ]);
  }

  return uniqueLinks([
    solutionIndex,
    lowAltitudeTopic,
    { href: '/solutions/category/01_BorderPatrol', label: dict.solutionCategories?.borderPatrol || 'Border Patrol UAV Solutions' },
    { href: '/solutions/category/02_InfrastructureProtection', label: dict.solutionCategories?.infrastructureProtection || 'Critical Infrastructure Protection' },
    { href: '/solutions/category/03_KeyAreaSecurity', label: dict.solutionCategories?.keyAreaSecurity || 'Key Area Security' },
    { href: '/solutions/category/04_EmergencyRescue', label: dict.solutionCategories?.emergencyRescue || 'Emergency & Disaster Rescue' },
  ]);
}

export function getFooterProductLinks(locale: string, dict: any): FooterLink[] {
  if (['en', 'ru', 'es', 'ar'].includes(locale)) {
    return [
      productCategoryLink('drone-detection', '/products#portable-cuas-devices', 'Portable C-UAS Devices'),
      productCategoryLink('drone-detection', '/products#fixed-site-cuas-systems', 'Fixed-Site C-UAS Systems'),
      productCategoryLink('drone-detection', '/products#vehicle-mounted-cuas', 'Vehicle-Mounted C-UAS'),
      productCategoryLink('drone-detection', '/products#cuas-control-platform', 'C-UAS Control Platform'),
      productCategoryLink('perimeter-intelligence', '/products#electro-optical-products', 'EO/IR Tracking & Verification'),
    ];
  }

  return [
    productCategoryLink('uav-drone-systems', '/products#uav-drone-systems', dict.megaMenu?.uavSystems || 'UAV & Drone Systems'),
    productCategoryLink('drone-detection', '/products#drone-detection', dict.megaMenu?.droneDetection || 'Low-Altitude Monitoring Equipment'),
    productCategoryLink(
      'perimeter-intelligence',
      '/products#perimeter-intelligence',
      dict.products?.categories?.surveillance || dict.megaMenu?.perimeterSurveillance || 'Perimeter Intelligence'
    ),
    productCategoryLink(
      'industrial-engine-microgrid',
      '/products#industrial-engine-microgrid',
      dict.products?.categories?.industrialEngineMicrogrid || 'Industrial Engines'
    ),
    productCategoryLink('security-screening', '/products#security-screening', dict.megaMenu?.securityScreening || 'Security Screening'),
    productCategoryLink('engineering-materials', '/products#engineering-materials', dict.megaMenu?.engineeringMaterials || 'Engineering Materials'),
    productCategoryLink('field-hospitals', '/products#field-hospitals', dict.megaMenu?.fieldHospitals || 'Field Hospitals'),
  ];
}
