import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const baseUrl = process.env.AUDIT_BASE_URL || 'http://localhost:3000';
const staticDir = process.env.AUDIT_STATIC_DIR;

const publicPaths = [
  '/en',
  '/ru',
  '/ar',
  '/en/products',
  '/ru/products',
  '/ar/products',
  '/en/products/stationary-rf-detection-system',
  '/en/products/portable-rf-detection-case',
  '/en/products/low-altitude-detection-radar-ku-band',
  '/en/products/composite-electro-optical-tracking-system',
  '/en/products/uav-remote-id-monitoring-system',
  '/en/products/directional-rf-event-logging',
  '/en/products/omni-directional-rf-event-logging',
  '/en/products/portable-low-altitude-monitoring-event-logging-shield',
  '/en/products/portable-low-altitude-monitoring-event-logging-shield-pro',
  '/en/products/portable-integrated-detection-event-logging-low-altitude-monitoring-basic',
  '/en/products/portable-integrated-detection-event-logging-pro-low-altitude-monitoring',
  '/en/products/stationary-active-rf-defense-system',
  '/en/products/uav-navigation-airspace-data-verification-system',
  '/en/products/portable-active-rf-defense-system',
  '/en/solutions',
  '/ar/solutions',
  '/en/solutions/low-altitude-airspace-monitoring',
  '/en/solutions/drone-detector',
  '/en/solutions/drone-radar-detection',
  '/en/solutions/portable-drone-detection',
  '/ru/solutions/low-altitude-airspace-monitoring',
  '/ar/solutions/low-altitude-airspace-monitoring',
  '/en/solutions/category/02_InfrastructureProtection',
  '/en/solutions/category/03_KeyAreaSecurity',
  '/en/solutions/airport-security-protection',
  '/en/solutions/sports-event-security',
  '/en/cases',
  '/ar/cases',
  '/en/cases/airport-security-application',
  '/en/cases/asian-games-security',
  '/en/cases/water-conservancy-security',
  '/en/media',
  '/ar/media',
  '/en/contact',
  '/ar/contact',
];

const restrictedPaths = [
  '/en/products/handheld-integrated-sdr-low-altitude-monitoring',
  '/en/products/handheld-integrated-multi-band-event-logging-directional-antenna-unit',
  '/en/solutions/airport-anti-uav',
  '/solutions/airport-anti-uav',
  '/en/solutions/power-generation-facility-anti-uav',
  '/ru/solutions/power-generation-facility-anti-uav',
  '/ar/solutions/power-generation-facility-anti-uav',
  '/cases/pakistan-power-plant-anti-uav',
  '/ru/cases/brazil-refinery-anti-uav',
  '/ar/cases/brazil-refinery-anti-uav',
  '/en/media/multi-sensor-cuas-architecture-2026',
  '/media/cuas-critical-infrastructure-deployment-2026',
  '/ar/media/cuas-critical-infrastructure-deployment-2026',
];

const restrictedPatterns = [
  /\bjammer\b/i,
  /\bjamming\b/i,
  /\bsignal blocker\b/i,
  /\bspoofing\b/i,
  /\bdeception\b/i,
  /\bnavigation\s+deception\b/i,
  /\bintercept(?:ion|s|ed|ing)?\b/i,
  /\bneutraliz(?:e|es|ed|ing|ation)\b/i,
  /\bforced?\s+landing\b/i,
  /\bemergency\s+landing\b/i,
  /\breturn\s+to\s+home\b/i,
  /\bprecision\s+strike\b/i,
  /\bstrike\b/i,
  /\bcountermeasures?\b/i,
  /\bweapon\b/i,
  /\bgun\b/i,
  /\bshoot\s+down\b/i,
  /\bstrike\s+down\b/i,
  /\bdestroy\b/i,
  /\bmilitary\s+grade\b/i,
  /\btactical\s+weapon\b/i,
  /\u53cd\u65e0\u4eba\u673a/i,
  /\u53cd\u65e0/i,
  /\u53cd\u5236\u67aa/i,
  /\u53cd\u5236/i,
  /\u5e72\u6270/i,
  /\u538b\u5236/i,
  /\u8bf1\u9a97/i,
  /\u6253\u51fb/i,
  /\u6b66\u5668/i,
  /\u5bdf\u6253\u4e00\u4f53/i,
  /\u65e0\u7ebf\u7535\u4e3b\u52a8\u9632\u5fa1/i,
  /锌芯写邪胁谢械薪/i,
  /谐谢褍褕/i,
  /褋锌褍褎/i,
  /锌械褉械褏胁邪褌/i,
  /芯褉褍卸/i,
  /胁芯械薪薪/i,
  /褌邪泻褌懈褔/i,
];

async function fetchText(path) {
  if (staticDir) {
    const normalized = path.replace(/^\/+/, '').replace(/\/$/, '');
    const htmlPath = join(staticDir, normalized ? `${normalized}.html` : 'index.html');
    if (!existsSync(htmlPath)) {
      return { status: 404, text: '' };
    }
    return { status: 200, text: readFileSync(htmlPath, 'utf8') };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(`${baseUrl}${path}`, { signal: controller.signal });
    const text = await response.text();
    return { status: response.status, text };
  } finally {
    clearTimeout(timeout);
  }
}

function findMatches(text) {
  return restrictedPatterns
    .filter((pattern) => pattern.test(text))
    .map((pattern) => pattern.source);
}

let failures = 0;

for (const path of publicPaths) {
  try {
    const { status, text } = await fetchText(path);
    if (status >= 400) {
      console.error(`[public] ${path} returned ${status}`);
      failures += 1;
      continue;
    }

    const matches = findMatches(text);
    if (matches.length) {
      console.error(`[public] ${path} matched restricted patterns: ${matches.join(', ')}`);
      failures += 1;
    } else {
      console.log(`[public] ${path} ok`);
    }
  } catch (error) {
    console.error(`[public] ${path} failed: ${error.message}`);
    failures += 1;
  }
}

for (const path of restrictedPaths) {
  try {
    const { status } = await fetchText(path);
    if (![404, 410].includes(status)) {
      console.error(`[restricted] ${path} should be unavailable, got ${status}`);
      failures += 1;
    } else {
      console.log(`[restricted] ${path} unavailable as expected (${status})`);
    }
  } catch (error) {
    console.error(`[restricted] ${path} failed: ${error.message}`);
    failures += 1;
  }
}

if (failures) {
  console.error(`Public risk audit failed with ${failures} issue(s).`);
  process.exit(1);
}

console.log('Public risk audit passed.');
