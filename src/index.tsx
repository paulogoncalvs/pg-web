/// <reference types="vite/client" />

// Must be the first import
if (import.meta.env.DEV) {
  await import("preact/debug");
}

import { hydrate } from "preact";

import { App } from "@/App";
import "@/styles/index.css";
import { reportWebVitalsToGA } from "@/modules/webVitals";

hydrate(<App store={STORE} />, document.getElementById("root") as Element);

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
          if (import.meta.env.DEV) {
            console.warn("SW registration failed:", err);
          }
        });
      }, 1000);
    });
  }
}

// Tracking
reportWebVitalsToGA();
