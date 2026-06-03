import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';

const SITE_URL = 'https://n-tet.com';
const SITE_NAME = 'N-TET';

export interface SeoEntry {
  title: string;
  description: string;
  keywords: string[];
}

interface BuildSeoMetadataOptions {
  locale: Locale;
  path: string;
  fallbackTitle: string;
  fallbackDescription?: string | null;
  fallbackKeywords?: string[];
  image?: string | null;
}

const KEYWORD_BACKED_SEO: Record<string, SeoEntry> = {
  '/': {
    title: 'Industrial UAV Systems & Low-Altitude Monitoring | N-TET',
    description:
      'N-TET builds industrial UAV platforms, low-altitude monitoring equipment, emergency response drones, inspection systems, and security screening solutions for infrastructure operators.',
    keywords: [
      'industrial UAV systems',
      'low altitude monitoring',
      'UAV inspection drone',
      'emergency response UAV',
      'drone detection equipment',
      'security screening systems',
    ],
  },
  '/products': {
    title: 'Industrial UAV Systems & Monitoring Equipment | N-TET Products',
    description:
      'Explore N-TET industrial UAV systems, tethered emergency drones, inspection UAVs, low-altitude monitoring equipment, and security screening products for operational teams.',
    keywords: [
      'industrial UAV systems',
      'UAV inspection drone',
      'tethered UAV',
      'emergency response drone',
      'low altitude monitoring equipment',
      'security screening equipment',
    ],
  },
  '/solutions': {
    title: 'Industrial UAV Inspection & Emergency Response Solutions | N-TET',
    description:
      'Keyword-backed UAV solutions for search and rescue, firefighting, power-line inspection, pipeline inspection, water monitoring, border patrol, and emergency lighting.',
    keywords: [
      'UAV inspection solutions',
      'search and rescue drone',
      'firefighting drone',
      'drone power line inspection',
      'pipeline inspection drones',
      'water conservancy monitoring UAV',
      'tethered lighting UAV',
    ],
  },
  '/solutions/category/01_BorderPatrol': {
    title: 'Border Patrol UAV & Coastal Monitoring Solutions | N-TET',
    description:
      'UAV and electro-optical monitoring solutions for border patrol, coastal surveillance, maritime patrol, port inspection, and wide-area security operations.',
    keywords: [
      'border patrol drones',
      'border patrol UAV',
      'UAV border patrol',
      'maritime patrol UAV',
      'coastal monitoring drone',
      'land based maritime surveillance',
    ],
  },
  '/solutions/category/02_InfrastructureProtection': {
    title: 'Critical Infrastructure UAV Monitoring Solutions | N-TET',
    description:
      'UAV and low-altitude monitoring solutions for power lines, substations, oil and gas facilities, pipelines, chemical plants, dams, and water conservancy sites.',
    keywords: [
      'drone power line inspection',
      'pipeline inspection drones',
      'oil and gas drone inspection',
      'chemical plant monitoring',
      'water conservancy monitoring UAV',
      'low altitude monitoring equipment',
    ],
  },
  '/solutions/category/03_KeyAreaSecurity': {
    title: 'Key Area Security & Airspace Monitoring Solutions | N-TET',
    description:
      'Integrated security screening, electro-optical surveillance, and low-altitude monitoring for airports, events, judicial facilities, and transport hubs.',
    keywords: [
      'airport airspace monitoring',
      'event security monitoring',
      'key area security',
      'smart security screening',
      'low altitude monitoring equipment',
      'electro optical surveillance',
    ],
  },
  '/solutions/category/04_EmergencyRescue': {
    title: 'Emergency Rescue UAV Solutions | Search, Firefighting & Lighting',
    description:
      'Emergency UAV solutions for search and rescue, high-rise firefighting, disaster-site reconnaissance, emergency communication, and tethered lighting support.',
    keywords: [
      'search and rescue drone',
      'firefighting drone',
      'emergency communication UAV',
      'drone lighting',
      'emergency response drone',
      'disaster response UAV',
    ],
  },
  '/solutions/disaster-site-search-rescue-reconnaissance-uav-solution': {
    title: 'Search and Rescue Drone Solution | Thermal UAV Reconnaissance',
    description:
      'Search and rescue UAV solution for emergency teams using thermal drones, aerial reconnaissance, disaster-site monitoring, and rescue coordination workflows.',
    keywords: [
      'thermal drones for search and rescue',
      'search and rescue drone',
      'drone rescue',
      'drones for search and rescue',
      'search and rescue thermal drone',
      'search and rescue UAV',
    ],
  },
  '/solutions/urban-high-rise-firefighting-emergency-uav-solution': {
    title: 'Firefighting Drone Solution for High-Rise Emergency Response',
    description:
      'High-rise firefighting UAV solution using tethered aerial platforms, emergency monitoring, rescue support, and persistent visual awareness for incident teams.',
    keywords: [
      'firefighting drone',
      'drone fire fighting',
      'drone for fire fighting',
      'fire fighting drones',
      'drones firefighting',
      'high-rise firefighting UAV',
    ],
  },
  '/solutions/power-line-uav-intelligent-inspection-solution': {
    title: 'Power Line UAV Inspection Solution | Utility Inspection Drones',
    description:
      'UAV inspection solution for power lines, utility corridors, transmission towers, and cell towers with aerial inspection workflows for maintenance teams.',
    keywords: [
      'drones for utility inspection',
      'drone power line inspection',
      'utility inspection drone',
      'drone cell tower inspection',
      'power line inspection drone',
      'UAV power line inspection',
    ],
  },
  '/solutions/night-emergency-lighting-support-uav-solution': {
    title: 'Tethered Lighting UAV Solution | Emergency Drone Lighting',
    description:
      'Tethered lighting UAV solution for night emergency work, rescue scenes, repair sites, command posts, and temporary area illumination.',
    keywords: [
      'drone lighting',
      'UAV lighting',
      'tethered lighting UAV',
      'UAV lighting system',
      'emergency lighting drone',
      'drone lighting company',
    ],
  },
  '/solutions/chemical-plant-protection': {
    title: 'Pipeline Inspection Drone & Chemical Plant Monitoring Solution',
    description:
      'UAV and airspace monitoring solution for chemical plants, oil and gas sites, pipelines, and industrial facilities requiring inspection and event awareness.',
    keywords: [
      'pipeline inspection drones',
      'UAV pipeline inspection',
      'oil and gas drone inspection',
      'drone inspection for oil and gas',
      'drone pipeline inspection',
      'chemical plant monitoring',
    ],
  },
  '/solutions/uav-maritime-patrol': {
    title: 'Border Patrol UAV & Maritime Coastal Monitoring Solution',
    description:
      'Border patrol UAV solution for coastal monitoring, maritime patrol, port inspection, routine patrol routes, and wide-area surveillance operations.',
    keywords: [
      'border patrol drones',
      'border patrol UAV',
      'UAV border patrol',
      'drones for border patrol',
      'maritime patrol UAV',
      'coastal monitoring drone',
    ],
  },
  '/solutions/water-conservancy-river-lake-uav-monitoring-solution': {
    title: 'Water Conservancy Monitoring UAV Solution | River & Lake Patrol',
    description:
      'Water conservancy UAV monitoring solution for dams, rivers, lakes, flood areas, water-quality observation, and infrastructure inspection teams.',
    keywords: [
      'water conservancy monitoring UAV',
      'dam inspection UAV',
      'using UAV to monitor water quality in lakes',
      'river lake UAV monitoring',
      'flood monitoring drone',
    ],
  },
  '/solutions/post-disaster-emergency-communication-support-uav-solution': {
    title: 'Emergency Communication UAV Solution for Disaster Response',
    description:
      'Emergency communication UAV solution for disaster response agencies, command centers, field rescue teams, and temporary network support after incidents.',
    keywords: [
      'emergency communication UAV',
      'disaster response communication drone',
      'tethered communication UAV',
      'public safety UAV communications',
      'emergency communication drone',
    ],
  },
  '/solutions/smart-substation-unattended-uav-inspection-solution': {
    title: 'Smart Substation Autonomous UAV Inspection Solution | N-TET',
    description:
      'Autonomous UAV inspection solution for smart substations, power utilities, unattended inspection routes, thermal checks, and operation records.',
    keywords: [
      'smart substation autonomous inspection',
      'substation inspection drone',
      'power utility UAV inspection',
      'autonomous UAV inspection',
      'UAV inspection system',
    ],
  },
  '/cases': {
    title: 'Industrial UAV & Low-Altitude Monitoring Cases | N-TET',
    description:
      'Review public N-TET cases for power-line UAV patrol, flood-season emergency inspection, refinery monitoring, airport security, and infrastructure operations.',
    keywords: [
      'UAV inspection cases',
      'power line UAV patrol',
      'low altitude monitoring case',
      'water conservancy UAV patrol',
      'refinery monitoring case',
    ],
  },
  '/media': {
    title: 'Industrial UAV Insights & Low-Altitude Monitoring News | N-TET',
    description:
      'Read N-TET insights on industrial UAV operations, low-altitude economy trends, tethered UAV surveillance, redundancy, and infrastructure monitoring.',
    keywords: [
      'industrial UAV news',
      'low altitude economy',
      'tethered UAV surveillance',
      'industrial UAV redundancy',
      'border surveillance UAV network',
    ],
  },
  '/about': {
    title: 'About N-TET | Industrial UAV & Monitoring Systems Manufacturer',
    description:
      'Learn about N-TET engineering, R&D, and manufacturing capabilities for industrial UAV systems, low-altitude monitoring equipment, and security technologies.',
    keywords: [
      'industrial UAV manufacturer',
      'low altitude monitoring manufacturer',
      'UAV system supplier',
      'security equipment manufacturer',
      'N-TET',
    ],
  },
  '/contact': {
    title: 'Contact N-TET | Industrial UAV Systems & Monitoring Equipment',
    description:
      'Contact N-TET for industrial UAV systems, emergency response drones, inspection UAVs, low-altitude monitoring equipment, and security screening solutions.',
    keywords: [
      'industrial UAV quote',
      'UAV system supplier',
      'drone inspection solution',
      'emergency response UAV',
      'low altitude monitoring equipment',
    ],
  },
};

const PRODUCT_KEYWORD_HINTS: Record<string, string[]> = {
  'fc-yjtx-01-emergency-communication-drone': [
    'emergency communication UAV',
    'disaster response communication drone',
    'tethered communication UAV',
    'public safety UAV communications',
  ],
  'fc-yjxf-01-aerial-firefighting-drone': [
    'firefighting drone',
    'drone fire fighting',
    'drone for fire fighting',
    'high-rise firefighting UAV',
  ],
  'fc-yjzm-01-emergency-lighting-drone': [
    'drone lighting',
    'UAV lighting',
    'tethered lighting UAV',
    'emergency lighting drone',
  ],
  'fc-yjzc-01-emergency-reconnaissance-drone': [
    'search and rescue drone',
    'drone rescue',
    'emergency reconnaissance drone',
    'disaster response UAV',
  ],
  'fc-sljc-01-water-conservancy-monitoring-drone': [
    'water conservancy monitoring UAV',
    'dam inspection UAV',
    'river lake UAV monitoring',
    'flood monitoring drone',
  ],
  'fc-dlxj-01-power-grid-inspection-drone': [
    'drone power line inspection',
    'power line inspection drone',
    'UAV power line inspection',
    'utility inspection drone',
  ],
  'fc-yqxj-01-utility-inspection-drone': [
    'pipeline inspection drones',
    'UAV pipeline inspection',
    'oil and gas drone inspection',
    'drone pipeline inspection',
  ],
  'emergency-search-rescue-drone': [
    'thermal drones for search and rescue',
    'search and rescue drone',
    'search and rescue UAV',
    'drone rescue',
  ],
  'smart-substation-autonomous-inspection-system': [
    'smart substation autonomous inspection',
    'substation inspection drone',
    'power utility UAV inspection',
    'autonomous UAV inspection',
  ],
  'power-tower-inspection-drone': [
    'drone power line inspection',
    'power line inspection drone',
    'drones for utility inspection',
    'transmission tower inspection UAV',
  ],
};

const PRODUCT_CATEGORY_KEYWORDS: Record<string, string[]> = {
  'uav-drone-systems': ['industrial UAV systems', 'UAV inspection drone', 'emergency response UAV'],
  'drone-detection': ['low altitude monitoring equipment', 'drone detection equipment', 'airspace monitoring system'],
  'security-screening': ['security screening equipment', 'X-ray baggage scanner', 'walk-through metal detector'],
  'engineering-materials': ['engineering materials', 'Bailey steel bridge', 'infrastructure support equipment'],
  'field-hospitals': ['field hospital system', 'containerized medical rescue system', 'emergency medical shelter'],
  'perimeter-intelligence': ['perimeter intelligence', 'electro optical surveillance', 'radar vision fusion system'],
};

function localizedPath(locale: Locale, path: string) {
  const normalized = path === '/' ? '/' : `/${path.replace(/^\/+/, '')}`;
  return locale === 'en' ? normalized : `/${locale}${normalized === '/' ? '' : normalized}`;
}

function absoluteImage(image?: string | null) {
  if (!image) return undefined;
  return new URL(image, SITE_URL).toString();
}

function cleanDescription(value?: string | null) {
  if (!value) return undefined;
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 240);
}

function titleWithBrand(title: string) {
  return /\bN-TET\b/i.test(title) ? title : `${title} | ${SITE_NAME}`;
}

function fallbackKeywords(title: string, category?: string | null) {
  const words = title
    .replace(/[()]/g, ' ')
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean);

  const productPhrase = words.join(' ');
  return Array.from(new Set([
    productPhrase,
    ...(category ? PRODUCT_CATEGORY_KEYWORDS[category] || [category.replace(/-/g, ' ')] : []),
    SITE_NAME,
  ])).slice(0, 8);
}

export function getKeywordBackedSeo(path: string) {
  const normalized = path === '/' ? '/' : `/${path.replace(/^\/+/, '')}`;
  return KEYWORD_BACKED_SEO[normalized];
}

export function getProductSeo(handle: string, name: string, category?: string | null): SeoEntry {
  const keywords = Array.from(new Set([
    ...(PRODUCT_KEYWORD_HINTS[handle] || []),
    ...fallbackKeywords(name, category),
  ])).slice(0, 8);

  return {
    title: titleWithBrand(name),
    description: `N-TET ${name} for industrial operators, combining ${keywords.slice(0, 3).join(', ')} workflows with field-ready deployment and support.`,
    keywords,
  };
}

export function buildSeoMetadata({
  locale,
  path,
  fallbackTitle,
  fallbackDescription,
  fallbackKeywords: fallbackKeywordList,
  image,
}: BuildSeoMetadataOptions): Metadata {
  const entry = getKeywordBackedSeo(path);
  const canonical = localizedPath(locale, path);
  const title = entry?.title || titleWithBrand(fallbackTitle);
  const description = entry?.description || cleanDescription(fallbackDescription) || `${fallbackTitle} from ${SITE_NAME}.`;
  const keywords = entry?.keywords || fallbackKeywordList || fallbackKeywords(fallbackTitle);
  const imageUrl = absoluteImage(image);

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: imageUrl ? [{ url: imageUrl, alt: fallbackTitle }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}
