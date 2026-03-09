#!/usr/bin/env node
import { execSync } from 'node:child_process';
import os from 'node:os';

let uid = '1000';
let gid = '1000';

if (os.platform() !== 'win32') {
    uid = execSync('id -u').toString().trim();
    gid = execSync('id -g').toString().trim();
}

const command = process.argv.slice(2).join(' ');

const fullCommand = `cross-env UID=${uid} GID=${gid} COMPOSE_BAKE=true ${command}`;

try {
    execSync(fullCommand, { stdio: 'inherit' });
} catch (error) {
    process.exit((error as { status?: number }).status || 1);
}
