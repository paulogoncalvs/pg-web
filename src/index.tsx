/// <reference types="vite/client" />

// Must be the first import
if (import.meta.env.DEV) {
  await import("preact/debug");
}

import App from "@/App";
import { reportWebVitalsToGA } from "@/modules/webVitals";
import "@/styles/index.css";
import { hydrate } from "preact";

hydrate(<App store={__STORE__} />, document.getElementById("root") as Element);

console.info(
  "%c🌀 Check https://github.com/paulogoncalvs/pg-web/ to view the code.",
  "font-size:16px;font-weight:bold;",
);

// PWA - Register service worker after page loads
if (import.meta.env.PROD) {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        navigator.serviceWorker.register("/sw.js");
      }, 1000);
    });
  }
}

// Tracking
reportWebVitalsToGA();
