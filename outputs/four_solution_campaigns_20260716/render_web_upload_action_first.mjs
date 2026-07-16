import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const outDir = "D:/fc-cuas/outputs/four_solution_campaigns_20260716";
const files = [
  "01_Ad_Groups_GOOGLE_NATIVE_TEMPLATE_20260716.xlsx",
  "02_Keywords_GOOGLE_NATIVE_TEMPLATE_20260716.xlsx",
  "03_RSA_DKI_GOOGLE_NATIVE_TEMPLATE_20260716.xlsx",
  "04_Negatives_GOOGLE_NATIVE_TEMPLATE_20260716.xlsx",
];

for (const file of files) {
  const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(path.join(outDir, file)));
  const sheet = workbook.worksheets.getItemAt(0);
  const preview = await workbook.render({
    sheetName: sheet.name,
    range: "A1:K6",
    scale: 1,
    format: "png",
  });
  await fs.writeFile(
    path.join(outDir, `${path.parse(file).name}_preview.png`),
    new Uint8Array(await preview.arrayBuffer()),
  );
  console.log(file);
}
