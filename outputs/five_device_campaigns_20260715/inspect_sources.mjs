import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const outDir = "D:/fc-cuas/outputs/five_device_campaigns_20260715";
const files = {
  defender: "C:/Users/admin/Downloads/drone-defender_broad-match_us_2026-07-15.xlsx",
  locator: "C:/Users/admin/Downloads/drone-locator_broad-match_us_2026-07-15.xlsx",
  shield: "C:/Users/admin/Downloads/drone-shield_broad-match_us_2026-07-15.xlsx",
  jammer: "C:/Users/admin/Downloads/drone-jammer_broad-match_us_2026-07-15.xlsx",
  detector: "C:/Users/admin/Downloads/drone-detector_broad-match_us_2026-07-15.xlsx",
  accountKeywords: "C:/Users/admin/Downloads/搜索关键字报告 (21).xlsx",
  accountAds: "C:/Users/admin/Downloads/广告报告 (6).xlsx",
  campaignTemplate: "D:/fc-cuas/ads/广告上传模板/campaign_template.xlsx",
  adGroupTemplate: "D:/fc-cuas/ads/广告上传模板/ad_group_template.xlsx",
  keywordTemplate: "D:/fc-cuas/ads/广告上传模板/keyword_template.xlsx",
  rsaTemplate: "D:/fc-cuas/ads/广告上传模板/responsive_search_ad_template.xlsx",
  negativeTemplate: "D:/fc-cuas/ads/广告上传模板/ad_group_negative_keyword_template.xlsx",
};

const result = {};
for (const [key, path] of Object.entries(files)) {
  const wb = await SpreadsheetFile.importXlsx(await FileBlob.load(path));
  const sheets = await wb.inspect({ kind: "sheet", include: "id,name", maxChars: 4000 });
  result[key] = { path, sheets: sheets.ndjson, data: [] };
  for (let i = 0; i < wb.worksheets.items.length; i += 1) {
    const sheet = wb.worksheets.getItemAt(i);
    const used = sheet.getUsedRange(true);
    const values = used?.values ?? [];
    result[key].data.push({ sheet: sheet.name, rows: values.length, cols: Math.max(0, ...values.map((row) => row.length)), firstRows: values.slice(0, 12), lastRows: values.slice(-5), allValues: values });
  }
}

await fs.writeFile(`${outDir}/source_inspection.json`, JSON.stringify(result, null, 2), "utf8");
console.log(JSON.stringify(Object.fromEntries(Object.entries(result).map(([key, value]) => [key, value.data.map(({ sheet, rows, cols, firstRows }) => ({ sheet, rows, cols, firstRows: firstRows.slice(0, 6) }))])), null, 2));
