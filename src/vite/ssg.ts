import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createElement } from "preact";
import { renderToStaticMarkup } from "preact-render-to-string";
import { createServer } from "vite";

import type { RouteConfig } from "@/config/routes";

import { HtmlTemplate } from "./templates/html/index.tsx";
import { renderLinks, renderMetas } from "./utils/meta";
import { resolveDistDir } from "./utils/shared";

/* ---------------------------------- */
/* paths                              */
/* ---------------------------------- */
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const distDir = resolveDistDir();

const getOutputPath = (route: string) =>
  route === "/" ? path.join(distDir, "index.html") : path.join(distDir, route, "index.html");

/* ---------------------------------- */
/* manifest & hashed assets           */
/* ---------------------------------- */
interface ManifestEntry {
  file: string;
  src?: string;
  css?: string[];
}

const manifest: Record<string, ManifestEntry> = JSON.parse(
  fs.readFileSync(path.join(distDir, ".vite", "manifest.json"), "utf-8"),
);

const srcToHashed: Record<string, string> = {};
let css = "";
let sprite = "";

for (const entry of Object.values(manifest)) {
  if (entry.src) {
    srcToHashed[`/${entry.src}`] = `/${entry.file}`;
  }
  if (entry.css?.[0]) {
    css = `/${entry.css[0]}`;
  }
  if (entry.file.startsWith("assets/img/sprite") && entry.file.endsWith(".svg")) {
    sprite = `/${entry.file}`;
  }
}

const srcEntries = Object.entries(srcToHashed);

/* ---------------------------------- */
/* config                             */
/* ---------------------------------- */
const globalConfig = (
  await import(pathToFileURL(path.join(rootDir, "src/config/global/index")).href)
).default as {
  baseUrl: string;
  title: string;
  metas: Array<{ path?: string; attributes?: Record<string, string> }>;
  links: Array<{ attributes?: Record<string, string>; path?: string }>;
};

const vite = await createServer({
  root: rootDir,
  base: "/",
  server: { middlewareMode: true },
  appType: "custom",
});

const { default: App } = await vite.ssrLoadModule("/src/App.tsx");

const routesConfig = (
  await import(pathToFileURL(path.join(rootDir, "src/config/routes/index")).href)
).default as Record<string, RouteConfig>;

console.info("SSG routes:", Object.keys(routesConfig));

const entry = srcToHashed["/index.html"] ?? "";

/* ---------------------------------- */
/* asset resolvers                     */
/* ---------------------------------- */
const ASSET_PREFIXES = ["/assets/", "assets/", "/src/", "src/"];
const EXCLUDED_PATHS = ["/manifest.webmanifest", "manifest.webmanifest"];

const resolvePath = (p?: string): string | undefined => {
  if (!p) {
    return p;
  }
  const normalized = p.startsWith("/") ? p : `/${p}`;
  if (EXCLUDED_PATHS.some((excluded) => normalized === excluded || normalized.endsWith(excluded))) {
    return p;
  }
  if (!ASSET_PREFIXES.some((prefix) => p.startsWith(prefix))) {
    return p;
  }

  const basename = normalized.split("/").pop()?.split(".")[0];

  return srcEntries.find(([key]) => key.includes(basename ?? ""))?.[1] ?? p;
};

const resolveItem = (item: {
  path?: string;
  property?: string;
  attributes?: Record<string, string>;
}) => {
  const attrs: Record<string, string> = {};
  for (const [k, v] of Object.entries(item.attributes ?? {})) {
    if (v !== null) {
      attrs[k] = k === "href" || k === "src" || k === "content" ? (resolvePath(v) ?? v) : v;
    }
  }

  const resolvedPath = item.path && resolvePath(item.path);
  if (resolvedPath && (item.property || attrs.property)) {
    attrs.content = resolvedPath;
  }

  return { ...item, attributes: Object.keys(attrs).length ? attrs : undefined };
};

/* ---------------------------------- */
/* render page                         */
/* ---------------------------------- */
function renderPage(
  appHtml: string,
  route: string,
  lang: string,
  title: string,
  pageMetas?: Array<{ attributes?: Record<string, string> }>,
) {
  const canonicalUrl = `${globalConfig.baseUrl}${route === "/" ? "" : route}`;

  const globalMetaKeys = new Set(
    globalConfig.metas.map((m) => m.attributes?.name ?? m.attributes?.property).filter(Boolean),
  );
  const filteredGlobalMetas = globalConfig.metas.filter(
    (m) => !globalMetaKeys.has(m.attributes?.name) && !globalMetaKeys.has(m.attributes?.property),
  );
  const allMetas = [...filteredGlobalMetas, ...(pageMetas ?? [])];
  const metas = renderMetas(allMetas.map(resolveItem));
  const links = renderLinks(globalConfig.links.map(resolveItem));

  const jsScript = entry ? `<script type="module" src="${entry}"></script>` : "";
  const cssLink = css ? `<link rel="stylesheet" href="${css}">` : "";
  const cssPreloadLink = css ? `<link rel="preload" href="${css}" as="style">` : "";
  const jsPreloadLink = entry ? `<link rel="modulepreload" href="${entry}">` : "";
  const preconnectLink = `<link rel="preconnect" href="${globalConfig.baseUrl}">`;
  const manifestLink = `<link rel="manifest" href="/manifest.webmanifest">`;

  let html = HtmlTemplate({
    lang,
    url: route,
    title,
    sprite,
    canonicalUrl,
    store: { url: route, lang, filenames: { sprite } },
    metas,
    links: [preconnectLink, cssPreloadLink, jsPreloadLink, cssLink, links, manifestLink]
      .filter(Boolean)
      .join(""),
    appHtml,
  });

  // replace only /src/ imports for hashed JS modules
  for (const [src, hashed] of srcEntries) {
    if (!src.startsWith("/src/")) {
      continue;
    }
    html = html.replace(new RegExp(src.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), hashed);
  }

  return html.replace("</body>", `${jsScript}</body>`);
}

/* ---------------------------------- */
/* build SSG                           */
/* ---------------------------------- */
async function build() {
  console.info("[SSG] Starting pre-rendering...");

  for (const [route, config] of Object.entries(routesConfig)) {
    console.info(`[SSG] Rendering ${route}...`);

    const store = { url: route, lang: config.templateParameters.lang, filenames: { sprite } };
    const appHtml = renderToStaticMarkup(createElement(App, { store }));

    const html = renderPage(
      appHtml,
      route,
      config.templateParameters.lang,
      config.templateParameters.head.title,
      config.templateParameters.head.metas,
    );

    const filePath = getOutputPath(route);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, html);

    console.info(`[SSG] Generated: ${filePath}`);
  }

  await vite.close();
  console.info("[SSG] Pre-rendering complete!");
}

build();
