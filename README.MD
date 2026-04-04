# Paulo Gonçalves Website

[![Preact](https://img.shields.io/badge/Preact-10-673ab8?logo=preact)](https://preactjs.com/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/tests-Vitest%20%2B%20Playwright-6e9f18)]()
[![Linting](https://img.shields.io/badge/linting-Oxlint%20%2B%20Oxfmt-000000)]()
[![PWA](https://img.shields.io/badge/PWA-enabled-5a0fc8?logo=pwa)](https://web.dev/progressive-web-apps/)

[![Node](https://img.shields.io/badge/node-%3E%3D%20LTS-brightgreen)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-required-orange)](https://pnpm.io/)
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
- **Docker** — Isolated environment for E2E testing
- **Express** — For server API (not included)

## Features

- **Static Site Generation (SSG)** — Pre-rendered HTML for performance
- **Progressive Web App (PWA)** — Offline support and caching
- **SVG Sprite Icons** — Efficient icon management
- **SEO Optimized** — Sitemap generation and meta tags
- **Unit Testing** — Powered by Vitest
- **Accessibility Testing** — Automated checks with axe
- **Visual Regression Testing** — Catch UI changes with Playwright

## Integrations

- **Google Analytics 4** — Tracks pageviews and user behavior
- **Google reCAPTCHA v3** — Protects contact form from spam
- **Web Vitals** — Monitors Core Web Vitals performance metrics

## Prerequisites

- **Node.js >= 24 (LTS)**
- **pnpm** — Fast package manager
- **Git** — Version control
- **GitHub CLI** — `gh` for automated releases (optional)
- **Docker** — For E2E tests

## Quickstart

```bash
git clone https://github.com/paulogoncalvs/pg-web.git
cd pg-web
cp .env.example .env.development
pnpm install
pnpm dev
# open http://localhost:4005
```

## CLI Commands

### Build & Development

| Command        | Description                                                      |
| -------------- | ---------------------------------------------------------------- |
| `pnpm build`   | Build production site + SSG (copies .env.test → .env.production) |
| `pnpm ssg`     | Generate static site from dist using SSG                         |
| `pnpm preview` | Preview production build locally                                 |
| `pnpm prod`    | Run typecheck, lint, format, build, and preview                  |
| `pnpm dev`     | Start Vite dev server on port 4005                               |

### Unit Tests (Vitest)

| Command            | Description                  |
| ------------------ | ---------------------------- |
| `pnpm test`        | Run Vitest unit tests        |
| `pnpm test:update` | Update Vitest snapshot tests |

### End-to-End Tests (Playwright + Docker)

| Command                      | Description                                         |
| ---------------------------- | --------------------------------------------------- |
| `pnpm test:e2e:install`      | Build Docker image with Playwright browsers         |
| `pnpm test:e2e`              | Run E2E tests in Docker (uses CI-built dist)        |
| `pnpm test:e2e:update`       | Update Playwright snapshots in Docker               |
| `pnpm test:e2e:update:local` | Build locally and update snapshots (for committing) |

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

The build process automatically copies `.env.test` to `.env.production` to ensure consistent asset hashes between local and CI builds.

Key variables in `.env.example`:

- `VITE_API_URL` — Backend server endpoint for contact form submissions (form validation)
- `VITE_TRACK_GA_MEASUREMENT_ID` — Google Analytics 4 measurement ID for pageview tracking
- `VITE_RECAPTCHA_SITE_KEY` — Google reCAPTCHA v3 site key
- `VITE_RECAPTCHA_SECRET_KEY` — Google reCAPTCHA v3 secret key

## CI / Deployment

- **GitHub Actions**
  - `ci.yml` — Build, test, and upload artifacts
  - `deploy.yml` — Deploy to SFTP
- **Docker** — E2E tests run in Docker container with pre-built dist
- **Environment Secrets** (set in repository or environment settings)
  - FTP_SERVER, FTP_USERNAME, FTP_PASSWORD, FTP_REMOTE_PATH
  - VITE_RECAPTCHA_SITE_KEY, VITE_RECAPTCHA_SECRET_KEY
- **Environment variables** (set in repository or environment settings)
  - VITE_TRACK_GA_MEASUREMENT_ID, VITE_API_URL

## Project Structure

```
src/
├── components/        # Preact UI components
├── config/            # Global config, routes, translations
├── hooks/             # Custom Preact hooks
├── modules/           # Feature modules (router, store, i18n, etc.)
├── pages/             # Page components
├── styles/            # CSS with Tailwind
├── tests/
│   ├── vitest/        # Unit tests
│   └── playwright/    # E2E visual regression tests
├── vite/              # Vite plugins and SSG
│   ├── plugins/       # vite-plugin-app, sitemap, sprite
│   ├── templates/     # HTML template for SSG
│   ├── utils/         # Meta, path utilities
│   └── ssg.ts         # Static site generation
├── App.tsx            # Root component
└── index.tsx          # Client hydration entry
```

## Release Process

Automates version bumping, commits, branch merging, tagging, and GitHub releases.

```bash
pnpm release patch     # e.g. 1.4.2 → 1.4.3
pnpm release minor     # e.g. 1.4.2 → 1.5.0
pnpm release major     # e.g. 1.4.2 → 2.0.0
pnpm release 2.0.0     # specific version
pnpm release --dry-run # preview without executing
```

---

**Lovingly crafted in my spare time. ❤️**
