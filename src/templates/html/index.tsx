/* eslint-disable react/no-danger */
import { h } from 'preact';
import render from 'preact-render-to-string';
import App from '@/App';
import globalConfig from '@/config/global/index.js';
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

/* @TODO SCRIPTS TAGS - ANALYTICS */
interface HtmlTemplateProps {
    lang: string;
    url: string;
    head: Head;
    webpackConfig: { plugins: Array<any> }; // eslint-disable-line @typescript-eslint/no-explicit-any
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
    metas.map(({ attributes }, index) => <meta {...attributes} key={`metas-${index++}`} />);

const generateLinkTags = (links: Partial<PageLinks>[] = []): JSX.Element[] =>
    links.map(({ attributes }, index) => <link {...attributes} key={`links-${index++}`} />);

const generateScriptTags = (paths: Partial<PageScripts>[] = []): JSX.Element[] =>
    paths.map((attrs, index) => <script {...attrs} key={`js-${index++}`} />);

const getInlineCSS = (css = ''): JSX.Element | void =>
    css ? <style dangerouslySetInnerHTML={{ __html: css }} /> : undefined;

const getInlineJS = (js = ''): JSX.Element | void =>
    js ? <script dangerouslySetInnerHTML={{ __html: js }} /> : undefined;

const Page = ({ title, metas, inlineCss, links, store, strScript, scripts }: Partial<PageProps>): string =>
    '<!DOCTYPE html>' +
    render(
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <title>{title}</title>
                {strScript && getInlineJS(strScript(store))}
                {generateMetaTags(metas)}
                {generateScriptTags(scripts)}
                {getInlineCSS(inlineCss)}
                {generateLinkTags(links)}
            </head>
            <body class="dark:selection:text-zinc-900 dark:selection:bg-emerald-100 selection:text-zinc-100 selection:bg-emerald-400 bg-white text-zinc-900 dark:text-zinc-200 dark:bg-zinc-900 transition-colors durasidebarsidebartion-300">
                <div id="root">
                    <App store={store} />
                </div>
            </body>
        </html>,
    );

export default ({ lang, url, head, webpackConfig }: HtmlTemplateProps): string => {
    const sprite = webpackConfig.plugins.find((plugin) => plugin?.filenames?.spritemap).filenames?.spritemap;

    return Page({
        strScript,
        scripts: globalConfig.scripts,
        title: head.title || globalConfig.title,
        metas: head.metas || globalConfig.metas,
        links: head.links || globalConfig.links,
        store: {
            filenames: {
                sprite: sprite && `/${sprite}`,
            },
            lang,
            url,
        },
    });
};
