// Must be the first import
if (process.env.NODE_ENV === 'development') {
    // Must use require here as import statements are only allowed to exist at the top of a file.
    require('preact/debug');
}

import { h, hydrate } from 'preact';
import App from '@/App';
import { initGA4 } from '@/modules/tracking/ga4';
import { reportWebVitals, sendToGoogleAnalytics } from '@/modules/webVitals';
import './styles/index.scss';

hydrate(<App store={__STORE__} />, document.getElementById('root') as Element);

console.log('Hi! Check https://github.com/paulogoncalvs/pg-web/ to view the code.'); // eslint-disable-line no-console

// PWA - Register service worker
if (process.env.NODE_ENV !== 'development' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
    });
}

// Tracking - Google analytics 4
initGA4();

// Web Vitals
reportWebVitals(sendToGoogleAnalytics);
