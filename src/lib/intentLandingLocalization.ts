import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import type { IntentLandingConfig } from '@/lib/intentLandingPages';
import { localePath } from '@/lib/localePath';
import { buildSeoMetadata } from '@/lib/seoMetadata';
import { sanitizePublicCopy, sanitizePublicRecord } from '@/lib/publicCopy';
import ru01 from '@/dictionaries/intent-landing/ru-01.json';
import ru02 from '@/dictionaries/intent-landing/ru-02.json';
import ru03 from '@/dictionaries/intent-landing/ru-03.json';
import ru04 from '@/dictionaries/intent-landing/ru-04.json';
import ru05 from '@/dictionaries/intent-landing/ru-05.json';
import ru06 from '@/dictionaries/intent-landing/ru-06.json';
import ru07 from '@/dictionaries/intent-landing/ru-07.json';
import ru08 from '@/dictionaries/intent-landing/ru-08.json';

const russianStrings: Record<string, string> = {
  ...ru01,
  ...ru02,
  ...ru03,
  ...ru04,
  ...ru05,
  ...ru06,
  ...ru07,
  ...ru08,
  'PERIMETER DEFENSE & PROTECTION': 'МОНИТОРИНГ ПЕРИМЕТРА',
  'Perimeter Defense: Integrated Low-Altitude Site Protection':
    'Интегрированный мониторинг периметра на малых высотах',
  'Portable Low-Altitude Defense covers several deployment formats with different capabilities. A patrol team may need a lightweight handheld RF detector for local alerts. A temporary post may use a hand-carried identification system with a larger display, direction finding and positioning support. An integrated field kit combines detection, identification, tracking cues, alarm linkage, event records and command-platform coordination. Vehicle-mounted systems add multi-sensor integration and rapid repositioning between operating sectors, together with project-specific power, mounting, vibration and network requirements. Selection should begin with the mission, crew size, readiness time, operating duration, target information required and response mode—not detection range alone. RF performance depends on target radio activity, frequency coverage, local noise, antenna position and obstructions; radar, EO/IR and platform interfaces should be engineered as separate system layers.':
    'Переносные решения Low-Altitude Defense включают несколько форматов развёртывания с разными возможностями. Патрульной группе может потребоваться лёгкий ручной RF-детектор для локального оповещения. На временном посту можно использовать переносную систему идентификации с увеличенным дисплеем, пеленгацией и поддержкой позиционирования. Интегрированный полевой комплект объединяет обнаружение, идентификацию, данные сопровождения, связь тревог, журнал событий и взаимодействие с командной платформой. Автомобильные комплексы дополняют это мультисенсорной интеграцией и быстрым перемещением между рабочими секторами, но требуют проектирования питания, креплений, виброзащиты и сети. Выбор следует начинать с задачи, состава расчёта, времени готовности, продолжительности работы, необходимой информации о цели и режима реагирования, а не только с дальности. Эффективность RF-средств зависит от наличия радиосигнала цели, частотного покрытия, местного шума, положения антенны и препятствий; радар, EO/IR и интерфейсы платформы проектируются как отдельные уровни системы.',
  'Not usually. RF, radar, Remote ID and EO/IR answer different questions, so the site configuration should be based on the evidence and coverage the operator needs.':
    'Как правило, нет. RF-сенсоры, радар, Remote ID и EO/IR решают разные задачи, поэтому конфигурация объекта должна определяться необходимыми оператору данными и требуемым покрытием.',
  'The platform compares the track with RF, Remote ID, permitted-flight and map context.':
    'Платформа сопоставляет траекторию с RF-данными, Remote ID, перечнем разрешённых полётов и картографической обстановкой.',
  'A cooperative identity layer for compatible Remote ID broadcasts and permitted-flight review.':
    'Уровень кооперативной идентификации для приёма совместимых сигналов Remote ID и проверки разрешённых полётов.',
  'Fixed RF, radar and EO/IR': 'Стационарные RF-сенсоры, радар и EO/IR',
  'Add movement evidence when a recognizable RF or Remote ID source is unavailable.':
    'Добавляет данные о движении, когда распознаваемый RF-сигнал или Remote ID недоступен.',
  'RF and EO/IR handoff': 'Передача траектории RF- и EO/IR-системам',
  'Portable Low-Altitude Defense Field Shield Pro': 'Переносной полевой комплекс Low-Altitude Defense Pro',
  'Portable Low-Altitude Defense Field Shield (Pro)': 'Переносной полевой комплекс Low-Altitude Defense Pro',
  'Compare Ku-band and X-band radar options for early warning, target tracking and handoff to RF and EO/IR confirmation around critical sites.':
    'Сравните радары Ku- и X-диапазона для раннего предупреждения, сопровождения целей и передачи данных RF- и EO/IR-системам на критически важных объектах.',
  'Radar contributes movement and track data; RF can add signal or identity clues; EO/IR can add visual confirmation. Correlation gives the operator a more reviewable event.':
    'Радар предоставляет данные о движении и траектории, RF-сенсоры — сведения о сигнале и идентификационные признаки, а EO/IR — визуальное подтверждение. Их сопоставление формирует для оператора проверяемую карточку события.',
  'Aerial Platform Remote ID Recognition System': 'Система распознавания Remote ID воздушная платформа',
  'Fixed-site coverage': 'Стационарное покрытие',
  'Fixed-site project integration': 'Интеграция в стационарный комплекс',
  'Fixed-site platform integration': 'Интеграция со стационарной платформой',
  'Fixed-site event handoff': 'Передача события в систему стационарного объекта',
  'Fixed-site deployment with radar or command-platform cueing':
    'Стационарное развёртывание с наведением от радара или командной платформы',
  'Portable Low-Altitude Defense Field Shield for temporary site protection':
    'Переносной полевой комплекс Low-Altitude Defense для временной защиты объекта',
  'Portable Low-Altitude Defense field unit in a layered Platform Shield configuration':
    'Переносной полевой модуль Low-Altitude Defense в составе многоуровневой системы защиты',
  'RF, radar, Remote ID and EO evidence':
    'Данные RF-сенсоров, радара, Remote ID и EO/IR',
  'The platform compares signal, movement, identity and permitted-flight information without forcing uncertain evidence into a confident label.':
    'Платформа сопоставляет сигнал, движение, идентификационные данные и разрешённые полёты, не присваивая неопределённой цели неподтверждённый статус.',
  'The selected deployment format changes the equipment, but every project still needs a defined evidence and responsibility chain.':
    'Формат развёртывания определяет состав оборудования, однако каждому проекту необходимы заданная цепочка проверки данных и распределение ответственности.',
  'A usable radar track moves through evidence correlation, operator confirmation and a defined handoff to the responsible site team.':
    'Пригодная для работы радарная траектория проходит сопоставление с другими данными, подтверждение оператором и передачу ответственной группе объекта.',
  'The operator reviews supported RF, identity, map and permitted-flight information without treating uncertain evidence as confirmed.':
    'Оператор проверяет доступные RF-данные, идентификационные признаки, карту и разрешённые полёты, не считая неопределённые сведения подтверждёнными.',
  'Correlate cooperative identity, RF, radar and visual evidence in one operating picture.':
    'Объединяйте кооперативную идентификацию, RF-данные, радарную траекторию и визуальное подтверждение в единой ситуационной картине.',
  'Low-altitude radar for Platform Defender tracking':
    'Радар малых высот для сопровождения целей в системе защиты',
  'EO/IR cueing and operator review add visual evidence and a review status.':
    'Наведение EO/IR и проверка оператором добавляют визуальное подтверждение и статус рассмотрения.',
  'Primary evidence': 'Основные данные',
  'Select each detection layer according to the evidence operators need. RF sensing, radar, Remote ID and EO/IR provide different types of information; they are complementary, not interchangeable.':
    'Выбирайте каждый уровень обнаружения по данным, необходимым оператору. RF-сенсоры, радар, Remote ID и EO/IR предоставляют разные виды информации: они дополняют, но не заменяют друг друга.',
  'The required location evidence changes with the protected boundary and command workflow.':
    'Требуемые данные о местоположении зависят от защищаемой границы и принятого процесса управления.',
  'Correlate identity, track and visual evidence before the responsible team makes a decision.':
    'До принятия решения ответственной группой сопоставьте идентификационные данные, траекторию и визуальное подтверждение.',
  'The strongest configuration is the one that closes evidence gaps without hiding each sensor\'s limits.':
    'Наиболее надёжная конфигурация закрывает пробелы в данных, не скрывая ограничений каждого сенсора.',
  'Visible-light and thermal imaging for operator confirmation, target tracking and video evidence.':
    'Изображение в видимом и тепловом диапазонах для подтверждения оператором, сопровождения цели и видеозаписи.',
  'Visible-light and thermal imaging for operator confirmation, tracking and video evidence.':
    'Изображение в видимом и тепловом диапазонах для подтверждения оператором, сопровождения и видеозаписи.',
  'Integrated evidence and command handoff':
    'Объединение данных и передача информации в контур управления',
  'Integrated evidence workflow': 'Интегрированный процесс проверки данных',
  'Carry an integrated field kit that joins evidence, event records and command handoff.':
    'Используйте интегрированный полевой комплект, объединяющий данные о цели, журнал событий и передачу информации в контур управления.',
  'Compare evidence, site role and operating limits before selecting equipment.':
    'Перед выбором оборудования сопоставьте необходимые данные, задачи объекта и эксплуатационные ограничения.',
  'Fixed RF, radar and EO/IR layers cover approach sectors and link confirmed tracks to directional or omni-directional RF suppressors.':
    'Стационарные RF-сенсоры, радар и EO/IR контролируют сектора подлёта и связывают подтверждённые траектории с направленными или всенаправленными системами RF-подавления.',
  'Traceable event status and handoff':
    'Прослеживаемый статус события и передача ответственной группе',
  'Typical evidence': 'Типовые данные',
  'suppressor and platform linkage': 'Связь системы RF-подавления с командной платформой',
  'Portable and vehicle-mounted Low-Altitude Defense FAQ':
    'Частые вопросы о переносных и автомобильных системах Low-Altitude Defense',
  'Combine RF detection, low-altitude radar, Remote ID and EO/IR tracking in one site-specific early-warning, identification and command workflow.':
    'Объедините RF-обнаружение, радар малых высот, Remote ID и EO/IR-сопровождение в едином процессе раннего предупреждения, идентификации и управления для конкретного объекта.',
  'Compare handheld detectors, hand-carried identification systems, integrated field kits and vehicle-mounted Low-Altitude Defense configurations for temporary, patrol and mobile operations.':
    'Сравните ручные детекторы, переносные системы идентификации, интегрированные полевые комплекты и автомобильные конфигурации Low-Altitude Defense для временных постов, патрулирования и мобильных операций.',
  'Combine RF detection, radar tracking, EO/IR confirmation and directional or omni-directional RF suppressors in one layered site-protection workflow.':
    'Объедините RF-обнаружение, радарное сопровождение, EO/IR-подтверждение и направленные либо всенаправленные системы RF-подавления в едином многоуровневом процессе защиты объекта.',
  'Compare mobile and fixed-site Platform Locator configurations using RF direction finding, radar tracking, EO/IR confirmation and command-platform integration.':
    'Сравните мобильные и стационарные конфигурации определения местоположения с RF-пеленгацией, радарным сопровождением, EO/IR-подтверждением и интеграцией с командной платформой.',
  'Compare fixed-site, portable and vehicle-mounted Platform Shield configurations for multi-sensor detection, target tracking, command and coordinated response.':
    'Сравните стационарные, переносные и автомобильные комплексы защиты с мультисенсорным обнаружением, сопровождением целей, управлением и согласованным реагированием.',
  'Compare Directional RF Suppressor and Omni-directional RF Suppressor options for fixed-site Low-Altitude Defense integration, linked control and coordinated response.':
    'Сравните направленные и всенаправленные системы RF-подавления для интеграции в стационарный комплекс Low-Altitude Defense, связанного управления и согласованного реагирования.',
  'Target Detection Radar': 'Радарное обнаружение целей',
  'Portable Target Detection': 'Переносные системы обнаружения целей',
  'Target Detector': 'Детектор целей',
  'Perimeter Defense': 'Многоуровневая защита от целей',
  'Target Locator': 'Определение местоположения целей',
  'Site Protection': 'Комплекс защиты от целей',
  'RF Suppressor': 'Системы RF-подавления',
};

export function intentText(locale: Locale, value: string) {
  return sanitizePublicCopy(russianStrings[value] || value);
}

function localizeValue<T>(locale: Locale, value: T): T {
  if (typeof value === 'string') {
    return intentText(locale, value) as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => localizeValue(locale, item)) as T;
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [
        key,
        localizeValue(locale, item),
      ]),
    ) as T;
  }
  return value;
}

export function localizeIntentLandingConfig(config: IntentLandingConfig, locale: Locale) {
  return sanitizePublicRecord(localizeValue(locale, config));
}

export function buildIntentLandingPageMetadata(
  config: IntentLandingConfig,
  locale: Locale,
): Metadata {
  const localizedConfig = localizeIntentLandingConfig(config, locale);
  const path = `/solutions/${config.handle}`;
  const metadata = buildSeoMetadata({
    locale,
    path,
    fallbackTitle: localizedConfig.h1,
    fallbackDescription: localizedConfig.purpose,
    fallbackKeywords: [
      localizedConfig.h1,
      localizedConfig.eyebrow,
      ...localizedConfig.heroFacts,
    ],
    image: localizedConfig.heroImage,
  });

  const russianSeoTitles: Record<string, string> = {
    'multi-sensor-detection': 'Детектор целей и мультисенсорная система | N-TET',
    'low-altitude-radar-monitoring': 'Радар обнаружения целей Ku/X | N-TET',
    'portable-detection-system': 'Переносные и автомобильные системы защиты | N-TET',
    'perimeter-defense-system': 'Многоуровневая защита объектов | N-TET',
    'rf-target-positioning': 'Определение местоположения целей | N-TET',
    'layered-site-protection': 'Комплексы защиты периметра | N-TET',
    'rf-signal-suppression': 'Направленные и всенаправленные системы RF-подавления | N-TET',
  };
  const russianTitle = russianSeoTitles[config.handle] || `${localizedConfig.h1} | N-TET`;
  const title = locale === 'ru' ? russianTitle : metadata.title;
  const description = locale === 'ru' ? localizedConfig.purpose : metadata.description;
  const socialTitle = locale === 'ru' ? russianTitle : localizedConfig.h1;
  const socialDescription = localizedConfig.purpose;
  const canonical = localePath(locale, path);

  return {
    ...metadata,
    title,
    description,
    keywords: locale === 'ru'
      ? [localizedConfig.h1, localizedConfig.eyebrow, ...localizedConfig.heroFacts]
      : metadata.keywords,
    alternates: {
      canonical,
      languages: {
        ru: path,
        'x-default': path,
      },
    },
    openGraph: {
      ...metadata.openGraph,
      title: socialTitle,
      description: socialDescription,
      url: canonical,
      locale: locale === 'ru' ? 'ru_RU' : 'en_US',
    },
    twitter: {
      ...metadata.twitter,
      title: socialTitle,
      description: socialDescription,
    },
  };
}

export function getIntentLandingTranslationCount() {
  return Object.keys(russianStrings).length;
}
