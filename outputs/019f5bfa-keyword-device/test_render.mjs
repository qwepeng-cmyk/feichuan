import fs from "node:fs/promises";
import { Workbook } from "@oai/artifact-tool";
const wb = Workbook.create();
const ws = wb.worksheets.add("Test");
ws.getRange("A1:B3").values = [["Test", "Value"], ["A", 1], ["B", 2]];
ws.getRange("A1:B1").format = { fill: "#315BA4", font: { bold: true, color: "#FFFFFF" } };
const image = await wb.render({ sheetName: "Test", range: "A1:B3", scale: 1, format: "png" });
await fs.writeFile("./test-render.png", new Uint8Array(await image.arrayBuffer()));
console.log("ok");
