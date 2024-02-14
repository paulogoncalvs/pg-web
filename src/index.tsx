// Must be the first import
if (process.env.NODE_ENV === 'development') {
    // Must use require here as import statements are only allowed to exist at the top of a file.
    require('preact/debug');
}

import '@/styles/index.scss';
import { h, hydrate } from 'preact';
import App from '@/App';
import { initGA4 } from '@/modules/tracking/ga4';
import { reportWebVitalsToGA } from '@/modules/webVitals';

hydrate(<App store={__STORE__} />, document.getElementById('root') as Element);

console.info(
    '%c🌀 Check https://github.com/paulogoncalvs/pg-web/ to view the code.',
    'font-size:16px;font-weight:bold;',
); // eslint-disable-line no-console

// PWA - Register service worker
if (process.env.NODE_ENV !== 'development' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
    });
}

// Tracking
initGA4(); // Google Analytics 4
reportWebVitalsToGA(); // Web Vitals
