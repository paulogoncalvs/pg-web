import type { Plugin } from "vite";

import { baseUrl } from "../../config/global/constants";
import routesConfig from "../../config/routes";

const shouldIgnoreRoute = (route: string): boolean =>
  ["offline", "404", "/en"].some((element) => route.includes(element));

export function sitemapPlugin(): Plugin {
  return {
    name: "vite-plugin-sitemap",
    generateBundle() {
      const cleanBaseUrl = baseUrl.replace(/\/+$/, "");

      const urls = Object.keys(routesConfig)
        .filter((route) => !shouldIgnoreRoute(route))
        .map((route) => {
          const config = routesConfig[route];
          const params = config.templateParameters;

          const lastmod = params.date ? `    <lastmod>${params.date}</lastmod>` : "";
          const changefreq = params.readingTime
            ? "    <changefreq>weekly</changefreq>"
            : "    <changefreq>monthly</changefreq>";
          const priority = params.readingTime
            ? "    <priority>0.8</priority>"
            : "    <priority>0.6</priority>";

          const parts = ["  <url>", `    <loc>${cleanBaseUrl}${route}</loc>`];
          if (lastmod) {
            parts.push(lastmod);
          }
          parts.push(changefreq, priority, "  </url>");

          return parts.join("\n");
        })
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
