const token = process.env.CLOUDFLARE_API_TOKEN;
const zoneName = process.env.ZONE_NAME || 'n-tet.com';
const args = process.argv.slice(2);

if (!token) {
  console.error('Missing CLOUDFLARE_API_TOKEN.');
  process.exit(1);
}

async function cf(path, init = {}) {
  const response = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    const message = data.errors?.map((error) => error.message).join('; ') || response.statusText;
    throw new Error(message);
  }
  return data;
}

function normalizeUrl(value) {
  if (/^https?:\/\//.test(value)) return value;
  const path = value.startsWith('/') ? value : `/${value}`;
  return `https://${zoneName}${path}`;
}

const purgeEverything = args.includes('--everything');
const files = args.filter((arg) => arg !== '--everything').map(normalizeUrl);

if (!purgeEverything && files.length === 0) {
  console.error('Usage: node scripts/cloudflare-purge-cache.mjs --everything');
  console.error('   or: node scripts/cloudflare-purge-cache.mjs /products/example.webp https://n-tet.com/cases/example.webp');
  process.exit(1);
}

if (purgeEverything && files.length > 0) {
  console.error('Use either --everything or a file list, not both.');
  process.exit(1);
}

const zoneResult = await cf(`/zones?name=${encodeURIComponent(zoneName)}`);
const zoneId = zoneResult.result?.[0]?.id;
if (!zoneId) {
  throw new Error(`Cloudflare zone not found: ${zoneName}`);
}

const payload = purgeEverything ? { purge_everything: true } : { files };
await cf(`/zones/${zoneId}/purge_cache`, {
  method: 'POST',
  body: JSON.stringify(payload),
});

console.log(purgeEverything ? `Purged all cache for ${zoneName}.` : `Purged ${files.length} URL(s) for ${zoneName}.`);
