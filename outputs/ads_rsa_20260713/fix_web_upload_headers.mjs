import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const root = "D:/fc-cuas/outputs/ads_rsa_20260713";
const resultsFile = "C:/Users/admin/Downloads/N-TET_RSA_DKI_仅上传_保留原网址_20260713_RESULTS.xlsx";
const sourceFile = `${root}/N-TET_RSA_DKI_仅上传_保留原网址_20260713.xlsx`;
const outputFile = `${root}/N-TET_RSA_DKI_网页上传_首行标题_20260713.xlsx`;

const resultsWorkbook = await SpreadsheetFile.importXlsx(await FileBlob.load(resultsFile));
const resultsValues = resultsWorkbook.worksheets.items.length
  ? resultsWorkbook.worksheets.getItemAt(0).getUsedRange().values
  : [["Google Ads returned an XLSX container with no worksheet after the header-row parsing failure."]];

const sourceWorkbook = await SpreadsheetFile.importXlsx(await FileBlob.load(sourceFile));
const sourceSheet = sourceWorkbook.worksheets.getItemAt(0);
const headers = sourceSheet.getRange("A3:BC3").values[0];
const rows = sourceSheet.getRange("A5:BC86").values;

const workbook = Workbook.create();
const sheet = workbook.worksheets.add("Ads");
sheet.getRangeByIndexes(0, 0, 1, headers.length).values = [headers];
sheet.getRangeByIndexes(1, 0, rows.length, headers.length).values = rows;
sheet.getRangeByIndexes(0, 0, rows.length + 1, headers.length).format.numberFormat = "@";
sheet.getRangeByIndexes(0, 0, 1, headers.length).format = {
  fill: "#315BA4",
  font: { bold: true, color: "#FFFFFF" },
  wrapText: false,
};
sheet.freezePanes.freezeRows(1);

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputFile);

const verifyWorkbook = await SpreadsheetFile.importXlsx(await FileBlob.load(outputFile));
const verifySheet = verifyWorkbook.worksheets.getItemAt(0);
const verifyValues = verifySheet.getUsedRange().values;
const verifyHeaders = verifyValues[0].map(String);
const headlineIndexes = Array.from({ length: 15 }, (_, i) => verifyHeaders.indexOf(`Headline ${i + 1}`));
const descriptionIndexes = Array.from({ length: 4 }, (_, i) => verifyHeaders.indexOf(`Description ${i + 1}`));
let missingDki = 0;
for (const row of verifyValues.slice(1)) {
  for (const index of [...headlineIndexes, ...descriptionIndexes]) {
    if (!/\{KeyWord:[^}]+\}/.test(String(row[index] ?? ""))) missingDki += 1;
  }
}
const formulaErrors = await verifyWorkbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "web upload formula error scan",
});
const firstRows = await verifyWorkbook.inspect({
  kind: "table",
  sheetId: "Ads",
  range: "A1:P5",
  tableMaxRows: 5,
  tableMaxCols: 16,
  tableMaxCellChars: 100,
  maxChars: 12000,
});

const checks = {
  sheets: verifyWorkbook.worksheets.items.length,
  headerInFirstRow: verifyValues[0][0] === "Row Type" && verifyValues[0][1] === "Action",
  firstDataRow: verifyValues[1][0],
  dataRows: verifyValues.length - 1,
  missingDki,
  hasCommentRows: verifyValues.some((row) => String(row[0] ?? "").startsWith("#")),
};
if (checks.sheets !== 1 || !checks.headerInFirstRow || checks.firstDataRow !== "Ad" || checks.dataRows !== 82 || checks.missingDki || checks.hasCommentRows) {
  throw new Error(`Verification failed: ${JSON.stringify(checks)}`);
}

await fs.writeFile(`${root}/web_upload_header_diagnosis.json`, JSON.stringify({
  resultsWorkbook: resultsValues,
  checks,
  formulaErrors: formulaErrors.ndjson,
  firstRows: firstRows.ndjson,
}, null, 2), "utf8");

console.log(JSON.stringify({
  outputFile,
  resultsWorkbookRows: resultsValues,
  checks,
  formulaErrors: formulaErrors.ndjson,
  firstRows: firstRows.ndjson,
}));
