import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";
const path = "D:/fc-cuas/outputs/019f5bfa-keyword-device/非RF设备词组关键词建议.xlsx";
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(path));
const summary = await workbook.inspect({ kind: "workbook,sheet,table", maxChars: 5000, tableMaxRows: 4, tableMaxCols: 8 });
const keyRange = await workbook.inspect({ kind: "table", sheetId: "设备词组建议", range: "A1:M12", include: "values,formulas", tableMaxRows: 12, tableMaxCols: 13, maxChars: 8000 });
const errors = await workbook.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 300 }, summary: "reopened workbook error scan" });
console.log(summary.ndjson);
console.log(keyRange.ndjson);
console.log(errors.ndjson);
