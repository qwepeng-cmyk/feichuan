import fs from 'node:fs/promises';
import path from 'node:path';
import { FileBlob, SpreadsheetFile, Workbook } from '@oai/artifact-tool';

const outDir = 'D:/fc-cuas/outputs/lead_gap_diagnostic_20260715';
await fs.mkdir(outDir, { recursive: true });

const files = {
  keywords9: 'C:/Users/admin/Downloads/搜索关键字报告 (9).xlsx',
  keywords10: 'C:/Users/admin/Downloads/搜索关键字报告 (10).xlsx',
  keywords11: 'C:/Users/admin/Downloads/搜索关键字报告 (11).xlsx',
  keywords12: 'C:/Users/admin/Downloads/搜索关键字报告 (12).xlsx',
  keywords13: 'C:/Users/admin/Downloads/搜索关键字报告 (13).xlsx',
  keywords14: 'C:/Users/admin/Downloads/搜索关键字报告 (14).xlsx',
  keywords15: 'C:/Users/admin/Downloads/搜索关键字报告 (15).xlsx',
  keywords16: 'C:/Users/admin/Downloads/搜索关键字报告 (16).xlsx',
  keywords30: 'C:/Users/admin/Downloads/搜索关键字报告 (17).xlsx',
  keywords7: 'C:/Users/admin/Downloads/搜索关键字报告 (18).xlsx',
  keywordsJul14: 'C:/Users/admin/Downloads/搜索关键字报告 (1).csv',
  searchTerms: 'C:/Users/admin/Downloads/搜索字词报告 (8).xlsx',
  geo: 'C:/Users/admin/Downloads/地理位置报告.xlsx',
  device: 'C:/Users/admin/Downloads/设备报告.xlsx',
  ads: 'C:/Users/admin/Downloads/广告报告 (6).xlsx',
  ga4Pages: 'C:/Users/admin/Downloads/网页和屏幕_网页路径和屏幕类.csv',
  timeseriesA: 'C:/Users/admin/Downloads/时序图(2026.07.13).csv',
  timeseriesB: 'C:/Users/admin/Downloads/时序图(2026.07.13) (1).csv',
};

function n(v) {
  if (typeof v === 'number') return Number.isFinite(v) ? v : 0;
  if (v == null) return 0;
  const s = String(v).replace(/[,%\s]/g, '').replace(/^--$/, '');
  const x = Number(s);
  return Number.isFinite(x) ? x : 0;
}

function findHeader(rows) {
  let best = { idx: 0, score: -1 };
  const cues = ['点击次数','互动次数','展示次数','费用','关键字','搜索字词','广告系列','广告组','转化次数','最终到达网址','匹配类型','国家/地区','设备','页面路径和屏幕类','浏览量','活跃用户数','事件计数','关键事件'];
  rows.slice(0, 15).forEach((row, idx) => {
    const vals = row.map(v => String(v ?? '').trim());
    const score = cues.reduce((s, c) => s + (vals.some(v => v.includes(c)) ? 1 : 0), 0);
    if (score > best.score) best = { idx, score };
  });
  return best.idx;
}

function normalizeRows(values) {
  const headerIdx = findHeader(values);
  const headers = values[headerIdx].map(v => String(v ?? '').trim());
  let rows = values.slice(headerIdx + 1).filter(r => r.some(v => v !== null && v !== undefined && String(v).trim() !== '')).map(r => {
    const o = {};
    headers.forEach((h, i) => { if (h) o[h] = r[i]; });
    return o;
  });
  const has = (name) => headers.includes(name);
  if (has('关键字')) rows = rows.filter(r => String(r['关键字'] ?? '').trim() && String(r['关键字']).trim() !== '--');
  else if (has('搜索字词')) rows = rows.filter(r => String(r['搜索字词'] ?? '').trim() && String(r['搜索字词']).trim() !== '--');
  else if (has('广告状态')) rows = rows.filter(r => String(r['广告状态'] ?? '').trim() && !String(r['广告状态']).startsWith('总计'));
  else if (has('国家/地区')) rows = rows.filter(r => String(r['国家/地区'] ?? '').trim() && String(r['国家/地区']).trim() !== '--');
  else if (has('设备')) rows = rows.filter(r => ['手机','计算机','平板电脑','电视屏幕'].includes(String(r['设备'] ?? '').trim()));
  rows = rows.filter(r => !Object.values(r).some(v => /^总计[:：]/.test(String(v ?? '').trim())));
  return { meta: values.slice(0, headerIdx), headerIdx, headers, rows };
}

function keyOf(o, names) {
  for (const name of names) if (Object.hasOwn(o, name)) return name;
  return null;
}

function aggregate(rows, dimNames) {
  if (!rows.length) return [];
  const clickK = keyOf(rows[0], ['点击次数','点击','互动次数']);
  const impK = keyOf(rows[0], ['展示次数']);
  const costK = keyOf(rows[0], ['费用','成本']);
  const convK = keyOf(rows[0], ['转化次数','转化']);
  const dimK = keyOf(rows[0], dimNames);
  if (!dimK) return [];
  const m = new Map();
  for (const r of rows) {
    const k = String(r[dimK] ?? '(空白)');
    const x = m.get(k) ?? { dimension:k, impressions:0, clicks:0, cost:0, conversions:0 };
    x.impressions += n(r[impK]); x.clicks += n(r[clickK]); x.cost += n(r[costK]); x.conversions += n(r[convK]);
    m.set(k,x);
  }
  return [...m.values()].filter(x => x.impressions || x.clicks || x.cost || x.conversions).sort((a,b)=>b.clicks-a.clicks || b.cost-a.cost).slice(0,50);
}

function summarize(normalized) {
  const { rows, headers, meta, headerIdx } = normalized;
  const first = rows[0] ?? {};
  const clickK = keyOf(first, ['点击次数','点击','互动次数']);
  const impK = keyOf(first, ['展示次数']);
  const costK = keyOf(first, ['费用','成本']);
  const convK = keyOf(first, ['转化次数','转化']);
  const total = rows.reduce((a,r)=>({
    impressions:a.impressions+n(r[impK]), clicks:a.clicks+n(r[clickK]), cost:a.cost+n(r[costK]), conversions:a.conversions+n(r[convK])
  }),{impressions:0,clicks:0,cost:0,conversions:0});
  return {
    meta, headerIdx, headers, rowCount: rows.length, total,
    byCampaign: aggregate(rows,['广告系列']),
    byMatch: aggregate(rows,['匹配类型','搜索字词匹配类型']),
    byKeywordOrTerm: aggregate(rows,['搜索字词','搜索词','关键字']),
    byAdGroup: aggregate(rows,['广告组']),
    byLandingPage: aggregate(rows,['最终到达网址','最终到达网址展开']),
    byCountry: aggregate(rows,['国家/地区','匹配的地理位置','地理位置']),
    byDevice: aggregate(rows,['设备']),
  };
}

async function readXlsx(file) {
  const wb = await SpreadsheetFile.importXlsx(await FileBlob.load(file));
  const sheets = [];
  for (const ws of wb.worksheets.items) {
    const used = ws.getUsedRange(true);
    const values = used ? used.values : [];
    sheets.push({ name: ws.name, ...summarize(normalizeRows(values)) });
  }
  return sheets;
}

async function readCsv(file) {
  const bytes = await fs.readFile(file);
  const text = bytes[0] === 0xff && bytes[1] === 0xfe
    ? bytes.subarray(2).toString('utf16le')
    : bytes.toString('utf8').replace(/^\uFEFF/, '');
  const wb = await Workbook.fromCSV(text, { sheetName: path.basename(file) });
  const ws = wb.worksheets.getItemAt(0);
  const used = ws.getUsedRange(true);
  return [{ name: ws.name, ...summarize(normalizeRows(used ? used.values : [])) }];
}

const results = {};
for (const [name,file] of Object.entries(files)) {
  try {
    results[name] = file.toLowerCase().endsWith('.csv') ? await readCsv(file) : await readXlsx(file);
  } catch (e) {
    results[name] = { error: String(e?.stack ?? e) };
  }
}
await fs.writeFile(path.join(outDir,'source_inspection.json'), JSON.stringify({files,results},null,2),'utf8');
console.log(JSON.stringify(Object.fromEntries(Object.entries(results).map(([k,v])=>[k,Array.isArray(v)?v.map(s=>({name:s.name,meta:s.meta,headers:s.headers,rowCount:s.rowCount,total:s.total,topTerms:s.byKeywordOrTerm.slice(0,15),byCampaign:s.byCampaign.slice(0,10),byMatch:s.byMatch.slice(0,10),byLandingPage:s.byLandingPage.slice(0,10),byCountry:s.byCountry.slice(0,10),byDevice:s.byDevice.slice(0,10)})):v])),null,2));
