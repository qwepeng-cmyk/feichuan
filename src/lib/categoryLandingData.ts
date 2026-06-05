export interface CategoryLandingData {
  id: string;
  name: string;
  name_en: string;
  name_ru: string;
  name_es?: string;
  bannerImage: string;
  industryNeeds_en: string;
  industryNeeds_ru: string;
  industryNeeds_es?: string;
  applicationScenes: { title: string; title_en: string; title_ru: string; title_es?: string }[];
  products: { name: string; name_en: string }[];
  recommendedProductHandles: string[];
}

const categoryLandingData: Record<string, CategoryLandingData> = {
  '01_BorderPatrol': {
    id: '01_BorderPatrol',
    name: '边境巡逻',
    name_en: 'Border Patrol',
    name_ru: 'Охрана границ',
    bannerImage: '/solutions/border patrol banner bg.png',
    industryNeeds_en: 'Border and coastal monitoring is critical to infrastructure safety and public operations. Traditional patrol tasks are heavy, with prominent pressure on anti-infiltration and anti-smuggling work. Integrated air-ground monitoring brings important opportunities to enhance prevention and control efficiency. UAVs equipped with high-performance optoelectronic pods can conduct wide-area maritime inspections for full-domain dynamic monitoring. Intelligent optoelectronic turrets serve as border surveillance equipment, featuring visible light and infrared dual-spectrum systems for 24/7 blind-spot-free monitoring, precisely capturing target details and locating suspicious targets in nocturnal environments. Integrating AI algorithms and high-precision control technology, they can track moving targets, filter RF signal analysis, and realize intelligent identification, tracking, and warning. Working in coordination, they synchronously transmit HD footage and provide precise support for command decisions.',
    industryNeeds_ru: 'Охрана границ и прибрежных зон имеет решающее значение для национальной безопасности. Традиционные методы патрулирования сталкиваются с высокой нагрузкой и угрозами контрабанды. Интеграция интеллектуальных систем открывает новые возможности для повышения эффективности контроля. БПЛА с высокопроизводительными оптико-электронными модулями обеспечивают динамический мониторинг обширных территорий. Интеллектуальные системы наблюдения с ИИ-алгоритмами позволяют круглосуточно идентифицировать, отслеживать и предупреждать о подозрительных целях, обеспечивая точную поддержку при принятии решений.',
    applicationScenes: [
      { title: '非法船只监管', title_en: 'Illegal Vessel Surveillance', title_ru: 'Наблюдение за незаконными судами' },
      { title: '海岸线24小时监测', title_en: '24/7 Coastline Monitoring', title_ru: 'Круглосуточный мониторинг побережья' },
      { title: '边境地区常态巡逻', title_en: 'Routine Border Patrol', title_ru: 'Плановое пограничное патрулирование' },
    ],
    products: [
      { name: 'FC-YJZC-01无人机', name_en: 'FC-YJZC-01 UAV' },
      { name: 'FC-RDS500-4R型雷视融合系统', name_en: 'FC-RDS500-4R Radar-Vision Fusion System' },
      { name: 'FC-DLXJ-01无人机', name_en: 'FC-DLXJ-01 UAV' },
    ],
    recommendedProductHandles: [
      'fc-yjzc-01-emergency-reconnaissance-drone',
      'fc-rds500-4r-radar-vision-sentinel',
      'fc-dlxj-01-power-grid-inspection-drone'
    ]
  },

  '02_InfrastructureProtection': {
    id: '02_InfrastructureProtection',
    name: '关键设施防护',
    name_en: 'Critical Infrastructure Protection',
    name_ru: 'Защита инфраструктуры',
    bannerImage: '/solutions/infrastructure protection banner bg.png',
    industryNeeds_en: 'With the rapid development of the low-altitude economy, low-altitude activities have become increasingly frequent. Around critical infrastructure like power substations, hydroelectric dams, oil production bases, and chemical plants, unauthorized drone flights can affect operational safety and privacy. Critical infrastructure monitoring uses optoelectronic turrets, low-altitude radar, RF spectrum monitoring, and event logging to identify airspace activity and support coordinated response. The system emphasizes detection, classification, warning, record keeping, and integration with existing security operations.',
    industryNeeds_ru: 'С развитием беспилотных технологий низковысотная активность вокруг критически важных объектов стала более частой. Для электроподстанций, плотин ГЭС, нефтегазовых и химических объектов важно заранее видеть воздушную обстановку, подтверждать события визуально и вести проверяемые записи. Решения N-TET объединяют радарный мониторинг, оптико-электронное наблюдение, журналы событий и согласованные рабочие процессы реагирования для поддержки служб безопасности.',
    applicationScenes: [
      { title: '机场低空监测应用', title_en: 'Airport Airspace Monitoring', title_ru: 'Мониторинг воздушного пространства аэропорта' },
      { title: '发电设施低空监测', title_en: 'Power Facility Airspace Monitoring', title_ru: 'Мониторинг энергетических объектов' },
      { title: '天然气设施低空监测', title_en: 'Natural Gas Facility Airspace Monitoring', title_ru: 'Мониторинг газовой инфраструктуры' },
    ],
    products: [
      { name: '低空雷达监测系统', name_en: 'Low-Altitude Radar Monitoring System' },
      { name: '射频频谱监测系统', name_en: 'RF Spectrum Monitoring System' },
      { name: '光电识别跟踪设备', name_en: 'Optoelectronic Identification & Tracking Equipment' },
    ],
    recommendedProductHandles: [
      'stationary-rf-detection-system',
      'composite-electro-optical-tracking-system'
    ]
  },

  '03_KeyAreaSecurity': {
    id: '03_KeyAreaSecurity',
    name: '要地安保',
    name_en: 'Key Area Security',
    name_ru: 'Безопасность объектов',
    bannerImage: '/solutions/key area security banner bg.png',
    industryNeeds_en: 'Critical key areas such as large-scale sports events, airports, and judicial departments are typically densely populated and operationally complex. Traditional single-method security measures can no longer meet modern control requirements. There is an urgent need to establish a comprehensive, smart, efficient, and multi-line coordinated security system. Key area security centers on optoelectronic surveillance, low-altitude airspace monitoring, and smart security screening. Optoelectronic surveillance relies on multi-spectral imaging and laser ranging technologies to achieve full-domain 24/7 precision monitoring and target positioning. Security screening equipment uses smart detection technology to quickly and accurately inspect personnel and goods.',
    industryNeeds_ru: 'Критически важные зоны, такие как аэропорты, судебные учреждения и места проведения крупных спортивных мероприятий, требуют особого контроля из-за плотного потока людей и сложных операционных процессов. Современная система безопасности должна объединять видеонаблюдение, низковысотный мониторинг, досмотровое оборудование, регистрацию событий и согласованные процедуры реагирования. Решения N-TET помогают службам безопасности быстрее проверять персонал, грузы и воздушные события без публикации чувствительных технических деталей.',
    applicationScenes: [
      { title: '要地安保', title_en: 'Key Area Security', title_ru: 'Безопасность объектов' },
      { title: '赛事保障', title_en: 'Event Security', title_ru: 'Безопасность мероприятий' },
      { title: '交通枢纽安保', title_en: 'Transport Hub Security', title_ru: 'Безопасность транспортных узлов' },
    ],
    products: [
      { name: '固定式无线电侦测设备', name_en: 'Fixed Radio Detection Equipment' },
      { name: '射频频谱监测设备', name_en: 'RF Spectrum Monitoring Equipment' },
      { name: '低空事件记录系统', name_en: 'Low-Altitude Event Logging System' },
      { name: '光电识别跟踪', name_en: 'Optoelectronic Identification & Tracking' },
      { name: 'FC2088手持金属探测器', name_en: 'FC2088 Handheld Metal Detector' },
      { name: 'FC-H 智慧手机探测门', name_en: 'FC-H Smart Phone Detection Gate' },
      { name: 'FC1800T台式爆炸物毒品探测仪', name_en: 'FC1800T Desktop Explosives/Narcotics Detector' },
      { name: 'FC6550D双源双视角安检机', name_en: 'FC6550D Dual-Source Dual-View X-Ray Machine' },
    ],
    recommendedProductHandles: [
      'stationary-rf-detection-system',
      'composite-electro-optical-tracking-system',
      'fc2088-handheld-metal-detector',
      'fc-h-smart-phone-detection-gate',
      'fc1800t-desktop-explosives-narcotics-detector',
      'fc6550-standard-x-ray-baggage-scanner'
    ]
  },

  '04_EmergencyRescue': {
    id: '04_EmergencyRescue',
    name: '应急救灾',
    name_en: 'Emergency & Disaster Rescue',
    name_ru: 'Аварийно-спасательные работы',
    bannerImage: '/solutions/emergrncy  & disater rescue banner bg.png',
    industryNeeds_en: 'To continuously enhance comprehensive disaster prevention, mitigation, and relief capabilities, strengthen proactive risk prevention, and efficiently handle various natural disasters, the Ministry of Emergency Management is closely following the national emergency capability system construction requirements of unified leadership, aligned authority and responsibility, and authoritative efficiency. It is accelerating the modernization of the emergency management system and capabilities, striving to build a comprehensive safety and emergency framework. In the field of comprehensive natural disaster prevention and emergency response, the Ministry is accelerating the implementation of the emergency management big data project and the natural disaster monitoring and early warning informatization project. Simultaneously, it is promoting deepened synergy and linkage between emergency management departments at all levels and industry departments such as natural resources, water conservancy, and meteorology, breaking down data barriers in monitoring and early warning to achieve information interconnection and sharing, having initially established a comprehensive natural disaster monitoring and early warning system covering all domains.',
    industryNeeds_ru: 'Для повышения эффективности предупреждения и ликвидации последствий стихийных бедствий необходимо создание современной системы управления чрезвычайными ситуациями. Мы предлагаем решения для мониторинга в реальном времени, раннего предупреждения и оперативного реагирования. Использование БПЛА и информационных технологий позволяет наладить экстренную связь, проводить разведку и обеспечивать освещение в зонах бедствия, способствуя быстрому принятию решений и спасению жизней.',
    applicationScenes: [
      { title: '震后应急通讯搭建', title_en: 'Post-Earthquake Emergency Communication Setup', title_ru: 'Экстренная связь после землетрясений' },
      { title: '水灾情况现场监测', title_en: 'Flood Scene Condition Monitoring', title_ru: 'Мониторинг зон наводнения' },
      { title: '抢修现场应急照明', title_en: 'Emergency Repair Site Lighting', title_ru: 'Аварийное освещение' },
    ],
    products: [
      { name: 'FC-YJTX-01无人机', name_en: 'FC-YJTX-01 UAV' },
      { name: 'FC-YJZC-01无人机', name_en: 'FC-YJZC-01 UAV' },
      { name: 'FC-YJZM-01无人机', name_en: 'FC-YJZM-01 UAV' },
    ],
    recommendedProductHandles: [
      'fc-yjtx-01-emergency-communication-drone',
      'fc-yjzc-01-emergency-reconnaissance-drone',
      'fc-yjzm-01-emergency-lighting-drone'
    ]
  },
};

Object.assign(categoryLandingData['01_BorderPatrol'], {
  name_es: 'Patrullaje fronterizo y costero',
  industryNeeds_es: 'El monitoreo fronterizo y costero es clave para la seguridad operativa de corredores, puertos, costas e infraestructura cercana. Las operaciones tradicionales de patrullaje requieren mucha mano de obra y cobertura continua. Las soluciones de N-TET combinan UAV industriales, cargas electro-ópticas, monitoreo de área y registros de eventos para apoyar inspecciones amplias, verificación visual y coordinación de equipos en campo.',
});
categoryLandingData['01_BorderPatrol'].applicationScenes[0].title_es = 'Vigilancia de embarcaciones no autorizadas';
categoryLandingData['01_BorderPatrol'].applicationScenes[1].title_es = 'Monitoreo costero 24/7';
categoryLandingData['01_BorderPatrol'].applicationScenes[2].title_es = 'Patrullaje rutinario de zonas fronterizas';

Object.assign(categoryLandingData['02_InfrastructureProtection'], {
  name_es: 'Protección de infraestructura crítica',
  industryNeeds_es: 'Con el crecimiento de las operaciones de baja altitud, las plantas de energía, subestaciones, presas hidroeléctricas, bases petroleras y plantas químicas necesitan mayor conciencia situacional del espacio aéreo cercano. N-TET integra radar de baja altitud, monitoreo RF, seguimiento electro-óptico y registro de eventos para apoyar detección, clasificación, verificación visual y coordinación con los procesos de seguridad existentes.',
});
categoryLandingData['02_InfrastructureProtection'].applicationScenes[0].title_es = 'Monitoreo del espacio aéreo en aeropuertos';
categoryLandingData['02_InfrastructureProtection'].applicationScenes[1].title_es = 'Monitoreo de instalaciones de generación eléctrica';
categoryLandingData['02_InfrastructureProtection'].applicationScenes[2].title_es = 'Monitoreo de instalaciones de gas natural';

Object.assign(categoryLandingData['03_KeyAreaSecurity'], {
  name_es: 'Seguridad de áreas clave',
  industryNeeds_es: 'Áreas como aeropuertos, instalaciones judiciales, centros de transporte y eventos masivos concentran flujo de personas, activos y operaciones complejas. Las soluciones de N-TET integran vigilancia electro-óptica, monitoreo de baja altitud, inspección inteligente y registros de operación para apoyar revisiones rápidas, confirmación visual y flujos de respuesta coordinados sin exponer detalles técnicos sensibles.',
});
categoryLandingData['03_KeyAreaSecurity'].applicationScenes[0].title_es = 'Seguridad de áreas clave';
categoryLandingData['03_KeyAreaSecurity'].applicationScenes[1].title_es = 'Soporte de seguridad para eventos';
categoryLandingData['03_KeyAreaSecurity'].applicationScenes[2].title_es = 'Seguridad de centros de transporte';

Object.assign(categoryLandingData['04_EmergencyRescue'], {
  name_es: 'Emergencia y rescate',
  industryNeeds_es: 'Los equipos de emergencia necesitan desplegar observación aérea, comunicación temporal e iluminación en sitios complejos con rapidez y trazabilidad. Las soluciones UAV de N-TET apoyan reconocimiento, búsqueda, coordinación, comunicación posterior a desastres e iluminación nocturna para mejorar la toma de decisiones y la continuidad operativa en campo.',
});
categoryLandingData['04_EmergencyRescue'].applicationScenes[0].title_es = 'Comunicación de emergencia posterior a sismos';
categoryLandingData['04_EmergencyRescue'].applicationScenes[1].title_es = 'Monitoreo de inundaciones en sitio';
categoryLandingData['04_EmergencyRescue'].applicationScenes[2].title_es = 'Iluminación de emergencia para reparaciones';

export default categoryLandingData;
