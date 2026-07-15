import fs from 'node:fs/promises';
import { Workbook } from '@oai/artifact-tool';

const outDir = 'D:/fc-cuas/outputs/lead_gap_diagnostic_20260715';
const inspection = JSON.parse(await fs.readFile(`${outDir}/source_inspection.json`, 'utf8'));

function num(v) {
  if (typeof v === 'number') return Number.isFinite(v) ? v : 0;
  const x = Number(String(v ?? '').replace(/[,%\s]/g, '').replace(/^--$/, ''));
  return Number.isFinite(x) ? x : 0;
}

async function csvRows(file, headerCue) {
  const bytes = await fs.readFile(file);
  const text = bytes[0] === 0xff && bytes[1] === 0xfe ? bytes.subarray(2).toString('utf16le') : bytes.toString('utf8').replace(/^\uFEFF/, '');
  const importText = text.includes('\t') ? text.replaceAll('\t', ',') : text;
  const wb = await Workbook.fromCSV(importText, { sheetName: 'Data' });
  const values = wb.worksheets.getItemAt(0).getUsedRange(true).values;
  const headerIdx = values.findIndex(r => r.some(v => String(v ?? '').trim() === headerCue));
  if (headerIdx < 0) throw new Error(`Header ${headerCue} not found in ${file}`);
  const headers = values[headerIdx].map(v => String(v ?? '').trim());
  const rows = values.slice(headerIdx + 1).filter(r => r.some(v => String(v ?? '').trim())).map(r => Object.fromEntries(headers.map((h,i)=>[h,r[i]]).filter(([h])=>h)));
  return { meta: values.slice(0,headerIdx), headers, rows };
}

const current = await csvRows('C:/Users/admin/Downloads/搜索关键字报告 (1).csv', '关键字状态');
const currentRows = current.rows.filter(r => String(r['关键字'] ?? '').trim() && !String(r['关键字']).startsWith('总计'));
const currentTotal = currentRows.reduce((a,r)=>({impressions:a.impressions+num(r['展示次数']),clicks:a.clicks+num(r['点击次数']),cost:a.cost+num(r['费用']),conversions:a.conversions+num(r['转化次数'])}),{impressions:0,clicks:0,cost:0,conversions:0});

const ga4 = await csvRows('C:/Users/admin/Downloads/网页和屏幕_网页路径和屏幕类.csv', '网页路径和屏幕类');
const ga4Rows = ga4.rows.map(r=>({
  path:String(r['网页路径和屏幕类'] ?? ''),
  views:num(r['浏览次数']),
  activeUsers:num(r['活跃用户']),
  viewsPerUser:num(r['每位活跃用户的浏览量']),
  avgEngagementSeconds:num(r['每位活跃用户的平均互动时长']),
  events:num(r['事件数']),
  keyEvents:num(r['关键事件数']),
}));

const keyword30 = inspection.results.keywords30[0];
const keyword7 = inspection.results.keywords7[0];
const actual30 = keyword30.total;
const actual7 = keyword7.total;
const southAmericaCampaigns = keyword30.byCampaign.filter(x=>/南美/.test(x.dimension));
const middleEastCampaigns = keyword30.byCampaign.filter(x=>/中东/.test(x.dimension));
const sum = (rows,k) => rows.reduce((a,r)=>a+num(r[k]),0);

const probabilityZero = {};
for (const rate of [0.005,0.01,0.015,0.02,0.03]) {
  probabilityZero[`${(rate*100).toFixed(1)}%`] = {
    clicks68: Math.pow(1-rate,68),
    clicks76: Math.pow(1-rate,76),
    expectedLeadsAt76: 76*rate,
  };
}

const highConcentration = {
  southAmericaClicks: sum(southAmericaCampaigns,'clicks'),
  southAmericaShare: sum(southAmericaCampaigns,'clicks')/actual30.clicks,
  middleEastClicks: sum(middleEastCampaigns,'clicks'),
  exactClicks: keyword30.byMatch.find(x=>x.dimension==='完全匹配')?.clicks ?? 0,
  exactShare: (keyword30.byMatch.find(x=>x.dimension==='完全匹配')?.clicks ?? 0)/actual30.clicks,
  genericLandingClicks: keyword30.byLandingPage.find(x=>/low-altitude-airspace-monitoring/.test(x.dimension))?.clicks ?? 0,
  genericLandingShare: (keyword30.byLandingPage.find(x=>/low-altitude-airspace-monitoring/.test(x.dimension))?.clicks ?? 0)/actual30.clicks,
  droneDetectorClicks: keyword30.byKeywordOrTerm.find(x=>x.dimension==='[drone detector]')?.clicks ?? 0,
  droneDetectorShare: (keyword30.byKeywordOrTerm.find(x=>x.dimension==='[drone detector]')?.clicks ?? 0)/actual30.clicks,
};

const ga4Relevant = ga4Rows.filter(r => /low-altitude-airspace-monitoring|thank-you|contact|drone-detector|drone-radar-detection|portable-drone-detection/i.test(r.path)).sort((a,b)=>b.views-a.views);

const analysis = {
  windows: {
    keyword30: keyword30.meta?.[1]?.[0],
    keyword7: keyword7.meta?.[1]?.[0],
    current: current.meta?.[1]?.[0],
    ga4Start: ga4.meta.find(r=>String(r[0]).includes('开始日期'))?.[0],
    ga4End: ga4.meta.find(r=>String(r[0]).includes('结束日期'))?.[0],
  },
  totals: { actual30, actual7, currentTotal },
  highConcentration,
  probabilityZero,
  topKeywordClicks: keyword30.byKeywordOrTerm.slice(0,30),
  campaignClicks: keyword30.byCampaign,
  landingPages: keyword30.byLandingPage,
  ga4Relevant,
  caveats: [
    'The 30-day export spans June 13 to July 12 and cannot isolate July 3-5 at daily grain.',
    'The search-term export is all-time, not restricted to the July 3-current window.',
    'The geographic and device exports are all-time and combine search, display, and remarketing.',
    'The production inquiry database could not be queried because SSH authentication was unavailable.',
  ],
};

await fs.writeFile(`${outDir}/analysis.json`, JSON.stringify(analysis,null,2),'utf8');
console.log(JSON.stringify(analysis,null,2));
