# Paulo Gonçalves Website

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/paulogoncalvs/pg-web)
[![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://www.paulogoncalves.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Static site for Paulo Gonçalves built with Preact, TailwindCSS and a webpack toolchain.

**STATUS: 👷 occasional experiments and updates**

## Prerequisites

- Node.js >= 24 (LTS)
- pnpm
- Git
- (Optional) GitHub CLI `gh` for automated releases
- Recommended: VS Code + Prettier + ESLint extensions

## Quickstart

Clone and install:

```bash
git clone https://github.com/paulogoncalvs/pg-web.git
cd pg-web
pnpm install
```

Run dev server:

```bash
pnpm run start:dev
# open http://localhost:3000 (or port shown in console)
```

Build for production:

```bash
pnpm run build
# output in dist/
```

## Environment

Copy and edit environment templates:

```bash
cp .env.dist .env.development
cp .env.dist .env.production
```

Document key variables in `.env.dist` (add descriptions there). Common variables:

- NODE_ENV — build environment
- TRACK_GA_ID, TRACK_GA_MEASUREMENT_ID — analytics
- FTP\_\* — used by deploy workflow (set as GitHub Secrets)

If you use environment-specific secrets in GitHub Actions, add them under Settings → Environments → Production.

## Commands

<details>
<summary>List</summary>

| COMMAND                      | DESCRIPTION                                     |
| :--------------------------- | ----------------------------------------------- |
| **BUILD**                    |                                                 |
| `pnpm run prebuild`          | Generate sitemap                                |
| `pnpm run build`             | Generate dist                                   |
| **SERVER**                   |                                                 |
| `pnpm run start:dev`         | Start **Development** server                    |
| `pnpm run start:prod`        | Generate dist + Start **Production** server     |
| `pnpm run start:prod:server` | Start Production server without dist generation |
| **TESTS**                    |                                                 |
| `pnpm run tests:jest`        | Run Jest tests                                  |
| `pnpm run tests:jest:update` | Update Jest tests                               |
| `pnpm run tests:pw`          | Generate dist + Run Playwright tests            |
| `pnpm run tests:pw:update`   | Generate dist + Update Playwright tests         |
| `pnpm run tests:pw:run`      | Run Playwright tests without dist generation    |
| `pnpm run tests:pw:build`    | Build Playwright docker image                   |
| `pnpm run tests`             | Run all tests                                   |
| `pnpm run tests:update`      | Update all tests                                |
| **FORMAT**                   |                                                 |
| `pnpm run format`            | Code formatting - Check                         |
| `pnpm run format:fix`        | Code formatting - Fix                           |
| **LINT**                     |                                                 |
| `pnpm run lint:ts`           | Lint TypeScript                                 |
| `pnpm run lint:ts:fix`       | Lint TypeScript - Fix                           |
| `pnpm run lint:css`          | Lint CSS                                        |
| `pnpm run lint:css:fix`      | Lint CSS - Fix                                  |
| `pnpm run lint`              | Lint All                                        |
| `pnpm run lint:fix`          | Lint All - Fix                                  |

</details>

## CI / Deployment

- GitHub Actions:
    - `.github/workflows/ci.yml` — build and test.
    - `.github/workflows/deploy.yml` — deploy to SFTP (uses wlixcc/SFTP-Deploy-Action).
- Secrets needed (set in repository or environment):
    - FTP_SERVER, FTP_USERNAME, FTP_PASSWORD, FTP_REMOTE_PATH, FTP_PORT (optional)
    - TRACK_GA_ID, TRACK_GA_MEASUREMENT_ID (optional)
- For environment secrets, ensure `environment` in workflow matches the environment name in repository settings.

## Release process

A local helper script exists at `scripts/release.js`:

- Usage: `node scripts/release.js <new-version>`
- What it does:
    - Bumps package.json on `development` and commits/pushes.
    - Merges `development` → `master`, bumps `master` package.json, tags and pushes.
    - Creates GitHub release (requires `gh`).
- Preconditions:
    - Clean working tree
    - Pushed remotes and permissions
    - `gh` authenticated for release creation
- The script is idempotent-safe: it skips commits if version unchanged. Resolve merge conflicts manually then re-run.

---

**Lovingly crafted in my spare time. ❤️**
