import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { appPlugin } from "./src/vite/plugins/vite-plugin-app";
import { sitemapPlugin } from "./src/vite/plugins/sitemap";
import { pwa } from "./src/config/global";

const rules: Array<{ test: RegExp; dir: string; ext?: string }> = [
  { test: /\.(woff2?|ttf|otf)$/i, dir: "fonts" },
  { test: /\.(webp|svg|jpg|jpeg|png|avif)$/i, dir: "img" },
  { test: /\.css$/i, dir: "styles", ext: ".css" },
];

export default defineConfig(({ mode }) => {
  const isProd = mode === "production" || mode === "test";

  return {
    mode: isProd ? "production" : "development",
    plugins: [
      appPlugin(mode),
      sitemapPlugin(),
      tailwindcss(),
      VitePWA({
        registerType: "autoUpdate",
        devOptions: {
          enabled: true,
        },
        workbox: {
          globPatterns: ["**/*.{js,css,html,svg,webp,woff2}"],
          navigateFallback: "/index.html",
          navigateFallbackDenylist: [/^\/api\//, /^\/server\//],
          ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/.*\.(server|api)\/.*/i,
              handler: "NetworkOnly",
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

    resolve: {
      alias: {
        "@": "/src",
      },
    },

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
