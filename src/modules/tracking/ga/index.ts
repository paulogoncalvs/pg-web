import { getEventData, EventTrackingData } from './event';
import { getPageViewData, PageViewTrackingData } from './pageView';

declare global {
    interface Window {
        ga: GA;
        ga_debug?: { trace?: boolean };
    }
}

interface GA {
    (command: string, ...args: unknown[]): void;
    q: unknown[][];
    l: number;
}

const hasGa = (): boolean => !!window.ga;

export const gaNewElem: Record<string, unknown> = {};

export const gaElems: Record<string, unknown> = {};

export const trackPageView = (data?: PageViewTrackingData): void => {
    if (hasGa()) {
        window.ga('send', getPageViewData(data));
    }
};

export const trackEvent = (data: EventTrackingData): void => {
    if (hasGa()) {
        window.ga('send', getEventData(data));
    }
};

export const initGA = (): void => {
    if (hasGa() || !process.env.TRACK_GA_ID) {
        return;
    }

    const win = window as typeof window & Record<string, unknown>;
    win['GoogleAnalyticsObject'] = 'ga';
    win['ga'] =
        win['ga'] ||
        function (...args: unknown[]): void {
            (win['ga'].q = win['ga'].q || []).push(args);
        };
    (win['ga'] as { l?: number }).l = 1 * Number(new Date());
    const a = document.createElement('script');
    const m = document.getElementsByTagName('script')[0];
    if (m && m.parentNode) {
        a.async = true;
        a.src = `//www.google-analytics.com/analytics${process.env.NODE_ENV === 'development' ? '_debug' : ''}.js`;
        m.parentNode.insertBefore(a, m);
    }

    if (process.env.NODE_ENV === 'development') {
        window.ga_debug = { trace: true };
    }

    window.ga('create', process.env.TRACK_GA_ID, 'auto');

    trackPageView();
};
