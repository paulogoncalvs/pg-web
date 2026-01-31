import routes from '../routes/index.js';

const baseUrl = 'https://www.paulogoncalves.dev/';

const metas = [
    { attributes: { name: 'viewport', content: 'width=device-width,initial-scale=1' } },
    {
        attributes: {
            name: 'keywords',
            content:
                'HTML, CSS, JavaScript, TypeScript, Preact, Webpack, Tailwind, Front-End, Frontend, Paulo Gonçalves',
        },
    },
    { attributes: { name: 'author', content: 'Paulo Gonçalves | contact@paulogoncalves.dev' } },
    { attributes: { name: 'google-site-verification', content: 'rSCoSktIV5-y8An9prxi5Rtn1NfAI2JZuDghowaml2Q' } },
    { attributes: { name: 'mobile-web-app-capable', content: 'yes' } },
    { attributes: { name: 'application-name', content: 'paulogoncalves.dev' } },
    { attributes: { name: 'theme-color', content: '#ffffff' } },
    { attributes: { name: 'apple-mobile-web-app-status-bar-style', content: 'black' } },
    { attributes: { content: 'summary_large_image', property: 'twitter:card' } },
    { attributes: { content: '@paulogoncalvs', property: 'twitter:site' } },
    { attributes: { content: '@paulogoncalvs', property: 'twitter:creator' } },
    { attributes: { content: 'paulogoncalves.dev', property: 'twitter:domain' } },
    { path: '/assets/img/paulo-goncalves.webp', attributes: { property: 'twitter:image' } },
    { attributes: { content: 'Paulo Gonçalves - Front-End Engineer from Portugal', property: 'og:title' } },
    { attributes: { content: 'Personal Website', property: 'og:description' } },
    { attributes: { content: baseUrl, property: 'og:url' } },
    { attributes: { content: 'website', property: 'og:type' } },
    { path: '/assets/img/paulo-goncalves.webp', attributes: { property: 'og:image' } },
];

const links = [
    {
        path: '',
        attributes: {
            href: '/assets/resources/Poppins-Regular.b78525ba2b4b274fac00.woff2',
            rel: 'preload',
            as: 'font',
            type: 'font/woff2',
            crossorigin: 'anonymous',
        },
    },
    {
        path: '',
        attributes: {
            href: '/assets/resources/Poppins-Bold.9edd872ea4af8d157708.woff2',
            rel: 'preload',
            as: 'font',
            type: 'font/woff2',
            crossorigin: 'anonymous',
        },
    },
    {
        path: '/manifest.webmanifest',
        attributes: {
            rel: 'manifest',
        },
    },
    {
        path: '/favicon.svg',
        attributes: {
            rel: 'icon',
            type: 'image/svg+xml',
        },
    },
    {
        path: '/favicon-16x16.png',
        attributes: {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
        },
    },
    {
        path: '/favicon-32x32.png',
        attributes: {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
        },
    },
    {
        path: '/apple-touch-icon.png',
        attributes: {
            rel: 'apple-touch-icon',
            type: 'image/png',
            sizes: '180x180',
        },
    },
    // { path: '/resources/paulo-goncalves.webp', attributes: { rel: 'preload', fetchpriority: 'high', type: 'image/webp', as: 'image', } },
    // { path: '/resources/paulo-goncalves_sm.webp', attributes: { rel: 'preload', fetchpriority: 'high', type: 'image/webp', as: 'image', } },
];

export default {
    title: 'Paulo Gonçalves - Front-End Engineer from Portugal',
    description: 'Personal Website',
    metas,
    links,
    routes,
    baseUrl,
};
