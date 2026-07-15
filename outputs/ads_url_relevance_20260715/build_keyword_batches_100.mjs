import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const root = String.raw`D:\fc-cuas`;
const templatePath = path.join(root, "ads", "广告上传模板", "keyword_template.xlsx");
const sourcePath = path.join(root, "outputs", "ads_url_relevance_20260715", "NTET_Keyword_Final_URL_Edit_WebUpload_ActionFirst_20260715.xlsx");
const batchDir = path.join(root, "outputs", "ads_url_relevance_20260715", "keyword_batches_100");
await fs.mkdir(batchDir, { recursive: true });
for (const name of await fs.readdir(batchDir)) {
  if (name.startsWith("NTET_Keyword_URL_Edit_Batch_") && (name.endsWith(".xlsx") || name.endsWith(".xlsx.inspect.ndjson"))) {
    await fs.unlink(path.join(batchDir, name));
  }
}

const sourceWb = await SpreadsheetFile.importXlsx(await FileBlob.load(sourcePath));
const sourceSheet = sourceWb.worksheets.getItemAt(0);
const sourceValues = sourceSheet.getUsedRange().values;
const sourceHeaders = sourceValues[0];
const sourceIndex = new Map(sourceHeaders.map((header, index) => [header, index]));
const templateForHeaders = await SpreadsheetFile.importXlsx(await FileBlob.load(templatePath));
const templateHeaders = templateForHeaders.worksheets.getItemAt(0).getRange("A1:R1").values[0];
const dataRows = sourceValues.slice(1).map((row) => templateHeaders.map((header) => row[sourceIndex.get(header)] ?? null));
const batchSize = 100;
const batchCount = Math.ceil(dataRows.length / batchSize);
const manifest = [];

for (let i = 0; i < batchCount; i++) {
  const start = i * batchSize;
  const rows = dataRows.slice(start, start + batchSize);
  const wb = await SpreadsheetFile.importXlsx(await FileBlob.load(templatePath));
  const sheet = wb.worksheets.getItemAt(0);
  sheet.getRangeByIndexes(2, 0, rows.length, 18).values = rows;

  const batchNo = String(i + 1).padStart(2, "0");
  const firstNo = String(start + 1).padStart(4, "0");
  const lastNo = String(start + rows.length).padStart(4, "0");
  const fileName = `NTET_Keyword_URL_Edit_Batch_${batchNo}_Rows_${firstNo}-${lastNo}.xlsx`;
  const outputPath = path.join(batchDir, fileName);
  const xlsx = await SpreadsheetFile.exportXlsx(wb);
  await xlsx.save(outputPath);
  manifest.push({ batch: i + 1, firstDataRow: start + 1, lastDataRow: start + rows.length, dataRowCount: rows.length, outputPath });
  console.error(`BUILT ${i + 1}/${batchCount}: ${fileName}`);
}

await fs.writeFile(path.join(batchDir, "manifest.json"), JSON.stringify({ batchSize, totalRows: dataRows.length, batchCount, files: manifest }, null, 2), "utf8");
console.log(JSON.stringify({ batchSize, totalRows: dataRows.length, batchCount, files: manifest }, null, 2));
