const COPY_REPLACEMENTS: Array<[RegExp, string]> = [
  [/\bcounter[\s_-]*u(?:as|av)\b/gi, 'Low-Altitude Defense'],
  [/\bc[\s_-]*uas\b/gi, 'Low-Altitude Defense'],
  [/\bcuas\b/gi, 'Low-Altitude Defense'],
  [/\banti[\s_-]*drone\b/gi, 'Low-Altitude Defense'],
  [/\banti[\s_-]*uav\b/gi, 'Low-Altitude Defense'],
  [/\bdrone(?:s)?\b/gi, 'низковысотная цель'],
  [/\buav(?:s)?\b/gi, 'воздушная платформа'],
  [/антидрон[а-яё-]*/gi, 'комплекс низковысотной защиты'],
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
];

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
  for (const [pattern, replacement] of COPY_REPLACEMENTS) {
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
