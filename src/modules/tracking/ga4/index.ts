import type { CookieConsent } from "@/modules/cookieConsent";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_TRACK_GA_MEASUREMENT_ID;

export const hasGtag = (): boolean =>
  typeof window !== "undefined" && typeof window.gtag === "function";

/**
 * Manually track page views (SPA-safe)
 */
export const trackPageView = (data?: Record<string, unknown>): void => {
  if (!hasGtag() || !GA_MEASUREMENT_ID) {
    return;
  }

  window.gtag("event", "page_view", {
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
  if (!hasGtag()) {
    return;
  }

  window.gtag("event", name, params);
};

/**
 * Update user consent (call when user accepts/rejects cookies)
 */
export const updateConsent = (consent: CookieConsent): void => {
  if (!hasGtag()) {
    return;
  }

  const granted = consent === "granted";

  window.gtag("consent", "update", {
    ad_storage: granted ? "granted" : "denied",
    analytics_storage: granted ? "granted" : "denied",
  });

  // Fire pageview immediately after consent granted
  if (granted) {
    trackPageView();
  }
};
