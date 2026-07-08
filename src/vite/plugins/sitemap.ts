import type { Plugin } from "vite";

import { baseUrl } from "../../config/global/constants";
import routesConfig from "../../config/routes";

const SHOULD_SKIP = ["/404/", "/offline/"];
const shouldIgnoreRoute = (route: string): boolean =>
  SHOULD_SKIP.some((ignored) => route === ignored || route.endsWith(ignored));

const cleanBaseUrl = baseUrl.replace(/\/+$/, "");

const toSitemapUrl = (route: string): string => {
  const config = routesConfig[route];
  if (!config) {
    console.warn(`[sitemap] Route not found: ${route}`);
    return "";
  }

  const params = config.templateParameters;

  const lastmod = params.date ? `    <lastmod>${params.date}</lastmod>` : "";
  const changefreq = params.readingTime
    ? "    <changefreq>weekly</changefreq>"
    : "    <changefreq>monthly</changefreq>";
  const priority = params.readingTime
    ? "    <priority>0.8</priority>"
    : "    <priority>0.6</priority>";

  const isPt = route.startsWith("/pt");
  const ptRoute = isPt ? route : `/pt${route}`;
  const enRoute = isPt ? route.replace(/^\/pt/, "") : route;

  const parts = [
    "  <url>",
    `    <loc>${cleanBaseUrl}${route}</loc>`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${cleanBaseUrl}${enRoute}" />`,
    `    <xhtml:link rel="alternate" hreflang="pt" href="${cleanBaseUrl}${ptRoute}" />`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${cleanBaseUrl}${enRoute}" />`,
  ];
  if (lastmod) {
    parts.push(lastmod);
  }
  parts.push(changefreq, priority, "  </url>");

  return parts.join("\n");
};

export function sitemapPlugin(): Plugin {
  return {
    name: "vite-plugin-sitemap",
    generateBundle() {
      const urls = Object.keys(routesConfig)
        .filter((route) => !shouldIgnoreRoute(route))
        .map(toSitemapUrl)
        .join("\n");

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;

      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: sitemap,
      });
    },
  };
}
