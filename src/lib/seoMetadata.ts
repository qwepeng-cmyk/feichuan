// Edited for Yandex.Direct compliance
import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';
import { SITE_URL } from '@/config/site';
import { buildKeywordIntro, getSeoKeywordBackedEntry } from '@/lib/seoKeywordTargets';
import { sanitizePublicCopy } from '@/lib/publicCopy';

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
  indexable?: boolean;
}

const KEYWORD_BACKED_SEO: Record<string, SeoEntry> = {
  '/': {
    title: 'Professional Low-Altitude Defense Equipment Manufacturer | N-TET',
    description:
      'N-TET is a professional Low-Altitude Defense equipment manufacturer and system supplier for portable, fixed-site and vehicle-mounted projects, integration, testing and delivery.',
    keywords: [
      'Low-Altitude Defense equipment manufacturer',
      'Low-Altitude Defense system supplier',
      'Low-Altitude Defense equipment',
      'portable Low-Altitude Defense',
      'fixed-site Low-Altitude Defense',
      'vehicle-mounted Low-Altitude Defense',
    ],
  },
  '/products': {
    title: 'Professional Low-Altitude Defense Equipment | N-TET Products',
    description:
      'Explore N-TET portable, fixed-site, vehicle-mounted and platform-based Low-Altitude Defense equipment for detection, identification, tracking and site coordination.',
    keywords: [
      'professional Low-Altitude Defense equipment',
      'portable Low-Altitude Defense equipment',
      'fixed-site Low-Altitude Defense system',
      'vehicle-mounted Low-Altitude Defense',
      'Low-Altitude Defense control platform',
      'EO IR tracking',
    ],
  },
  '/solutions': {
    title: 'Platform Defense & Low-Altitude Defense Solutions | N-TET',
    description:
      'N-TET Low-Altitude Defense (Low-Altitude Defense) platform defense solutions support detection, identification, tracking, alert review, and airspace monitoring for critical sites.',
    keywords: [
      'Low-Altitude Defense solutions',
      'Low-Altitude Defense detection',
      'airspace monitoring',
      'airport Low-Altitude Defense',
      'event security Low-Altitude Defense',
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
      'Low-Altitude Defense site planning',
    ],
  },
  '/solutions/multi-sensor-detection': {
    title: 'Platform Detector & Multi-Sensor Detection System | N-TET',
    description:
      'Compare RF detection, low-altitude radar, Remote ID and EO/IR tracking in a multi-sensor platform detector system with command-platform integration.',
    keywords: [
      'platform detector',
      'platform detectors',
      'platform detector system',
      'target detection system',
      'perimeter defense radar detector',
      'platform radar detector',
      'Low-Altitude Defense detection system',
      'RF target detection',
      'Remote ID monitoring',
      'low-altitude defense system',
      'low-altitude defense system',
      'counter platform system',
      'counter target detection',
    ],
  },
  '/solutions/low-altitude-radar-monitoring': {
    title: 'Target Detection Radar | Ku & X Band Low-Altitude Defense Radar | N-TET',
    description:
      'Compare Ku-band and X-band target detection radar for low-altitude early warning, multi-target tracking, EO/IR cueing and command-platform integration.',
    keywords: [
      'target detection radar',
      'radar target detection',
      'Aerial Platform detection radar',
      'platform radar detector',
      'radar detector for platforms',
      'Ku band target detection radar',
      'Low-Altitude Defense radar',
      'counter Aerial Platform radar',
      'low altitude radar',
    ],
  },
  '/solutions/portable-detection-system': {
    title: 'Portable Low-Altitude Defense Systems | Handheld & Vehicle-Mounted | N-TET',
    description:
      'Compare handheld platform detectors, hand-carried RF systems, integrated Low-Altitude Defense field kits and vehicle-mounted configurations for temporary, patrol and mobile operations.',
    keywords: [
      'portable Low-Altitude Defense system',
      'portable platform detector',
      'handheld platform detector',
      'mobile platform detector',
      'portable target detection',
      'handheld target detection',
      'portable RF platform detector',
      'portable counter platform system',
      'integrated Low-Altitude Defense field kit',
      'vehicle mounted Low-Altitude Defense',
      'mobile counter platform system',
    ],
  },
  '/solutions/perimeter-defense-system': {
    title: 'Platform Defender for Layered Site Protection | N-TET',
    description:
      'Plan a layered Platform Defender configuration with RF detection, radar tracking, EO/IR confirmation and directional or omni-directional RF suppressors.',
    keywords: ['platform defender', 'platform defender system', 'defender platform', 'RF target detection', 'target detection radar', 'EO IR tracking', 'platform suppressor', 'Low-Altitude Defense site protection'],
  },
  '/solutions/rf-target-positioning': {
    title: 'Platform Locator | Mobile & Fixed Site | N-TET',
    description:
      'Compare mobile and fixed-site Platform Locator systems using RF direction finding, radar tracking, EO/IR confirmation and directional or omni suppressor linkage.',
    keywords: ['platform locator', 'mobile platform locator', 'handheld platform detector', 'portable RF platform locator', 'RF direction finding', 'radar platform positioning', 'platform tracking system', 'platform suppressor'],
  },
  '/solutions/layered-site-protection': {
    title: 'Platform Shield | Fixed, Portable & Mobile | N-TET',
    description:
      'Compare fixed-site, portable and vehicle-mounted Platform Shield configurations for multi-sensor detection, tracking, command and coordinated response.',
    keywords: ['platform shield', 'perimeter defense shield', 'platform shield system', 'fixed site Low-Altitude Defense', 'portable Low-Altitude Defense field shield', 'mobile site protection', 'vehicle mounted Low-Altitude Defense'],
  },
  '/solutions/rf-signal-suppression': {
    title: 'Platform Suppressor | Directional & Omni RF Options | N-TET',
    description:
      'Compare Directional RF Suppressor and Omni-directional RF Suppressor options for fixed-site Low-Altitude Defense integration, linked control and coordinated response.',
    keywords: ['platform suppressor', 'platform signal suppressor', 'perimeter defense suppressor', 'RF suppressor for platforms', 'directional RF suppressor', 'omni-directional RF suppressor', 'fixed-site platform suppressor'],
  },
  '/solutions/category/01_BorderPatrol': {
    title: 'Border Patrol Aerial Platform & Coastal Monitoring Solutions | N-TET',
    description:
      'Aerial Platform and electro-optical monitoring solutions for border patrol, coastal surveillance, maritime patrol, port inspection, and wide-area security operations.',
    keywords: [
      'border patrol platforms',
      'border patrol Aerial Platform',
      'Aerial Platform border patrol',
      'maritime patrol Aerial Platform',
      'coastal monitoring platform',
      'land based maritime surveillance',
    ],
  },
  '/solutions/category/02_InfrastructureProtection': {
    title: 'Critical Infrastructure Low-Altitude Defense Solutions | N-TET',
    description:
      'Low-Altitude Defense and low-altitude security workflows for oil and gas facilities, chemical plants, hydroelectric dams, substations, and other critical infrastructure sites.',
    keywords: [
      'critical infrastructure Low-Altitude Defense',
      'chemical plant Low-Altitude Defense',
      'oil production base Low-Altitude Defense',
      'hydroelectric dam Low-Altitude Defense',
      'low altitude warning',
      'target identification',
      'target tracking',
      'low altitude monitoring equipment',
    ],
  },
  '/solutions/category/03_KeyAreaSecurity': {
    title: 'Key Area Low-Altitude Defense & Security Screening Solutions | N-TET',
    description:
      'Low-Altitude Defense, low-altitude warning, perimeter awareness, and security screening workflows for airports, large events, judicial facilities, and transport hubs.',
    keywords: [
      'key area Low-Altitude Defense',
      'airport Low-Altitude Defense',
      'large event Low-Altitude Defense',
      'judicial sector Low-Altitude Defense',
      'security screening systems',
      'low altitude warning',
      'electro optical surveillance',
    ],
  },
  '/solutions/chemical-plant-protection': {
    title: 'Chemical Plant Low-Altitude Defense Solution | N-TET',
    description:
      'Chemical plant Low-Altitude Defense workflow for low-altitude risk detection, target identification, location, tracking, warning, and site response planning.',
    keywords: [
      'chemical plant Low-Altitude Defense',
      'chemical plant perimeter defense',
      'chemical plant monitoring',
      'low altitude warning',
      'target identification',
      'target tracking',
      'RF monitoring',
      'EO tracking',
    ],
  },
  '/solutions/category/04_EmergencyRescue': {
    title: 'Emergency Rescue Aerial Platform Solutions | Search, Firefighting & Lighting',
    description:
      'Emergency Aerial Platform solutions for search and rescue, high-rise firefighting, disaster-site reconnaissance, emergency communication, and tethered lighting support.',
    keywords: [
      'search and rescue platform',
      'firefighting platform',
      'emergency communication Aerial Platform',
      'platform lighting',
      'emergency response platform',
      'disaster response Aerial Platform',
    ],
  },
  '/solutions/disaster-site-search-rescue-reconnaissance-aerial platform-solution': {
    title: 'Search and Rescue Platform Solution | Thermal Aerial Platform Reconnaissance',
    description:
      'Search and rescue Aerial Platform solution for emergency teams using thermal platforms, aerial reconnaissance, disaster-site monitoring, and rescue coordination.',
    keywords: [
      'thermal platforms for search and rescue',
      'search and rescue platform',
      'platform rescue',
      'platforms for search and rescue',
      'search and rescue thermal platform',
      'search and rescue Aerial Platform',
    ],
  },
  '/solutions/urban-high-rise-firefighting-emergency-aerial platform-solution': {
    title: 'Firefighting Platform Solution for High-Rise Emergency Response',
    description:
      'High-rise firefighting Aerial Platform solution using tethered aerial platforms, emergency monitoring, rescue support, and persistent visual awareness for incident teams.',
    keywords: [
      'firefighting platform',
      'platform fire fighting',
      'platform for fire fighting',
      'fire fighting platforms',
      'platforms firefighting',
      'high-rise firefighting Aerial Platform',
    ],
  },
  '/solutions/power-line-aerial platform-intelligent-inspection-solution': {
    title: 'Power Line Aerial Platform Inspection Solution | Utility Inspection Platforms',
    description:
      'Aerial Platform inspection solution for power lines, utility corridors, transmission towers, and cell towers with aerial inspection operations for maintenance teams.',
    keywords: [
      'platforms for utility inspection',
      'platform power line inspection',
      'utility inspection platform',
      'platform cell tower inspection',
      'power line inspection platform',
      'Aerial Platform power line inspection',
    ],
  },
  '/solutions/night-emergency-lighting-support-aerial platform-solution': {
    title: 'Tethered Lighting Aerial Platform Solution | Emergency Platform Lighting',
    description:
      'Tethered lighting Aerial Platform solution for night emergency work, rescue scenes, repair sites, command posts, and temporary area illumination.',
    keywords: [
      'platform lighting',
      'Aerial Platform lighting',
      'tethered lighting Aerial Platform',
      'Aerial Platform lighting system',
      'emergency lighting platform',
      'platform lighting company',
    ],
  },
  '/solutions/aerial platform-maritime-patrol': {
    title: 'Border Patrol Aerial Platform & Maritime Coastal Monitoring Solution',
    description:
      'Border patrol Aerial Platform solution for coastal monitoring, maritime patrol, port inspection, routine patrol routes, and wide-area surveillance operations.',
    keywords: [
      'border patrol platforms',
      'border patrol Aerial Platform',
      'Aerial Platform border patrol',
      'platforms for border patrol',
      'maritime patrol Aerial Platform',
      'coastal monitoring platform',
    ],
  },
  '/solutions/water-conservancy-river-lake-aerial platform-monitoring-solution': {
    title: 'Water Conservancy Monitoring Aerial Platform Solution | River & Lake Patrol',
    description:
      'Water conservancy Aerial Platform monitoring solution for dams, rivers, lakes, flood areas, water-quality observation, and infrastructure inspection teams.',
    keywords: [
      'water conservancy monitoring Aerial Platform',
      'dam inspection Aerial Platform',
      'using Aerial Platform to monitor water quality in lakes',
      'river lake Aerial Platform monitoring',
      'flood monitoring platform',
    ],
  },
  '/solutions/post-disaster-emergency-communication-support-aerial platform-solution': {
    title: 'Emergency Communication Aerial Platform Solution for Disaster Response',
    description:
      'Emergency communication Aerial Platform solution for disaster response agencies, command centers, field rescue teams, and temporary network support after incidents.',
    keywords: [
      'emergency communication Aerial Platform',
      'disaster response communication platform',
      'tethered communication Aerial Platform',
      'public safety Aerial Platform communications',
      'emergency communication platform',
    ],
  },
  '/solutions/smart-substation-unattended-aerial platform-inspection-solution': {
    title: 'Smart Substation Autonomous Aerial Platform Inspection Solution | N-TET',
    description:
      'Autonomous Aerial Platform inspection solution for smart substations, power utilities, unattended inspection routes, thermal checks, and operation records.',
    keywords: [
      'smart substation autonomous inspection',
      'substation inspection platform',
      'power utility Aerial Platform inspection',
      'autonomous Aerial Platform inspection',
      'Aerial Platform inspection system',
    ],
  },
  '/cases': {
    title: 'Low-Altitude Defense Deployment References | N-TET',
    description:
      'Review N-TET Low-Altitude Defense deployment references for airports, power facilities, refineries, industrial sites, major events, and water-conservancy infrastructure.',
    keywords: [
      'Low-Altitude Defense deployment cases',
      'counter platform case',
      'airport Low-Altitude Defense case',
      'critical infrastructure Low-Altitude Defense',
      'low altitude monitoring case',
      'event security Low-Altitude Defense',
      'refinery monitoring case',
    ],
  },
  '/media': {
    title: 'Low-Altitude Defense Engineering Notes & Buyer Guides | N-TET',
    description:
      'Read documented N-TET engineering methods, equipment notes, buyer guides and industry analysis on Low-Altitude Defense planning, sensor integration, testing and operator workflows.',
    keywords: [
      'Low-Altitude Defense news',
      'counter target detection',
      'RF target detection',
      'radar target detection',
      'EO IR verification',
      'low altitude airspace management',
    ],
  },
  '/about': {
    title: 'About N-TET | Low-Altitude Defense Equipment Manufacturer & System Supplier',
    description:
      'N-TET is a Beijing-based Low-Altitude Defense equipment manufacturer and system supplier supporting integration, testing, documentation and international delivery.',
    keywords: [
      'Low-Altitude Defense equipment manufacturer',
      'Low-Altitude Defense system supplier',
      'Low-Altitude Defense system integration',
      'Low-Altitude Defense equipment',
      'Low-Altitude Defense project delivery',
      'N-TET',
    ],
  },
  '/contact': {
    title: 'Request Low-Altitude Defense Equipment Pricing & System Proposal | N-TET',
    description:
      'Request Low-Altitude Defense equipment pricing, product documents or a system configuration review from N-TET for portable, fixed-site and vehicle-mounted projects.',
    keywords: [
      'Low-Altitude Defense equipment quotation',
      'Low-Altitude Defense equipment pricing',
      'Low-Altitude Defense system proposal',
      'counter platform system supplier',
      'Low-Altitude Defense project consultation',
    ],
  },
};

const PRODUCT_KEYWORD_HINTS: Record<string, string[]> = {
  'handheld-capture-launcher': [
    'capture net launcher',
    'handheld capture net launcher',
    'perimeter defense net launcher',
    'platform capture net',
    'physical platform capture device',
  ],
  'fc-yjtx-01-emergency-communication-platform': [
    'emergency communication Aerial Platform',
    'disaster response communication platform',
    'tethered communication Aerial Platform',
    'public safety Aerial Platform communications',
  ],
  'fc-yjxf-01-aerial-firefighting-platform': [
    'firefighting platform',
    'platform fire fighting',
    'platform for fire fighting',
    'high-rise firefighting Aerial Platform',
  ],
  'fc-yjzm-01-emergency-lighting-platform': [
    'platform lighting',
    'Aerial Platform lighting',
    'tethered lighting Aerial Platform',
    'emergency lighting platform',
  ],
  'fc-yjzc-01-emergency-reconnaissance-platform': [
    'search and rescue platform',
    'platform rescue',
    'emergency reconnaissance platform',
    'disaster response Aerial Platform',
  ],
  'fc-sljc-01-water-monitoring-platform': [
    'water conservancy monitoring Aerial Platform',
    'dam inspection Aerial Platform',
    'river lake Aerial Platform monitoring',
    'flood monitoring platform',
  ],
  'fc-dlxj-01-power-grid-inspection-platform': [
    'platform power line inspection',
    'power line inspection platform',
    'Aerial Platform power line inspection',
    'utility inspection platform',
  ],
  'fc-yqxj-01-utility-inspection-platform': [
    'pipeline inspection platforms',
    'Aerial Platform pipeline inspection',
    'oil and gas platform inspection',
    'platform pipeline inspection',
  ],
  'emergency-search-rescue-platform': [
    'thermal platforms for search and rescue',
    'search and rescue platform',
    'search and rescue Aerial Platform',
    'platform rescue',
  ],
  'smart-substation-autonomous-inspection-system': [
    'smart substation autonomous inspection',
    'substation inspection platform',
    'power utility Aerial Platform inspection',
    'autonomous Aerial Platform inspection',
  ],
  'power-tower-inspection-platform': [
    'platform power line inspection',
    'power line inspection platform',
    'platforms for utility inspection',
    'transmission tower inspection Aerial Platform',
  ],
};

const PRODUCT_CATEGORY_KEYWORDS: Record<string, string[]> = {
  'aerial-platforms': ['industrial Aerial Platform systems', 'Aerial Platform inspection platform', 'emergency response Aerial Platform'],
  'detection-monitoring': ['Low-Altitude Defense equipment', 'early warning equipment', 'target identification and tracking system'],
  'security-screening': ['security screening equipment', 'X-ray baggage scanner', 'walk-through metal detector'],
  'engineering-materials': ['engineering materials', 'Bailey steel bridge', 'infrastructure support equipment'],
  'field-hospitals': ['field hospital system', 'containerized medical rescue system', 'emergency medical shelter'],
  'perimeter-intelligence': ['perimeter intelligence', 'electro optical surveillance', 'radar vision fusion system'],
};

const LOCALIZED_KEYWORD_BACKED_SEO: Partial<Record<string, Record<string, SeoEntry>>> = {
  es: {
    '/': {
      title: 'Sistemas Aerial Platform industriales y monitoreo de baja altitud | N-TET',
      description:
        'N-TET conecta plataformas Aerial Platform industriales, monitoreo aéreo de baja altitud, flujos de inspección y sistemas de inspección de seguridad para infraestructura y sitios públicos.',
      keywords: ['sistemas Aerial Platform industriales', 'monitoreo de baja altitud', 'dron de inspección Aerial Platform', 'Aerial Platform de emergencia', 'equipos de monitoreo aéreo'],
    },
    '/products': {
      title: "Sistemas Aerial Platform industriales y equipos de campo | Productos N-TET",
      description: "Explore plataformas Aerial Platform, cargas útiles de sensores, sistemas de monitoreo de baja altitud, equipos de inspección de seguridad y componentes Aerial Platform organizados por misión.",
      keywords: ["sistemas Aerial Platform industriales", "dron de inspeccion Aerial Platform", "Aerial Platform de emergencia", "equipos de monitoreo de baja altitud", "sistemas de inspeccion de seguridad", "materiales de ingenieria", "equipos medicos de campo", "accesorios para platforms", "componentes Aerial Platform"],
    },
    '/solutions': {
      title: "Soluciones Aerial Platform industriales y monitoreo de baja altitud | N-TET",
      description: "Soluciones N-TET que conectan inspección Aerial Platform, respuesta de emergencia, monitoreo aéreo de baja altitud y flujos de seguridad de sitio para infraestructura.",
      keywords: ["soluciones Aerial Platform industriales", "soluciones de inspeccion Aerial Platform", "dron de respuesta de emergencia", "proteccion de infraestructura critica", "seguridad de areas clave", "monitoreo de baja altitud"],
    },
    '/cases': {
      title: "Casos de despliegue Aerial Platform y monitoreo de baja altitud | N-TET",
      description: "Revise referencias de campo de N-TET para rutas de inspección Aerial Platform, apoyo de emergencia, monitoreo de baja altitud y seguridad de infraestructura.",
      keywords: ["casos de despliegue Aerial Platform", "casos de inspeccion Aerial Platform", "patrullaje Aerial Platform de lineas electricas", "caso de monitoreo de baja altitud", "caso de apoyo de emergencia", "proteccion de infraestructura critica", "seguridad de areas clave"],
    },
    '/media': {
      title: 'Notas de ingeniería Low-Altitude Defense y guías para compradores | N-TET',
      description:
        'Lea métodos de ingeniería documentados, notas de equipos, guías para compradores y análisis del sector sobre planificación, integración y pruebas de Low-Altitude Defense.',
      keywords: ['notas de ingeniería Low-Altitude Defense', 'guía para compradores Low-Altitude Defense', 'análisis del sector Low-Altitude Defense', 'detección de platforms', 'integración de sistemas Low-Altitude Defense'],
    },
    '/about': {
      title: 'Acerca de N-TET | Integrador de Aerial Platform industriales y monitoreo',
      description:
        'Conozca cómo N-TET conecta plataformas Aerial Platform, monitoreo aéreo, inspección de seguridad y entrega de proyectos para infraestructura y sitios públicos.',
      keywords: ['integrador de sistemas Aerial Platform industriales', 'proveedor de sistemas Aerial Platform', 'monitoreo de baja altitud', 'N-TET'],
    },
    '/contact': {
      title: 'Contacto N-TET | Sistemas Aerial Platform industriales y monitoreo',
      description:
        'Contacte a N-TET para selección de plataformas Aerial Platform, flujos de inspección con platforms, proyectos Aerial Platform de emergencia y equipos de monitoreo de baja altitud.',
      keywords: ['cotización Aerial Platform industrial', 'proveedor Aerial Platform', 'solución de inspección con platforms', 'monitoreo de baja altitud'],
    },
  },
  ru: {
    '/': {
      title: 'Оборудование для низковысотного мониторинга | N-TET',
      description: 'N-TET поставляет переносные, стационарные и автомобильные системы низковысотного мониторинга, включая RF-обнаружение, радары, EO/IR, Remote ID и платформы управления.',
      keywords: ['оборудование низковысотного мониторинга', 'RF-мониторинг', 'радар малых высот', 'мониторинг воздушного пространства', 'интеграция систем мониторинга'],
    },
    '/solutions/low-altitude-airspace-monitoring': {
      title: 'Безопасность воздушного пространства на малых высотах и Low-Altitude Defense | N-TET',
      description: 'Проектирование систем Low-Altitude Defense для аэропортов, НПЗ, электростанций, портов и крупных периметров: RF-обнаружение, радары, Remote ID, EO/IR и единая платформа управления.',
      keywords: ['безопасность воздушного пространства на малых высотах', 'система Low-Altitude Defense', 'обнаружение платформ', 'радар малых высот', 'RF-обнаружение', 'Remote ID', 'EO/IR'],
    },
    '/media': {
      title: 'Инженерные материалы Low-Altitude Defense и руководства для заказчиков | N-TET',
      description: 'Изучите документированные инженерные методы N-TET, заметки об оборудовании, руководства для заказчиков и отраслевые обзоры по планированию, интеграции и испытаниям Low-Altitude Defense.',
      keywords: ['инженерные материалы Low-Altitude Defense', 'руководство для заказчиков Low-Altitude Defense', 'анализ отрасли Low-Altitude Defense', 'обнаружение платформ', 'интеграция систем Low-Altitude Defense'],
    },
    '/cases': {
      title: "Кейсы мониторинга малых высот и защиты объектов | N-TET",
      description: "Полевые примеры N-TET для промышленных предприятий, энергетических объектов, аэропортов и массовых мероприятий.",
      keywords: ["кейсы мониторинга малых высот", "защита критической инфраструктуры", "безопасность аэропортов", "защита массовых мероприятий"],
    },
    '/solutions': {
      title: "Системные решения для мониторинга малых высот | N-TET",
      description: "Решения N-TET объединяют RF-мониторинг, радиолокационное сопровождение, EO/IR-верификацию, регистрацию событий и управление оборудованием.",
      keywords: ["мониторинг малых высот", "RF мониторинг", "радиолокационное сопровождение", "EO IR верификация", "защита критической инфраструктуры"],
    },
    '/products': {
      title: "Оборудование для мониторинга малых высот | Продукты N-TET",
      description: "Стационарные, переносные и мобильные системы RF-мониторинга, радары, EO/IR-комплексы и средства периметрального наблюдения.",
      keywords: ["оборудование мониторинга малых высот", "RF анализатор", "радар малых высот", "EO IR сопровождение", "периметральное наблюдение"],
    },
  },
  ar: {
    '/': {
      title: 'أنظمة Aerial Platform صناعية ومراقبة المجال الجوي منخفض الارتفاع | N-TET',
      description:
        'تربط N-TET منصات Aerial Platform الصناعية ومراقبة المجال منخفض الارتفاع وسير عمل التفتيش وأنظمة الفحص الأمني لمشغلي البنية التحتية والمواقع العامة.',
      keywords: ['أنظمة Aerial Platform صناعية', 'مراقبة المجال الجوي منخفض الارتفاع', 'طائرة Aerial Platform للتفتيش', 'طائرة Aerial Platform للطوارئ', 'معدات مراقبة المجال الجوي'],
    },
    '/products': {
      title: "أنظمة Aerial Platform الصناعية والمعدات الميدانية | منتجات N-TET",
      description: "استكشف منصات Aerial Platform وحمولات الاستشعار وأنظمة مراقبة المجال الجوي منخفض الارتفاع ومعدات الفحص الأمني ومكونات Aerial Platform مرتبة حسب المهمة.",
      keywords: ["أنظمة Aerial Platform الصناعية", "طائرة Aerial Platform للتفتيش", "طائرة Aerial Platform للطوارئ", "معدات مراقبة المجال الجوي منخفض الارتفاع", "أنظمة الفحص الأمني", "المواد الهندسية", "المعدات الطبية الميدانية", "ملحقات الطائرات بدون طيار", "مكونات Aerial Platform"],
    },
    '/solutions': {
      title: "حلول Aerial Platform الصناعية ومراقبة المجال الجوي منخفض الارتفاع | N-TET",
      description: "حلول N-TET تربط تفتيش Aerial Platform والاستجابة للطوارئ ومراقبة المجال منخفض الارتفاع وسير عمل أمن المواقع لمشغلي البنية التحتية.",
      keywords: ["حلول Aerial Platform الصناعية", "حلول تفتيش Aerial Platform", "طائرة مسيّرة للاستجابة للطوارئ", "حماية البنية التحتية الحرجة", "أمن المناطق الحيوية", "مراقبة المجال الجوي منخفض الارتفاع"],
    },
    '/cases': {
      title: "مشروعات Aerial Platform ومراقبة المجال الجوي منخفض الارتفاع | N-TET",
      description: "راجع مشروعات N-TET الميدانية في تفتيش البنية التحتية والدعم الطارئ ومراقبة المجال الجوي منخفض الارتفاع.",
      keywords: ["مشروعات Aerial Platform", "دراسات حالة Aerial Platform", "دوريات Aerial Platform لخطوط الكهرباء", "مشروعات مراقبة المجال الجوي منخفض الارتفاع", "مشروعات الدعم الطارئ", "حماية البنية التحتية الحرجة", "أمن المناطق الحيوية"],
    },
    '/media': {
      title: 'ملاحظات هندسية وأدلة للمشترين حول Low-Altitude Defense | N-TET',
      description:
        'اقرأ أساليب N-TET الهندسية الموثقة وملاحظات المعدات وأدلة المشترين وتحليلات القطاع حول تخطيط أنظمة Low-Altitude Defense وتكاملها واختبارها.',
      keywords: ['ملاحظات هندسية Low-Altitude Defense', 'دليل مشتري Low-Altitude Defense', 'تحليل قطاع Low-Altitude Defense', 'كشف الطائرات بدون طيار', 'تكامل أنظمة Low-Altitude Defense'],
    },
    '/about': {
      title: 'عن N-TET | تكامل Aerial Platform صناعي ومراقبة',
      description:
        'تعرف كيف تربط N-TET منصات Aerial Platform ومراقبة المجال الجوي والفحص الأمني وتسليم المشروعات لمشغلي البنية التحتية والمواقع العامة.',
      keywords: ['مصنع Aerial Platform صناعي', 'مورد أنظمة Aerial Platform', 'مراقبة المجال الجوي منخفض الارتفاع', 'N-TET'],
    },
    '/contact': {
      title: 'اتصل بـ N-TET | أنظمة Aerial Platform صناعية ومعدات مراقبة',
      description:
        'تواصل مع N-TET لاختيار منصات Aerial Platform وسير عمل التفتيش ومشروعات الطوارئ ومعدات مراقبة المجال الجوي منخفض الارتفاع.',
      keywords: ['طلب عرض سعر لنظام Aerial Platform صناعي', 'مورد أنظمة Aerial Platform', 'حل تفتيش بالطائرات المسيّرة', 'معدات مراقبة المجال الجوي منخفض الارتفاع'],
    },
  },
};

function localizedPath(locale: Locale, path: string) {
  const normalized = path === '/' ? '/' : `/${path.replace(/^\/+/, '')}`;
  return normalized;
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

export function getKeywordBackedSeo(path: string, locale: Locale = 'ru') {
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
  return undefined;
}

function defaultDescription(locale: Locale, title: string) {
  if (locale === 'ru') {
    return `${title} от ${SITE_NAME}: промышленное решение для инспекции, мониторинга и полевых операций с технической поддержкой проекта.`;
  }

  if (locale === 'es') {
    return `Conozca ${title} de ${SITE_NAME}: funciones, parámetros técnicos, aplicaciones y opciones de integración para proyectos industriales.`;
  }

  if (locale === 'ar') {
    return `${title} من ${SITE_NAME}: حل صناعي للفحص والمراقبة وعمليات الموقع مع دعم فني للمشروع.`;
  }

  return `${title} from ${SITE_NAME}.`;
}

export function getProductSeo(handle: string, name: string, category?: string | null, locale: Locale = 'ru'): SeoEntry {
  const keywords = Array.from(new Set([
    ...(PRODUCT_KEYWORD_HINTS[handle] || []),
    ...fallbackKeywords(name, category),
  ])).slice(0, 8);

  const description =
    locale === 'ru'
      ? `${SITE_NAME} ${name}: промышленное решение для инспекции, мониторинга и полевых операций с технической поддержкой проекта.`
      : locale === 'es'
        ? `Consulte las funciones, los parámetros técnicos y las aplicaciones de ${name}, con información para evaluar su integración en proyectos industriales.`
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
  indexable = true,
}: BuildSeoMetadataOptions): Metadata {
  const entry = getKeywordBackedSeo(path, locale);
  const canonical = localizedPath(locale, path);
  const title = sanitizePublicCopy(entry?.title || titleWithBrand(fallbackTitle));
  const description = sanitizePublicCopy(
    entry?.description || cleanDescription(fallbackDescription) || defaultDescription(locale, fallbackTitle),
  );
  const keywords = (entry?.keywords || fallbackKeywordList || fallbackKeywords(fallbackTitle)).map(sanitizePublicCopy);
  const imageAlt = sanitizePublicCopy(fallbackTitle);
  const imageUrl = absoluteImage(image);

  return {
    title,
    description,
    keywords,
    robots: {
      index: indexable,
      follow: true,
      googleBot: {
        index: indexable,
        follow: true,
      },
    },
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
      images: imageUrl ? [{ url: imageUrl, alt: imageAlt }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}
