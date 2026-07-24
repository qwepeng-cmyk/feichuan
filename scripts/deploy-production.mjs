import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

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
const zoneName = process.env.ZONE_NAME || 'n-tet.com';
const skipCloudflarePurge = process.env.SKIP_CF_PURGE === '1';
const deployRsyncBwlimit = process.env.DEPLOY_RSYNC_BWLIMIT || '0';
const deployMtu = process.env.DEPLOY_MTU || '1280';
const deployNetworkInterface = process.env.DEPLOY_NETWORK_INTERFACE || '';
const deployUploadMode = process.env.DEPLOY_UPLOAD_MODE || 'delta';
const deployRsyncAttempts = Number(process.env.DEPLOY_RSYNC_ATTEMPTS || '20');
const skipBuild = process.env.DEPLOY_SKIP_BUILD === '1';
const sshOptions = [
  '-F',
  '/dev/null',
  '-o',
  'StrictHostKeyChecking=accept-new',
  '-o',
  'ConnectTimeout=15',
  '-o',
  'ServerAliveInterval=10',
  '-o',
  'ServerAliveCountMax=3',
  '-o',
  'TCPKeepAlive=yes',
  '-o',
  'IPQoS=none',
];

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

function rsyncRemoteShell() {
  const sshCommand = ['ssh', ...sshOptions].join(' ');
  return process.env.SSHPASS ? `sshpass -e ${sshCommand}` : sshCommand;
}

function ssh(remoteCommand, options = {}) {
  const [command, args] = withSshpass('ssh', [
    ...sshOptions,
    remote,
    remoteCommand,
  ]);
  return options.capture ? output(command, args) : run(command, args);
}

function scp(local, remotePath) {
  const [command, args] = withSshpass('scp', [
    ...sshOptions,
    local,
    `${remote}:${remotePath}`,
  ]);
  run(command, args);
}

function scpFromRemote(remotePath, local) {
  const [command, args] = withSshpass('scp', [
    ...sshOptions,
    `${remote}:${remotePath}`,
    local,
  ]);
  run(command, args);
}

function rsyncPublic() {
  run('rsync', [
    '-az',
    '--checksum',
    '-e',
    rsyncRemoteShell(),
    'public/',
    `${remote}:${deployPath}/public/`,
  ]);
}

function isWslRuntime() {
  if (process.env.WSL_DISTRO_NAME || process.env.WSL_INTEROP) return true;
  try {
    return /microsoft/i.test(readFileSync('/proc/version', 'utf8'));
  } catch {
    return false;
  }
}

function mtuCommand(args) {
  if (typeof process.getuid === 'function' && process.getuid() !== 0) {
    return run('sudo', ['-n', 'ip', ...args]);
  }
  return run('ip', args);
}

let mtuRestoreState = null;

function configureDeploymentMtu() {
  if (!isWslRuntime()) {
    console.log('MTU adjustment skipped outside WSL.');
    return;
  }

  if (deployMtu === '0' || /^off$/i.test(deployMtu)) {
    console.log('MTU adjustment disabled by DEPLOY_MTU.');
    return;
  }

  const requestedMtu = Number(deployMtu);
  if (!Number.isInteger(requestedMtu) || requestedMtu < 576 || requestedMtu > 9000) {
    throw new Error(`Invalid DEPLOY_MTU=${deployMtu}. Use an integer from 576 to 9000, or 0 to disable.`);
  }

  const route = output('ip', ['route', 'get', deployHost]);
  const routeInterface = route.match(/\bdev\s+(\S+)/)?.[1];
  const networkInterface = deployNetworkInterface || routeInterface;
  if (!networkInterface) {
    throw new Error(`Could not detect the WSL network interface used for ${deployHost}. Set DEPLOY_NETWORK_INTERFACE.`);
  }

  const link = output('ip', ['-o', 'link', 'show', 'dev', networkInterface]);
  const originalMtu = Number(link.match(/\bmtu\s+(\d+)/)?.[1]);
  if (!Number.isInteger(originalMtu)) {
    throw new Error(`Could not read MTU for WSL interface ${networkInterface}.`);
  }

  const targetMtu = Math.min(originalMtu, requestedMtu);
  if (targetMtu === originalMtu) {
    console.log(`WSL upload MTU already ${originalMtu} on ${networkInterface}.`);
    return;
  }

  step('Configure WSL upload MTU');
  try {
    mtuCommand(['link', 'set', 'dev', networkInterface, 'mtu', String(targetMtu)]);
  } catch {
    throw new Error(
      `Could not set WSL interface ${networkInterface} MTU to ${targetMtu}. ` +
      'Run the deploy from a root WSL shell or configure passwordless sudo for the ip command.'
    );
  }

  mtuRestoreState = { networkInterface, originalMtu };
  console.log(`WSL upload MTU: ${originalMtu} -> ${targetMtu} on ${networkInterface}.`);
}

function restoreDeploymentMtu() {
  if (!mtuRestoreState) return;
  const { networkInterface, originalMtu } = mtuRestoreState;
  mtuRestoreState = null;
  try {
    mtuCommand(['link', 'set', 'dev', networkInterface, 'mtu', String(originalMtu)]);
    console.log(`Restored WSL MTU to ${originalMtu} on ${networkInterface}.`);
  } catch (error) {
    console.warn(`Could not restore WSL MTU on ${networkInterface}: ${error instanceof Error ? error.message : error}`);
  }
}

process.once('exit', restoreDeploymentMtu);
process.once('SIGINT', () => {
  restoreDeploymentMtu();
  process.exit(130);
});
process.once('SIGTERM', () => {
  restoreDeploymentMtu();
  process.exit(143);
});

function rsyncProductBrochures() {
  run('rsync', [
    '-az',
    '--checksum',
    '-e',
    rsyncRemoteShell(),
    'private/product-brochures/',
    `${remote}:${deployPath}/private/product-brochures/`,
  ]);
}

function rsyncUpload(local, remotePath) {
  run('rsync', [
    '-azP',
    '--partial',
    '--append-verify',
    `--bwlimit=${deployRsyncBwlimit}`,
    '-e',
    rsyncRemoteShell(),
    local,
    `${remote}:${remotePath}`,
  ]);
}

function syncBuildDelta() {
  if (!Number.isInteger(deployRsyncAttempts) || deployRsyncAttempts < 1) {
    throw new Error(`Invalid DEPLOY_RSYNC_ATTEMPTS=${process.env.DEPLOY_RSYNC_ATTEMPTS || ''}. Use a positive integer.`);
  }

  const stageName = '.next.deploy-stage';
  const previousName = '.next.deploy-previous';
  const localNext = `${join(buildRoot, '.next')}/`;
  const remoteStage = `${remote}:${deployPath}/${stageName}/`;
  const localBuildId = readFileSync(join(buildRoot, '.next', 'BUILD_ID'), 'utf8').trim();

  let stagedBuildId = '';
  try {
    stagedBuildId = ssh(
      `cat ${shellQuote(`${deployPath}/${stageName}/BUILD_ID`)} 2>/dev/null || true`,
      { capture: true }
    );
  } catch {
    stagedBuildId = '';
  }

  if (stagedBuildId === localBuildId) {
    step('Resume incremental build stage');
    ssh(`rm -rf -- ${shellQuote(`${deployPath}/${stageName}/cache`)}`);
  } else {
    step('Prepare incremental build stage');
    ssh(
      `cd ${shellQuote(deployPath)} && test -d .next && ` +
      `rm -rf -- ${shellQuote(stageName)} && cp -al .next ${shellQuote(stageName)} && ` +
      `rm -rf -- ${shellQuote(`${stageName}/cache`)}`
    );
  }

  step('Upload changed .next files');
  let uploaded = false;
  for (let attempt = 1; attempt <= deployRsyncAttempts; attempt += 1) {
    try {
      run('rsync', [
        '-az',
        '--checksum',
        '--delete',
        '--exclude=cache/',
        '--partial',
        '--partial-dir=.rsync-partial',
        '--timeout=60',
        '--info=progress2',
        `--bwlimit=${deployRsyncBwlimit}`,
        '-e',
        rsyncRemoteShell(),
        localNext,
        remoteStage,
      ]);
      uploaded = true;
      break;
    } catch (error) {
      if (attempt === deployRsyncAttempts) throw error;
      console.warn(`Incremental upload interrupted; retrying (${attempt + 1}/${deployRsyncAttempts})...`);
      run('sleep', ['2']);
    }
  }
  if (!uploaded) throw new Error('Incremental build upload did not complete.');

  const remoteBuildId = ssh(
    `cat ${shellQuote(`${deployPath}/${stageName}/BUILD_ID`)}`,
    { capture: true }
  );
  if (remoteBuildId !== localBuildId) {
    throw new Error(`Staged BUILD_ID mismatch. local=${localBuildId} remote=${remoteBuildId}`);
  }

  step('Switch build and restart PM2');
  ssh(
    `${remoteSymlinkCommand()} && cd ${shellQuote(deployPath)} && ` +
    `rm -rf -- ${shellQuote(previousName)} && mv .next ${shellQuote(previousName)} && ` +
    `mv ${shellQuote(stageName)} .next && ` +
    `(pm2 restart n-tet || (` +
    `rm -rf -- .next && mv ${shellQuote(previousName)} .next && pm2 restart n-tet && exit 1))`
  );
  console.log(`Incremental build deployed with BUILD_ID: ${localBuildId}`);
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

function remoteDeployTar(hash) {
  return `/tmp/next-deploy-${hash}.tar.gz`;
}

function mergeRemoteInquiriesIntoLocal(localDb, remoteDb) {
  if (!existsSync(remoteDb)) return { remoteCount: 0, localCountBefore: 0, inserted: 0, localCountAfter: 0 };

  const local = new DatabaseSync(localDb);
  const remoteDatabase = new DatabaseSync(remoteDb, { readOnly: true });
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
      const params = columns.map(() => '?').join(', ');
      const insert = local.prepare(`insert into inquiries (${names}) values (${params})`);
      local.exec('begin immediate');
      try {
        for (const row of missingRows) {
          insert.run(...columns.map((column) => row[column]));
        }
        local.exec('commit');
      } catch (error) {
        local.exec('rollback');
        throw error;
      }
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

function localInquiryFingerprint(databasePath) {
  const database = new DatabaseSync(databasePath, { readOnly: true });
  try {
    const table = database
      .prepare("select name from sqlite_master where type='table' and name='inquiries'")
      .get();
    if (!table) return '';
    const rows = database.prepare('select * from inquiries order by id').all();
    return createHash('sha256').update(JSON.stringify(rows)).digest('hex');
  } finally {
    database.close();
  }
}

function remoteInquiryFingerprint() {
  const script = [
    "const D=require('better-sqlite3')",
    "const c=require('node:crypto')",
    "const d=new D('data/ntet.db',{readonly:true})",
    "const rows=d.prepare('select * from inquiries order by id').all()",
    "process.stdout.write(c.createHash('sha256').update(JSON.stringify(rows)).digest('hex'))",
    'd.close()',
  ].join(';');
  return ssh(`cd ${shellQuote(deployPath)} && node -e ${shellQuote(script)}`, { capture: true });
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

  let localHash = sha256(localDb);
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

  mkdirSync(join(sourceRoot, 'scratch'), { recursive: true });
  const remoteDbSnapshot = join(sourceRoot, 'scratch', 'remote-ntet-before-deploy.db');
  let inquiriesMatch = false;
  try {
    inquiriesMatch = localInquiryFingerprint(localDb) === remoteInquiryFingerprint();
  } catch {
    inquiriesMatch = false;
  }

  if (inquiriesMatch) {
    console.log('Inquiry DB guard: local and remote inquiry fingerprints match; skipped database download.');
  } else {
    try {
      scpFromRemote(`${deployPath}/data/ntet.db`, remoteDbSnapshot);
      const mergeResult = mergeRemoteInquiriesIntoLocal(localDb, remoteDbSnapshot);
      console.log(
        `Inquiry DB guard: remote=${mergeResult.remoteCount} localBefore=${mergeResult.localCountBefore} ` +
        `merged=${mergeResult.inserted} localAfter=${mergeResult.localCountAfter}`
      );
    } catch (error) {
      throw new Error(`Could not merge remote inquiries before DB sync: ${error instanceof Error ? error.message : error}`);
    }
  }

  localHash = sha256(localDb);

  if (localHash === remoteHash) {
    console.log(`Database already in sync: ${localHash}`);
    return;
  }

  step('Sync database');
  rsyncUpload(localDb, '/tmp/ntet.db.deploy');
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

configureDeploymentMtu();

step('Sync public assets');
rsyncPublic();

step('Sync gated product brochures');
rsyncProductBrochures();

step('Check public assets');
run('node', ['scripts/check-public-sync.mjs']);

step('Check and sync database');
syncDatabaseIfChanged();

step('Build locally');
if (skipBuild) {
  if (!existsSync(join(buildRoot, '.next', 'BUILD_ID'))) {
    throw new Error(`DEPLOY_SKIP_BUILD=1 but no completed build exists at ${join(buildRoot, '.next')}.`);
  }
  console.log(`Reusing completed build: ${readFileSync(join(buildRoot, '.next', 'BUILD_ID'), 'utf8').trim()}`);
} else {
  prepareBuildRoot();
  run('npm', ['run', 'build'], { cwd: buildRoot });
}

console.log(`Using deployment upload mode: ${deployUploadMode}`);
console.log(`Using rsync bandwidth limit: ${deployRsyncBwlimit} KB/s. Set DEPLOY_RSYNC_BWLIMIT to override.`);

if (deployUploadMode === 'delta') {
  syncBuildDelta();
} else if (deployUploadMode === 'archive') {
  step('Package .next');
  mkdirSync(dirname(localTar), { recursive: true });
  run('tar', ['-czf', localTar, '.next'], { cwd: buildRoot });
  const localTarHash = sha256(localTar);
  console.log(`Local tar sha256: ${localTarHash}`);
  const remoteTar = remoteDeployTar(localTarHash);

  step('Upload .next package');
  console.log(`Remote package path: ${remoteTar}`);
  rsyncUpload(localTar, remoteTar);
  const remoteTarHash = remoteSha256(remoteTar);
  if (remoteTarHash !== localTarHash) {
    throw new Error(`Deploy tar hash mismatch. local=${localTarHash} remote=${remoteTarHash}`);
  }
  console.log(`Remote tar sha256: ${remoteTarHash}`);

  step('Extract and restart PM2');
  ssh(`${remoteSymlinkCommand()} && cd ${shellQuote(deployPath)} && tar -xzf ${shellQuote(remoteTar)} && pm2 restart n-tet`);
} else {
  throw new Error(`Invalid DEPLOY_UPLOAD_MODE=${deployUploadMode}. Use delta or archive.`);
}

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

restoreDeploymentMtu();
console.log('\nProduction deploy completed.');
