import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const reportPath = "C:/Users/admin/Downloads/搜索关键字报告 (22).xlsx";
const wb = await SpreadsheetFile.importXlsx(await FileBlob.load(reportPath));
const sheet = wb.worksheets.getItemAt(0);
const values = sheet.getUsedRange(true).values;
const preview = values.slice(0, 8).map((row) => row.slice(0, 40));
const out = {
  reportPath,
  sheets: wb.worksheets.items.map((item) => item.name),
  rows: values.length,
  columns: Math.max(...values.map((row) => row.length)),
  preview,
};
await fs.writeFile("D:/fc-cuas/outputs/four_solution_campaigns_20260716/phrase_report22_preview.json", JSON.stringify(out, null, 2), "utf8");
console.log(JSON.stringify(out, null, 2));
