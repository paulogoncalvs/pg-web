/* eslint-disable @typescript-eslint/no-explicit-any */
import { getEventData, EventTrackingData } from './event';
import { getPageViewData, PageViewTrackingData } from './pageView';

declare global {
    interface Window {
        ga: any;
    }
}

const hasGa = (): boolean => !!window.ga;

export const gaNewElem: any = {}; // eslint-disable-line @typescript-eslint/no-explicit-any

export const gaElems: any = {}; // eslint-disable-line @typescript-eslint/no-explicit-any

export const trackPageView = (data?: PageViewTrackingData): void => {
    hasGa() && window.ga('send', getPageViewData(data));
};

export const trackEvent = (data: EventTrackingData): void => {
    hasGa() && window.ga('send', getEventData(data));
};

export const initGA = (): void => {
    if (hasGa() || !process.env.TRACK_GA_ID) {
        return;
    }

    (function (i, s, o, g, r, a, m): void {
        // @ts-ignore
        i['GoogleAnalyticsObject'] = r;
        // @ts-ignore
        (i[r] =
            // @ts-ignore
            i[r] ||
            function (): void {
                // @ts-ignore
                (i[r].q = i[r].q || []).push(arguments); // eslint-disable-line prefer-rest-params
            }),
            // @ts-ignore
            (i[r].l = 1 * (new Date() as any)); // eslint-disable-line @typescript-eslint/no-explicit-any
        (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m);
    })(
        window,
        document,
        'script',
        `//www.google-analytics.com/analytics${process.env.NODE_ENV === 'development' ? '_debug' : ''}.js`,
        'ga',
        gaNewElem,
        gaElems,
    );

    if (process.env.NODE_ENV === 'development') {
        // @ts-ignore
        window.ga_debug = { trace: true };
    }

    window.ga('create', process.env.TRACK_GA_ID, 'auto');

    trackPageView();
};
