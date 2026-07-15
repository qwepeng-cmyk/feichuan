import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const workbookPath = "D:/fc-cuas/outputs/four_solution_campaigns_20260716/N-TET_4_MiddleEast_Exact_Campaign_Upload_Formats_20260716.xlsx";
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(workbookPath));

function table(sheetName) {
  const values = workbook.worksheets.getItem(sheetName).getUsedRange(true).values;
  const headers = values[0];
  return values.slice(1).map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? null])));
}

const adGroups = table("01 Ad Groups");
const keywords = table("02 Keywords");
const rsas = table("03 RSA");
const negatives = table("04 Negatives");
const campaigns = new Set(["Drone Defender 中东 精准", "Drone Locator 中东 精准", "Drone Shield 中东 精准", "Drone Jammer 中东 精准"]);
const urls = new Map([
  ["Drone Defender 中东 精准", "https://n-tet.com/solutions/drone-defender"],
  ["Drone Locator 中东 精准", "https://n-tet.com/solutions/drone-locator"],
  ["Drone Shield 中东 精准", "https://n-tet.com/solutions/drone-shield"],
  ["Drone Jammer 中东 精准", "https://n-tet.com/solutions/drone-jammer"],
]);
const adGroupKeys = new Set(adGroups.map((row) => `${row.Campaign}|${row["Ad group"]}`));
const normalize = (value) => String(value ?? "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

function duplicates(rows, keyFn) {
  const seen = new Set();
  const result = new Set();
  for (const row of rows) {
    const key = keyFn(row);
    if (seen.has(key)) result.add(key);
    seen.add(key);
  }
  return [...result];
}

const rsaFields = [...Array.from({ length: 15 }, (_, i) => `Headline ${i + 1}`), ...Array.from({ length: 4 }, (_, i) => `Description ${i + 1}`)];
const strongRestricted = /\b(gun|rifle|weapon|spoofing|forced landing|shoot down|destroy|neutralize)\b/i;
const checks = {
  campaignRefs: [...adGroups, ...keywords, ...rsas, ...negatives].every((row) => campaigns.has(row.Campaign)),
  adGroupRefs: [...keywords, ...rsas].every((row) => adGroupKeys.has(`${row.Campaign}|${row["Ad group"]}`)),
  exactOnly: keywords.every((row) => row.Type === "Exact match"),
  keywordUrls: keywords.every((row) => row["Final URL"] === urls.get(row.Campaign)),
  rsaUrls: rsas.every((row) => row["Final URL"] === urls.get(row.Campaign)),
  keywordDuplicates: duplicates(keywords, (row) => `${row.Campaign}|${normalize(row.Keyword)}|${row.Type}`),
  negativeDuplicates: duplicates(negatives, (row) => `${row.Campaign}|${normalize(row["Negative keyword"])}|${row.Type}`),
  allRsaAssetsUseDki: rsas.every((row) => rsaFields.every((field) => row[field] && /\{KeyWord:[^}]+\}/.test(row[field]))),
  strongRestrictedKeywords: keywords.filter((row) => strongRestricted.test(row.Keyword)).map((row) => row.Keyword),
  requiredJammerFormats: Object.fromEntries(["portable", "handheld", "backpack", "mobile", "vehicle", "manpack"].map((format) => [format, keywords.some((row) => row.Campaign === "Drone Jammer 中东 精准" && new RegExp(`\\b${format}\\b`, "i").test(row.Keyword))])),
  jammerContext: keywords.filter((row) => /\bjammer\b/i.test(row.Keyword) && (row.Campaign !== "Drone Jammer 中东 精准" || row["Final URL"] !== "https://n-tet.com/solutions/drone-jammer")).map((row) => row.Keyword),
};

const failures = Object.entries(checks).filter(([key, value]) => {
  if (key === "requiredJammerFormats") return Object.values(value).some((present) => !present);
  return Array.isArray(value) ? value.length > 0 : value !== true;
});
const result = {
  counts: { adGroups: adGroups.length, keywords: keywords.length, rsas: rsas.length, negatives: negatives.length },
  checks,
  status: failures.length ? "FAIL" : "PASS",
  failures,
};
await fs.writeFile("D:/fc-cuas/outputs/four_solution_campaigns_20260716/deep_qa.json", JSON.stringify(result, null, 2), "utf8");
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exitCode = 1;
