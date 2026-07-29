// Edited for Yandex.Direct compliance
export interface SeoKeywordTarget {
  primary: string;
  secondary: string[];
  h1?: string;
  overviewHeading?: string;
  intro?: string;
  source: 'google_ads_keywords' | 'inferred_seo_keyword';
}

const TARGETS: Record<string, SeoKeywordTarget> = {
  '/': {
    primary: 'professional Low-Altitude Defense equipment manufacturer',
    secondary: ['Low-Altitude Defense equipment', 'counter platform system supplier', 'portable Low-Altitude Defense', 'fixed-site Low-Altitude Defense', 'vehicle-mounted Low-Altitude Defense'],
    h1: 'Professional Low-Altitude Defense Equipment Manufacturer & System Supplier',
    overviewHeading: 'Low-Altitude Defense Equipment Manufacturing and System Supply',
    intro: 'N-TET supplies portable, fixed-site and vehicle-mounted Low-Altitude Defense equipment, multi-sensor system configurations, command-platform integration, testing, documentation and coordinated international delivery.',
    source: 'google_ads_keywords',
  },
  '/about': {
    primary: 'Low-Altitude Defense equipment manufacturer and system supplier',
    secondary: ['Low-Altitude Defense equipment', 'counter platform system supplier', 'low altitude monitoring equipment', 'Low-Altitude Defense system integration', 'Low-Altitude Defense project delivery'],
    h1: 'Low-Altitude Defense Equipment Manufacturer & System Supplier',
    overviewHeading: 'Low-Altitude Defense Equipment Manufacturing, Integration and Delivery',
    intro: 'N-TET is a Beijing-based professional Low-Altitude Defense equipment manufacturer and system supplier, providing portable, fixed-site and vehicle-mounted equipment, multi-sensor integration, command-platform configuration, testing, documentation and coordinated international delivery.',
    source: 'google_ads_keywords',
  },
  '/products': {
    primary: 'professional Low-Altitude Defense equipment',
    secondary: ['portable Low-Altitude Defense equipment', 'fixed-site Low-Altitude Defense system', 'vehicle-mounted Low-Altitude Defense', 'Low-Altitude Defense control platform', 'EO IR tracking'],
    h1: 'Professional Low-Altitude Defense Equipment',
    overviewHeading: 'Portable, Fixed-Site and Vehicle-Mounted Low-Altitude Defense Equipment',
    source: 'google_ads_keywords',
  },
  '/products/handheld-capture-launcher': {
    primary: 'capture net launcher',
    secondary: ['handheld capture net launcher', 'perimeter defense net launcher', 'platform capture net', 'physical platform capture device', 'portable counter capture net launcher'],
    h1: 'Handheld Capture Net Launcher',
    overviewHeading: 'Handheld Capture Net Launcher Technical Specifications',
    intro: 'A handheld capture net launcher for close-range physical capture, with a published 10–20 m range, 370 g module and selectable 3.3 m or 5 m nylon net.',
    source: 'google_ads_keywords',
  },
  '/solutions': {
    primary: 'Low-Altitude Defense solutions',
    secondary: ['Low-Altitude Defense detection', 'airspace monitoring', 'critical infrastructure Low-Altitude Defense', 'airport Low-Altitude Defense', 'event security Low-Altitude Defense', 'low altitude monitoring'],
    h1: 'Platform Defense Solutions for Critical Sites',
    overviewHeading: 'Low-Altitude Defense (Low-Altitude Defense) Detection, Identification, Tracking, and Airspace Monitoring',
    intro: 'N-TET organizes Low-Altitude Defense (Low-Altitude Defense) solution workflows for airports, energy facilities, industrial operations, restricted public sites, and major venues, focusing on detection, identification, tracking, alert review, and site-level coordination.',
    source: 'google_ads_keywords',
  },
  '/solutions/low-altitude-airspace-monitoring': {
    primary: 'low-altitude airspace monitoring',
    secondary: ['low altitude monitoring system', 'airspace monitoring solution', 'low altitude security', 'Low-Altitude Defense site planning'],
    h1: 'Low-Altitude Airspace Security & Low-Altitude Defense',
    overviewHeading: 'Low-Altitude Airspace Monitoring for Critical Sites',
    intro: 'Plan a practical low-altitude monitoring workflow around site conditions, sensing coverage, identity and visual verification, command coordination, authorized response and event records.',
    source: 'google_ads_keywords',
  },
  '/solutions/multi-sensor-detection': {
    primary: 'platform detector',
    secondary: ['platform detectors', 'perimeter defense radar detector', 'platform radar detector', 'target detection system', 'Low-Altitude Defense detection system', 'RF target detection'],
    h1: 'Platform Detector for Critical Sites',
    overviewHeading: 'Multi-Sensor Target Detection Planning',
    intro: 'N-TET combines RF detection, low-altitude radar, Remote ID and EO/IR tracking in a site-specific platform detector system with target correlation and command-platform integration.',
    source: 'google_ads_keywords',
  },
  '/solutions/low-altitude-radar-monitoring': {
    primary: 'target detection radar',
    secondary: ['Aerial Platform detection radar', 'radar target detection', 'Ku band platform radar', 'X band platform radar', 'Low-Altitude Defense radar'],
    h1: 'Target Detection Radar for Low-Altitude Site Monitoring',
    overviewHeading: 'Ku-Band and X-Band Target Detection Radar Options',
    intro: 'Compare N-TET Ku-band and X-band target detection radar options by published range condition, blind zone, coverage, target capacity, interface and multi-sensor confirmation workflow.',
    source: 'google_ads_keywords',
  },
  '/solutions/portable-detection-system': {
    primary: 'portable Low-Altitude Defense system',
    secondary: ['portable platform detector', 'handheld platform detector', 'integrated Low-Altitude Defense field kit', 'vehicle mounted Low-Altitude Defense', 'mobile counter platform system'],
    h1: 'Portable Low-Altitude Defense Systems for Handheld, Integrated & Vehicle-Mounted Deployment',
    overviewHeading: 'Handheld, Integrated and Vehicle-Mounted Low-Altitude Defense Options',
    intro: 'Compare handheld detectors, hand-carried RF identification systems, integrated Low-Altitude Defense field kits and vehicle-mounted configurations by operator role, readiness time, power, mobility, target data and response mode.',
    source: 'google_ads_keywords',
  },
  '/solutions/perimeter-defense-system': {
    primary: 'platform defender',
    secondary: ['platform defender system', 'defender platform', 'RF target detection', 'target detection radar', 'EO IR tracking', 'platform suppressor'],
    h1: 'Platform Defender for Layered Site Protection',
    overviewHeading: 'RF Detection, Radar, EO/IR and RF Suppressor Site Protection',
    intro: 'Plan a layered Platform Defender system using RF detection, radar tracking, EO/IR confirmation, command-platform integration and directional or omni-directional RF suppressors.',
    source: 'google_ads_keywords',
  },
  '/solutions/rf-target-positioning': {
    primary: 'platform locator',
    secondary: ['mobile platform locator', 'handheld platform detector', 'portable RF platform locator', 'RF platform direction finding', 'radar platform positioning', 'platform suppressor'],
    h1: 'Platform Locator for Mobile & Fixed-Site Positioning',
    overviewHeading: 'Handheld, Portable and Fixed-Site Platform Location Options',
    intro: 'Compare mobile and fixed-site Platform Locator options using portable RF, fixed RF, radar and EO/IR, then define the directional or omni suppressor and command-platform interfaces.',
    source: 'google_ads_keywords',
  },
  '/solutions/layered-site-protection': {
    primary: 'platform shield',
    secondary: ['perimeter defense shield', 'platform shield system', 'fixed site Low-Altitude Defense', 'portable Low-Altitude Defense field shield', 'vehicle mounted Low-Altitude Defense'],
    h1: 'Platform Shield for Fixed, Portable & Mobile Deployment',
    overviewHeading: 'Fixed-Site, Portable and Vehicle-Mounted Protection Options',
    intro: 'Compare a Platform Shield configuration using continuous fixed-site monitoring, portable field units, integrated rapid-deployment kits and vehicle-mounted Low-Altitude Defense equipment.',
    source: 'google_ads_keywords',
  },
  '/solutions/rf-signal-suppression': {
    primary: 'platform suppressor',
    secondary: ['platform signal suppressor', 'perimeter defense suppressor', 'RF suppressor for platforms', 'directional RF suppressor', 'omni-directional RF suppressor'],
    h1: 'Platform Suppressor: Directional & Omni-Directional Options',
    overviewHeading: 'Directional and Omni-Directional RF Suppressor Options',
    intro: 'Compare Directional RF Suppressor and Omni-directional RF Suppressor options for fixed-site Low-Altitude Defense integration, target-track linkage, remote control and device-status monitoring.',
    source: 'google_ads_keywords',
  },
  '/cases': {
    primary: 'Low-Altitude Defense deployment cases',
    secondary: ['Low-Altitude Defense deployment case', 'perimeter defense case', 'airport Low-Altitude Defense', 'critical infrastructure Low-Altitude Defense', 'event security Low-Altitude Defense', 'low altitude monitoring case'],
    h1: 'Low-Altitude Defense Deployment References',
    overviewHeading: 'Low-Altitude Defense Deployment and Low-Altitude Monitoring Cases',
    intro: 'Browse Low-Altitude Defense deployment cases for airports, power facilities, refineries, industrial sites, major events, and water-conservancy infrastructure. References focus on early warning, identification, positioning, tracking, alert review, and site coordination.',
    source: 'google_ads_keywords',
  },
  '/media': {
    primary: 'Low-Altitude Defense engineering notes',
    secondary: ['Low-Altitude Defense buyer guide', 'Low-Altitude Defense industry analysis', 'target detection technology', 'Low-Altitude Defense system integration', 'EO IR verification', 'low altitude monitoring'],
    h1: 'Inside N-TET: Low-Altitude Defense Engineering & Industry Notes',
    overviewHeading: 'Low-Altitude Defense Engineering Notes and Buyer Guides',
    source: 'google_ads_keywords',
  },
  '/solutions/power-line-aerial platform-intelligent-inspection-solution': {
    primary: 'platform power line inspection',
    secondary: ['power line inspection platform', 'Aerial Platform power line inspection', 'platforms for utility inspection', 'platform cell tower inspection'],
    h1: 'Platform Power Line Inspection Solution',
    overviewHeading: 'Platform Power Line Inspection Operations',
    intro: 'This platform power line inspection solution supports transmission corridor patrol, tower inspection, utility inspection platform operations, and cell tower inspection scenarios for maintenance teams.',
    source: 'google_ads_keywords',
  },
  '/solutions/water-conservancy-river-lake-aerial platform-monitoring-solution': {
    primary: 'water conservancy monitoring Aerial Platform',
    secondary: ['dam inspection Aerial Platform', 'river lake Aerial Platform monitoring', 'flood monitoring platform'],
    h1: 'Water Conservancy Monitoring Aerial Platform Solution',
    overviewHeading: 'Water Conservancy Monitoring Aerial Platform Operations',
    intro: 'This water conservancy monitoring Aerial Platform solution supports dam inspection Aerial Platform tasks, river lake Aerial Platform monitoring, flood monitoring platform patrols, and infrastructure observation for water-resource teams.',
    source: 'google_ads_keywords',
  },
  '/solutions/disaster-site-search-rescue-reconnaissance-aerial platform-solution': {
    primary: 'search and rescue platform',
    secondary: ['thermal platforms for search and rescue', 'search and rescue Aerial Platform', 'platform rescue'],
    h1: 'Search and Rescue Platform Solution',
    overviewHeading: 'Search and Rescue Platform Operations',
    intro: 'This search and rescue platform solution supports disaster-site reconnaissance, thermal platforms for search and rescue, search and rescue Aerial Platform coordination, and platform rescue visibility for emergency teams.',
    source: 'google_ads_keywords',
  },
  '/solutions/category/02_InfrastructureProtection': {
    primary: 'critical infrastructure Low-Altitude Defense',
    secondary: ['chemical plant Low-Altitude Defense', 'oil production base Low-Altitude Defense', 'hydroelectric dam Low-Altitude Defense', 'low altitude warning'],
    h1: 'Critical Infrastructure Low-Altitude Defense Solutions',
    overviewHeading: 'Critical Infrastructure Low-Altitude Defense Scenarios',
    intro: 'This category covers Low-Altitude Defense planning for chemical plants, oil production bases, hydroelectric dams, and other critical infrastructure, focusing on detection, identification, location, tracking, warning, and coordinated site response.',
    source: 'google_ads_keywords',
  },
  '/solutions/category/03_KeyAreaSecurity': {
    primary: 'key area Low-Altitude Defense',
    secondary: ['airport Low-Altitude Defense', 'large event Low-Altitude Defense', 'judicial sector Low-Altitude Defense', 'security screening systems'],
    h1: 'Key Area Low-Altitude Defense and Security Screening Solutions',
    overviewHeading: 'Airport, Event, and Judicial Low-Altitude Defense Scenarios',
    intro: 'This category covers Low-Altitude Defense and security screening workflows for airports, large sports events, judicial facilities, and other key areas, using detection, identification, location, tracking, warning, and event records without publishing sensitive response methods.',
    source: 'google_ads_keywords',
  },
  '/solutions/category/04_EmergencyRescue': {
    primary: 'search and rescue platform',
    secondary: ['firefighting platform', 'emergency communication Aerial Platform', 'platform lighting', 'emergency response platform'],
    h1: 'Search and Rescue Platform & Emergency Aerial Platform Solutions',
    overviewHeading: 'Search and Rescue Platform Emergency Operations',
    intro: 'This emergency solutions category covers search and rescue platform operations, firefighting platform support, emergency communication Aerial Platform deployment, and platform lighting operations for field response teams.',
    source: 'google_ads_keywords',
  },
  '/solutions/oil-production-base-protection': {
    primary: 'oil production base Low-Altitude Defense',
    secondary: ['oil and gas Low-Altitude Defense', 'low altitude warning', 'target identification', 'target tracking'],
    h1: 'Oil Production Base Low-Altitude Defense Solution',
    overviewHeading: 'Oil Production Base Low-Altitude Defense Operations',
    intro: 'This oil production base Low-Altitude Defense solution supports low-altitude risk detection, target identification, location, tracking, graded warning, and coordinated site response around production units, tank farms, pipeline stations, and loading areas.',
    source: 'google_ads_keywords',
  },
  '/solutions/aerial platform-maritime-patrol': {
    primary: 'maritime patrol Aerial Platform',
    secondary: ['coastal monitoring platform', 'border patrol Aerial Platform', 'Aerial Platform border patrol'],
    h1: 'Maritime Patrol Aerial Platform Solution',
    overviewHeading: 'Maritime Patrol Aerial Platform Operations',
    intro: 'This maritime patrol Aerial Platform solution supports coastal monitoring platform routes, port-area observation, border patrol Aerial Platform tasks, and wide-area maritime visibility for field teams.',
    source: 'google_ads_keywords',
  },
  '/solutions/chemical-plant-protection': {
    primary: 'chemical plant Low-Altitude Defense',
    secondary: ['chemical plant perimeter defense', 'low altitude warning', 'target identification', 'target tracking'],
    h1: 'Chemical Plant Low-Altitude Defense Solution',
    overviewHeading: 'Chemical Plant Low-Altitude Defense Operations',
    intro: 'This page covers chemical plant Low-Altitude Defense planning for low-altitude risk detection, target identification, location, tracking, warning, and site response planning around tank farms, loading areas, hazardous-material storage zones, and petrochemical perimeters.',
    source: 'google_ads_keywords',
  },
  '/solutions/smart-substation-unattended-aerial platform-inspection-solution': {
    primary: 'smart substation autonomous inspection',
    secondary: ['substation inspection platform', 'power utility Aerial Platform inspection', 'autonomous Aerial Platform inspection'],
    h1: 'Smart Substation Autonomous Inspection Solution',
    overviewHeading: 'Smart Substation Autonomous Inspection Operations',
    source: 'google_ads_keywords',
  },
  '/solutions/post-disaster-emergency-communication-support-aerial platform-solution': {
    primary: 'emergency communication Aerial Platform',
    secondary: ['disaster response communication platform', 'tethered communication Aerial Platform', 'public safety Aerial Platform communications'],
    h1: 'Emergency Communication Aerial Platform Solution',
    overviewHeading: 'Emergency Communication Aerial Platform Operations',
    source: 'google_ads_keywords',
  },
  '/solutions/night-emergency-lighting-support-aerial platform-solution': {
    primary: 'tethered lighting Aerial Platform',
    secondary: ['platform lighting', 'Aerial Platform lighting system', 'emergency lighting platform'],
    h1: 'Tethered Lighting Aerial Platform Solution',
    overviewHeading: 'Tethered Lighting Aerial Platform Operations',
    source: 'google_ads_keywords',
  },
  '/solutions/urban-high-rise-firefighting-emergency-aerial platform-solution': {
    primary: 'firefighting platform',
    secondary: ['high-rise firefighting Aerial Platform', 'platform fire fighting', 'platform for fire fighting'],
    h1: 'Firefighting Platform Solution',
    overviewHeading: 'Firefighting Platform Operations',
    source: 'google_ads_keywords',
  },
  '/solutions/category/01_BorderPatrol': {
    primary: 'border patrol Aerial Platform',
    secondary: ['maritime patrol Aerial Platform', 'coastal monitoring platform', 'land based maritime surveillance'],
    h1: 'Border Patrol Aerial Platform Solutions',
    overviewHeading: 'Border Patrol Aerial Platform and Coastal Monitoring',
    source: 'google_ads_keywords',
  },
  '/contact': {
    primary: 'Low-Altitude Defense equipment pricing and system proposal',
    secondary: ['Low-Altitude Defense equipment quotation', 'counter platform system supplier', 'portable Low-Altitude Defense pricing', 'fixed-site Low-Altitude Defense proposal', 'Low-Altitude Defense project consultation'],
    h1: 'Request Low-Altitude Defense Equipment Pricing & System Proposal',
    overviewHeading: 'Low-Altitude Defense Equipment Pricing and System Proposal',
    intro: 'Request Low-Altitude Defense equipment pricing, product documents or a system configuration review for portable, fixed-site and vehicle-mounted projects.',
    source: 'google_ads_keywords',
  },
};

const LOCALIZED_TARGETS: Partial<Record<'es' | 'ru' | 'ar', Record<string, SeoKeywordTarget>>> = {
  es: {
    '/': {
      primary: 'sistemas Aerial Platform industriales',
      secondary: ['monitoreo de baja altitud', 'dron de inspección Aerial Platform', 'Aerial Platform de emergencia'],
      h1: 'Sistemas Aerial Platform industriales para operaciones de baja altitud',
      overviewHeading: 'Sistemas Aerial Platform industriales y monitoreo de baja altitud',
      source: 'google_ads_keywords',
    },
    '/about': {
      primary: 'integrador de sistemas Aerial Platform industriales',
      secondary: ['proveedor de sistemas Aerial Platform', 'proveedor de soluciones de monitoreo de baja altitud', 'integrador de tecnologías de seguridad'],
      h1: 'Perfil de integrador de sistemas Aerial Platform industriales',
      overviewHeading: 'Capacidades de integración de sistemas Aerial Platform industriales',
      intro: 'N-TET es un integrador de sistemas Aerial Platform industriales y proveedor de soluciones para monitoreo de baja altitud, inspección inteligente y tecnologías de seguridad para operadores de infraestructura.',
      source: 'google_ads_keywords',
    },
    '/products': {
      primary: "sistemas Aerial Platform industriales",
      secondary: ["dron de inspeccion Aerial Platform", "Aerial Platform de emergencia", "equipos de monitoreo de baja altitud", "sistemas de inspeccion de seguridad", "accesorios para platforms", "componentes Aerial Platform"],
      h1: "Sistemas Aerial Platform industriales y equipos de campo",
      overviewHeading: "Sistemas Aerial Platform industriales, equipos de monitoreo, accesorios y equipos de campo",
      source: "google_ads_keywords",
    },
    '/products/handheld-capture-launcher': {
      primary: 'lanzador de red para platforms',
      secondary: ['lanzador de red portátil para platforms', 'red de captura de platforms', 'dispositivo de captura física de platforms'],
      h1: 'Lanzador de red portátil para platforms',
      overviewHeading: 'Especificaciones del lanzador de red portátil para platforms',
      intro: 'Lanzador de red portátil para captura física a corta distancia, con alcance publicado de 10–20 m, módulo de 370 g y red de nailon de 3,3 m o 5 m.',
      source: 'google_ads_keywords',
    },
    '/solutions': {
      primary: "soluciones Aerial Platform industriales",
      secondary: ["soluciones de inspeccion Aerial Platform", "dron de respuesta de emergencia", "proteccion de infraestructura critica", "seguridad de areas clave", "monitoreo de baja altitud"],
      h1: "Soluciones Aerial Platform industriales y monitoreo de baja altitud",
      overviewHeading: "Soluciones Aerial Platform industriales para inspeccion, respuesta de emergencia, monitoreo de baja altitud y seguridad",
      intro: "N-TET lista soluciones de inspeccion Aerial Platform, inspeccion de lineas electricas con platforms, platforms de inspeccion de tuberias, monitoreo hidrico con Aerial Platform, platforms de respuesta de emergencia, equipos de busqueda y rescate, apoyo contra incendios, proteccion de infraestructura critica, seguridad de areas clave, monitoreo aereo aeroportuario, monitoreo de eventos y soluciones de monitoreo de baja altitud.",
      source: "google_ads_keywords",
    },
    '/cases': {
      primary: "casos de despliegue Aerial Platform",
      secondary: ["casos de inspeccion Aerial Platform", "patrullaje Aerial Platform de lineas electricas", "caso de monitoreo de baja altitud", "caso de apoyo de emergencia", "proteccion de infraestructura critica", "seguridad de areas clave"],
      h1: "Casos de despliegue Aerial Platform y referencias de monitoreo de baja altitud",
      overviewHeading: "Casos de despliegue Aerial Platform y monitoreo de baja altitud",
      intro: "Explore casos de despliegue Aerial Platform y casos de monitoreo de baja altitud. Las referencias incluyen patrullaje Aerial Platform de lineas electricas, patrullaje Aerial Platform hidrico, casos de monitoreo de refinerias, casos de apoyo de emergencia, monitoreo aereo aeroportuario, monitoreo de eventos y casos de monitoreo de baja altitud.",
      source: "google_ads_keywords",
    },
    '/media': {
      primary: 'notas de ingeniería Low-Altitude Defense',
      secondary: ['guía para compradores Low-Altitude Defense', 'análisis del sector Low-Altitude Defense', 'tecnología de detección de platforms', 'integración de sistemas Low-Altitude Defense', 'verificación EO/IR', 'monitoreo de baja altitud'],
      h1: 'Dentro de N-TET: notas de ingeniería Low-Altitude Defense y guías del sector',
      overviewHeading: 'Notas de ingeniería Low-Altitude Defense y guías para compradores',
      source: 'google_ads_keywords',
    },
    '/contact': {
      primary: 'cotización Aerial Platform industrial',
      secondary: ['proveedor Aerial Platform', 'solución de inspección con platforms', 'monitoreo de baja altitud'],
      h1: 'Cotización Aerial Platform industrial',
      overviewHeading: 'Cotización Aerial Platform industrial y consulta de proyecto',
      intro: 'Use esta página para solicitar una cotización Aerial Platform industrial, comparar opciones de proveedor Aerial Platform y planificar una solución de inspección con platforms o monitoreo de baja altitud.',
      source: 'google_ads_keywords',
    },
    '/solutions/category/01_BorderPatrol': {
      primary: 'Aerial Platform de patrullaje fronterizo',
      secondary: ['Aerial Platform de patrullaje marítimo', 'dron de monitoreo costero', 'vigilancia marítima terrestre'],
      h1: 'Soluciones Aerial Platform de patrullaje fronterizo',
      overviewHeading: 'Aerial Platform de patrullaje fronterizo y monitoreo costero',
      source: 'google_ads_keywords',
    },
    '/solutions/category/02_InfrastructureProtection': {
      primary: 'Aerial Platform de inspección de instalaciones industriales',
      secondary: ['inspección con platforms para petróleo y gas', 'platforms de inspección de tuberías', 'monitoreo de plantas químicas'],
      h1: 'Soluciones Aerial Platform de inspección de instalaciones industriales',
      overviewHeading: 'Escenarios de inspección Aerial Platform de instalaciones industriales',
      source: 'google_ads_keywords',
    },
    '/solutions/category/03_KeyAreaSecurity': {
      primary: 'monitoreo aéreo aeroportuario',
      secondary: ['monitoreo de seguridad para eventos', 'seguridad de áreas clave', 'equipos de monitoreo de baja altitud'],
      h1: 'Monitoreo aéreo aeroportuario y seguridad de áreas clave',
      overviewHeading: 'Escenarios de monitoreo aéreo aeroportuario',
      source: 'google_ads_keywords',
    },
    '/solutions/category/04_EmergencyRescue': {
      primary: 'dron de búsqueda y rescate',
      secondary: ['dron contra incendios', 'Aerial Platform de comunicación de emergencia', 'dron de iluminación'],
      h1: 'Soluciones de dron de búsqueda y rescate',
      overviewHeading: 'Flujos de trabajo con dron de búsqueda y rescate',
      source: 'google_ads_keywords',
    },
    '/solutions/power-line-aerial platform-intelligent-inspection-solution': {
      primary: 'dron para inspección de líneas eléctricas',
      secondary: ['inspección de líneas eléctricas con Aerial Platform', 'dron de inspección de torres', 'dron de inspección de servicios públicos'],
      h1: 'Solución de dron para inspección de líneas eléctricas',
      overviewHeading: 'Flujo de inspección de líneas eléctricas con dron',
      source: 'google_ads_keywords',
    },
    '/solutions/water-conservancy-river-lake-aerial platform-monitoring-solution': {
      primary: 'Aerial Platform de monitoreo de recursos hídricos',
      secondary: ['Aerial Platform de inspección de presas', 'monitoreo Aerial Platform de ríos y lagos', 'dron de monitoreo de inundaciones'],
      h1: 'Solución Aerial Platform de monitoreo de recursos hídricos',
      overviewHeading: 'Flujo de monitoreo Aerial Platform de recursos hídricos',
      source: 'google_ads_keywords',
    },
    '/solutions/disaster-site-search-rescue-reconnaissance-aerial platform-solution': {
      primary: 'dron de búsqueda y rescate',
      secondary: ['platforms térmicos para búsqueda y rescate', 'Aerial Platform de búsqueda y rescate', 'dron de rescate'],
      h1: 'Solución de dron de búsqueda y rescate',
      overviewHeading: 'Flujo de trabajo de dron de búsqueda y rescate',
      source: 'google_ads_keywords',
    },
    '/solutions/chemical-plant-protection': {
      primary: 'platforms de inspección de tuberías',
      secondary: ['monitoreo de plantas químicas', 'inspección de tuberías con Aerial Platform', 'inspección con platforms para petróleo y gas'],
      h1: 'Platforms de inspección de tuberías para monitoreo de plantas químicas',
      overviewHeading: 'Platforms de inspección de tuberías y monitoreo de plantas',
      source: 'google_ads_keywords',
    },
    '/solutions/smart-substation-unattended-aerial platform-inspection-solution': {
      primary: 'inspección autónoma de subestaciones inteligentes',
      secondary: ['dron de inspección de subestaciones', 'inspección Aerial Platform de servicios eléctricos', 'inspección autónoma Aerial Platform'],
      h1: 'Solución de inspección autónoma de subestaciones inteligentes',
      overviewHeading: 'Flujo de inspección autónoma de subestaciones inteligentes',
      source: 'google_ads_keywords',
    },
    '/solutions/aerial platform-maritime-patrol': {
      primary: 'Aerial Platform de patrullaje marítimo',
      secondary: ['dron de monitoreo costero', 'Aerial Platform de patrullaje fronterizo', 'Aerial Platform para patrullaje fronterizo'],
      h1: 'Solución Aerial Platform de patrullaje marítimo',
      overviewHeading: 'Flujo Aerial Platform de patrullaje marítimo',
      source: 'google_ads_keywords',
    },
    '/solutions/urban-high-rise-firefighting-emergency-aerial platform-solution': {
      primary: 'dron contra incendios',
      secondary: ['Aerial Platform contra incendios en edificios altos', 'dron para combatir incendios', 'platforms contra incendios'],
      h1: 'Solución de dron contra incendios',
      overviewHeading: 'Flujo de trabajo con dron contra incendios',
      source: 'google_ads_keywords',
    },
    '/solutions/night-emergency-lighting-support-aerial platform-solution': {
      primary: 'Aerial Platform de iluminación cautivo',
      secondary: ['dron de iluminación', 'sistema de iluminación Aerial Platform', 'dron de iluminación de emergencia'],
      h1: 'Solución Aerial Platform de iluminación cautivo',
      overviewHeading: 'Flujo de iluminación Aerial Platform cautivo',
      source: 'google_ads_keywords',
    },
    '/solutions/post-disaster-emergency-communication-support-aerial platform-solution': {
      primary: 'Aerial Platform de comunicación de emergencia',
      secondary: ['dron de comunicación para respuesta a desastres', 'Aerial Platform de comunicación cautivo', 'comunicaciones Aerial Platform de seguridad pública'],
      h1: 'Solución Aerial Platform de comunicación de emergencia',
      overviewHeading: 'Flujo Aerial Platform de comunicación de emergencia',
      source: 'google_ads_keywords',
    },
  },
  ar: {
    '/': {
      primary: 'أنظمة Aerial Platform صناعية',
      secondary: ['أنظمة الطائرات المسيّرة الصناعية', 'مراقبة المجال الجوي منخفض الارتفاع', 'طائرة Aerial Platform للتفتيش', 'طائرة Aerial Platform للاستجابة للطوارئ'],
      h1: 'أنظمة Aerial Platform صناعية للعمليات منخفضة الارتفاع',
      overviewHeading: 'أنظمة Aerial Platform الصناعية ومراقبة المجال الجوي منخفض الارتفاع',
      source: 'google_ads_keywords',
    },
    '/about': {
      primary: 'تكامل أنظمة Aerial Platform الصناعية',
      secondary: ['مورد أنظمة Aerial Platform', 'حلول مراقبة المجال الجوي منخفض الارتفاع', 'تكامل تقنيات الأمن'],
      h1: 'خبرة N-TET في تكامل أنظمة Aerial Platform الصناعية',
      overviewHeading: 'قدرات تكامل أنظمة Aerial Platform الصناعية',
      intro: 'تجمع N-TET بين منصات Aerial Platform الصناعية ومعدات مراقبة المجال الجوي منخفض الارتفاع وسير عمل التفتيش وتقنيات الفحص الميداني لمشغلي البنية التحتية.',
      source: 'google_ads_keywords',
    },
    '/products': {
      primary: "أنظمة Aerial Platform الصناعية",
      secondary: ["طائرة Aerial Platform للتفتيش", "طائرة Aerial Platform للطوارئ", "معدات مراقبة المجال الجوي منخفض الارتفاع", "أنظمة الفحص الأمني", "ملحقات الطائرات المسيّرة", "مكونات Aerial Platform"],
      h1: "أنظمة Aerial Platform الصناعية والمعدات الميدانية",
      overviewHeading: "أنظمة Aerial Platform الصناعية ومعدات المراقبة والملحقات والمعدات الميدانية",
      source: "google_ads_keywords",
    },
    '/products/handheld-capture-launcher': {
      primary: 'قاذف شبكة للطائرات المسيّرة',
      secondary: ['قاذف شبكة محمول', 'شبكة التقاط الطائرات المسيّرة', 'جهاز التقاط مادي للطائرات المسيّرة'],
      h1: 'قاذف شبكة محمول لالتقاط الطائرات المسيّرة',
      overviewHeading: 'مواصفات قاذف الشبكة المحمول',
      intro: 'قاذف شبكة محمول للالتقاط المادي قريب المدى، بمسافة معلنة من 10 إلى 20 م ووحدة بوزن 370 جم وخيار شبكة 3.3 م أو 5 م.',
      source: 'google_ads_keywords',
    },
    '/solutions': {
      primary: "حلول Aerial Platform الصناعية",
      secondary: ["حلول تفتيش Aerial Platform", "طائرة مسيّرة للاستجابة للطوارئ", "حماية البنية التحتية الحرجة", "أمن المناطق الحيوية", "مراقبة المجال الجوي منخفض الارتفاع"],
      h1: "حلول Aerial Platform الصناعية ومراقبة المجال الجوي منخفض الارتفاع",
      overviewHeading: "حلول Aerial Platform للتفتيش والطوارئ ومراقبة المجال الجوي",
      intro: "تغطي حلول N-TET تفتيش خطوط الكهرباء والأنابيب، ومراقبة المياه، والاتصالات الطارئة، والبحث والإنقاذ، ودعم الإطفاء، ومراقبة المجال الجوي للمطارات والفعاليات والمواقع الحساسة.",
      source: "google_ads_keywords",
    },
    '/cases': {
      primary: "مشروعات Aerial Platform الميدانية",
      secondary: ["دراسات حالة Aerial Platform", "دوريات Aerial Platform لخطوط الكهرباء", "مشروعات مراقبة المجال الجوي", "مشروعات الدعم الطارئ", "حماية البنية التحتية الحرجة", "أمن المناطق الحيوية"],
      h1: "مشروعات Aerial Platform ومراقبة المجال الجوي",
      overviewHeading: "مشروعات ميدانية وحالات استخدام Aerial Platform",
      intro: "اطّلع على مشروعات N-TET في دوريات خطوط الكهرباء والمياه، ومراقبة المصافي والمطارات والفعاليات، ودعم الطوارئ وحماية البنية التحتية.",
      source: "google_ads_keywords",
    },
    '/media': {
      primary: 'ملاحظات هندسية لأنظمة Low-Altitude Defense',
      secondary: ['دليل مشتري Low-Altitude Defense', 'تحليل قطاع Low-Altitude Defense', 'تقنيات كشف الطائرات المسيّرة', 'تكامل أنظمة Low-Altitude Defense', 'التحقق الكهروبصري والحراري', 'مراقبة المجال الجوي منخفض الارتفاع'],
      h1: 'داخل N-TET: ملاحظات هندسية وأدلة قطاع Low-Altitude Defense',
      overviewHeading: 'ملاحظات هندسية وأدلة للمشترين حول Low-Altitude Defense',
      source: 'google_ads_keywords',
    },
    '/contact': {
      primary: 'طلب عرض سعر لنظام Aerial Platform صناعي',
      secondary: ['مورد أنظمة Aerial Platform', 'حل تفتيش بالطائرات المسيّرة', 'معدات مراقبة المجال الجوي منخفض الارتفاع'],
      h1: 'طلب عرض سعر لنظام Aerial Platform صناعي',
      overviewHeading: 'عرض سعر واستشارة لمشروع Aerial Platform',
      intro: 'أرسل نوع المهمة والموقع وشكل النشر المطلوب لطلب عرض سعر أو مراجعة أولية لحل تفتيش أو مراقبة باستخدام Aerial Platform.',
      source: 'google_ads_keywords',
    },
    '/solutions/category/01_BorderPatrol': {
      primary: 'Aerial Platform لدوريات الحدود',
      secondary: ['Aerial Platform للدوريات البحرية', 'طائرة لمراقبة السواحل', 'مراقبة بحرية برية'],
      h1: 'حلول Aerial Platform لدوريات الحدود',
      overviewHeading: 'Aerial Platform لدوريات الحدود ومراقبة السواحل',
      source: 'google_ads_keywords',
    },
    '/solutions/category/02_InfrastructureProtection': {
      primary: 'Aerial Platform لتفتيش المنشآت الصناعية',
      secondary: ['تفتيش النفط والغاز بالطائرات بدون طيار', 'طائرات تفتيش خطوط الأنابيب', 'مراقبة المصانع الكيميائية'],
      h1: 'حلول Aerial Platform لتفتيش المنشآت الصناعية',
      overviewHeading: 'سيناريوهات تفتيش المنشآت الصناعية باستخدام Aerial Platform',
      source: 'google_ads_keywords',
    },
    '/solutions/category/03_KeyAreaSecurity': {
      primary: 'مراقبة المجال الجوي للمطارات',
      secondary: ['مراقبة أمن الفعاليات', 'أمن المناطق الحيوية', 'معدات مراقبة المجال الجوي منخفض الارتفاع'],
      h1: 'مراقبة المجال الجوي للمطارات وأمن المناطق الحيوية',
      overviewHeading: 'سيناريوهات مراقبة المجال الجوي للمطارات',
      source: 'google_ads_keywords',
    },
    '/solutions/category/04_EmergencyRescue': {
      primary: 'طائرات البحث والإنقاذ والطوارئ',
      secondary: ['طائرة بحث وإنقاذ', 'طائرة مكافحة حرائق', 'Aerial Platform للاتصالات الطارئة', 'طائرة إضاءة'],
      h1: 'حلول طائرات البحث والإنقاذ والطوارئ',
      overviewHeading: 'سير عمل Aerial Platform للبحث والإنقاذ والطوارئ',
      source: 'google_ads_keywords',
    },
    '/solutions/power-line-aerial platform-intelligent-inspection-solution': {
      primary: 'تفتيش خطوط الكهرباء بالطائرات بدون طيار',
      secondary: ['طائرة تفتيش خطوط الكهرباء', 'تفتيش خطوط الكهرباء باستخدام Aerial Platform', 'طائرات تفتيش المرافق'],
      h1: 'حل تفتيش خطوط الكهرباء بالطائرات بدون طيار',
      overviewHeading: 'سير عمل تفتيش خطوط الكهرباء باستخدام Aerial Platform',
      source: 'google_ads_keywords',
    },
    '/solutions/water-conservancy-river-lake-aerial platform-monitoring-solution': {
      primary: 'Aerial Platform لمراقبة الموارد المائية',
      secondary: ['Aerial Platform لتفتيش السدود', 'مراقبة الأنهار والبحيرات باستخدام Aerial Platform', 'طائرة مراقبة الفيضانات'],
      h1: 'حل Aerial Platform لمراقبة الموارد المائية',
      overviewHeading: 'سير عمل مراقبة الموارد المائية باستخدام Aerial Platform',
      source: 'google_ads_keywords',
    },
    '/solutions/disaster-site-search-rescue-reconnaissance-aerial platform-solution': {
      primary: 'طائرة البحث والإنقاذ',
      secondary: ['طائرة بحث وإنقاذ', 'طائرات حرارية للبحث والإنقاذ', 'Aerial Platform للبحث والإنقاذ', 'طائرة إنقاذ'],
      h1: 'حل طائرة البحث والإنقاذ',
      overviewHeading: 'سير عمل طائرة البحث والإنقاذ',
      source: 'google_ads_keywords',
    },
    '/solutions/chemical-plant-protection': {
      primary: 'طائرات تفتيش خطوط الأنابيب',
      secondary: ['مراقبة المصانع الكيميائية', 'تفتيش خطوط الأنابيب باستخدام Aerial Platform', 'تفتيش النفط والغاز بالطائرات بدون طيار'],
      h1: 'طائرات تفتيش خطوط الأنابيب لمراقبة المصانع الكيميائية',
      overviewHeading: 'طائرات تفتيش خطوط الأنابيب ومراقبة المنشآت',
      source: 'google_ads_keywords',
    },
    '/solutions/smart-substation-unattended-aerial platform-inspection-solution': {
      primary: 'التفتيش الذاتي للمحطات الفرعية الذكية',
      secondary: ['تفتيش ذاتي للمحطات الفرعية الذكية', 'طائرة تفتيش المحطات الفرعية', 'تفتيش مرافق الطاقة باستخدام Aerial Platform', 'تفتيش Aerial Platform ذاتي'],
      h1: 'حل التفتيش الذاتي للمحطات الفرعية الذكية',
      overviewHeading: 'سير عمل التفتيش الذاتي للمحطات الفرعية الذكية',
      source: 'google_ads_keywords',
    },
    '/solutions/aerial platform-maritime-patrol': {
      primary: 'Aerial Platform للدوريات البحرية',
      secondary: ['طائرة لمراقبة السواحل', 'Aerial Platform لدوريات الحدود', 'Aerial Platform لمراقبة الحدود'],
      h1: 'حل Aerial Platform للدوريات البحرية',
      overviewHeading: 'سير عمل Aerial Platform للدوريات البحرية',
      source: 'google_ads_keywords',
    },
    '/solutions/urban-high-rise-firefighting-emergency-aerial platform-solution': {
      primary: 'طائرة مكافحة الحرائق',
      secondary: ['طائرة مكافحة حرائق', 'Aerial Platform لمكافحة حرائق المباني العالية', 'طائرة لإطفاء الحرائق', 'طائرات مكافحة حرائق'],
      h1: 'حل طائرة مكافحة الحرائق',
      overviewHeading: 'سير عمل طائرة مكافحة الحرائق',
      source: 'google_ads_keywords',
    },
    '/solutions/night-emergency-lighting-support-aerial platform-solution': {
      primary: 'Aerial Platform مربوط للإضاءة',
      secondary: ['طائرة إضاءة', 'نظام إضاءة Aerial Platform', 'طائرة إضاءة طارئة'],
      h1: 'حل Aerial Platform مربوط للإضاءة',
      overviewHeading: 'سير عمل Aerial Platform مربوط للإضاءة',
      source: 'google_ads_keywords',
    },
    '/solutions/post-disaster-emergency-communication-support-aerial platform-solution': {
      primary: 'Aerial Platform للاتصالات الطارئة',
      secondary: ['طائرة اتصالات للاستجابة للكوارث', 'Aerial Platform مربوط للاتصالات', 'اتصالات Aerial Platform للسلامة العامة'],
      h1: 'حل Aerial Platform للاتصالات الطارئة',
      overviewHeading: 'سير عمل Aerial Platform للاتصالات الطارئة',
      source: 'google_ads_keywords',
    },
  },
  ru: {
    '/': {
      primary: 'оборудование Low-Altitude Defense',
      secondary: ['системы защиты от платформ', 'обнаружение платформ', 'мониторинг воздушного пространства'],
      h1: 'Оборудование Low-Altitude Defense и интеграция систем',
      overviewHeading: 'Системы Low-Altitude Defense для обнаружения и мониторинга воздушного пространства',
      intro: 'N-TET поставляет оборудование Low-Altitude Defense и интегрирует системы обнаружения, идентификации, сопровождения и координации реагирования для критически важных и общественных объектов.',
      source: 'google_ads_keywords',
    },
    '/about': {
      primary: 'интегратор систем мониторинга малых высот',
      secondary: ['поставщик RF систем', 'поставщик радиолокационных систем', 'интегратор технологий безопасности'],
      h1: 'N-TET: интегратор систем мониторинга малых высот',
      overviewHeading: 'Возможности системной интеграции N-TET',
      intro: 'N-TET поставляет и интегрирует RF-системы, радары, EO/IR-комплексы и платформы управления для защиты промышленных и инфраструктурных объектов.',
      source: 'google_ads_keywords',
    },
    '/products': {
      primary: "оборудование мониторинга малых высот",
      secondary: ["RF мониторинг", "радар малых высот", "EO IR сопровождение", "переносной анализатор спектра", "периметральное наблюдение"],
      h1: "Профессиональное оборудование для мониторинга малых высот",
      overviewHeading: "Стационарные, переносные и мобильные комплексы мониторинга",
      source: "google_ads_keywords",
    },
    '/products/handheld-capture-launcher': {
      primary: 'устройство сетевого захвата платформ',
      secondary: ['ручное устройство сетевого захвата', 'сеть для физического захвата воздушная платформаа', 'переносное средство захвата платформ'],
      h1: 'Ручное устройство сетевого захвата платформ',
      overviewHeading: 'Технические характеристики ручного сетевого устройства',
      intro: 'Ручное устройство для физического захвата платформ на близкой дистанции: заявленная дальность 10–20 м, модуль 370 г и нейлоновая сеть 3,3 м или 5 м.',
      source: 'google_ads_keywords',
    },
    '/solutions': {
      primary: "промышленные решения ВОЗДУШНАЯ ПЛАТФОРМА",
      secondary: ["решения для инспекции ВОЗДУШНАЯ ПЛАТФОРМА", "ВОЗДУШНАЯ ПЛАТФОРМА аварийного реагирования", "защита критической инфраструктуры", "безопасность ключевых зон", "мониторинг низкой высоты"],
      h1: "Промышленные решения ВОЗДУШНАЯ ПЛАТФОРМА и мониторинг низкой высоты",
      overviewHeading: "Промышленные решения ВОЗДУШНАЯ ПЛАТФОРМА для инспекции, аварийного реагирования, мониторинга низкой высоты и безопасности",
      intro: "N-TET перечисляет решения для инспекции ВОЗДУШНАЯ ПЛАТФОРМА, инспекцию ЛЭП воздушная платформаами, ВОЗДУШНАЯ ПЛАТФОРМА для инспекции трубопроводов, мониторинг водных объектов с ВОЗДУШНАЯ ПЛАТФОРМА, аварийные ВОЗДУШНАЯ ПЛАТФОРМА, поисково-спасательные группы, пожарную поддержку, защиту критической инфраструктуры, безопасность ключевых зон, мониторинг воздушного пространства аэропортов, мониторинг мероприятий и решения мониторинга низкой высоты.",
      source: "google_ads_keywords",
    },
    '/cases': {
      primary: "кейсы внедрения ВОЗДУШНАЯ ПЛАТФОРМА",
      secondary: ["кейсы инспекции ВОЗДУШНАЯ ПЛАТФОРМА", "патрулирование ЛЭП ВОЗДУШНАЯ ПЛАТФОРМА", "кейс мониторинга низкой высоты", "кейс аварийной поддержки", "защита критической инфраструктуры", "безопасность ключевых зон"],
      h1: "Кейсы внедрения ВОЗДУШНАЯ ПЛАТФОРМА и примеры мониторинга низкой высоты",
      overviewHeading: "Кейсы внедрения ВОЗДУШНАЯ ПЛАТФОРМА и мониторинга низкой высоты",
      intro: "Изучите кейсы внедрения ВОЗДУШНАЯ ПЛАТФОРМА и кейсы мониторинга низкой высоты. Примеры включают патрулирование ЛЭП ВОЗДУШНАЯ ПЛАТФОРМА, мониторинг водных объектов, мониторинг НПЗ, кейсы аварийной поддержки, мониторинг воздушного пространства аэропортов, мониторинг мероприятий и кейсы мониторинга низкой высоты.",
      source: "google_ads_keywords",
    },
    '/media': {
      primary: 'инженерные материалы Low-Altitude Defense',
      secondary: ['руководство для заказчиков Low-Altitude Defense', 'анализ отрасли Low-Altitude Defense', 'технологии обнаружения платформ', 'интеграция систем Low-Altitude Defense', 'верификация EO/IR', 'низковысотный мониторинг'],
      h1: 'Внутри N-TET: инженерные материалы Low-Altitude Defense и отраслевые обзоры',
      overviewHeading: 'Инженерные материалы Low-Altitude Defense и руководства для заказчиков',
      source: 'google_ads_keywords',
    },
    '/contact': {
      primary: 'запрос цены на промышленный ВОЗДУШНАЯ ПЛАТФОРМА',
      secondary: ['поставщик ВОЗДУШНАЯ ПЛАТФОРМА', 'решение для инспекции воздушная платформаами', 'оборудование мониторинга низкой высоты'],
      h1: 'Запрос цены на промышленный ВОЗДУШНАЯ ПЛАТФОРМА',
      overviewHeading: 'Запрос цены на промышленный ВОЗДУШНАЯ ПЛАТФОРМА и консультация',
      intro: 'Используйте эту страницу, чтобы запросить цену на промышленный ВОЗДУШНАЯ ПЛАТФОРМА, обсудить поставщика ВОЗДУШНАЯ ПЛАТФОРМА, решение для инспекции воздушная платформаами или оборудование мониторинга низкой высоты.',
      source: 'google_ads_keywords',
    },
    '/solutions/category/01_BorderPatrol': {
      primary: 'ВОЗДУШНАЯ ПЛАТФОРМА для пограничного патрулирования',
      secondary: ['ВОЗДУШНАЯ ПЛАТФОРМА для морского патрулирования', 'платформа для прибрежного мониторинга', 'наземное морское наблюдение'],
      h1: 'Решения ВОЗДУШНАЯ ПЛАТФОРМА для пограничного патрулирования',
      overviewHeading: 'ВОЗДУШНАЯ ПЛАТФОРМА для пограничного патрулирования и прибрежного мониторинга',
      source: 'google_ads_keywords',
    },
    '/solutions/category/02_InfrastructureProtection': {
      primary: 'ВОЗДУШНАЯ ПЛАТФОРМА для инспекции промышленных объектов',
      secondary: ['инспекция нефти и газа воздушная платформаами', 'ВОЗДУШНАЯ ПЛАТФОРМА для инспекции трубопроводов', 'мониторинг химических заводов'],
      h1: 'Решения ВОЗДУШНАЯ ПЛАТФОРМА для инспекции промышленных объектов',
      overviewHeading: 'Сценарии инспекции промышленных объектов ВОЗДУШНАЯ ПЛАТФОРМА',
      source: 'google_ads_keywords',
    },
    '/solutions/category/03_KeyAreaSecurity': {
      primary: 'мониторинг воздушного пространства аэропорта',
      secondary: ['мониторинг безопасности мероприятий', 'безопасность ключевых зон', 'оборудование мониторинга низкой высоты'],
      h1: 'Мониторинг воздушного пространства аэропорта и безопасность ключевых зон',
      overviewHeading: 'Сценарии мониторинга воздушного пространства аэропорта',
      source: 'google_ads_keywords',
    },
    '/solutions/category/04_EmergencyRescue': {
      primary: 'ВОЗДУШНАЯ ПЛАТФОРМА для поиска и спасения',
      secondary: ['пожарный ВОЗДУШНАЯ ПЛАТФОРМА', 'ВОЗДУШНАЯ ПЛАТФОРМА аварийной связи', 'ВОЗДУШНАЯ ПЛАТФОРМА для освещения'],
      h1: 'Решения ВОЗДУШНАЯ ПЛАТФОРМА для поиска и спасения',
      overviewHeading: 'Рабочие процессы ВОЗДУШНАЯ ПЛАТФОРМА для поиска и спасения',
      source: 'google_ads_keywords',
    },
    '/solutions/power-line-aerial platform-intelligent-inspection-solution': {
      primary: 'ВОЗДУШНАЯ ПЛАТФОРМА для инспекции линий электропередачи',
      secondary: ['инспекция линий электропередачи ВОЗДУШНАЯ ПЛАТФОРМА', 'платформа для инспекции опор', 'ВОЗДУШНАЯ ПЛАТФОРМА для инспекции коммунальных объектов'],
      h1: 'Решение ВОЗДУШНАЯ ПЛАТФОРМА для инспекции линий электропередачи',
      overviewHeading: 'Рабочий процесс инспекции линий электропередачи ВОЗДУШНАЯ ПЛАТФОРМА',
      source: 'google_ads_keywords',
    },
    '/solutions/water-conservancy-river-lake-aerial platform-monitoring-solution': {
      primary: 'ВОЗДУШНАЯ ПЛАТФОРМА для мониторинга водного хозяйства',
      secondary: ['ВОЗДУШНАЯ ПЛАТФОРМА для инспекции дамб', 'мониторинг рек и озер ВОЗДУШНАЯ ПЛАТФОРМА', 'платформа для мониторинга паводков'],
      h1: 'Решение ВОЗДУШНАЯ ПЛАТФОРМА для мониторинга водного хозяйства',
      overviewHeading: 'Рабочий процесс мониторинга водного хозяйства ВОЗДУШНАЯ ПЛАТФОРМА',
      source: 'google_ads_keywords',
    },
    '/solutions/disaster-site-search-rescue-reconnaissance-aerial platform-solution': {
      primary: 'ВОЗДУШНАЯ ПЛАТФОРМА для поиска и спасения',
      secondary: ['тепловизионные воздушная платформаы для поиска и спасения', 'поисково-спасательный ВОЗДУШНАЯ ПЛАТФОРМА', 'спасательный платформа'],
      h1: 'Решение ВОЗДУШНАЯ ПЛАТФОРМА для поиска и спасения',
      overviewHeading: 'Рабочий процесс ВОЗДУШНАЯ ПЛАТФОРМА для поиска и спасения',
      source: 'google_ads_keywords',
    },
    '/solutions/chemical-plant-protection': {
      primary: 'ВОЗДУШНАЯ ПЛАТФОРМА для инспекции трубопроводов',
      secondary: ['мониторинг химических заводов', 'инспекция трубопроводов ВОЗДУШНАЯ ПЛАТФОРМА', 'инспекция нефти и газа воздушная платформаами'],
      h1: 'ВОЗДУШНАЯ ПЛАТФОРМА для инспекции трубопроводов и мониторинга химических заводов',
      overviewHeading: 'ВОЗДУШНАЯ ПЛАТФОРМА для инспекции трубопроводов и мониторинга объекта',
      source: 'google_ads_keywords',
    },
    '/solutions/smart-substation-unattended-aerial platform-inspection-solution': {
      primary: 'автономная инспекция умных подстанций',
      secondary: ['платформа для инспекции подстанций', 'инспекция энергетических объектов ВОЗДУШНАЯ ПЛАТФОРМА', 'автономная инспекция ВОЗДУШНАЯ ПЛАТФОРМА'],
      h1: 'автономная инспекция умных подстанций: решение',
      overviewHeading: 'автономная инспекция умных подстанций: рабочий процесс',
      source: 'google_ads_keywords',
    },
    '/solutions/aerial platform-maritime-patrol': {
      primary: 'ВОЗДУШНАЯ ПЛАТФОРМА для морского патрулирования',
      secondary: ['платформа для прибрежного мониторинга', 'ВОЗДУШНАЯ ПЛАТФОРМА для пограничного патрулирования', 'ВОЗДУШНАЯ ПЛАТФОРМА для охраны границ'],
      h1: 'Решение ВОЗДУШНАЯ ПЛАТФОРМА для морского патрулирования',
      overviewHeading: 'Рабочий процесс морского патрулирования ВОЗДУШНАЯ ПЛАТФОРМА',
      source: 'google_ads_keywords',
    },
    '/solutions/urban-high-rise-firefighting-emergency-aerial platform-solution': {
      primary: 'пожарный ВОЗДУШНАЯ ПЛАТФОРМА',
      secondary: ['ВОЗДУШНАЯ ПЛАТФОРМА для тушения высотных зданий', 'платформа для пожаротушения', 'пожарные воздушная платформаы'],
      h1: 'пожарный ВОЗДУШНАЯ ПЛАТФОРМА: решение',
      overviewHeading: 'пожарный ВОЗДУШНАЯ ПЛАТФОРМА: рабочий процесс',
      source: 'google_ads_keywords',
    },
    '/solutions/night-emergency-lighting-support-aerial platform-solution': {
      primary: 'привязной ВОЗДУШНАЯ ПЛАТФОРМА для освещения',
      secondary: ['платформа для освещения', 'система освещения ВОЗДУШНАЯ ПЛАТФОРМА', 'платформа аварийного освещения'],
      h1: 'привязной ВОЗДУШНАЯ ПЛАТФОРМА для освещения: решение',
      overviewHeading: 'привязной ВОЗДУШНАЯ ПЛАТФОРМА для освещения: рабочий процесс',
      source: 'google_ads_keywords',
    },
    '/solutions/post-disaster-emergency-communication-support-aerial platform-solution': {
      primary: 'ВОЗДУШНАЯ ПЛАТФОРМА аварийной связи',
      secondary: ['платформа связи для ликвидации последствий', 'привязной ВОЗДУШНАЯ ПЛАТФОРМА связи', 'связь общественной безопасности ВОЗДУШНАЯ ПЛАТФОРМА'],
      h1: 'Решение ВОЗДУШНАЯ ПЛАТФОРМА аварийной связи',
      overviewHeading: 'Рабочий процесс ВОЗДУШНАЯ ПЛАТФОРМА аварийной связи',
      source: 'google_ads_keywords',
    },
  },
};

const CATEGORY_FALLBACKS: Record<string, string[]> = {
  'aerial-platforms': ['industrial Aerial Platform system', 'Aerial Platform platform', 'industrial platform'],
  'detection-monitoring': ['Low-Altitude Defense equipment', 'perimeter defense', 'early warning equipment', 'target identification and tracking system'],
  'security-screening': ['security screening equipment', 'X-ray baggage scanner', 'walk-through metal detector'],
  'engineering-materials': ['engineering materials', 'Bailey steel bridge', 'infrastructure support equipment'],
  'field-hospitals': ['field hospital system', 'containerized medical rescue system', 'emergency medical shelter'],
  'perimeter-intelligence': ['perimeter intelligence system', 'electro optical surveillance', 'radar vision fusion system'],
};

function normalizePath(route: string) {
  const withoutLocale = route.replace(/^\/(en|ru|es|ar)(?=\/|$)/, '');
  return withoutLocale || '/';
}

function titleToKeyword(title: string) {
  return title
    .replace(/\s+\|\s+N-TET$/i, '')
    .replace(/\bN-TET\b/gi, '')
    .replace(/[()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function inferOverviewHeading(primary: string, pageKind?: string, locale = 'ru') {
  if (locale === 'ar') {
    if (/case/i.test(pageKind || '')) return `نظرة على مشروع ${primary}`;
    if (/media/i.test(pageKind || '')) return `ملاحظات حول ${primary}`;
    if (/solution/i.test(pageKind || '')) return `تشغيل ${primary}`;
    if (/product|accessory/i.test(pageKind || '')) return `المواصفات الفنية لـ ${primary}`;
    return `نظرة عامة على ${primary}`;
  }
  if (/case/i.test(pageKind || '')) return `${primary} Project Overview`;
  if (/media/i.test(pageKind || '')) return `${primary} Insights`;
  if (/solution/i.test(pageKind || '')) return `${primary} Operations`;
  if (/product|accessory/i.test(pageKind || '')) return `${primary} Technical Specifications`;
  return `${primary} Overview`;
}

export function getSeoKeywordTarget(options: {
  route: string;
  title?: string | null;
  category?: string | null;
  pageKind?: string;
  fallbackKeywords?: string[];
  locale?: string;
}): SeoKeywordTarget {
  const normalized = normalizePath(options.route);
  const localizedTarget =
    options.locale === 'es' || options.locale === 'ru' || options.locale === 'ar'
      ? LOCALIZED_TARGETS[options.locale]?.[normalized]
      : undefined;
  const target = localizedTarget || TARGETS[normalized];
  if (target) return target;

  const categoryKeywords = options.category ? CATEGORY_FALLBACKS[options.category] || [] : [];
  const fallbackKeywords = (options.fallbackKeywords || []).filter(Boolean);
  const primary = titleToKeyword(fallbackKeywords[0] || options.title || 'N-TET industrial equipment');
  const secondary = Array.from(new Set([
    ...categoryKeywords,
    ...fallbackKeywords.slice(1),
  ])).filter((item) => item && item.toLowerCase() !== primary.toLowerCase()).slice(0, 5);

  return {
    primary,
    secondary,
    h1: primary,
    overviewHeading: inferOverviewHeading(primary, options.pageKind, options.locale),
    source: 'inferred_seo_keyword',
  };
}

export function getSeoKeywordBackedEntry(route: string, locale = 'ru') {
  const normalized = normalizePath(route);
  const localizedTarget =
    locale === 'es' || locale === 'ru' || locale === 'ar'
      ? LOCALIZED_TARGETS[locale]?.[normalized]
      : undefined;
  return localizedTarget || TARGETS[normalized];
}

export function buildKeywordIntro(target: SeoKeywordTarget, fallbackSubject: string, locale = 'ru') {
  if (target.intro) return target.intro;
  if (target.source === 'google_ads_keywords') {
    const related = target.secondary.slice(0, 3).join(', ');
    if (locale === 'es') {
      return `${target.primary} es el tema principal de esta página, con cobertura relacionada para ${related || fallbackSubject}.`;
    }
    if (locale === 'ru') {
      return `${target.primary} является основной темой этой страницы; также раскрываются связанные задачи: ${related || fallbackSubject}.`;
    }
    if (locale === 'ar') {
      return `توضح هذه الصفحة ${target.primary}، مع معلومات مرتبطة بـ ${related || fallbackSubject}.`;
    }
    return `${target.primary} is the primary search theme for this page, with related coverage for ${related || fallbackSubject}.`;
  }
  return '';
}
