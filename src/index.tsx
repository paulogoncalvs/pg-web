/// <reference types="vite/client" />

// Must be the first import
if (import.meta.env.DEV) {
  await import("preact/debug");
}

import { hydrate } from "preact";

import App from "@/App";
import "@/styles/index.css";
import { githubRepoUrl } from "@/config/global/socialLinks";
import { reportWebVitalsToGA } from "@/modules/webVitals";

hydrate(<App store={STORE} />, document.getElementById("root") as Element);

console.info(`%c🌀 Check ${githubRepoUrl} to view the code.`, "font-size:16px;font-weight:bold;");

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
