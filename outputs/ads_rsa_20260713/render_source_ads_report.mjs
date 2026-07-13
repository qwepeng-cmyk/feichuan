import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const root = "D:/fc-cuas/outputs/ads_rsa_20260713";
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(`${root}/ads.xlsx`));
const preview = await workbook.render({
  sheetName: workbook.worksheets.getItemAt(0).name,
  range: "A1:O8",
  scale: 1.5,
  format: "png",
});
await fs.writeFile(`${root}/source_ads_report_top.png`, new Uint8Array(await preview.arrayBuffer()));
const inspected = await workbook.inspect({
  kind: "table",
  range: `${workbook.worksheets.getItemAt(0).name}!A1:CF6`,
  include: "values,formulas",
  tableMaxRows: 6,
  tableMaxCols: 84,
  maxChars: 20000,
});
console.log(inspected.ndjson);
