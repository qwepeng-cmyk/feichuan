import { execFileSync } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const host = process.env.DEPLOY_HOST || '43.129.170.171';
const user = process.env.DEPLOY_USER || 'root';
const deployPath = process.env.DEPLOY_PATH || '/www/wwwroot/n-tet.com';
const remote = `${user}@${host}`;

function walkFiles(root, dir = root, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const abs = join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(root, abs, files);
    } else if (entry.isFile()) {
      files.push(relative(root, abs).replace(/\\/g, '/'));
    }
  }
  return files;
}

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    ...options,
  });
}

function ssh(args) {
  if (process.env.SSHPASS) {
    return run('sshpass', ['-e', 'ssh', '-o', 'StrictHostKeyChecking=accept-new', ...args]);
  }
  return run('ssh', ['-o', 'StrictHostKeyChecking=accept-new', ...args]);
}

const localRoot = join(process.cwd(), 'public');
const localFiles = walkFiles(localRoot).sort();
const remoteOutput = ssh([remote, `cd ${deployPath}/public && find . -type f | sed 's#^./##' | sort`]);
const remoteFiles = new Set(remoteOutput.split(/\r?\n/).filter(Boolean));

const missing = localFiles.filter((file) => !remoteFiles.has(file));

console.log(`Local public files: ${localFiles.length}`);
console.log(`Remote public files: ${remoteFiles.size}`);
console.log(`Missing on remote: ${missing.length}`);

if (missing.length > 0) {
  console.error('\nRemote is missing these public files:');
  for (const file of missing.slice(0, 120)) {
    const size = statSync(join(localRoot, file)).size;
    console.error(`- ${file} (${size} bytes)`);
  }
  if (missing.length > 120) {
    console.error(`...and ${missing.length - 120} more`);
  }
  process.exit(1);
}

console.log('Public assets are in sync by file path.');
