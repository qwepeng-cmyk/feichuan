import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const baseUrl = process.env.AUDIT_BASE_URL || 'http://localhost:3000';
const staticDir = process.env.AUDIT_STATIC_DIR;

// Availability smoke test only. Content terms and product capabilities are not
// filtered here; published pages are valid for website, SEO, GEO, and ads.
const publicPaths = [
  '/en',
  '/ru',
  '/es',
  '/ar',
  '/en/products',
  '/ru/products',
  '/es/products',
  '/ar/products',
  '/en/solutions',
  '/ru/solutions',
  '/es/solutions',
  '/ar/solutions',
  '/en/cases',
  '/ar/cases',
  '/en/media',
  '/ar/media',
  '/en/contact',
  '/ar/contact',
  '/en/products/directional-rf-interference-device',
  '/en/products/omni-directional-rf-interference-device',
  '/en/solutions/drone-jammer',
  '/en/media/multi-sensor-cuas-architecture-2026',
  '/en/media/cuas-critical-infrastructure-deployment-2026',
];

async function fetchPage(path) {
  if (staticDir) {
    const normalized = path.replace(/^\/+/, '').replace(/\/$/, '');
    const htmlPath = join(staticDir, normalized ? `${normalized}.html` : 'index.html');
    return existsSync(htmlPath)
      ? { status: 200, text: readFileSync(htmlPath, 'utf8') }
      : { status: 404, text: '' };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(`${baseUrl}${path}`, { signal: controller.signal });
    return { status: response.status, text: await response.text() };
  } finally {
    clearTimeout(timeout);
  }
}

let failures = 0;

for (const path of publicPaths) {
  try {
    const { status } = await fetchPage(path);
    if (status >= 400) {
      console.error(`[public] ${path} returned ${status}`);
      failures += 1;
    } else {
      console.log(`[public] ${path} ok`);
    }
  } catch (error) {
    console.error(`[public] ${path} failed: ${error.message}`);
    failures += 1;
  }
}

if (failures) {
  console.error(`Public availability audit failed with ${failures} issue(s).`);
  process.exit(1);
}

console.log('Public availability audit passed.');
