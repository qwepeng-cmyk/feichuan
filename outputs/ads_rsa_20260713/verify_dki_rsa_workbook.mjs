import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const file = "D:/fc-cuas/outputs/ads_rsa_20260713/N-TET_RSA_DKI_Ads_20260713.xlsx";
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(file));
const sheetInfo = await workbook.inspect({ kind: "sheet", include: "id,name", maxChars: 8000 });
const uploadPreview = await workbook.inspect({
  kind: "table",
  sheetId: "Sheet0",
  range: "A1:BC8",
  tableMaxRows: 8,
  tableMaxCols: 55,
  tableMaxCellChars: 100,
  maxChars: 20000,
});
const qaPreview = await workbook.inspect({
  kind: "table",
  sheetId: "QA Summary",
  range: "A1:D12",
  tableMaxRows: 12,
  tableMaxCols: 4,
  tableMaxCellChars: 160,
  maxChars: 12000,
});
const riskPreview = await workbook.inspect({
  kind: "table",
  sheetId: "Keyword Risk Review",
  range: "A1:D12",
  tableMaxRows: 12,
  tableMaxCols: 4,
  tableMaxCellChars: 160,
  maxChars: 12000,
});
const formulaErrors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 300 },
  summary: "final formula error scan",
});

const uploadSheet = workbook.worksheets.getItem("Sheet0");
const values = uploadSheet.getRange("A5:BC86").values;
const headers = uploadSheet.getRange("A3:BC3").values[0].map(String);
const headlineIndexes = Array.from({ length: 15 }, (_, i) => headers.indexOf(`Headline ${i + 1}`));
const descriptionIndexes = Array.from({ length: 4 }, (_, i) => headers.indexOf(`Description ${i + 1}`));
let missingDki = 0;
for (const row of values) {
  for (const index of [...headlineIndexes, ...descriptionIndexes]) {
    if (!/\{KeyWord:[^}]+\}/.test(String(row[index] ?? ""))) missingDki += 1;
  }
}

const verification = {
  file,
  fileSize: (await fs.stat(file)).size,
  uploadRows: values.length,
  missingDki,
  sheetInfo: sheetInfo.ndjson,
  uploadPreview: uploadPreview.ndjson,
  qaPreview: qaPreview.ndjson,
  riskPreview: riskPreview.ndjson,
  formulaErrors: formulaErrors.ndjson,
};
await fs.writeFile("D:/fc-cuas/outputs/ads_rsa_20260713/final_verification.json", JSON.stringify(verification, null, 2), "utf8");
console.log(JSON.stringify(verification));
