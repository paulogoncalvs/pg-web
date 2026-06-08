import type { FunctionalComponent } from "preact";

import { useCallback, useContext, useEffect, useState } from "preact/hooks";

import { Banner } from "@/components/Banner";
import { getCookieConsent, setCookieConsent } from "@/modules/cookieConsent";
import { useTranslate } from "@/modules/i18n";
import { StoreContext } from "@/modules/store";
import { updateConsent } from "@/modules/tracking/ga4";

const GA_MEASUREMENT_ID = import.meta.env.VITE_TRACK_GA_MEASUREMENT_ID;

export const CookieConsentBar: FunctionalComponent = () => {
  const { t } = useTranslate();
  const [showConsent, setShowConsent] = useState(false);
  const { cookiesEnabled, dispatch } = useContext(StoreContext);

  useEffect(() => {
    setShowConsent(!getCookieConsent());
  }, []);

  useEffect(() => {
    setShowConsent(!getCookieConsent());
  }, [cookiesEnabled]);

  const handleAccept = useCallback(() => {
    setCookieConsent("granted");
    updateConsent("granted");
    dispatch({ type: "SET_COOKIES", payload: { cookiesEnabled: true } });
    window.dispatchEvent(new CustomEvent("cookie-consent-granted"));
    setShowConsent(false);
  }, [dispatch]);

  const handleReject = useCallback(() => {
    setCookieConsent("denied");
    updateConsent("denied");
    dispatch({ type: "SET_COOKIES", payload: { cookiesEnabled: false } });
    setShowConsent(false);
  }, [dispatch]);

  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <Banner isVisible={showConsent} variant="neutral" fixed={false}>
      <div class="flex flex-col items-center justify-between gap-2 text-xs sm:flex-row">
        <p class="text-center sm:text-left">{t("footer_cookie_consent")}</p>
        <div class="flex gap-2">
          <button
            type="button"
            onClick={handleReject}
            class="cursor-pointer rounded border border-zinc-300 px-4 py-1 transition-colors hover:bg-zinc-100 motion-reduce:transition-none dark:border-zinc-600 dark:hover:bg-zinc-800"
          >
            {t("footer_cookie_reject")}
          </button>
          <button
            type="button"
            onClick={handleAccept}
            class="cursor-pointer rounded bg-zinc-900 px-4 py-1 text-white transition-opacity hover:opacity-80 motion-reduce:transition-none dark:bg-white dark:text-zinc-900"
          >
            {t("footer_cookie_accept")}
          </button>
        </div>
      </div>
    </Banner>
  );
};
