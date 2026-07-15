import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const root = String.raw`D:\fc-cuas`;
const templatePath = path.join(root, "ads", "广告上传模板", "keyword_template.xlsx");
const sourcePath = path.join(root, "outputs", "ads_url_relevance_20260715", "NTET_Keyword_Final_URL_Edit_WebUpload_ActionFirst_20260715.xlsx");
const batchDir = path.join(root, "outputs", "ads_url_relevance_20260715", "keyword_batches_100");

const templateWb = await SpreadsheetFile.importXlsx(await FileBlob.load(templatePath));
const templatePrefix = templateWb.worksheets.getItemAt(0).getRange("A1:R2").values;
const templateHeaders = templatePrefix[0];

const sourceWb = await SpreadsheetFile.importXlsx(await FileBlob.load(sourcePath));
const sourceValues = sourceWb.worksheets.getItemAt(0).getUsedRange().values;
const sourceHeaders = sourceValues[0];
const sourceIndex = new Map(sourceHeaders.map((header, index) => [header, index]));
const expectedRows = sourceValues.slice(1).map((row) => templateHeaders.map((header) => row[sourceIndex.get(header)] ?? null));

const files = (await fs.readdir(batchDir)).filter((name) => name.endsWith(".xlsx")).sort();
const combinedRows = [];
const batches = [];
let allFormulaScansClear = true;
for (const [index, name] of files.entries()) {
  const filePath = path.join(batchDir, name);
  const wb = await SpreadsheetFile.importXlsx(await FileBlob.load(filePath));
  const sheet = wb.worksheets.getItemAt(0);
  const values = sheet.getUsedRange().values;
  const prefixExact = JSON.stringify(values.slice(0, 2)) === JSON.stringify(templatePrefix);
  const rows = values.slice(2);
  const expectedCount = index < files.length - 1 ? 100 : 43;
  const formulaErrors = await wb.inspect({
    kind: "match",
    searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
    options: { useRegex: true, maxResults: 20 },
    summary: `batch ${index + 1} formula error scan`,
  });
  const formulaScanClear = formulaErrors.ndjson.includes("matched 0 entries");
  allFormulaScansClear = allFormulaScansClear && formulaScanClear;
  combinedRows.push(...rows);
  batches.push({
    file: name,
    sheet: sheet.name,
    prefixExact,
    dataRows: rows.length,
    expectedCount,
    countExact: rows.length === expectedCount,
    allRowTypesKeyword: rows.every((r) => r[0] === "Keyword"),
    allActionsEdit: rows.every((r) => r[1] === "Edit"),
    allFinalUrlsPresent: rows.every((r) => typeof r[13] === "string" && r[13].startsWith("https://n-tet.com/")),
    formulaScanClear,
  });
}

const qa = {
  fileCount: files.length,
  totalRows: combinedRows.length,
  expectedTotalRows: expectedRows.length,
  exactRowSequence: JSON.stringify(combinedRows) === JSON.stringify(expectedRows),
  allBatchChecksPass: batches.every((b) => b.sheet === "Sheet0" && b.prefixExact && b.countExact && b.allRowTypesKeyword && b.allActionsEdit && b.allFinalUrlsPresent && b.formulaScanClear),
  allFormulaScansClear,
  batches,
};
await fs.writeFile(path.join(batchDir, "qa.json"), JSON.stringify(qa, null, 2), "utf8");
console.log(JSON.stringify(qa, null, 2));
