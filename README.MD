# Paulo Gonçalves Website

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/paulogoncalvs/pg-web)
[![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://www.paulogoncalves.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Static site for Paulo Gonçalves built with Preact, TailwindCSS and a webpack toolchain. TypeScript is used for webpack configuration and scripts.

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
# open http://localhost:4005 (or port shown in console)
```

Build for production:

```bash
pnpm run build
# output in dist/
```

## Server (API)

The contact form uses a separate Node.js/Express server for sending emails.

## Environment

Copy and edit environment templates:

```bash
cp .env.dist .env.development
cp .env.dist .env.production
```

Document key variables in `.env.dist` (add descriptions there). Common variables:

- NODE_ENV — build environment
- TRACK_GA_ID, TRACK_GA_MEASUREMENT_ID — analytics
- RECAPTCHA_SITE_KEY, RECAPTCHA_SECRET_KEY — reCAPTCHA v3 (optional)
- FTP\_\* — used by deploy workflow (set as GitHub Secrets)

If you use environment-specific secrets in GitHub Actions, add them under Settings → Environments → Production.

## Commands

<details>
<summary>List</summary>

| COMMAND                            | DESCRIPTION                                                |
| :--------------------------------- | ---------------------------------------------------------- |
| **BUILD**                          |                                                            |
| `pnpm run generate:sitemap`        | Generate sitemap                                           |
| `pnpm run build`                   | Generate `dist` (runs sitemap automatically)               |
| **SERVER**                         |                                                            |
| `pnpm run start:dev`               | Start **Development** server                               |
| `pnpm run start:prod`              | Generate `dist` + Start **Production** server              |
| `pnpm run start:prod:server`       | Start Production server without dist generation            |
| **TESTS**                          |                                                            |
| `pnpm run tests:jest`              | Run Jest tests                                             |
| `pnpm run tests:jest:update`       | Update Jest snapshots                                      |
| `pnpm run tests:pw`                | Generate test build + Run Playwright tests                 |
| `pnpm run tests:pw:update`         | Generate test build + Update Playwright snapshots          |
| `pnpm run tests:pw:run`            | Run Playwright tests without build                         |
| `pnpm run tests:pw:build`          | Build Playwright Docker image                              |
| `pnpm run tests`                   | Run all tests                                              |
| `pnpm run tests:update`            | Update all tests                                           |
| **FORMAT**                         |                                                            |
| `pnpm run format`                  | Check code formatting                                      |
| `pnpm run format:fix`              | Fix code formatting                                        |
| **LINT**                           |                                                            |
| `pnpm run lint:ts`                 | TypeScript type check + ESLint                             |
| `pnpm run lint:ts:fix`             | Fix ESLint issues                                          |
| `pnpm run lint:css`                | Lint CSS                                                   |
| `pnpm run lint:css:fix`            | Fix CSS lint issues                                        |
| `pnpm run lint`                    | Run all linters                                            |
| `pnpm run lint:fix`                | Fix all lint issues                                        |
| **RELEASE**                        |                                                            |
| `pnpm release patch`               | Create a **patch release** (e.g. `1.4.2 → 1.4.3`)          |
| `pnpm release minor`               | Create a **minor release** (e.g. `1.4.2 → 1.5.0`)          |
| `pnpm release major`               | Create a **major release** (e.g. `1.4.2 → 2.0.0`)          |
| `pnpm release <version>`           | Release a **specific version** (e.g. `pnpm release 2.3.0`) |
| `pnpm release patch --dry-run`     | Preview a **patch release** without executing              |
| `pnpm release minor --dry-run`     | Preview a **minor release** without executing              |
| `pnpm release major --dry-run`     | Preview a **major release** without executing              |
| `pnpm release <version> --dry-run` | Preview a **specific version release**                     |

</details>

## CI / Deployment

- GitHub Actions:
    - `.github/workflows/ci.yml` — build and test.
    - `.github/workflows/deploy.yml` — deploy to SFTP (uses wlixcc/SFTP-Deploy-Action).
- Secrets needed (set in repository or environment):
    - FTP_SERVER, FTP_USERNAME, FTP_PASSWORD, FTP_REMOTE_PATH, FTP_PORT (optional)
    - TRACK_GA_ID, TRACK_GA_MEASUREMENT_ID (optional)
    - RECAPTCHA_SITE_KEY, RECAPTCHA_SECRET_KEY (optional)
- For environment secrets, ensure `environment` in workflow matches the environment name in repository settings.

## Release Process

This project includes a release script that automates:

- version bumping
- git commits
- branch merging
- git tagging
- GitHub releases

The script follows a `development → master` release flow and ensures the repository is in a clean state before performing a release.

### Usage

Run the release script with:

```bash
pnpm release <version|patch|minor|major>
```

Dry run (preview release without executing):

```bash
pnpm release <version|patch|minor|major> --dry-run
```

---

**Lovingly crafted in my spare time. ❤️**
