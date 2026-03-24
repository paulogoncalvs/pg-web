# Paulo Gonçalves Website

[![Node](https://img.shields.io/badge/node-%3E%3D24-brightgreen.svg)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-10.32.1-orange.svg)](https://pnpm.js.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Website up](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://www.paulogoncalves.dev/)

## Tech Stack

- **Preact** — Fast, lightweight React alternative
- **Vite 8** — Modern build tool with SSG support
- **Tailwind CSS 4** — Utility-first styling framework
- **TypeScript** — Strongly typed JavaScript
- **Vitest** — Fast unit testing framework
- **Playwright** — End-to-end and visual regression testing
- **Oxlint + Oxfmt** — Linting and code formatting
- **Workbox** — Service worker for PWA support

## Features

- **Static Site Generation (SSG)** — Pre-rendered HTML for performance
- **Progressive Web App (PWA)** — Offline support and caching
- **SVG Sprite Icons** — Efficient icon management
- **SEO Optimized** — Sitemap generation and meta tags
- **Unit Testing** — Powered by Vitest
- **Accessibility Testing** — Automated checks with axe
- **Visual Regression Testing** — Catch UI changes with Playwright

## Prerequisites

- **Node.js >= 24 (LTS)**
- **pnpm** — Fast package manager
- **Git** — Version control
- **Optional:** GitHub CLI (`gh`) for automated releases

## Quickstart

```bash
git clone https://github.com/paulogoncalvs/pg-web.git
cd pg-web
cp .env.example .env.development
cp .env.example .env.production
pnpm install
pnpm dev
# open http://localhost:4005
```

## CLI Commands

### Build & Development

| Command         | Description                                     |
| --------------- | ----------------------------------------------- |
| `pnpm sitemap`  | Generate `sitemap.xml`                          |
| `pnpm ssg`      | Generate static site (`dist/`) using SSG        |
| `pnpm prebuild` | Run `sitemap` before building                   |
| `pnpm build`    | Build production site + run SSG                 |
| `pnpm preview`  | Preview production build locally                |
| `pnpm prod`     | Run typecheck, lint, format, build, and preview |
| `pnpm dev`      | Start Vite dev server on port 4005              |

### Unit Tests (Vitest)

| Command            | Description                  |
| ------------------ | ---------------------------- |
| `pnpm test`        | Run Vitest unit tests        |
| `pnpm test:update` | Update Vitest snapshot tests |

### End-to-End Tests (Playwright + Docker)

| Command                 | Description                                        |
| ----------------------- | -------------------------------------------------- |
| `pnpm test:e2e:install` | Build Docker image and install Playwright browsers |
| `pnpm test:e2e:run`     | Run E2E tests without rebuilding                   |
| `pnpm test:e2e`         | Build + run Playwright E2E tests                   |
| `pnpm test:e2e:update`  | Build + update Playwright snapshots                |

### All Tests

| Command                | Description                       |
| ---------------------- | --------------------------------- |
| `pnpm test:all`        | Run all unit and E2E tests        |
| `pnpm test:all:update` | Update all snapshots (unit + E2E) |

### Linting & Formatting

| Command           | Description                            |
| ----------------- | -------------------------------------- |
| `pnpm typecheck`  | TypeScript type check (`tsc --noEmit`) |
| `pnpm lint`       | Run Oxlint to detect code issues       |
| `pnpm lint:fix`   | Fix Oxlint issues                      |
| `pnpm format`     | Check code formatting with Oxfmt       |
| `pnpm format:fix` | Format code automatically with Oxfmt   |
| `pnpm check`      | Run typecheck + lint + format check    |

### Release

| Command        | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| `pnpm release` | Run checks and execute release script (`scripts/release.ts`) |

## Environment

Copy and edit environment templates:

```bash
cp .env.example .env.development
cp .env.example .env.production
```

Document key variables in `.env.example`. Common variables:

- `NODE_ENV` — build environment
- `TRACK_GA_ID`, `TRACK_GA_MEASUREMENT_ID` — analytics
- `RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY` — reCAPTCHA v3 (optional)
- `FTP_*` — used by deploy workflow (set as GitHub Secrets)

For environment secrets in GitHub Actions, add them under Settings → Environments → Production.

## CI / Deployment

- **GitHub Actions**
  - `ci.yml` — build and test
  - `deploy.yml` — deploy to SFTP
- **Secrets** (set in repository or environment settings)
  - FTP_SERVER, FTP_USERNAME, FTP_PASSWORD, FTP_REMOTE_PATH
  - TRACK_GA_ID, TRACK_GA_MEASUREMENT_ID (optional)
  - RECAPTCHA_SITE_KEY, RECAPTCHA_SECRET_KEY (optional)

## Release Process

Automates version bumping, commits, branch merging, tagging, and GitHub releases.

```bash
pnpm release patch    # e.g. 1.4.2 → 1.4.3
pnpm release minor    # e.g. 1.4.2 → 1.5.0
pnpm release major    # e.g. 1.4.2 → 2.0.0
pnpm release 2.0.0    # specific version
pnpm release --dry-run # preview without executing
```

---

**Lovingly crafted in my spare time. ❤️**
