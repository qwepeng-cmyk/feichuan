import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import Database from 'better-sqlite3';

const sourceRoot = process.cwd();
const legacyBuildRoot = '/Users/mattchyi/Documents/Project/fc';

if (process.platform === 'win32') {
  throw new Error('Run this deploy script from WSL/Linux, for example: wsl.exe bash -lc "cd /mnt/d/fc && npm run deploy:production"');
}

function loadEnvFile(file) {
  if (!existsSync(file)) return;
  const content = readFileSync(file, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    if (process.env[key]) continue;
    process.env[key] = rawValue.replace(/^['"]|['"]$/g, '');
  }
}

loadEnvFile(join(sourceRoot, '.env.deploy.local'));

const deployUser = process.env.DEPLOY_USER || 'root';
const deployHost = process.env.DEPLOY_HOST || '43.129.170.171';
const deployPath = process.env.DEPLOY_PATH || '/www/wwwroot/n-tet.com';
const remote = `${deployUser}@${deployHost}`;
const buildRoot = process.env.DEPLOY_BUILD_ROOT || (sourceRoot.startsWith('/mnt/') ? legacyBuildRoot : sourceRoot);
const localTar = process.env.DEPLOY_TAR || join(sourceRoot, 'scratch', 'next-deploy.tar.gz');
const remoteTar = '/tmp/next-deploy.tar.gz';
const zoneName = process.env.ZONE_NAME || 'n-tet.com';
const skipCloudflarePurge = process.env.SKIP_CF_PURGE === '1';

function step(title) {
  console.log(`\n==> ${title}`);
}

function run(command, args, options = {}) {
  console.log(`$ ${[command, ...args].map((part) => (/\s/.test(part) ? JSON.stringify(part) : part)).join(' ')}`);
  return execFileSync(command, args, {
    cwd: options.cwd || sourceRoot,
    stdio: 'inherit',
    encoding: 'utf8',
  });
}

function output(command, args, options = {}) {
  return execFileSync(command, args, {
    cwd: options.cwd || sourceRoot,
    stdio: ['ignore', 'pipe', 'pipe'],
    encoding: 'utf8',
  }).trim();
}

function withSshpass(command, args) {
  return process.env.SSHPASS ? ['sshpass', ['-e', command, ...args]] : [command, args];
}

function ssh(remoteCommand, options = {}) {
  const [command, args] = withSshpass('ssh', [
    '-o',
    'StrictHostKeyChecking=accept-new',
    remote,
    remoteCommand,
  ]);
  return options.capture ? output(command, args) : run(command, args);
}

function scp(local, remotePath) {
  const [command, args] = withSshpass('scp', [
    '-o',
    'StrictHostKeyChecking=accept-new',
    local,
    `${remote}:${remotePath}`,
  ]);
  run(command, args);
}

function scpFromRemote(remotePath, local) {
  const [command, args] = withSshpass('scp', [
    '-o',
    'StrictHostKeyChecking=accept-new',
    `${remote}:${remotePath}`,
    local,
  ]);
  run(command, args);
}

function rsyncPublic() {
  const [command, args] = withSshpass('rsync', [
    '-az',
    '--checksum',
    '-e',
    'ssh -o StrictHostKeyChecking=accept-new',
    'public/',
    `${remote}:${deployPath}/public/`,
  ]);
  run(command, args);
}

function prepareBuildRoot() {
  if (buildRoot === sourceRoot) {
    return;
  }

  step('Prepare WSL build directory');
  run('mkdir', ['-p', buildRoot]);
  run('rsync', [
    '-a',
    '--delete',
    '--exclude',
    '.git',
    '--exclude',
    '.next',
    '--exclude',
    'node_modules',
    '--exclude',
    'scratch',
    '--exclude',
    '.env*',
    '--exclude',
    '.chrome-debug-profile',
    '--exclude',
    '.vscode',
    '--exclude',
    '*.log',
    '--exclude',
    '*.pid',
    `${sourceRoot}/`,
    `${buildRoot}/`,
  ]);

  if (!existsSync(join(buildRoot, 'node_modules'))) {
    run('npm', ['ci', '--no-audit', '--no-fund'], { cwd: buildRoot });
  }
}

function sha256(file) {
  return output('sha256sum', [file]).split(/\s+/)[0];
}

function remoteSha256(file) {
  return ssh(`sha256sum ${file} | awk '{print $1}'`, { capture: true });
}

function mergeRemoteInquiriesIntoLocal(localDb, remoteDb) {
  if (!existsSync(remoteDb)) return { remoteCount: 0, localCountBefore: 0, inserted: 0, localCountAfter: 0 };

  const local = new Database(localDb);
  const remoteDatabase = new Database(remoteDb, { readonly: true });
  try {
    const tableExists = (database, name) => database
      .prepare("select name from sqlite_master where type='table' and name=?")
      .get(name);

    if (!tableExists(local, 'inquiries') || !tableExists(remoteDatabase, 'inquiries')) {
      return { remoteCount: 0, localCountBefore: 0, inserted: 0, localCountAfter: 0 };
    }

    const columns = local.prepare('pragma table_info(inquiries)').all().map((row) => row.name);
    const remoteColumns = new Set(remoteDatabase.prepare('pragma table_info(inquiries)').all().map((row) => row.name));
    const missingColumns = columns.filter((column) => !remoteColumns.has(column));
    if (missingColumns.length) {
      throw new Error(`Remote inquiries table is missing columns: ${missingColumns.join(', ')}`);
    }

    const localCountBefore = local.prepare('select count(*) as c from inquiries').get().c;
    const remoteCount = remoteDatabase.prepare('select count(*) as c from inquiries').get().c;
    const localIds = new Set(local.prepare('select id from inquiries').all().map((row) => row.id));
    const remoteRows = remoteDatabase.prepare('select * from inquiries order by id').all();
    const missingRows = remoteRows.filter((row) => !localIds.has(row.id));

    if (missingRows.length) {
      const names = columns.map((name) => `"${name.replace(/"/g, '""')}"`).join(', ');
      const params = columns.map((name) => `@${name}`).join(', ');
      const insert = local.prepare(`insert into inquiries (${names}) values (${params})`);
      local.transaction((rows) => rows.forEach((row) => insert.run(row)))(missingRows);
    }

    const localCountAfter = local.prepare('select count(*) as c from inquiries').get().c;
    return { remoteCount, localCountBefore, inserted: missingRows.length, localCountAfter };
  } finally {
    remoteDatabase.close();
    local.close();
  }
}

function shellQuote(value) {
  return `'${String(value).replace(/'/g, `'\\''`)}'`;
}

function remoteSymlinkCommand() {
  const normalizedBuildRoot = buildRoot.replace(/\\/g, '/');
  const links = Array.from(new Set([legacyBuildRoot, normalizedBuildRoot]));
  return links
    .map((link) => `mkdir -p ${shellQuote(dirname(link))} && ln -sfn ${shellQuote(deployPath)} ${shellQuote(link)}`)
    .join(' && ');
}

function syncDatabaseIfChanged() {
  const localDb = join(sourceRoot, 'data', 'ntet.db');
  if (!existsSync(localDb)) {
    console.log('No data/ntet.db found locally; skipped database sync.');
    return;
  }

  mkdirSync(join(sourceRoot, 'scratch'), { recursive: true });
  const remoteDbSnapshot = join(sourceRoot, 'scratch', 'remote-ntet-before-deploy.db');
  try {
    scpFromRemote(`${deployPath}/data/ntet.db`, remoteDbSnapshot);
    const mergeResult = mergeRemoteInquiriesIntoLocal(localDb, remoteDbSnapshot);
    console.log(
      `Inquiry DB guard: remote=${mergeResult.remoteCount} localBefore=${mergeResult.localCountBefore} ` +
      `merged=${mergeResult.inserted} localAfter=${mergeResult.localCountAfter}`
    );
  } catch (error) {
    console.warn(`Could not merge remote inquiries before DB sync: ${error instanceof Error ? error.message : error}`);
  }

  const localHash = sha256(localDb);
  let remoteHash = '';
  try {
    remoteHash = remoteSha256(`${deployPath}/data/ntet.db`);
  } catch {
    remoteHash = '';
  }

  if (localHash === remoteHash) {
    console.log(`Database already in sync: ${localHash}`);
    return;
  }

  step('Sync database');
  scp(localDb, '/tmp/ntet.db.deploy');
  ssh(`cd ${deployPath} && mkdir -p data && if [ -f data/ntet.db ]; then cp data/ntet.db data/ntet.db.bak.deploy-$(date +%Y%m%d%H%M%S); fi && mv /tmp/ntet.db.deploy data/ntet.db`);
  const uploadedHash = remoteSha256(`${deployPath}/data/ntet.db`);
  if (uploadedHash !== localHash) {
    throw new Error(`Database hash mismatch. local=${localHash} remote=${uploadedHash}`);
  }
  console.log(`Database synced: ${uploadedHash}`);
}

async function verifyLiveUrls() {
  const urls = [
    `https://${zoneName}/en/products?deploycheck=${Date.now()}`,
    `https://${zoneName}/en/cases?deploycheck=${Date.now()}`,
    `https://${zoneName}/robots.txt?deploycheck=${Date.now()}`,
    `https://${zoneName}/llms.txt?deploycheck=${Date.now()}`,
    `https://${zoneName}/sitemap.xml?deploycheck=${Date.now()}`,
    `https://${zoneName}/google6a8aa13ca5c851c0.html?deploycheck=${Date.now()}`,
    `https://${zoneName}/logo-header.webp?deploycheck=${Date.now()}`,
  ];

  for (const url of urls) {
    const response = await fetch(url, { redirect: 'follow' });
    if (!response.ok) {
      throw new Error(`Live check failed: ${response.status} ${url}`);
    }
    if (url.includes('/sitemap.xml')) {
      const contentType = response.headers.get('content-type') || '';
      if (!/xml/i.test(contentType)) {
        throw new Error(`Live sitemap returned unexpected content-type: ${contentType || 'none'}`);
      }
    }
    console.log(`${response.status} ${url}`);
  }
}

step('Sync public assets');
rsyncPublic();

step('Check public assets');
run('node', ['scripts/check-public-sync.mjs']);

step('Check and sync database');
syncDatabaseIfChanged();

step('Build locally');
prepareBuildRoot();
run('npm', ['run', 'build'], { cwd: buildRoot });

step('Package .next');
mkdirSync(dirname(localTar), { recursive: true });
run('tar', ['-czf', localTar, '.next'], { cwd: buildRoot });
const localTarHash = sha256(localTar);
console.log(`Local tar sha256: ${localTarHash}`);

step('Upload .next package');
scp(localTar, remoteTar);
const remoteTarHash = remoteSha256(remoteTar);
if (remoteTarHash !== localTarHash) {
  throw new Error(`Deploy tar hash mismatch. local=${localTarHash} remote=${remoteTarHash}`);
}
console.log(`Remote tar sha256: ${remoteTarHash}`);

step('Extract and restart PM2');
ssh(`${remoteSymlinkCommand()} && cd ${shellQuote(deployPath)} && tar -xzf ${shellQuote(remoteTar)} && pm2 restart n-tet`);

if (skipCloudflarePurge) {
  console.log('Skipped Cloudflare purge because SKIP_CF_PURGE=1.');
} else {
  if (!process.env.CLOUDFLARE_API_TOKEN) {
    throw new Error('Missing CLOUDFLARE_API_TOKEN. Set it in .env.deploy.local or export it before deploy.');
  }
  step('Purge Cloudflare cache');
  run('node', ['scripts/cloudflare-purge-cache.mjs', '--everything']);
}

step('Verify live site');
await verifyLiveUrls();

console.log('\nProduction deploy completed.');
