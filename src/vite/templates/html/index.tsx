import { structuredData } from "@/config/global/schema";

import { strScript } from "./scripts";

interface PageLinks {
  path?: string;
  attributes: Record<string, string>;
}

interface PageMetas {
  path?: string;
  property?: string;
  name?: string;
  attributes?: Record<string, string>;
  content?: string;
}

export interface PageProps {
  lang: string;
  url: string;
  title: string;
  sprite?: string;
  store?: PageStore;
  canonicalUrl: string;
  head?: {
    title?: string;
    metas?: Partial<PageMetas>[];
    links?: Partial<PageLinks>[];
  };
  metas?: string;
  links?: string;
  appHtml?: string;
}

export const HtmlTemplate = ({
  title,
  metas,
  links,
  store,
  appHtml = "",
  lang = "en",
}: Partial<PageProps>): string => {
  const headParts: string[] = [
    '<meta charSet="utf-8" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1" />',
    `<title>${title}</title>`,
  ];

  const scriptContent = strScript(store);

  if (scriptContent) {
    headParts.push(`<script>${scriptContent}</script>`);
  }

  headParts.push(`<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`);

  if (metas) {
    headParts.push(metas);
  }
  if (links) {
    headParts.push(links);
  }

  const bodyContent = `<div id="root">${appHtml}</div>`;

  return `<!DOCTYPE html><html lang="${lang}" class="[scrollbar-gutter:stable]"><head>${headParts.join("")}</head><body class="bg-gradient font-sans text-zinc-900 selection:bg-zinc-400 selection:text-zinc-100 dark:text-zinc-200 dark:selection:bg-zinc-100 dark:selection:text-zinc-900 min-block-svh">${bodyContent}</body></html>`;
};
