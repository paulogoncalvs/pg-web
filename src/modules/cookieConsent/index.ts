const COOKIE_CONSENT_KEY = "cookie-consent";

export type CookieConsent = "granted" | "denied" | null;

export const getCookieConsent = (): CookieConsent => {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem(COOKIE_CONSENT_KEY) as CookieConsent;
};

export const setCookieConsent = (consent: "granted" | "denied"): void => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(COOKIE_CONSENT_KEY, consent);
};
