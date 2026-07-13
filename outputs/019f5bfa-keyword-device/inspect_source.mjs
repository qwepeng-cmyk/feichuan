import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const sourcePath = "C:/Users/admin/Downloads/搜索关键字报告 (18).xlsx";
const outDir = "D:/fc-cuas/outputs/019f5bfa-keyword-device";

const input = await FileBlob.load(sourcePath);
const workbook = await SpreadsheetFile.importXlsx(input);

const summary = await workbook.inspect({
  kind: "workbook,sheet,table",
  maxChars: 12000,
  tableMaxRows: 12,
  tableMaxCols: 18,
  tableMaxCellChars: 160,
});
console.log("SUMMARY");
console.log(summary.ndjson);

const sheets = await workbook.inspect({ kind: "sheet", include: "id,name", maxChars: 12000 });
console.log("SHEETS");
console.log(sheets.ndjson);

await fs.writeFile(`${outDir}/source-summary.ndjson`, `${summary.ndjson}\n${sheets.ndjson}`, "utf8");

try {
  const sheet = workbook.worksheets.getItem("Sheet0");
  const rows = [];
  for (let start = 1; start <= 2410; start += 400) {
    const end = Math.min(2410, start + 399);
    const chunk = sheet.getRange(`A${start}:AJ${end}`).values;
    rows.push(...chunk);
    console.log(JSON.stringify({ loaded: `${start}:${end}`, count: chunk.length }));
  }
  const payload = { sheet: sheet.name, rowCount: rows.length, colCount: 36, values: rows };
  await fs.writeFile(`${outDir}/sheet-1.json`, JSON.stringify(payload), "utf8");
  const preview = await workbook.render({ sheetName: sheet.name, range: "A1:R15", scale: 0.7, format: "png" });
  await fs.writeFile(`${outDir}/sheet-1.png`, new Uint8Array(await preview.arrayBuffer()));
  console.log(JSON.stringify({ sheet: sheet.name, rows: payload.rowCount, cols: payload.colCount }));
} catch (error) {
  console.error(error?.stack || error?.message || String(error));
  process.exitCode = 1;
}
