import fs from 'fs';
import path from 'path';

export interface ProductMetadata {
  name: string;
  handle: string;
  image: string;
  category: string;
}

const DATA_DIR = path.join(process.cwd(), '网站资料');
const DIR_MAP: Record<string, string> = {
  '01大无人机': 'uav-drone-systems',
  '02反无设备': 'drone-detection',
  '03智慧警务': 'security-screening',
  '04工程补给': 'engineering-materials',
  '05野战医院': 'field-hospitals',
  '06要地防护': 'perimeter-intelligence'
};

const CATEGORY_NAMES: Record<string, string> = {
  'uav-drone-systems': 'UAV & Drone Systems',
  'drone-detection': 'Drone Detection & Airspace Monitoring',
  'security-screening': 'Security Screening & Policing',
  'engineering-materials': 'Engineering Materials & Logistics',
  'field-hospitals': 'Field & Mobile Hospitals',
  'perimeter-intelligence': 'Perimeter & Area Surveillance'
};

export async function getAllProducts() {
  const categories: Record<string, ProductMetadata[]> = {
    'uav-drone-systems': [],
    'drone-detection': [],
    'security-screening': [],
    'engineering-materials': [],
    'field-hospitals': [],
    'perimeter-intelligence': []
  };

  const folders = Object.keys(DIR_MAP);

  for (const folder of folders) {
    const folderPath = path.join(DATA_DIR, folder);
    if (!fs.existsSync(folderPath)) continue;

    const items = fs.readdirSync(folderPath);
    
    for (const item of items) {
      const itemPath = path.join(folderPath, item);
      if (fs.statSync(itemPath).isDirectory()) {
         const subFiles = fs.readdirSync(itemPath).filter(f => f.endsWith('.json'));
         for (const file of subFiles) {
            processFile(path.join(itemPath, file), DIR_MAP[folder], categories);
         }
      } else if (item.endsWith('.json')) {
         processFile(itemPath, DIR_MAP[folder], categories);
      }
    }
  }

  return categories;
}

export async function getAllProductHandles() {
  const folders = Object.keys(DIR_MAP);
  const handles: string[] = [];

  for (const folder of folders) {
    const folderPath = path.join(DATA_DIR, folder);
    if (!fs.existsSync(folderPath)) continue;

    const items = fs.readdirSync(folderPath);
    for (const item of items) {
      const itemPath = path.join(folderPath, item);
      if (fs.statSync(itemPath).isDirectory()) {
         const subFiles = fs.readdirSync(itemPath).filter(f => f.endsWith('.json'));
         for (const file of subFiles) {
            const content = JSON.parse(fs.readFileSync(path.join(itemPath, file), 'utf-8'));
            handles.push(content.handle || path.basename(file, '.json').toLowerCase().replace(/\s+/g, '-'));
         }
      } else if (item.endsWith('.json')) {
         const content = JSON.parse(fs.readFileSync(itemPath, 'utf-8'));
         handles.push(content.handle || path.basename(item, '.json').toLowerCase().replace(/\s+/g, '-'));
      }
    }
  }
  return handles;
}

export async function getProductByHandle(handle: string) {
  const folders = Object.keys(DIR_MAP);

  for (const folder of folders) {
    const folderPath = path.join(DATA_DIR, folder);
    if (!fs.existsSync(folderPath)) continue;

    const items = fs.readdirSync(folderPath);
    for (const item of items) {
      const itemPath = path.join(folderPath, item);
      if (fs.statSync(itemPath).isDirectory()) {
         const subFiles = fs.readdirSync(itemPath).filter(f => f.endsWith('.json'));
         for (const file of subFiles) {
            const product = checkHandleMatch(path.join(itemPath, file), handle);
            if (product) return product;
         }
      } else if (item.endsWith('.json')) {
         const product = checkHandleMatch(itemPath, handle);
         if (product) return product;
      }
    }
  }
  return null;
}

function checkHandleMatch(filePath: string, handle: string) {
    try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const fileHandle = content.handle || path.basename(filePath, '.json').toLowerCase().replace(/\s+/g, '-');
        if (fileHandle === handle) return content;
    } catch (e) {}
    return null;
}

function processFile(filePath: string, categoryId: string, categories: any) {
    try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const metadata: ProductMetadata = {
            name: content.product_name_en || content.Product_Name_en || content.product_name || content.Product_Name || path.basename(filePath, '.json'),
            handle: content.handle || path.basename(filePath, '.json').toLowerCase().replace(/\s+/g, '-'),
            image: content.main_image || (content.Product_Images && content.Product_Images[0]) || (content.product_images && content.product_images[0]) || '/placeholder.png',
            category: categoryId
        };
        categories[categoryId].push(metadata);
    } catch (e) {
        console.error("Error parsing product file:", filePath);
    }
}
