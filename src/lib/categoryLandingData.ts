export interface CategoryLandingData {
  id: string;
  name: string;
  name_en: string;
  name_ru: string;
  name_es?: string;
  name_ar?: string;
  bannerImage: string;
  industryNeeds_en: string;
  industryNeeds_ru: string;
  industryNeeds_es?: string;
  industryNeeds_ar?: string;
  applicationScenes: { title: string; title_en: string; title_ru: string; title_es?: string; title_ar?: string }[];
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
    industryNeeds_en: 'Border and coastal operations need wide-area visibility, repeatable patrol routes, and fast visual confirmation across long corridors, ports, shorelines, and remote access points. N-TET combines industrial UAV platforms, EO/IR payloads, radar-vision monitoring, live video return, and event records so field teams can inspect difficult terrain, verify activity, and coordinate response with clearer evidence.',
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
    industryNeeds_en: 'Power substations, dams, oil and gas sites, chemical plants, and industrial parks need C-UAS coverage for low-altitude risk awareness around sensitive operating areas. N-TET combines RF monitoring, low-altitude radar, EO identification and tracking, alert review, event records, and site response plans so security teams can detect nearby aerial activity, identify and locate the target, track its movement, and coordinate with existing security procedures.',
    industryNeeds_ru: 'С развитием беспилотных технологий низковысотная активность вокруг критически важных объектов стала более частой. Для электроподстанций, плотин ГЭС, нефтегазовых и химических объектов важно заранее видеть воздушную обстановку, подтверждать события визуально и вести проверяемые записи. Решения N-TET объединяют радарный мониторинг, оптико-электронное наблюдение, журналы событий и согласованные рабочие процессы реагирования для поддержки служб безопасности.',
    applicationScenes: [
      { title: '机场低空监测应用', title_en: 'Chemical Plant C-UAS', title_ru: 'Мониторинг воздушного пространства аэропорта' },
      { title: '发电设施低空监测', title_en: 'Oil Production Base C-UAS', title_ru: 'Мониторинг энергетических объектов' },
      { title: '天然气设施低空监测', title_en: 'Hydroelectric Dam C-UAS', title_ru: 'Мониторинг газовой инфраструктуры' },
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
    industryNeeds_en: 'Airports, large events, judicial facilities, transport hubs, and other key areas combine dense foot traffic, vehicle movement, restricted rooms, and low-altitude exposure. N-TET organizes site security around three layers: screening for people and goods, EO/IR perimeter monitoring, and C-UAS processes for detection, identification, location, tracking, graded warning, and traceable event records.',
    industryNeeds_ru: 'Критически важные зоны, такие как аэропорты, судебные учреждения и места проведения крупных спортивных мероприятий, требуют особого контроля из-за плотного потока людей и сложных операционных процессов. Современная система безопасности должна объединять видеонаблюдение, низковысотный мониторинг, досмотровое оборудование, регистрацию событий и согласованные процедуры реагирования. Решения N-TET помогают службам безопасности быстрее проверять персонал, грузы и воздушные события без публикации чувствительных технических деталей.',
    applicationScenes: [
      { title: '要地安保', title_en: 'Judicial Sector C-UAS', title_ru: 'Безопасность объектов' },
      { title: '赛事保障', title_en: 'Large Event C-UAS', title_ru: 'Безопасность мероприятий' },
      { title: '交通枢纽安保', title_en: 'Airport Security C-UAS', title_ru: 'Безопасность транспортных узлов' },
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
    industryNeeds_en: 'Emergency teams often work with damaged roads, weak communications, limited lighting, unstable weather, and incomplete site information. N-TET emergency UAV solutions support aerial reconnaissance, temporary communications, night lighting, search and rescue observation, and field coordination so teams can restore visibility and keep decisions documented during complex incidents.',
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

Object.assign(categoryLandingData['01_BorderPatrol'], {
  name_ar: 'دوريات الحدود والسواحل',
  industryNeeds_ar: 'تحتاج عمليات الحدود والسواحل إلى مراقبة واسعة النطاق وقابلة للتتبع للممرات والموانئ والمناطق الساحلية. تجمع حلول N-TET بين منصات UAV الصناعية، والحمولات الكهروبصرية، ومراقبة المناطق، وسجلات الأحداث لدعم التفتيش الواسع والتحقق البصري وتنسيق الفرق الميدانية.',
});
categoryLandingData['01_BorderPatrol'].applicationScenes[0].title_ar = 'مراقبة السفن غير المصرح بها';
categoryLandingData['01_BorderPatrol'].applicationScenes[1].title_ar = 'مراقبة الساحل على مدار الساعة';
categoryLandingData['01_BorderPatrol'].applicationScenes[2].title_ar = 'دوريات روتينية للمناطق الحدودية';

Object.assign(categoryLandingData['02_InfrastructureProtection'], {
  name_ar: 'حماية البنية التحتية الحرجة',
  industryNeeds_ar: 'مع نمو العمليات منخفضة الارتفاع، تحتاج محطات الطاقة والمحطات الفرعية والسدود وقواعد النفط والمنشآت الكيميائية إلى وعي أوضح بالمجال الجوي القريب. تدمج N-TET الرادار منخفض الارتفاع، ومراقبة الترددات اللاسلكية، والتتبع الكهروبصري، وسجلات الأحداث لدعم الكشف والتصنيف والتحقق البصري والتنسيق مع عمليات الأمن القائمة.',
});
categoryLandingData['02_InfrastructureProtection'].applicationScenes[0].title_ar = 'مراقبة المجال الجوي للمطارات';
categoryLandingData['02_InfrastructureProtection'].applicationScenes[1].title_ar = 'مراقبة منشآت توليد الطاقة';
categoryLandingData['02_InfrastructureProtection'].applicationScenes[2].title_ar = 'مراقبة منشآت الغاز الطبيعي';

Object.assign(categoryLandingData['03_KeyAreaSecurity'], {
  name_ar: 'أمن المناطق الحيوية',
  industryNeeds_ar: 'تجمع المطارات والمنشآت القضائية ومراكز النقل والفعاليات الكبرى بين كثافة بشرية وأصول وعمليات معقدة. تدمج حلول N-TET المراقبة الكهروبصرية، ومراقبة المجال منخفض الارتفاع، والفحص الذكي، وسجلات التشغيل لدعم الفحص السريع والتحقق البصري وسير الاستجابة المنسق دون كشف تفاصيل فنية حساسة.',
});
categoryLandingData['03_KeyAreaSecurity'].applicationScenes[0].title_ar = 'أمن المناطق الحيوية';
categoryLandingData['03_KeyAreaSecurity'].applicationScenes[1].title_ar = 'دعم أمن الفعاليات';
categoryLandingData['03_KeyAreaSecurity'].applicationScenes[2].title_ar = 'أمن مراكز النقل';

Object.assign(categoryLandingData['04_EmergencyRescue'], {
  name_ar: 'الطوارئ والإنقاذ',
  industryNeeds_ar: 'تحتاج فرق الطوارئ إلى نشر المراقبة الجوية والاتصال المؤقت والإضاءة بسرعة في مواقع معقدة مع قابلية التتبع. تدعم حلول N-TET باستخدام UAV الاستطلاع والبحث والتنسيق والاتصال بعد الكوارث والإضاءة الليلية لتحسين القرار واستمرارية العمليات في الميدان.',
});
categoryLandingData['04_EmergencyRescue'].applicationScenes[0].title_ar = 'اتصالات طارئة بعد الزلازل';
categoryLandingData['04_EmergencyRescue'].applicationScenes[1].title_ar = 'مراقبة ميدانية للفيضانات';
categoryLandingData['04_EmergencyRescue'].applicationScenes[2].title_ar = 'إضاءة طارئة لأعمال الإصلاح';

export default categoryLandingData;
