import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  Factory,
  FileClock,
  Landmark,
  Plane,
  RadioTower,
  Route,
  ScanSearch,
  Ship,
  Target,
  Zap,
} from 'lucide-react';
import WhatsAppLeadButton from '@/components/contact/WhatsAppLeadButton';
import InquiryForm from '@/components/products/InquiryForm';
import MobileInquiryForm from '@/components/mobile/MobileInquiryForm';
import JsonLd from '@/components/seo/JsonLd';
import { getDictionary } from '@/i18n/getDictionary';
import { type Locale } from '@/i18n/config';
import { localePath } from '@/lib/localePath';
import { buildSeoMetadata } from '@/lib/seoMetadata';
import { breadcrumbSchema, pageUrl } from '@/lib/structuredData';
import OpenLinksInNewTab from './OpenLinksInNewTab';
import styles from './LowAltitudeAirspaceMonitoring.module.css';

const pageHandle = 'low-altitude-airspace-monitoring';
const pageTitle = 'Low-Altitude Airspace Security & C-UAS';
const pageDescription =
  'C-UAS and anti drone site planning for airports, refineries, power plants, ports, venues, and large perimeters, covering early warning, identification, positioning, tracking, response review, records, and quotation support.';

const localizedStrings: Partial<Record<Locale, Record<string, string>>> = {
  ru: {
    'Low-Altitude Airspace Security & C-UAS': 'Безопасность низковысотного воздушного пространства и C-UAS',
    'C-UAS and anti drone site planning for airports, refineries, power plants, ports, venues, and large perimeters, covering early warning, identification, positioning, tracking, handling, records, and quotation support.':
      'Планирование C-UAS и anti-drone решений для аэропортов, НПЗ, электростанций, портов, площадок мероприятий и крупных периметров: раннее предупреждение, идентификация, позиционирование, сопровождение, обработка событий, записи и подготовка предложения.',
    'Fixed, vehicle-mobile, or portable coverage': 'Стационарное, мобильное на автомобиле или переносное покрытие',
    'RF, radar, EO, and Remote ID in one plan': 'RF, радар, EO и Remote ID в одном плане',
    'Early warning, identify, position, track, and handle': 'Раннее предупреждение, идентификация, позиционирование, сопровождение и обработка',
    'Site layout, equipment list, records, and quote': 'Схема площадки, список оборудования, записи и коммерческое предложение',
    'Public-site night event': 'Ночное событие на общественной площадке',
    'Aircraft operation disruption': 'Нарушение авиационных операций',
    'Maritime critical-operation exposure': 'Риск для критичных морских операций',
    'Energy facility exposure': 'Риск для энергетического объекта',
    'Perimeter overflight': 'Пролет над периметром',
    'Restricted airspace intrusion': 'Вход в ограниченное воздушное пространство',
    'Utility corridor incident': 'Инцидент в инженерном коридоре',
    'Public-building drone sighting': 'Обнаружение дрона у общественного здания',
    'Site Plan': 'План площадки',
    'Define perimeter zones, key areas, operator roles, alert contacts, and a practical C-UAS layout before equipment selection.':
      'Определите зоны периметра, ключевые участки, роли операторов, контакты оповещения и практичную схему C-UAS до выбора оборудования.',
    'Early Warning': 'Раннее предупреждение',
    'Use RF, radar, EO, and Remote ID inputs to raise early warning when low-altitude activity appears near the site.':
      'Используйте данные RF, радара, EO и Remote ID для раннего предупреждения при появлении низковысотной активности рядом с объектом.',
    'Identification': 'Идентификация',
    'Compare signal, position, visual, and available identity clues so operators can classify the event before escalation.':
      'Сопоставляйте сигнал, позицию, визуальные признаки и доступные идентификаторы, чтобы оператор мог классифицировать событие до эскалации.',
    'Positioning': 'Позиционирование',
    'Show the target position and activity area on the map to support command-room review and field coordination.':
      'Отображайте позицию цели и область активности на карте для анализа в командном центре и координации полевых групп.',
    'Tracking': 'Сопровождение',
    'Keep the movement path, status changes, and review notes visible as the event moves across the perimeter.':
      'Показывайте маршрут движения, изменения статуса и заметки оператора, пока событие перемещается по периметру.',
    'Response Review': 'Проверка реагирования',
    'Link alerts, operator actions, and event records for on-site response, reporting, and later system optimization.':
      'Связывайте тревоги, действия операторов и записи событий для реагирования на объекте, отчетности и последующей оптимизации системы.',
    'Airspace Sensing Layer': 'Слой контроля воздушного пространства',
    'RF signal awareness': 'Контроль RF-сигналов',
    'Low-altitude radar coverage': 'Радарное покрытие низких высот',
    'Electro-optical verification': 'Электрооптическая верификация',
    'Review & Linkage Layer': 'Слой проверки и связки действий',
    'Multi-source alert review': 'Проверка тревог из нескольких источников',
    'Visual confirmation workflow': 'Процесс визуального подтверждения',
    'Patrol and command-room coordination': 'Координация патруля и командного центра',
    'Low-Altitude Management Platform': 'Платформа управления низковысотной обстановкой',
    'Fixed command workstation': 'Стационарное рабочее место',
    'Mobile operator access': 'Мобильный доступ оператора',
    'Map, alert, and record management': 'Управление картой, тревогами и записями',
    'Fixed Site Coverage': 'Стационарное покрытие объекта',
    'Always-on coverage for planned perimeters': 'Постоянное покрытие для спланированных периметров',
    'Plan': 'Планирование',
    'Handling': 'Обработка',
    'Vehicle-Mobile Option': 'Мобильный вариант на автомобиле',
    'Mobile coverage for temporary or changing sites': 'Мобильное покрытие для временных или меняющихся площадок',
    'Portable Field Option': 'Переносной полевой вариант',
    'Flexible support for field teams and short-term tasks': 'Гибкая поддержка полевых команд и краткосрочных задач',
    'Flexible Setup': 'Гибкое развертывание',
    'Quick Response': 'Быстрое реагирование',
    'Industrial Site Safety Operations': 'Безопасность промышленных объектов',
    'Perimeter and key-area awareness': 'Контроль периметра и ключевых зон',
    'Low-altitude warning and visual review': 'Низковысотное предупреждение и визуальная проверка',
    'Security, patrol, and event records': 'Записи безопасности, патрулирования и событий',
    'Public Venue & Event Operations': 'Общественные площадки и мероприятия',
    'Temporary or fixed site plan': 'Временный или стационарный план объекта',
    'Crowd-area and perimeter awareness': 'Контроль зон скопления людей и периметра',
    'Event-time response coordination': 'Координация реагирования во время мероприятия',
    'Airport & Large Perimeter Operations': 'Аэропорты и крупные периметры',
    'Runway, apron, and boundary review': 'Проверка ВПП, перрона и границ',
    'Wide-area positioning and tracking': 'Позиционирование и сопровождение на большой площади',
    'Visual identification and records': 'Визуальная идентификация и записи',
    'Airport / Runway Protection': 'Защита аэропорта / ВПП',
    'Plan RF, radar, EO, and event records around runways, aprons, boundary roads, and operation zones.':
      'Планируйте RF, радар, EO и записи событий вокруг ВПП, перронов, периметральных дорог и операционных зон.',
    'Oil & Gas / Refinery Protection': 'Защита нефтегазовых и НПЗ объектов',
    'Support early warning, identification, and tracking around process units, tank farms, loading areas, and logistics gates.':
      'Поддерживайте раннее предупреждение, идентификацию и сопровождение вокруг технологических установок, резервуарных парков, зон погрузки и логистических ворот.',
    'Power Plant & Substation Protection': 'Защита электростанций и подстанций',
    'Support early warning, alert review, and command workflows for critical energy facilities.':
      'Поддерживайте раннее предупреждение, проверку тревог и командные процессы для критичных энергетических объектов.',
    'Port & Border Perimeter Coverage': 'Покрытие портов и пограничных периметров',
    'Build wide-area awareness for docks, storage yards, border zones, and long perimeters.':
      'Создавайте обзор большой площади для доков, складских площадок, пограничных зон и протяженных периметров.',
    'Controlled Facility / Key Area Security': 'Охраняемый объект / безопасность ключевой зоны',
    'Identify, locate, and review low-altitude activity around controlled zones and high-value facilities.':
      'Идентифицируйте, локализуйте и проверяйте низковысотную активность вокруг контролируемых зон и ценных объектов.',
    'Stadium & Event Airspace Security': 'Безопасность воздушного пространства стадионов и мероприятий',
    'Support temporary or fixed C-UAS plans for venues, events, and public operations.':
      'Поддерживайте временные или стационарные планы C-UAS для площадок, мероприятий и общественных операций.',
    'Stationary RF Identification System': 'Стационарная RF-система идентификации',
    'Fixed RF early warning': 'Стационарное RF-раннее предупреждение',
    'Fixed-site RF awareness': 'RF-контроль стационарного объекта',
    'Early warning and event records': 'Раннее предупреждение и записи событий',
    'Low-Altitude Early-Warning Radar (Ku-Band)': 'Радар раннего предупреждения низких высот (Ku-диапазон)',
    'Wide-area positioning': 'Позиционирование на большой площади',
    'Wide-area low-altitude coverage': 'Широкое покрытие низких высот',
    'Positioning and tracking support': 'Поддержка позиционирования и сопровождения',
    'Low-Altitude Early-Warning Radar (X-Band)': 'Радар раннего предупреждения низких высот (X-диапазон)',
    'Extended radar option': 'Расширенный радарный вариант',
    '3D target positioning support': 'Поддержка 3D-позиционирования цели',
    'Track review for larger perimeters': 'Проверка траектории для крупных периметров',
    'Electro-Optical Tracking System': 'Электрооптическая система сопровождения',
    'Visual identification': 'Визуальная идентификация',
    'Visual identification and review': 'Визуальная идентификация и проверка',
    'Day and night tracking support': 'Поддержка сопровождения днем и ночью',
    'UAV Remote ID Recognition System': 'Система распознавания UAV Remote ID',
    'Identity review': 'Проверка идентификатора',
    'Remote ID information reading': 'Считывание информации Remote ID',
    'Operator review and records': 'Проверка оператором и записи',
    'Portable RF Identification System': 'Переносная RF-система идентификации',
    'Field verification': 'Проверка в полевых условиях',
    'Portable field deployment': 'Переносное полевое развертывание',
    'Event review and handover support': 'Поддержка проверки события и передачи',
    'Handheld RF Identification System': 'Ручная RF-система идентификации',
    'Mobile inspection': 'Мобильная проверка',
    'Handheld signal identification': 'Ручная идентификация сигнала',
    'Flexible perimeter patrol support': 'Гибкая поддержка патрулирования периметра',
    'Directional RF C-UAS Site Unit': 'Направленный RF-модуль C-UAS для объекта',
    'Directional RF site unit': 'Направленный RF-модуль объекта',
    'Directional RF event logging': 'Регистрация направленных RF-событий',
    'Supports positioning and response review': 'Поддерживает позиционирование и проверку реагирования',
    'Choose by Site Type': 'Выберите тип объекта',
    'Select the operating environment closest to your site, then request a C-UAS layout and quotation.':
      'Выберите рабочую среду, наиболее близкую к вашему объекту, затем запросите схему C-UAS и коммерческое предложение.',
    'Unauthorized Drone Events Are Increasing': 'Количество несанкционированных событий с дронами растет',
    'Patterns seen across controlled sites, transport areas, public buildings, utility corridors, and critical operations.':
      'Типовые ситуации для охраняемых объектов, транспортных зон, общественных зданий, инженерных коридоров и критичных операций.',
    'System composition': 'Состав системы',
    'Low-Altitude Airspace Security System Composition': 'Состав системы безопасности низковысотного воздушного пространства',
    'A practical site plan combines airspace sensing, operator review, field coordination, and platform-based records so buyers can compare coverage, workflow, and quotation details.':
      'Практичный план объекта объединяет контроль воздушного пространства, проверку оператором, координацию на площадке и платформенные записи, чтобы покупатели могли сравнить покрытие, процесс и детали предложения.',
    'Coverage modes': 'Режимы покрытия',
    'Fixed and Mobile Coverage Options': 'Стационарные и мобильные варианты покрытия',
    'Different sites can choose a fixed, vehicle-mobile, or portable setup according to perimeter size, deployment time, and operator workflow.':
      'Разные объекты могут выбрать стационарную, мобильную на автомобиле или переносную конфигурацию в зависимости от размера периметра, времени развертывания и процесса оператора.',
    'C-UAS Site Security Plan': 'План безопасности объекта C-UAS',
    'Low-Altitude Airspace': 'Низковысотное воздушное пространство',
    'Low-Altitude': 'Низкие высоты',
    'Security for Critical Sites': 'Безопасность критичных объектов',
    'C-UAS site planning for fixed, vehicle-mobile, or portable coverage, with early warning, identification, positioning, tracking, handling, records, and quotation support.':
      'Планирование C-UAS для стационарного, мобильного на автомобиле или переносного покрытия: раннее предупреждение, идентификация, позиционирование, сопровождение, обработка, записи и поддержка предложения.',
    'For airports, refineries, power plants, ports, venues, and large perimeters. N-TET helps plan a C-UAS setup from real site conditions: sensing equipment, operator review, platform records, and fixed, vehicle-mobile, or portable deployment options.':
      'Для аэропортов, НПЗ, электростанций, портов, площадок мероприятий и крупных периметров. N-TET помогает спланировать C-UAS по реальным условиям объекта: сенсорное оборудование, проверка оператором, записи платформы и стационарные, мобильные на автомобиле или переносные варианты развертывания.',
    'Get Site Layout & Quote': 'Получить схему объекта и предложение',
    'WhatsApp Chat': 'Чат WhatsApp',
    'Low-Altitude C-UAS Workflow': 'Процесс C-UAS для низких высот',
    'Adapted from fixed and mobile operation patterns: plan the site, raise early warning, identify, position, track, coordinate response, and keep reviewable records.':
      'Основано на стационарных и мобильных схемах работы: спланировать объект, поднять раннее предупреждение, идентифицировать, позиционировать, сопровождать, координировать реагирование и сохранять проверяемые записи.',
    'C-UAS Equipment for Site Plans': 'Оборудование C-UAS для планов объектов',
    'Choose fixed, mobile, radar, RF, EO, and Remote ID equipment according to the site plan, early warning, identification, positioning, tracking, response, and record requirements.':
      'Выбирайте стационарное, мобильное, радарное, RF, EO и Remote ID оборудование по требованиям схемы объекта, раннего предупреждения, идентификации, позиционирования, сопровождения, реагирования и записей.',
    'Low-Altitude Site Operations': 'Операции на низковысотных объектах',
    'Use these examples to plan low-altitude awareness, perimeter security, response coordination, and reviewable records for different operating sites.':
      'Используйте эти примеры для планирования низковысотного контроля, безопасности периметра, координации реагирования и проверяемых записей для разных объектов.',
    'C-UAS Scenarios by Site Type': 'Сценарии C-UAS по типу объекта',
    'Choose the closest site type first. N-TET can then match fixed, vehicle-mobile, or portable equipment to the perimeter, coverage range, review workflow, and quotation needs.':
      'Сначала выберите наиболее близкий тип объекта. Затем N-TET подберет стационарное, мобильное на автомобиле или переносное оборудование под периметр, дальность покрытия, процесс проверки и требования к предложению.',
    'Site Scenarios': 'Сценарии объектов',
    'Project Case References': 'Референсные проекты',
    'Energy, chemical, logistics, and industrial parks': 'Энергетика, химия, логистика и промышленные парки',
    'Event, stadium, transport, and controlled-site operations': 'Мероприятия, стадионы, транспорт и контролируемые площадки',
    'Wide boundary coverage and layered airspace awareness': 'Широкое покрытие границ и многоуровневый контроль воздушного пространства',
    'Asian Games Low-Altitude C-UAS Application': 'Применение C-UAS низких высот на Азиатских играх',
    'C-UAS Case of a Group Factory in Nigeria': 'Кейс C-UAS для группового завода в Нигерии',
    'C-UAS Case of a Power Plant in Pakistan': 'Кейс C-UAS для электростанции в Пакистане',
    'C-UAS Case of a Refinery in Brazil': 'Кейс C-UAS для НПЗ в Бразилии',
    'Airport C-UAS Application': 'Применение C-UAS в аэропорту',
    'Water Conservancy Facility Low-Altitude C-UAS': 'C-UAS низких высот для водохозяйственного объекта',
    'Learn More': 'Подробнее',
    'Airspace Security': 'Безопасность воздушного пространства',
    'Workflow': 'Процесс',
    'C-UAS Equipment Options': 'Варианты оборудования C-UAS',
    'Site Operations': 'Операции на объекте',
    'View': 'Открыть',
  },
  es: {
    'Low-Altitude Airspace Security & C-UAS': 'Seguridad del espacio aéreo de baja altitud y C-UAS',
    'C-UAS and anti drone site planning for airports, refineries, power plants, ports, venues, and large perimeters, covering early warning, identification, positioning, tracking, handling, records, and quotation support.':
      'Planificación C-UAS y anti drone para aeropuertos, refinerías, plantas eléctricas, puertos, recintos y grandes perímetros, con alerta temprana, identificación, posicionamiento, seguimiento, gestión, registros y soporte de cotización.',
    'Fixed, vehicle-mobile, or portable coverage': 'Cobertura fija, móvil en vehículo o portátil',
    'RF, radar, EO, and Remote ID in one plan': 'RF, radar, EO y Remote ID en un solo plan',
    'Early warning, identify, position, track, and handle': 'Alerta temprana, identificación, posicionamiento, seguimiento y gestión',
    'Site layout, equipment list, records, and quote': 'Diseño del sitio, lista de equipos, registros y cotización',
    'Public-site night event': 'Evento nocturno en sitio público',
    'Aircraft operation disruption': 'Interrupción de operaciones aéreas',
    'Maritime critical-operation exposure': 'Exposición de operación marítima crítica',
    'Energy facility exposure': 'Exposición de instalación energética',
    'Perimeter overflight': 'Sobrevuelo del perímetro',
    'Restricted airspace intrusion': 'Intrusión en espacio aéreo restringido',
    'Utility corridor incident': 'Incidente en corredor de servicios',
    'Public-building drone sighting': 'Avistamiento de drone junto a edificio público',
    'Site Plan': 'Plan del sitio',
    'Define perimeter zones, key areas, operator roles, alert contacts, and a practical C-UAS layout before equipment selection.':
      'Defina zonas de perímetro, áreas clave, roles de operador, contactos de alerta y un diseño C-UAS práctico antes de seleccionar equipos.',
    'Early Warning': 'Alerta temprana',
    'Use RF, radar, EO, and Remote ID inputs to raise early warning when low-altitude activity appears near the site.':
      'Use entradas de RF, radar, EO y Remote ID para activar alerta temprana cuando aparezca actividad de baja altitud cerca del sitio.',
    'Identification': 'Identificación',
    'Compare signal, position, visual, and available identity clues so operators can classify the event before escalation.':
      'Compare señal, posición, indicios visuales e identidad disponible para que los operadores clasifiquen el evento antes de escalarlo.',
    'Positioning': 'Posicionamiento',
    'Show the target position and activity area on the map to support command-room review and field coordination.':
      'Muestre la posición del objetivo y el área de actividad en el mapa para apoyar la revisión en sala de control y la coordinación en campo.',
    'Tracking': 'Seguimiento',
    'Keep the movement path, status changes, and review notes visible as the event moves across the perimeter.':
      'Mantenga visible la ruta de movimiento, los cambios de estado y las notas de revisión mientras el evento se desplaza por el perímetro.',
    'Response Review': 'Revisión de respuesta',
    'Link alerts, operator actions, and event records for on-site response, reporting, and later system optimization.':
      'Vincule alertas, acciones del operador y registros de eventos para respuesta en sitio, informes y posterior optimización del sistema.',
    'Airspace Sensing Layer': 'Capa de sensado aéreo',
    'RF signal awareness': 'Conciencia de señales RF',
    'Low-altitude radar coverage': 'Cobertura radar de baja altitud',
    'Electro-optical verification': 'Verificación electro-óptica',
    'Review & Linkage Layer': 'Capa de revisión y enlace',
    'Multi-source alert review': 'Revisión de alertas multisource',
    'Visual confirmation workflow': 'Flujo de confirmación visual',
    'Patrol and command-room coordination': 'Coordinación de patrulla y sala de control',
    'Low-Altitude Management Platform': 'Plataforma de gestión de baja altitud',
    'Fixed command workstation': 'Estación fija de mando',
    'Mobile operator access': 'Acceso móvil del operador',
    'Map, alert, and record management': 'Gestión de mapas, alertas y registros',
    'Fixed Site Coverage': 'Cobertura fija del sitio',
    'Always-on coverage for planned perimeters': 'Cobertura continua para perímetros planificados',
    'Plan': 'Plan',
    'Handling': 'Gestión',
    'Vehicle-Mobile Option': 'Opción móvil en vehículo',
    'Mobile coverage for temporary or changing sites': 'Cobertura móvil para sitios temporales o cambiantes',
    'Portable Field Option': 'Opción portátil de campo',
    'Flexible support for field teams and short-term tasks': 'Soporte flexible para equipos de campo y tareas de corto plazo',
    'Flexible Setup': 'Configuración flexible',
    'Quick Response': 'Respuesta rápida',
    'Industrial Site Safety Operations': 'Operaciones de seguridad en sitios industriales',
    'Perimeter and key-area awareness': 'Conciencia de perímetro y áreas clave',
    'Low-altitude warning and visual review': 'Alerta de baja altitud y revisión visual',
    'Security, patrol, and event records': 'Registros de seguridad, patrulla y eventos',
    'Public Venue & Event Operations': 'Operaciones en recintos públicos y eventos',
    'Temporary or fixed site plan': 'Plan temporal o fijo del sitio',
    'Crowd-area and perimeter awareness': 'Conciencia de zonas de público y perímetro',
    'Event-time response coordination': 'Coordinación de respuesta durante el evento',
    'Airport & Large Perimeter Operations': 'Operaciones de aeropuerto y grandes perímetros',
    'Runway, apron, and boundary review': 'Revisión de pista, plataforma y límites',
    'Wide-area positioning and tracking': 'Posicionamiento y seguimiento de área amplia',
    'Visual identification and records': 'Identificación visual y registros',
    'Airport / Runway Protection': 'Protección de aeropuerto / pista',
    'Plan RF, radar, EO, and event records around runways, aprons, boundary roads, and operation zones.':
      'Planifique RF, radar, EO y registros de eventos alrededor de pistas, plataformas, vías perimetrales y zonas operativas.',
    'Oil & Gas / Refinery Protection': 'Protección de petróleo, gas y refinerías',
    'Support early warning, identification, and tracking around process units, tank farms, loading areas, and logistics gates.':
      'Apoye alerta temprana, identificación y seguimiento alrededor de unidades de proceso, tanques, zonas de carga y accesos logísticos.',
    'Power Plant & Substation Protection': 'Protección de plantas eléctricas y subestaciones',
    'Support early warning, alert review, and command workflows for critical energy facilities.':
      'Apoye alerta temprana, revisión de alertas y flujos de mando para instalaciones energéticas críticas.',
    'Port & Border Perimeter Coverage': 'Cobertura de puertos y perímetros fronterizos',
    'Build wide-area awareness for docks, storage yards, border zones, and long perimeters.':
      'Construya conciencia de área amplia para muelles, patios de almacenamiento, zonas fronterizas y perímetros largos.',
    'Controlled Facility / Key Area Security': 'Instalación controlada / seguridad de área clave',
    'Identify, locate, and review low-altitude activity around controlled zones and high-value facilities.':
      'Identifique, localice y revise actividad de baja altitud alrededor de zonas controladas e instalaciones de alto valor.',
    'Stadium & Event Airspace Security': 'Seguridad aérea de estadios y eventos',
    'Support temporary or fixed C-UAS plans for venues, events, and public operations.':
      'Apoye planes C-UAS temporales o fijos para recintos, eventos y operaciones públicas.',
    'Stationary RF Identification System': 'Sistema fijo de identificación RF',
    'Fixed RF early warning': 'Alerta temprana RF fija',
    'Fixed-site RF awareness': 'Conciencia RF de sitio fijo',
    'Early warning and event records': 'Alerta temprana y registros de eventos',
    'Low-Altitude Early-Warning Radar (Ku-Band)': 'Radar de alerta temprana de baja altitud (banda Ku)',
    'Wide-area positioning': 'Posicionamiento de área amplia',
    'Wide-area low-altitude coverage': 'Cobertura amplia de baja altitud',
    'Positioning and tracking support': 'Soporte de posicionamiento y seguimiento',
    'Low-Altitude Early-Warning Radar (X-Band)': 'Radar de alerta temprana de baja altitud (banda X)',
    'Extended radar option': 'Opción radar extendida',
    '3D target positioning support': 'Soporte de posicionamiento 3D de objetivo',
    'Track review for larger perimeters': 'Revisión de trayectoria para perímetros mayores',
    'Electro-Optical Tracking System': 'Sistema de seguimiento electro-óptico',
    'Visual identification': 'Identificación visual',
    'Visual identification and review': 'Identificación visual y revisión',
    'Day and night tracking support': 'Soporte de seguimiento día y noche',
    'UAV Remote ID Recognition System': 'Sistema de reconocimiento UAV Remote ID',
    'Identity review': 'Revisión de identidad',
    'Remote ID information reading': 'Lectura de información Remote ID',
    'Operator review and records': 'Revisión del operador y registros',
    'Portable RF Identification System': 'Sistema portátil de identificación RF',
    'Field verification': 'Verificación en campo',
    'Portable field deployment': 'Despliegue portátil en campo',
    'Event review and handover support': 'Soporte de revisión y transferencia de eventos',
    'Handheld RF Identification System': 'Sistema manual de identificación RF',
    'Mobile inspection': 'Inspección móvil',
    'Handheld signal identification': 'Identificación manual de señales',
    'Flexible perimeter patrol support': 'Soporte flexible para patrulla perimetral',
    'Directional RF C-UAS Site Unit': 'Unidad RF direccional C-UAS para sitio',
    'Directional RF site unit': 'Unidad RF direccional del sitio',
    'Directional RF event logging': 'Registro de eventos RF direccionales',
    'Supports positioning and response review': 'Soporta posicionamiento y revisión de respuesta',
    'Choose by Site Type': 'Elegir por tipo de sitio',
    'Select the operating environment closest to your site, then request a C-UAS layout and quotation.':
      'Seleccione el entorno operativo más cercano a su sitio y solicite un diseño C-UAS y una cotización.',
    'Unauthorized Drone Events Are Increasing': 'Los eventos no autorizados con drones están aumentando',
    'Patterns seen across controlled sites, transport areas, public buildings, utility corridors, and critical operations.':
      'Patrones observados en sitios controlados, áreas de transporte, edificios públicos, corredores de servicios y operaciones críticas.',
    'System composition': 'Composición del sistema',
    'Low-Altitude Airspace Security System Composition': 'Composición del sistema de seguridad aérea de baja altitud',
    'A practical site plan combines airspace sensing, operator review, field coordination, and platform-based records so buyers can compare coverage, workflow, and quotation details.':
      'Un plan práctico combina sensado aéreo, revisión del operador, coordinación de campo y registros en plataforma para comparar cobertura, flujo de trabajo y detalles de cotización.',
    'Coverage modes': 'Modos de cobertura',
    'Fixed and Mobile Coverage Options': 'Opciones de cobertura fija y móvil',
    'Different sites can choose a fixed, vehicle-mobile, or portable setup according to perimeter size, deployment time, and operator workflow.':
      'Cada sitio puede elegir una configuración fija, móvil en vehículo o portátil según tamaño del perímetro, tiempo de despliegue y flujo del operador.',
    'C-UAS Site Security Plan': 'Plan de seguridad C-UAS del sitio',
    'Low-Altitude Airspace': 'Espacio aéreo de baja altitud',
    'Low-Altitude': 'Baja altitud',
    'Security for Critical Sites': 'Seguridad para sitios críticos',
    'C-UAS site planning for fixed, vehicle-mobile, or portable coverage, with early warning, identification, positioning, tracking, handling, records, and quotation support.':
      'Planificación C-UAS para cobertura fija, móvil en vehículo o portátil, con alerta temprana, identificación, posicionamiento, seguimiento, gestión, registros y soporte de cotización.',
    'For airports, refineries, power plants, ports, venues, and large perimeters. N-TET helps plan a C-UAS setup from real site conditions: sensing equipment, operator review, platform records, and fixed, vehicle-mobile, or portable deployment options.':
      'Para aeropuertos, refinerías, plantas eléctricas, puertos, recintos y grandes perímetros. N-TET ayuda a planificar una configuración C-UAS desde condiciones reales del sitio: equipos de sensado, revisión del operador, registros de plataforma y opciones fijas, móviles en vehículo o portátiles.',
    'Get Site Layout & Quote': 'Solicitar diseño del sitio y cotización',
    'WhatsApp Chat': 'Chat por WhatsApp',
    'Low-Altitude C-UAS Workflow': 'Flujo C-UAS de baja altitud',
    'Adapted from fixed and mobile operation patterns: plan the site, raise early warning, identify, position, track, coordinate response, and keep reviewable records.':
      'Adaptado a patrones de operación fija y móvil: planificar el sitio, activar alerta temprana, identificar, posicionar, seguir, coordinar respuesta y conservar registros revisables.',
    'C-UAS Equipment for Site Plans': 'Equipos C-UAS para planes de sitio',
    'Choose fixed, mobile, radar, RF, EO, and Remote ID equipment according to the site plan, early warning, identification, positioning, tracking, response, and record requirements.':
      'Elija equipos fijos, móviles, radar, RF, EO y Remote ID según el plan del sitio y los requisitos de alerta temprana, identificación, posicionamiento, seguimiento, respuesta y registros.',
    'Low-Altitude Site Operations': 'Operaciones de sitio de baja altitud',
    'Use these examples to plan low-altitude awareness, perimeter security, response coordination, and reviewable records for different operating sites.':
      'Use estos ejemplos para planificar conciencia de baja altitud, seguridad perimetral, coordinación de respuesta y registros revisables para distintos sitios.',
    'C-UAS Scenarios by Site Type': 'Escenarios C-UAS por tipo de sitio',
    'Choose the closest site type first. N-TET can then match fixed, vehicle-mobile, or portable equipment to the perimeter, coverage range, review workflow, and quotation needs.':
      'Elija primero el tipo de sitio más cercano. N-TET puede ajustar equipos fijos, móviles en vehículo o portátiles al perímetro, rango de cobertura, flujo de revisión y necesidades de cotización.',
    'Site Scenarios': 'Escenarios de sitio',
    'Project Case References': 'Referencias de proyectos',
    'Energy, chemical, logistics, and industrial parks': 'Energía, química, logística y parques industriales',
    'Event, stadium, transport, and controlled-site operations': 'Eventos, estadios, transporte y operaciones en sitios controlados',
    'Wide boundary coverage and layered airspace awareness': 'Cobertura de límites amplios y conciencia aérea por capas',
    'Asian Games Low-Altitude C-UAS Application': 'Aplicación C-UAS de baja altitud en los Juegos Asiáticos',
    'C-UAS Case of a Group Factory in Nigeria': 'Caso C-UAS de una fábrica de grupo en Nigeria',
    'C-UAS Case of a Power Plant in Pakistan': 'Caso C-UAS de una planta eléctrica en Pakistán',
    'C-UAS Case of a Refinery in Brazil': 'Caso C-UAS de una refinería en Brasil',
    'Airport C-UAS Application': 'Aplicación C-UAS en aeropuerto',
    'Water Conservancy Facility Low-Altitude C-UAS': 'C-UAS de baja altitud para instalación hidráulica',
    'Learn More': 'Más información',
    'Airspace Security': 'Seguridad aérea',
    'Workflow': 'Flujo de trabajo',
    'C-UAS Equipment Options': 'Opciones de equipos C-UAS',
    'Site Operations': 'Operaciones del sitio',
    'View': 'Ver',
  },
  ar: {
    'Low-Altitude Airspace Security & C-UAS': 'أمن المجال الجوي منخفض الارتفاع و C-UAS',
    'C-UAS and anti drone site planning for airports, refineries, power plants, ports, venues, and large perimeters, covering early warning, identification, positioning, tracking, handling, records, and quotation support.':
      'تخطيط مواقع C-UAS ومكافحة الطائرات بدون طيار للمطارات والمصافي ومحطات الطاقة والموانئ والمرافق والحدود الواسعة، مع الإنذار المبكر والتعريف وتحديد الموقع والتتبع والمعالجة والسجلات ودعم عروض الأسعار.',
    'Fixed, vehicle-mobile, or portable coverage': 'تغطية ثابتة أو متنقلة بالمركبة أو محمولة',
    'RF, radar, EO, and Remote ID in one plan': 'RF والرادار و EO و Remote ID ضمن خطة واحدة',
    'Early warning, identify, position, track, and handle': 'إنذار مبكر وتعريف وتحديد موقع وتتبع ومعالجة',
    'Site layout, equipment list, records, and quote': 'مخطط الموقع وقائمة المعدات والسجلات وعرض السعر',
    'Public-site night event': 'حدث ليلي في موقع عام',
    'Aircraft operation disruption': 'تعطيل عمليات الطيران',
    'Maritime critical-operation exposure': 'تعرض عملية بحرية حرجة للمخاطر',
    'Energy facility exposure': 'تعرض منشأة طاقة للمخاطر',
    'Perimeter overflight': 'تحليق فوق المحيط',
    'Restricted airspace intrusion': 'دخول إلى مجال جوي مقيد',
    'Utility corridor incident': 'حادث في ممر خدمات',
    'Public-building drone sighting': 'رصد طائرة بدون طيار قرب مبنى عام',
    'Site Plan': 'خطة الموقع',
    'Define perimeter zones, key areas, operator roles, alert contacts, and a practical C-UAS layout before equipment selection.':
      'حدد مناطق المحيط والمناطق الرئيسية وأدوار المشغلين وجهات اتصال التنبيه ومخطط C-UAS عملي قبل اختيار المعدات.',
    'Early Warning': 'إنذار مبكر',
    'Use RF, radar, EO, and Remote ID inputs to raise early warning when low-altitude activity appears near the site.':
      'استخدم مدخلات RF والرادار و EO و Remote ID لإطلاق إنذار مبكر عند ظهور نشاط منخفض الارتفاع قرب الموقع.',
    'Identification': 'التعريف',
    'Compare signal, position, visual, and available identity clues so operators can classify the event before escalation.':
      'قارن الإشارة والموقع والمؤشرات المرئية وبيانات الهوية المتاحة حتى يصنف المشغل الحدث قبل التصعيد.',
    'Positioning': 'تحديد الموقع',
    'Show the target position and activity area on the map to support command-room review and field coordination.':
      'اعرض موقع الهدف ومنطقة النشاط على الخريطة لدعم مراجعة غرفة القيادة والتنسيق الميداني.',
    'Tracking': 'التتبع',
    'Keep the movement path, status changes, and review notes visible as the event moves across the perimeter.':
      'أبق مسار الحركة وتغيرات الحالة وملاحظات المراجعة مرئية أثناء انتقال الحدث عبر المحيط.',
    'Response Review': 'مراجعة الاستجابة',
    'Link alerts, operator actions, and event records for on-site response, reporting, and later system optimization.':
      'اربط التنبيهات وإجراءات المشغل وسجلات الأحداث لدعم الاستجابة في الموقع والتقارير وتحسين النظام لاحقا.',
    'Airspace Sensing Layer': 'طبقة استشعار المجال الجوي',
    'RF signal awareness': 'وعي إشارات RF',
    'Low-altitude radar coverage': 'تغطية رادارية منخفضة الارتفاع',
    'Electro-optical verification': 'تحقق كهروبصري',
    'Review & Linkage Layer': 'طبقة المراجعة والربط',
    'Multi-source alert review': 'مراجعة تنبيهات متعددة المصادر',
    'Visual confirmation workflow': 'سير عمل التأكيد البصري',
    'Patrol and command-room coordination': 'تنسيق الدوريات وغرفة القيادة',
    'Low-Altitude Management Platform': 'منصة إدارة الارتفاعات المنخفضة',
    'Fixed command workstation': 'محطة قيادة ثابتة',
    'Mobile operator access': 'وصول متنقل للمشغل',
    'Map, alert, and record management': 'إدارة الخرائط والتنبيهات والسجلات',
    'Fixed Site Coverage': 'تغطية موقع ثابت',
    'Always-on coverage for planned perimeters': 'تغطية مستمرة للمحيطات المخططة',
    'Plan': 'خطة',
    'Handling': 'معالجة',
    'Vehicle-Mobile Option': 'خيار متنقل بالمركبة',
    'Mobile coverage for temporary or changing sites': 'تغطية متنقلة للمواقع المؤقتة أو المتغيرة',
    'Portable Field Option': 'خيار ميداني محمول',
    'Flexible support for field teams and short-term tasks': 'دعم مرن للفرق الميدانية والمهام قصيرة الأجل',
    'Flexible Setup': 'إعداد مرن',
    'Quick Response': 'استجابة سريعة',
    'Industrial Site Safety Operations': 'عمليات سلامة المواقع الصناعية',
    'Perimeter and key-area awareness': 'وعي بالمحيط والمناطق الرئيسية',
    'Low-altitude warning and visual review': 'تحذير منخفض الارتفاع ومراجعة بصرية',
    'Security, patrol, and event records': 'سجلات الأمن والدوريات والأحداث',
    'Public Venue & Event Operations': 'عمليات المرافق العامة والفعاليات',
    'Temporary or fixed site plan': 'خطة موقع مؤقتة أو ثابتة',
    'Crowd-area and perimeter awareness': 'وعي بمناطق الحشود والمحيط',
    'Event-time response coordination': 'تنسيق الاستجابة أثناء الفعالية',
    'Airport & Large Perimeter Operations': 'عمليات المطارات والمحيطات الواسعة',
    'Runway, apron, and boundary review': 'مراجعة المدرج والساحة والحدود',
    'Wide-area positioning and tracking': 'تحديد موقع وتتبع على مساحة واسعة',
    'Visual identification and records': 'تعريف بصري وسجلات',
    'Airport / Runway Protection': 'حماية المطار / المدرج',
    'Plan RF, radar, EO, and event records around runways, aprons, boundary roads, and operation zones.':
      'خطط RF والرادار و EO وسجلات الأحداث حول المدارج والساحات وطرق الحدود ومناطق التشغيل.',
    'Oil & Gas / Refinery Protection': 'حماية النفط والغاز / المصافي',
    'Support early warning, identification, and tracking around process units, tank farms, loading areas, and logistics gates.':
      'ادعم الإنذار المبكر والتعريف والتتبع حول وحدات المعالجة ومزارع الخزانات ومناطق التحميل وبوابات الخدمات اللوجستية.',
    'Power Plant & Substation Protection': 'حماية محطات الطاقة والمحطات الفرعية',
    'Support early warning, alert review, and command workflows for critical energy facilities.':
      'ادعم الإنذار المبكر ومراجعة التنبيهات وسير عمل القيادة للمنشآت الحيوية للطاقة.',
    'Port & Border Perimeter Coverage': 'تغطية الموانئ ومحيطات الحدود',
    'Build wide-area awareness for docks, storage yards, border zones, and long perimeters.':
      'أنشئ وعيا واسع النطاق للأرصفة وساحات التخزين ومناطق الحدود والمحيطات الطويلة.',
    'Controlled Facility / Key Area Security': 'منشأة خاضعة للسيطرة / أمن منطقة رئيسية',
    'Identify, locate, and review low-altitude activity around controlled zones and high-value facilities.':
      'عرّف وحدد وراجع النشاط منخفض الارتفاع حول المناطق الخاضعة للسيطرة والمنشآت عالية القيمة.',
    'Stadium & Event Airspace Security': 'أمن المجال الجوي للملاعب والفعاليات',
    'Support temporary or fixed C-UAS plans for venues, events, and public operations.':
      'ادعم خطط C-UAS مؤقتة أو ثابتة للمرافق والفعاليات والعمليات العامة.',
    'Stationary RF Identification System': 'نظام تعريف RF ثابت',
    'Fixed RF early warning': 'إنذار RF مبكر ثابت',
    'Fixed-site RF awareness': 'وعي RF لموقع ثابت',
    'Early warning and event records': 'إنذار مبكر وسجلات أحداث',
    'Low-Altitude Early-Warning Radar (Ku-Band)': 'رادار إنذار مبكر منخفض الارتفاع (Ku-Band)',
    'Wide-area positioning': 'تحديد موقع واسع النطاق',
    'Wide-area low-altitude coverage': 'تغطية منخفضة الارتفاع واسعة النطاق',
    'Positioning and tracking support': 'دعم تحديد الموقع والتتبع',
    'Low-Altitude Early-Warning Radar (X-Band)': 'رادار إنذار مبكر منخفض الارتفاع (X-Band)',
    'Extended radar option': 'خيار رادار ممتد',
    '3D target positioning support': 'دعم تحديد موقع الهدف ثلاثي الأبعاد',
    'Track review for larger perimeters': 'مراجعة المسار للمحيطات الأكبر',
    'Electro-Optical Tracking System': 'نظام تتبع كهروبصري',
    'Visual identification': 'تعريف بصري',
    'Visual identification and review': 'تعريف بصري ومراجعة',
    'Day and night tracking support': 'دعم التتبع ليلا ونهارا',
    'UAV Remote ID Recognition System': 'نظام تعرف UAV Remote ID',
    'Identity review': 'مراجعة الهوية',
    'Remote ID information reading': 'قراءة معلومات Remote ID',
    'Operator review and records': 'مراجعة المشغل والسجلات',
    'Portable RF Identification System': 'نظام تعريف RF محمول',
    'Field verification': 'تحقق ميداني',
    'Portable field deployment': 'نشر ميداني محمول',
    'Event review and handover support': 'دعم مراجعة الحدث والتسليم',
    'Handheld RF Identification System': 'نظام تعريف RF يدوي',
    'Mobile inspection': 'فحص متنقل',
    'Handheld signal identification': 'تعريف الإشارة يدويا',
    'Flexible perimeter patrol support': 'دعم مرن لدوريات المحيط',
    'Directional RF C-UAS Site Unit': 'وحدة RF اتجاهية C-UAS للموقع',
    'Directional RF site unit': 'وحدة RF اتجاهية للموقع',
    'Directional RF event logging': 'تسجيل أحداث RF اتجاهية',
    'Supports positioning and response review': 'يدعم تحديد الموقع ومراجعة الاستجابة',
    'Choose by Site Type': 'اختر حسب نوع الموقع',
    'Select the operating environment closest to your site, then request a C-UAS layout and quotation.':
      'اختر بيئة التشغيل الأقرب إلى موقعك، ثم اطلب مخطط C-UAS وعرض السعر.',
    'Unauthorized Drone Events Are Increasing': 'أحداث الطائرات بدون طيار غير المصرح بها في ازدياد',
    'Patterns seen across controlled sites, transport areas, public buildings, utility corridors, and critical operations.':
      'أنماط تظهر في المواقع الخاضعة للسيطرة ومناطق النقل والمباني العامة وممرات الخدمات والعمليات الحرجة.',
    'System composition': 'تكوين النظام',
    'Low-Altitude Airspace Security System Composition': 'تكوين نظام أمن المجال الجوي منخفض الارتفاع',
    'A practical site plan combines airspace sensing, operator review, field coordination, and platform-based records so buyers can compare coverage, workflow, and quotation details.':
      'تجمع خطة الموقع العملية بين استشعار المجال الجوي ومراجعة المشغل والتنسيق الميداني والسجلات المعتمدة على المنصة، حتى يقارن المشترون التغطية وسير العمل وتفاصيل العرض.',
    'Coverage modes': 'أنماط التغطية',
    'Fixed and Mobile Coverage Options': 'خيارات التغطية الثابتة والمتحركة',
    'Different sites can choose a fixed, vehicle-mobile, or portable setup according to perimeter size, deployment time, and operator workflow.':
      'يمكن للمواقع المختلفة اختيار إعداد ثابت أو متنقل بالمركبة أو محمول حسب حجم المحيط ووقت النشر وسير عمل المشغل.',
    'C-UAS Site Security Plan': 'خطة أمن موقع C-UAS',
    'Low-Altitude Airspace': 'المجال الجوي منخفض الارتفاع',
    'Low-Altitude': 'منخفض الارتفاع',
    'Security for Critical Sites': 'أمن المواقع الحرجة',
    'C-UAS site planning for fixed, vehicle-mobile, or portable coverage, with early warning, identification, positioning, tracking, handling, records, and quotation support.':
      'تخطيط موقع C-UAS للتغطية الثابتة أو المتنقلة بالمركبة أو المحمولة، مع الإنذار المبكر والتعريف وتحديد الموقع والتتبع والمعالجة والسجلات ودعم عروض الأسعار.',
    'For airports, refineries, power plants, ports, venues, and large perimeters. N-TET helps plan a C-UAS setup from real site conditions: sensing equipment, operator review, platform records, and fixed, vehicle-mobile, or portable deployment options.':
      'للمطارات والمصافي ومحطات الطاقة والموانئ والمرافق والمحيطات الواسعة. تساعد N-TET في تخطيط إعداد C-UAS من ظروف الموقع الفعلية: معدات الاستشعار، مراجعة المشغل، سجلات المنصة، وخيارات النشر الثابتة أو المتنقلة بالمركبة أو المحمولة.',
    'Get Site Layout & Quote': 'اطلب مخطط الموقع وعرض السعر',
    'WhatsApp Chat': 'محادثة WhatsApp',
    'Low-Altitude C-UAS Workflow': 'سير عمل C-UAS منخفض الارتفاع',
    'Adapted from fixed and mobile operation patterns: plan the site, raise early warning, identify, position, track, coordinate response, and keep reviewable records.':
      'مقتبس من أنماط التشغيل الثابتة والمتحركة: تخطيط الموقع، إطلاق الإنذار المبكر، التعريف، تحديد الموقع، التتبع، تنسيق الاستجابة، والاحتفاظ بسجلات قابلة للمراجعة.',
    'C-UAS Equipment for Site Plans': 'معدات C-UAS لخطط المواقع',
    'Choose fixed, mobile, radar, RF, EO, and Remote ID equipment according to the site plan, early warning, identification, positioning, tracking, response, and record requirements.':
      'اختر المعدات الثابتة والمتحركة والرادار و RF و EO و Remote ID حسب خطة الموقع ومتطلبات الإنذار المبكر والتعريف وتحديد الموقع والتتبع والاستجابة والسجلات.',
    'Low-Altitude Site Operations': 'عمليات المواقع منخفضة الارتفاع',
    'Use these examples to plan low-altitude awareness, perimeter security, response coordination, and reviewable records for different operating sites.':
      'استخدم هذه الأمثلة لتخطيط الوعي منخفض الارتفاع وأمن المحيط وتنسيق الاستجابة والسجلات القابلة للمراجعة لمواقع تشغيل مختلفة.',
    'C-UAS Scenarios by Site Type': 'سيناريوهات C-UAS حسب نوع الموقع',
    'Choose the closest site type first. N-TET can then match fixed, vehicle-mobile, or portable equipment to the perimeter, coverage range, review workflow, and quotation needs.':
      'اختر أولا نوع الموقع الأقرب. بعدها يمكن لـ N-TET مطابقة المعدات الثابتة أو المتنقلة بالمركبة أو المحمولة مع المحيط ونطاق التغطية وسير المراجعة واحتياجات عرض السعر.',
    'Site Scenarios': 'سيناريوهات الموقع',
    'Project Case References': 'مراجع مشاريع',
    'Energy, chemical, logistics, and industrial parks': 'الطاقة والكيميائيات واللوجستيات والمناطق الصناعية',
    'Event, stadium, transport, and controlled-site operations': 'الفعاليات والملاعب والنقل وعمليات المواقع الخاضعة للسيطرة',
    'Wide boundary coverage and layered airspace awareness': 'تغطية حدود واسعة ووعي جوي متعدد الطبقات',
    'Asian Games Low-Altitude C-UAS Application': 'تطبيق C-UAS منخفض الارتفاع في الألعاب الآسيوية',
    'C-UAS Case of a Group Factory in Nigeria': 'حالة C-UAS لمصنع مجموعة في نيجيريا',
    'C-UAS Case of a Power Plant in Pakistan': 'حالة C-UAS لمحطة طاقة في باكستان',
    'C-UAS Case of a Refinery in Brazil': 'حالة C-UAS لمصفاة في البرازيل',
    'Airport C-UAS Application': 'تطبيق C-UAS في المطار',
    'Water Conservancy Facility Low-Altitude C-UAS': 'C-UAS منخفض الارتفاع لمنشأة مائية',
    'Learn More': 'اعرف المزيد',
    'Airspace Security': 'أمن المجال الجوي',
    'Workflow': 'سير العمل',
    'C-UAS Equipment Options': 'خيارات معدات C-UAS',
    'Site Operations': 'عمليات الموقع',
    'View': 'عرض',
  },
};

function copy(locale: Locale, value: string) {
  if (locale === 'en') return value;
  return localizedStrings[locale]?.[value] || value;
}

const heroPoints = [
  'Fixed, vehicle-mobile, or portable coverage',
  'RF, radar, EO, and Remote ID in one plan',
  'Early warning, identify, position, track, and handle',
  'Site layout, equipment list, records, and quote',
];

const incidentGallery = [
  {
    caption: 'Public-site night event',
    image: '/solutions/low-altitude-airspace-monitoring/incident-gallery/public-site-night-event.webp',
  },
  {
    caption: 'Aircraft operation disruption',
    image: '/solutions/low-altitude-airspace-monitoring/incident-gallery/aircraft-operation-disruption.webp',
  },
  {
    caption: 'Maritime critical-operation exposure',
    image: '/solutions/low-altitude-airspace-monitoring/incident-gallery/maritime-critical-operation.webp',
  },
  {
    caption: 'Energy facility exposure',
    image: '/solutions/low-altitude-airspace-monitoring/incident-gallery/energy-facility-exposure.webp',
  },
  {
    caption: 'Perimeter overflight',
    image: '/solutions/low-altitude-airspace-monitoring/incident-gallery/perimeter-overflight.webp',
  },
  {
    caption: 'Restricted airspace intrusion',
    image: '/solutions/low-altitude-airspace-monitoring/incident-gallery/restricted-airspace-intrusion.webp',
  },
  {
    caption: 'Utility corridor incident',
    image: '/solutions/low-altitude-airspace-monitoring/incident-gallery/utility-corridor-incident.webp',
  },
  {
    caption: 'Public-building drone sighting',
    image: '/solutions/low-altitude-airspace-monitoring/incident-gallery/public-building-sighting.webp',
  },
];

const systemLayers = [
  {
    title: 'Site Plan',
    text: 'Define perimeter zones, key areas, operator roles, alert contacts, and a practical C-UAS layout before selecting equipment.',
    icon: ClipboardList,
  },
  {
    title: 'Early Warning',
    text: 'Use RF, radar, EO, and Remote ID inputs to raise early warning when low-altitude activity appears near the site.',
    icon: RadioTower,
  },
  {
    title: 'Identification',
    text: 'Compare signal, position, visual, and available identity clues so operators can classify the event before response.',
    icon: ScanSearch,
  },
  {
    title: 'Positioning',
    text: 'Show the target position and activity area on the map to support command-room review and field coordination.',
    icon: Target,
  },
  {
    title: 'Tracking',
    text: 'Keep the movement path, status changes, and review notes visible as the event moves across the perimeter.',
    icon: Route,
  },
  {
    title: 'Response & Records',
    text: 'Link alerts, operator notes, and event records for response review, reporting, and later system optimization.',
    icon: FileClock,
  },
];

const compositionCards = [
  {
    title: 'Airspace Sensing Module',
    points: ['RF signal awareness', 'Low-altitude radar coverage', 'Electro-optical verification'],
    images: [
      {
        src: '/products/02-drone-detection/stationary-rf-detection-system.webp',
        alt: 'Stationary RF awareness unit',
        href: '/products/stationary-rf-detection-system',
      },
      {
        src: '/products/02-drone-detection/low-altitude-detection-radar.webp',
        alt: 'Low-altitude radar unit',
        href: '/products/low-altitude-detection-radar-ku-band',
      },
      {
        src: '/products/02-drone-detection/electro-optical-tracking-system.webp',
        alt: 'Electro-optical verification unit',
        href: '/products/composite-electro-optical-tracking-system',
      },
    ],
  },
  {
    title: 'Review & Coordination Module',
    points: ['Multi-source alert review', 'Visual confirmation workflow', 'Patrol and command-room coordination'],
    images: [
      {
        src: '/products/02-drone-detection/portable-rf-detection-case.webp',
        alt: 'Portable field C-UAS kit',
        href: '/products/portable-rf-detection-case',
      },
      {
        src: '/products/uav-systems/UAV-Remote-ID-Monitoring-System.webp',
        alt: 'Remote ID review equipment',
        href: '/products/uav-remote-id-monitoring-system',
      },
    ],
  },
  {
    title: 'Low-Altitude Management Platform',
    points: ['Fixed command workstation', 'Mobile operator access', 'Map, alert, and record management'],
    images: [
      {
        src: '/solutions/low-altitude-airspace-monitoring/ppt-platform-interface.webp',
        alt: 'Low-altitude management platform interface',
      },
    ],
  },
];

const deploymentModes = [
  {
    title: 'Fixed Site Coverage',
    subtitle: 'Always-on coverage for planned perimeters',
    image: '/products/02-drone-detection/stationary-rf-detection-system.webp',
    alt: 'Fixed low-altitude C-UAS equipment',
    href: '/products/stationary-rf-detection-system',
    steps: ['Plan', 'Early Warning', 'Identification', 'Positioning', 'Tracking', 'Handling'],
  },
  {
    title: 'Vehicle-Mobile Option',
    subtitle: 'Mobile coverage for temporary or changing sites',
    image: '/solutions/low-altitude-airspace-monitoring/vehicle-mobile-cuas.webp',
    alt: 'Vehicle-mobile C-UAS equipment',
    imageClass: 'deploymentVehicleImage',
    steps: ['Plan', 'Early Warning', 'Identification', 'Handling'],
  },
  {
    title: 'Portable Field Option',
    subtitle: 'Flexible support for field teams and temporary tasks',
    image: '/products/rf-systems/portable-integrated-rf-analysis-pro.webp',
    alt: 'Integrated C-UAS field kit pro',
    href: '/products/portable-integrated-detection-event-logging-pro-low-altitude-monitoring',
    steps: ['Flexible Setup', 'Quick Response'],
  },
];

const packages = [
  {
    title: 'Industrial Site Perimeter',
    meta: 'Energy, chemical, logistics, and industrial parks',
    image: '/cases/brazil-refinery-airspace-monitoring/main-home.webp',
    points: ['Perimeter and key-area awareness', 'Early warning and visual review', 'Patrol support and event records'],
  },
  {
    title: 'Public Venue & Event Site',
    meta: 'Event, stadium, transport, and controlled-site operations',
    image: '/cases/asian-games-security/main-home.webp',
    points: ['Temporary or fixed coverage plan', 'Crowd-area and perimeter awareness', 'Event-time response coordination'],
  },
  {
    title: 'Airport & Large Perimeter',
    meta: 'Wide boundary coverage and multi-source airspace awareness',
    image: '/cases/airport-security-application/main-home.webp',
    points: ['Runway, apron, and boundary review', 'Wide-area positioning and tracking', 'Visual identification and records'],
  },
];

const caseReferences = [
  {
    title: 'Asian Games Low-Altitude C-UAS Application',
    image: '/cases/asian-games-security/main.webp',
    href: '/cases/asian-games-security',
  },
  {
    title: 'C-UAS Case of a Group Factory in Nigeria',
    image: '/cases/nigeria-factory-airspace-monitoring/main.webp',
    href: '/cases/nigeria-factory-low-altitude-monitoring',
  },
  {
    title: 'C-UAS Case of a Power Plant in Pakistan',
    image: '/cases/pakistan-power-plant-airspace-monitoring/main-home.webp',
    href: '/cases/pakistan-power-plant-low-altitude-monitoring',
  },
  {
    title: 'C-UAS Case of a Refinery in Brazil',
    image: '/cases/brazil-refinery-airspace-monitoring/main-home.webp',
    href: '/cases/brazil-refinery-low-altitude-monitoring',
  },
  {
    title: 'Airport C-UAS Application',
    image: '/cases/airport-security-application/main-home.webp',
    href: '/cases/airport-security-application',
  },
  {
    title: 'Water Conservancy Facility Low-Altitude C-UAS',
    image: '/cases/water-conservancy-security/main.webp',
    href: '/cases/water-conservancy-security',
  },
];

const siteScenarios = [
  {
    title: 'Airport / Runway Protection',
    text: 'Plan RF, radar, EO, and event records around runways, aprons, boundary roads, and operation zones.',
    icon: Plane,
  },
  {
    title: 'Oil & Gas / Refinery Protection',
    text: 'Support early warning, identification, and tracking around process units, tank farms, loading areas, and logistics gates.',
    icon: Factory,
  },
  {
    title: 'Power Plant & Substation Protection',
    text: 'Support early warning, alert review, and command workflows for critical energy facilities.',
    icon: Zap,
  },
  {
    title: 'Port & Border Perimeter Coverage',
    text: 'Build wide-area awareness for docks, storage yards, border zones, and long perimeters.',
    icon: Ship,
  },
  {
    title: 'Controlled Facility / Key Area Security',
    text: 'Identify, locate, and review low-altitude activity around controlled zones and high-value facilities.',
    icon: Landmark,
  },
  {
    title: 'Stadium & Event Airspace Security',
    text: 'Support temporary or fixed C-UAS plans for venues, events, and public operations.',
    icon: Building2,
  },
];

const relatedEquipment = [
  {
    title: 'Stationary RF Identification System',
    role: 'Fixed RF early warning',
    image: '/products/02-drone-detection/stationary-rf-detection-system.webp',
    href: '/products/stationary-rf-detection-system',
    imageClass: 'equipmentImageRf',
    points: ['Fixed-site RF awareness', 'Early warning and event records'],
  },
  {
    title: 'Low-Altitude Early-Warning Radar (Ku-Band)',
    role: 'Wide-area positioning',
    image: '/products/02-drone-detection/low-altitude-detection-radar.webp',
    href: '/products/low-altitude-detection-radar-ku-band',
    imageClass: 'equipmentImageRadar',
    points: ['Wide-area low-altitude coverage', 'Positioning and tracking support'],
  },
  {
    title: 'Low-Altitude Early-Warning Radar (X-Band)',
    role: 'Extended radar option',
    image: '/products/02-drone-detection/low-altitude-detection-radar-x-band.webp',
    href: '/products/low-altitude-3d-pulse-doppler-radar',
    imageClass: 'equipmentImageRadar',
    points: ['3D target positioning support', 'Track review for larger perimeters'],
  },
  {
    title: 'Electro-Optical Tracking System',
    role: 'Visual identification',
    image: '/products/02-drone-detection/electro-optical-tracking-system.webp',
    href: '/products/composite-electro-optical-tracking-system',
    imageClass: 'equipmentImageOptical',
    points: ['Visual identification and review', 'Day and night tracking support'],
  },
  {
    title: 'UAV Remote ID Recognition System',
    role: 'Identity review',
    image: '/products/uav-systems/UAV-Remote-ID-Monitoring-System.webp',
    href: '/products/uav-remote-id-monitoring-system',
    imageClass: 'equipmentImagePortable',
    points: ['Remote ID information reading', 'Operator review and records'],
  },
  {
    title: 'Portable RF Identification System',
    role: 'Field verification',
    image: '/products/02-drone-detection/portable-rf-detection-case.webp',
    href: '/products/portable-rf-detection-case',
    imageClass: 'equipmentImagePortable',
    points: ['Portable field deployment', 'Event review and handover support'],
  },
  {
    title: 'Handheld RF Identification System',
    role: 'Mobile signal review',
    image: '/products/02-drone-detection/handheld-rf-detection-system-pl280h.webp',
    href: '/products/handheld-rf-detection-system-mini',
    imageClass: 'equipmentImageHandheld',
    points: ['Handheld signal identification', 'Flexible perimeter patrol support'],
  },
  {
    title: 'Directional RF Event Logging Unit',
    role: 'Directional RF site review',
    image: '/products/rf-systems/directional-rf-unit.webp',
    href: '/products/directional-rf-event-logging',
    imageClass: 'equipmentImageDirectional',
    points: ['Directional RF event logging', 'Positioning and response review support'],
  },
];

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildSeoMetadata({
    locale: params.locale,
    path: `/solutions/${pageHandle}`,
    fallbackTitle: `${copy(params.locale, pageTitle)} | N-TET`,
    fallbackDescription: copy(params.locale, pageDescription),
    fallbackKeywords: [
      'C-UAS systems',
      'C-UAS technology',
      'anti drone',
      'anti drone solution',
      'Drone detection and tracking',
      'drone detector',
      'drone radar',
      'UAV detection system',
      'C-UAS equipment',
      'RF detection system',
      'low-altitude detection radar',
      'electro-optical tracking system',
      'detector de drone',
      'detector de drones',
      'radar de drone',
      'radar de drones',
    ],
    image: '/products/02-drone-detection/drone-detection-home.webp',
  });
}

function Breadcrumbs({
  locale,
  homeLabel,
  solutionsLabel,
}: {
  locale: Locale;
  homeLabel: string;
  solutionsLabel: string;
}) {
  return (
    <nav className="product-breadcrumb-nav" aria-label="Breadcrumb">
      <div className="container">
        <div className="breadcrumb-path">
          <Link prefetch={false} href={localePath(locale, '/')}>{homeLabel}</Link>
          <span>&gt;</span>
          <Link prefetch={false} href={localePath(locale, '/solutions')}>{solutionsLabel}</Link>
          <span>&gt;</span>
          <span>{copy(locale, pageTitle)}</span>
        </div>
      </div>
    </nav>
  );
}

function HeroVisual({ locale }: { locale: Locale }) {
  return (
    <div className={styles.heroVisual} aria-label={copy(locale, 'C-UAS System Composition for Low-Altitude Sites')}>
      <Image
        src="/products/02-drone-detection/stationary-rf-detection-system.webp"
        alt={copy(locale, 'Stationary RF Identification System')}
        width={300}
        height={210}
        className={`${styles.deviceImage} ${styles.deviceRf}`}
        priority
      />
      <Image
        src="/products/02-drone-detection/low-altitude-detection-radar.webp"
        alt={copy(locale, 'Low-Altitude Early-Warning Radar (Ku-Band)')}
        width={360}
        height={230}
        className={`${styles.deviceImage} ${styles.deviceRadar}`}
        priority
      />
      <Image
        src="/products/02-drone-detection/electro-optical-tracking-system.webp"
        alt={copy(locale, 'Electro-Optical Tracking System')}
        width={260}
        height={220}
        className={`${styles.deviceImage} ${styles.deviceOptical}`}
        priority
      />
      <Image
        src="/products/02-drone-detection/portable-rf-detection-case.webp"
        alt={copy(locale, 'Portable RF Identification System')}
        width={290}
        height={220}
        className={`${styles.deviceImage} ${styles.devicePortable}`}
        priority
      />
    </div>
  );
}

function ScenarioEntrance({ locale }: { locale: Locale }) {
  return (
    <section className={styles.scenarioSection}>
      <div className={styles.sectionHeader}>
        <h2>{copy(locale, 'Choose by Site Type')}</h2>
        <p>{copy(locale, 'Select the operating environment closest to your site, then request a C-UAS layout and quotation.')}</p>
      </div>
      <div className={styles.scenarioGrid}>
        {siteScenarios.map((item) => {
          const Icon = item.icon;
          return (
            <article className={styles.scenarioCard} key={item.title}>
              <div className={styles.scenarioIcon}>
                <Icon size={28} strokeWidth={1.9} aria-hidden="true" />
              </div>
              <div>
                <h3>{copy(locale, item.title)}</h3>
                <p>{copy(locale, item.text)}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function SiteProblemSection({ locale }: { locale: Locale }) {
  return (
    <section className={styles.problemSection}>
      <div className={styles.problemIntro}>
        <h2>{copy(locale, 'Unauthorized Drone Events Are Increasing')}</h2>
        <p>
          {copy(locale, 'Patterns seen across controlled sites, transport areas, public buildings, utility corridors, and critical operations.')}
        </p>
      </div>
      <div className={styles.problemGrid}>
        {incidentGallery.map((item) => (
          <figure className={styles.problemCard} key={item.caption}>
            <Image
              src={item.image}
              alt={copy(locale, item.caption)}
              width={420}
              height={240}
              sizes="(max-width: 640px) 100vw, (max-width: 991px) 50vw, 25vw"
            />
            <figcaption>
              <span aria-hidden="true">&bull;</span>
              {copy(locale, item.caption)}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function SystemCompositionSection({ locale }: { locale: Locale }) {
  return (
    <section className={styles.compositionSection}>
      <div className={styles.compositionHeader}>
        <span className={styles.sectionEyebrow}>{copy(locale, 'System composition')}</span>
        <h2>{copy(locale, 'C-UAS System Composition for Low-Altitude Sites')}</h2>
        <p>
          {copy(locale, 'A practical site plan combines sensing equipment, operator review, field coordination, and platform records so the buyer can confirm coverage and quotation scope.')}
        </p>
      </div>
      <div className={styles.compositionFlow}>
        {compositionCards.map((item, index) => (
          <div className={styles.compositionNode} key={item.title}>
            <article className={styles.compositionCard}>
              <h3>{copy(locale, item.title)}</h3>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{copy(locale, point)}</li>
                ))}
              </ul>
              <div className={styles.compositionImages}>
                {item.images.map((image) => {
                  const imageElement = (
                    <Image
                      src={image.src}
                      alt={copy(locale, image.alt)}
                      width={260}
                      height={150}
                      className={styles.compositionImage}
                    />
                  );

                  if (!('href' in image)) {
                    return (
                      <div key={image.src} className={styles.compositionImageStatic}>
                        {imageElement}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={image.src}
                      prefetch={false}
                      href={localePath(locale, image.href)}
                      className={styles.compositionImageLink}
                      aria-label={`${copy(locale, 'View')} ${copy(locale, image.alt)}`}
                    >
                      {imageElement}
                    </Link>
                  );
                })}
              </div>
            </article>
            {index < compositionCards.length - 1 ? (
              <span className={styles.compositionPlus} aria-hidden="true">+</span>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function DeploymentModesSection({ locale }: { locale: Locale }) {
  return (
    <section className={styles.deploymentSection}>
      <div className={styles.deploymentHeader}>
        <span className={styles.sectionEyebrow}>{copy(locale, 'Coverage modes')}</span>
        <h2>{copy(locale, 'Fixed and Mobile Coverage Options')}</h2>
        <p>
          {copy(locale, 'Different sites can choose a fixed, vehicle-mobile, or portable setup according to perimeter size, deployment time, and operator workflow.')}
        </p>
      </div>
      <div className={styles.deploymentGrid}>
        {deploymentModes.map((item) => (
          <article className={styles.deploymentCard} key={item.title}>
            <div className={styles.deploymentTitleBar}>
              <h3>{copy(locale, item.title)}</h3>
              <p>{copy(locale, item.subtitle)}</p>
            </div>
            <div className={styles.deploymentImageWrap}>
              {'href' in item ? (
                <Link
                  prefetch={false}
                  href={localePath(locale, item.href)}
                  className={styles.deploymentImageLink}
                  aria-label={`${copy(locale, 'View')} ${copy(locale, item.alt)}`}
                >
                  <Image
                    src={item.image}
                    alt={copy(locale, item.alt)}
                    width={360}
                    height={220}
                    className={styles.deploymentImage}
                  />
                </Link>
              ) : (
                <div className={styles.deploymentImageStatic}>
                  <Image
                    src={item.image}
                    alt={copy(locale, item.alt)}
                    width={624}
                    height={416}
                    className={`${styles.deploymentImage} ${styles[item.imageClass]}`}
                  />
                </div>
              )}
            </div>
            <div className={styles.deploymentSteps}>
              {item.steps.map((step) => (
                <span key={step}>{copy(locale, step)}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DesktopLanding({ locale, dict }: { locale: Locale; dict: any }) {
  return (
    <main className={`${styles.page} ${styles.desktopPage}`}>
      <Breadcrumbs locale={locale} homeLabel={dict.nav.home} solutionsLabel={dict.nav.solutions} />

      <section className={styles.heroSection}>
        <div className={styles.heroCopy}>
          <span className={styles.heroEyebrow}>{copy(locale, 'C-UAS Site Security Plan')}</span>
          <h1>
            <span className={styles.titleLine}>{copy(locale, 'Low-Altitude Airspace')}</span>
            <span className={styles.titleLine}>{copy(locale, 'Security for Critical Sites')}</span>
          </h1>
          <p>
            {copy(locale, 'For airports, refineries, power plants, ports, venues, and large perimeters. N-TET helps plan a C-UAS setup from real site conditions: sensing equipment, operator review, platform records, and fixed, vehicle-mobile, or portable deployment options.')}
          </p>
          <ul className={styles.heroPoints}>
            {heroPoints.map((item) => (
              <li key={item}>
                <CheckCircle2 size={16} aria-hidden="true" />
                {copy(locale, item)}
              </li>
            ))}
          </ul>
          <div className={styles.heroActions}>
            <Link prefetch={false} href="#inquiry" className={styles.primaryCta}>
              {copy(locale, 'Get Site Layout & Quote')}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <WhatsAppLeadButton sourceLabel="low_altitude_landing_hero_whatsapp" className={`${styles.secondaryCta} ${styles.whatsappCta}`}>
              {copy(locale, 'WhatsApp Chat')}
            </WhatsAppLeadButton>
          </div>
        </div>
        <HeroVisual locale={locale} />
      </section>

      <SiteProblemSection locale={locale} />

      <SystemCompositionSection locale={locale} />

      <DeploymentModesSection locale={locale} />

      <ScenarioEntrance locale={locale} />

      <section id="equipment" className={styles.layerSection}>
        <div className={styles.sectionHeader}>
          <h2>{copy(locale, 'C-UAS Planning and Review Steps')}</h2>
          <p>{copy(locale, 'Start with the site layout, then connect early warning, identification, positioning, tracking, response review, and event records into one operating process.')}</p>
        </div>
        <div className={styles.layerGrid}>
          {systemLayers.map((item) => {
            const Icon = item.icon;
            return (
              <article className={styles.layerCard} key={item.title}>
                <div className={styles.layerIcon}>
                  <Icon size={52} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h3>{copy(locale, item.title)}</h3>
                <p>{copy(locale, item.text)}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.equipmentSection}>
        <div className={styles.sectionHeader}>
          <h2>{copy(locale, 'C-UAS Equipment Options')}</h2>
          <p>{copy(locale, 'Select RF, radar, EO, Remote ID, fixed-site, mobile, or portable equipment according to perimeter size, coverage range, review workflow, and record requirements.')}</p>
        </div>
        <div className={styles.equipmentGrid}>
          {relatedEquipment.map((item) => (
            <Link prefetch={false} href={localePath(locale, item.href)} className={styles.equipmentCard} key={item.title}>
              <div className={styles.equipmentImageWrap}>
                <Image
                  src={item.image}
                  alt={copy(locale, item.title)}
                  width={280}
                  height={180}
                  className={`${styles.equipmentImage} ${styles[item.imageClass]}`}
                />
              </div>
              <div className={styles.equipmentBody}>
                <span>{copy(locale, item.role)}</span>
                <h3>{copy(locale, item.title)}</h3>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{copy(locale, point)}</li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.packageSection}>
        <div className={styles.sectionHeader}>
          <h2>{copy(locale, 'C-UAS Scenarios by Site Type')}</h2>
          <p>{copy(locale, 'Choose the closest site type first. N-TET can then match fixed, vehicle-mobile, or portable equipment to the perimeter, coverage range, review workflow, and quotation needs.')}</p>
        </div>
        <div className={styles.packageGrid}>
          {packages.map((item) => (
            <article className={styles.packageCard} key={item.title}>
              <Image src={item.image} alt="" width={420} height={230} className={styles.packageImage} />
              <h3>{copy(locale, item.title)}</h3>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>
                    <CheckCircle2 size={15} aria-hidden="true" />
                    {copy(locale, point)}
                  </li>
                ))}
              </ul>
              <Link prefetch={false} href="#inquiry" className={styles.learnMore}>
                {copy(locale, 'Request Layout')}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
        <div className={styles.caseSectionHeader}>
          <h3>{copy(locale, 'Project Case References')}</h3>
        </div>
        <div className={styles.caseReferenceGrid}>
          {caseReferences.map((item) => (
            <Link prefetch={false} href={localePath(locale, item.href)} className={styles.caseReferenceCard} key={item.href}>
              <div className={styles.caseReferenceImageBox}>
                <Image src={item.image} alt={copy(locale, item.title)} fill sizes="(max-width: 1200px) 33vw, 400px" className={styles.caseReferenceImage} />
              </div>
              <div className={styles.caseReferenceBody}>
                <h4>{copy(locale, item.title)}</h4>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="inquiry" className={styles.inquirySection}>
        <InquiryForm dict={dict} />
      </section>
    </main>
  );
}

function MobileLanding({ locale, dict }: { locale: Locale; dict: any }) {
  return (
    <main className={`${styles.page} ${styles.mobilePage}`}>
      <Breadcrumbs locale={locale} homeLabel={dict.nav.home} solutionsLabel={dict.nav.solutions} />

      <section className={styles.mobileHero}>
        <h1>
          <span className={styles.nowrap}>{copy(locale, 'Low-Altitude')}</span>
          <span className={styles.mobileTitleLine}>{copy(locale, 'Airspace Security')}</span>
          <span className={styles.mobileTitleLine}>C-UAS</span>
        </h1>
        <p>{copy(locale, 'C-UAS site planning for fixed, vehicle-mobile, or portable coverage, with early warning, identification, positioning, tracking, handling, records, and quotation support.')}</p>
        <ul className={styles.heroPoints}>
          {heroPoints.slice(0, 3).map((item) => (
            <li key={item}>
              <CheckCircle2 size={15} aria-hidden="true" />
              {copy(locale, item)}
            </li>
          ))}
        </ul>
        <HeroVisual locale={locale} />
        <div className={styles.mobileActions}>
          <Link prefetch={false} href="#mobile-inquiry" className={styles.primaryCta}>
            {copy(locale, 'Get Site Layout & Quote')}
          </Link>
          <WhatsAppLeadButton sourceLabel="low_altitude_mobile_hero_whatsapp" className={`${styles.secondaryCta} ${styles.whatsappCta}`}>
            {copy(locale, 'WhatsApp Chat')}
          </WhatsAppLeadButton>
        </div>
      </section>

      <SiteProblemSection locale={locale} />

      <SystemCompositionSection locale={locale} />

      <DeploymentModesSection locale={locale} />

      <ScenarioEntrance locale={locale} />

      <section id="mobile-equipment" className={styles.mobileBlock}>
        <div className={styles.mobileSectionTitle}>
          <span>{copy(locale, 'Workflow')}</span>
          <h2>{copy(locale, 'C-UAS Planning and Review Steps')}</h2>
        </div>
        <div className={styles.mobileLayerGrid}>
          {systemLayers.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className={styles.mobileLayerCard}>
                <Icon size={34} strokeWidth={1.9} aria-hidden="true" />
                <h3>{copy(locale, item.title)}</h3>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.mobileBlock}>
        <div className={styles.mobileSectionTitle}>
          <h2>{copy(locale, 'C-UAS Equipment Options')}</h2>
        </div>
        <div className={styles.mobileEquipmentGrid}>
          {relatedEquipment.map((item) => (
            <Link prefetch={false} href={localePath(locale, item.href)} className={styles.mobileEquipmentCard} key={item.title}>
              <Image
                src={item.image}
                alt={copy(locale, item.title)}
                width={180}
                height={120}
                className={`${styles.mobileEquipmentImage} ${styles[item.imageClass]}`}
              />
              <h3>{copy(locale, item.title)}</h3>
              <p>{copy(locale, item.role)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className={`${styles.mobileBlock} ${styles.mobileOperationsBlock}`}>
        <div className={styles.mobileSectionTitle}>
          <span>{copy(locale, 'Site Scenarios')}</span>
          <h2>{copy(locale, 'C-UAS Scenarios by Site Type')}</h2>
        </div>
        <div className={styles.mobilePackages}>
          {packages.map((item) => (
            <article key={item.title} className={styles.mobilePackageCard}>
              <Image src={item.image} alt={copy(locale, item.title)} width={420} height={205} className={styles.mobilePackageImage} />
              <h3>{copy(locale, item.title)}</h3>
              <p>{copy(locale, item.meta)}</p>
              <ul>
                {item.points.slice(0, 3).map((point) => (
                  <li key={point}>{copy(locale, point)}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className={styles.mobileCaseSectionTitle}>
          <h3>{copy(locale, 'Project Case References')}</h3>
        </div>
        <div className={styles.mobileCaseReferences}>
          {caseReferences.map((item) => (
            <Link prefetch={false} href={localePath(locale, item.href)} className={styles.mobileCaseCard} key={item.href}>
              <div className={styles.mobileCaseImageBox}>
                <Image src={item.image} alt={copy(locale, item.title)} fill sizes="50vw" className={styles.mobileCaseImage} />
              </div>
              <div className={styles.mobileCaseBody}>
                <h3>{copy(locale, item.title)}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="mobile-inquiry" className={styles.mobileInquirySection}>
        <MobileInquiryForm dict={dict} />
      </section>
    </main>
  );
}

export default async function LowAltitudeAirspaceMonitoringPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const dict = await getDictionary(locale);
  const breadcrumbs = [
    { name: dict.nav.home || 'Home', url: pageUrl(locale, '/') },
    { name: dict.nav.solutions || 'Solutions', url: pageUrl(locale, '/solutions') },
    { name: pageTitle, url: pageUrl(locale, `/solutions/${pageHandle}`) },
  ];
  const pageAbsoluteUrl = pageUrl(locale, `/solutions/${pageHandle}`);
  const jsonLdGraph = [
    {
      '@type': 'Service',
      '@id': `${pageAbsoluteUrl}#service`,
      name: pageTitle,
      description: pageDescription,
      serviceType: 'low-altitude airspace security and C-UAS',
      provider: {
        '@type': 'Organization',
        name: 'N-TET',
        url: pageUrl(locale, '/'),
      },
      areaServed: 'Global',
      url: pageAbsoluteUrl,
      mainEntityOfPage: pageAbsoluteUrl,
    },
    breadcrumbSchema(breadcrumbs),
  ];

  return (
    <>
      <OpenLinksInNewTab />
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': jsonLdGraph }} />
      <style dangerouslySetInnerHTML={{ __html: `
        .mobile_only { display: none !important; }
        .pc_only { display: block !important; }
        @media (max-width: 991px) {
          .mobile_only { display: block !important; }
          .pc_only { display: none !important; }
        }
      `}} />
      <div className="pc_only">
        <DesktopLanding locale={locale} dict={dict} />
      </div>
      <div className="mobile_only">
        <MobileLanding locale={locale} dict={dict} />
      </div>
    </>
  );
}
