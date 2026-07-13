import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const outputDir = "D:/fc-cuas/outputs/ads_rsa_20260713/previews_before";
await fs.mkdir(outputDir, { recursive: true });

const files = [
  { key: "keywords", file: "D:/fc-cuas/outputs/ads_rsa_20260713/keywords.xlsx" },
  { key: "ads", file: "D:/fc-cuas/outputs/ads_rsa_20260713/ads.xlsx" },
  { key: "template", file: "D:/fc-cuas/outputs/ads_rsa_20260713/template.xlsx" },
];

const summary = {};
for (const item of files) {
  console.log(`import:${item.key}`);
  const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(item.file));
  console.log(`inspect:${item.key}`);
  const sheetInfo = await workbook.inspect({ kind: "sheet", include: "id,name", maxChars: 10000 });
  const workbookInfo = await workbook.inspect({
    kind: "workbook,sheet,table",
    maxChars: 12000,
    tableMaxRows: 8,
    tableMaxCols: 35,
    tableMaxCellChars: 120,
  });
  const sheets = workbook.worksheets.items.map((sheet) => sheet.name);
  summary[item.key] = {
    file: item.file,
    sheets,
    sheetInfo: sheetInfo.ndjson,
    workbookInfo: workbookInfo.ndjson,
  };
  for (const sheetName of []) {
    console.log(`render:${item.key}:${sheetName}`);
    const safe = sheetName.replace(/[^a-zA-Z0-9_-]+/g, "_");
    try {
      const preview = await workbook.render({ sheetName, autoCrop: "all", scale: 1, format: "png" });
      await fs.writeFile(path.join(outputDir, `${item.key}_${safe}.png`), new Uint8Array(await preview.arrayBuffer()));
    } catch (error) {
      summary[item.key].renderError = String(error?.stack || error);
      console.error(`render-failed:${item.key}:${sheetName}:${summary[item.key].renderError}`);
    }
  }
}

await fs.writeFile("D:/fc-cuas/outputs/ads_rsa_20260713/workbook_inspection.json", JSON.stringify(summary, null, 2), "utf8");
console.log(JSON.stringify(Object.fromEntries(Object.entries(summary).map(([key, value]) => [key, { file: value.file, sheets: value.sheets, workbookInfo: value.workbookInfo }]))));
