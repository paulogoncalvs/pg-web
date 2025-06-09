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
        sprite?: 'string';
    };
    theme?: Theme;
    lang?: Language;
    url?: string;
    isOffline?: boolean;
}

declare let __STORE__: PageStore;

declare module 'wouter-preact/static-location';

declare interface NodeModule {
    hot?: ImportMeta['hot'] | void;
}

declare let module: NodeModule;

/// <reference types="gtag.js" />
declare module 'gtag.js';

/** Maps authored classNames to their CSS Modules -suffixed generated classNames. */
type Mapping = Record<string, string>;

declare module '*.css' {
    const url: string;
    export default url;
}
declare module '*.scss' {
    const url: string;
    export default url;
}
declare module '*.sass' {
    const url: string;
    export default url;
}
declare module '*.styl' {
    const url: string;
    export default url;
}

// Import Prefixes
declare module 'json:';
declare module 'css:';
declare module 'url:' {
    const url: string;
    export default url;
}
declare module 'bundle:' {
    const url: string;
    export default url;
}

// Implicit URL Imports (see url-plugin)
declare module '*.png' {
    const url: string;
    export default url;
}
declare module '*.jpg' {
    const url: string;
    export default url;
}
declare module '*.jpeg' {
    const url: string;
    export default url;
}
declare module '*.gif' {
    const url: string;
    export default url;
}
declare module '*.webp' {
    const url: string;
    export default url;
}
declare module '*.svg' {
    const url: IconSrc;
    export default url;
}
declare module '*.mp4' {
    const url: string;
    export default url;
}
declare module '*.ogg' {
    const url: string;
    export default url;
}
declare module '*.mp3' {
    const url: string;
    export default url;
}
declare module '*.wav' {
    const url: string;
    export default url;
}
declare module '*.flac' {
    const url: string;
    export default url;
}
declare module '*.aac' {
    const url: string;
    export default url;
}
declare module '*.woff' {
    const url: string;
    export default url;
}
declare module '*.woff2' {
    const url: string;
    export default url;
}
declare module '*.eot' {
    const url: string;
    export default url;
}
declare module '*.ttf' {
    const url: string;
    export default url;
}
declare module '*.otf' {
    const url: string;
    export default url;
}
