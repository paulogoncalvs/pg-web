import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Usage: node scripts/release.js <new-version>

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const newVersion = process.argv[2];
if (!newVersion) {
  console.error('Usage: node scripts/release.js <new-version>');
  process.exit(1);
}

const pkgPath = resolve(__dirname, '../package.json');

async function bumpVersion(branch) {
  execSync(`git checkout ${branch}`, { stdio: 'inherit' });
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  pkg.version = newVersion;
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  execSync('git add package.json', { stdio: 'inherit' });
  execSync(`git commit -m "chore(${branch}): bump version to ${newVersion}"`, { stdio: 'inherit' });
  execSync(`git push origin ${branch}`, { stdio: 'inherit' });
  console.log(`Updated package.json and pushed to ${branch}`);
}

// 1. Bump version on development
await bumpVersion('development');

// 2. Merge development into master (with error handling)
try {
  execSync('git checkout master', { stdio: 'inherit' });
  execSync('git merge development', { stdio: 'inherit' });
  console.log('Merged development into master');
} catch (err) {
  console.error('Error merging development into master:', err);
  console.error('Aborting release process. Resolve merge conflicts and try again.');
  process.exit(1);
}

// 3. Bump version on master
await bumpVersion('master');

// 4. Create a new tag and push
execSync(`git tag v${newVersion}`, { stdio: 'inherit' });
execSync('git push origin master', { stdio: 'inherit' });
execSync('git push origin --tags', { stdio: 'inherit' });
console.log(`Created and pushed tag v${newVersion}`);

// 5. Create a new release (GitHub CLI required)
try {
  execSync(`gh release create v${newVersion} --title "Release v${newVersion}" --notes "Release v${newVersion}"`, { stdio: 'inherit' });
  console.log('GitHub release created');
} catch (err) {
  console.warn('GitHub CLI not found or release failed. Please create the release manually.');
}