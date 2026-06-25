import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';
import { buildKeywordIntro, getSeoKeywordBackedEntry } from '@/lib/seoKeywordTargets';

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
    title: 'Industrial UAV Systems & Field Equipment | N-TET Products',
    description:
      'Explore N-TET industrial UAV systems, low-altitude monitoring equipment, security screening systems, drone accessories, and UAV components.',
    keywords: [
      'industrial UAV systems',
      'UAV inspection drone',
      'tethered UAV',
      'emergency response drone',
      'low altitude monitoring equipment',
      'security screening systems',
      'drone accessories',
      'UAV components',
    ],
  },
  '/accessories': {
    title: 'Drone Accessories & UAV Components | N-TET',
    description:
      'Browse N-TET UAV accessories including electro-optical gimbals, UAV engines, data links, propellers, motors, batteries, remote controllers, and flight controllers.',
    keywords: [
      'drone accessories',
      'UAV components',
      'UAV gimbal',
      'UAV engine',
      'UAV data link',
      'drone propellers',
      'UAV motors',
      'flight controller',
    ],
  },
  '/solutions': {
    title: 'Industrial UAV Solutions & Low-Altitude Monitoring | N-TET',
    description:
      'N-TET industrial UAV solutions for UAV inspection, emergency response drone operations, critical infrastructure protection, key area security, and low-altitude monitoring.',
    keywords: [
      'industrial UAV solutions',
      'UAV inspection solutions',
      'emergency response drone',
      'critical infrastructure protection',
      'key area security',
      'low altitude monitoring',
      'search and rescue drone',
      'firefighting drone',
      'drone power line inspection',
      'pipeline inspection drones',
      'water conservancy monitoring UAV',
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
      'Search and rescue UAV solution for emergency teams using thermal drones, aerial reconnaissance, disaster-site monitoring, and rescue coordination.',
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
      'UAV inspection solution for power lines, utility corridors, transmission towers, and cell towers with aerial inspection operations for maintenance teams.',
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
    title: 'UAV Deployment Cases & Low Altitude Monitoring References | N-TET',
    description:
      'Review N-TET UAV deployment cases for UAV inspection, emergency support, critical infrastructure protection, key area security, and low altitude monitoring references.',
    keywords: [
      'UAV deployment cases',
      'UAV inspection cases',
      'power line UAV patrol',
      'low altitude monitoring case',
      'emergency support case',
      'critical infrastructure protection',
      'key area security',
      'water conservancy UAV patrol',
      'refinery monitoring case',
    ],
  },
  '/media': {
    title: 'Industrial UAV News & Low Altitude Economy Updates | N-TET',
    description:
      'Read industrial UAV news from N-TET on low altitude economy trends, tethered UAV surveillance, industrial UAV redundancy, and border surveillance UAV network planning.',
    keywords: [
      'industrial UAV news',
      'low altitude economy',
      'tethered UAV surveillance',
      'industrial UAV redundancy',
      'border surveillance UAV network',
    ],
  },
  '/about': {
    title: 'About N-TET | Industrial UAV Systems Integrator & Solution Provider',
    description:
      'Learn about N-TET engineering, integration, and solution delivery capabilities for industrial UAV systems, low-altitude monitoring equipment, and security technologies.',
    keywords: [
      'industrial UAV systems integrator',
      'low altitude monitoring solution provider',
      'UAV system supplier',
      'security technology integrator',
      'N-TET',
    ],
  },
  '/contact': {
    title: 'Industrial UAV Quote & UAV System Supplier Contact | N-TET',
    description:
      'Request an industrial UAV quote from N-TET, a UAV system supplier for drone inspection solution planning, emergency response UAV projects, and low altitude monitoring equipment.',
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

const LOCALIZED_KEYWORD_BACKED_SEO: Partial<Record<Locale, Record<string, SeoEntry>>> = {
  es: {
    '/': {
      title: 'Sistemas UAV industriales y monitoreo de baja altitud | N-TET',
      description:
        'N-TET desarrolla plataformas UAV industriales, monitoreo de baja altitud, drones de emergencia, sistemas de inspección y soluciones de inspección de seguridad para operadores de infraestructura.',
      keywords: ['sistemas UAV industriales', 'monitoreo de baja altitud', 'dron de inspección UAV', 'UAV de emergencia', 'equipos de monitoreo aéreo'],
    },
    '/products': {
      title: "Sistemas UAV industriales y equipos de campo | Productos N-TET",
      description: "Explore sistemas UAV industriales, equipos de monitoreo de baja altitud, sistemas de inspeccion de seguridad, materiales de ingenieria, equipos medicos de campo, accesorios para drones y componentes UAV.",
      keywords: ["sistemas UAV industriales", "dron de inspeccion UAV", "UAV de emergencia", "equipos de monitoreo de baja altitud", "sistemas de inspeccion de seguridad", "materiales de ingenieria", "equipos medicos de campo", "accesorios para drones", "componentes UAV"],
    },
    '/accessories': {
      title: 'Accesorios para drones y componentes UAV | N-TET',
      description:
        'Consulte accesorios UAV de N-TET: gimbals electro-ópticos, motores, enlaces de datos, hélices, baterías, controles remotos y controladores de vuelo.',
      keywords: ['accesorios para drones', 'componentes UAV', 'gimbal UAV', 'motor UAV', 'enlace de datos UAV'],
    },
    '/solutions': {
      title: "Soluciones UAV industriales y monitoreo de baja altitud | N-TET",
      description: "Soluciones UAV industriales de N-TET para inspeccion UAV, operaciones con drones de respuesta de emergencia, proteccion de infraestructura critica, seguridad de areas clave y monitoreo de baja altitud.",
      keywords: ["soluciones UAV industriales", "soluciones de inspeccion UAV", "dron de respuesta de emergencia", "proteccion de infraestructura critica", "seguridad de areas clave", "monitoreo de baja altitud"],
    },
    '/cases': {
      title: "Casos de despliegue UAV y monitoreo de baja altitud | N-TET",
      description: "Revise casos de despliegue UAV de N-TET para inspeccion UAV, apoyo de emergencia, proteccion de infraestructura critica, seguridad de areas clave y monitoreo de baja altitud.",
      keywords: ["casos de despliegue UAV", "casos de inspeccion UAV", "patrullaje UAV de lineas electricas", "caso de monitoreo de baja altitud", "caso de apoyo de emergencia", "proteccion de infraestructura critica", "seguridad de areas clave"],
    },
    '/media': {
      title: 'Noticias sobre UAV industriales y monitoreo de baja altitud | N-TET',
      description:
        'Lea perspectivas de N-TET sobre operaciones UAV industriales, economía de baja altitud, UAV cautivos, redundancia e infraestructura.',
      keywords: ['noticias UAV industriales', 'economía de baja altitud', 'UAV cautivo', 'monitoreo de infraestructura'],
    },
    '/about': {
      title: 'Acerca de N-TET | Integrador de sistemas UAV industriales',
      description:
        'Conozca las capacidades de ingeniería, integración y entrega de soluciones de N-TET para sistemas UAV industriales, monitoreo de baja altitud y tecnologías de seguridad.',
      keywords: ['integrador de sistemas UAV industriales', 'proveedor de sistemas UAV', 'monitoreo de baja altitud', 'N-TET'],
    },
    '/contact': {
      title: 'Contacto N-TET | Sistemas UAV industriales y monitoreo',
      description:
        'Contacte a N-TET para sistemas UAV industriales, drones de emergencia, UAV de inspección, monitoreo de baja altitud y soluciones de seguridad.',
      keywords: ['cotización UAV industrial', 'proveedor UAV', 'solución de inspección con drones', 'monitoreo de baja altitud'],
    },
  },
  ru: {
    '/cases': {
      title: "Кейсы внедрения БПЛА и мониторинг низкой высоты | N-TET",
      description: "Изучите кейсы внедрения БПЛА N-TET для инспекции БПЛА, аварийной поддержки, защиты критической инфраструктуры, безопасности ключевых зон и мониторинга низкой высоты.",
      keywords: ["кейсы внедрения БПЛА", "кейсы инспекции БПЛА", "патрулирование ЛЭП БПЛА", "кейс мониторинга низкой высоты", "кейс аварийной поддержки", "защита критической инфраструктуры", "безопасность ключевых зон"],
    },
    '/solutions': {
      title: "Промышленные решения БПЛА и мониторинг низкой высоты | N-TET",
      description: "Промышленные решения БПЛА N-TET для инспекции БПЛА, аварийного реагирования, защиты критической инфраструктуры, безопасности ключевых зон и мониторинга низкой высоты.",
      keywords: ["промышленные решения БПЛА", "решения для инспекции БПЛА", "БПЛА аварийного реагирования", "защита критической инфраструктуры", "безопасность ключевых зон", "мониторинг низкой высоты"],
    },
    '/products': {
      title: "Промышленные БПЛА и полевое оборудование | Продукты N-TET",
      description: "Изучите промышленные БПЛА N-TET, оборудование мониторинга низкой высоты, системы досмотра, инженерные материалы, полевое медицинское оборудование, аксессуары и компоненты БПЛА.",
      keywords: ["промышленные БПЛА", "инспекционный БПЛА", "аварийный БПЛА", "оборудование мониторинга низкой высоты", "системы досмотра", "инженерные материалы", "полевое медицинское оборудование", "аксессуары для БПЛА", "компоненты БПЛА"],
    },
  },
  ar: {
    '/': {
      title: 'أنظمة UAV صناعية ومراقبة الارتفاع المنخفض | N-TET',
      description:
        'تطوّر N-TET أنظمة UAV صناعية، ومعدات مراقبة الارتفاع المنخفض، وطائرات UAV للطوارئ والتفتيش، وحلول فحص أمني لمشغلي البنية التحتية.',
      keywords: ['أنظمة UAV صناعية', 'مراقبة الارتفاع المنخفض', 'طائرة UAV للتفتيش', 'طائرة UAV للطوارئ', 'معدات مراقبة المجال الجوي'],
    },
    '/products': {
      title: "أنظمة UAV الصناعية والمعدات الميدانية | منتجات N-TET",
      description: "استكشف أنظمة UAV الصناعية من N-TET، ومعدات مراقبة الارتفاع المنخفض، وأنظمة الفحص الأمني، ومواد الهندسة، والمعدات الطبية الميدانية، وملحقات الطائرات بدون طيار، ومكونات UAV.",
      keywords: ["أنظمة UAV الصناعية", "طائرة UAV للتفتيش", "طائرة UAV للطوارئ", "معدات مراقبة الارتفاع المنخفض", "أنظمة الفحص الأمني", "مواد الهندسة", "المعدات الطبية الميدانية", "ملحقات الطائرات بدون طيار", "مكونات UAV"],
    },
    '/accessories': {
      title: 'ملحقات ومكونات UAV | N-TET',
      description:
        'تصفح ملحقات ومكونات UAV من N-TET، بما في ذلك الحوامل الكهروبصرية، والمحركات، وروابط البيانات، والمراوح، والبطاريات، ووحدات التحكم في الطيران.',
      keywords: ['ملحقات ومكونات UAV', 'ملحقات الطائرات بدون طيار', 'مكونات UAV', 'حامل كهروبصري UAV', 'محرك UAV', 'رابط بيانات UAV'],
    },
    '/solutions': {
      title: "حلول UAV الصناعية ومراقبة الارتفاع المنخفض | N-TET",
      description: "حلول UAV الصناعية من N-TET لتفتيش UAV وعمليات طائرات الاستجابة للطوارئ وحماية البنية التحتية الحرجة وأمن المناطق الرئيسية ومراقبة الارتفاع المنخفض.",
      keywords: ["حلول UAV الصناعية", "حلول تفتيش UAV", "طائرة استجابة للطوارئ", "حماية البنية التحتية الحرجة", "أمن المناطق الرئيسية", "مراقبة الارتفاع المنخفض"],
    },
    '/cases': {
      title: "حالات نشر UAV ومراقبة الارتفاع المنخفض | N-TET",
      description: "راجع حالات نشر UAV من N-TET لتفتيش UAV والدعم الطارئ وحماية البنية التحتية الحرجة وأمن المناطق الرئيسية ومراقبة الارتفاع المنخفض.",
      keywords: ["حالات نشر UAV", "حالات تفتيش UAV", "دوريات UAV لخطوط الكهرباء", "حالات مراقبة الارتفاع المنخفض", "حالات الدعم الطارئ", "حماية البنية التحتية الحرجة", "أمن المناطق الرئيسية"],
    },
    '/media': {
      title: 'رؤى وتحديثات UAV الصناعية | N-TET',
      description:
        'اقرأ رؤى وتحديثات UAV الصناعية من N-TET حول عمليات UAV، واقتصاد الارتفاع المنخفض، والطائرات المربوطة، والتكرار التشغيلي، ومراقبة البنية التحتية.',
      keywords: ['رؤى وتحديثات UAV الصناعية', 'أخبار UAV صناعية', 'اقتصاد الارتفاع المنخفض', 'UAV مربوط', 'مراقبة البنية التحتية'],
    },
    '/about': {
      title: 'حول N-TET | مصنع أنظمة UAV صناعية',
      description:
        'تعرف على قدرات N-TET الهندسية والبحثية والتصنيعية في أنظمة الطائرات بدون طيار الصناعية، ومراقبة المجال المنخفض، وتقنيات الأمن.',
      keywords: ['مصنع UAV صناعي', 'مورد أنظمة UAV', 'مراقبة المجال المنخفض', 'N-TET'],
    },
    '/contact': {
      title: 'اتصل بـ N-TET | أنظمة UAV صناعية ومعدات مراقبة',
      description:
        'تواصل مع N-TET بشأن أنظمة الطائرات بدون طيار الصناعية، وطائرات الطوارئ، وطائرات التفتيش، ومعدات مراقبة المجال المنخفض، وحلول الأمن.',
      keywords: ['عرض سعر UAV صناعي', 'مورد UAV', 'حل تفتيش بالطائرات بدون طيار', 'معدات مراقبة المجال المنخفض'],
    },
  },
};

function localizedPath(locale: Locale, path: string) {
  const normalized = path === '/' ? '/' : `/${path.replace(/^\/+/, '')}`;
  return locale === 'en' ? normalized : `/${locale}${normalized === '/' ? '' : normalized}`;
}

function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

function localizedAlternates(path: string) {
  const languages = Object.fromEntries(
    i18n.locales.map((locale) => [locale, localizedPath(locale, path)])
  ) as Record<string, string>;

  languages['x-default'] = localizedPath(i18n.defaultLocale, path);
  return languages;
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

export function getKeywordBackedSeo(path: string, locale: Locale = 'en') {
  const normalized = path === '/' ? '/' : `/${path.replace(/^\/+/, '')}`;
  const localizedEntry = LOCALIZED_KEYWORD_BACKED_SEO[locale]?.[normalized];
  if (localizedEntry) return localizedEntry;

  const target = getSeoKeywordBackedEntry(normalized, locale);
  if (target) {
    return {
      title: titleWithBrand(target.h1 || target.primary),
      description: buildKeywordIntro(target, SITE_NAME, locale),
      keywords: [target.primary, ...target.secondary],
    };
  }
  if (locale !== 'en') return undefined;
  return KEYWORD_BACKED_SEO[normalized];
}

function defaultDescription(locale: Locale, title: string) {
  if (locale === 'ru') {
    return `${title} от ${SITE_NAME}: промышленное решение для инспекции, мониторинга и полевых операций с технической поддержкой проекта.`;
  }

  if (locale === 'es') {
    return `${title} de ${SITE_NAME}: solucion industrial para inspeccion, monitoreo y operaciones de campo con soporte tecnico del proyecto.`;
  }

  if (locale === 'ar') {
    return `${title} من ${SITE_NAME}: حل صناعي للفحص والمراقبة وعمليات الموقع مع دعم فني للمشروع.`;
  }

  return `${title} from ${SITE_NAME}.`;
}

export function getProductSeo(handle: string, name: string, category?: string | null, locale: Locale = 'en'): SeoEntry {
  const keywords = Array.from(new Set([
    ...(PRODUCT_KEYWORD_HINTS[handle] || []),
    ...fallbackKeywords(name, category),
  ])).slice(0, 8);

  const description =
    locale === 'ru'
      ? `${SITE_NAME} ${name}: промышленное решение для инспекции, мониторинга и полевых операций с технической поддержкой проекта.`
      : locale === 'es'
        ? `${SITE_NAME} ${name}: solucion industrial para inspeccion, monitoreo y operaciones de campo con soporte tecnico del proyecto.`
        : locale === 'ar'
          ? `${SITE_NAME} ${name}: حل صناعي للفحص والمراقبة وعمليات الموقع مع دعم فني للمشروع.`
          : `${SITE_NAME} ${name} for industrial operators, combining ${keywords.slice(0, 3).join(', ')} with field-ready deployment and support.`;

  return {
    title: titleWithBrand(name),
    description,
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
  const entry = getKeywordBackedSeo(path, locale);
  const canonical = localizedPath(locale, path);
  const title = entry?.title || titleWithBrand(fallbackTitle);
  const description = entry?.description || cleanDescription(fallbackDescription) || defaultDescription(locale, fallbackTitle);
  const keywords = entry?.keywords || fallbackKeywordList || fallbackKeywords(fallbackTitle);
  const imageUrl = absoluteImage(image);

  return {
    title,
    description,
    keywords,
    other: {
      'content-language': locale,
    },
    alternates: {
      canonical,
      languages: localizedAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(canonical),
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
