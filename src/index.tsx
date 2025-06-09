// Must be the first import
if (process.env.NODE_ENV === 'development') {
    // Must use require here as import statements are only allowed to exist at the top of a file.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('preact/debug');
}

import '@/styles/index.scss';
import { h, hydrate } from 'preact';
import App from '@/App';
import { initGA4 } from '@/modules/tracking/ga4';
import { reportWebVitalsToGA } from '@/modules/webVitals';

hydrate(<App store={__STORE__} />, document.getElementById('root') as Element);

// eslint-disable-next-line no-console
console.info(
    '%c🌀 Check https://github.com/paulogoncalvs/pg-web/ to view the code.',
    'font-size:16px;font-weight:bold;',
);

// PWA - Register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
    });
}

// Tracking
initGA4(); // Google Analytics 4
reportWebVitalsToGA(); // Web Vitals
