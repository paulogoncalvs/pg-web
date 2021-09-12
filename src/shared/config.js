const routes = require('./routes');

const url = 'https://www.paulogoncalves.dev/';

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
    { attributes: { name: 'msvalidate.01', content: 'F63D2EC3D7DD2A060D742BC70B0AF5D7' } },
    { attributes: { name: 'google-site-verification', content: 'y8An9prxi5Rtn1NfAI2JZuDghowaml2Q' } },
    { attributes: { name: 'y_key', content: '76ba125138416496' } },
    { attributes: { name: 'apple-mobile-web-app-capable', content: 'yes' } },
    { attributes: { name: 'application-name', content: 'paulogoncalves.dev' } },
    { attributes: { name: 'theme-color', content: '#ffffff' } },
    { attributes: { name: 'apple-mobile-web-app-status-bar-style', content: 'black' } },
    { attributes: { content: 'summary_large_image', property: 'twitter:card' } },
    { attributes: { content: '@paulogoncalvs', property: 'twitter:site' } },
    { attributes: { content: '@paulogoncalvs', property: 'twitter:creator' } },
    { attributes: { content: 'paulogoncalves.dev', property: 'twitter:domain' } },
    { path: '/assets/img/me.jpeg', attributes: { property: 'twitter:image' } },
    { attributes: { content: 'Paulo Gonçalves - Front-End Engineer from Portugal', property: 'og:title' } },
    { attributes: { content: 'Personal Website', property: 'og:description' } },
    { attributes: { content: url, property: 'og:url' } },
    { attributes: { content: 'website', property: 'og:type' } },
    { path: '/assets/img/me.jpeg', attributes: { property: 'og:image' } },
];

const links = [
    {
        path: '',
        attributes: {
            href: 'https://fonts.gstatic.com',
            rel: 'preconnect',
            crossorigin: '',
        },
    },
    {
        path: '',
        attributes: {
            href: 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700;900&display=swap',
            rel: 'preload',
            as: 'style',
        },
    },
    {
        path: '',
        attributes: {
            href: 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700;900&display=swap',
            rel: 'stylesheet',
            type: 'text/css',
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
];

module.exports = {
    title: 'Paulo Gonçalves - Front-End Engineer from Portugal',
    description: 'Personal Website',
    scripts: [{ src: 'https://www.google-analytics.com/analytics.js', async: true }],
    metas,
    links,
    routes,
};
