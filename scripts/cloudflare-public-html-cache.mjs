import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

function loadEnvFile(file) {
  if (!existsSync(file)) return;
  const content = readFileSync(file, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
}

loadEnvFile(join(process.cwd(), '.env.deploy.local'));

const token = process.env.CLOUDFLARE_API_TOKEN;
const zoneName = process.env.ZONE_NAME || 'n-tet.com';
const checkOnly = process.argv.includes('--check');
const ruleRef = 'ntet_public_html_cache_v1';
const ruleDescription = 'N-TET public HTML edge cache (exclude Next.js RSC requests)';

if (!token) {
  console.error('Missing CLOUDFLARE_API_TOKEN. Add it to .env.deploy.local or export it before running this command.');
  process.exit(1);
}

async function cf(path, init = {}, { allowNotFound = false } = {}) {
  const response = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
  const data = await response.json();
  if (allowNotFound && response.status === 404) return null;
  if (!response.ok || !data.success) {
    const message = data.errors?.map((error) => error.message).join('; ') || response.statusText;
    throw new Error(message);
  }
  return data;
}

const publicSections = ['products', 'accessories', 'solutions', 'cases', 'media', 'about', 'contact'];
const locales = ['', '/ru', '/es', '/ar'];
const pathExpressions = [
  'http.request.uri.path in {"/" "/ru" "/es" "/ar"}',
  ...locales.flatMap((locale) => publicSections.map((section) => {
    const base = `${locale}/${section}`;
    return `(http.request.uri.path eq "${base}" or starts_with(http.request.uri.path, "${base}/"))`;
  })),
];

const expression = [
  `http.host eq "${zoneName}"`,
  'http.request.method in {"GET" "HEAD"}',
  'not any(http.request.headers["rsc"][*] eq "1")',
  'not any(http.request.headers["next-router-prefetch"][*] eq "1")',
  'not (http.request.uri.query contains "_rsc=")',
  `(${pathExpressions.join(' or ')})`,
].map((part) => `(${part})`).join(' and ');

const desiredRule = {
  ref: ruleRef,
  description: ruleDescription,
  expression,
  action: 'set_cache_settings',
  action_parameters: {
    cache: true,
    edge_ttl: {
      mode: 'override_origin',
      default: 3600,
    },
    browser_ttl: {
      mode: 'respect_origin',
    },
  },
  enabled: true,
};

const zoneResult = await cf(`/zones?name=${encodeURIComponent(zoneName)}`);
const zoneId = zoneResult.result?.[0]?.id;
if (!zoneId) throw new Error(`Cloudflare zone not found: ${zoneName}`);

const entrypointPath = `/zones/${zoneId}/rulesets/phases/http_request_cache_settings/entrypoint`;
const entrypoint = await cf(entrypointPath, {}, { allowNotFound: true });
const ruleset = entrypoint?.result;
const existingRule = ruleset?.rules?.find((rule) => rule.ref === ruleRef || rule.description === ruleDescription);

if (checkOnly) {
  if (!existingRule) {
    console.log(`Public HTML cache rule is not configured for ${zoneName}.`);
    process.exitCode = 2;
  } else {
    console.log(`Public HTML cache rule is configured and ${existingRule.enabled === false ? 'disabled' : 'enabled'} for ${zoneName}.`);
  }
} else if (!ruleset) {
  await cf(`/zones/${zoneId}/rulesets`, {
    method: 'POST',
    body: JSON.stringify({
      name: 'N-TET cache rules',
      description: 'Zone-level cache rules managed by the N-TET repository.',
      kind: 'zone',
      phase: 'http_request_cache_settings',
      rules: [desiredRule],
    }),
  });
  console.log(`Created the public HTML cache ruleset for ${zoneName}.`);
} else if (existingRule) {
  await cf(`/zones/${zoneId}/rulesets/${ruleset.id}/rules/${existingRule.id}`, {
    method: 'PUT',
    body: JSON.stringify(desiredRule),
  });
  console.log(`Updated the public HTML cache rule for ${zoneName}.`);
} else {
  await cf(`/zones/${zoneId}/rulesets/${ruleset.id}/rules`, {
    method: 'POST',
    body: JSON.stringify(desiredRule),
  });
  console.log(`Added the public HTML cache rule for ${zoneName}.`);
}

console.log('Covered routes: home, products, accessories, solutions, cases, media, about, and contact (including ru/es/ar prefixes).');
console.log('Excluded: API/admin/thank-you routes, non-GET requests, and Next.js RSC/prefetch requests. Edge TTL: 3600 seconds.');
