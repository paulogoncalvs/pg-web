import { writeFileSync } from "node:fs";

import globalConfig from "../config/global";

const shouldIgnoreRoute = (route: string): boolean =>
  !!["offline", "404", "/en"].some((element) => route.includes(element));

(function generateSitemap(): void {
  const baseUrl = globalConfig.baseUrl.replace(/\/+$/, "");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.keys(globalConfig.routes)
  .map((route) =>
    shouldIgnoreRoute(route)
      ? ""
      : `    <url>
        <loc>${baseUrl}${route}</loc>
    </url>`,
  )
  .join("\n")}
</urlset>`;

  writeFileSync("public/sitemap.xml", sitemap);

  console.info("New Sitemap Generated in /public/sitemap.xml");
})();
