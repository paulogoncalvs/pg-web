const baseUrl = 'https://www.paulogoncalves.dev/';

module.exports = {
    '/': {
        filename: 'index.html',
        templateParameters: {
            lang: 'en',
            url: '/',
            View: 'Home',
            head: {
                title: 'Paulo Gonçalves - Front-End Engineer from Portugal',
                links: [{ path: '', attributes: { href: baseUrl, rel: 'canonical' } }],
                metas: [{ attributes: { name: 'description', content: 'Personal Website', 'data-hu': '' } }],
            },
        },
    },
    '/en/': {
        filename: 'en/index.html',
        templateParameters: {
            lang: 'en',
            url: '/en/',
            View: 'Home',
            head: {
                title: 'Paulo Gonçalves - Front-End Engineer from Portugal',
                links: [{ path: '', attributes: { href: `${baseUrl}en/`, rel: 'canonical' } }],
                metas: [{ attributes: { name: 'description', content: 'Personal Website', 'data-hu': '' } }],
            },
        },
    },
    '/pt/': {
        filename: 'pt/index.html',
        templateParameters: {
            lang: 'pt',
            url: '/pt/',
            View: 'Home',
            head: {
                title: 'Paulo Gonçalves - Front-End Engineer de Portugal - PT',
                links: [{ path: '', attributes: { href: `${baseUrl}pt/`, rel: 'canonical' } }],
                metas: [{ attributes: { name: 'description', content: 'Website pessoal', 'data-hu': '' } }],
            },
        },
    },
    '/contact/': {
        filename: 'contact/index.html',
        templateParameters: {
            lang: 'en',
            url: '/contact/',
            View: 'Contact',
            head: {
                title: 'Contact - Paulo Gonçalves',
                links: [{ path: '', attributes: { href: `${baseUrl}contact/`, rel: 'canonical' } }],
                metas: [{ attributes: { name: 'description', content: 'Contact Paulo Gonçalves', 'data-hu': '' } }],
            },
        },
    },
    '/en/contact/': {
        filename: 'en/contact/index.html',
        templateParameters: {
            lang: 'en',
            url: '/en/contact/',
            View: 'Contact',
            head: {
                title: 'Contact - Paulo Gonçalves',
                links: [{ path: '', attributes: { href: `${baseUrl}en/contact/`, rel: 'canonical' } }],
                metas: [{ attributes: { name: 'description', content: 'Contact Paulo Gonçalves', 'data-hu': '' } }],
            },
        },
    },
    '/pt/contact/': {
        filename: 'pt/contact/index.html',
        templateParameters: {
            lang: 'pt',
            url: '/pt/contact/',
            View: 'Contact',
            head: {
                title: 'Contactar - Paulo Gonçalves - PT',
                links: [{ path: '', attributes: { href: `${baseUrl}pt/contact/`, rel: 'canonical' } }],
                metas: [{ attributes: { name: 'description', content: 'Contactar Paulo Gonçalves', 'data-hu': '' } }],
            },
        },
    },
    '/404/': {
        filename: '404/index.html',
        templateParameters: {
            lang: 'en',
            url: '/404/',
            View: 'NotFound',
            head: {
                title: '404 - Paulo Gonçalves',
                links: [{ path: '', attributes: { href: `${baseUrl}404/`, rel: 'canonical' } }],
                metas: [{ attributes: { name: 'description', content: 'Page not found', 'data-hu': '' } }],
            },
        },
    },
    '/en/404/': {
        filename: 'en/404/index.html',
        templateParameters: {
            lang: 'en',
            url: '/en/404/',
            View: 'NotFound',
            head: {
                title: '404 - Paulo Gonçalves',
                links: [{ path: '', attributes: { href: `${baseUrl}en/404/`, rel: 'canonical' } }],
                metas: [{ attributes: { name: 'description', content: 'Page not found', 'data-hu': '' } }],
            },
        },
    },
    '/pt/404/': {
        filename: 'pt/404/index.html',
        templateParameters: {
            lang: 'pt',
            url: '/pt/404/',
            View: 'NotFound',
            head: {
                title: '404 - Paulo Gonçalves - PT',
                links: [{ path: '', attributes: { href: `${baseUrl}pt/404/`, rel: 'canonical' } }],
                metas: [{ attributes: { name: 'description', content: 'Página não encontrada', 'data-hu': '' } }],
            },
        },
    },
};
