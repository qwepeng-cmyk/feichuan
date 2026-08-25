import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import nextEnv from '@next/env';

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const DEFAULT_SITE_URL = 'https://n-tet.com';

function siteUrlFromEnvironment() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;

  try {
    const url = new URL(configured);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
      throw new Error(`Unsupported protocol: ${url.protocol}`);
    }
    return `${url.protocol}//${url.host}`;
  } catch (error) {
    console.warn(`Invalid NEXT_PUBLIC_SITE_URL (${configured}); using ${DEFAULT_SITE_URL}.`, error);
    return DEFAULT_SITE_URL;
  }
}

const siteUrl = siteUrlFromEnvironment();
const llmsTemplate = readFileSync(join(process.cwd(), 'src', 'content', 'llms.txt'), 'utf8');
const llms = llmsTemplate.replaceAll('{{SITE_URL}}', siteUrl);
const privatePaths = ['/admin/', '/api/', '/*/preview'];
const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'PerplexityBot',
  'Google-Extended',
];
const directives = [
  ...aiCrawlers.map((crawler) => `User-agent: ${crawler}`),
  'Allow: /',
  ...privatePaths.map((path) => `Disallow: ${path}`),
  '',
  'User-agent: *',
  'Allow: /',
  ...privatePaths.map((path) => `Disallow: ${path}`),
  '',
  `Sitemap: ${siteUrl}/sitemap.xml`,
  '',
];

writeFileSync(join(process.cwd(), 'public', 'llms.txt'), llms, 'utf8');
writeFileSync(join(process.cwd(), 'public', 'robots.txt'), directives.join('\n'), 'utf8');
console.log(`Generated public/robots.txt and public/llms.txt for ${siteUrl}.`);
