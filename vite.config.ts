import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

import { pwa } from "./src/config/global/pwa";
import { sitemapPlugin } from "./src/vite/plugins/sitemap";
import { appPlugin } from "./src/vite/plugins/vite-plugin-app";

const rules: Array<{ test: RegExp; dir: string; ext?: string }> = [
  { test: /\.(woff2?|ttf|otf)$/i, dir: "fonts" },
  { test: /\.(webp|svg|jpg|jpeg|png|avif)$/i, dir: "img" },
  { test: /\.css$/i, dir: "styles", ext: ".css" },
];

export default defineConfig(({ mode }) => {
  const isProd = mode === "production" || mode === "test";

  return {
    mode: isProd ? "production" : "development",
    resolve: {
      alias: {
        "@": "/src",
        "react/jsx-runtime": "preact/jsx-runtime",
        react: "preact/compat",
        "react-dom": "preact/compat",
      },
    },
    plugins: [
      {
        enforce: "pre",
        ...mdx({
          providerImportSource: "@mdx-js/preact",
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeHighlight],
        }),
      },
      appPlugin(mode),
      sitemapPlugin(),
      tailwindcss(),
      VitePWA({
        registerType: "autoUpdate",
        manifestFilename: "manifest.webmanifest",
        devOptions: {
          enabled: true,
        },
        workbox: {
          globDirectory: "dist/",
          globPatterns: ["**/*.{js,css,svg,webp,woff2}"],
          swDest: "dist/sw.js",
          navigateFallback: null,
          navigateFallbackDenylist: [/^\/api\//, /^\/server\//],
          ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
          runtimeCaching: [
            // HTML / navigation requests → ALWAYS network
            {
              urlPattern: ({ request }) => request.mode === "navigate",
              handler: "NetworkOnly",
            },
            // API / server calls → network only
            {
              urlPattern: /^https:\/\/.*\.(server|api)\/.*/i,
              handler: "NetworkOnly",
            },
            // Cache images at runtime
            {
              urlPattern: /\.(?:png|jpg|jpeg|svg|webp|gif)$/i,
              handler: "StaleWhileRevalidate",
              options: {
                cacheName: "images",
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                },
              },
            },
            // Cache fonts
            {
              urlPattern: /\.(?:woff|woff2|ttf|otf)$/i,
              handler: "CacheFirst",
              options: {
                cacheName: "fonts",
                expiration: {
                  maxEntries: 30,
                  maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                },
              },
            },
          ],
        },
        manifest: {
          name: pwa.name,
          short_name: pwa.shortName,
          description: pwa.description,
          start_url: "/?source=pwa",
          id: "/?source=pwa",
          display: "standalone",
          background_color: pwa.backgroundColor,
          theme_color: pwa.themeColor,
          lang: pwa.lang,
          scope: "/",
          icons: pwa.icons,
        },
      }),
    ],

    build: {
      manifest: true,
      outDir: "dist",
      assetsDir: "assets",
      target: "esnext",
      minify: isProd ? "esbuild" : false,
      rollupOptions: {
        input: { main: "index.html" },
        output: {
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name ?? "";

            const rule = rules.find((r) => r.test.test(name));

            if (rule) {
              const ext = rule.ext ?? "[extname]";
              return `assets/${rule.dir}/[name].[hash]${ext}`;
            }

            return "assets/misc/[name].[hash].[extname]";
          },
          chunkFileNames: "assets/js/[name].[hash].js",
          entryFileNames: "assets/js/[name].[hash].js",
        },
      },
    },

    server: {
      port: 4005,
      host: true,
    },
  };
});
