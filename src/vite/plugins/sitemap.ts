import type { Plugin } from "vite";

import globalConfig from "../../config/global";

const shouldIgnoreRoute = (route: string): boolean =>
  ["offline", "404", "/en"].some((element) => route.includes(element));

export function sitemapPlugin(): Plugin {
  return {
    name: "vite-plugin-sitemap",
    generateBundle() {
      const baseUrl = globalConfig.baseUrl.replace(/\/+$/, "");

      const urls = Object.keys(globalConfig.routes)
        .filter((route) => !shouldIgnoreRoute(route))
        .map((route) => ["  <url>", `    <loc>${baseUrl}${route}</loc>`, "  </url>"].join("\n"))
        .join("\n");

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
