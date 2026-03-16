import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pkgPath = resolve(__dirname, '../package.json');

const arg = process.argv[2];
const dryRun = process.argv.includes('--dry-run');

if (!arg) {
    console.error(`
Usage:
  pnpm tsx scripts/release.ts <version|patch|minor|major>

Options:
  --dry-run   Print commands without executing
`);
    process.exit(1);
}

function run(cmd: string) {
    console.log(`\n$ ${cmd}`);
    if (!dryRun) execSync(cmd, { stdio: 'inherit' });
    else console.log('⚠️ DRY RUN: command skipped');
}

function output(cmd: string): string {
    console.log(`\n$ ${cmd}`);
    if (dryRun) {
        if (cmd.startsWith('git rev-parse v')) return ''; // pretend tag does not exist
        if (cmd.startsWith('git rev-parse')) return 'development';
        if (cmd.startsWith('git describe')) return 'v0.0.0';
        if (cmd.startsWith('git log')) return '- feat: example commit (abc123)';
        return '';
    }
    return execSync(cmd, { encoding: 'utf8' }).trim();
}

function ensureCleanGit() {
    const status = output('git status --porcelain');
    if (status) {
        console.error('❌ Git working directory not clean');
        console.error(status);
        process.exit(1);
    }
}

function getCurrentBranch(): string {
    return output('git rev-parse --abbrev-ref HEAD');
}

function ensureTagDoesNotExist(tag: string) {
    if (dryRun) {
        console.log(`⚠️ DRY RUN: skipping tag existence check for ${tag}`);
        return;
    }
    try {
        output(`git rev-parse ${tag}`);
        console.error(`❌ Tag ${tag} already exists`);
        process.exit(1);
    } catch {
        // Tag does not exist → OK
    }
}

function bumpVersion(current: string, type: string): string {
    const parts = current.split('.').map(Number);
    if (type === 'patch') parts[2]++;
    else if (type === 'minor') {
        parts[1]++;
        parts[2] = 0;
    } else if (type === 'major') {
        parts[0]++;
        parts[1] = 0;
        parts[2] = 0;
    }
    return parts.join('.');
}

function resolveVersion(arg: string): string {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
    if (['patch', 'minor', 'major'].includes(arg)) {
        return bumpVersion(pkg.version, arg);
    }
    return arg;
}

function updatePackageVersion(version: string) {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
    pkg.version = version;
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
}

function generateChangelog(version: string) {
    const log = output(`git log --pretty=format:"- %s (%h)" $(git describe --tags --abbrev=0)..HEAD`);
    const content = `# ${version}\n\n${log}\n`;
    writeFileSync('CHANGELOG_RELEASE.md', content);
    return content;
}

async function confirm(version: string) {
    if (dryRun) {
        console.log(`⚠️ DRY RUN: automatically confirmed release ${version}`);
        return;
    }
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const question = (q: string) => new Promise<string>((resolve) => rl.question(q, resolve));
    const answer = await question(`Release version ${version}? (y/N) `);
    rl.close();
    if (answer.toLowerCase() !== 'y') {
        console.log('Cancelled.');
        process.exit(0);
    }
}

function commitVersion(version: string) {
    run('git add package.json');
    run(`git commit -m "chore(release): v${version}"`);
}

function mergeBranches() {
    // Safe merge, works even if branches have diverged
    run('git checkout master');
    run('git merge --no-ff development');
}

function createTag(version: string) {
    const tag = `v${version}`;
    ensureTagDoesNotExist(tag);
    run(`git tag ${tag}`);
}

function pushAll() {
    run('git push origin development');
    run('git push origin master');
    run('git push origin --tags');
}

function createGithubRelease(version: string) {
    run(`gh release create v${version} --title "Release v${version}" --notes-file CHANGELOG_RELEASE.md`);
    if (dryRun) console.log('⚠️ DRY RUN: GitHub release simulated');
}

async function main() {
    ensureCleanGit();
    const originalBranch = getCurrentBranch();
    const version = resolveVersion(arg);

    console.log(`\n📦 Preparing release ${version}`);
    if (dryRun) console.log('⚠️ DRY RUN MODE');

    await confirm(version);

    try {
        run('git checkout development');

        updatePackageVersion(version);
        commitVersion(version);

        mergeBranches(); // no ff-only

        createTag(version);
        generateChangelog(version);

        pushAll();
        createGithubRelease(version);

        run(`git checkout ${originalBranch}`);

        console.log(`\n✅ Release ${version} complete`);
    } catch (err) {
        console.error('\n❌ Release failed', err);
        run(`git checkout ${originalBranch}`);
        process.exit(1);
    }
}

main();
