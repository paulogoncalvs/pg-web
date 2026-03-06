import { isBrowser } from '@/utils/browser';

const COOKIE_CONSENT_KEY = 'cookie_consent';

export type CookieConsent = 'accepted' | 'rejected' | null;

export const getCookieConsent = (): CookieConsent => {
    if (!isBrowser()) return null;
    return localStorage.getItem(COOKIE_CONSENT_KEY) as CookieConsent;
};

export const setCookieConsent = (consent: 'accepted' | 'rejected'): void => {
    if (!isBrowser()) return;
    localStorage.setItem(COOKIE_CONSENT_KEY, consent);
};

export const hasCookieConsent = (): boolean => {
    const consent = getCookieConsent();
    return consent === 'accepted';
};
