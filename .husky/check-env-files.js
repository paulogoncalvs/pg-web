#!/usr/bin/env node
import { execSync } from 'child_process';

try {
    const output = execSync('git diff --cached --name-only', { encoding: 'utf8' });
    const files = output.split('\n').filter((f) => f.trim());

    const envFiles = files.filter((file) => file.startsWith('.env') && !['.env.tests', '.env.dist'].includes(file));

    if (envFiles.length > 0) {
        console.error('❌ Commit rejected: .env files cannot be committed');
        console.error('   Files:', envFiles.join(', '));
        process.exit(1);
    }
} catch {
    // No cached files or error - that's okay
}
