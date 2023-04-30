/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
    interface Window {
        gtag: any;
        dataLayer: any;
    }
}

export const hasGtag = (): boolean => !!window.gtag;

export const trackPageView = (data?: any): void => {
    hasGtag() &&
        window.gtag('event', 'page_view', {
            page_location: window.location.href,
            send_to: process.env.TRACK_GA_MEASUREMENT_ID,
            ...data,
        });
};

export const trackEvent = (data: any, name: string): void => {
    hasGtag() && window.gtag('event', name, data);
};

export const initGA4 = (): void => {
    if (hasGtag() || !process.env.TRACK_GA_MEASUREMENT_ID) {
        return;
    }

    // Global Site Tag (gtag.js) - Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.TRACK_GA_MEASUREMENT_ID}`;

    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(): void {
        window.dataLayer.push(arguments); // eslint-disable-line prefer-rest-params
    };

    window.gtag('js', new Date());

    window.gtag(
        'config',
        process.env.TRACK_GA_MEASUREMENT_ID,
        process.env.NODE_ENV === 'development' ? { debug_mode: true } : {},
    );
};
