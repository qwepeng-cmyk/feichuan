import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  RadioTower,
  Route,
  ScanSearch,
  Target,
} from 'lucide-react';
import PrimaryContactButton from '@/components/contact/PrimaryContactButton';
import PerformanceConditionsNote from '@/components/common/PerformanceConditionsNote';
import JsonLd from '@/components/seo/JsonLd';
import { getDictionary } from '@/i18n/getDictionary';
import { type Locale } from '@/i18n/config';
import { localePath } from '@/lib/localePath';
import { buildSeoMetadata } from '@/lib/seoMetadata';
import { breadcrumbSchema, pageUrl } from '@/lib/structuredData';
import DeferredInquiryForm from './DeferredInquiryForm';
import styles from './LowAltitudeAirspaceMonitoring.module.css';
import ruOperationalCopy from '@/dictionaries/low-altitude-airspace-monitoring/ru.json';
import { sanitizePublicCopy } from '@/lib/publicCopy';

const pageHandle = 'low-altitude-airspace-monitoring';
const pageTitle = 'Low-Altitude Airspace Security & Low-Altitude Defense';
const pageDescription =
  'Low-Altitude Defense, low-altitude defense, anti platform, and platform detection site planning for airports, refineries, power plants, ports, venues, and large perimeters, covering early warning, identification, positioning, tracking, response review, records, and quotation support.';

const localizedStrings: Partial<Record<string, Record<string, string>>> = {
  ru: {
    ...ruOperationalCopy,
    'Low-Altitude Airspace Security & Low-Altitude Defense': 'Безопасность низковысотного воздушного пространства и Low-Altitude Defense',
    'Low-Altitude Defense and anti platform site planning for airports, refineries, power plants, ports, venues, and large perimeters, covering early warning, identification, positioning, tracking, handling, records, and quotation support.':
      'Планирование Low-Altitude Defense и anti-platform решений для аэропортов, НПЗ, электростанций, портов, площадок мероприятий и крупных периметров: раннее предупреждение, идентификация, позиционирование, сопровождение, обработка событий, записи и подготовка предложения.',
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
    'Public-building platform sighting': 'Обнаружение низковысотной цели у общественного здания',
    'Site Plan': 'План площадки',
    'Define perimeter zones, key areas, operator roles, alert contacts, and a practical Low-Altitude Defense layout before equipment selection.':
      'Определите зоны периметра, ключевые участки, роли операторов, контакты оповещения и практичную схему Low-Altitude Defense до выбора оборудования.',
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
    'Support temporary or fixed Low-Altitude Defense plans for venues, events, and public operations.':
      'Поддерживайте временные или стационарные планы Low-Altitude Defense для площадок, мероприятий и общественных операций.',
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
    'Aerial Platform Remote ID Recognition System': 'Система распознавания Aerial Platform Remote ID',
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
    'Directional RF Low-Altitude Defense Site Unit': 'Направленный RF-модуль Low-Altitude Defense для объекта',
    'Directional RF site unit': 'Направленный RF-модуль объекта',
    'Directional RF event logging': 'Регистрация направленных RF-событий',
    'Supports positioning and response review': 'Поддерживает позиционирование и проверку реагирования',
    'Unauthorized Platform Events Are Increasing': 'Количество несанкционированных событий с низковысотными целями растет',
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
    'Low-Altitude Defense Site Security Plan': 'План безопасности объекта Low-Altitude Defense',
    'Low-Altitude Airspace': 'Низковысотное воздушное пространство',
    'Low-Altitude': 'Низкие высоты',
    'Security for Critical Sites': 'Безопасность критичных объектов',
    'Low-Altitude Defense site planning for fixed, vehicle-mobile, or portable coverage, with early warning, identification, positioning, tracking, handling, records, and quotation support.':
      'Планирование Low-Altitude Defense для стационарного, мобильного на автомобиле или переносного покрытия: раннее предупреждение, идентификация, позиционирование, сопровождение, обработка, записи и поддержка предложения.',
    'For airports, refineries, power plants, ports, venues, and large perimeters. N-TET helps plan a Low-Altitude Defense setup from real site conditions: sensing equipment, operator review, platform records, and fixed, vehicle-mobile, or portable deployment options.':
      'Для аэропортов, НПЗ, электростанций, портов, площадок мероприятий и крупных периметров. N-TET помогает спланировать Low-Altitude Defense по реальным условиям объекта: сенсорное оборудование, проверка оператором, записи платформы и стационарные, мобильные на автомобиле или переносные варианты развертывания.',
    'Get Site Layout & Quote': 'Получить схему объекта и предложение',
    'Get Datasheet & Pricing on WhatsApp': 'Получить спецификацию и цены в VK',
    'Adapted from fixed and mobile operation patterns: plan the site, raise early warning, identify, position, track, coordinate response, and keep reviewable records.':
      'Основано на стационарных и мобильных схемах работы: спланировать объект, поднять раннее предупреждение, идентифицировать, позиционировать, сопровождать, координировать реагирование и сохранять проверяемые записи.',
    'Low-Altitude Defense Equipment for Site Plans': 'Оборудование Low-Altitude Defense для планов объектов',
    'Choose fixed, mobile, radar, RF, EO, and Remote ID equipment according to the site plan, early warning, identification, positioning, tracking, response, and record requirements.':
      'Выбирайте стационарное, мобильное, радарное, RF, EO и Remote ID оборудование по требованиям схемы объекта, раннего предупреждения, идентификации, позиционирования, сопровождения, реагирования и записей.',
    'Low-Altitude Site Operations': 'Операции на низковысотных объектах',
    'Use these examples to plan low-altitude awareness, perimeter security, response coordination, and reviewable records for different operating sites.':
      'Используйте эти примеры для планирования низковысотного контроля, безопасности периметра, координации реагирования и проверяемых записей для разных объектов.',
    'Low-Altitude Defense Scenarios by Site Type': 'Сценарии Low-Altitude Defense по типу объекта',
    'Choose the closest site type first. N-TET can then match fixed, vehicle-mobile, or portable equipment to the perimeter, coverage range, review workflow, and quotation needs.':
      'Сначала выберите наиболее близкий тип объекта. Затем N-TET подберет стационарное, мобильное на автомобиле или переносное оборудование под периметр, дальность покрытия, процесс проверки и требования к предложению.',
    'Use these site scenarios to match sensing coverage, review workflow, and approved response options for critical low-altitude security operations.':
      'Используйте эти сценарии объектов, чтобы сопоставить сенсорное покрытие, процесс проверки и разрешенные варианты реагирования для критически важных операций безопасности на малых высотах.',
    'Site Scenarios': 'Сценарии объектов',
    'Project Case References': 'Референсные проекты',
    'Industrial & Energy Sites': 'Промышленные и энергетические объекты',
    'Energy, chemical, logistics, and industrial parks': 'Энергетика, химия, логистика и промышленные парки',
    'Coverage sites: nuclear power plants, substations, energy storage sites, oil and gas pipelines, chemical parks':
      'Объекты покрытия: АЭС, подстанции, объекты хранения энергии, нефтегазовые трубопроводы, химические парки',
    'Wide-area low-altitude detection': 'Широкозонное обнаружение на малых высотах',
    'Early warning and threat-level review': 'Раннее предупреждение и оценка уровня угрозы',
    'Authorized response coordination': 'Координация разрешенного реагирования',
    '24/7 automated site watch': 'Автоматическое наблюдение за объектом 24/7',
    'Discuss Site Setup': 'Обсудить конфигурацию объекта',
    'Event, stadium, transport, and controlled-site operations': 'Мероприятия, стадионы, транспорт и контролируемые площадки',
    'Coverage sites: multi-city games, stadiums, media centers, transport hubs, and major public events':
      'Объекты покрытия: игры в нескольких городах, стадионы, медиацентры, транспортные узлы и крупные общественные мероприятия',
    'Multi-city coordinated coverage': 'Координированное покрытие нескольких городов',
    'Multi-type event protection': 'Защита мероприятий разных типов',
    'Flexible fixed, portable, and vehicle-mobile deployment': 'Гибкое стационарное, переносное и автомобильное развертывание',
    'Post-event reuse for recurring major activities': 'Повторное использование после события для регулярных крупных мероприятий',
    'Wide boundary coverage and layered airspace awareness': 'Широкое покрытие границ и многоуровневый контроль воздушного пространства',
    'Airport Airspace Security': 'Безопасность воздушного пространства аэропорта',
    'Application rollout: routine airport airspace security for multiple airport sites':
      'Тиражирование: регулярная безопасность воздушного пространства для нескольких аэропортовых объектов',
    'Remote ID monitoring and whitelist review': 'Мониторинг Remote ID и проверка белого списка',
    '20 MHz-6 GHz RF detection matrix': 'Матрица RF-обнаружения 20 МГц-6 ГГц',
    'Radar, RF, and EO data fusion platform': 'Платформа слияния данных радара, RF и EO',
    'Fixed and portable response with airport EMC design': 'Стационарное и переносное реагирование с EMC-дизайном для аэропорта',
    'Asian Games Low-Altitude Low-Altitude Defense Application': 'Применение Low-Altitude Defense низких высот на Азиатских играх',
    'Low-Altitude Defense Case of a Group Factory in Nigeria': 'Кейс Low-Altitude Defense для группового завода в Нигерии',
    'Low-Altitude Defense Case of a Power Plant in Pakistan': 'Кейс Low-Altitude Defense для электростанции в Пакистане',
    'Low-Altitude Defense Case of a Refinery in Brazil': 'Кейс Low-Altitude Defense для НПЗ в Бразилии',
    'Airport Low-Altitude Defense Application': 'Применение Low-Altitude Defense в аэропорту',
    'Water Conservancy Facility Low-Altitude Low-Altitude Defense': 'Low-Altitude Defense низких высот для водохозяйственного объекта',
    'Learn More': 'Подробнее',
    'Airspace Security': 'Безопасность воздушного пространства',
    'Low-Altitude Defense Equipment Options': 'Варианты оборудования Low-Altitude Defense',
    'Site Operations': 'Операции на объекте',
    'View': 'Открыть',
  },
  es: {
    'Low-Altitude Airspace Security & Low-Altitude Defense': 'Seguridad del espacio aéreo de baja altitud y Low-Altitude Defense',
    'Low-Altitude Defense and anti platform site planning for airports, refineries, power plants, ports, venues, and large perimeters, covering early warning, identification, positioning, tracking, handling, records, and quotation support.':
      'Planificación Low-Altitude Defense y anti platform para aeropuertos, refinerías, plantas eléctricas, puertos, recintos y grandes perímetros, con alerta temprana, identificación, posicionamiento, seguimiento, gestión, registros y soporte de cotización.',
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
    'Public-building platform sighting': 'Avistamiento de platform junto a edificio público',
    'Site Plan': 'Plan del sitio',
    'Define perimeter zones, key areas, operator roles, alert contacts, and a practical Low-Altitude Defense layout before equipment selection.':
      'Defina zonas de perímetro, áreas clave, roles de operador, contactos de alerta y un diseño Low-Altitude Defense práctico antes de seleccionar equipos.',
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
    'Support temporary or fixed Low-Altitude Defense plans for venues, events, and public operations.':
      'Apoye planes Low-Altitude Defense temporales o fijos para recintos, eventos y operaciones públicas.',
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
    'Aerial Platform Remote ID Recognition System': 'Sistema de reconocimiento Aerial Platform Remote ID',
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
    'Directional RF Low-Altitude Defense Site Unit': 'Unidad RF direccional Low-Altitude Defense para sitio',
    'Directional RF site unit': 'Unidad RF direccional del sitio',
    'Directional RF event logging': 'Registro de eventos RF direccionales',
    'Supports positioning and response review': 'Soporta posicionamiento y revisión de respuesta',
    'Unauthorized Platform Events Are Increasing': 'Los eventos no autorizados con platforms están aumentando',
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
    'Low-Altitude Defense Site Security Plan': 'Plan de seguridad Low-Altitude Defense del sitio',
    'Low-Altitude Airspace': 'Espacio aéreo de baja altitud',
    'Low-Altitude': 'Baja altitud',
    'Security for Critical Sites': 'Seguridad para sitios críticos',
    'Low-Altitude Defense site planning for fixed, vehicle-mobile, or portable coverage, with early warning, identification, positioning, tracking, handling, records, and quotation support.':
      'Planificación Low-Altitude Defense para cobertura fija, móvil en vehículo o portátil, con alerta temprana, identificación, posicionamiento, seguimiento, gestión, registros y soporte de cotización.',
    'For airports, refineries, power plants, ports, venues, and large perimeters. N-TET helps plan a Low-Altitude Defense setup from real site conditions: sensing equipment, operator review, platform records, and fixed, vehicle-mobile, or portable deployment options.':
      'Para aeropuertos, refinerías, plantas eléctricas, puertos, recintos y grandes perímetros. N-TET ayuda a planificar una configuración Low-Altitude Defense desde condiciones reales del sitio: equipos de sensado, revisión del operador, registros de plataforma y opciones fijas, móviles en vehículo o portátiles.',
    'Get Site Layout & Quote': 'Solicitar diseño del sitio y cotización',
    'Get Datasheet & Pricing on WhatsApp': 'Ficha técnica y precios por WhatsApp',
    'Adapted from fixed and mobile operation patterns: plan the site, raise early warning, identify, position, track, coordinate response, and keep reviewable records.':
      'Adaptado a patrones de operación fija y móvil: planificar el sitio, activar alerta temprana, identificar, posicionar, seguir, coordinar respuesta y conservar registros revisables.',
    'Low-Altitude Defense Equipment for Site Plans': 'Equipos Low-Altitude Defense para planes de sitio',
    'Choose fixed, mobile, radar, RF, EO, and Remote ID equipment according to the site plan, early warning, identification, positioning, tracking, response, and record requirements.':
      'Elija equipos fijos, móviles, radar, RF, EO y Remote ID según el plan del sitio y los requisitos de alerta temprana, identificación, posicionamiento, seguimiento, respuesta y registros.',
    'Low-Altitude Site Operations': 'Operaciones de sitio de baja altitud',
    'Use these examples to plan low-altitude awareness, perimeter security, response coordination, and reviewable records for different operating sites.':
      'Use estos ejemplos para planificar conciencia de baja altitud, seguridad perimetral, coordinación de respuesta y registros revisables para distintos sitios.',
    'Low-Altitude Defense Scenarios by Site Type': 'Escenarios Low-Altitude Defense por tipo de sitio',
    'Choose the closest site type first. N-TET can then match fixed, vehicle-mobile, or portable equipment to the perimeter, coverage range, review workflow, and quotation needs.':
      'Elija primero el tipo de sitio más cercano. N-TET puede ajustar equipos fijos, móviles en vehículo o portátiles al perímetro, rango de cobertura, flujo de revisión y necesidades de cotización.',
    'Use these site scenarios to match sensing coverage, review workflow, and approved response options for critical low-altitude security operations.':
      'Use estos escenarios de sitio para ajustar la cobertura de detección, el flujo de revisión y las opciones de respuesta aprobadas para operaciones críticas de seguridad de baja altitud.',
    'Site Scenarios': 'Escenarios de sitio',
    'Project Case References': 'Referencias de proyectos',
    'Industrial & Energy Sites': 'Sitios industriales y energéticos',
    'Energy, chemical, logistics, and industrial parks': 'Energía, química, logística y parques industriales',
    'Coverage sites: nuclear power plants, substations, energy storage sites, oil and gas pipelines, chemical parks':
      'Sitios cubiertos: centrales nucleares, subestaciones, sitios de almacenamiento de energía, oleoductos y gasoductos, parques químicos',
    'Wide-area low-altitude detection': 'Detección de baja altitud en área amplia',
    'Early warning and threat-level review': 'Alerta temprana y revisión del nivel de amenaza',
    'Authorized response coordination': 'Coordinación de respuesta autorizada',
    '24/7 automated site watch': 'Vigilancia automatizada del sitio 24/7',
    'Discuss Site Setup': 'Comentar configuración del sitio',
    'Event, stadium, transport, and controlled-site operations': 'Eventos, estadios, transporte y operaciones en sitios controlados',
    'Coverage sites: multi-city games, stadiums, media centers, transport hubs, and major public events':
      'Sitios cubiertos: juegos multiciudad, estadios, centros de medios, nodos de transporte y grandes eventos públicos',
    'Multi-city coordinated coverage': 'Cobertura coordinada en varias ciudades',
    'Multi-type event protection': 'Protección para eventos de varios tipos',
    'Flexible fixed, portable, and vehicle-mobile deployment': 'Despliegue flexible fijo, portátil y móvil en vehículo',
    'Post-event reuse for recurring major activities': 'Reutilización posterior al evento para actividades importantes recurrentes',
    'Wide boundary coverage and layered airspace awareness': 'Cobertura de límites amplios y conciencia aérea por capas',
    'Airport Airspace Security': 'Seguridad del espacio aéreo aeroportuario',
    'Application rollout: routine airport airspace security for multiple airport sites':
      'Despliegue replicado: seguridad rutinaria del espacio aéreo aeroportuario para varios sitios aeroportuarios',
    'Remote ID monitoring and whitelist review': 'Monitoreo Remote ID y revisión de lista blanca',
    '20 MHz-6 GHz RF detection matrix': 'Matriz de detección RF de 20 MHz-6 GHz',
    'Radar, RF, and EO data fusion platform': 'Plataforma de fusión de datos de radar, RF y EO',
    'Fixed and portable response with airport EMC design': 'Respuesta fija y portátil con diseño EMC para aeropuerto',
    'Asian Games Low-Altitude Low-Altitude Defense Application': 'Aplicación Low-Altitude Defense de baja altitud en los Juegos Asiáticos',
    'Low-Altitude Defense Case of a Group Factory in Nigeria': 'Caso Low-Altitude Defense de una fábrica de grupo en Nigeria',
    'Low-Altitude Defense Case of a Power Plant in Pakistan': 'Caso Low-Altitude Defense de una planta eléctrica en Pakistán',
    'Low-Altitude Defense Case of a Refinery in Brazil': 'Caso Low-Altitude Defense de una refinería en Brasil',
    'Airport Low-Altitude Defense Application': 'Aplicación Low-Altitude Defense en aeropuerto',
    'Water Conservancy Facility Low-Altitude Low-Altitude Defense': 'Low-Altitude Defense de baja altitud para instalación hidráulica',
    'Learn More': 'Más información',
    'Airspace Security': 'Seguridad aérea',
    'Low-Altitude Defense Equipment Options': 'Opciones de equipos Low-Altitude Defense',
    'Site Operations': 'Operaciones del sitio',
    'View': 'Ver',
  },
  ar: {
    'Low-Altitude Airspace Security & Low-Altitude Defense': 'أمن المجال الجوي منخفض الارتفاع و Low-Altitude Defense',
    'Low-Altitude Defense and anti platform site planning for airports, refineries, power plants, ports, venues, and large perimeters, covering early warning, identification, positioning, tracking, handling, records, and quotation support.':
      'تخطيط مواقع Low-Altitude Defense ومكافحة الطائرات بدون طيار للمطارات والمصافي ومحطات الطاقة والموانئ والمرافق والحدود الواسعة، مع الإنذار المبكر والتعريف وتحديد الموقع والتتبع والمعالجة والسجلات ودعم عروض الأسعار.',
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
    'Public-building platform sighting': 'رصد طائرة بدون طيار قرب مبنى عام',
    'Site Plan': 'خطة الموقع',
    'Define perimeter zones, key areas, operator roles, alert contacts, and a practical Low-Altitude Defense layout before equipment selection.':
      'حدد مناطق المحيط والمناطق الرئيسية وأدوار المشغلين وجهات اتصال التنبيه ومخطط Low-Altitude Defense عملي قبل اختيار المعدات.',
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
    'Support temporary or fixed Low-Altitude Defense plans for venues, events, and public operations.':
      'ادعم خطط Low-Altitude Defense مؤقتة أو ثابتة للمرافق والفعاليات والعمليات العامة.',
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
    'Aerial Platform Remote ID Recognition System': 'نظام تعرف Aerial Platform Remote ID',
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
    'Directional RF Low-Altitude Defense Site Unit': 'وحدة RF اتجاهية Low-Altitude Defense للموقع',
    'Directional RF site unit': 'وحدة RF اتجاهية للموقع',
    'Directional RF event logging': 'تسجيل أحداث RF اتجاهية',
    'Supports positioning and response review': 'يدعم تحديد الموقع ومراجعة الاستجابة',
    'Unauthorized Platform Events Are Increasing': 'أحداث الطائرات بدون طيار غير المصرح بها في ازدياد',
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
    'Low-Altitude Defense Site Security Plan': 'خطة أمن موقع Low-Altitude Defense',
    'Low-Altitude Airspace': 'المجال الجوي منخفض الارتفاع',
    'Low-Altitude': 'منخفض الارتفاع',
    'Security for Critical Sites': 'أمن المواقع الحرجة',
    'Low-Altitude Defense site planning for fixed, vehicle-mobile, or portable coverage, with early warning, identification, positioning, tracking, handling, records, and quotation support.':
      'تخطيط موقع Low-Altitude Defense للتغطية الثابتة أو المتنقلة بالمركبة أو المحمولة، مع الإنذار المبكر والتعريف وتحديد الموقع والتتبع والمعالجة والسجلات ودعم عروض الأسعار.',
    'For airports, refineries, power plants, ports, venues, and large perimeters. N-TET helps plan a Low-Altitude Defense setup from real site conditions: sensing equipment, operator review, platform records, and fixed, vehicle-mobile, or portable deployment options.':
      'للمطارات والمصافي ومحطات الطاقة والموانئ والمرافق والمحيطات الواسعة. تساعد N-TET في تخطيط إعداد Low-Altitude Defense من ظروف الموقع الفعلية: معدات الاستشعار، مراجعة المشغل، سجلات المنصة، وخيارات النشر الثابتة أو المتنقلة بالمركبة أو المحمولة.',
    'Get Site Layout & Quote': 'اطلب مخطط الموقع وعرض السعر',
    'Get Datasheet & Pricing on WhatsApp': 'المواصفات والأسعار عبر WhatsApp',
    'Adapted from fixed and mobile operation patterns: plan the site, raise early warning, identify, position, track, coordinate response, and keep reviewable records.':
      'مقتبس من أنماط التشغيل الثابتة والمتحركة: تخطيط الموقع، إطلاق الإنذار المبكر، التعريف، تحديد الموقع، التتبع، تنسيق الاستجابة، والاحتفاظ بسجلات قابلة للمراجعة.',
    'Low-Altitude Defense Equipment for Site Plans': 'معدات Low-Altitude Defense لخطط المواقع',
    'Choose fixed, mobile, radar, RF, EO, and Remote ID equipment according to the site plan, early warning, identification, positioning, tracking, response, and record requirements.':
      'اختر المعدات الثابتة والمتحركة والرادار و RF و EO و Remote ID حسب خطة الموقع ومتطلبات الإنذار المبكر والتعريف وتحديد الموقع والتتبع والاستجابة والسجلات.',
    'Low-Altitude Site Operations': 'عمليات المواقع منخفضة الارتفاع',
    'Use these examples to plan low-altitude awareness, perimeter security, response coordination, and reviewable records for different operating sites.':
      'استخدم هذه الأمثلة لتخطيط الوعي منخفض الارتفاع وأمن المحيط وتنسيق الاستجابة والسجلات القابلة للمراجعة لمواقع تشغيل مختلفة.',
    'Low-Altitude Defense Scenarios by Site Type': 'سيناريوهات Low-Altitude Defense حسب نوع الموقع',
    'Choose the closest site type first. N-TET can then match fixed, vehicle-mobile, or portable equipment to the perimeter, coverage range, review workflow, and quotation needs.':
      'اختر أولا نوع الموقع الأقرب. بعدها يمكن لـ N-TET مطابقة المعدات الثابتة أو المتنقلة بالمركبة أو المحمولة مع المحيط ونطاق التغطية وسير المراجعة واحتياجات عرض السعر.',
    'Use these site scenarios to match sensing coverage, review workflow, and approved response options for critical low-altitude security operations.':
      'استخدم سيناريوهات المواقع هذه لمطابقة تغطية الاستشعار وسير المراجعة وخيارات الاستجابة المعتمدة لعمليات الأمن الحرجة منخفضة الارتفاع.',
    'Site Scenarios': 'سيناريوهات الموقع',
    'Project Case References': 'مراجع مشاريع',
    'Industrial & Energy Sites': 'المواقع الصناعية ومواقع الطاقة',
    'Energy, chemical, logistics, and industrial parks': 'الطاقة والكيميائيات واللوجستيات والمناطق الصناعية',
    'Coverage sites: nuclear power plants, substations, energy storage sites, oil and gas pipelines, chemical parks':
      'مواقع التغطية: محطات الطاقة النووية، المحطات الفرعية، مواقع تخزين الطاقة، خطوط النفط والغاز، المجمعات الكيميائية',
    'Wide-area low-altitude detection': 'كشف واسع النطاق على الارتفاعات المنخفضة',
    'Early warning and threat-level review': 'إنذار مبكر ومراجعة مستوى التهديد',
    'Authorized response coordination': 'تنسيق الاستجابة المعتمدة',
    '24/7 automated site watch': 'مراقبة آلية للموقع على مدار 24/7',
    'Discuss Site Setup': 'مناقشة إعداد الموقع',
    'Event, stadium, transport, and controlled-site operations': 'الفعاليات والملاعب والنقل وعمليات المواقع الخاضعة للسيطرة',
    'Coverage sites: multi-city games, stadiums, media centers, transport hubs, and major public events':
      'مواقع التغطية: ألعاب متعددة المدن، الملاعب، المراكز الإعلامية، مراكز النقل، والفعاليات العامة الكبرى',
    'Multi-city coordinated coverage': 'تغطية منسقة متعددة المدن',
    'Multi-type event protection': 'حماية للفعاليات متعددة الأنواع',
    'Flexible fixed, portable, and vehicle-mobile deployment': 'نشر مرن ثابت ومحمول ومتنقل بالمركبة',
    'Post-event reuse for recurring major activities': 'إعادة استخدام ما بعد الحدث للفعاليات الكبرى المتكررة',
    'Wide boundary coverage and layered airspace awareness': 'تغطية حدود واسعة ووعي جوي متعدد الطبقات',
    'Airport Airspace Security': 'أمن المجال الجوي للمطار',
    'Application rollout: routine airport airspace security for multiple airport sites':
      'تطبيق قابل للتكرار: أمن المجال الجوي الروتيني للمطارات عبر مواقع مطارات متعددة',
    'Remote ID monitoring and whitelist review': 'مراقبة Remote ID ومراجعة القائمة البيضاء',
    '20 MHz-6 GHz RF detection matrix': 'مصفوفة كشف RF من 20 MHz إلى 6 GHz',
    'Radar, RF, and EO data fusion platform': 'منصة دمج بيانات الرادار و RF و EO',
    'Fixed and portable response with airport EMC design': 'استجابة ثابتة ومحمولة مع تصميم EMC للمطار',
    'Asian Games Low-Altitude Low-Altitude Defense Application': 'تطبيق Low-Altitude Defense منخفض الارتفاع في الألعاب الآسيوية',
    'Low-Altitude Defense Case of a Group Factory in Nigeria': 'حالة Low-Altitude Defense لمصنع مجموعة في نيجيريا',
    'Low-Altitude Defense Case of a Power Plant in Pakistan': 'حالة Low-Altitude Defense لمحطة طاقة في باكستان',
    'Low-Altitude Defense Case of a Refinery in Brazil': 'حالة Low-Altitude Defense لمصفاة في البرازيل',
    'Airport Low-Altitude Defense Application': 'تطبيق Low-Altitude Defense في المطار',
    'Water Conservancy Facility Low-Altitude Low-Altitude Defense': 'Low-Altitude Defense منخفض الارتفاع لمنشأة مائية',
    'Learn More': 'اعرف المزيد',
    'Airspace Security': 'أمن المجال الجوي',
    'Low-Altitude Defense Equipment Options': 'خيارات معدات Low-Altitude Defense',
    'Site Operations': 'عمليات الموقع',
    'View': 'عرض',
  },
};

function copy(locale: Locale, value: string) {
  const translated = locale === 'ru'
    ? ruOperationalCopy[value as keyof typeof ruOperationalCopy] || localizedStrings[locale]?.[value]
    : localizedStrings[locale]?.[value];
  return sanitizePublicCopy(translated || value);
}

const painPoints = [
  {
    title: 'Cannot See',
    text: 'Where is it flying? Who is operating it? Low-altitude targets are hard to perceive across complex sites.',
    points: ['Urban blind zones', 'Weak small-target signals', 'Incomplete sensing coverage'],
    icon: ScanSearch,
  },
  {
    title: 'Cannot Identify',
    text: 'Authorized flights, unknown targets, and risky activity are difficult to separate in real time.',
    points: ['Unclear identity', 'Visual background confusion', 'Weather and signal complexity'],
    icon: Target,
  },
  {
    title: 'Cannot Control',
    text: 'After detection, single-device handling and manual workflows are often not timely, precise, or traceable.',
    points: ['Slow response chain', 'Multi-team coordination', 'Traceable records needed'],
    icon: Route,
  },
];

const solutionPillars = [
  {
    title: 'See Clearly',
    subtitle: 'Multi-source sensing',
    text: 'Use multi-source sensing to make low-altitude activity visible across the protected site.',
    points: ['Wireless RF detection', 'Low-altitude radar', 'EO identification', 'Remote ID'],
    icon: RadioTower,
  },
  {
    title: 'Identify Clearly',
    subtitle: 'Intelligent judgement',
    text: 'Combine tracks, features, identity clues, and risk levels so operators can judge the event with context.',
    points: ['Identification and tracking algorithms', 'Feature and type analysis', 'Target identity verification', 'Threat-level assessment'],
    icon: ScanSearch,
  },
  {
    title: 'Control Reliably',
    subtitle: 'Precise approved response',
    text: 'Connect approved response options, field teams, and platform records into a coordinated handling loop.',
    points: ['RF signal control', 'Navigation-signal guidance', 'Physical capture option', 'Directed-energy option'],
    icon: ClipboardList,
  },
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
    caption: 'Public-building platform sighting',
    image: '/solutions/low-altitude-airspace-monitoring/incident-gallery/public-building-sighting.webp',
  },
];

const equipmentCapabilityGroups = [
  {
    label: 'A',
    title: 'Sensing & Detection',
    subtitle: 'Multi-source fusion for all-site awareness',
    text: 'Build the first layer with RF detection, low-altitude radar, EO tracking, and Remote ID recognition so different target types can be noticed and reviewed.',
    sensingCards: [
      {
        title: 'Wireless RF Detection',
        points: ['Detection range up to 10 km', '800+ model library', 'Protocol parsing and direction finding'],
        src: '/products/02-detection-monitoring/stationary-rf-detection-system.webp',
        alt: 'Stationary RF awareness unit',
        href: '/products/stationary-rf-detection-system',
      },
      {
        title: 'Low-Altitude Radar',
        points: ['Multi-target tracking', 'Detects silent platforms', 'Range, bearing, speed, and altitude'],
        src: '/products/02-detection-monitoring/low-altitude-detection-radar.webp',
        alt: 'Low-altitude radar unit',
        href: '/products/low-altitude-detection-radar-ku-band',
      },
      {
        title: 'Electro-Optical Identification',
        points: ['Visual evidence capture', 'Day / night tracking options', 'Target category recognition'],
        src: '/products/02-detection-monitoring/electro-optical-tracking-system.webp',
        alt: 'Electro-optical verification unit',
        href: '/products/composite-electro-optical-tracking-system',
      },
      {
        title: 'Remote ID Monitoring Device',
        points: ['Reads electronic identity', 'Filters authorized Aerial Platform activity', 'Supports Remote ID compliance review'],
        src: '/products/aerial-systems/aerial-Remote-ID-Monitoring-System.webp',
        alt: 'Remote ID monitoring equipment',
        href: '/products/aerial-remote-id-monitoring-system',
      },
    ],
    note: 'Pursue single-device sensing performance while emphasizing multi-technology coordination.',
    summary:
      'RF detection, radar, EO, protocol parsing, and Remote ID can be selected according to the site scenario, then fused to strengthen low-altitude awareness.',
  },
  {
    label: 'B',
    title: 'Verification & Coordination',
    subtitle: 'Passive verification equipment for documented site workflows',
    text: 'Use fixed passive RF, Remote ID and portable monitoring equipment according to the site layout, deployment time and operator review workflow.',
    controlGroupLabel: 'Passive Verification & Event Records',
    controlCards: [
      {
        title: 'Stationary RF Identification System',
        points: ['Passive spectrum monitoring', 'Signal-profile review', 'Remote supervision and event records'],
        src: '/products/02-detection-monitoring/stationary-rf-detection-system.webp',
        alt: 'Stationary passive RF identification system',
        href: '/products/stationary-rf-detection-system',
      },
      {
        title: 'Aerial Platform Remote ID Recognition System',
        points: ['Cooperative identity reception', 'Position and operator context', 'Traceable event records'],
        src: '/products/aerial-systems/aerial-Remote-ID-Monitoring-System.webp',
        alt: 'Remote ID recognition equipment for passive verification',
        href: '/products/aerial-remote-id-monitoring-system',
      },
      {
        title: 'Portable RF Identification System',
        points: ['Portable passive monitoring', 'Single-person temporary deployment', 'Local review and event export'],
        src: '/products/02-detection-monitoring/portable-rf-detection-case.webp',
        alt: 'Portable passive RF identification equipment',
        href: '/products/portable-rf-detection-case',
      },
    ],
    note: 'Sensor observations require operator review and the documented site response procedure.',
    summary:
      'Passive RF, Remote ID, radar and EO/IR evidence can be correlated before an authorized site team decides how to respond.',
  },
  {
    label: 'C',
    title: 'Integrated Detection & Verification Units',
    subtitle: 'Detection, identification, confirmation and records in one workflow',
    text: 'Use integrated portable, fixed-site and vehicle-mobile sensor units when the site needs observation, operator confirmation and event records in one deployable system.',
    integratedGroups: [
      {
        title: 'Single-Operator',
        cards: [
          {
            title: 'Portable RF Identification Unit',
            text: 'Hand-carried passive receiver for local spectrum review and event records.',
            points: ['Visual operation', 'Operator review', 'Rugged outdoor build'],
            src: '/products/02-detection-monitoring/portable-rf-detection-case.webp',
            alt: 'Portable passive RF identification unit',
            href: '/products/portable-rf-detection-case',
          },
        ],
      },
      {
        title: 'Fixed-Site',
        cards: [
          {
            title: 'Fixed Passive RF Monitoring Unit',
            text: 'Stationary spectrum monitoring equipment for reviewed site sectors.',
            points: ['Signal-profile library', 'Priority-sector monitoring', 'Traceable event handling'],
            src: '/products/02-detection-monitoring/stationary-rf-detection-system.webp',
            alt: 'Fixed passive RF monitoring unit',
            href: '/products/stationary-rf-detection-system',
          },
          {
            title: 'Fixed Remote ID Recognition Unit',
            text: 'Passive cooperative-identity reception with map context and event records.',
            points: ['Identity reception', 'Position context', 'Recorded operator review'],
            src: '/products/aerial-systems/aerial-Remote-ID-Monitoring-System.webp',
            alt: 'Fixed Remote ID recognition unit',
            href: '/products/aerial-remote-id-monitoring-system',
          },
          {
            title: 'Radar-Vision Integrated Unit',
            text: 'Radar and optical fusion for target search and visual confirmation.',
            points: ['Radar wide-area search', 'RF and visual correlation', 'EO confirmation'],
            src: '/products/surveillance/FC-RDS500-4R-Radar-Vision-Sentinel.webp',
            alt: 'Radar vision fusion system',
            href: '/products/fc-rds500-4r-radar-vision-sentinel',
          },
        ],
      },
      {
        title: 'Mobile Vehicle',
        cards: [
          {
            title: 'Vehicle-Mobile Low-Altitude Defense Unit',
            text: 'Vehicle-mounted passive sensing equipment for mobile patrol and temporary monitoring.',
            points: ['On-site calibration', 'Platform mobility', 'Configurable sensor equipment'],
            src: '/solutions/low-altitude-airspace-monitoring/vehicle-mobile-defense.webp',
            alt: 'Vehicle-mobile Low-Altitude Defense unit',
          },
        ],
      },
    ],
    note: 'Published performance values require validation under the documented test and site conditions.',
    summary:
      'From single-operator field kits to fixed-site systems and mobile vehicle deployments, passive sensors can be selected by scenario and linked through one evidence workflow.',
  },
  {
    label: 'D',
    title: 'Low-Altitude Management Platform',
    subtitle: 'Unified command, map, alert, and records',
    text: 'Connect radar, passive RF, EO/IR, Remote ID, operator review, coordination status and event records on one platform.',
    points: ['Fixed command workstation', 'Mobile operator access', 'Map, alert, and record management'],
    images: [
      {
        src: '/solutions/low-altitude-airspace-monitoring/ppt-platform-interface.webp',
        alt: 'Low-altitude management platform interface',
      },
    ],
  },
];

const packages = [
  {
    title: 'Industrial & Energy Sites',
    meta: 'Coverage sites: nuclear power plants, substations, energy storage sites, oil and gas pipelines, chemical parks',
    image: '/cases/brazil-refinery-airspace-monitoring/main-home.webp',
    points: [
      'Wide-area low-altitude detection',
      'Early warning and threat-level review',
      'Authorized response coordination',
      'Continuous monitoring within documented operating limits',
    ],
  },
  {
    title: 'Public Venue & Event Site',
    meta: 'Coverage sites: multi-city games, stadiums, media centers, transport hubs, and major public events',
    image: '/cases/asian-games-security/main-home.webp',
    points: [
      'Multi-city coordinated coverage',
      'Multi-type event protection',
      'Flexible fixed, portable, and vehicle-mobile deployment',
      'Post-event reuse for recurring major activities',
    ],
  },
  {
    title: 'Airport Airspace Security',
    meta: 'Application rollout: routine airport airspace security for multiple airport sites',
    image: '/cases/airport-security-application/main-home.webp',
    points: [
      'Remote ID monitoring and whitelist review',
      '20 MHz-6 GHz RF detection matrix',
      'Radar, RF, and EO data fusion platform',
      'Fixed and portable response with airport EMC design',
    ],
  },
];

const caseReferences = [
  {
    title: 'Asian Games Low-Altitude Low-Altitude Defense Application',
    image: '/cases/asian-games-security/main.webp',
    href: '/cases/asian-games-security',
  },
  {
    title: 'Low-Altitude Defense Case of a Group Factory in Nigeria',
    image: '/cases/nigeria-factory-airspace-monitoring/main.webp',
    href: '/cases/nigeria-factory-low-altitude-monitoring',
  },
  {
    title: 'Low-Altitude Defense Case of a Power Plant in Pakistan',
    image: '/cases/pakistan-power-plant-airspace-monitoring/main-home.webp',
    href: '/cases/pakistan-power-plant-low-altitude-monitoring',
  },
  {
    title: 'Low-Altitude Defense Case of a Refinery in Brazil',
    image: '/cases/brazil-refinery-airspace-monitoring/main-home.webp',
    href: '/cases/brazil-refinery-low-altitude-monitoring',
  },
  {
    title: 'Airport Low-Altitude Defense Application',
    image: '/cases/airport-security-application/main-home.webp',
    href: '/cases/airport-security-application',
  },
  {
    title: 'Water Conservancy Facility Low-Altitude Low-Altitude Defense',
    image: '/cases/water-conservancy-security/main.webp',
    href: '/cases/water-conservancy-security',
  },
];

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildSeoMetadata({
    locale: params.locale,
    path: `/solutions/${pageHandle}`,
    fallbackTitle: `${copy(params.locale, pageTitle)} | N-TET`,
    fallbackDescription: copy(params.locale, pageDescription),
    fallbackKeywords: [
      'Low-Altitude Defense systems',
      'Low-Altitude Defense technology',
      'low-altitude defense system',
      'counter platform system',
      'counter platform detection',
      'anti platform',
      'anti platform system',
      'anti platform systems',
      'anti platform solution',
      'anti platform detection',
      'anti platform equipment',
      'anti platform radar',
      'Platform detection and tracking',
      'platform detector',
      'platform radar',
      'Aerial Platform detection system',
      'Low-Altitude Defense equipment',
      'RF detection system',
      'low-altitude detection radar',
      'electro-optical tracking system',
      'detector de platform',
      'detector de platforms',
      'radar de platform',
      'radar de platforms',
    ],
    image: '/products/02-detection-monitoring/detection-monitoring-home.webp',
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

function SiteProblemSection({ locale }: { locale: Locale }) {
  return (
    <section className={styles.problemSection}>
      <div className={styles.problemIntro}>
        <span className={styles.sectionEyebrow}>{copy(locale, 'Core challenge')}</span>
        <h2>{copy(locale, 'Cannot See, Cannot Identify, Cannot Control')}</h2>
        <p>
          {copy(locale, 'Fast-growing Aerial Platform activity and slower management tools create low-altitude blind zones. Site teams first need to see targets, identify events, and keep the handling process under control.')}
        </p>
      </div>
      <div className={styles.painPointGrid}>
        {painPoints.map((item) => {
          const Icon = item.icon;
          return (
            <article className={styles.painPointCard} key={item.title}>
              <div className={styles.painPointIcon}>
                <Icon size={30} strokeWidth={1.9} aria-hidden="true" />
              </div>
              <h3>{copy(locale, item.title)}</h3>
              <p>{copy(locale, item.text)}</p>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{copy(locale, point)}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
      <div className={styles.problemNote}>
        {copy(locale, 'Airports, route operations, key-site security, major events, and urban low-altitude management all need a system-level low-altitude security solution.')}
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

function SolutionApproachSection({ locale }: { locale: Locale }) {
  return (
    <section className={styles.approachSection}>
      <div className={styles.approachHeader}>
        <span className={styles.sectionEyebrow}>{copy(locale, 'N-TET solution approach')}</span>
        <h2>{copy(locale, 'See Clearly, Identify Clearly, Control Reliably')}</h2>
        <p>
          {copy(locale, 'Build an end-to-end closed loop around multi-source sensing, intelligent judgement, and coordinated on-site handling.')}
        </p>
      </div>
      <div className={styles.approachGrid}>
        {solutionPillars.map((item, index) => {
          const Icon = item.icon;
          return (
            <article className={styles.approachCard} key={item.title}>
              <div className={styles.approachIndex}>{String(index + 1).padStart(2, '0')}</div>
              <div className={styles.approachIcon}>
                <Icon size={34} strokeWidth={1.8} aria-hidden="true" />
              </div>
              <span>{copy(locale, item.subtitle)}</span>
              <h3>{copy(locale, item.title)}</h3>
              <p>{copy(locale, item.text)}</p>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{copy(locale, point)}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
      <div className={styles.approachNote}>
        {copy(locale, 'Multi-source fusion, heterogeneous networking, system-level coordination, and a visual command platform support efficient human-machine collaboration.')}
      </div>
    </section>
  );
}

function EquipmentCapabilitySection({ locale }: { locale: Locale }) {
  return (
    <section className={styles.compositionSection}>
      <div className={styles.compositionHeader}>
        <span className={styles.sectionEyebrow}>{copy(locale, 'Equipment capability')}</span>
        <h2>
          {copy(locale, 'Equipment Is Organized Around the Operating Loop')}
        </h2>
        <p>
          {copy(locale, 'Equipment is organized around the operating loop: sensing and detection first, verified handling second, integrated units third, and a command platform to close the loop.')}
        </p>
      </div>
      <div className={styles.compositionFlow}>
        {equipmentCapabilityGroups.map((item, index) => (
          <div className={styles.compositionNode} key={item.title}>
            <article
              className={`${styles.compositionCard} ${'sensingCards' in item ? styles.sensingCompositionCard : ''} ${'controlCards' in item ? styles.controlCompositionCard : ''} ${'integratedGroups' in item ? styles.integratedCompositionCard : ''}`}
            >
              <span className={styles.compositionLabel}>{copy(locale, item.label)}</span>
              <h3>{copy(locale, item.title)}</h3>
              <strong>{copy(locale, item.subtitle)}</strong>
              <p>{copy(locale, item.text)}</p>
              {'sensingCards' in item ? (
                <>
                  <div className={styles.sensingPptGrid}>
                    {item.sensingCards!.map((card) => (
                      <Link
                        key={card.title}
                        prefetch={false}
                        href={localePath(locale, card.href)}
                        className={styles.sensingPptCard}
                        aria-label={`${copy(locale, 'View')} ${copy(locale, card.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className={styles.sensingPptImageBox}>
                          <Image src={card.src} alt={copy(locale, card.alt)} width={260} height={150} className={styles.sensingPptImage} />
                        </div>
                        <h4>{copy(locale, card.title)}</h4>
                        <ul>
                          {card.points.map((point) => (
                            <li key={point}>{copy(locale, point)}</li>
                          ))}
                        </ul>
                      </Link>
                    ))}
                  </div>
                  <div className={styles.sensingPptNote}>
                    <strong>{copy(locale, item.note!)}</strong>
                    <span>{copy(locale, item.summary!)}</span>
                  </div>
                </>
              ) : 'controlCards' in item ? (
                <>
                  <div className={styles.controlPptGroupTitle}>{copy(locale, item.controlGroupLabel!)}</div>
                  <div className={styles.controlPptGrid}>
                    {item.controlCards!.map((card) => (
                      <Link
                        key={card.title}
                        prefetch={false}
                        href={localePath(locale, card.href)}
                        className={styles.controlPptCard}
                        aria-label={`${copy(locale, 'View')} ${copy(locale, card.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className={styles.controlPptImageBox}>
                          <Image src={card.src} alt={copy(locale, card.alt)} width={260} height={150} className={styles.controlPptImage} />
                        </div>
                        <h4>{copy(locale, card.title)}</h4>
                        <span aria-hidden="true" />
                        <ul>
                          {card.points.map((point) => (
                            <li key={point}>{copy(locale, point)}</li>
                          ))}
                        </ul>
                      </Link>
                    ))}
                  </div>
                  <div className={styles.controlPptNote}>
                    <strong>{copy(locale, item.note!)}</strong>
                    <span>{copy(locale, item.summary!)}</span>
                  </div>
                </>
              ) : 'integratedGroups' in item ? (
                <>
                  <div className={styles.integratedPptGrid}>
                    {item.integratedGroups!.map((group) => (
                      <section className={styles.integratedPptGroup} key={group.title}>
                        <h4>{copy(locale, group.title)}</h4>
                        <div className={styles.integratedPptCards}>
                          {group.cards.map((card) => {
                            const isProductCard = 'href' in card;
                            const cardContent = (
                              <>
                                <div className={isProductCard ? styles.integratedPptImageBox : styles.integratedPptSceneBox}>
                                  <Image src={card.src} alt={copy(locale, card.alt)} width={260} height={150} className={styles.integratedPptImage} />
                                </div>
                                <h5>{copy(locale, card.title)}</h5>
                                <span aria-hidden="true" />
                                <p>{copy(locale, card.text)}</p>
                                <ul>
                                  {card.points.map((point) => (
                                    <li key={point}>{copy(locale, point)}</li>
                                  ))}
                                </ul>
                              </>
                            );

                            if (!isProductCard) {
                              return (
                                <article key={card.title} className={styles.integratedPptCard}>
                                  {cardContent}
                                </article>
                              );
                            }

                            return (
                              <Link
                                key={card.title}
                                prefetch={false}
                                href={localePath(locale, card.href)}
                                className={styles.integratedPptCard}
                                aria-label={`${copy(locale, 'View')} ${copy(locale, card.title)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {cardContent}
                              </Link>
                            );
                          })}
                        </div>
                      </section>
                    ))}
                  </div>
                  <div className={styles.integratedPptNote}>
                    <strong>{copy(locale, item.note!)}</strong>
                    <span>{copy(locale, item.summary!)}</span>
                  </div>
                </>
              ) : (
                <>
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
                          href={localePath(locale, String(image.href))}
                          className={styles.compositionImageLink}
                          aria-label={`${copy(locale, 'View')} ${copy(locale, image.alt)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {imageElement}
                        </Link>
                      );
                    })}
                  </div>
                </>
              )}
            </article>
            {index < equipmentCapabilityGroups.length - 1 ? (
              <span className={styles.compositionPlus} aria-hidden="true">+</span>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function Landing({ locale, dict }: { locale: Locale; dict: any }) {
  return (
    <main className={`${styles.page} ${styles.responsivePage}`}>
      <Breadcrumbs locale={locale} homeLabel={dict.nav.home} solutionsLabel={dict.nav.solutions} />

      <section className={styles.heroSection}>
        <Image
          src="/solutions/low-altitude-airspace-monitoring/ntet-radar-back-side-facing-viewer-front-to-platform.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.heroBackdrop}
        />
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <span className={styles.heroEyebrow}>{copy(locale, 'Low-Altitude Defense Site Security Plan')}</span>
          <h1>
            <span className={styles.titleLine}>
              {copy(locale, 'Low-Altitude Airspace')}
            </span>
            <span className={styles.titleLine}>
              {copy(locale, 'Security for Critical Sites')}
            </span>
          </h1>
          <p>
            {copy(locale, 'For airports, refineries, power plants, ports, venues, and large perimeters. N-TET helps turn real site conditions into a practical Low-Altitude Defense and low-altitude security plan.')}
          </p>
          <div className={styles.heroActions}>
            <Link prefetch={false} href="#inquiry" className={styles.primaryCta}>
              {copy(locale, 'Get Site Layout & Quote')}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <PrimaryContactButton sourceLabel="low_altitude_landing_hero_whatsapp" className={`${styles.secondaryCta} ${styles.whatsappCta}`}>
              {copy(locale, 'Get Datasheet & Pricing on WhatsApp')}
            </PrimaryContactButton>
          </div>
        </div>
      </section>

      <SiteProblemSection locale={locale} />

      <SolutionApproachSection locale={locale} />

      <EquipmentCapabilitySection locale={locale} />

      <section className={styles.packageSection}>
        <div className={styles.sectionHeader}>
          <h2>{copy(locale, 'Low-Altitude Defense Scenarios by Site Type')}</h2>
          <p>{copy(locale, 'Use these site scenarios to match sensing coverage, review workflow, and approved response options for critical low-altitude security operations.')}</p>
        </div>
        <div className={styles.packageGrid}>
          {packages.map((item) => (
            <article className={styles.packageCard} key={item.title}>
              <Image src={item.image} alt="" width={420} height={230} className={styles.packageImage} />
              <h3>{copy(locale, item.title)}</h3>
              <p className={styles.packageMeta}>{copy(locale, item.meta)}</p>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>
                    <CheckCircle2 size={15} aria-hidden="true" />
                    {copy(locale, point)}
                  </li>
                ))}
              </ul>
              <Link prefetch={false} href="#inquiry" className={styles.learnMore}>
                {copy(locale, 'Discuss Site Setup')}
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
            <Link
              prefetch={false}
              href={localePath(locale, item.href)}
              className={styles.caseReferenceCard}
              key={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
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

      <PerformanceConditionsNote locale={locale} />

      <section id="inquiry" className={styles.inquirySection}>
        <DeferredInquiryForm dict={dict} />
      </section>
    </main>
  );
}

export default async function LowAltitudeAirspaceMonitoringPage({ params }: { params: { locale: Locale } }) {
  notFound();

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
      serviceType: 'low-altitude airspace security and Low-Altitude Defense',
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
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': jsonLdGraph }} />
      <Landing locale={locale} dict={dict} />
    </>
  );
}
