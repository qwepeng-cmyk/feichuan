const SAFE_UTF8_REPLACEMENTS: Array<[RegExp, string]> = [
  [/\bdrone(?:s)?\b/gi, '\u043d\u0438\u0437\u043a\u043e\u0432\u044b\u0441\u043e\u0442\u043d\u0430\u044f \u0446\u0435\u043b\u044c'],
  [/\buav(?:s)?\b/gi, '\u0432\u043e\u0437\u0434\u0443\u0448\u043d\u0430\u044f \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0430'],
  [/\u0430\u043d\u0442\u0438\u0434\u0440\u043e\u043d[\u0430-\u044f\u0451-]*/gi, '\u043a\u043e\u043c\u043f\u043b\u0435\u043a\u0441 \u043d\u0438\u0437\u043a\u043e\u0432\u044b\u0441\u043e\u0442\u043d\u043e\u0433\u043e \u043c\u043e\u043d\u0438\u0442\u043e\u0440\u0438\u043d\u0433\u0430'],
  [/\u0434\u0440\u043e\u043d[\u0430-\u044f\u0451-]*/gi, '\u043d\u0438\u0437\u043a\u043e\u0432\u044b\u0441\u043e\u0442\u043d\u0430\u044f \u0446\u0435\u043b\u044c'],
  [/\u0431\u043f\u043b\u0430/gi, '\u0432\u043e\u0437\u0434\u0443\u0448\u043d\u0430\u044f \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0430'],
  [/\u0431\u0435\u0441\u043f\u0438\u043b\u043e\u0442\u043d[\u0430-\u044f\u0451-]*/gi, '\u0432\u043e\u0437\u0434\u0443\u0448\u043d\u0430\u044f \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0430'],
  [/\u0433\u043b\u0443\u0448\u0438\u043b\u043a[\u0430-\u044f\u0451-]*/gi, '\u0440\u0430\u0434\u0438\u043e\u0447\u0430\u0441\u0442\u043e\u0442\u043d\u043e\u0435 \u043e\u0431\u043e\u0440\u0443\u0434\u043e\u0432\u0430\u043d\u0438\u0435'],
  [/\u0434\u0436\u0430\u043c\u043c\u0435\u0440[\u0430-\u044f\u0451-]*/gi, '\u0440\u0430\u0434\u0438\u043e\u0447\u0430\u0441\u0442\u043e\u0442\u043d\u043e\u0435 \u043e\u0431\u043e\u0440\u0443\u0434\u043e\u0432\u0430\u043d\u0438\u0435'],
  [/\bspoofing\b/gi, 'navigation signal analysis'],
  [/\u0441\u043f\u0443\u0444\u0438\u043d\u0433[\u0430-\u044f\u0451-]*/gi, '\u0430\u043d\u0430\u043b\u0438\u0437 \u0430\u043d\u043e\u043c\u0430\u043b\u0438\u0439 \u043d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u043e\u043d\u043d\u043e\u0433\u043e \u0441\u0438\u0433\u043d\u0430\u043b\u0430'],
  [/\bweapons?\b/gi, 'specialized response equipment'],
  [/\bshoot[\s_-]*down\b/gi, 'respond to'],
  [/\u043e\u0440\u0443\u0436\u0438[\u0430-\u044f\u0451-]*/gi, '\u0441\u043f\u0435\u0446\u0438\u0430\u043b\u0438\u0437\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u043e\u0435 \u043e\u0431\u043e\u0440\u0443\u0434\u043e\u0432\u0430\u043d\u0438\u0435 \u0440\u0435\u0430\u0433\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f'],
  [/\u53cd\u65e0\u4eba\u673a|\u53cd\u65e0/g, '\u4f4e\u7a7a\u9632\u62a4'],
  [/\u65e0\u4eba\u673a/g, '\u4f4e\u7a7a\u76ee\u6807'],
];

const COPY_REPLACEMENTS: Array<[RegExp, string]> = [
  [/\blow[\s-]*altitude defense\b/gi, 'низковысотный мониторинг'],
  [/\bperimeter defense\b/gi, 'периметральный мониторинг'],
  [/\bdefense\b/gi, 'мониторинг'],
  [/\bcounter[\s_-]*u(?:as|av)\b/gi, 'низковысотный мониторинг'],
  [/\bc[\s_-]*uas\b/gi, 'низковысотный мониторинг'],
  [/\bcuas\b/gi, 'низковысотный мониторинг'],
  [/\banti[\s_-]*drone\b/gi, 'низковысотный мониторинг'],
  [/\banti[\s_-]*uav\b/gi, 'низковысотный мониторинг'],
  [/\bdrone(?:s)?\b/gi, 'низковысотная цель'],
  [/\buav(?:s)?\b/gi, 'воздушная платформа'],
  [/антидрон[а-яё-]*/gi, 'комплекс низковысотного мониторинга'],
  [/дрон[а-яё-]*/gi, 'низковысотная цель'],
  [/бпла/gi, 'воздушная платформа'],
  [/беспилотн[а-яё-]*/gi, 'воздушная платформа'],
  [/\bjammer(?:s)?\b/gi, 'RF suppressor'],
  [/\bjamming\b/gi, 'signal suppression'],
  [/глушил[а-яё-]*/gi, 'подавление радиосигнала'],
  [/джаммер[а-яё-]*/gi, 'подавление радиосигнала'],
  [/\bspoofing\b/gi, 'navigation signal analysis'],
  [/反无人机|反无/g, '低空防护'],
  [/无人机/g, '低空目标'],
  [/комплекс низковысотной защиты/gi, 'комплекс низковысотного мониторинга'],
  [/низковысотная защита/gi, 'низковысотный мониторинг'],
  [/низковысотной защиты/gi, 'низковысотного мониторинга'],
];

const RUSSIAN_PLATFORM_FORM_REPLACEMENTS: Array<[RegExp, string]> = [
  [/воздушная платформаами/gi, 'низковысотными целями'],
  [/воздушная платформаов/gi, 'низковысотных целей'],
  [/воздушная платформаы/gi, 'низковысотные цели'],
  [/воздушная платформаа/gi, 'низковысотной цели'],
  [/воздушная платформаом/gi, 'низковысотной целью'],
  [/воздушных платформах/gi, 'низковысотных целях'],
  [/воздушными платформами/gi, 'низковысотными целями'],
  [/воздушным платформам/gi, 'низковысотным целям'],
  [/воздушных платформ/gi, 'низковысотных целей'],
  [/воздушные платформы/gi, 'низковысотные цели'],
  [/воздушной платформой/gi, 'низковысотной целью'],
  [/воздушную платформу/gi, 'низковысотную цель'],
  [/воздушной платформе/gi, 'низковысотной цели'],
  [/воздушной платформы/gi, 'низковысотной цели'],
];

const PASSIVE_RESPONSE_REPLACEMENTS: Array<[RegExp, string]> = [
  [/\bdirectional RF suppressor(?:s)?\b/gi, 'directional RF monitoring unit'],
  [/\bomni-directional RF suppressor(?:s)?\b/gi, 'omni-directional RF monitoring unit'],
  [/\bRF suppressor(?:s)?\b/gi, 'RF monitoring unit'],
  [/\bsignal suppression\b/gi, 'passive spectrum monitoring'],
  [/\belectromagnetic suppression systems?\b/gi, 'multi-sensor verification systems'],
  [/\bnavigation signal manipulation\b/gi, 'navigation-signal anomaly analysis'],
  [/\bnavigation spoofing\b/gi, 'navigation-signal anomaly analysis'],
  [/\bforced landing\b/gi, 'operator-coordinated response'],
  [/\bforce(?:s|d)? (?:return|landing|expulsion)\b/gi, 'supports coordinated operator response'],
  [/\bneutralization\b/gi, 'coordinated response'],
  [/\bneutraliz(?:e|es|ed|ing)\b/gi, 'support coordinated response to'],
  [/\bhigh-energy laser systems?\b/gi, 'EO/IR verification systems'],
  [/направленн[а-яё-]*\s+подавлени[а-яё-]*\s+радиосигнал[а-яё-]*/gi, 'направленный пассивный радиочастотный мониторинг'],
  [/подавлени[а-яё-]*\s+радиосигнал[а-яё-]*/gi, 'пассивный мониторинг радиочастотного спектра'],
  [/радиочастотн[а-яё-]*\s+подавлени[а-яё-]*/gi, 'пассивный радиочастотный мониторинг'],
  [/навигационн[а-яё-]*\s+(?:спуфинг[а-яё-]*|манипуляци[а-яё-]*)/gi, 'анализ аномалий навигационного сигнала'],
  [/принудительн[а-яё-]*\s+посадк[а-яё-]*/gi, 'скоординированное реагирование оператора'],
  [/нейтрализ[а-яё-]*/gi, 'скоординированное реагирование'],
];

const QUALIFIED_CLAIM_REPLACEMENTS: Array<[RegExp, string]> = [
  [/\beliminates? all (?:surveillance )?blind spots\b/gi, 'is designed to reduce monitoring blind spots'],
  [/\babsolute protection\b/gi, 'site-specific protection planning'],
  [/\babsolute operational integrity\b/gi, 'site-specific operational resilience'],
  [/\babsolute countermeasures\b/gi, 'site-specific response procedures'],
  [/\binstantaneous neutralization\b/gi, 'operator-coordinated response'],
  [/\btotal privacy\b/gi, 'site-specific privacy risk reduction'],
  [/\bzero-intrusion\b/gi, 'reduced-incursion'],
  [/\b24\/7 all-weather\b/gi, 'continuous monitoring within documented environmental limits'],
  [/\b24\/7\b/gi, 'continuous operation within documented power, network and environmental limits'],
  [/\ball-weather operation\b/gi, 'operation within documented environmental limits'],
  [/\bguarantees?\b/gi, 'supports'],
  [/абсолютн[а-яё-]*\s+(?:защит[а-яё-]*|гаранти[а-яё-]*|эффективност[а-яё-]*)/gi, 'результат в пределах документированных условий испытаний'],
  [/круглосуточн[а-яё-]*\s+всепогодн[а-яё-]*/gi, 'непрерывный мониторинг в пределах документированных условий эксплуатации'],
  [/гарантиру[а-яё-]*/gi, 'поддерживает'],
];

function normalizeRussianPlatformGrammar(value: string) {
  let normalized = value;

  for (const [pattern, replacement] of RUSSIAN_PLATFORM_FORM_REPLACEMENTS) {
    normalized = normalized.replace(pattern, replacement);
  }

  normalized = normalized
    .replace(/(от|без|для|против|вокруг)\s+воздушная платформа/gi, '$1 низковысотных целей')
    .replace(/с\s+воздушная платформа/gi, 'с низковысотными целями')
    .replace(/к\s+воздушная платформа/gi, 'к низковысотным целям')
    .replace(/(?:об|о)\s+воздушная платформа/gi, 'о низковысотных целях')
    .replace(
      /(обнаружени[еяю]|идентификаци[яию]|мониторинг[ау]?|сопровождени[еяю]|отслеживани[еяю]|контрол[ьяю]|траектори[яию])\s+воздушная платформа/gi,
      '$1 низковысотных целей',
    )
    .replace(/управлени[еяю]\s+воздушная платформа/gi, 'управление низковысотными целями')
    .replace(/оператор(?:а|ом|у|е)?\s+воздушная платформа/gi, 'оператор низковысотной цели')
    .replace(/несанкционированных\s+воздушная платформа/gi, 'несанкционированных низковысотных целей')
    .replace(/несанкционированного\s+воздушная платформа/gi, 'несанкционированной низковысотной цели')
    .replace(/нелегальных\s+воздушная платформа/gi, 'нелегальных низковысотных целей')
    .replace(/воздушная платформа/gi, 'низковысотные цели');

  return normalized;
}

const PRESERVED_VALUE_KEYS = new Set([
  'handle',
  'id',
  'main_image',
  'image',
  'case_images',
  'href',
  'url',
  'path',
  'src',
  'link',
  'category_primary',
  'category_id',
  'recommended_products',
  'recommended_product_handles',
]);

const PUBLIC_REFERENCE_ALIASES: Record<string, string> = {
  '/products/02-drone-detection/stationary-rf-detection-system.webp':
    '/products/02-detection-monitoring/stationary-rf-detection-system.webp',
  '/products/02-drone-detection/portable-rf-detection-case.webp':
    '/products/02-detection-monitoring/portable-rf-detection-case.webp',
  '/products/02-drone-detection/electro-optical-tracking-system.webp':
    '/products/02-detection-monitoring/electro-optical-tracking-system.webp',
  '/products/02-drone-detection/handheld-rf-detection-system-pl280h.webp':
    '/products/02-detection-monitoring/handheld-rf-detection-system-pl280h.webp',
  '/products/02-drone-detection/low-altitude-detection-radar.webp':
    '/products/02-detection-monitoring/low-altitude-detection-radar.webp',
  '/products/02-drone-detection/low-altitude-detection-radar-x-band.webp':
    '/products/02-detection-monitoring/low-altitude-detection-radar-x-band.webp',
  '/solutions/chemical-plant-protection/industry-pain-points-tank-drone.webp':
    '/solutions/chemical-plant-protection/industry-pain-points-tank-low-altitude-target.webp',
  '/about/factory-show/uav-detection-company-china.webp':
    '/products/02-detection-monitoring/stationary-rf-detection-system.webp',
  '/products/uav-systems/UAV-Remote-ID-Monitoring-System.webp':
    '/products/aerial-systems/aerial-Remote-ID-Monitoring-System.webp',
  '/products/handheld-drone-net-launcher/handheld-drone-net-launcher.webp':
    '/products/handheld-capture-launcher/handheld-capture-launcher.webp',
  '/products/drone-laser-engagement-system/3kw-tracking-turret.webp':
    '/products/directed-energy-system/3kw-tracking-turret.webp',
};

export function sanitizePublicReference(value: string) {
  const match = value.match(/^([^?#]*)([?#].*)?$/);
  if (!match) return value;
  return `${PUBLIC_REFERENCE_ALIASES[match[1]] || match[1]}${match[2] || ''}`;
}

function isPreservedValueKey(key?: string) {
  if (!key) return false;
  return (
    PRESERVED_VALUE_KEYS.has(key) ||
    /(?:^|_)(?:image|images|icon|logo|banner|video|file|filename|asset|handle|slug|path|url|href|src)$/i.test(key)
  );
}

export function sanitizePublicCopy<T>(value: T): T {
  if (typeof value !== 'string' || !value) return value;

  let sanitized: string = value;
  for (const [pattern, replacement] of SAFE_UTF8_REPLACEMENTS) {
    sanitized = sanitized.replace(pattern, replacement);
  }
  for (const [pattern, replacement] of COPY_REPLACEMENTS) {
    sanitized = sanitized.replace(pattern, replacement);
  }
  sanitized = normalizeRussianPlatformGrammar(sanitized);
  for (const [pattern, replacement] of PASSIVE_RESPONSE_REPLACEMENTS) {
    sanitized = sanitized.replace(pattern, replacement);
  }
  for (const [pattern, replacement] of QUALIFIED_CLAIM_REPLACEMENTS) {
    sanitized = sanitized.replace(pattern, replacement);
  }
  return sanitized as T;
}

export function sanitizePublicRichText<T>(value: T): T {
  if (typeof value !== 'string' || !value) return value;

  const sanitized = value
    .split(/(<[^>]+>)/g)
    .map((part) => {
      if (!part.startsWith('<')) return sanitizePublicCopy(part);

      return part.replace(
        /\b(alt|title|aria-label)=(["'])(.*?)\2/gi,
        (_match, attribute, quote, attributeValue) =>
          `${attribute}=${quote}${sanitizePublicCopy(attributeValue)}${quote}`,
      ).replace(
        /\b(src|href)=(["'])(.*?)\2/gi,
        (_match, attribute, quote, attributeValue) =>
          `${attribute}=${quote}${sanitizePublicReference(attributeValue)}${quote}`,
      );
    })
    .join('');

  return sanitized as T;
}

function sanitizeStructuredString(value: string, key?: string) {
  const trimmed = value.trim();

  if (key && /(?:detail_html|content)(?:_|$)/i.test(key)) {
    return sanitizePublicRichText(value);
  }

  if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
    try {
      return JSON.stringify(sanitizePublicRecord(JSON.parse(value)));
    } catch {
      // Keep processing as ordinary copy when the value is not valid JSON.
    }
  }

  return sanitizePublicCopy(value);
}

export function sanitizePublicRecord<T>(value: T, key?: string): T {
  if (typeof value === 'string') {
    if (
      isPreservedValueKey(key) ||
      value.startsWith('/') ||
      value.startsWith('http://') ||
      value.startsWith('https://') ||
      value.startsWith('data:')
    ) {
      return (value.startsWith('/') ? sanitizePublicReference(value) : value) as T;
    }
    return sanitizeStructuredString(value, key) as T;
  }

  if (Array.isArray(value)) {
    if (isPreservedValueKey(key)) return value;
    return value.map((item) => sanitizePublicRecord(item)) as T;
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([entryKey, entryValue]) => [
        entryKey,
        sanitizePublicRecord(entryValue, entryKey),
      ]),
    ) as T;
  }

  return value;
}

const STRUCTURED_DATA_URL_KEYS = new Set([
  '@id',
  'url',
  'item',
  'image',
  'logo',
  'contentUrl',
  'thumbnailUrl',
]);

export function sanitizePublicStructuredData<T>(value: T, key?: string): T {
  if (typeof value === 'string') {
    return (key && STRUCTURED_DATA_URL_KEYS.has(key) ? value : sanitizePublicCopy(value)) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizePublicStructuredData(item)) as T;
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([entryKey, entryValue]) => [
        entryKey,
        sanitizePublicStructuredData(entryValue, entryKey),
      ]),
    ) as T;
  }

  return value;
}
