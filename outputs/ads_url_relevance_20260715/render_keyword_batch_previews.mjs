import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const dir = String.raw`D:\fc-cuas\outputs\ads_url_relevance_20260715\keyword_batches_100`;
const names = [
  "NTET_Keyword_URL_Edit_Batch_01_Rows_0001-0100.xlsx",
  "NTET_Keyword_URL_Edit_Batch_17_Rows_1601-1643.xlsx",
];
for (const name of names) {
  const wb = await SpreadsheetFile.importXlsx(await FileBlob.load(path.join(dir, name)));
  const preview = await wb.render({ sheetName: "Sheet0", range: "A1:R5", scale: 1, format: "png" });
  await fs.writeFile(path.join(dir, `${path.basename(name, ".xlsx")}.png`), new Uint8Array(await preview.arrayBuffer()));
  console.log(`RENDERED ${name}`);
}
