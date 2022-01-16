import { getEventData, EventTrackingData } from './event';
import { getPageViewData, PageViewTrackingData } from './pageView';

const hasGa = (): boolean => !!window.ga;

export const gaNewElem: any = {}; // eslint-disable-line @typescript-eslint/no-explicit-any

export const gaElems: any = {}; // eslint-disable-line @typescript-eslint/no-explicit-any

export const trackPageView = (data?: PageViewTrackingData): void => {
    hasGa() && ga('send', getPageViewData(data));
};

export const trackEvent = (data: EventTrackingData): void => {
    hasGa() && ga('send', getEventData(data));
};

export const initGA = (): void => {
    if (hasGa() || !process.env.TRACK_GA_ID) {
        return;
    }

    (function (i, s, o, g, r, a, m): void {
        i['GoogleAnalyticsObject'] = r;
        (i[r] =
            i[r] ||
            function (): void {
                (i[r].q = i[r].q || []).push(arguments); // eslint-disable-line prefer-rest-params
            }),
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

    ga('create', process.env.TRACK_GA_ID, 'auto');

    trackPageView();
};
