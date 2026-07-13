import fs from "node:fs/promises";

const data = JSON.parse(await fs.readFile("./sheet-1.json", "utf8"));
const rows = data.values;
const headers = rows[2].map((v, i) => ({ i, col: String.fromCharCode(65 + (i % 26)), header: v }));
console.log("HEADERS", JSON.stringify(headers));

const clean = (value) => String(value ?? "")
  .toLowerCase()
  .replace(/^['\"]+|['\"]+$/g, "")
  .replace(/[^a-z0-9+\- ]+/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const records = rows.slice(3).filter((r) => r?.[1]).map((r, idx) => ({
  row: idx + 4,
  keywordRaw: r[1],
  keyword: clean(r[1]),
  matchType: r[2],
  campaign: r[3],
  adGroup: r[4],
  status: r[5],
  impressions: Number(r[10]) || 0,
  interactions: Number(r[11]) || 0,
  cost: Number(r[14]) || 0,
  conversions: Number(r[29]) || 0,
}));

const counts = (field) => [...records.reduce((m, r) => m.set(r[field], (m.get(r[field]) || 0) + 1), new Map())]
  .sort((a, b) => b[1] - a[1]);
console.log("RECORDS", records.length);
console.log("CAMPAIGNS", JSON.stringify(counts("campaign")));
console.log("ADGROUPS", JSON.stringify(counts("adGroup")));

const deviceRegex = /\b(device|equipment|system|detector|detection|sensor|radar|camera|scanner|jammer|jamming|gun|receiver|antenna|monitor|tracker|tracking|interceptor|countermeasure|neutralizer|locator|finder|analyzer|platform|station|terminal)\b/i;
const rfRegex = /\b(rf|radio frequency|radio-frequency)\b/i;
const deviceRows = records.filter((r) => deviceRegex.test(r.keyword) && !rfRegex.test(r.keyword));
deviceRows.sort((a, b) => (b.interactions - a.interactions) || (b.impressions - a.impressions) || a.keyword.localeCompare(b.keyword));
console.log("DEVICE_ROWS", deviceRows.length);
console.log(JSON.stringify(deviceRows.slice(0, 500)));

const threeWord = records.filter((r) => r.keyword.split(/\s+/).length >= 2 && r.keyword.split(/\s+/).length <= 4 && !rfRegex.test(r.keyword));
threeWord.sort((a, b) => (b.interactions - a.interactions) || (b.impressions - a.impressions));
console.log("TOP_2_TO_4_WORD", JSON.stringify(threeWord.slice(0, 250)));
