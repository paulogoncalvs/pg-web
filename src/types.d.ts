/* eslint-disable @typescript-eslint/no-empty-interface */

declare interface IconSrc {
    viewBox?: string;
    content?: string;
    hash?: string;
}

declare interface PageStore {
    filenames?: {
        sprite?: 'string';
    };
}

declare let __STORE__: PageStore;

declare interface NodeModule {
    hot?: ImportMeta['hot'] | void;
}

declare let module: NodeModule;

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

// Make Preact's JSX the global JSX
declare namespace JSX {
    interface IntrinsicElements extends preact.JSX.IntrinsicElements {}
    interface IntrinsicAttributes extends preact.JSX.IntrinsicAttributes {}
    interface Element extends preact.JSX.Element {}
    interface ElementClass extends preact.JSX.ElementClass {}
    interface ElementAttributesProperty extends preact.JSX.ElementAttributesProperty {}
    interface ElementChildrenAttribute extends preact.JSX.ElementChildrenAttribute {}
    interface CSSProperties extends preact.JSX.CSSProperties {}
    interface SVGAttributes extends preact.JSX.SVGAttributes {}
    interface PathAttributes extends preact.JSX.PathAttributes {}
    interface TargetedEvent extends preact.JSX.TargetedEvent {}
    interface DOMAttributes<Target extends EventTarget> extends preact.JSX.DOMAttributes<Target> {}
    interface HTMLAttributes<RefType extends EventTarget = EventTarget> extends preact.JSX.HTMLAttributes<RefType> {}
}
