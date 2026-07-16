import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const outDir = "D:/fc-cuas/outputs/purchase_intent_campaigns_20260716";
const jobs = [
  ["01_ad_groups_staging_artifact.xlsx", "A1:U10", "preview_01_ad_groups.png"],
  ["02_keywords_staging_artifact.xlsx", "A1:R10", "preview_02_keywords.png"],
  ["03_rsa_staging_artifact.xlsx", "A1:BC4", "preview_03_rsa.png"],
  ["04_pause_original_staging_artifact.xlsx", "A1:R10", "preview_04_pause.png"],
];

for (const [fileName, range, previewName] of jobs) {
  const wb = await SpreadsheetFile.importXlsx(await FileBlob.load(path.join(outDir, fileName)));
  const sheet = wb.worksheets.getItemAt(0);
  const preview = await wb.render({ sheetName: sheet.name, range, scale: 1, format: "png" });
  await fs.writeFile(path.join(outDir, previewName), new Uint8Array(await preview.arrayBuffer()));
  console.log(previewName);
}
