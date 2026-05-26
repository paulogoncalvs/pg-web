import { isClient } from "@/utils/client";

const COOKIE_CONSENT_KEY = "cookie-consent";

export type CookieConsent = "granted" | "denied" | null;

export const getCookieConsent = (): CookieConsent => {
  if (!isClient()) {
    return null;
  }
  return localStorage.getItem(COOKIE_CONSENT_KEY) as CookieConsent;
};

export const setCookieConsent = (consent: "granted" | "denied"): void => {
  if (!isClient()) {
    return;
  }
  localStorage.setItem(COOKIE_CONSENT_KEY, consent);
};

export const hasCookieConsent = (): boolean => {
  const consent = getCookieConsent();
  return consent === "granted";
};
