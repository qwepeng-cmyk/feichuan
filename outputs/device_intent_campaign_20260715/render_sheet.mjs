import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const [sheetName, range, output] = process.argv.slice(2);
const path = "D:/fc-cuas/outputs/device_intent_campaign_20260715/N-TET_设备采购意向词_新广告活动_20260715.xlsx";
const wb = await SpreadsheetFile.importXlsx(await FileBlob.load(path));
const preview = await wb.render({ sheetName, range, scale: 0.8, format: "png" });
await fs.writeFile(output, new Uint8Array(await preview.arrayBuffer()));
console.log(JSON.stringify({ sheetName, range, output }));
