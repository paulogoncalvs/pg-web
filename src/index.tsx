// Must be the first import
if (process.env.NODE_ENV === 'development') {
    // Must use require here as import statements are only allowed to exist at the top of a file.
    require('preact/debug');
}

import { h, hydrate } from 'preact';
import App from '@/App';
import './styles/index.scss';

hydrate(<App store={__STORE__} />, document.getElementById('root') as Element);

console.log('Hi! Check https://github.com/paulogoncalvs/pg-web/ to view the code.'); // eslint-disable-line no-console

// PWA - Register service worker
if (process.env.NODE_ENV !== 'development' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
    });
}

// Tracking - Google analytics
if (process.env.TRACK_GA_ID) {
    window.ga =
        window.ga ||
        function (): void {
            (ga.q = ga.q || []).push(arguments); // eslint-disable-line prefer-rest-params
        };
    ga.l = +new Date();

    ga('create', process.env.TRACK_GA_ID, 'auto');
    ga('send', 'pageview');
}

// example process.env
// process.env.API_URL:{process.env.API_URL} !!! Make sure to put both .env.* files in gitignore
