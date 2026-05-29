import type { FunctionalComponent } from "preact";

import { useEffect, useState } from "preact/hooks";

import { getCookieConsent } from "@/modules/cookieConsent";

const GA_MEASUREMENT_ID = import.meta.env.VITE_TRACK_GA_MEASUREMENT_ID;

export const GA4Provider: FunctionalComponent = () => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) {
      return;
    }

    const loadGA = (): void => {
      if (!GA_MEASUREMENT_ID || shouldLoad) {
        return;
      }
      setShouldLoad(true);
    };

    const onConsentGranted = (): void => loadGA();

    if (getCookieConsent() === "granted") {
      loadGA();
    }

    window.addEventListener("cookie-consent-granted", onConsentGranted);

    let fired = false;

    const cleanup = (): void => {
      window.removeEventListener("scroll", fire);
      window.removeEventListener("pointerdown", fire);
      window.removeEventListener("keydown", fire);
      window.removeEventListener("cookie-consent-granted", onConsentGranted);
      clearTimeout(timer);
    };

    const fire = (): void => {
      if (!fired) {
        fired = true;
        cleanup();
        loadGA();
      }
    };

    const timer = setTimeout(fire, 5000);

    window.addEventListener("scroll", fire, { once: true, passive: true });
    window.addEventListener("pointerdown", fire, { once: true });
    window.addEventListener("keydown", fire, { once: true });

    return cleanup;
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!shouldLoad || !GA_MEASUREMENT_ID || typeof document === "undefined") {
      return;
    }

    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;

    const script2 = document.createElement("script");
    script2.textContent = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });`;

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    return () => {
      script1.remove();
      script2.remove();
    };
  }, [shouldLoad]);

  return null;
};
