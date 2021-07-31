// Must be the first import
if (process.env.NODE_ENV === 'development') {
    // Must use require here as import statements are only allowed to exist at the top of a file.
    require('preact/debug');
}

import { h, render } from 'preact';
import App from '@/app/App';
import { isBrowser } from '@/utils/browser';
import './styles/index.scss';

const store = isBrowser() ? __STORE__ : undefined;

function init(): void {
    const el = document.getElementById('root');

    render(<App store={store} />, el as Element);
}

init();

console.log('Hi! Check https://github.com/paulogoncalvs/website/ to view the code.'); // eslint-disable-line no-console

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
