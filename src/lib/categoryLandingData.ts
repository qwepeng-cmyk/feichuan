export interface CategoryLandingData {
  id: string;
  name: string;
  name_en: string;
  name_ru: string;
  bannerImage: string;
  industryNeeds_en: string;
  industryNeeds_ru: string;
  applicationScenes: { title: string; title_en: string; title_ru: string }[];
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
    industryNeeds_en: 'Border and coastal defense is critical to overall national security and development. Traditional frontline defense tasks are heavy, with prominent pressure on anti-infiltration and anti-smuggling. The integrated air-ground construction of smart border defense brings important opportunities to enhance prevention and control efficiency. UAVs equipped with high-performance optoelectronic pods can conduct wide-area maritime inspections for full-domain dynamic monitoring. Intelligent optoelectronic turrets serve as border surveillance equipment, featuring visible light and infrared dual-spectrum systems for 24/7 blind-spot-free monitoring, precisely capturing target details and locating suspicious targets in nocturnal environments. Integrating AI algorithms and high-precision control technology, they can lock and track moving targets, filter interference, and realize intelligent "identification-tracking-warning". Working in coordination, they synchronously transmit HD footage, providing precise support for command decisions, acting as powerful tools to safeguard maritime security and combat illegal activities, and helping build an all-around, three-dimensional smart border defense system.',
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
    industryNeeds_en: 'With the rapid development of the low-altitude economy, low-altitude activities have become increasingly frequent. While the popularization of UAV technology brings convenience, it also triggers a series of low-altitude security issues such as unauthorized "black flights". Around critical infrastructure like power substations, hydroelectric dams, oil production bases, and chemical plants, unauthorized drone flights pose serious threats to operational safety. Preventing low-altitude risks and ensuring absolute facility security has become an urgent priority. Critical infrastructure protection uses optoelectronic turrets as core sensing units, equipped with dual-band detection technology to accurately capture UAV trajectories, identify targets, and synchronously transmit data 24/7. Relying on front-end sensing data, counter-UAV equipment combines radio monitoring and navigation deception, utilizing flexible fixed and mobile deployments. Through parameter optimization, it avoids interference with critical facility equipment. The coordinated system achieves fully automated operation, adapting to all-weather complex scenarios to efficiently defend against various low-altitude threats and ensure the safe and stable operation of critical infrastructure.',
    industryNeeds_ru: 'С развитием беспилотных технологий участились случаи несанкционированных полетов дронов над критически важными объектами. На электроподстанциях, плотинах ГЭС, нефтеперерабатывающих заводах и химических предприятиях такие полеты представляют серьезную угрозу. Обеспечение безопасности инфраструктуры стало приоритетной задачей. Наши решения объединяют системы обнаружения и противодействия, используя радарный мониторинг и навигационную подмену. Координированная работа систем позволяет в автоматическом режиме защищать объекты от различных угроз в любых погодных условиях.',
    applicationScenes: [
      { title: '机场反无应用', title_en: 'Airport Anti-Drone Application', title_ru: 'Антидроновые решения для аэропортов' },
      { title: '发电设施反无应用', title_en: 'Power Facility Anti-Drone Application', title_ru: 'Защита энергетических объектов' },
      { title: '天然气设施反无应用', title_en: 'Natural Gas Facility Anti-Drone Application', title_ru: 'Защита газовой инфраструктуры' },
    ],
    products: [
      { name: 'FC-DRS500-4D 区域低空防御系统', name_en: 'FC-DRS500-4D Regional Low-Altitude Defense System' },
      { name: 'FC-DRS1000-4D 区域低空防御系统', name_en: 'FC-DRS1000-4D Regional Low-Altitude Defense System' },
      { name: '光电识别跟踪设备', name_en: 'Optoelectronic Identification & Tracking Equipment' },
    ],
    recommendedProductHandles: [
      'stationary-active-rf-defense-system',
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
    industryNeeds_en: 'Critical key areas such as large-scale sports events, airports, and judicial departments are typically densely populated, scenario-complex, and concentrated with classified information, facing multiple security risks including drone intrusions, unauthorized personnel movement, and contraband smuggling. Traditional single-method security measures can no longer meet increasingly severe security control requirements. There is an urgent need to establish a comprehensive, smart, efficient, and multi-line coordinated security system to address complex and volatile security challenges. Key area security protection centers on comprehensive, intelligent three-dimensional prevention and control, integrating three core sectors: optoelectronic surveillance, counter-UAV, and smart security screening. Optoelectronic surveillance relies on multi-spectral imaging and laser ranging technologies to achieve full-domain 24/7 precision monitoring and target positioning. Counter-UAV equipment can effectively block unauthorized drone signals and prevent low-altitude security risks. Security screening equipment uses smart detection technology to quickly and accurately inspect personnel and goods, thereby fortifying the security defense line of key areas and ensuring their safe and stable operation.',
    industryNeeds_ru: 'Критически важные зоны, такие как аэропорты, судебные департаменты и места проведения крупных спортивных мероприятий, требуют особого контроля из-за плотного потока людей и наличия секретной информации. Традиционные меры безопасности уже не отвечают современным вызовам. Необходима комплексная интеллектуальная система, объединяющая видеонаблюдение, досмотровое оборудование и средства борьбы с дронами. Наше оборудование обеспечивает круглосуточный высокоточный мониторинг, блокировку сигналов дронов и быструю проверку персонала и грузов, гарантируя стабильную работу объектов.',
    applicationScenes: [
      { title: '要地安保', title_en: 'Key Area Security', title_ru: 'Безопасность объектов' },
      { title: '赛事保障', title_en: 'Event Security', title_ru: 'Безопасность мероприятий' },
      { title: '交通枢纽安保', title_en: 'Transport Hub Security', title_ru: 'Безопасность транспортных узлов' },
    ],
    products: [
      { name: '固定式无线电侦测设备', name_en: 'Fixed Radio Detection Equipment' },
      { name: '固定式转台无线电压制', name_en: 'Fixed Turret Radio Suppression' },
      { name: '防爆导航诱骗', name_en: 'Explosion-Proof Navigation Deception' },
      { name: '光电识别跟踪', name_en: 'Optoelectronic Identification & Tracking' },
      { name: 'FC2088手持金属探测器', name_en: 'FC2088 Handheld Metal Detector' },
      { name: 'FC-H 智慧手机探测门', name_en: 'FC-H Smart Phone Detection Gate' },
      { name: 'FC1800T台式爆炸物毒品探测仪', name_en: 'FC1800T Desktop Explosives/Narcotics Detector' },
      { name: 'FC6550D双源双视角安检机', name_en: 'FC6550D Dual-Source Dual-View X-Ray Machine' },
    ],
    recommendedProductHandles: [
      'stationary-rf-detection-system',
      'directional-rf-jammer',
      'uav-navigation-spoofing-system',
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

export default categoryLandingData;
