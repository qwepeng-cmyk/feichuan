import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import Database from 'better-sqlite3';

const root = process.cwd();
const publicRoot = path.resolve(root, 'public');
const buildRoot = path.resolve(root, '.next');
const recoveryRoot = path.resolve(
  process.env.PUBLIC_PRUNE_RECOVERY || 'D:\\fc-cuas-ru-pruned-content-20260729\\public',
);
const apply = process.argv.includes('--apply');

const assetExtensions =
  'avif|css|gif|ico|jpe?g|json|mp4|otf|pdf|png|svg|ttf|txt|webm|webp|woff2?';
const quotedAssetPattern = new RegExp(
  `["'\\x60]((?:https?:\\/\\/[^\\s"'\\x60<>]+)?\\/(?:[^"'\\x60<>\\r\\n?#]|%[0-9a-f]{2})+?\\.(?:${assetExtensions}))(?:[?#][^"'\\x60<>\\r\\n]*)?["'\\x60]`,
  'gi',
);
const cssAssetPattern = new RegExp(
  `url\\(\\s*["']?((?:https?:\\/\\/[^\\s"'\\x60<>]+)?\\/(?:[^)"'\\r\\n?#]|%[0-9a-f]{2})+?\\.(?:${assetExtensions}))(?:[?#][^)"'\\r\\n]*)?["']?\\s*\\)`,
  'gi',
);
const imageOptimizerPattern = /(?:\?|&|\\u0026)url=([^&"'`\s<>]+)/gi;

const keep = new Set();
const referenceSources = new Map();

function inside(parent, child) {
  const relative = path.relative(parent, child);
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

function normalizeReference(raw) {
  if (!raw) return null;
  let value = String(raw)
    .replaceAll('\\/', '/')
    .replaceAll('\\u002F', '/')
    .replaceAll('\\u002f', '/')
    .replaceAll('&amp;', '&')
    .trim();

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const decoded = decodeURIComponent(value);
      if (decoded === value) break;
      value = decoded;
    } catch {
      break;
    }
  }

  if (value.startsWith('http://') || value.startsWith('https://')) {
    try {
      value = new URL(value).pathname;
    } catch {
      return null;
    }
  }

  value = value.split('?')[0].split('#')[0].replaceAll('\\', '/');
  if (!value.startsWith('/') || value.startsWith('/_next/') || value.includes('${')) return null;

  const relative = value.slice(1).replace(/^public\//, '');
  const normalized = path.posix.normalize(relative);
  if (!normalized || normalized === '.' || normalized.startsWith('../')) return null;
  return normalized;
}

function addReference(raw, source) {
  const relative = normalizeReference(raw);
  if (!relative) return;
  keep.add(relative);
  if (!referenceSources.has(relative)) referenceSources.set(relative, source);
}

function collectReferences(text, source) {
  if (!text) return;
  const normalizedText = String(text)
    .replaceAll('\\/', '/')
    .replaceAll('\\u002F', '/')
    .replaceAll('\\u002f', '/');

  quotedAssetPattern.lastIndex = 0;
  for (const match of normalizedText.matchAll(quotedAssetPattern)) {
    addReference(match[1], source);
  }

  cssAssetPattern.lastIndex = 0;
  for (const match of normalizedText.matchAll(cssAssetPattern)) {
    addReference(match[1], source);
  }

  imageOptimizerPattern.lastIndex = 0;
  for (const match of normalizedText.matchAll(imageOptimizerPattern)) {
    let value = match[1];
    try {
      value = decodeURIComponent(value);
    } catch {
      // Ignore malformed encoding and let normalizeReference handle the raw value.
    }
    addReference(value, source);
  }
}

function walkFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  const result = [];
  const stack = [directory];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(fullPath);
      else if (entry.isFile()) result.push(fullPath);
    }
  }
  return result;
}

function scanBuild() {
  const readable = new Set(['.css', '.html', '.js', '.json', '.map', '.rsc', '.txt']);
  for (const filePath of walkFiles(buildRoot)) {
    if (!readable.has(path.extname(filePath).toLowerCase())) continue;
    const stat = fs.statSync(filePath);
    if (stat.size > 16 * 1024 * 1024) continue;
    collectReferences(fs.readFileSync(filePath, 'utf8'), path.relative(root, filePath));
  }
}

function scanDatabase() {
  const dbPath = path.join(root, 'data', 'ntet.db');
  const db = new Database(dbPath, { readonly: true });
  try {
    for (const table of ['products', 'solutions', 'cases', 'media', 'site_settings']) {
      const exists = db
        .prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?")
        .get(table);
      if (!exists) continue;
      for (const row of db.prepare(`SELECT * FROM "${table}"`).iterate()) {
        for (const [column, value] of Object.entries(row)) {
          if (typeof value === 'string') collectReferences(value, `data/ntet.db:${table}.${column}`);
        }
      }
    }
  } finally {
    db.close();
  }
}

function addRuntimeFiles() {
  const exactFiles = [
    'apple-touch-icon.png',
    'favicon.ico',
    'google6a8aa13ca5c851c0.html',
    'icon.png',
    'llms.txt',
    'logo-header.webp',
    'logo.png',
    'logo1-small.webp',
    'logo1.webp',
    'media/news_data.json',
    'robots.txt',
  ];
  for (const relative of exactFiles) keep.add(relative);
}

function scanKeptTextDependencies() {
  const readable = new Set(['.css', '.html', '.js', '.json', '.svg', '.txt']);
  const scanned = new Set();
  let changed = true;
  while (changed) {
    changed = false;
    for (const relative of [...keep]) {
      if (scanned.has(relative)) continue;
      scanned.add(relative);
      const filePath = path.resolve(publicRoot, relative);
      if (!inside(publicRoot, filePath) || !fs.existsSync(filePath)) continue;
      if (!readable.has(path.extname(filePath).toLowerCase())) continue;
      const before = keep.size;
      collectReferences(fs.readFileSync(filePath, 'utf8'), `public/${relative}`);
      if (keep.size > before) changed = true;
    }
  }
}

function formatMb(bytes) {
  return Math.round((bytes / 1024 / 1024) * 100) / 100;
}

function summarizeByTopLevel(files) {
  const groups = new Map();
  for (const file of files) {
    const top = file.relative.split('/')[0] || '(root)';
    const current = groups.get(top) || { files: 0, bytes: 0 };
    current.files += 1;
    current.bytes += file.bytes;
    groups.set(top, current);
  }
  return [...groups.entries()]
    .map(([name, value]) => ({ name, files: value.files, mb: formatMb(value.bytes) }))
    .sort((a, b) => b.mb - a.mb);
}

if (!inside(root, publicRoot)) throw new Error(`Unsafe public root: ${publicRoot}`);
if (inside(root, recoveryRoot) || path.parse(recoveryRoot).root === recoveryRoot) {
  throw new Error(`Unsafe recovery root: ${recoveryRoot}`);
}
if (!fs.existsSync(buildRoot)) throw new Error('Missing .next build. Run npm run build first.');

scanBuild();
scanDatabase();
addRuntimeFiles();
scanKeptTextDependencies();

const publicFiles = walkFiles(publicRoot).map((filePath) => ({
  filePath,
  relative: path.relative(publicRoot, filePath).replaceAll('\\', '/'),
  bytes: fs.statSync(filePath).size,
}));
const keptFiles = publicFiles.filter((file) => keep.has(file.relative));
const removableFiles = publicFiles.filter((file) => !keep.has(file.relative));
const missingReferences = [...keep]
  .filter((relative) => !fs.existsSync(path.resolve(publicRoot, relative)))
  .sort();

console.log(`Mode: ${apply ? 'APPLY' : 'DRY RUN'}`);
console.log(`Public files: ${publicFiles.length} (${formatMb(publicFiles.reduce((sum, file) => sum + file.bytes, 0))} MB)`);
console.log(`Keep: ${keptFiles.length} (${formatMb(keptFiles.reduce((sum, file) => sum + file.bytes, 0))} MB)`);
console.log(`Move: ${removableFiles.length} (${formatMb(removableFiles.reduce((sum, file) => sum + file.bytes, 0))} MB)`);
console.log('Keep by top-level:', summarizeByTopLevel(keptFiles));
console.log('Move by top-level:', summarizeByTopLevel(removableFiles));
console.log(`Missing referenced assets: ${missingReferences.length}`);
if (missingReferences.length) console.log(missingReferences.slice(0, 100));

if (apply) {
  fs.mkdirSync(recoveryRoot, { recursive: true });
  for (const file of removableFiles) {
    const source = path.resolve(file.filePath);
    const destination = path.resolve(recoveryRoot, file.relative);
    if (!inside(publicRoot, source)) throw new Error(`Unsafe source: ${source}`);
    if (!inside(recoveryRoot, destination)) throw new Error(`Unsafe destination: ${destination}`);
    if (fs.existsSync(destination)) throw new Error(`Recovery destination already exists: ${destination}`);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.renameSync(source, destination);
  }
  console.log(`Moved ${removableFiles.length} files to ${recoveryRoot}`);
}
