/// <reference types="vite/client" />

declare interface IconSrc {
  [Symbol.iterator]();
}

declare interface Head {
  title: string;
  links: Partial<PageLinks>[];
  metas: Partial<PageMetas>[];
}

declare interface PageStore {
  filenames?: {
    sprite?: string;
  };
  theme?: Theme;
  lang?: Language;
  url?: string;
  isOffline?: boolean;
  isSideDrawerOpen?: boolean;
  isNavigating?: boolean;
  animationsEnabled?: boolean;
  fontSize?: import("@/modules/fontSize").FontSize;
  cookiesEnabled?: boolean;
}

declare let STORE: PageStore;

declare interface NodeModule {
  hot?: ImportMeta["hot"] | undefined;
}

declare let module: NodeModule;

/// <reference types="gtag.js" />
declare module "gtag.js";

/** Maps authored classNames to their CSS Modules -suffixed generated classNames. */
type Mapping = Record<string, string>;

declare module "*.css" {
  const url: string;
  export default url;
}

// Import Prefixes
declare module "json:";
declare module "css:";
declare module "url:" {
  const url: string;
  export default url;
}
declare module "bundle:" {
  const url: string;
  export default url;
}

// Implicit URL Imports (see url-plugin)
declare module "*.png" {
  const url: string;
  export default url;
}
declare module "*.jpg" {
  const url: string;
  export default url;
}
declare module "*.jpeg" {
  const url: string;
  export default url;
}
declare module "*.gif" {
  const url: string;
  export default url;
}
declare module "*.webp" {
  const url: string;
  export default url;
}
declare module "*.svg" {
  const url: IconSrc;
  export default url;
}
declare module "*.mp4" {
  const url: string;
  export default url;
}
declare module "*.ogg" {
  const url: string;
  export default url;
}
declare module "*.mp3" {
  const url: string;
  export default url;
}
declare module "*.wav" {
  const url: string;
  export default url;
}
declare module "*.flac" {
  const url: string;
  export default url;
}
declare module "*.aac" {
  const url: string;
  export default url;
}
declare module "*.woff" {
  const url: string;
  export default url;
}
declare module "*.woff2" {
  const url: string;
  export default url;
}
declare module "*.eot" {
  const url: string;
  export default url;
}
declare module "*.ttf" {
  const url: string;
  export default url;
}
declare module "*.otf" {
  const url: string;
  export default url;
}

declare module "*.mdx" {
  import type { ComponentType } from "preact";
  const Component: ComponentType;
  export default Component;
}
declare module "*.mdx" {
  export const meta: { title: string; description: string; date: string };
}

interface Window {
  grecaptcha?: {
    ready: (callback: () => void) => void;
    execute: (siteKey: string, options: { action: string }) => Promise<string>;
    render: (
      element: string,
      options: { sitekey: string; callback: (token: string) => void },
    ) => string;
    reset: (widgetId?: string) => void;
  };
}
