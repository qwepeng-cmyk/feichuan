import fs from 'fs';
import path from 'path';

const casesDirectory = path.join(process.cwd(), 'public/cases');

// Reads all cases and returns their data
export async function getAllCases() {
  if (!fs.existsSync(casesDirectory)) return [];
  const fileNames = fs.readdirSync(casesDirectory);
  const cases = [];
  for (const fileName of fileNames) {
    if (fileName.endsWith('.json') && fileName !== 'cases_data.json') {
      const fullPath = path.join(casesDirectory, fileName);
      try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        cases.push(JSON.parse(fileContents));
      } catch (e) {
        console.error(`Error parsing case JSON ${fileName}:`, e);
      }
    }
  }
  return cases;
}

export async function getAllCaseHandles() {
  const cases = await getAllCases();
  return cases.map(c => c.handle).filter(Boolean);
}

export async function getCaseByHandle(handle: string) {
  const cases = await getAllCases();
  return cases.find(c => c.handle === handle) || null;
}
