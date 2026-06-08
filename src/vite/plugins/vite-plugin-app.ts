import type { HtmlTagDescriptor, Plugin } from "vite";

import { createElement } from "preact";
import { renderToStaticMarkup } from "preact-render-to-string";

import { globalTitle } from "../../config/global/constants";
import { structuredData } from "../../config/global/schema";
import { configMetas, configLinks, type Meta, type Link } from "../../config/global/seo";
import routesConfig from "../../config/routes";
import { strScript } from "../templates/html/scripts";
import { resolveIconsDir, SPRITE_FILENAME } from "../utils/shared";
import { transformSvgToSymbol } from "../utils/svg";
import { generateSprite } from "./sprite";

/* ---------------------------------- */
/* helpers                            */
/* ---------------------------------- */
const createStore = (url: string, lang: string, sprite: string) => ({
  url,
  lang,
  filenames: { sprite },
});

const metasToTags = (metas: Meta[]): HtmlTagDescriptor[] =>
  metas.map((m) => ({ tag: "meta", attrs: m.attributes ?? {}, injectTo: "head" }));

const linksToTags = (links: Link[]): HtmlTagDescriptor[] =>
  links.map((l) => ({ tag: "link", attrs: l.attributes ?? {}, injectTo: "head" }));

/* ---------------------------------- */
/* plugin                             */
/* ---------------------------------- */
export function appPlugin(mode: string): Plugin {
  const prod = mode === "production" || mode === "tests";

  let spriteUrl = `/assets/img/${SPRITE_FILENAME}`;
  let devSpriteCache: string | null = null;

  const ssrCache = new Map<string, string>();

  return {
    name: "vite-plugin-app",

    transform(code, id) {
      return id.endsWith(".svg") && id.includes("/assets/icons/")
        ? transformSvgToSymbol(code, id)
        : code;
    },

    buildStart() {
      if (!prod) {
        return;
      }

      const spriteContent = generateSprite(resolveIconsDir());
      // emit sprite as asset
      const refId = this.emitFile({ type: "asset", name: "sprite.svg", source: spriteContent });
      // get hashed file name after build
      spriteUrl = `/${this.getFileName(refId)}`;
    },

    configureServer(server) {
      if (prod) {
        return;
      }

      devSpriteCache ||= generateSprite(resolveIconsDir());
      server.middlewares.use((req, res, next) => {
        if (req.url !== spriteUrl) {
          return next();
        }
        res.setHeader("Content-Type", "image/svg+xml");
        res.end(devSpriteCache!);
      });
    },

    handleHotUpdate({ file }) {
      if (prod) {
        return;
      }

      const exts = [".ts", ".tsx", ".css", ".svg"];
      if (!exts.some((ext) => file.endsWith(ext))) {
        return;
      }

      // Clear SSR cache on file changes - triggers fresh SSR on next request
      ssrCache.clear();

      // Regenerate sprite if icons changed
      if (file.includes("/assets/icons/")) {
        devSpriteCache = generateSprite(resolveIconsDir());
      }
    },

    async transformIndexHtml(html, ctx) {
      if (!ctx.server) {
        return;
      }

      const url = ctx.originalUrl?.split("?")[0].split("#")[0] ?? "/";
      const template = routesConfig[url]?.templateParameters;

      const lang = template?.lang ?? "en";
      const title = template?.head?.title ?? globalTitle;

      const cacheKey = `${url}:${lang}`;
      let appHtml = ssrCache.get(cacheKey) ?? "";

      if (!appHtml) {
        try {
          const [{ App }, { RouterPage: SSR_RouterPage }, { setTranslations }] = await Promise.all([
            ctx.server.ssrLoadModule("/src/App.tsx"),
            ctx.server.ssrLoadModule("/src/modules/router/pages.ssr.tsx"),
            ctx.server.ssrLoadModule("/src/modules/i18n/index.ts"),
          ]);

          const i18nModule = (await ctx.server.ssrLoadModule("/src/config/i18n/index.ts")) as {
            languageLoaders: Record<string, () => Promise<{ default: Record<string, string> }>>;
          };

          const entries: Record<string, Record<string, string>> = {};
          const loaded = await Promise.all(
            Object.entries(i18nModule.languageLoaders).map(async ([code, loader]) => {
              const mod = await loader();
              return [code, mod.default] as const;
            }),
          );
          for (const [code, tr] of loaded) {
            entries[code] = tr;
          }
          setTranslations(entries);
          const store = createStore(url, lang, spriteUrl);
          appHtml = renderToStaticMarkup(createElement(App, { store, routerPage: SSR_RouterPage }));
          ssrCache.set(cacheKey, appHtml);
        } catch (e) {
          const msg = e instanceof Error ? e.message : "Unknown error";
          appHtml = `<!-- SSR failed: ${msg} -->`;
          console.error(`[vite-plugin-app] SSR failed for ${url}:`, e);
          if (import.meta.env.PROD) {
            throw e;
          }
        }
      }

      const routeMetaKeys = new Set(
        (template?.head?.metas ?? [])
          .map((m) => m.attributes?.name ?? m.attributes?.property)
          .filter((k): k is string => Boolean(k)),
      );
      const filteredGlobalMetas = configMetas.filter((m) => {
        const name = m.attributes?.name;
        const prop = m.attributes?.property;
        return (!name || !routeMetaKeys.has(name)) && (!prop || !routeMetaKeys.has(prop));
      });
      const allMetas = [...filteredGlobalMetas, ...(template?.head?.metas ?? [])];
      let allLinks = [...configLinks, ...(template?.head?.links ?? [])];

      if (!prod) {
        allLinks = allLinks.filter((link) => link.attributes?.rel !== "preload");
      }

      const store = createStore(url, lang, spriteUrl);

      const tags: HtmlTagDescriptor[] = [
        { tag: "title", children: title, injectTo: "head" },
        ...metasToTags(allMetas),
        ...linksToTags(allLinks),
        { tag: "script", children: strScript(store), injectTo: "head" },
        {
          tag: "script",
          attrs: { type: "application/ld+json" },
          children: JSON.stringify(structuredData),
          injectTo: "head",
        },
        { tag: "div", attrs: { id: "root" }, children: appHtml, injectTo: "body" },
      ];

      return { html, tags };
    },
  };
}
