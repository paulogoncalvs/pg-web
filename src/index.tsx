/// <reference types="vite/client" />

// Must be the first import
if (import.meta.env.DEV) {
  await import("preact/debug");
}

import { hydrate } from "preact";

import { App } from "@/App";
import routesConfig from "@/config/routes";
import { preloadTranslation } from "@/modules/i18n";
import { LANGUAGE_DEFAULT } from "@/modules/language";
import { preloadPage, RouterPage } from "@/modules/router/pages";
import { reportWebVitalsToGA } from "@/modules/webVitals";
import "@/styles/index.css";
import { preloadBlogPost } from "@/pages/Blog/posts";

// Pre-load the initial page chunk so lazy() resolves before hydration
const url = STORE.url || "/";
const route = routesConfig[url.replace("index.html", "")];
const view = route?.templateParameters?.View;

if (view === "BlogPost") {
  const slug = url.split("/blog/")[1]?.replace("/", "");
  if (slug) {
    await Promise.all([preloadPage(view), preloadBlogPost(slug)]);
  } else {
    await preloadPage(view || "NotFound");
  }
} else {
  await preloadPage(view || "NotFound");
}

const initialLang = STORE.lang || LANGUAGE_DEFAULT;
await Promise.all([
  preloadTranslation(initialLang),
  initialLang !== LANGUAGE_DEFAULT ? preloadTranslation(LANGUAGE_DEFAULT) : Promise.resolve(),
]);

hydrate(<App store={STORE} routerPage={RouterPage} />, document.getElementById("root") as Element);

if (import.meta.env.DEV) {
  console.info(
    "%c🌀 Check https://github.com/paulogoncalvs/pg-web to view the code.",
    "font-size:16px;font-weight:bold;",
  );
}

// PWA - Register service worker after page loads
if (import.meta.env.PROD) {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        navigator.serviceWorker.register("/sw.js").catch((err) => {
          console.warn("SW registration failed:", err);
        });
      }, 1000);
    });
  }
}

// Tracking
reportWebVitalsToGA();
