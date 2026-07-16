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
    primary: 'professional C-UAS equipment manufacturer',
    secondary: ['C-UAS equipment', 'counter drone system supplier', 'portable C-UAS', 'fixed-site C-UAS', 'vehicle-mounted C-UAS'],
    h1: 'Professional C-UAS Equipment Manufacturer & System Supplier',
    overviewHeading: 'C-UAS Equipment Manufacturing and System Supply',
    intro: 'N-TET supplies portable, fixed-site and vehicle-mounted C-UAS equipment, multi-sensor system configurations, command-platform integration, testing, documentation and coordinated international delivery.',
    source: 'google_ads_keywords',
  },
  '/about': {
    primary: 'C-UAS equipment manufacturer and system supplier',
    secondary: ['C-UAS equipment', 'counter drone system supplier', 'low altitude monitoring equipment', 'C-UAS system integration', 'C-UAS project delivery'],
    h1: 'C-UAS Equipment Manufacturer & System Supplier',
    overviewHeading: 'C-UAS Equipment Manufacturing, Integration and Delivery',
    intro: 'N-TET is a Beijing-based professional C-UAS equipment manufacturer and system supplier, providing portable, fixed-site and vehicle-mounted equipment, multi-sensor integration, command-platform configuration, testing, documentation and coordinated international delivery.',
    source: 'google_ads_keywords',
  },
  '/products': {
    primary: 'professional C-UAS equipment',
    secondary: ['portable C-UAS equipment', 'fixed-site C-UAS system', 'vehicle-mounted C-UAS', 'C-UAS control platform', 'EO IR tracking'],
    h1: 'Professional C-UAS Equipment',
    overviewHeading: 'Portable, Fixed-Site and Vehicle-Mounted C-UAS Equipment',
    source: 'google_ads_keywords',
  },
  '/accessories': {
    primary: 'UAV components for system integration',
    secondary: ['UAV components', 'EO payload', 'UAV data link', 'UAV propulsion', 'flight controller'],
    h1: 'UAV Components for System Integration',
    overviewHeading: 'UAV Components for Integration and Local Assembly',
    source: 'google_ads_keywords',
  },
  '/solutions': {
    primary: 'C-UAS solutions',
    secondary: ['C-UAS detection', 'airspace monitoring', 'critical infrastructure C-UAS', 'airport C-UAS', 'event security C-UAS', 'low altitude monitoring'],
    h1: 'Drone Defense Solutions for Critical Sites',
    overviewHeading: 'Counter-UAS (C-UAS) Detection, Identification, Tracking, and Airspace Monitoring',
    intro: 'N-TET organizes Counter-UAS (C-UAS) solution workflows for airports, energy facilities, industrial operations, restricted public sites, and major venues, focusing on detection, identification, tracking, alert review, and site-level coordination.',
    source: 'google_ads_keywords',
  },
  '/solutions/low-altitude-airspace-monitoring': {
    primary: 'low-altitude airspace monitoring',
    secondary: ['low altitude monitoring system', 'airspace monitoring solution', 'low altitude security', 'C-UAS site planning'],
    h1: 'Low-Altitude Airspace Security & C-UAS',
    overviewHeading: 'Low-Altitude Airspace Monitoring for Critical Sites',
    intro: 'Plan a practical low-altitude monitoring workflow around site conditions, sensing coverage, identity and visual verification, command coordination, authorized response and event records.',
    source: 'google_ads_keywords',
  },
  '/solutions/drone-detector': {
    primary: 'drone detector',
    secondary: ['drone detectors', 'anti drone radar detector', 'drone radar detector', 'drone detection system', 'C-UAS detection system', 'RF drone detection'],
    h1: 'Drone Detector for Critical Sites',
    overviewHeading: 'Multi-Sensor Drone Detection Planning',
    intro: 'N-TET combines RF detection, low-altitude radar, Remote ID and EO/IR tracking in a site-specific drone detector system with target correlation and command-platform integration.',
    source: 'google_ads_keywords',
  },
  '/solutions/drone-radar-detection': {
    primary: 'drone detection radar',
    secondary: ['UAV detection radar', 'radar drone detection', 'Ku band drone radar', 'X band drone radar', 'C-UAS radar'],
    h1: 'Drone Detection Radar for Low-Altitude Site Monitoring',
    overviewHeading: 'Ku-Band and X-Band Drone Detection Radar Options',
    intro: 'Compare N-TET Ku-band and X-band drone detection radar options by published range condition, blind zone, coverage, target capacity, interface and multi-sensor confirmation workflow.',
    source: 'google_ads_keywords',
  },
  '/solutions/portable-drone-detection': {
    primary: 'portable C-UAS system',
    secondary: ['portable drone detector', 'handheld drone detector', 'integrated C-UAS field kit', 'vehicle mounted C-UAS', 'mobile counter drone system'],
    h1: 'Portable C-UAS Systems for Handheld, Integrated & Vehicle-Mounted Deployment',
    overviewHeading: 'Handheld, Integrated and Vehicle-Mounted C-UAS Options',
    intro: 'Compare handheld detectors, hand-carried RF identification systems, integrated C-UAS field kits and vehicle-mounted configurations by operator role, readiness time, power, mobility, target data and response mode.',
    source: 'google_ads_keywords',
  },
  '/solutions/drone-defender': {
    primary: 'drone defender',
    secondary: ['drone defender system', 'defender drone', 'RF drone detection', 'drone detection radar', 'EO IR tracking', 'drone jammer'],
    h1: 'Drone Defender for Layered Site Protection',
    overviewHeading: 'RF Detection, Radar, EO/IR and RF Jammer Site Protection',
    intro: 'Plan a layered Drone Defender system using RF detection, radar tracking, EO/IR confirmation, command-platform integration and directional or omni-directional RF jammers.',
    source: 'google_ads_keywords',
  },
  '/solutions/drone-locator': {
    primary: 'drone locator',
    secondary: ['mobile drone locator', 'handheld drone detector', 'portable RF drone locator', 'RF drone direction finding', 'radar drone positioning', 'drone jammer'],
    h1: 'Drone Locator for Mobile & Fixed-Site Positioning',
    overviewHeading: 'Handheld, Portable and Fixed-Site Drone Location Options',
    intro: 'Compare mobile and fixed-site Drone Locator options using portable RF, fixed RF, radar and EO/IR, then define the directional or omni jammer and command-platform interfaces.',
    source: 'google_ads_keywords',
  },
  '/solutions/drone-shield': {
    primary: 'drone shield',
    secondary: ['anti drone shield', 'drone shield system', 'fixed site C-UAS', 'portable C-UAS field shield', 'vehicle mounted C-UAS'],
    h1: 'Drone Shield for Fixed, Portable & Mobile Deployment',
    overviewHeading: 'Fixed-Site, Portable and Vehicle-Mounted Protection Options',
    intro: 'Compare a Drone Shield configuration using continuous fixed-site monitoring, portable field units, integrated rapid-deployment kits and vehicle-mounted C-UAS equipment.',
    source: 'google_ads_keywords',
  },
  '/solutions/drone-jammer': {
    primary: 'drone jammer',
    secondary: ['drone signal jammer', 'anti drone jammer', 'RF jammer for drones', 'directional RF jammer', 'omni-directional RF jammer'],
    h1: 'Drone Jammer: Directional & Omni-Directional Options',
    overviewHeading: 'Directional and Omni-Directional RF Jammer Options',
    intro: 'Compare Directional RF Jammer and Omni-directional RF Jammer options for fixed-site C-UAS integration, target-track linkage, remote control and device-status monitoring.',
    source: 'google_ads_keywords',
  },
  '/cases': {
    primary: 'C-UAS deployment cases',
    secondary: ['C-UAS deployment case', 'anti drone case', 'airport C-UAS', 'critical infrastructure C-UAS', 'event security C-UAS', 'low altitude monitoring case'],
    h1: 'C-UAS Deployment References',
    overviewHeading: 'C-UAS Deployment and Low-Altitude Monitoring Cases',
    intro: 'Browse C-UAS deployment cases for airports, power facilities, refineries, industrial sites, major events, and water-conservancy infrastructure. References focus on early warning, identification, positioning, tracking, alert review, and site coordination.',
    source: 'google_ads_keywords',
  },
  '/media': {
    primary: 'C-UAS engineering notes',
    secondary: ['C-UAS buyer guide', 'C-UAS industry analysis', 'drone detection technology', 'C-UAS system integration', 'EO IR verification', 'low altitude monitoring'],
    h1: 'Inside N-TET: C-UAS Engineering & Industry Notes',
    overviewHeading: 'C-UAS Engineering Notes and Buyer Guides',
    source: 'google_ads_keywords',
  },
  '/solutions/power-line-uav-intelligent-inspection-solution': {
    primary: 'drone power line inspection',
    secondary: ['power line inspection drone', 'UAV power line inspection', 'drones for utility inspection', 'drone cell tower inspection'],
    h1: 'Drone Power Line Inspection Solution',
    overviewHeading: 'Drone Power Line Inspection Operations',
    intro: 'This drone power line inspection solution supports transmission corridor patrol, tower inspection, utility inspection drone operations, and cell tower inspection scenarios for maintenance teams.',
    source: 'google_ads_keywords',
  },
  '/solutions/water-conservancy-river-lake-uav-monitoring-solution': {
    primary: 'water conservancy monitoring UAV',
    secondary: ['dam inspection UAV', 'river lake UAV monitoring', 'flood monitoring drone'],
    h1: 'Water Conservancy Monitoring UAV Solution',
    overviewHeading: 'Water Conservancy Monitoring UAV Operations',
    intro: 'This water conservancy monitoring UAV solution supports dam inspection UAV tasks, river lake UAV monitoring, flood monitoring drone patrols, and infrastructure observation for water-resource teams.',
    source: 'google_ads_keywords',
  },
  '/solutions/disaster-site-search-rescue-reconnaissance-uav-solution': {
    primary: 'search and rescue drone',
    secondary: ['thermal drones for search and rescue', 'search and rescue UAV', 'drone rescue'],
    h1: 'Search and Rescue Drone Solution',
    overviewHeading: 'Search and Rescue Drone Operations',
    intro: 'This search and rescue drone solution supports disaster-site reconnaissance, thermal drones for search and rescue, search and rescue UAV coordination, and drone rescue visibility for emergency teams.',
    source: 'google_ads_keywords',
  },
  '/solutions/category/02_InfrastructureProtection': {
    primary: 'critical infrastructure C-UAS',
    secondary: ['chemical plant C-UAS', 'oil production base C-UAS', 'hydroelectric dam C-UAS', 'low altitude warning'],
    h1: 'Critical Infrastructure C-UAS Solutions',
    overviewHeading: 'Critical Infrastructure C-UAS Scenarios',
    intro: 'This category covers C-UAS planning for chemical plants, oil production bases, hydroelectric dams, and other critical infrastructure, focusing on detection, identification, location, tracking, warning, and coordinated site response.',
    source: 'google_ads_keywords',
  },
  '/solutions/category/03_KeyAreaSecurity': {
    primary: 'key area C-UAS',
    secondary: ['airport C-UAS', 'large event C-UAS', 'judicial sector C-UAS', 'security screening systems'],
    h1: 'Key Area C-UAS and Security Screening Solutions',
    overviewHeading: 'Airport, Event, and Judicial C-UAS Scenarios',
    intro: 'This category covers C-UAS and security screening workflows for airports, large sports events, judicial facilities, and other key areas, using detection, identification, location, tracking, warning, and event records without publishing sensitive response methods.',
    source: 'google_ads_keywords',
  },
  '/solutions/category/04_EmergencyRescue': {
    primary: 'search and rescue drone',
    secondary: ['firefighting drone', 'emergency communication UAV', 'drone lighting', 'emergency response drone'],
    h1: 'Search and Rescue Drone & Emergency UAV Solutions',
    overviewHeading: 'Search and Rescue Drone Emergency Operations',
    intro: 'This emergency solutions category covers search and rescue drone operations, firefighting drone support, emergency communication UAV deployment, and drone lighting operations for field response teams.',
    source: 'google_ads_keywords',
  },
  '/solutions/oil-production-base-protection': {
    primary: 'oil production base C-UAS',
    secondary: ['oil and gas C-UAS', 'low altitude warning', 'target identification', 'target tracking'],
    h1: 'Oil Production Base C-UAS Solution',
    overviewHeading: 'Oil Production Base C-UAS Operations',
    intro: 'This oil production base C-UAS solution supports low-altitude risk detection, target identification, location, tracking, graded warning, and coordinated site response around production units, tank farms, pipeline stations, and loading areas.',
    source: 'google_ads_keywords',
  },
  '/solutions/uav-maritime-patrol': {
    primary: 'maritime patrol UAV',
    secondary: ['coastal monitoring drone', 'border patrol UAV', 'UAV border patrol'],
    h1: 'Maritime Patrol UAV Solution',
    overviewHeading: 'Maritime Patrol UAV Operations',
    intro: 'This maritime patrol UAV solution supports coastal monitoring drone routes, port-area observation, border patrol UAV tasks, and wide-area maritime visibility for field teams.',
    source: 'google_ads_keywords',
  },
  '/solutions/chemical-plant-protection': {
    primary: 'chemical plant C-UAS',
    secondary: ['chemical plant anti drone', 'low altitude warning', 'target identification', 'target tracking'],
    h1: 'Chemical Plant C-UAS Solution',
    overviewHeading: 'Chemical Plant C-UAS Operations',
    intro: 'This page covers chemical plant C-UAS planning for low-altitude risk detection, target identification, location, tracking, warning, and site response planning around tank farms, loading areas, hazardous-material storage zones, and petrochemical perimeters.',
    source: 'google_ads_keywords',
  },
  '/solutions/smart-substation-unattended-uav-inspection-solution': {
    primary: 'smart substation autonomous inspection',
    secondary: ['substation inspection drone', 'power utility UAV inspection', 'autonomous UAV inspection'],
    h1: 'Smart Substation Autonomous Inspection Solution',
    overviewHeading: 'Smart Substation Autonomous Inspection Operations',
    source: 'google_ads_keywords',
  },
  '/solutions/post-disaster-emergency-communication-support-uav-solution': {
    primary: 'emergency communication UAV',
    secondary: ['disaster response communication drone', 'tethered communication UAV', 'public safety UAV communications'],
    h1: 'Emergency Communication UAV Solution',
    overviewHeading: 'Emergency Communication UAV Operations',
    source: 'google_ads_keywords',
  },
  '/solutions/night-emergency-lighting-support-uav-solution': {
    primary: 'tethered lighting UAV',
    secondary: ['drone lighting', 'UAV lighting system', 'emergency lighting drone'],
    h1: 'Tethered Lighting UAV Solution',
    overviewHeading: 'Tethered Lighting UAV Operations',
    source: 'google_ads_keywords',
  },
  '/solutions/urban-high-rise-firefighting-emergency-uav-solution': {
    primary: 'firefighting drone',
    secondary: ['high-rise firefighting UAV', 'drone fire fighting', 'drone for fire fighting'],
    h1: 'Firefighting Drone Solution',
    overviewHeading: 'Firefighting Drone Operations',
    source: 'google_ads_keywords',
  },
  '/solutions/category/01_BorderPatrol': {
    primary: 'border patrol UAV',
    secondary: ['maritime patrol UAV', 'coastal monitoring drone', 'land based maritime surveillance'],
    h1: 'Border Patrol UAV Solutions',
    overviewHeading: 'Border Patrol UAV and Coastal Monitoring',
    source: 'google_ads_keywords',
  },
  '/contact': {
    primary: 'C-UAS equipment pricing and system proposal',
    secondary: ['C-UAS equipment quotation', 'counter drone system supplier', 'portable C-UAS pricing', 'fixed-site C-UAS proposal', 'C-UAS project consultation'],
    h1: 'Request C-UAS Equipment Pricing & System Proposal',
    overviewHeading: 'C-UAS Equipment Pricing and System Proposal',
    intro: 'Request C-UAS equipment pricing, product documents or a system configuration review for portable, fixed-site and vehicle-mounted projects.',
    source: 'google_ads_keywords',
  },
};

const LOCALIZED_TARGETS: Partial<Record<'es' | 'ru' | 'ar', Record<string, SeoKeywordTarget>>> = {
  es: {
    '/': {
      primary: 'sistemas UAV industriales',
      secondary: ['monitoreo de baja altitud', 'dron de inspección UAV', 'UAV de emergencia'],
      h1: 'Sistemas UAV industriales para operaciones de baja altitud',
      overviewHeading: 'Sistemas UAV industriales y monitoreo de baja altitud',
      source: 'google_ads_keywords',
    },
    '/about': {
      primary: 'integrador de sistemas UAV industriales',
      secondary: ['proveedor de sistemas UAV', 'proveedor de soluciones de monitoreo de baja altitud', 'integrador de tecnologías de seguridad'],
      h1: 'Perfil de integrador de sistemas UAV industriales',
      overviewHeading: 'Capacidades de integración de sistemas UAV industriales',
      intro: 'N-TET es un integrador de sistemas UAV industriales y proveedor de soluciones para monitoreo de baja altitud, inspección inteligente y tecnologías de seguridad para operadores de infraestructura.',
      source: 'google_ads_keywords',
    },
    '/products': {
      primary: "sistemas UAV industriales",
      secondary: ["dron de inspeccion UAV", "UAV de emergencia", "equipos de monitoreo de baja altitud", "sistemas de inspeccion de seguridad", "accesorios para drones", "componentes UAV"],
      h1: "Sistemas UAV industriales y equipos de campo",
      overviewHeading: "Sistemas UAV industriales, equipos de monitoreo, accesorios y equipos de campo",
      source: "google_ads_keywords",
    },
    '/accessories': {
      primary: 'accesorios para drones',
      secondary: ['componentes UAV', 'gimbal UAV', 'motor UAV', 'enlace de datos UAV'],
      h1: 'Accesorios para drones y componentes UAV',
      overviewHeading: 'Accesorios para drones industriales',
      source: 'google_ads_keywords',
    },
    '/solutions': {
      primary: "soluciones UAV industriales",
      secondary: ["soluciones de inspeccion UAV", "dron de respuesta de emergencia", "proteccion de infraestructura critica", "seguridad de areas clave", "monitoreo de baja altitud"],
      h1: "Soluciones UAV industriales y monitoreo de baja altitud",
      overviewHeading: "Soluciones UAV industriales para inspeccion, respuesta de emergencia, monitoreo de baja altitud y seguridad",
      intro: "N-TET lista soluciones de inspeccion UAV, inspeccion de lineas electricas con drones, drones de inspeccion de tuberias, monitoreo hidrico con UAV, drones de respuesta de emergencia, equipos de busqueda y rescate, apoyo contra incendios, proteccion de infraestructura critica, seguridad de areas clave, monitoreo aereo aeroportuario, monitoreo de eventos y soluciones de monitoreo de baja altitud.",
      source: "google_ads_keywords",
    },
    '/cases': {
      primary: "casos de despliegue UAV",
      secondary: ["casos de inspeccion UAV", "patrullaje UAV de lineas electricas", "caso de monitoreo de baja altitud", "caso de apoyo de emergencia", "proteccion de infraestructura critica", "seguridad de areas clave"],
      h1: "Casos de despliegue UAV y referencias de monitoreo de baja altitud",
      overviewHeading: "Casos de despliegue UAV y monitoreo de baja altitud",
      intro: "Explore casos de despliegue UAV y casos de monitoreo de baja altitud. Las referencias incluyen patrullaje UAV de lineas electricas, patrullaje UAV hidrico, casos de monitoreo de refinerias, casos de apoyo de emergencia, monitoreo aereo aeroportuario, monitoreo de eventos y casos de monitoreo de baja altitud.",
      source: "google_ads_keywords",
    },
    '/media': {
      primary: 'notas de ingeniería C-UAS',
      secondary: ['guía para compradores C-UAS', 'análisis del sector C-UAS', 'tecnología de detección de drones', 'integración de sistemas C-UAS', 'verificación EO/IR', 'monitoreo de baja altitud'],
      h1: 'Dentro de N-TET: notas de ingeniería C-UAS y guías del sector',
      overviewHeading: 'Notas de ingeniería C-UAS y guías para compradores',
      source: 'google_ads_keywords',
    },
    '/contact': {
      primary: 'cotización UAV industrial',
      secondary: ['proveedor UAV', 'solución de inspección con drones', 'monitoreo de baja altitud'],
      h1: 'Cotización UAV industrial',
      overviewHeading: 'Cotización UAV industrial y consulta de proyecto',
      intro: 'Use esta página para solicitar una cotización UAV industrial, comparar opciones de proveedor UAV y planificar una solución de inspección con drones o monitoreo de baja altitud.',
      source: 'google_ads_keywords',
    },
    '/solutions/category/01_BorderPatrol': {
      primary: 'UAV de patrullaje fronterizo',
      secondary: ['UAV de patrullaje marítimo', 'dron de monitoreo costero', 'vigilancia marítima terrestre'],
      h1: 'Soluciones UAV de patrullaje fronterizo',
      overviewHeading: 'UAV de patrullaje fronterizo y monitoreo costero',
      source: 'google_ads_keywords',
    },
    '/solutions/category/02_InfrastructureProtection': {
      primary: 'UAV de inspección de instalaciones industriales',
      secondary: ['inspección con drones para petróleo y gas', 'drones de inspección de tuberías', 'monitoreo de plantas químicas'],
      h1: 'Soluciones UAV de inspección de instalaciones industriales',
      overviewHeading: 'Escenarios de inspección UAV de instalaciones industriales',
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
      secondary: ['dron contra incendios', 'UAV de comunicación de emergencia', 'dron de iluminación'],
      h1: 'Soluciones de dron de búsqueda y rescate',
      overviewHeading: 'Flujos de trabajo con dron de búsqueda y rescate',
      source: 'google_ads_keywords',
    },
    '/solutions/power-line-uav-intelligent-inspection-solution': {
      primary: 'dron para inspección de líneas eléctricas',
      secondary: ['inspección de líneas eléctricas con UAV', 'dron de inspección de torres', 'dron de inspección de servicios públicos'],
      h1: 'Solución de dron para inspección de líneas eléctricas',
      overviewHeading: 'Flujo de inspección de líneas eléctricas con dron',
      source: 'google_ads_keywords',
    },
    '/solutions/water-conservancy-river-lake-uav-monitoring-solution': {
      primary: 'UAV de monitoreo de recursos hídricos',
      secondary: ['UAV de inspección de presas', 'monitoreo UAV de ríos y lagos', 'dron de monitoreo de inundaciones'],
      h1: 'Solución UAV de monitoreo de recursos hídricos',
      overviewHeading: 'Flujo de monitoreo UAV de recursos hídricos',
      source: 'google_ads_keywords',
    },
    '/solutions/disaster-site-search-rescue-reconnaissance-uav-solution': {
      primary: 'dron de búsqueda y rescate',
      secondary: ['drones térmicos para búsqueda y rescate', 'UAV de búsqueda y rescate', 'dron de rescate'],
      h1: 'Solución de dron de búsqueda y rescate',
      overviewHeading: 'Flujo de trabajo de dron de búsqueda y rescate',
      source: 'google_ads_keywords',
    },
    '/solutions/chemical-plant-protection': {
      primary: 'drones de inspección de tuberías',
      secondary: ['monitoreo de plantas químicas', 'inspección de tuberías con UAV', 'inspección con drones para petróleo y gas'],
      h1: 'Drones de inspección de tuberías para monitoreo de plantas químicas',
      overviewHeading: 'Drones de inspección de tuberías y monitoreo de plantas',
      source: 'google_ads_keywords',
    },
    '/solutions/smart-substation-unattended-uav-inspection-solution': {
      primary: 'inspección autónoma de subestaciones inteligentes',
      secondary: ['dron de inspección de subestaciones', 'inspección UAV de servicios eléctricos', 'inspección autónoma UAV'],
      h1: 'Solución de inspección autónoma de subestaciones inteligentes',
      overviewHeading: 'Flujo de inspección autónoma de subestaciones inteligentes',
      source: 'google_ads_keywords',
    },
    '/solutions/uav-maritime-patrol': {
      primary: 'UAV de patrullaje marítimo',
      secondary: ['dron de monitoreo costero', 'UAV de patrullaje fronterizo', 'UAV para patrullaje fronterizo'],
      h1: 'Solución UAV de patrullaje marítimo',
      overviewHeading: 'Flujo UAV de patrullaje marítimo',
      source: 'google_ads_keywords',
    },
    '/solutions/urban-high-rise-firefighting-emergency-uav-solution': {
      primary: 'dron contra incendios',
      secondary: ['UAV contra incendios en edificios altos', 'dron para combatir incendios', 'drones contra incendios'],
      h1: 'Solución de dron contra incendios',
      overviewHeading: 'Flujo de trabajo con dron contra incendios',
      source: 'google_ads_keywords',
    },
    '/solutions/night-emergency-lighting-support-uav-solution': {
      primary: 'UAV de iluminación cautivo',
      secondary: ['dron de iluminación', 'sistema de iluminación UAV', 'dron de iluminación de emergencia'],
      h1: 'Solución UAV de iluminación cautivo',
      overviewHeading: 'Flujo de iluminación UAV cautivo',
      source: 'google_ads_keywords',
    },
    '/solutions/post-disaster-emergency-communication-support-uav-solution': {
      primary: 'UAV de comunicación de emergencia',
      secondary: ['dron de comunicación para respuesta a desastres', 'UAV de comunicación cautivo', 'comunicaciones UAV de seguridad pública'],
      h1: 'Solución UAV de comunicación de emergencia',
      overviewHeading: 'Flujo UAV de comunicación de emergencia',
      source: 'google_ads_keywords',
    },
  },
  ar: {
    '/': {
      primary: 'أنظمة UAV صناعية',
      secondary: ['أنظمة الطائرات بدون طيار الصناعية', 'مراقبة الارتفاعات المنخفضة', 'طائرة UAV للتفتيش', 'طائرة UAV للاستجابة الطارئة'],
      h1: 'أنظمة UAV صناعية لعمليات المجال منخفض الارتفاع',
      overviewHeading: 'أنظمة UAV الصناعية ومراقبة الارتفاعات المنخفضة',
      source: 'google_ads_keywords',
    },
    '/about': {
      primary: 'مكامل أنظمة UAV الصناعية',
      secondary: ['مزود أنظمة UAV', 'مزود حلول مراقبة الارتفاع المنخفض', 'مكامل تقنيات الأمن'],
      h1: 'ملف مكامل أنظمة UAV الصناعية',
      overviewHeading: 'قدرات تكامل أنظمة UAV الصناعية',
      intro: 'تركز N-TET على تكامل أنظمة UAV الصناعية وحلول مراقبة الارتفاعات المنخفضة وسير عمل التفتيش وتقنيات الفحص الميداني لمشغلي البنية التحتية.',
      source: 'google_ads_keywords',
    },
    '/products': {
      primary: "أنظمة UAV الصناعية",
      secondary: ["طائرة UAV للتفتيش", "طائرة UAV للطوارئ", "معدات مراقبة الارتفاع المنخفض", "أنظمة الفحص الأمني", "ملحقات الطائرات بدون طيار", "مكونات UAV"],
      h1: "أنظمة UAV الصناعية والمعدات الميدانية",
      overviewHeading: "أنظمة UAV الصناعية ومعدات المراقبة والملحقات والمعدات الميدانية",
      source: "google_ads_keywords",
    },
    '/accessories': {
      primary: 'ملحقات ومكونات UAV',
      secondary: ['ملحقات الطائرات بدون طيار', 'مكونات UAV', 'حامل UAV', 'محرك UAV', 'رابط بيانات UAV'],
      h1: 'ملحقات ومكونات UAV',
      overviewHeading: 'ملحقات الطائرات بدون طيار للمنصات الصناعية',
      source: 'google_ads_keywords',
    },
    '/solutions': {
      primary: "حلول UAV الصناعية",
      secondary: ["حلول تفتيش UAV", "طائرة استجابة للطوارئ", "حماية البنية التحتية الحرجة", "أمن المناطق الرئيسية", "مراقبة الارتفاع المنخفض"],
      h1: "حلول UAV الصناعية ومراقبة الارتفاع المنخفض",
      overviewHeading: "حلول UAV الصناعية للتفتيش والاستجابة للطوارئ ومراقبة الارتفاع المنخفض والأمن",
      intro: "تعرض N-TET حلول تفتيش UAV، وتفتيش خطوط الكهرباء بالطائرات بدون طيار، وطائرات تفتيش خطوط الأنابيب، ومراقبة المياه باستخدام UAV، وطائرات الاستجابة للطوارئ، وفرق البحث والإنقاذ، ودعم مكافحة الحرائق، وحماية البنية التحتية الحرجة، وأمن المناطق الرئيسية، ومراقبة المجال الجوي للمطارات، ومراقبة الفعاليات، وحلول مراقبة الارتفاع المنخفض.",
      source: "google_ads_keywords",
    },
    '/cases': {
      primary: "حالات نشر UAV",
      secondary: ["حالات تفتيش UAV", "دوريات UAV لخطوط الكهرباء", "حالات مراقبة الارتفاع المنخفض", "حالات الدعم الطارئ", "حماية البنية التحتية الحرجة", "أمن المناطق الرئيسية"],
      h1: "حالات نشر UAV ومراجع مراقبة الارتفاع المنخفض",
      overviewHeading: "حالات نشر UAV ومراقبة الارتفاع المنخفض",
      intro: "تصفح حالات نشر UAV وحالات مراقبة الارتفاع المنخفض. تشمل المراجع دوريات UAV لخطوط الكهرباء، ودوريات UAV للمياه، وحالات مراقبة المصافي، وحالات الدعم الطارئ، ومراقبة المجال الجوي للمطارات، ومراقبة الفعاليات، وأمثلة حالات مراقبة الارتفاع المنخفض.",
      source: "google_ads_keywords",
    },
    '/media': {
      primary: 'ملاحظات هندسية لأنظمة C-UAS',
      secondary: ['دليل مشتري C-UAS', 'تحليل قطاع C-UAS', 'تقنيات كشف الطائرات بدون طيار', 'تكامل أنظمة C-UAS', 'التحقق الكهروبصري والحراري', 'مراقبة الارتفاع المنخفض'],
      h1: 'داخل N-TET: ملاحظات هندسية وأدلة قطاع C-UAS',
      overviewHeading: 'ملاحظات هندسية وأدلة للمشترين حول C-UAS',
      source: 'google_ads_keywords',
    },
    '/contact': {
      primary: 'عرض سعر UAV صناعي',
      secondary: ['مزود UAV', 'حل تفتيش بالطائرات بدون طيار', 'معدات مراقبة الارتفاع المنخفض'],
      h1: 'طلب عرض سعر UAV صناعي',
      overviewHeading: 'عرض سعر UAV صناعي واستشارة مشروع',
      intro: 'استخدم هذه الصفحة لطلب عرض سعر UAV صناعي أو مناقشة مزود UAV أو تخطيط حل تفتيش بالطائرات بدون طيار أو معدات مراقبة الارتفاع المنخفض مع فريق N-TET.',
      source: 'google_ads_keywords',
    },
    '/solutions/category/01_BorderPatrol': {
      primary: 'UAV لدوريات الحدود',
      secondary: ['UAV للدوريات البحرية', 'طائرة لمراقبة السواحل', 'مراقبة بحرية برية'],
      h1: 'حلول UAV لدوريات الحدود',
      overviewHeading: 'UAV لدوريات الحدود ومراقبة السواحل',
      source: 'google_ads_keywords',
    },
    '/solutions/category/02_InfrastructureProtection': {
      primary: 'UAV لتفتيش المنشآت الصناعية',
      secondary: ['تفتيش النفط والغاز بالطائرات بدون طيار', 'طائرات تفتيش خطوط الأنابيب', 'مراقبة المصانع الكيميائية'],
      h1: 'حلول UAV لتفتيش المنشآت الصناعية',
      overviewHeading: 'سيناريوهات تفتيش المنشآت الصناعية باستخدام UAV',
      source: 'google_ads_keywords',
    },
    '/solutions/category/03_KeyAreaSecurity': {
      primary: 'مراقبة المجال الجوي للمطارات',
      secondary: ['مراقبة أمن الفعاليات', 'أمن المناطق الرئيسية', 'معدات مراقبة الارتفاع المنخفض'],
      h1: 'مراقبة المجال الجوي للمطارات وأمن المناطق الرئيسية',
      overviewHeading: 'سيناريوهات مراقبة المجال الجوي للمطارات',
      source: 'google_ads_keywords',
    },
    '/solutions/category/04_EmergencyRescue': {
      primary: 'طائرات البحث والإنقاذ والطوارئ',
      secondary: ['طائرة بحث وإنقاذ', 'طائرة مكافحة حرائق', 'UAV للاتصالات الطارئة', 'طائرة إضاءة'],
      h1: 'حلول طائرات البحث والإنقاذ والطوارئ',
      overviewHeading: 'سير عمل UAV للبحث والإنقاذ والطوارئ',
      source: 'google_ads_keywords',
    },
    '/solutions/power-line-uav-intelligent-inspection-solution': {
      primary: 'تفتيش خطوط الكهرباء بالطائرات بدون طيار',
      secondary: ['طائرة تفتيش خطوط الكهرباء', 'تفتيش خطوط الكهرباء باستخدام UAV', 'طائرات تفتيش المرافق'],
      h1: 'حل تفتيش خطوط الكهرباء بالطائرات بدون طيار',
      overviewHeading: 'سير عمل تفتيش خطوط الكهرباء باستخدام UAV',
      source: 'google_ads_keywords',
    },
    '/solutions/water-conservancy-river-lake-uav-monitoring-solution': {
      primary: 'UAV لمراقبة الموارد المائية',
      secondary: ['UAV لتفتيش السدود', 'مراقبة الأنهار والبحيرات باستخدام UAV', 'طائرة مراقبة الفيضانات'],
      h1: 'حل UAV لمراقبة الموارد المائية',
      overviewHeading: 'سير عمل مراقبة الموارد المائية باستخدام UAV',
      source: 'google_ads_keywords',
    },
    '/solutions/disaster-site-search-rescue-reconnaissance-uav-solution': {
      primary: 'طائرة البحث والإنقاذ',
      secondary: ['طائرة بحث وإنقاذ', 'طائرات حرارية للبحث والإنقاذ', 'UAV للبحث والإنقاذ', 'طائرة إنقاذ'],
      h1: 'حل طائرة البحث والإنقاذ',
      overviewHeading: 'سير عمل طائرة البحث والإنقاذ',
      source: 'google_ads_keywords',
    },
    '/solutions/chemical-plant-protection': {
      primary: 'طائرات تفتيش خطوط الأنابيب',
      secondary: ['مراقبة المصانع الكيميائية', 'تفتيش خطوط الأنابيب باستخدام UAV', 'تفتيش النفط والغاز بالطائرات بدون طيار'],
      h1: 'طائرات تفتيش خطوط الأنابيب لمراقبة المصانع الكيميائية',
      overviewHeading: 'طائرات تفتيش خطوط الأنابيب ومراقبة المنشآت',
      source: 'google_ads_keywords',
    },
    '/solutions/smart-substation-unattended-uav-inspection-solution': {
      primary: 'التفتيش الذاتي للمحطات الفرعية الذكية',
      secondary: ['تفتيش ذاتي للمحطات الفرعية الذكية', 'طائرة تفتيش المحطات الفرعية', 'تفتيش مرافق الطاقة باستخدام UAV', 'تفتيش UAV ذاتي'],
      h1: 'حل التفتيش الذاتي للمحطات الفرعية الذكية',
      overviewHeading: 'سير عمل التفتيش الذاتي للمحطات الفرعية الذكية',
      source: 'google_ads_keywords',
    },
    '/solutions/uav-maritime-patrol': {
      primary: 'UAV للدوريات البحرية',
      secondary: ['طائرة لمراقبة السواحل', 'UAV لدوريات الحدود', 'UAV لمراقبة الحدود'],
      h1: 'حل UAV للدوريات البحرية',
      overviewHeading: 'سير عمل UAV للدوريات البحرية',
      source: 'google_ads_keywords',
    },
    '/solutions/urban-high-rise-firefighting-emergency-uav-solution': {
      primary: 'طائرة مكافحة الحرائق',
      secondary: ['طائرة مكافحة حرائق', 'UAV لمكافحة حرائق المباني العالية', 'طائرة لإطفاء الحرائق', 'طائرات مكافحة حرائق'],
      h1: 'حل طائرة مكافحة الحرائق',
      overviewHeading: 'سير عمل طائرة مكافحة الحرائق',
      source: 'google_ads_keywords',
    },
    '/solutions/night-emergency-lighting-support-uav-solution': {
      primary: 'UAV مربوط للإضاءة',
      secondary: ['طائرة إضاءة', 'نظام إضاءة UAV', 'طائرة إضاءة طارئة'],
      h1: 'حل UAV مربوط للإضاءة',
      overviewHeading: 'سير عمل UAV مربوط للإضاءة',
      source: 'google_ads_keywords',
    },
    '/solutions/post-disaster-emergency-communication-support-uav-solution': {
      primary: 'UAV للاتصالات الطارئة',
      secondary: ['طائرة اتصالات للاستجابة للكوارث', 'UAV مربوط للاتصالات', 'اتصالات UAV للسلامة العامة'],
      h1: 'حل UAV للاتصالات الطارئة',
      overviewHeading: 'سير عمل UAV للاتصالات الطارئة',
      source: 'google_ads_keywords',
    },
  },
  ru: {
    '/': {
      primary: 'промышленные БПЛА',
      secondary: ['мониторинг низкой высоты', 'инспекционный БПЛА', 'аварийный БПЛА'],
      h1: 'Промышленные БПЛА для низковысотных операций',
      overviewHeading: 'Промышленные БПЛА и мониторинг низкой высоты',
      source: 'google_ads_keywords',
    },
    '/about': {
      primary: 'интегратор промышленных систем БПЛА',
      secondary: ['поставщик систем БПЛА', 'поставщик решений для мониторинга низкой высоты', 'интегратор технологий безопасности'],
      h1: 'N-TET: интегратор промышленных систем БПЛА',
      overviewHeading: 'Возможности интеграции промышленных систем БПЛА',
      intro: 'N-TET - интегратор промышленных систем БПЛА и поставщик решений для мониторинга низкой высоты, инспекционных процессов и технологий безопасности.',
      source: 'google_ads_keywords',
    },
    '/products': {
      primary: "промышленные БПЛА",
      secondary: ["инспекционный БПЛА", "аварийный БПЛА", "оборудование мониторинга низкой высоты", "системы досмотра", "аксессуары для БПЛА", "компоненты БПЛА"],
      h1: "Промышленные БПЛА и полевое оборудование",
      overviewHeading: "Промышленные БПЛА, оборудование мониторинга, аксессуары и полевое оборудование",
      source: "google_ads_keywords",
    },
    '/accessories': {
      primary: 'аксессуары для БПЛА',
      secondary: ['компоненты БПЛА', 'подвес БПЛА', 'двигатель БПЛА', 'канал передачи данных БПЛА'],
      h1: 'Аксессуары и компоненты БПЛА',
      overviewHeading: 'Аксессуары для промышленных БПЛА',
      source: 'google_ads_keywords',
    },
    '/solutions': {
      primary: "промышленные решения БПЛА",
      secondary: ["решения для инспекции БПЛА", "БПЛА аварийного реагирования", "защита критической инфраструктуры", "безопасность ключевых зон", "мониторинг низкой высоты"],
      h1: "Промышленные решения БПЛА и мониторинг низкой высоты",
      overviewHeading: "Промышленные решения БПЛА для инспекции, аварийного реагирования, мониторинга низкой высоты и безопасности",
      intro: "N-TET перечисляет решения для инспекции БПЛА, инспекцию ЛЭП дронами, БПЛА для инспекции трубопроводов, мониторинг водных объектов с БПЛА, аварийные БПЛА, поисково-спасательные группы, пожарную поддержку, защиту критической инфраструктуры, безопасность ключевых зон, мониторинг воздушного пространства аэропортов, мониторинг мероприятий и решения мониторинга низкой высоты.",
      source: "google_ads_keywords",
    },
    '/cases': {
      primary: "кейсы внедрения БПЛА",
      secondary: ["кейсы инспекции БПЛА", "патрулирование ЛЭП БПЛА", "кейс мониторинга низкой высоты", "кейс аварийной поддержки", "защита критической инфраструктуры", "безопасность ключевых зон"],
      h1: "Кейсы внедрения БПЛА и примеры мониторинга низкой высоты",
      overviewHeading: "Кейсы внедрения БПЛА и мониторинга низкой высоты",
      intro: "Изучите кейсы внедрения БПЛА и кейсы мониторинга низкой высоты. Примеры включают патрулирование ЛЭП БПЛА, мониторинг водных объектов, мониторинг НПЗ, кейсы аварийной поддержки, мониторинг воздушного пространства аэропортов, мониторинг мероприятий и кейсы мониторинга низкой высоты.",
      source: "google_ads_keywords",
    },
    '/media': {
      primary: 'инженерные материалы C-UAS',
      secondary: ['руководство для заказчиков C-UAS', 'анализ отрасли C-UAS', 'технологии обнаружения дронов', 'интеграция систем C-UAS', 'верификация EO/IR', 'низковысотный мониторинг'],
      h1: 'Внутри N-TET: инженерные материалы C-UAS и отраслевые обзоры',
      overviewHeading: 'Инженерные материалы C-UAS и руководства для заказчиков',
      source: 'google_ads_keywords',
    },
    '/contact': {
      primary: 'запрос цены на промышленный БПЛА',
      secondary: ['поставщик БПЛА', 'решение для инспекции дронами', 'оборудование мониторинга низкой высоты'],
      h1: 'Запрос цены на промышленный БПЛА',
      overviewHeading: 'Запрос цены на промышленный БПЛА и консультация',
      intro: 'Используйте эту страницу, чтобы запросить цену на промышленный БПЛА, обсудить поставщика БПЛА, решение для инспекции дронами или оборудование мониторинга низкой высоты.',
      source: 'google_ads_keywords',
    },
    '/solutions/category/01_BorderPatrol': {
      primary: 'БПЛА для пограничного патрулирования',
      secondary: ['БПЛА для морского патрулирования', 'дрон для прибрежного мониторинга', 'наземное морское наблюдение'],
      h1: 'Решения БПЛА для пограничного патрулирования',
      overviewHeading: 'БПЛА для пограничного патрулирования и прибрежного мониторинга',
      source: 'google_ads_keywords',
    },
    '/solutions/category/02_InfrastructureProtection': {
      primary: 'БПЛА для инспекции промышленных объектов',
      secondary: ['инспекция нефти и газа дронами', 'БПЛА для инспекции трубопроводов', 'мониторинг химических заводов'],
      h1: 'Решения БПЛА для инспекции промышленных объектов',
      overviewHeading: 'Сценарии инспекции промышленных объектов БПЛА',
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
      primary: 'БПЛА для поиска и спасения',
      secondary: ['пожарный БПЛА', 'БПЛА аварийной связи', 'БПЛА для освещения'],
      h1: 'Решения БПЛА для поиска и спасения',
      overviewHeading: 'Рабочие процессы БПЛА для поиска и спасения',
      source: 'google_ads_keywords',
    },
    '/solutions/power-line-uav-intelligent-inspection-solution': {
      primary: 'БПЛА для инспекции линий электропередачи',
      secondary: ['инспекция линий электропередачи БПЛА', 'дрон для инспекции опор', 'БПЛА для инспекции коммунальных объектов'],
      h1: 'Решение БПЛА для инспекции линий электропередачи',
      overviewHeading: 'Рабочий процесс инспекции линий электропередачи БПЛА',
      source: 'google_ads_keywords',
    },
    '/solutions/water-conservancy-river-lake-uav-monitoring-solution': {
      primary: 'БПЛА для мониторинга водного хозяйства',
      secondary: ['БПЛА для инспекции дамб', 'мониторинг рек и озер БПЛА', 'дрон для мониторинга паводков'],
      h1: 'Решение БПЛА для мониторинга водного хозяйства',
      overviewHeading: 'Рабочий процесс мониторинга водного хозяйства БПЛА',
      source: 'google_ads_keywords',
    },
    '/solutions/disaster-site-search-rescue-reconnaissance-uav-solution': {
      primary: 'БПЛА для поиска и спасения',
      secondary: ['тепловизионные дроны для поиска и спасения', 'поисково-спасательный БПЛА', 'спасательный дрон'],
      h1: 'Решение БПЛА для поиска и спасения',
      overviewHeading: 'Рабочий процесс БПЛА для поиска и спасения',
      source: 'google_ads_keywords',
    },
    '/solutions/chemical-plant-protection': {
      primary: 'БПЛА для инспекции трубопроводов',
      secondary: ['мониторинг химических заводов', 'инспекция трубопроводов БПЛА', 'инспекция нефти и газа дронами'],
      h1: 'БПЛА для инспекции трубопроводов и мониторинга химических заводов',
      overviewHeading: 'БПЛА для инспекции трубопроводов и мониторинга объекта',
      source: 'google_ads_keywords',
    },
    '/solutions/smart-substation-unattended-uav-inspection-solution': {
      primary: 'автономная инспекция умных подстанций',
      secondary: ['дрон для инспекции подстанций', 'инспекция энергетических объектов БПЛА', 'автономная инспекция БПЛА'],
      h1: 'автономная инспекция умных подстанций: решение',
      overviewHeading: 'автономная инспекция умных подстанций: рабочий процесс',
      source: 'google_ads_keywords',
    },
    '/solutions/uav-maritime-patrol': {
      primary: 'БПЛА для морского патрулирования',
      secondary: ['дрон для прибрежного мониторинга', 'БПЛА для пограничного патрулирования', 'БПЛА для охраны границ'],
      h1: 'Решение БПЛА для морского патрулирования',
      overviewHeading: 'Рабочий процесс морского патрулирования БПЛА',
      source: 'google_ads_keywords',
    },
    '/solutions/urban-high-rise-firefighting-emergency-uav-solution': {
      primary: 'пожарный БПЛА',
      secondary: ['БПЛА для тушения высотных зданий', 'дрон для пожаротушения', 'пожарные дроны'],
      h1: 'пожарный БПЛА: решение',
      overviewHeading: 'пожарный БПЛА: рабочий процесс',
      source: 'google_ads_keywords',
    },
    '/solutions/night-emergency-lighting-support-uav-solution': {
      primary: 'привязной БПЛА для освещения',
      secondary: ['дрон для освещения', 'система освещения БПЛА', 'дрон аварийного освещения'],
      h1: 'привязной БПЛА для освещения: решение',
      overviewHeading: 'привязной БПЛА для освещения: рабочий процесс',
      source: 'google_ads_keywords',
    },
    '/solutions/post-disaster-emergency-communication-support-uav-solution': {
      primary: 'БПЛА аварийной связи',
      secondary: ['дрон связи для ликвидации последствий', 'привязной БПЛА связи', 'связь общественной безопасности БПЛА'],
      h1: 'Решение БПЛА аварийной связи',
      overviewHeading: 'Рабочий процесс БПЛА аварийной связи',
      source: 'google_ads_keywords',
    },
  },
};

const CATEGORY_FALLBACKS: Record<string, string[]> = {
  'uav-drone-systems': ['industrial UAV system', 'UAV platform', 'industrial drone'],
  'drone-detection': ['C-UAS equipment', 'anti drone', 'early warning equipment', 'target identification and tracking system'],
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

function inferOverviewHeading(primary: string, pageKind?: string) {
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
    overviewHeading: inferOverviewHeading(primary, options.pageKind),
    source: 'inferred_seo_keyword',
  };
}

export function getSeoKeywordBackedEntry(route: string, locale = 'en') {
  const normalized = normalizePath(route);
  const localizedTarget =
    locale === 'es' || locale === 'ru' || locale === 'ar'
      ? LOCALIZED_TARGETS[locale]?.[normalized]
      : undefined;
  return localizedTarget || TARGETS[normalized];
}

export function buildKeywordIntro(target: SeoKeywordTarget, fallbackSubject: string, locale = 'en') {
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
      return `${target.primary} هو موضوع البحث الرئيسي لهذه الصفحة، مع تغطية مرتبطة بـ ${related || fallbackSubject}.`;
    }
    return `${target.primary} is the primary search theme for this page, with related coverage for ${related || fallbackSubject}.`;
  }
  return '';
}
