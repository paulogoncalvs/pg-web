import { h, JSX } from 'preact';
import render from 'preact-render-to-string';
import App from '@/App';
import globalConfig, { structuredData } from '@/config/global';
import { strScript } from './scripts';

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

interface WebpackPlugin {
    filenames?: { spritemap?: string };
}

interface HtmlTemplateProps {
    lang: string;
    url: string;
    head: Head;
    webpackConfig: { plugins: WebpackPlugin[] };
}

export interface PageProps {
    title: string;
    links?: Partial<PageLinks>[];
    metas?: Partial<PageMetas>[];
    scripts?: Partial<PageScripts>[];
    strScript?(store?: PageStore): string;
    inlineCss?: string;
    store: PageStore;
    head: Head;
}

const generateMetaTags = (metas: Partial<PageMetas>[] = []): JSX.Element[] =>
    metas.map(({ attributes }, index) => <meta {...attributes} key={`metas-${index}`} />);

const generateLinkTags = (links: Partial<PageLinks>[] = []): JSX.Element[] =>
    links.map(({ attributes }, index) => <link {...attributes} key={`links-${index}`} />);

const generateScriptTags = (paths: Partial<PageScripts>[] = []): JSX.Element[] =>
    paths.map((attrs, index) => <script {...attrs} key={`js-${index}`} />);

const getInlineCSS = (css = ''): JSX.Element | void =>
    css ? <style dangerouslySetInnerHTML={{ __html: css }} /> : undefined;

const getInlineJS = (js = ''): JSX.Element | void =>
    js ? <script dangerouslySetInnerHTML={{ __html: js }} /> : undefined;

const getStructuredData = (): JSX.Element => (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
);

const Page = ({ title, metas, inlineCss, links, store, strScript, scripts }: Partial<PageProps>): string =>
    `<!DOCTYPE html>${render(
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <title>{title}</title>
                {strScript && getInlineJS(strScript(store))}
                {getStructuredData()}
                {generateMetaTags(metas)}
                {generateScriptTags(scripts)}
                {getInlineCSS(inlineCss)}
                {generateLinkTags(links)}
            </head>
            <body class="font-sans dark:selection:text-zinc-900 dark:selection:bg-zinc-100 selection:text-zinc-100 selection:bg-zinc-400 text-zinc-900 dark:text-zinc-200 transition-colors duration-300 bg-gradient">
                <div id="root">
                    <App store={store} />
                </div>
            </body>
        </html>,
    )}`;

export default ({ lang, url, head, webpackConfig }: HtmlTemplateProps): string => {
    const plugin = webpackConfig.plugins.find((p) => p?.filenames?.spritemap);
    const sprite = plugin?.filenames?.spritemap;

    return Page({
        strScript,
        scripts: globalConfig.scripts as Partial<PageScripts>[],
        title: head.title || (globalConfig.title as string),
        metas: head.metas || (globalConfig.metas as Partial<PageMetas>[]),
        links: head.links || (globalConfig.links as Partial<PageLinks>[]),
        store: {
            filenames: {
                sprite: sprite ? `/${sprite}` : undefined,
            },
            lang,
            url,
        },
    });
};
