import routes from "../routes";

const baseUrl = "https://www.paulogoncalves.dev/";

type StructuredData = {
  "@context": string;
  "@graph": Array<Record<string, unknown>>;
};

const structuredData: StructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      jobTitle: "Front-End Engineer",
      name: "Paulo Gonçalves",
      nationality: {
        "@type": "Country",
        name: "Portugal",
      },
      sameAs: [
        "https://github.com/paulogoncalvs",
        "https://www.linkedin.com/in/paulogoncalvs",
        "https://x.com/paulogoncalvs",
      ],
      url: baseUrl,
    },
    {
      "@type": "WebSite",
      name: "Paulo Gonçalves - Front-End Engineer",
      url: baseUrl,
    },
  ],
};

interface Pwa {
  name: string;
  shortName: string;
  description: string;
  backgroundColor: string;
  themeColor: string;
  lang: string;
  icons: Array<{ src: string; sizes: string; type: string; purpose?: string }>;
}

const pwa: Pwa = {
  name: "Paulo Gonçalves - Front-End Engineer",
  shortName: "PauloGoncalves",
  description: "Personal Website",
  backgroundColor: "#ffffff",
  themeColor: "#42b883",
  lang: "en",
  icons: [
    { src: "/assets/manifest/pwa-192x192.png", sizes: "192x192", type: "image/png" },
    { src: "/assets/manifest/pwa-512x512.png", sizes: "512x512", type: "image/png" },
    {
      src: "/assets/manifest/pwa-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any maskable",
    },
  ],
};

interface Meta {
  attributes?: Record<string, string>;
  path?: string;
  property?: string;
  content?: string;
  name?: string;
  [key: string]: unknown;
}

interface Link {
  path?: string;
  attributes: Record<string, string>;
}

const metas: Meta[] = [
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

const links: Link[] = [
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

type Routes = typeof routes;

interface GlobalConfig {
  title: string;
  description: string;
  metas: Meta[];
  links: Link[];
  routes: Routes;
  baseUrl: string;
  scripts: unknown[];
  structuredData: StructuredData;
  pwa: Pwa;
}

const config: GlobalConfig = {
  title: "Paulo Gonçalves - Front-End Engineer from Portugal",
  description: "Personal Website",
  metas,
  links,
  routes,
  baseUrl,
  scripts: [],
  structuredData,
  pwa,
};

export { structuredData, pwa };
export default config;
