import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

async function readSheet(file) {
  const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(file));
  const sheet = workbook.worksheets.getItemAt(0);
  const values = sheet.getUsedRange().values;
  return values;
}

function rowsFrom(values, headerRow = 2) {
  const headers = values[headerRow].map((value, index) => String(value ?? `Column_${index + 1}`));
  return values.slice(headerRow + 1).map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? null])));
}

const keywordValues = await readSheet("D:/fc-cuas/outputs/ads_rsa_20260713/keywords.xlsx");
const adValues = await readSheet("D:/fc-cuas/outputs/ads_rsa_20260713/ads.xlsx");
const templateValues = await readSheet("D:/fc-cuas/outputs/ads_rsa_20260713/template.xlsx");

const keywords = rowsFrom(keywordValues);
const ads = rowsFrom(adValues);
const templateHeaders = templateValues[2];

const groups = new Map();
for (const row of keywords) {
  const key = `${row["广告系列"]}|||${row["广告组"]}`;
  if (!groups.has(key)) groups.set(key, { campaign: row["广告系列"], adGroup: row["广告组"], keywords: [], finalUrls: new Set(), impressions: 0, clicks: 0, cost: 0 });
  const group = groups.get(key);
  group.keywords.push(String(row["关键字"] ?? ""));
  if (row["最终到达网址"]) group.finalUrls.add(String(row["最终到达网址"]));
  group.impressions += Number(row["展示次数"] || 0);
  group.clicks += Number(row["点击次数"] || 0);
  group.cost += Number(row["费用"] || 0);
}

const groupSummary = [...groups.values()].map((group) => ({
  ...group,
  finalUrls: [...group.finalUrls],
  keywordCount: group.keywords.length,
  sampleKeywords: group.keywords.slice(0, 30),
})).sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions || a.campaign.localeCompare(b.campaign));

const output = {
  keywordHeaders: keywordValues[2],
  adHeaders: adValues[2],
  templateHeaders,
  keywords,
  ads,
  groupSummary,
};

await fs.writeFile("D:/fc-cuas/outputs/ads_rsa_20260713/extracted_ads_data.json", JSON.stringify(output, null, 2), "utf8");
console.log(JSON.stringify({
  keywordRows: keywords.length,
  adRows: ads.length,
  groupCount: groupSummary.length,
  adHeaders: adValues[2],
  groups: groupSummary,
}));
