import { execSync } from 'node:child_process';
import os from 'node:os';

if (os.platform() === 'win32') {
  process.stdout.write('UID=1000 GID=1000');
} else {
  const uid = execSync('id -u').toString().trim();
  const gid = execSync('id -g').toString().trim();
  process.stdout.write(`UID=${uid} GID=${gid}`);
}