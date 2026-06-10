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
    primary: 'industrial UAV systems',
    secondary: ['low altitude monitoring', 'UAV inspection drone', 'emergency response UAV'],
    h1: 'Industrial UAV Systems for Low-Altitude Operations',
    overviewHeading: 'Industrial UAV Systems and Low-Altitude Monitoring',
    source: 'google_ads_keywords',
  },
  '/about': {
    primary: 'industrial UAV systems integrator',
    secondary: ['low altitude monitoring solution provider', 'UAV system supplier', 'security technology integrator'],
    h1: 'Industrial UAV Systems Integrator Profile',
    overviewHeading: 'Industrial UAV Integration Capabilities',
    intro: 'N-TET is an industrial UAV systems integrator and solution provider focused on low-altitude monitoring equipment, inspection workflows, and security technologies for infrastructure operators.',
    source: 'google_ads_keywords',
  },
  '/products': {
    primary: 'industrial UAV systems',
    secondary: ['UAV inspection drone', 'emergency response UAV', 'low altitude monitoring equipment'],
    h1: 'Industrial UAV Systems & Monitoring Equipment',
    overviewHeading: 'Industrial UAV Systems Product Center',
    source: 'google_ads_keywords',
  },
  '/solutions/power-line-uav-intelligent-inspection-solution': {
    primary: 'drone power line inspection',
    secondary: ['power line inspection drone', 'UAV power line inspection', 'drones for utility inspection', 'drone cell tower inspection'],
    h1: 'Drone Power Line Inspection Solution',
    overviewHeading: 'Drone Power Line Inspection Workflow',
    intro: 'This drone power line inspection solution supports transmission corridor patrol, tower inspection, utility inspection drone workflows, and cell tower inspection scenarios for maintenance teams.',
    source: 'google_ads_keywords',
  },
  '/solutions/water-conservancy-river-lake-uav-monitoring-solution': {
    primary: 'water conservancy monitoring UAV',
    secondary: ['dam inspection UAV', 'river lake UAV monitoring', 'flood monitoring drone'],
    h1: 'Water Conservancy Monitoring UAV Solution',
    overviewHeading: 'Water Conservancy Monitoring UAV Workflow',
    intro: 'This water conservancy monitoring UAV solution supports dam inspection UAV tasks, river lake UAV monitoring, flood monitoring drone patrols, and infrastructure observation for water-resource teams.',
    source: 'google_ads_keywords',
  },
  '/solutions/disaster-site-search-rescue-reconnaissance-uav-solution': {
    primary: 'search and rescue drone',
    secondary: ['thermal drones for search and rescue', 'search and rescue UAV', 'drone rescue'],
    h1: 'Search and Rescue Drone Solution',
    overviewHeading: 'Search and Rescue Drone Workflow',
    intro: 'This search and rescue drone solution supports disaster-site reconnaissance, thermal drones for search and rescue, search and rescue UAV coordination, and drone rescue visibility for emergency teams.',
    source: 'google_ads_keywords',
  },
  '/solutions/category/02_InfrastructureProtection': {
    primary: 'industrial facility inspection UAV',
    secondary: ['oil and gas drone inspection', 'pipeline inspection drones', 'chemical plant monitoring', 'water conservancy monitoring UAV'],
    h1: 'Industrial Facility Inspection UAV Solutions',
    overviewHeading: 'Industrial Facility Inspection UAV Scenarios',
    source: 'google_ads_keywords',
  },
  '/solutions/category/03_KeyAreaSecurity': {
    primary: 'airport airspace monitoring',
    secondary: ['event security monitoring', 'key area security', 'smart security screening', 'low altitude monitoring equipment'],
    h1: 'Airport Airspace Monitoring and Key Area Security Solutions',
    overviewHeading: 'Airport Airspace Monitoring Scenarios',
    source: 'google_ads_keywords',
  },
  '/solutions/category/04_EmergencyRescue': {
    primary: 'search and rescue drone',
    secondary: ['firefighting drone', 'emergency communication UAV', 'drone lighting', 'emergency response drone'],
    h1: 'Search and Rescue Drone & Emergency UAV Solutions',
    overviewHeading: 'Search and Rescue Drone Emergency Workflows',
    intro: 'This emergency solutions category covers search and rescue drone operations, firefighting drone support, emergency communication UAV deployment, and drone lighting workflows for field response teams.',
    source: 'google_ads_keywords',
  },
  '/solutions/oil-production-base-protection': {
    primary: 'oil and gas drone inspection',
    secondary: ['industrial facility inspection UAV', 'pipeline corridor inspection', 'oil production site monitoring'],
    h1: 'Oil and Gas Drone Inspection Solution',
    overviewHeading: 'Oil and Gas Drone Inspection Workflow',
    intro: 'This oil and gas drone inspection solution supports oil production sites, pipeline corridor inspection, industrial facility inspection UAV workflows, and low-altitude monitoring around field assets.',
    source: 'google_ads_keywords',
  },
  '/solutions/uav-maritime-patrol': {
    primary: 'maritime patrol UAV',
    secondary: ['coastal monitoring drone', 'border patrol UAV', 'UAV border patrol'],
    h1: 'Maritime Patrol UAV Solution',
    overviewHeading: 'Maritime Patrol UAV Workflow',
    intro: 'This maritime patrol UAV solution supports coastal monitoring drone routes, port-area observation, border patrol UAV tasks, and wide-area maritime visibility for field teams.',
    source: 'google_ads_keywords',
  },
  '/solutions/chemical-plant-protection': {
    primary: 'pipeline inspection drones',
    secondary: ['chemical plant monitoring', 'UAV pipeline inspection', 'oil and gas drone inspection'],
    h1: 'Pipeline Inspection Drones for Chemical Plant Monitoring',
    overviewHeading: 'Pipeline Inspection Drones and Plant Monitoring',
    intro: 'This page covers pipeline inspection drones, chemical plant monitoring, UAV pipeline inspection, and oil and gas drone inspection workflows for petrochemical facilities.',
    source: 'google_ads_keywords',
  },
  '/solutions/smart-substation-unattended-uav-inspection-solution': {
    primary: 'smart substation autonomous inspection',
    secondary: ['substation inspection drone', 'power utility UAV inspection', 'autonomous UAV inspection'],
    h1: 'Smart Substation Autonomous Inspection Solution',
    overviewHeading: 'Smart Substation Autonomous Inspection Workflow',
    source: 'google_ads_keywords',
  },
  '/solutions/post-disaster-emergency-communication-support-uav-solution': {
    primary: 'emergency communication UAV',
    secondary: ['disaster response communication drone', 'tethered communication UAV', 'public safety UAV communications'],
    h1: 'Emergency Communication UAV Solution',
    overviewHeading: 'Emergency Communication UAV Workflow',
    source: 'google_ads_keywords',
  },
  '/solutions/night-emergency-lighting-support-uav-solution': {
    primary: 'tethered lighting UAV',
    secondary: ['drone lighting', 'UAV lighting system', 'emergency lighting drone'],
    h1: 'Tethered Lighting UAV Solution',
    overviewHeading: 'Tethered Lighting UAV Workflow',
    source: 'google_ads_keywords',
  },
  '/solutions/urban-high-rise-firefighting-emergency-uav-solution': {
    primary: 'firefighting drone',
    secondary: ['high-rise firefighting UAV', 'drone fire fighting', 'drone for fire fighting'],
    h1: 'Firefighting Drone Solution',
    overviewHeading: 'Firefighting Drone Workflow',
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
    primary: 'industrial UAV quote',
    secondary: ['UAV system supplier', 'drone inspection solution', 'emergency response UAV', 'low altitude monitoring equipment'],
    h1: 'Industrial UAV Quote',
    overviewHeading: 'Industrial UAV Quote and Project Consultation',
    source: 'google_ads_keywords',
  },
};

const LOCALIZED_TARGETS: Partial<Record<'es' | 'ru', Record<string, SeoKeywordTarget>>> = {
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
      primary: 'sistemas UAV industriales',
      secondary: ['dron de inspección UAV', 'UAV de emergencia', 'equipos de monitoreo de baja altitud'],
      h1: 'Sistemas UAV industriales y equipos de monitoreo',
      overviewHeading: 'Centro de productos de sistemas UAV industriales',
      source: 'google_ads_keywords',
    },
    '/accessories': {
      primary: 'accesorios para drones',
      secondary: ['componentes UAV', 'gimbal UAV', 'motor UAV', 'enlace de datos UAV'],
      h1: 'Accesorios para drones y componentes UAV',
      overviewHeading: 'Accesorios para drones industriales',
      source: 'google_ads_keywords',
    },
    '/solutions': {
      primary: 'soluciones de inspección UAV',
      secondary: ['dron de búsqueda y rescate', 'dron contra incendios', 'inspección de líneas eléctricas con UAV'],
      h1: 'Soluciones de inspección UAV',
      overviewHeading: 'Soluciones de inspección UAV para equipos industriales',
      source: 'google_ads_keywords',
    },
    '/cases': {
      primary: 'casos UAV',
      secondary: ['patrullaje UAV', 'monitoreo de baja altitud', 'inspección UAV'],
      h1: 'Casos UAV de inspección y monitoreo',
      overviewHeading: 'Casos UAV por región y escenario',
      source: 'google_ads_keywords',
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
      primary: 'промышленные БПЛА',
      secondary: ['инспекционный БПЛА', 'аварийный БПЛА', 'оборудование мониторинга низкой высоты'],
      h1: 'Промышленные БПЛА и оборудование мониторинга',
      overviewHeading: 'Центр продуктов промышленных БПЛА',
      source: 'google_ads_keywords',
    },
    '/accessories': {
      primary: 'аксессуары для БПЛА',
      secondary: ['компоненты БПЛА', 'подвес БПЛА', 'двигатель БПЛА', 'канал передачи данных БПЛА'],
      h1: 'Аксессуары и компоненты БПЛА',
      overviewHeading: 'Аксессуары для промышленных БПЛА',
      source: 'google_ads_keywords',
    },
    '/solutions': {
      primary: 'решения для инспекции БПЛА',
      secondary: ['БПЛА для поиска и спасения', 'пожарный БПЛА', 'инспекция линий электропередачи БПЛА'],
      h1: 'Решения для инспекции БПЛА',
      overviewHeading: 'Решения для инспекции БПЛА для промышленных команд',
      source: 'google_ads_keywords',
    },
    '/cases': {
      primary: 'кейсы БПЛА',
      secondary: ['патрулирование БПЛА', 'мониторинг низкой высоты', 'инспекция БПЛА'],
      h1: 'Кейсы БПЛА для инспекции и мониторинга',
      overviewHeading: 'Кейсы БПЛА по регионам и сценариям',
      source: 'google_ads_keywords',
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
  'drone-detection': ['low altitude monitoring equipment', 'airspace monitoring system', 'drone detection equipment'],
  'security-screening': ['security screening equipment', 'X-ray baggage scanner', 'walk-through metal detector'],
  'engineering-materials': ['engineering materials', 'Bailey steel bridge', 'infrastructure support equipment'],
  'field-hospitals': ['field hospital system', 'containerized medical rescue system', 'emergency medical shelter'],
  'perimeter-intelligence': ['perimeter intelligence system', 'electro optical surveillance', 'radar vision fusion system'],
};

function normalizePath(route: string) {
  const withoutLocale = route.replace(/^\/(en|ru|es)(?=\/|$)/, '');
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
  if (/solution/i.test(pageKind || '')) return `${primary} Workflow`;
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
    options.locale === 'es' || options.locale === 'ru'
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
    locale === 'es' || locale === 'ru'
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
    return `${target.primary} is the primary search theme for this page, with related coverage for ${related || fallbackSubject}.`;
  }
  return '';
}
