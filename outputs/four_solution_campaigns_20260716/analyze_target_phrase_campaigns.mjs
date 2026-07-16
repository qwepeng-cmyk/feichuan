import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const reportPath = "C:/Users/admin/Downloads/搜索关键字报告 (22).xlsx";
const targets = ["C-UAS 英语 短语", "C-UAS 中东 短语", "C-UAS 南美 短语"];
const wb = await SpreadsheetFile.importXlsx(await FileBlob.load(reportPath));
const values = wb.worksheets.getItemAt(0).getUsedRange(true).values;
const headers = values[2].map((value) => String(value ?? ""));
const idx = new Map(headers.map((header, index) => [header, index]));
const rows = values.slice(3).filter((row) => targets.includes(String(row[idx.get("广告系列")] ?? "")));

const campaigns = {};
for (const campaign of targets) {
  const campaignRows = rows.filter((row) => String(row[idx.get("广告系列")] ?? "") === campaign);
  const groups = new Map();
  for (const row of campaignRows) {
    const group = String(row[idx.get("广告组")] ?? "");
    const keyword = String(row[idx.get("关键字")] ?? "").replace(/^\"|\"$/g, "").trim().toLowerCase();
    const matchType = String(row[idx.get("匹配类型")] ?? "");
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push({ keyword, matchType });
  }
  campaigns[campaign] = [...groups.entries()].map(([adGroup, keywords]) => ({
    adGroup,
    rows: keywords.length,
    phraseRows: keywords.filter((item) => item.matchType.includes("词组")).length,
    samples: keywords.slice(0, 8),
  })).sort((a, b) => a.adGroup.localeCompare(b.adGroup));
}

const out = { reportPath, targetRows: rows.length, campaigns };
await fs.writeFile("D:/fc-cuas/outputs/four_solution_campaigns_20260716/target_phrase_campaigns.json", JSON.stringify(out, null, 2), "utf8");
console.log(JSON.stringify(out, null, 2));
