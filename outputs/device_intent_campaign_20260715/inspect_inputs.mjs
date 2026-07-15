import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

process.on("uncaughtException", (error) => {
  console.error("uncaughtException", error?.stack ?? error);
  process.exitCode = 1;
});
process.on("unhandledRejection", (error) => {
  console.error("unhandledRejection", error?.stack ?? error);
  process.exitCode = 1;
});

const outDir = "D:/fc-cuas/outputs/device_intent_campaign_20260715";
const inputs = [
  { key: "keywords", path: "C:/Users/admin/Downloads/搜索关键字报告 (21).xlsx" },
  { key: "terms", path: "C:/Users/admin/Downloads/搜索字词报告 (9).xlsx" },
];

const result = {};
for (const input of inputs) {
  console.error(`loading:${input.key}`);
  const blob = await FileBlob.load(input.path);
  console.error(`importing:${input.key}`);
  const wb = await SpreadsheetFile.importXlsx(blob);
  console.error(`inspecting:${input.key}`);
  const summary = await wb.inspect({
    kind: "workbook,sheet,table,region",
    maxChars: 16000,
    tableMaxRows: 15,
    tableMaxCols: 20,
    tableMaxCellChars: 120,
  });
  const sheetInfo = await wb.inspect({ kind: "sheet", include: "id,name", maxChars: 4000 });
  const first = wb.worksheets.getItemAt(0);
  const used = first.getUsedRange(true);
  const values = used?.values ?? [];
  result[input.key] = {
    path: input.path,
    summary: summary.ndjson,
    sheets: sheetInfo.ndjson,
    firstSheet: first.name,
    rowCount: values.length,
    colCount: Math.max(0, ...values.map((row) => row.length)),
    firstRows: values.slice(0, 18),
    allValues: values,
  };
  console.error(`captured:${input.key}`);
}

await fs.writeFile(`${outDir}/input_inspection.json`, JSON.stringify(result, null, 2), "utf8");
console.log(JSON.stringify(Object.fromEntries(Object.entries(result).map(([key, value]) => [key, { sheet: value.firstSheet, rows: value.rowCount, cols: value.colCount, firstRows: value.firstRows.slice(0, 8) }])), null, 2));
