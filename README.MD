# Paulo Gonçalves Website

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/paulogoncalvs/pg-web)
[![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://www.paulogoncalves.dev/)

## Configuration

### Environment

Create `.env.development` and `.env.production` based on `.env.dist`.

### Commands

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
| **PRETTIFY**             |                                                 |
| `yarn prettify`          | Code formatting - Check                         |
| `yarn prettify:fix`      | Code formatting - Fix                           |
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

---

**STATUS: WIP**

**Made with Love :heart: in my spare time.**
