import fs from 'node:fs';
import path from 'node:path';
import { todayStamp } from './ntet-seo-utils.mjs';

const ROOT = process.cwd();
const DATE_STAMP = process.env.AUDIT_DATE || todayStamp();
const AUDIT_CSV = path.join(ROOT, 'docs', 'seo', `keyword-landing-audit-${DATE_STAMP}.csv`);
const OUT_CSV = path.join(ROOT, 'docs', 'seo', `localized-seo-keyword-map-${DATE_STAMP}.csv`);
const OUT_MD = path.join(ROOT, 'docs', 'seo', `localized-seo-keyword-map-${DATE_STAMP}.md`);

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

function quoteCsv(value) {
  const text = String(value ?? '');
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function markdownCell(value) {
  return String(value ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function nextAction(row) {
  if (row.status === 'strong') return '保持当前本地化关键词落地';
  if (row.h1_hit !== 'true') return '优先把主关键词写入 H1';
  if (row.h2_hit !== 'true') return '把主/辅助关键词自然写入 H2';
  if (row.body_hit !== 'true') return '在首段或概览段补 1 句本地化关键词说明';
  return '复查 title、description 与关键词密度';
}

if (!fs.existsSync(AUDIT_CSV)) {
  throw new Error(`Missing keyword audit CSV: ${AUDIT_CSV}`);
}

const rows = parseCsv(fs.readFileSync(AUDIT_CSV, 'utf8').replace(/^\uFEFF/, ''));
const LOCALIZED_LOCALES = new Set(['es', 'ru', 'ar']);
const localizedRows = rows
  .filter((row) => LOCALIZED_LOCALES.has(row.keyword_locale))
  .map((row) => ({
    route: row.route,
    locale: row.keyword_locale,
    audit_status: row.status,
    audit_score: row.score,
    primary_keyword: row.primary_keyword,
    seo_keywords: row.keywords,
    current_title: row.title,
    current_h1: row.h1,
    current_h2: row.h2,
    title_hit: row.title_hit,
    description_hit: row.description_hit,
    h1_hit: row.h1_hit,
    h2_hit: row.h2_hit,
    body_hit: row.body_hit,
    keyword_density_pct: row.keyword_density_pct,
    next_action: nextAction(row),
  }))
  .sort((a, b) => a.locale.localeCompare(b.locale) || a.route.localeCompare(b.route));

const headers = Object.keys(localizedRows[0] || {
  route: '',
  locale: '',
  audit_status: '',
  audit_score: '',
  primary_keyword: '',
  seo_keywords: '',
  current_title: '',
  current_h1: '',
  current_h2: '',
  title_hit: '',
  description_hit: '',
  h1_hit: '',
  h2_hit: '',
  body_hit: '',
  keyword_density_pct: '',
  next_action: '',
});
const csv = [headers.join(','), ...localizedRows.map((row) => headers.map((header) => quoteCsv(row[header])).join(','))].join('\n');
fs.writeFileSync(OUT_CSV, `\uFEFF${csv}\n`, 'utf8');

const counts = localizedRows.reduce((acc, row) => {
  const key = `${row.locale}:${row.audit_status}`;
  acc[key] = (acc[key] || 0) + 1;
  return acc;
}, {});

const md = [
  '# 西语 / 俄语 / 阿拉伯语页面 SEO 关键词对应表',
  '',
  `生成日期：${DATE_STAMP}`,
  `来源审计：${path.relative(ROOT, AUDIT_CSV).replace(/\\/g, '/')}`,
  `完整 CSV：${path.relative(ROOT, OUT_CSV).replace(/\\/g, '/')}`,
  '',
  '## 覆盖概览',
  '',
  `- es strong：${counts['es:strong'] || 0}`,
  `- es partial：${counts['es:partial'] || 0}`,
  `- es weak：${counts['es:weak'] || 0}`,
  `- ru strong：${counts['ru:strong'] || 0}`,
  `- ru partial：${counts['ru:partial'] || 0}`,
  `- ru weak：${counts['ru:weak'] || 0}`,
  `- ar strong：${counts['ar:strong'] || 0}`,
  `- ar partial：${counts['ar:partial'] || 0}`,
  `- ar weak：${counts['ar:weak'] || 0}`,
  '',
  '## 重点映射',
  '',
  '| 页面 | 语言 | 状态 | 分数 | 主关键词 | H1 | H2 | 正文 | 下一步 |',
  '| --- | --- | --- | ---: | --- | --- | --- | --- | --- |',
  ...localizedRows
    .filter((row) => row.audit_status !== 'strong')
    .slice(0, 120)
    .map((row) => `| ${markdownCell(row.route)} | ${row.locale} | ${row.audit_status} | ${row.audit_score} | ${markdownCell(row.primary_keyword)} | ${row.h1_hit === 'true' ? '命中' : '未命中'} | ${row.h2_hit === 'true' ? '命中' : '未命中'} | ${row.body_hit === 'true' ? '命中' : '未命中'} | ${markdownCell(row.next_action)} |`),
  '',
];

fs.writeFileSync(OUT_MD, `${md.join('\n')}\n`, 'utf8');

console.log(`Wrote ${OUT_CSV}`);
console.log(`Wrote ${OUT_MD}`);
console.log(`Localized keyword map: ${localizedRows.length} es/ru/ar pages.`);
