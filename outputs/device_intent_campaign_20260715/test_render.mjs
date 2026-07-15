import fs from "node:fs/promises";
import { Workbook } from "@oai/artifact-tool";
const wb = Workbook.create();
const sheet = wb.worksheets.add("Test");
sheet.getRange("A1:B2").values = [["A", "B"], [1, 2]];
const blob = await wb.render({ sheetName: "Test", range: "A1:B2", scale: 1, format: "png" });
await fs.writeFile("D:/fc-cuas/outputs/device_intent_campaign_20260715/test_render.png", new Uint8Array(await blob.arrayBuffer()));
console.log("ok");
