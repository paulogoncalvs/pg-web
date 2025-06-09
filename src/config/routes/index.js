const baseUrl = 'https://www.paulogoncalves.dev/';

export default {
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
        tests: {
            name: 'Home',
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
                title: 'Paulo Gonçalves - Front-End Engineer de Portugal [PT]',
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
                title: 'Contacts',
                links: [{ path: '', attributes: { href: `${baseUrl}contact/`, rel: 'canonical' } }],
                metas: [{ attributes: { name: 'description', content: 'Contact Paulo Gonçalves', 'data-hu': '' } }],
            },
        },
        tests: {
            name: 'Contact',
        },
    },
    '/en/contact/': {
        filename: 'en/contact/index.html',
        templateParameters: {
            lang: 'en',
            url: '/en/contact/',
            View: 'Contact',
            head: {
                title: 'Contacts',
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
                title: 'Contactos [PT]',
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
                title: '404',
                links: [{ path: '', attributes: { href: `${baseUrl}404/`, rel: 'canonical' } }],
                metas: [{ attributes: { name: 'description', content: 'Page not found', 'data-hu': '' } }],
            },
        },
        tests: {
            name: '404',
        },
    },
    '/en/404/': {
        filename: 'en/404/index.html',
        templateParameters: {
            lang: 'en',
            url: '/en/404/',
            View: 'NotFound',
            head: {
                title: '404',
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
                title: '404 [PT]',
                links: [{ path: '', attributes: { href: `${baseUrl}pt/404/`, rel: 'canonical' } }],
                metas: [{ attributes: { name: 'description', content: 'Página não encontrada', 'data-hu': '' } }],
            },
        },
    },
    '/offline/': {
        filename: 'offline/index.html',
        templateParameters: {
            lang: 'en',
            url: '/offline/',
            View: 'Offline',
            head: {
                title: 'Offline',
                links: [{ path: '', attributes: { href: `${baseUrl}offline/`, rel: 'canonical' } }],
                metas: [{ attributes: { name: 'description', content: 'Offline', 'data-hu': '' } }],
            },
        },
        tests: {
            name: 'Offline',
        },
    },
    '/en/offline/': {
        filename: 'en/offline/index.html',
        templateParameters: {
            lang: 'en',
            url: '/en/offline/',
            View: 'Offline',
            head: {
                title: 'Offline',
                links: [{ path: '', attributes: { href: `${baseUrl}en/offline/`, rel: 'canonical' } }],
                metas: [{ attributes: { name: 'description', content: 'Offline', 'data-hu': '' } }],
            },
        },
    },
    '/pt/offline/': {
        filename: 'pt/offline/index.html',
        templateParameters: {
            lang: 'pt',
            url: '/pt/offline/',
            View: 'Offline',
            head: {
                title: 'Offline [PT]',
                links: [{ path: '', attributes: { href: `${baseUrl}pt/offline/`, rel: 'canonical' } }],
                metas: [{ attributes: { name: 'description', content: 'Offline', 'data-hu': '' } }],
            },
        },
    },
};
