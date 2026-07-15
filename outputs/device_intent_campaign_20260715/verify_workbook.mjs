import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const outDir = "D:/fc-cuas/outputs/device_intent_campaign_20260715";
const path = `${outDir}/N-TET_设备采购意向词_新广告活动_20260715.xlsx`;
const wb = await SpreadsheetFile.importXlsx(await FileBlob.load(path));
const sheets = await wb.inspect({ kind: "sheet,table", include: "id,name", maxChars: 10000, tableMaxRows: 4, tableMaxCols: 8 });
const summary = await wb.inspect({ kind: "table", range: "Summary!A1:H31", include: "values,formulas", tableMaxRows: 35, tableMaxCols: 8, maxChars: 20000 });
const intent = await wb.inspect({ kind: "table", range: "Intent Analysis!A4:I9", include: "values,formulas", tableMaxRows: 10, tableMaxCols: 10, maxChars: 10000 });
const campaign = await wb.inspect({ kind: "table", range: "Device Campaign!A1:M20", include: "values,formulas", tableMaxRows: 20, tableMaxCols: 13, maxChars: 20000 });
const errors = await wb.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 300 }, summary: "final formula error scan", maxChars: 12000 });
const qa = { path, sheets: sheets.ndjson, summary: summary.ndjson, intent: intent.ndjson, campaign: campaign.ndjson, errors: errors.ndjson, rendering: { status: "unavailable", detail: "artifact-tool render exits with code 1 even for a minimal 2x2 workbook in this runtime; workbook import, inspect, formula scan, and export succeeded." } };
await fs.writeFile(`${outDir}/qa.json`, JSON.stringify(qa, null, 2), "utf8");
console.log(JSON.stringify({ path, sheets: sheets.ndjson, errors: errors.ndjson }, null, 2));
