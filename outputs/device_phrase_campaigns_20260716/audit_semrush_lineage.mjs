import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const files = [
  "C:/Users/admin/Downloads/drone-defender_broad-match_us_2026-07-15.xlsx",
  "C:/Users/admin/Downloads/drone-locator_broad-match_us_2026-07-15.xlsx",
  "C:/Users/admin/Downloads/drone-shield_broad-match_us_2026-07-15.xlsx",
  "C:/Users/admin/Downloads/drone-jammer_broad-match_us_2026-07-15.xlsx",
  "C:/Users/admin/Downloads/drone-detector_broad-match_us_2026-07-15.xlsx",
];

function normalize(value) {
  return String(value ?? "")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .trim()
    .replace(/^\"|\"$/g, "")
    .toLowerCase()
    .replace(/[-_]+/g, " ")
    .replace(/[^a-z0-9% ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(value) {
  return new Set(normalize(value).split(" ").filter(Boolean));
}

function similarity(a, b) {
  const aa = tokens(a);
  const bb = tokens(b);
  const intersection = [...aa].filter((token) => bb.has(token)).length;
  const union = new Set([...aa, ...bb]).size;
  return union ? intersection / union : 0;
}

const rawByFile = {};
const allRaw = new Map();
for (const file of files) {
  const wb = await SpreadsheetFile.importXlsx(await FileBlob.load(file));
  const sheet = wb.worksheets.getItemAt(0);
  const values = sheet.getUsedRange(true).values;
  let headerRow = -1;
  let keywordCol = -1;
  for (let r = 0; r < Math.min(values.length, 20); r += 1) {
    const row = values[r].map((value) => String(value ?? "").trim().toLowerCase());
    const col = row.findIndex((value) => value === "keyword");
    if (col >= 0) {
      headerRow = r;
      keywordCol = col;
      break;
    }
  }
  if (headerRow < 0) throw new Error(`${file}: Keyword header not found`);
  const keywords = values.slice(headerRow + 1)
    .map((row) => String(row[keywordCol] ?? "").trim())
    .filter(Boolean);
  const normalized = new Set(keywords.map(normalize).filter(Boolean));
  const name = path.basename(file);
  rawByFile[name] = { rows: keywords.length, unique: normalized.size, keywords, normalized: [...normalized] };
  for (const keyword of keywords) {
    const key = normalize(keyword);
    if (!key) continue;
    if (!allRaw.has(key)) allRaw.set(key, { raw: keyword, files: [] });
    allRaw.get(key).files.push(name);
  }
}

const [payload] = JSON.parse(await fs.readFile("D:/fc-cuas/outputs/device_phrase_campaigns_20260716/device_phrase_payload.json", "utf8"));
const index = new Map(payload.headers.map((header, i) => [header, i]));
const uniqueUpload = [...new Set(payload.rows.map((row) => String(row[index.get("Keyword")] ?? "")))];
const direct = [];
const generated = [];
for (const keyword of uniqueUpload) {
  const key = normalize(keyword);
  if (allRaw.has(key)) {
    direct.push({ keyword, files: [...new Set(allRaw.get(key).files)] });
  } else {
    const candidates = [...allRaw.entries()]
      .map(([normalized, item]) => ({ keyword: item.raw, normalized, files: [...new Set(item.files)], similarity: similarity(keyword, item.raw) }))
      .filter((item) => item.similarity > 0)
      .sort((a, b) => b.similarity - a.similarity || a.normalized.localeCompare(b.normalized))
      .slice(0, 3);
    generated.push({ keyword, nearestSemrush: candidates });
  }
}

const directBySource = {};
for (const item of direct) {
  for (const file of item.files) directBySource[file] = (directBySource[file] ?? 0) + 1;
}
const result = {
  uploadUniqueKeywords: uniqueUpload.length,
  semrushFiles: Object.fromEntries(Object.entries(rawByFile).map(([name, item]) => [name, { rows: item.rows, unique: item.unique }])),
  exactSemrushKeywords: direct.length,
  derivedOrManualKeywords: generated.length,
  exactShare: direct.length / uniqueUpload.length,
  directBySource,
  direct,
  derivedOrManual: generated,
};
await fs.writeFile("D:/fc-cuas/outputs/device_phrase_campaigns_20260716/semrush_lineage_audit.json", JSON.stringify(result, null, 2), "utf8");
console.log(JSON.stringify(result, null, 2));
