import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const outDir = "D:/fc-cuas/outputs/five_device_campaigns_20260715";
const jobs = [
  ["N-TET_5_Device_Campaigns_Review_20260715.xlsx", "Summary", "A1:H19", "review_summary.png"],
  ["03_Keywords_UPLOAD.xlsx", "Sheet0", "A1:R14", "keywords_upload_top.png"],
  ["04_RSA_DKI_UPLOAD.xlsx", "Sheet0", "A1:BC4", "rsa_upload_top.png"],
];

const results = [];
for (const [fileName, sheetName, range, outputName] of jobs) {
  const wb = await SpreadsheetFile.importXlsx(await FileBlob.load(path.join(outDir, fileName)));
  const preview = await wb.render({ sheetName, range, scale: 1, format: "png" });
  const outputPath = path.join(outDir, outputName);
  await fs.writeFile(outputPath, new Uint8Array(await preview.arrayBuffer()));
  const stat = await fs.stat(outputPath);
  results.push({ fileName, sheetName, range, outputPath, bytes: stat.size });
}
await fs.writeFile(path.join(outDir, "render_qa.json"), JSON.stringify(results, null, 2), "utf8");
console.log(JSON.stringify(results, null, 2));
