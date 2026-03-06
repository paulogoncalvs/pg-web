import { CookieConsent } from '@/modules/cookieConsent';

declare global {
    interface Window {
        dataLayer: unknown[];
        gtag: (...args: unknown[]) => void;
    }
}

const GA_MEASUREMENT_ID = process.env.TRACK_GA_MEASUREMENT_ID;

export const hasGtag = (): boolean => typeof window !== 'undefined' && typeof window.gtag === 'function';

/**
 * Manually track page views (SPA-safe)
 */
export const trackPageView = (data?: Record<string, unknown>): void => {
    if (!hasGtag() || !GA_MEASUREMENT_ID) return;

    window.gtag('event', 'page_view', {
        page_location: window.location.href,
        page_path: window.location.pathname,
        send_to: GA_MEASUREMENT_ID,
        ...data,
    });
};

/**
 * Track custom events
 */
export const trackEvent = (name: string, params?: Record<string, unknown>): void => {
    if (!hasGtag()) return;

    window.gtag('event', name, params);
};

/**
 * Update user consent (call when user accepts/rejects cookies)
 */
export const updateConsent = (consent: CookieConsent): void => {
    if (!hasGtag()) return;

    const granted = consent === 'accepted';

    window.gtag('consent', 'update', {
        analytics_storage: granted ? 'granted' : 'denied',
    });

    // Fire pageview immediately after consent granted
    if (granted) {
        trackPageView();
    }
};

/**
 * Initialize GA4 safely with Consent Mode
 */
export const initGA4 = (): void => {
    if (typeof window === 'undefined' || hasGtag() || !GA_MEASUREMENT_ID) {
        return;
    }

    // Setup dataLayer + gtag BEFORE loading script
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(): void {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
    };

    // Set default consent BEFORE GA loads
    window.gtag('consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        wait_for_update: 500,
    });

    // Inject GA script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize GA
    window.gtag('js', new Date());

    // Configure WITHOUT automatic pageview (SPA safe)
    window.gtag('config', GA_MEASUREMENT_ID, {
        send_page_view: false,
        ...(process.env.NODE_ENV === 'development' && {
            debug_mode: true,
        }),
    });
};
