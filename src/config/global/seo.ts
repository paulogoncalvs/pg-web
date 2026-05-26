import { baseUrl } from "./constants";

export interface Meta {
  attributes?: Record<string, string>;
  path?: string;
  property?: string;
  content?: string;
  name?: string;
  [key: string]: unknown;
}

export interface Link {
  path?: string;
  attributes: Record<string, string>;
}

export const configMetas: Meta[] = [
  { attributes: { content: "width=device-width,initial-scale=1", name: "viewport" } },
  {
    attributes: {
      content:
        "HTML, CSS, JavaScript, TypeScript, Preact, Vite, Tailwind, Front-End, Frontend, Paulo Gonçalves",
      name: "keywords",
    },
  },
  { attributes: { content: "Paulo Gonçalves | contact@paulogoncalves.dev", name: "author" } },
  {
    attributes: {
      content: "rSCoSktIV5-y8An9prxi5Rtn1NfAI2JZuDghowaml2Q",
      name: "google-site-verification",
    },
  },
  { attributes: { content: "yes", name: "mobile-web-app-capable" } },
  { attributes: { content: "paulogoncalves.dev", name: "application-name" } },
  { attributes: { content: "#ffffff", name: "theme-color" } },
  { attributes: { content: "black", name: "apple-mobile-web-app-status-bar-style" } },
  { attributes: { content: "summary_large_image", property: "twitter:card" } },
  { attributes: { content: "@paulogoncalvs", property: "twitter:site" } },
  { attributes: { content: "@paulogoncalvs", property: "twitter:creator" } },
  { attributes: { content: "paulogoncalves.dev", property: "twitter:domain" } },
  { attributes: { property: "twitter:image" }, path: "/assets/img/paulo-goncalves-400.jpeg" },
  {
    attributes: {
      content: "Paulo Gonçalves - Front-End Engineer from Portugal",
      property: "og:title",
    },
  },
  { attributes: { content: "Personal Website", property: "og:description" } },
  { attributes: { content: baseUrl, property: "og:url" } },
  { attributes: { content: "website", property: "og:type" } },
  { attributes: { property: "og:image" }, path: "/assets/img/paulo-goncalves-400.jpeg" },
];

export const configLinks: Link[] = [
  {
    attributes: {
      as: "font",
      crossorigin: "anonymous",
      rel: "preload",
      type: "font/woff2",
      href: "/assets/fonts/Poppins-Regular.woff2",
    },
  },
  {
    attributes: {
      as: "font",
      crossorigin: "anonymous",
      rel: "preload",
      type: "font/woff2",
      href: "/assets/fonts/Poppins-Bold.woff2",
    },
  },
  {
    attributes: { rel: "shortcut icon", href: "/assets/favicon.ico" },
  },
  {
    attributes: { rel: "icon", type: "image/svg+xml", href: "/assets/favicon.svg" },
  },
  {
    attributes: {
      rel: "icon",
      sizes: "96x96",
      type: "image/png",
      href: "/assets/favicon-96x96.png",
    },
  },
  {
    attributes: {
      rel: "apple-touch-icon",
      sizes: "180x180",
      type: "image/png",
      href: "/assets/apple-touch-icon.png",
    },
  },
];
