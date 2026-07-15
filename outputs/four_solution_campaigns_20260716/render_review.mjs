import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const workbookPath = "D:/fc-cuas/outputs/four_solution_campaigns_20260716/N-TET_4_MiddleEast_Exact_Campaign_Upload_20260716.xlsx";
const outputPath = "D:/fc-cuas/outputs/four_solution_campaigns_20260716/review_preview.png";
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(workbookPath));
const preview = await workbook.render({ sheetName: "05 Review", range: "A1:J20", scale: 1, format: "png" });
await fs.writeFile(outputPath, new Uint8Array(await preview.arrayBuffer()));
console.log(JSON.stringify({ outputPath, bytes: (await fs.stat(outputPath)).size }));
