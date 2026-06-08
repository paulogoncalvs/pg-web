/* eslint-disable no-console */
import crypto from "node:crypto";
import fs from "node:fs";

const DIST = "dist";
const SW_PATH = `${DIST}/sw.js`;
const OFFLINE_HTML = `${DIST}/offline/index.html`;

if (!fs.existsSync(OFFLINE_HTML)) {
  console.error(`[sw-precache] ${OFFLINE_HTML} not found — run SSG first`);
  process.exit(1);
}

const hash = crypto.createHash("md5").update(fs.readFileSync(OFFLINE_HTML)).digest("hex");

let sw = fs.readFileSync(SW_PATH, "utf-8");

// 1. Inject /offline/ into the precache manifest
const precacheOld = `}],{ignoreURLParametersMatching:`;
const precacheNew = `},{url:"/offline/",revision:"${hash}"}],{ignoreURLParametersMatching:`;
if (!sw.includes(precacheOld)) {
  console.error("[sw-precache] Could not find precache array closing in sw.js");
  process.exit(1);
}
sw = sw.replace(precacheOld, precacheNew);

// 2. Replace createHandlerBoundToURL("/offline/") with network-first + offline fallback
const handlerOld = `s.createHandlerBoundToURL("/offline/")`;
const handlerNew = `async ({event})=>await fetch(event.request).catch(()=>caches.match("/offline/"))`;
if (!sw.includes(handlerOld)) {
  console.error("[sw-precache] Could not find createHandlerBoundToURL in sw.js");
  process.exit(1);
}
sw = sw.replace(handlerOld, handlerNew);

fs.writeFileSync(SW_PATH, sw, "utf-8");
console.log(`[sw-precache] Injected /offline/ (revision: ${hash}) and replaced handler`);
