// Must be the first import
if (process.env.NODE_ENV === 'development') {
    // Must use require here as import statements are only allowed to exist at the top of a file.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('preact/debug');
}

import App from '@/App';
import { reportWebVitalsToGA } from '@/modules/webVitals';
import '@/styles/index.css';
import { hydrate } from 'preact';

hydrate(<App store={__STORE__} />, document.getElementById('root') as Element);

console.info(
    '%c🌀 Check https://github.com/paulogoncalvs/pg-web/ to view the code.',
    'font-size:16px;font-weight:bold;',
);

// PWA - Register service worker
if (process.env.NODE_ENV !== 'development') {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js');
        });
    }
}

// Tracking
reportWebVitalsToGA(); // Web Vitals
