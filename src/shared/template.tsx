/* eslint-disable react/no-danger */
import { h } from 'preact';
import render from 'preact-render-to-string';
import App from '@/App';
import { headScript, bodyScript } from './scripts';
import globalConfig from '@/shared/config.js';

interface PageLinks {
    path: string;
    attributes: {
        link: string;
        href: string;
        rel: string;
        type: string;
        sizes: string;
    };
}

interface PageMetas {
    link: string;
    attributes: {
        name: string;
        content: string;
        property: string;
    };
}

interface PageScripts {
    src: string;
    async: boolean;
}

export interface PageProps {
    title: string;
    links: Partial<PageLinks>[];
    metas: Partial<PageMetas>[];
    scripts: Partial<PageScripts>[];
    headScript(): void;
    bodyScript(store?: PageStore): string;
    inlineCss: string;
    store: PageStore;
    head: Head;
}

const generateMetaTags = (metas: Partial<PageMetas>[]): JSX.Element[] => {
    return metas.map(({ attributes }, index) => {
        return <meta {...attributes} key={`metas-${index}`} />;
    });
};

const generateLinkTags = (links: Partial<PageLinks>[]): JSX.Element[] => {
    return links.map(({ attributes }, index) => {
        return <link {...attributes} key={`links-${index}`} />;
    });
};

const generateScriptTags = (paths: Partial<PageScripts>[]): JSX.Element[] => {
    return paths.map((attrs, index) => {
        return <script {...attrs} key={`js-${index}`} />;
    });
};

const getInlineCSS = (css: string): JSX.Element => {
    return <style dangerouslySetInnerHTML={{ __html: css }} />;
};

const getInlineJS = (js: string): JSX.Element => {
    return <script dangerouslySetInnerHTML={{ __html: js }} />;
};

const Page = (props: Partial<PageProps>): string =>
    '<!DOCTYPE html>' +
    render(
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <title>{props.title}</title>
                {props.metas ? generateMetaTags(props.metas) : undefined}
                {props.inlineCss ? getInlineCSS(props.inlineCss) : undefined}
                {props.links ? generateLinkTags(props.links) : undefined}
                {props.headScript ? getInlineJS(`(${props.headScript})()`) : undefined}
            </head>
            <body className="font-serif text-gray-900 bg-white">
                <div id="root">
                    <App store={props.store} />
                </div>
                {props.bodyScript ? getInlineJS(props.bodyScript(props.store)) : undefined}
                {props.scripts ? generateScriptTags(props.scripts) : undefined}
                <script async src="https://www.google-analytics.com/analytics.js" />
            </body>
        </html>,
    );

export default ({
    lang,
    head,
    webpackConfig,
}: {
    lang: string;
    head: Head;
    webpackConfig: { plugins: Array<any> }; // eslint-disable-line @typescript-eslint/no-explicit-any
}): string => {
    const sprite = webpackConfig.plugins.find((plugin) => plugin?.filenames?.spritemap).filenames?.spritemap;

    return Page({
        title: globalConfig.title,
        headScript,
        bodyScript,
        metas: head.metas,
        links: head.links,
        store: {
            filenames: {
                sprite: sprite && `/${sprite}`,
            },
            lang,
        },
    });
};
