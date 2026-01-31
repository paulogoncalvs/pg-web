#!/usr/bin/env node
import { execSync } from 'node:child_process';
import os from 'node:os';

// Get UID and GID
let uid = '1000';
let gid = '1000';

if (os.platform() !== 'win32') {
    uid = execSync('id -u').toString().trim();
    gid = execSync('id -g').toString().trim();
}

// Get the command from arguments
const command = process.argv.slice(2).join(' ');

// Build the full command with environment variables
const fullCommand = `cross-env UID=${uid} GID=${gid} COMPOSE_BAKE=true ${command}`;

// Execute the command
try {
    execSync(fullCommand, { stdio: 'inherit', shell: true });
} catch (error) {
    process.exit(error.status || 1);
}
