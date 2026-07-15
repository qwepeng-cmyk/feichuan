import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const outDir = "D:/fc-cuas/outputs/five_device_campaigns_20260715";
const fileNames = [
  "01_Campaigns_UPLOAD.xlsx",
  "02_Ad_Groups_UPLOAD.xlsx",
  "03_Keywords_UPLOAD.xlsx",
  "04_RSA_DKI_UPLOAD.xlsx",
  "05_Negative_Keywords_UPLOAD.xlsx",
  "06_Pause_Old_Keywords_AFTER_NEW_LIVE.xlsx",
];

async function readTable(fileName) {
  const wb = await SpreadsheetFile.importXlsx(await FileBlob.load(path.join(outDir, fileName)));
  const values = wb.worksheets.getItemAt(0).getUsedRange(true).values;
  const headers = values[0];
  return {
    headers,
    rows: values.slice(1).map((row) => Object.fromEntries(headers.map((header, i) => [header, row[i] ?? null]))),
  };
}

const [campaigns, adGroups, keywords, rsas, negatives, pauses] = await Promise.all(fileNames.map(readTable));
const campaignSet = new Set(campaigns.rows.map((row) => row.Campaign));
const adGroupSet = new Set(adGroups.rows.map((row) => `${row.Campaign}|${row["Ad group"]}`));
const duplicateKeys = (rows, keyFn) => {
  const seen = new Set();
  const duplicate = [];
  for (const row of rows) {
    const key = keyFn(row);
    if (seen.has(key)) duplicate.push(key);
    seen.add(key);
  }
  return [...new Set(duplicate)];
};

const normalized = (value) => String(value ?? "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const restricted = /\b(jammer|jamming|spoofing|gun|rifle|weapon|shoot down|forced landing|blocker)\b/;
const rsaAssetFields = [
  ...Array.from({ length: 15 }, (_, i) => `Headline ${i + 1}`),
  ...Array.from({ length: 4 }, (_, i) => `Description ${i + 1}`),
];
const checks = {
  allCampaignsPaused: campaigns.rows.every((row) => row["Campaign status"] === "Paused"),
  blankLocationsWhilePaused: campaigns.rows.every((row) => !row.Location && row["Campaign status"] === "Paused"),
  allChildCampaignRefsValid: [...adGroups.rows, ...keywords.rows, ...rsas.rows, ...negatives.rows].every((row) => campaignSet.has(row.Campaign)),
  allAdGroupRefsValid: [...keywords.rows, ...rsas.rows].every((row) => adGroupSet.has(`${row.Campaign}|${row["Ad group"]}`)),
  keywordTypesControlled: keywords.rows.every((row) => ["Exact match", "Phrase match"].includes(row.Type)),
  keywordDuplicateKeys: duplicateKeys(keywords.rows, (row) => `${row.Campaign}|${row["Ad group"]}|${normalized(row.Keyword)}|${row.Type}`),
  negativeDuplicateKeys: duplicateKeys(negatives.rows, (row) => `${row.Campaign}|${normalized(row["Negative keyword"])}|${row.Type}`),
  pauseDuplicateKeys: duplicateKeys(pauses.rows, (row) => `${row.Campaign}|${row["Ad group"]}|${String(row.Keyword).toLowerCase().trim()}|${row.Type}`),
  restrictedEnabledKeywords: keywords.rows.filter((row) => restricted.test(normalized(row.Keyword))).map((row) => row.Keyword),
  restrictedEnabledRsaAssets: rsas.rows.flatMap((row) => rsaAssetFields.filter((field) => row[field] && restricted.test(normalized(String(row[field]).replace(/\{KeyWord:([^}]+)\}/g, "$1")))).map((field) => ({ campaign: row.Campaign, adGroup: row["Ad group"], field, value: row[field] }))),
  allRsaAssetsUseDki: rsas.rows.every((row) => rsaAssetFields.every((field) => row[field] && /\{KeyWord:[^}]+\}/.test(row[field]))),
  allFinalUrlsAllowed: [...keywords.rows, ...rsas.rows].every((row) => /^https:\/\/n-tet\.com\/solutions\/(drone-detector|drone-radar-detection|portable-drone-detection|low-altitude-airspace-monitoring)$/.test(row["Final URL"])),
  jammerOnlyInNegatives: [campaigns, adGroups, keywords, rsas, pauses].every((table) => table.rows.every((row) => !Object.values(row).some((value) => typeof value === "string" && /\bjammer|jamming\b/i.test(value)))),
};

const failures = Object.entries(checks).filter(([key, value]) => Array.isArray(value) ? value.length > 0 : value !== true);
const result = {
  counts: {
    campaigns: campaigns.rows.length,
    adGroups: adGroups.rows.length,
    keywords: keywords.rows.length,
    rsas: rsas.rows.length,
    negatives: negatives.rows.length,
    pauses: pauses.rows.length,
  },
  checks,
  status: failures.length ? "FAIL" : "PASS",
  failures,
};

await fs.writeFile(path.join(outDir, "deep_qa.json"), JSON.stringify(result, null, 2), "utf8");
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exitCode = 1;
