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
    title: 'Professional C-UAS Equipment Manufacturer | N-TET',
    description:
      'N-TET is a professional C-UAS equipment manufacturer and system supplier for portable, fixed-site and vehicle-mounted projects, integration, testing and delivery.',
    keywords: [
      'C-UAS equipment manufacturer',
      'C-UAS system supplier',
      'C-UAS equipment',
      'portable C-UAS',
      'fixed-site C-UAS',
      'vehicle-mounted C-UAS',
    ],
  },
  '/products': {
    title: 'Professional C-UAS Equipment | N-TET Products',
    description:
      'Explore N-TET portable, fixed-site, vehicle-mounted and platform-based C-UAS equipment for detection, identification, tracking and site coordination.',
    keywords: [
      'professional C-UAS equipment',
      'portable C-UAS equipment',
      'fixed-site C-UAS system',
      'vehicle-mounted C-UAS',
      'C-UAS control platform',
      'EO IR tracking',
    ],
  },
  '/accessories': {
    title: 'UAV Components for System Integration | N-TET',
    description:
      'Browse N-TET flight-control, propulsion, data-link, power and EO payload components for system integration, maintenance and local assembly.',
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
    title: 'Integrated C-UAS System Solutions | N-TET',
    description:
      'N-TET C-UAS solutions support detection, identification, tracking, alert review, and airspace monitoring for critical infrastructure, airports, public sites, and major venues.',
    keywords: [
      'C-UAS solutions',
      'C-UAS detection',
      'airspace monitoring',
      'airport C-UAS',
      'event security C-UAS',
      'critical infrastructure protection',
      'key area security',
      'low altitude monitoring',
    ],
  },
  '/solutions/low-altitude-airspace-monitoring': {
    title: 'Low-Altitude Airspace Monitoring Solution | N-TET',
    description:
      'Plan low-altitude airspace monitoring for critical sites with RF sensing, radar, Remote ID, EO/IR verification, command coordination and authorized-response workflows.',
    keywords: [
      'low-altitude airspace monitoring',
      'low altitude monitoring system',
      'airspace monitoring solution',
      'low altitude security',
      'critical site airspace monitoring',
      'RF airspace monitoring',
      'Remote ID monitoring',
      'low altitude radar',
      'EO IR verification',
      'C-UAS site planning',
    ],
  },
  '/solutions/drone-detector': {
    title: 'Drone Detector Systems for Critical Sites | N-TET',
    description:
      'Compare RF sensing, radar, Remote ID and EO/IR confirmation in a site-specific drone detector workflow from detection to authorized response.',
    keywords: [
      'drone detector system',
      'drone detector',
      'drone detection system',
      'C-UAS detection system',
      'RF drone detection',
      'Remote ID monitoring',
      'counter UAS system',
      'counter-UAS system',
      'counter drone system',
      'counter drone detection',
    ],
  },
  '/solutions/drone-radar-detection': {
    title: 'Drone Detection Radar | Ku & X Band C-UAS Radar | N-TET',
    description:
      'Compare Ku-band and X-band drone detection radar options for low-altitude early warning, target tracking, RF and EO confirmation, and authorized site response workflows.',
    keywords: [
      'drone detection radar',
      'radar drone detection',
      'UAV detection radar',
      'drone radar detector',
      'radar detector for drones',
      'Ku band drone detection radar',
      'C-UAS radar',
      'counter UAV radar',
      'low altitude radar',
    ],
  },
  '/solutions/portable-drone-detection': {
    title: 'Portable C-UAS Systems | Handheld & Vehicle-Mounted | N-TET',
    description:
      'Compare handheld drone detectors, hand-carried RF systems, integrated C-UAS field kits and vehicle-mounted configurations for temporary, patrol and mobile operations.',
    keywords: [
      'portable C-UAS system',
      'portable drone detector',
      'handheld drone detector',
      'mobile drone detector',
      'portable drone detection',
      'handheld drone detection',
      'portable RF drone detector',
      'portable counter drone system',
      'integrated C-UAS field kit',
      'vehicle mounted C-UAS',
      'mobile counter drone system',
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
    title: 'Critical Infrastructure C-UAS Solutions | N-TET',
    description:
      'C-UAS and low-altitude security workflows for oil and gas facilities, chemical plants, hydroelectric dams, substations, and other critical infrastructure sites.',
    keywords: [
      'critical infrastructure C-UAS',
      'chemical plant C-UAS',
      'oil production base C-UAS',
      'hydroelectric dam C-UAS',
      'low altitude warning',
      'target identification',
      'target tracking',
      'low altitude monitoring equipment',
    ],
  },
  '/solutions/category/03_KeyAreaSecurity': {
    title: 'Key Area C-UAS & Security Screening Solutions | N-TET',
    description:
      'C-UAS, low-altitude warning, perimeter awareness, and security screening workflows for airports, large events, judicial facilities, and transport hubs.',
    keywords: [
      'key area C-UAS',
      'airport C-UAS',
      'large event C-UAS',
      'judicial sector C-UAS',
      'security screening systems',
      'low altitude warning',
      'electro optical surveillance',
    ],
  },
  '/solutions/chemical-plant-protection': {
    title: 'Chemical Plant C-UAS Solution | N-TET',
    description:
      'Chemical plant C-UAS workflow for low-altitude risk detection, target identification, location, tracking, warning, and site response planning.',
    keywords: [
      'chemical plant C-UAS',
      'chemical plant anti drone',
      'chemical plant monitoring',
      'low altitude warning',
      'target identification',
      'target tracking',
      'RF monitoring',
      'EO tracking',
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
    title: 'C-UAS Deployment References | N-TET',
    description:
      'Review N-TET C-UAS deployment references for airports, power facilities, refineries, industrial sites, major events, and water-conservancy infrastructure.',
    keywords: [
      'C-UAS deployment cases',
      'counter drone case',
      'airport C-UAS case',
      'critical infrastructure C-UAS',
      'low altitude monitoring case',
      'event security C-UAS',
      'refinery monitoring case',
    ],
  },
  '/media': {
    title: 'C-UAS Company & Industry News | N-TET',
    description:
      'Read N-TET company updates and industry analysis on C-UAS planning, detection technologies, sensor integration, and operator workflows.',
    keywords: [
      'C-UAS news',
      'counter drone detection',
      'RF drone detection',
      'radar drone detection',
      'EO IR verification',
      'low altitude airspace management',
    ],
  },
  '/about': {
    title: 'About N-TET | C-UAS Equipment Manufacturer & System Supplier',
    description:
      'N-TET is a Beijing-based C-UAS equipment manufacturer and system supplier supporting integration, testing, documentation and international delivery.',
    keywords: [
      'C-UAS equipment manufacturer',
      'C-UAS system supplier',
      'C-UAS system integration',
      'C-UAS equipment',
      'C-UAS project delivery',
      'N-TET',
    ],
  },
  '/contact': {
    title: 'Request C-UAS Equipment Pricing & System Proposal | N-TET',
    description:
      'Request C-UAS equipment pricing, product documents or a system configuration review from N-TET for portable, fixed-site and vehicle-mounted projects.',
    keywords: [
      'C-UAS equipment quotation',
      'C-UAS equipment pricing',
      'C-UAS system proposal',
      'counter drone system supplier',
      'C-UAS project consultation',
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
  'drone-detection': ['C-UAS equipment', 'early warning equipment', 'target identification and tracking system'],
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
        'N-TET conecta plataformas UAV industriales, monitoreo aéreo de baja altitud, flujos de inspección y sistemas de inspección de seguridad para infraestructura y sitios públicos.',
      keywords: ['sistemas UAV industriales', 'monitoreo de baja altitud', 'dron de inspección UAV', 'UAV de emergencia', 'equipos de monitoreo aéreo'],
    },
    '/products': {
      title: "Sistemas UAV industriales y equipos de campo | Productos N-TET",
      description: "Explore plataformas UAV, cargas útiles de sensores, sistemas de monitoreo de baja altitud, equipos de inspección de seguridad y componentes UAV organizados por misión.",
      keywords: ["sistemas UAV industriales", "dron de inspeccion UAV", "UAV de emergencia", "equipos de monitoreo de baja altitud", "sistemas de inspeccion de seguridad", "materiales de ingenieria", "equipos medicos de campo", "accesorios para drones", "componentes UAV"],
    },
    '/accessories': {
      title: 'Accesorios para drones y componentes UAV | N-TET',
      description:
        'Consulte componentes UAV de N-TET para control de vuelo, propulsión, enlaces de datos, energía y cargas EO en proyectos industriales.',
      keywords: ['accesorios para drones', 'componentes UAV', 'gimbal UAV', 'motor UAV', 'enlace de datos UAV'],
    },
    '/solutions': {
      title: "Soluciones UAV industriales y monitoreo de baja altitud | N-TET",
      description: "Soluciones N-TET que conectan inspección UAV, respuesta de emergencia, monitoreo aéreo de baja altitud y flujos de seguridad de sitio para infraestructura.",
      keywords: ["soluciones UAV industriales", "soluciones de inspeccion UAV", "dron de respuesta de emergencia", "proteccion de infraestructura critica", "seguridad de areas clave", "monitoreo de baja altitud"],
    },
    '/cases': {
      title: "Casos de despliegue UAV y monitoreo de baja altitud | N-TET",
      description: "Revise referencias de campo de N-TET para rutas de inspección UAV, apoyo de emergencia, monitoreo de baja altitud y seguridad de infraestructura.",
      keywords: ["casos de despliegue UAV", "casos de inspeccion UAV", "patrullaje UAV de lineas electricas", "caso de monitoreo de baja altitud", "caso de apoyo de emergencia", "proteccion de infraestructura critica", "seguridad de areas clave"],
    },
    '/media': {
      title: 'Noticias sobre UAV industriales y monitoreo de baja altitud | N-TET',
      description:
        'Lea notas de ingeniería y actualizaciones de N-TET sobre operaciones UAV, planificación de baja altitud, arquitectura de monitoreo y entrega de proyectos.',
      keywords: ['noticias UAV industriales', 'economía de baja altitud', 'UAV cautivo', 'monitoreo de infraestructura'],
    },
    '/about': {
      title: 'Acerca de N-TET | Integrador de UAV industriales y monitoreo',
      description:
        'Conozca cómo N-TET conecta plataformas UAV, monitoreo aéreo, inspección de seguridad y entrega de proyectos para infraestructura y sitios públicos.',
      keywords: ['integrador de sistemas UAV industriales', 'proveedor de sistemas UAV', 'monitoreo de baja altitud', 'N-TET'],
    },
    '/contact': {
      title: 'Contacto N-TET | Sistemas UAV industriales y monitoreo',
      description:
        'Contacte a N-TET para selección de plataformas UAV, flujos de inspección con drones, proyectos UAV de emergencia y equipos de monitoreo de baja altitud.',
      keywords: ['cotización UAV industrial', 'proveedor UAV', 'solución de inspección con drones', 'monitoreo de baja altitud'],
    },
  },
  ru: {
    '/cases': {
      title: "Кейсы внедрения БПЛА и мониторинг низкой высоты | N-TET",
      description: "Изучите полевые примеры N-TET для маршрутов инспекции БПЛА, аварийной поддержки, низковысотного мониторинга и безопасности инфраструктурных объектов.",
      keywords: ["кейсы внедрения БПЛА", "кейсы инспекции БПЛА", "патрулирование ЛЭП БПЛА", "кейс мониторинга низкой высоты", "кейс аварийной поддержки", "защита критической инфраструктуры", "безопасность ключевых зон"],
    },
    '/solutions': {
      title: "Промышленные решения БПЛА и мониторинг низкой высоты | N-TET",
      description: "Решения N-TET объединяют инспекцию БПЛА, аварийное реагирование, мониторинг низковысотного пространства и рабочие процессы безопасности объектов.",
      keywords: ["промышленные решения БПЛА", "решения для инспекции БПЛА", "БПЛА аварийного реагирования", "защита критической инфраструктуры", "безопасность ключевых зон", "мониторинг низкой высоты"],
    },
    '/products': {
      title: "Промышленные БПЛА и полевое оборудование | Продукты N-TET",
      description: "Изучите платформы БПЛА, сенсорные полезные нагрузки, системы мониторинга низкой высоты, досмотровое оборудование и компоненты БПЛА по задачам.",
      keywords: ["промышленные БПЛА", "инспекционный БПЛА", "аварийный БПЛА", "оборудование мониторинга низкой высоты", "системы досмотра", "инженерные материалы", "полевое медицинское оборудование", "аксессуары для БПЛА", "компоненты БПЛА"],
    },
  },
  ar: {
    '/': {
      title: 'أنظمة UAV صناعية ومراقبة الارتفاع المنخفض | N-TET',
      description:
        'تربط N-TET منصات UAV الصناعية ومراقبة المجال منخفض الارتفاع وسير عمل التفتيش وأنظمة الفحص الأمني لمشغلي البنية التحتية والمواقع العامة.',
      keywords: ['أنظمة UAV صناعية', 'مراقبة الارتفاع المنخفض', 'طائرة UAV للتفتيش', 'طائرة UAV للطوارئ', 'معدات مراقبة المجال الجوي'],
    },
    '/products': {
      title: "أنظمة UAV الصناعية والمعدات الميدانية | منتجات N-TET",
      description: "استكشف منصات UAV وحمولات الاستشعار وأنظمة مراقبة الارتفاع المنخفض ومعدات الفحص الأمني ومكونات UAV مرتبة حسب المهمة.",
      keywords: ["أنظمة UAV الصناعية", "طائرة UAV للتفتيش", "طائرة UAV للطوارئ", "معدات مراقبة الارتفاع المنخفض", "أنظمة الفحص الأمني", "مواد الهندسة", "المعدات الطبية الميدانية", "ملحقات الطائرات بدون طيار", "مكونات UAV"],
    },
    '/accessories': {
      title: 'ملحقات ومكونات UAV | N-TET',
      description:
        'تصفح مكونات UAV من N-TET للتحكم بالطيران والدفع وروابط البيانات والطاقة والحمولات الكهروبصرية في المشروعات الصناعية.',
      keywords: ['ملحقات ومكونات UAV', 'ملحقات الطائرات بدون طيار', 'مكونات UAV', 'حامل كهروبصري UAV', 'محرك UAV', 'رابط بيانات UAV'],
    },
    '/solutions': {
      title: "حلول UAV الصناعية ومراقبة الارتفاع المنخفض | N-TET",
      description: "حلول N-TET تربط تفتيش UAV والاستجابة للطوارئ ومراقبة المجال منخفض الارتفاع وسير عمل أمن المواقع لمشغلي البنية التحتية.",
      keywords: ["حلول UAV الصناعية", "حلول تفتيش UAV", "طائرة استجابة للطوارئ", "حماية البنية التحتية الحرجة", "أمن المناطق الرئيسية", "مراقبة الارتفاع المنخفض"],
    },
    '/cases': {
      title: "حالات نشر UAV ومراقبة الارتفاع المنخفض | N-TET",
      description: "راجع مراجع N-TET الميدانية لمسارات تفتيش UAV والدعم الطارئ ومراقبة الارتفاع المنخفض وأمن مواقع البنية التحتية.",
      keywords: ["حالات نشر UAV", "حالات تفتيش UAV", "دوريات UAV لخطوط الكهرباء", "حالات مراقبة الارتفاع المنخفض", "حالات الدعم الطارئ", "حماية البنية التحتية الحرجة", "أمن المناطق الرئيسية"],
    },
    '/media': {
      title: 'رؤى وتحديثات UAV الصناعية | N-TET',
      description:
        'اقرأ ملاحظات هندسية وتحديثات من N-TET حول عمليات UAV وتخطيط الارتفاع المنخفض وبنية المراقبة وتسليم المشروعات.',
      keywords: ['رؤى وتحديثات UAV الصناعية', 'أخبار UAV صناعية', 'اقتصاد الارتفاع المنخفض', 'UAV مربوط', 'مراقبة البنية التحتية'],
    },
    '/about': {
      title: 'عن N-TET | تكامل UAV صناعي ومراقبة',
      description:
        'تعرف كيف تربط N-TET منصات UAV ومراقبة المجال الجوي والفحص الأمني وتسليم المشروعات لمشغلي البنية التحتية والمواقع العامة.',
      keywords: ['مصنع UAV صناعي', 'مورد أنظمة UAV', 'مراقبة المجال المنخفض', 'N-TET'],
    },
    '/contact': {
      title: 'اتصل بـ N-TET | أنظمة UAV صناعية ومعدات مراقبة',
      description:
        'تواصل مع N-TET لاختيار منصات UAV، وسير عمل التفتيش، ومشروعات UAV للطوارئ، ومعدات مراقبة الارتفاع المنخفض.',
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
