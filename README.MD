# Paulo Gonçalves Website

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/paulogoncalvs/pg-web)
[![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://www.paulogoncalves.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Static site for Paulo Gonçalves built with Preact, TailwindCSS and a webpack toolchain.

**STATUS: 👷 occasional experiments and updates**

## Prerequisites

- Node.js >= 18 (LTS)
- Yarn
- Git
- (Optional) GitHub CLI `gh` for automated releases
- Recommended: VS Code + Prettier + ESLint extensions

## Quickstart

Clone and install:

```bash
git clone https://github.com/paulogoncalvs/pg-web.git
cd pg-web
yarn install
```

Run dev server:

```bash
yarn start:dev
# open http://localhost:3000 (or port shown in console)
```

Build for production:

```bash
yarn build
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
- SFTP\_\* — used by deploy workflow (set as GitHub Secrets)

If you use environment-specific secrets in GitHub Actions, add them under Settings → Environments → Production.

## Commands

<details>
<summary>List</summary>

| COMMAND                  | DESCRIPTION                                     |
| :----------------------- | ----------------------------------------------- |
| **BUILD**                |                                                 |
| `yarn prebuild`          | Generate sitemap                                |
| `yarn build`             | Generate dist                                   |
| **SERVER**               |                                                 |
| `yarn start:dev`         | Start **Development** server                    |
| `yarn start:prod`        | Generate dist + Start **Production** server     |
| `yarn start:prod:server` | Start Production server without dist generation |
| **TESTS**                |                                                 |
| `yarn tests:jest`        | Run Jest tests                                  |
| `yarn tests:jest:update` | Update Jest tests                               |
| `yarn tests:pw`          | Generate dist + Run Playwright tests            |
| `yarn tests:pw:update`   | Generate dist + Update Playwright tests         |
| `yarn tests:pw:run`      | Run Playwright tests without dist generation    |
| `yarn tests:pw:build`    | Build Playwright docker image                   |
| `yarn tests`             | Run all tests                                   |
| `yarn tests:update`      | Update all tests                                |
| **FORMAT**               |                                                 |
| `yarn format`            | Code formatting - Check                         |
| `yarn format:fix`        | Code formatting - Fix                           |
| **LINT**                 |                                                 |
| `yarn lint:ts`           | Lint TypeScript                                 |
| `yarn lint:ts:fix`       | Lint TypeScript - Fix                           |
| `yarn lint:css`          | Lint CSS                                        |
| `yarn lint:css:fix`      | Lint CSS - Fix                                  |
| `yarn lint`              | Lint All                                        |
| `yarn lint:fix`          | Lint All - Fix                                  |
| **PACKAGES**             |                                                 |
| `yarn upgrade:all`       | Upgrade all the packages                        |
| `yarn upgrade:latest`    | Upgrades packages to their latest version       |

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
