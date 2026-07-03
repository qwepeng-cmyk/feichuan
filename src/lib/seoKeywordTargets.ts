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
    primary: 'industrial UAV and C-UAS systems',
    secondary: ['C-UAS equipment', 'anti drone', 'early warning equipment', 'UAV inspection drone', 'emergency response UAV'],
    h1: 'Industrial UAV & C-UAS Systems',
    overviewHeading: 'Industrial UAV Platforms and C-UAS Systems',
    intro: 'N-TET provides two core system lines for infrastructure and public-site operators: industrial UAV platforms for inspection and emergency missions, and C-UAS systems for early warning, identification, positioning, tracking, alert linkage, and site response protocols at controlled sites.',
    source: 'google_ads_keywords',
  },
  '/about': {
    primary: 'industrial UAV and C-UAS systems integrator',
    secondary: ['C-UAS equipment', 'anti drone', 'early warning equipment', 'UAV system supplier', 'security technology integrator'],
    h1: 'Industrial UAV & C-UAS Systems Integrator',
    overviewHeading: 'Low-Altitude Security and UAV System Integration',
    intro: 'N-TET integrates industrial UAV platforms with C-UAS systems, low-altitude radar, RF identification, EO tracking, Remote ID review, and command-platform linkage for airports, energy sites, public venues, and other critical facilities.',
    source: 'google_ads_keywords',
  },
  '/products': {
    primary: 'industrial UAV and C-UAS equipment',
    secondary: ['C-UAS equipment', 'anti drone', 'early warning equipment', 'UAV inspection drone', 'emergency response UAV', 'security screening systems', 'UAV components'],
    h1: 'Industrial UAV & C-UAS Equipment',
    overviewHeading: 'Industrial UAV Platforms, C-UAS Systems, and Field Equipment',
    source: 'google_ads_keywords',
  },
  '/solutions': {
    primary: 'industrial UAV and C-UAS solutions',
    secondary: ['UAV inspection solutions', 'C-UAS solutions', 'anti drone', 'emergency response drone', 'critical infrastructure protection', 'key area security'],
    h1: 'Industrial UAV & C-UAS Solutions',
    overviewHeading: 'Industrial UAV Solutions for Inspection, Emergency Response, C-UAS, and Security Operations',
    intro: 'N-TET lists UAV inspection solutions, C-UAS solutions, drone power line inspection, pipeline inspection drones, water conservancy monitoring UAV operations, emergency response drone operations, search and rescue drone support, firefighting drone support, airport C-UAS, event security, early-warning, identification, positioning, and tracking solutions.',
    source: 'google_ads_keywords',
  },
  '/cases': {
    primary: 'UAV and C-UAS deployment cases',
    secondary: ['UAV inspection cases', 'C-UAS deployment case', 'anti drone case', 'power line UAV patrol', 'emergency support case', 'critical infrastructure protection'],
    h1: 'UAV & C-UAS Deployment Cases',
    overviewHeading: 'UAV Deployment and C-UAS Cases',
    intro: 'Browse UAV deployment and C-UAS cases. References include power line UAV patrol, water conservancy UAV patrol, refinery C-UAS cases, emergency support cases, airport C-UAS, event security, early warning, identification, positioning, and tracking examples.',
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
    primary: 'industrial UAV and C-UAS quote',
    secondary: ['UAV system supplier', 'C-UAS equipment', 'anti drone', 'drone inspection solution', 'emergency response UAV', 'early warning equipment'],
    h1: 'Industrial UAV & C-UAS Quote',
    overviewHeading: 'Industrial UAV and C-UAS Project Consultation',
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
      primary: 'noticias UAV industriales',
      secondary: ['economía de baja altitud', 'UAV cautivo', 'monitoreo de infraestructura'],
      h1: 'Noticias UAV industriales',
      overviewHeading: 'Noticias UAV industriales y economía de baja altitud',
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
      primary: 'رؤى وتحديثات UAV الصناعية',
      secondary: ['اقتصاد الارتفاع المنخفض', 'UAV مربوط', 'مراقبة البنية التحتية'],
      h1: 'رؤى وتحديثات UAV الصناعية',
      overviewHeading: 'أخبار UAV الصناعية واقتصاد الارتفاع المنخفض',
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
      primary: 'новости промышленных БПЛА',
      secondary: ['низковысотная экономика', 'привязной БПЛА', 'мониторинг инфраструктуры'],
      h1: 'Новости промышленных БПЛА',
      overviewHeading: 'Новости промышленных БПЛА и низковысотной экономики',
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
