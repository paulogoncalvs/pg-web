import type { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { type CookieConsent, getCookieConsent, setCookieConsent } from "@/modules/cookieConsent";
import { useTranslate } from "@/modules/i18n";
import { updateConsent } from "@/modules/tracking/ga4";

const GA_MEASUREMENT_ID = import.meta.env.VITE_TRACK_GA_MEASUREMENT_ID;

export const CookieConsentBar: FunctionalComponent = () => {
  const { t } = useTranslate();
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) {
      return;
    }
    setShowConsent(!getCookieConsent());
  }, []);

  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  const handleAccept = () => {
    const consent: CookieConsent = "granted";
    setCookieConsent(consent);
    updateConsent(consent);
    window.dispatchEvent(new CustomEvent("cookie-consent-granted"));
    setShowConsent(false);
  };

  const handleReject = () => {
    const consent: CookieConsent = "denied";
    setCookieConsent(consent);
    updateConsent(consent);
    setShowConsent(false);
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div class="fixed right-0 bottom-0 left-0 z-50 border-white/80 border-t bg-white/80 p-2 shadow-2xs backdrop-blur-md dark:border-white/15 dark:bg-zinc-900/60">
      <div class="flex flex-col items-center justify-between gap-2 text-xs sm:flex-row">
        <p class="text-center sm:text-left">{t("footer_cookie_consent")}</p>
        <div class="flex gap-2">
          <button
            type="button"
            onClick={handleReject}
            class="cursor-pointer rounded border border-zinc-300 px-4 py-1 transition-colors hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-800"
          >
            {t("footer_cookie_reject")}
          </button>
          <button
            type="button"
            onClick={handleAccept}
            class="cursor-pointer rounded bg-zinc-900 px-4 py-1 text-white transition-opacity hover:opacity-80 dark:bg-white dark:text-zinc-900"
          >
            {t("footer_cookie_accept")}
          </button>
        </div>
      </div>
    </div>
  );
};
