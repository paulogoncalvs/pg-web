// @todo SW - WIP
// @ts-nocheck
import { initialize as initializeGoogleAnalytics } from 'workbox-google-analytics';
import { precacheAndRoute, matchPrecache } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';

declare let self: ServiceWorkerGlobalScope;

self.addEventListener('install', () => {
    void self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
    ({ request, url }) => {
        if (request.mode !== 'navigate') {
            return false;
        }

        const param = url.pathname.split('/')[1];

        return param === 'pt' || param === 'en' ? param : 'en';
    },
    async ({ params }) => {
        return (
            (await matchPrecache(`/${params as unknown as string}/offline/`)) ||
            (await matchPrecache(`/${defaultLocale}/offline/`)) ||
            Response.error()
        );
    },
);

if (process.env.NODE_ENV === 'production') {
    initializeGoogleAnalytics();
}
