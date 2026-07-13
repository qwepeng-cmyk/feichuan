import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load("D:/fc-cuas/outputs/ads_rsa_20260713/template.xlsx"));
const sheet = workbook.worksheets.getItemAt(0);
const result = await workbook.inspect({
  kind: "computedStyle",
  sheetId: sheet.name,
  range: "A1:BC4",
  maxChars: 12000,
});
console.log(result.ndjson);
