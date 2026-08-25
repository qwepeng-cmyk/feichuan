import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const baseUrl = process.env.AUDIT_BASE_URL || 'http://localhost:3000';
const staticDir = process.env.AUDIT_STATIC_DIR;
const baseOrigin = new URL(baseUrl).origin;

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

async function getPublicPaths() {
  if (staticDir) {
    return ['/', '/products', '/solutions', '/cases', '/media', '/about', '/contact'];
  }

  const { status, text } = await fetchPage('/sitemap.xml');
  if (status >= 400) {
    throw new Error(`/sitemap.xml returned ${status}`);
  }

  return Array.from(text.matchAll(/<loc>(.*?)<\/loc>/g), (match) => {
    const url = new URL(match[1]);
    return `${url.pathname}${url.search}`;
  });
}

function decodeHtmlAttribute(value) {
  const decoded = value
    .replace(/&amp;/g, '&')
    .replace(/&#38;/g, '&')
    .replace(/&#x26;/gi, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#34;/g, '"')
    .replace(/&#x22;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/gi, "'")
    .trim();

  return /^(['"]).*\1$/.test(decoded) ? decoded.slice(1, -1) : decoded;
}

function addAssetUrl(assetPages, rawValue, pagePath) {
  const value = decodeHtmlAttribute(rawValue);
  if (!value || value.startsWith('data:') || value.startsWith('blob:')) return;

  try {
    const assetUrl = new URL(value, `${baseUrl}${pagePath}`);
    if (assetUrl.origin !== baseOrigin) return;

    const key = `${assetUrl.pathname}${assetUrl.search}`;
    if (!assetPages.has(key)) assetPages.set(key, new Set());
    assetPages.get(key).add(pagePath);
  } catch {
    // Invalid attributes are reported by browser-level QA, not this availability audit.
  }
}

function collectImageAssets(html, pagePath, assetPages) {
  for (const tag of html.match(/<(?:img|source|video)\b[^>]*>/gi) || []) {
    for (const match of tag.matchAll(/\b(?:src|poster)=(["'])(.*?)\1/gi)) {
      addAssetUrl(assetPages, match[2], pagePath);
    }

    for (const match of tag.matchAll(/\bsrcset=(["'])(.*?)\1/gi)) {
      for (const candidate of match[2].split(',')) {
        const url = candidate.trim().split(/\s+/)[0];
        addAssetUrl(assetPages, url, pagePath);
      }
    }
  }

  for (const tag of html.match(/<meta\b[^>]*>/gi) || []) {
    const imageProperty = tag.match(/\b(?:property|name)=(["'])(.*?)\1/i);
    if (
      !imageProperty ||
      !/^(?:og:image(?::(?:url|secure_url|type|width|height))?|twitter:image(?::src)?)$/i.test(
        imageProperty[2],
      ) ||
      /:(?:alt|type|width|height)$/i.test(imageProperty[2])
    ) {
      continue;
    }
    const content = tag.match(/\bcontent=(["'])(.*?)\1/i);
    if (content) addAssetUrl(assetPages, content[2], pagePath);
  }

  for (const match of html.matchAll(/\burl\((["']?)(.*?)\1\)/gi)) {
    addAssetUrl(assetPages, match[2], pagePath);
  }
}

async function auditImageAssets(assetPages) {
  if (staticDir) return 0;

  const entries = Array.from(assetPages.entries());
  let cursor = 0;
  let failures = 0;

  async function worker() {
    while (cursor < entries.length) {
      const [assetPath, sourcePages] = entries[cursor++];
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);
        let response;
        try {
          response = await fetch(`${baseUrl}${assetPath}`, {
            redirect: 'follow',
            signal: controller.signal,
          });
        } finally {
          clearTimeout(timeout);
        }

        if (response.status >= 400) {
          console.error(
            `[asset] ${assetPath} returned ${response.status} (referenced by ${Array.from(sourcePages).join(', ')})`,
          );
          failures += 1;
        }
      } catch (error) {
        console.error(
          `[asset] ${assetPath} failed: ${error.message} (referenced by ${Array.from(sourcePages).join(', ')})`,
        );
        failures += 1;
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(12, entries.length) }, () => worker()));
  console.log(`Audited ${entries.length} unique public image assets.`);
  return failures;
}

let failures = 0;
const publicPaths = await getPublicPaths();
const assetPages = new Map();

for (const path of publicPaths) {
  try {
    const { status, text } = await fetchPage(path);
    if (status >= 400) {
      console.error(`[public] ${path} returned ${status}`);
      failures += 1;
    } else {
      console.log(`[public] ${path} ok`);
      collectImageAssets(text, path, assetPages);
    }
  } catch (error) {
    console.error(`[public] ${path} failed: ${error.message}`);
    failures += 1;
  }
}

failures += await auditImageAssets(assetPages);

if (failures) {
  console.error(`Public availability audit failed with ${failures} issue(s).`);
  process.exit(1);
}

console.log(`Public availability audit passed for ${publicPaths.length} sitemap pages.`);
