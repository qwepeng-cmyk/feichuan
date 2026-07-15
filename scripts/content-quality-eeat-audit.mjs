import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { todayStamp } from './ntet-seo-utils.mjs';

const ROOT = process.cwd();
const DATE_STAMP = process.env.AUDIT_DATE || todayStamp();
const DEFAULT_STATIC_DIR = join(ROOT, '.next', 'server', 'app');
const staticDir = resolve(process.env.AUDIT_STATIC_DIR || DEFAULT_STATIC_DIR);
const keywordCsvPath = join(ROOT, 'docs', 'seo', `keyword-landing-audit-${DATE_STAMP}.csv`);
const outputDir = join(ROOT, 'docs', 'seo');
const markdownPath = join(outputDir, `content-quality-eeat-audit-${DATE_STAMP}.md`);
const csvPath = join(outputDir, `content-quality-eeat-audit-${DATE_STAMP}.csv`);
const cachePath = join(ROOT, '.seo-cache', `content-quality-eeat-audit-${DATE_STAMP}.json`);

const HIGH_VALUE_EN_ROUTES = new Set([
  '/en',
  '/en/about',
  '/en/products',
  '/en/accessories',
  '/en/solutions',
  '/en/cases',
  '/en/media',
  '/en/contact',
  '/en/solutions/category/01_BorderPatrol',
  '/en/solutions/category/02_InfrastructureProtection',
  '/en/solutions/category/03_KeyAreaSecurity',
  '/en/solutions/category/04_EmergencyRescue',
  '/en/solutions/power-line-uav-intelligent-inspection-solution',
  '/en/solutions/water-conservancy-river-lake-uav-monitoring-solution',
  '/en/solutions/disaster-site-search-rescue-reconnaissance-uav-solution',
  '/en/solutions/chemical-plant-protection',
  '/en/solutions/smart-substation-unattended-uav-inspection-solution',
  '/en/solutions/post-disaster-emergency-communication-support-uav-solution',
  '/en/solutions/night-emergency-lighting-support-uav-solution',
  '/en/solutions/urban-high-rise-firefighting-emergency-uav-solution',
  '/en/solutions/uav-maritime-patrol',
  '/en/products/fc-yjtx-01-emergency-communication-drone',
  '/en/products/fc-yjxf-01-aerial-firefighting-drone',
  '/en/products/fc-yjzm-01-emergency-lighting-drone',
  '/en/products/fc-30',
  '/en/products/fc-225',
  '/en/products/bailey-bridge',
]);

const HIGH_VALUE_BASE_ROUTES = new Set(
  Array.from(HIGH_VALUE_EN_ROUTES, (route) => route.replace(/^\/en(?=\/|$)/, '') || '/')
);

const RESTRICTED_PUBLIC_TERMS = [
  /\bjammer\b/i,
  /\bjamming\b/i,
  /\bspoofing\b/i,
  /\bweapon\b/i,
  /\bshoot down\b/i,
  /\bforced?\s+landing\b/i,
  /反无人机/i,
  /反制/i,
  /干扰/i,
];

function isApprovedJammerTerm(route, pattern) {
  const base = route.replace(/^\/(?:en|ru|es|ar)(?=\/|$)/, '') || '/';
  if (/^\/products\/(?:directional-rf-interference-device|omni-directional-rf-interference-device)$/.test(base)) {
    return new Set([
      '\\bjammer\\b',
      '\\bjamming\\b',
      '\\bforced?\\s+landing\\b',
    ]).has(pattern.source);
  }

  if (/^\/solutions\/(?:drone-defender|drone-locator|drone-jammer)$/.test(base)) {
    return new Set([
      '\\bjammer\\b',
      '\\bjamming\\b',
    ]).has(pattern.source);
  }

  return false;
}

function stripApprovedJammerProductNames(text) {
  return text
    .replace(/\/solutions\/drone-jammer/gi, '/solutions/approved-fixed-site-rf-solution')
    .replace(/\b(?:Omni-directional|Directional)\s+RF\s+Jammer\b/gi, 'approved fixed-site RF product')
    .replace(/\bDrone\s+Jammer\b/gi, 'approved fixed-site RF solution');
}

function ensureParentDir(filePath) {
  mkdirSync(dirname(filePath), { recursive: true });
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = '';
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"') {
      if (quoted && next === '"') {
        value += '"';
        i += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === ',' && !quoted) {
      row.push(value);
      value = '';
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && next === '\n') i += 1;
      row.push(value);
      if (row.some((cell) => cell !== '')) rows.push(row);
      row = [];
      value = '';
    } else {
      value += char;
    }
  }
  row.push(value);
  if (row.some((cell) => cell !== '')) rows.push(row);

  const headers = rows[0].map((item) => item.trim());
  return rows.slice(1).map((cells) => Object.fromEntries(headers.map((header, index) => [header, cells[index] || ''])));
}

function csvEscape(value) {
  const text = Array.isArray(value) ? value.join(' | ') : String(value ?? '');
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function decodeHtml(value = '') {
  return String(value)
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number.parseInt(dec, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
}

function stripHtml(value = '') {
  return decodeHtml(value)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeText(value = '') {
  return decodeHtml(value)
    .toLocaleLowerCase()
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[‐‑‒–—―]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

function countWords(text) {
  return (normalizeText(text).match(/[\p{L}\p{N}]+(?:[-'][\p{L}\p{N}]+)*/gu) || []).length;
}

function extractAttr(tag, name) {
  const pattern = new RegExp(`${name}\\s*=\\s*(["'])(.*?)\\1`, 'i');
  return decodeHtml(tag.match(pattern)?.[2] || '').trim();
}

function extractHeadings(html, level) {
  const pattern = new RegExp(`<h${level}\\b[^>]*>([\\s\\S]*?)<\\/h${level}>`, 'gi');
  return Array.from(html.matchAll(pattern), (match) => stripHtml(match[1])).filter(Boolean);
}

function extractTitle(html) {
  return decodeHtml(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '').trim();
}

function extractMeta(html, name) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`<meta\\s+[^>]*name=["']${escapedName}["'][^>]*content=["']([^"']*)["'][^>]*>`, 'i');
  return decodeHtml(html.match(pattern)?.[1] || '').trim();
}

function extractParagraphs(html) {
  return Array.from(html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi), (match) => stripHtml(match[1]))
    .filter(Boolean);
}

function extractImages(html) {
  return Array.from(html.matchAll(/<img\b[^>]*>/gi), (match) => {
    const tag = match[0];
    return {
      src: extractAttr(tag, 'src'),
      alt: extractAttr(tag, 'alt'),
    };
  });
}

function extractLinks(html) {
  return Array.from(html.matchAll(/<a\b[^>]*>/gi), (match) => {
    const tag = match[0];
    const href = extractAttr(tag, 'href');
    const rest = html.slice(match.index + tag.length);
    const anchor = stripHtml(rest.slice(0, rest.search(/<\/a>/i) >= 0 ? rest.search(/<\/a>/i) : 0));
    return { href, anchor };
  }).filter((link) => link.href);
}

function extractJsonLdTypes(html) {
  const scripts = Array.from(html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi));
  const types = new Set();

  function collect(value) {
    if (!value || typeof value !== 'object') return;
    if (Array.isArray(value)) {
      value.forEach(collect);
      return;
    }
    const type = value['@type'];
    if (Array.isArray(type)) type.forEach((item) => types.add(String(item)));
    if (type) types.add(String(type));
    if (value['@graph']) collect(value['@graph']);
    Object.values(value).forEach((item) => {
      if (item && typeof item === 'object') collect(item);
    });
  }

  for (const script of scripts) {
    try {
      collect(JSON.parse(decodeHtml(script[1]).trim()));
    } catch {
      // Next.js may occasionally inline non-parseable chunks; ignore those.
    }
  }

  return Array.from(types);
}

function localeFromRoute(route) {
  if (route === '/es' || route.startsWith('/es/')) return 'es';
  if (route === '/ru' || route.startsWith('/ru/')) return 'ru';
  if (route === '/ar' || route.startsWith('/ar/')) return 'ar';
  return 'en';
}

function routeWithoutLocale(route) {
  return route.replace(/^\/(?:en|es|ru|ar)(?=\/|$)/, '') || '/';
}

function isHighValueRoute(route) {
  return HIGH_VALUE_BASE_ROUTES.has(routeWithoutLocale(route));
}

function pageType(route) {
  const path = routeWithoutLocale(route);
  if (path === '/') return 'home';
  if (path === '/about') return 'about';
  if (path === '/contact') return 'contact';
  if (path === '/products') return 'product_list';
  if (path === '/accessories') return 'accessory_list';
  if (path.startsWith('/products/')) return 'product_detail';
  if (path.startsWith('/accessories/')) return 'accessory_detail';
  if (path === '/solutions') return 'solution_list';
  if (path.startsWith('/solutions/category/')) return 'solution_category';
  if (path.startsWith('/solutions/')) return 'solution_detail';
  if (path === '/cases') return 'case_list';
  if (path.startsWith('/cases/')) return 'case_detail';
  if (path === '/media') return 'media_list';
  if (path.startsWith('/media/')) return 'media_article';
  return 'other';
}

function contentFloor(type) {
  return {
    home: 500,
    about: 500,
    contact: 250,
    product_list: 650,
    accessory_list: 500,
    product_detail: 400,
    accessory_detail: 300,
    solution_list: 650,
    solution_category: 700,
    solution_detail: 800,
    case_list: 500,
    case_detail: 500,
    media_list: 450,
    media_article: 1200,
    other: 400,
  }[type] || 400;
}

function internalLinkTarget(href) {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
  return href.startsWith('/') || href.includes('n-tet.com');
}

function descriptiveAnchor(anchor) {
  const text = normalizeText(anchor);
  if (!text || text.length < 4) return false;
  return !/^(learn more|read more|view details|explore all|more|home|products|solutions|cases|media|contact|查看详情|更多|подробнее|читать далее|ver más|más información)$/i.test(text);
}

function signalSet(text, html, links, schemaTypes) {
  const lower = normalizeText(text);
  const linkText = normalizeText(links.map((link) => link.anchor).join(' '));
  return {
    hasFaq: /\bfaq\b|frequently asked|preguntas frecuentes|الأسئلة الشائعة|أسئلة شائعة|часто задаваем/i.test(text),
    hasSpecs: /specification|technical specs|parameter|payload|endurance|range|resolution|sensor|gimbal|table|parámetro|especificaci|المواصفات|المعيار|الحمولة|المدى|المستشعر|параметр|характеристик|спецификац/i.test(text),
    hasCases: /case|project|deployment|application|site|scenario|reference|caso|proyecto|aplicaci|مشروع|حالة|نشر|تطبيق|سيناريو|مرجع|проект|кейс|применен|развертыван/i.test(text),
    hasWorkflow: /workflow|process|module|operation|patrol|inspection|monitoring|flujo|proceso|سير العمل|عملية|تفتيش|مراقبة|دورية|تشغيل|модул|процесс|инспекц|мониторинг/i.test(text),
    hasDate: /<time\b/i.test(html) || /\b20[12]\d[-/.年]\d{1,2}|updated|published|date|fecha|تاريخ|نشر|منشور|дата/i.test(text),
    hasAuthor: /author|byline|written by|editor|autor|كاتب|محرر|فريق المحتوى|автор/i.test(text),
    hasStats: /\b\d+(?:\.\d+)?\s*(?:%|km|m|kg|h|min|hours|minutes|w|v|mah|mp|gb|hz|mhz|ghz|℃|°c|point|points|checkpoint|checkpoints|punto|puntos|пункт|пункта|пунктов)\b/i.test(lower),
    hasTable: /<table\b/i.test(html),
    hasList: /<(?:ul|ol)\b/i.test(html),
    hasInquiry: /quotation|quote|inquiry|contact|consultation|brochure|cotizaci|consulta|عرض سعر|استفسار|اتصل|استشارة|связаться|запрос|кп/i.test(text),
    hasRelatedProducts: /recommended products|related products|product recommendations|productos recomendados|منتجات موصى بها|منتجات ذات صلة|معدات ذات صلة|связанное оборудование|рекомендуемые продукты/i.test(text + ' ' + linkText),
    hasOrganizationSchema: schemaTypes.includes('Organization'),
    hasProductSchema: schemaTypes.includes('Product'),
    hasServiceSchema: schemaTypes.includes('Service'),
    hasArticleSchema: schemaTypes.includes('Article') || schemaTypes.includes('NewsArticle'),
    hasBreadcrumbSchema: schemaTypes.includes('BreadcrumbList'),
  };
}

function cap(value, max) {
  return Math.min(max, Math.max(0, value));
}

function scoreByRatio(value, target, max) {
  if (!target) return max;
  return cap((value / target) * max, max);
}

function expectedSignals(type) {
  if (type === 'media_article') return ['hasDate', 'hasArticleSchema', 'hasStats', 'hasList'];
  if (type === 'product_detail' || type === 'accessory_detail') return ['hasSpecs', 'hasProductSchema', 'hasInquiry'];
  if (type === 'solution_detail') return ['hasWorkflow', 'hasCases', 'hasServiceSchema', 'hasRelatedProducts'];
  if (type === 'solution_category') return ['hasWorkflow', 'hasRelatedProducts', 'hasInquiry'];
  if (type === 'case_detail') return ['hasCases', 'hasArticleSchema', 'hasRelatedProducts'];
  if (type.includes('list')) return ['hasWorkflow', 'hasInquiry'];
  if (type === 'about') return ['hasOrganizationSchema', 'hasInquiry'];
  if (type === 'contact') return ['hasOrganizationSchema', 'hasInquiry'];
  return ['hasWorkflow', 'hasInquiry'];
}

function analyzePage(row) {
  const filePath = resolve(ROOT, row.file);
  const html = existsSync(filePath) ? readFileSync(filePath, 'utf8') : '';
  const text = stripHtml(html);
  const type = pageType(row.route);
  const floor = contentFloor(type);
  const title = extractTitle(html);
  const description = extractMeta(html, 'description');
  const headings = {
    h1: extractHeadings(html, 1),
    h2: extractHeadings(html, 2),
    h3: extractHeadings(html, 3),
  };
  const paragraphs = extractParagraphs(html);
  const contentParagraphs = paragraphs.filter((item) => countWords(item) >= 18);
  const images = extractImages(html);
  const links = extractLinks(html);
  const internalLinks = links.filter((link) => internalLinkTarget(link.href));
  const descriptiveInternalLinks = internalLinks.filter((link) => descriptiveAnchor(link.anchor));
  const schemaTypes = extractJsonLdTypes(html);
  const signals = signalSet(text, html, links, schemaTypes);
  const words = Number(row.body_words) || countWords(text);
  const missingAlt = images.filter((image) => image.src && !image.alt).length;
  const emptyAltRatio = images.length ? missingAlt / images.length : 0;
  const requiredSignals = expectedSignals(type);
  const presentRequiredSignals = requiredSignals.filter((signal) => signals[signal]).length;
  const auditedText = stripApprovedJammerProductNames(text);
  const restrictedTermHits = RESTRICTED_PUBLIC_TERMS.filter(
    (pattern) => pattern.test(auditedText) && !isApprovedJammerTerm(row.route, pattern)
  ).length;

  const searchIntentScore = Math.round(
    scoreByRatio(words, floor, 22) +
    scoreByRatio(contentParagraphs.length, type === 'media_article' ? 8 : 4, 18) +
    scoreByRatio(presentRequiredSignals, requiredSignals.length, 30) +
    scoreByRatio(descriptiveInternalLinks.length, type.includes('detail') ? 4 : 8, 15) +
    scoreByRatio(headings.h2.length, type === 'media_article' ? 3 : 2, 15)
  );

  const templateRiskPenalty =
    (headings.h2.join('|').length < 30 ? 8 : 0) +
    (contentParagraphs.length < 2 ? 10 : 0) +
    (words < floor ? 10 : 0);

  const contentQualityScore = Math.round(
    scoreByRatio(words, floor, 25) +
    scoreByRatio(headings.h2.length + headings.h3.length, type === 'media_article' ? 5 : 3, 20) +
    scoreByRatio(contentParagraphs.length, type === 'media_article' ? 8 : 4, 20) +
    scoreByRatio(images.length - missingAlt, type.includes('detail') ? 2 : 1, 15) +
    scoreByRatio(presentRequiredSignals, requiredSignals.length, 20) -
    templateRiskPenalty
  );

  const experience = Math.round(
    (signals.hasCases ? 8 : 0) +
    (signals.hasStats ? 5 : 0) +
    scoreByRatio(images.length - missingAlt, 2, 5) +
    (/field|site|deployment|operator|project|case|现场|项目|موقع|نشر|مشروع|مشغل|حالة|развертыван|проект|caso|proyecto/i.test(text) ? 7 : 0)
  );
  const expertise = Math.round(
    (signals.hasSpecs ? 8 : 0) +
    (signals.hasWorkflow ? 6 : 0) +
    (signals.hasProductSchema || signals.hasServiceSchema || signals.hasArticleSchema ? 5 : 0) +
    scoreByRatio(headings.h2.length + headings.h3.length, 4, 6)
  );
  const authority = Math.round(
    scoreByRatio(descriptiveInternalLinks.length, type.includes('detail') ? 4 : 8, 10) +
    (signals.hasOrganizationSchema ? 5 : 0) +
    (signals.hasRelatedProducts ? 5 : 0) +
    (signals.hasArticleSchema && signals.hasDate ? 5 : 0)
  );
  const trust = Math.round(
    (title ? 4 : 0) +
    (description ? 4 : 0) +
    (signals.hasInquiry ? 5 : 0) +
    (signals.hasBreadcrumbSchema ? 4 : 0) +
    (restrictedTermHits === 0 ? 6 : 0) +
    (emptyAltRatio <= 0.25 ? 2 : 0)
  );
  const eeatScore = Math.round(experience + expertise + authority + trust);

  const aiCitationScore = Math.round(
    scoreByRatio(headings.h2.length, 3, 20) +
    (signals.hasArticleSchema || signals.hasProductSchema || signals.hasServiceSchema ? 18 : 0) +
    (signals.hasStats ? 14 : 0) +
    (signals.hasTable || signals.hasList ? 14 : 0) +
    scoreByRatio(contentParagraphs.length, type === 'media_article' ? 8 : 4, 18) +
    (signals.hasFaq ? 8 : 0) +
    (signals.hasDate ? 8 : 0)
  );

  const issues = [];
  const recommendations = [];
  if (words < floor) {
    issues.push(`内容深度不足：正文约 ${words} 词，建议 ${floor}+`);
    recommendations.push('补充搜索意图段落：适用场景、采购/部署关注点、限制条件和下一步行动');
  }
  if (contentParagraphs.length < (type === 'media_article' ? 6 : 3)) {
    issues.push('有效正文段落偏少');
    recommendations.push('增加 3-6 个有信息量的段落，避免只靠卡片、导航和短摘要支撑页面');
  }
  if (headings.h2.length < (type === 'media_article' ? 3 : 2)) {
    issues.push('H2 结构偏薄');
    recommendations.push('增加围绕搜索意图的 H2：应用场景、工作流程、技术参数、案例证据、FAQ');
  }
  if (presentRequiredSignals < requiredSignals.length) {
    issues.push(`缺少页面类型应有证据：${requiredSignals.filter((signal) => !signals[signal]).join(', ')}`);
    recommendations.push('按页面类型补齐证据模块，而不是继续堆关键词');
  }
  if (missingAlt > 0) {
    issues.push(`图片 alt 缺失 ${missingAlt}/${images.length}`);
    recommendations.push('给关键图片补充描述性 alt，保持与页面实体和应用场景一致');
  }
  if (!schemaTypes.length) {
    issues.push('缺少 JSON-LD Schema');
    recommendations.push('补充 Organization / Product / Service / Article / BreadcrumbList 等匹配页面类型的 Schema');
  }
  if (descriptiveInternalLinks.length < (type.includes('detail') ? 3 : 6)) {
    issues.push('描述性内链不足');
    recommendations.push('增加到相关产品、方案、案例、资讯的描述性锚文本内链');
  }
  if ((type === 'media_article' || type === 'case_detail') && !signals.hasDate) {
    issues.push('文章/案例缺少明显日期信号');
    recommendations.push('补充发布日期或最后更新时间，提升可信度与 freshness');
  }
  if (type === 'media_article' && !signals.hasAuthor) {
    issues.push('媒体文章缺少作者/编辑责任信号');
    recommendations.push('增加作者、编辑或 N-TET 技术团队署名及审核说明');
  }
  if (!signals.hasFaq && ['product_detail', 'solution_detail', 'solution_category', 'product_list'].includes(type)) {
    issues.push('缺少 FAQ / 采购问题解答模块');
    recommendations.push('增加 3-5 个真实采购/部署问题，提升长尾覆盖和 AI 引用可读性');
  }
  if (restrictedTermHits > 0) {
    issues.push('发现公开风险词，需要合规复核');
    recommendations.push('按 complianceTaxonomy 替换为低空监测/态势感知/合规响应措辞');
  }

  const minScore = Math.min(searchIntentScore, contentQualityScore, eeatScore, aiCitationScore);
  const priority =
    restrictedTermHits > 0 ? 'P0 合规复核' :
    row.status === 'partial' && minScore < 70 ? 'P1 需要补内容' :
    minScore < 60 ? 'P1 需要补内容' :
    minScore < 75 ? 'P2 建议增强' :
    'P3 保持监测';

  return {
    route: row.route,
    locale: row.keyword_locale || localeFromRoute(row.route),
    page_type: type,
    keyword_status: row.status,
    keyword_score: row.score,
    primary_keyword: row.primary_keyword,
    audit_scope: [
      row.status === 'partial' ? 'partial_keyword_page' : '',
      isHighValueRoute(row.route) ? `high_value_${row.keyword_locale || localeFromRoute(row.route)}` : '',
    ].filter(Boolean).join(' + ') || 'full_inventory',
    words,
    content_paragraphs: contentParagraphs.length,
    h1_count: headings.h1.length,
    h2_count: headings.h2.length,
    h3_count: headings.h3.length,
    image_count: images.length,
    missing_alt_count: missingAlt,
    internal_links: internalLinks.length,
    descriptive_internal_links: descriptiveInternalLinks.length,
    schema_types: schemaTypes.join(' | '),
    search_intent_score: searchIntentScore,
    content_quality_score: cap(contentQualityScore, 100),
    experience_score: cap(experience, 25),
    expertise_score: cap(expertise, 25),
    authority_score: cap(authority, 25),
    trust_score: cap(trust, 25),
    eeat_score: cap(eeatScore, 100),
    ai_citation_score: cap(aiCitationScore, 100),
    priority,
    issues: Array.from(new Set(issues)).join('; '),
    recommendations: Array.from(new Set(recommendations)).slice(0, 4).join('; '),
    title,
    h1: headings.h1.join(' | '),
    h2: headings.h2.slice(0, 8).join(' | '),
    file: row.file,
  };
}

function writeCsv(rows) {
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(','), ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(','))];
  ensureParentDir(csvPath);
  writeFileSync(csvPath, `\uFEFF${lines.join('\n')}\n`, 'utf8');
}

function mdCell(value) {
  return String(value ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function pageTable(rows) {
  if (!rows.length) return ['无。'];
  return [
    '| 页面 | 范围 | 关键词 | 意图 | 内容 | E-E-A-T | AI引用 | 主要问题 |',
    '| --- | --- | --- | ---: | ---: | ---: | ---: | --- |',
    ...rows.map((row) => `| ${mdCell(row.route)} | ${mdCell(row.audit_scope)} | ${row.keyword_status}/${row.keyword_score} | ${row.search_intent_score} | ${row.content_quality_score} | ${row.eeat_score} | ${row.ai_citation_score} | ${mdCell(row.issues || '无')} |`),
  ];
}

function scoreBand(rows, field, max = 100) {
  const avg = rows.length ? rows.reduce((sum, row) => sum + Number(row[field]), 0) / rows.length : 0;
  return `${avg.toFixed(1)}/${max}`;
}

function writeMarkdown(rows) {
  const selected = rows.filter((row) => row.audit_scope !== 'full_inventory');
  const partialRows = selected.filter((row) => row.audit_scope.includes('partial_keyword_page'));
  const highValueRows = selected.filter((row) => row.audit_scope.includes('high_value_'));
  const p1Rows = selected
    .filter((row) => row.priority.startsWith('P0') || row.priority.startsWith('P1'))
    .sort((a, b) => {
      const aScore = Math.min(a.search_intent_score, a.content_quality_score, a.eeat_score, a.ai_citation_score);
      const bScore = Math.min(b.search_intent_score, b.content_quality_score, b.eeat_score, b.ai_citation_score);
      return aScore - bScore || a.route.localeCompare(b.route);
    });
  const p2Rows = selected
    .filter((row) => row.priority.startsWith('P2'))
    .sort((a, b) => a.content_quality_score - b.content_quality_score || a.route.localeCompare(b.route));
  const missingFaq = selected.filter((row) => /缺少 FAQ/.test(row.issues)).length;
  const missingAuthor = selected.filter((row) => /缺少作者/.test(row.issues)).length;
  const thin = selected.filter((row) => /内容深度不足|有效正文段落偏少/.test(row.issues)).length;
  const weakLinks = selected.filter((row) => /描述性内链不足/.test(row.issues)).length;
  const altIssues = selected.filter((row) => /图片 alt 缺失/.test(row.issues)).length;
  const schemaIssues = selected.filter((row) => /缺少 JSON-LD/.test(row.issues)).length;
  const complianceIssues = selected.filter((row) => row.priority.startsWith('P0')).length;

  const report = [
    '# 内容质量 + E-E-A-T + 搜索意图审计',
    '',
    `生成日期：${DATE_STAMP}`,
    `HTML 来源：${relative(ROOT, staticDir).replace(/\\/g, '/')}`,
    `关键词审计输入：${relative(ROOT, keywordCsvPath).replace(/\\/g, '/')}`,
    `完整 CSV：${relative(ROOT, csvPath).replace(/\\/g, '/')}`,
    '',
    '## 审计范围',
    '',
    `- 全量公开页面扫描：${rows.length} 个页面`,
    `- 重点审计页面：${selected.length} 个页面`,
    `- 其中 partial 关键词页面：${partialRows.length} 个页面`,
    `- 高价值英文 landing pages：${highValueRows.length} 个页面`,
    '- 排除范围：后台、API、preview、thank-you、restricted 不可公开页面。',
    '',
    '## 总览结论',
    '',
    `- 搜索意图覆盖均分：${scoreBand(selected, 'search_intent_score')}`,
    `- 内容质量均分：${scoreBand(selected, 'content_quality_score')}`,
    `- E-E-A-T 均分：${scoreBand(selected, 'eeat_score')}`,
    `- AI 引用准备度均分：${scoreBand(selected, 'ai_citation_score')}`,
    `- P0 合规复核：${complianceIssues}`,
    `- P1 需要补内容：${p1Rows.filter((row) => row.priority.startsWith('P1')).length}`,
    `- P2 建议增强：${p2Rows.length}`,
    '',
    '## 主要内容缺口',
    '',
    `- 薄内容 / 有效正文不足：${thin}`,
    `- FAQ / 采购问题模块不足：${missingFaq}`,
    `- 媒体文章缺少作者或编辑责任信号：${missingAuthor}`,
    `- 描述性内链不足：${weakLinks}`,
    `- 图片 alt 需要补强：${altIssues}`,
    `- Schema 类型缺口：${schemaIssues}`,
    '',
    '## P1 优先补内容页面',
    '',
    ...pageTable(p1Rows),
    '',
    '## P2 建议增强页面',
    '',
    ...pageTable(p2Rows.slice(0, 40)),
    '',
    '## 25 个 partial 页面内容诊断',
    '',
    ...pageTable(partialRows),
    '',
    '## 高价值英文 Landing Pages 诊断',
    '',
    ...pageTable(highValueRows),
    '',
    '## 怎么改',
    '',
    '1. partial 页面不要继续只补关键词，先补正文深度、H2 结构和页面类型证据。',
    '2. 产品/方案页优先补：应用场景、技术参数、选型注意事项、相关案例、FAQ、推荐产品内链。',
    '3. 媒体文章优先补：作者/编辑责任、更新时间、数据点、引用来源、结论摘要和相关页面内链。',
    '4. 英文高价值 landing pages 优先补 FAQ 和可引用短段落，提升 GEO / AI citation readiness。',
    '5. 所有公开页面继续遵守 N-TET A/B/C guardrails；restricted 词和 restricted URL 不进入公开扩展。',
    '',
    '## 风险分层',
    '',
    '- Advertising compliance risk：本次脚本检查重点页面未发现 P0 公开风险词命中；仍建议每次内容扩展后跑 `audit:public-risk`。',
    '- SEO risk：主要风险从“关键词未落地”转为“内容深度、页面类型证据和内链不足”。',
    '- GEO / AI visibility risk：缺少 FAQ、数据点、作者/更新时间和结构化短答案的页面，不利于 AI 引用。',
    '- Public visibility leaks：本审计读取 build 后公开 HTML，不包含后台/API/preview；restricted 页面仍应保持不可公开。',
  ];

  ensureParentDir(markdownPath);
  writeFileSync(markdownPath, `${report.join('\n')}\n`, 'utf8');
}

function writeCache(rows) {
  const selected = rows.filter((row) => row.audit_scope !== 'full_inventory');
  const cache = {
    cache_type: 'content_quality_eeat_audit',
    analyzed_at: new Date().toISOString(),
    source: {
      static_dir: relative(ROOT, staticDir).replace(/\\/g, '/'),
      keyword_audit_csv: relative(ROOT, keywordCsvPath).replace(/\\/g, '/'),
    },
    scope: {
      full_pages: rows.length,
      focused_pages: selected.length,
      partial_keyword_pages: selected.filter((row) => row.audit_scope.includes('partial_keyword_page')).length,
      high_value_pages: selected.filter((row) => row.audit_scope.includes('high_value_')).length,
      high_value_ar_pages: selected.filter((row) => row.audit_scope.includes('high_value_ar')).length,
    },
    key_findings: {
      p1_pages: selected.filter((row) => row.priority.startsWith('P1')).map((row) => row.route),
      p2_pages: selected.filter((row) => row.priority.startsWith('P2')).map((row) => row.route),
      common_issues: [
        'FAQ / buyer questions are missing on many product and solution pages',
        'Media articles need stronger author/editor and freshness signals',
        'Some pages need more descriptive internal anchors to reinforce clusters',
      ],
    },
    limitations: [
      'Static HTML heuristic audit; it does not replace manual editorial review.',
      'Search intent scoring uses page-type signals, not live SERP comparison.',
    ],
  };
  ensureParentDir(cachePath);
  writeFileSync(cachePath, `${JSON.stringify(cache, null, 2)}\n`, 'utf8');
}

if (!existsSync(staticDir)) {
  console.error(`Static app directory not found: ${staticDir}`);
  console.error('Run `npm run build` first, or set AUDIT_STATIC_DIR to a built .next/server/app directory.');
  process.exit(1);
}

if (!existsSync(keywordCsvPath)) {
  console.error(`Keyword landing audit CSV not found: ${keywordCsvPath}`);
  console.error('Run `npm run audit:keywords` first.');
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });

const keywordRows = parseCsv(readFileSync(keywordCsvPath, 'utf8').replace(/^\uFEFF/, ''))
  .filter((row) => row.route && row.file && !/\/thank-you$|\/home-rebuild-preview$|\/products\/product-detail$/.test(row.route));

const analyzedRows = keywordRows.map(analyzePage).sort((a, b) => a.route.localeCompare(b.route));

writeCsv(analyzedRows);
writeMarkdown(analyzedRows);
writeCache(analyzedRows);

const focusedRows = analyzedRows.filter((row) => row.audit_scope !== 'full_inventory');
const p1 = focusedRows.filter((row) => row.priority.startsWith('P1')).length;
const p2 = focusedRows.filter((row) => row.priority.startsWith('P2')).length;

console.log(`Wrote ${markdownPath}`);
console.log(`Wrote ${csvPath}`);
console.log(`Wrote ${cachePath}`);
console.log(`Content quality audit: ${focusedRows.length} focused pages, ${p1} P1, ${p2} P2.`);
