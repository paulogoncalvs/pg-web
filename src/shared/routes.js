const url = 'https://www.paulogoncalves.dev/';

module.exports = {
    '/': {
        filename: 'index.html',
        templateParameters: {
            lang: 'en',
            head: {
                title: 'Paulo Gonçalves - Front-End Engineer from Portugal',
                links: [{ path: '', attributes: { href: url, rel: 'canonical' } }],
                metas: [{ attributes: { name: 'description', content: 'Personal Website', 'data-helmet': '' } }],
            },
        },
        url: '/',
    },
    '/en/': {
        filename: 'en/index.html',
        templateParameters: {
            lang: 'en',
            head: {
                title: 'Paulo Gonçalves - Front-End Engineer from Portugal',
                links: [{ path: '', attributes: { href: `${url}en/`, rel: 'canonical' } }],
                metas: [{ attributes: { name: 'description', content: 'Personal Website', 'data-helmet': '' } }],
            },
        },
    },
    '/pt/': {
        filename: 'pt/index.html',
        templateParameters: {
            lang: 'pt',
            head: {
                title: 'Paulo Gonçalves - Front-End Engineer from Portugal - PT',
                links: [{ path: '', attributes: { href: `${url}pt/`, rel: 'canonical' } }],
                metas: [{ attributes: { name: 'description', content: 'Website pessoal', 'data-helmet': '' } }],
            },
        },
    },
};
