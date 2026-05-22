import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const baseUrl = process.env.AUDIT_BASE_URL || 'http://localhost:3000';
const staticDir = process.env.AUDIT_STATIC_DIR;

const publicPaths = [
  '/en',
  '/ru',
  '/en/products',
  '/ru/products',
  '/en/products/stationary-rf-detection-system',
  '/en/products/low-altitude-detection-radar-ku-band',
  '/en/solutions',
  '/en/solutions/category/02_InfrastructureProtection',
  '/en/cases',
  '/en/media',
  '/en/contact',
];

const restrictedPaths = [
  '/en/products/directional-rf-jammer',
  '/en/products/omni-directional-rf-jammer',
  '/en/products/handheld-integrated-multi-band-jammer-gun',
  '/en/products/uav-navigation-spoofing-system',
  '/en/solutions/airport-anti-uav',
  '/en/solutions/power-generation-facility-anti-uav',
  '/en/cases/airport-security-application',
  '/en/media/multi-sensor-cuas-architecture-2026',
];

const restrictedPatterns = [
  /\bjammer\b/i,
  /\bjamming\b/i,
  /\bsignal blocker\b/i,
  /\bspoofing\b/i,
  /\bintercept(?:ion|s|ed|ing)?\b/i,
  /\bweapon\b/i,
  /\bgun\b/i,
  /\bshoot\s+down\b/i,
  /\bstrike\s+down\b/i,
  /\bdestroy\b/i,
  /\bmilitary\s+grade\b/i,
  /\btactical\s+weapon\b/i,
  /\banti[-\s]?uav\b/i,
  /\banti[-\s]?drone\b/i,
  /\bc-uas\b/i,
  /\bcuas\b/i,
  /подавлен/i,
  /глуш/i,
  /спуф/i,
  /перехват/i,
  /оруж/i,
  /военн/i,
  /тактич/i,
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

  const response = await fetch(`${baseUrl}${path}`);
  const text = await response.text();
  return { status: response.status, text };
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
