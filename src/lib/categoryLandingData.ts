export interface CategoryLandingData {
  id: string;
  name: string;
  name_en: string;
  name_ru: string;
  bannerImage: string;
  industryNeeds_en: string;
  industryNeeds_ru: string;
  recommendedProductHandles: string[];
}

const categoryLandingData: Record<string, CategoryLandingData> = {
  '02_InfrastructureProtection': {
    id: '02_InfrastructureProtection',
    name: 'Защита критической инфраструктуры',
    name_en: 'Защита критической инфраструктуры',
    name_ru: 'Защита критической инфраструктуры',
    bannerImage: '/solutions/infrastructure protection banner bg.webp',
    industryNeeds_en:
      'Электростанциям, подстанциям, плотинам, нефтегазовым базам и химическим предприятиям необходим непрерывный контроль маловысотного пространства. Решения N-TET объединяют радиочастотный мониторинг, радар, оптико-электронное подтверждение, журналирование событий и согласованные процедуры реагирования.',
    industryNeeds_ru:
      'Электростанциям, подстанциям, плотинам, нефтегазовым базам и химическим предприятиям необходим непрерывный контроль маловысотного пространства. Решения N-TET объединяют радиочастотный мониторинг, радар, оптико-электронное подтверждение, журналирование событий и согласованные процедуры реагирования.',
    recommendedProductHandles: [
      'stationary-rf-detection-system',
      'low-altitude-detection-radar-ku-band',
      'composite-electro-optical-tracking-system',
    ],
  },
  '03_KeyAreaSecurity': {
    id: '03_KeyAreaSecurity',
    name: 'Защита ключевых объектов',
    name_en: 'Защита ключевых объектов',
    name_ru: 'Защита ключевых объектов',
    bannerImage: '/solutions/key area security banner bg.webp',
    industryNeeds_en:
      'Аэропорты, исправительные учреждения, транспортные узлы и площадки массовых мероприятий требуют многоуровневого контроля маловысотного пространства. N-TET объединяет RF-мониторинг, радар и оптико-электронное сопровождение для обнаружения, подтверждения, отслеживания и документирования событий.',
    industryNeeds_ru:
      'Аэропорты, исправительные учреждения, транспортные узлы и площадки массовых мероприятий требуют многоуровневого контроля маловысотного пространства. N-TET объединяет RF-мониторинг, радар и оптико-электронное сопровождение для обнаружения, подтверждения, отслеживания и документирования событий.',
    recommendedProductHandles: [
      'stationary-rf-detection-system',
      'portable-rf-detection-case',
      'composite-electro-optical-tracking-system',
    ],
  },
};

export default categoryLandingData;
