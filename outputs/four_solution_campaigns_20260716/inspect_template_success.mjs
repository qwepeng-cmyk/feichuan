import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const files = [
  "D:/fc-cuas/ads/广告上传模板/ad_group_template.xlsx",
  "D:/fc-google-ads/keywords/词根拓词20260701/upload_2026-07-01/ntet_anti_drone_new_ad_group_upload_clean_2026-07-01.xlsx",
  "D:/fc-cuas/outputs/four_solution_campaigns_20260716/01_Ad_Groups_UPLOAD_Formats_20260716.xlsx",
  "D:/fc-cuas/outputs/four_solution_campaigns_20260716/01_Ad_Groups_WEB_UPLOAD_ActionFirst_20260716.xlsx",
];

const results = [];
for (const file of files) {
  const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(file));
  const sheet = workbook.worksheets.getItemAt(0);
  const used = sheet.getUsedRange(true).values;
  const table = await workbook.inspect({
    kind: "table",
    range: `${sheet.name}!A1:U6`,
    include: "values,formulas",
    tableMaxRows: 6,
    tableMaxCols: 21,
    maxChars: 12000,
  });
  const style = await workbook.inspect({
    kind: "computedStyle",
    sheetId: sheet.name,
    range: "A1:U3",
    maxChars: 6000,
  });
  results.push({
    file,
    sheets: workbook.worksheets.items.map((item) => item.name),
    usedRows: used.length,
    usedColumns: Math.max(...used.map((row) => row.length)),
    firstThreeRows: used.slice(0, 3),
    table: table.ndjson,
    style: style.ndjson,
  });
}

await fs.writeFile(
  "D:/fc-cuas/outputs/four_solution_campaigns_20260716/template_success_comparison.json",
  JSON.stringify(results, null, 2),
  "utf8",
);
console.log(JSON.stringify(results.map(({ table, style, ...rest }) => rest), null, 2));
