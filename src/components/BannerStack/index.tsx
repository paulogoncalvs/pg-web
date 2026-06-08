import type { FunctionalComponent } from "preact";

import { useContext, useEffect, useRef } from "preact/hooks";

import { Banner } from "@/components/Banner";
import { CookieConsentBar } from "@/components/CookieConsentBar";
import { useTranslate } from "@/modules/i18n";
import { StoreContext } from "@/modules/store";

const OfflineBanner: FunctionalComponent = () => {
  const { isOffline } = useContext(StoreContext);
  const { t } = useTranslate();

  return (
    <Banner isVisible={Boolean(isOffline)} variant="warning" fixed={false}>
      {t("banner_offline_message")}
    </Banner>
  );
};

export const BannerStack: FunctionalComponent = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        document.documentElement.style.setProperty(
          "--banner-stack-height",
          `${entry.contentRect.height}px`,
        );
      }
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} class="fixed right-0 bottom-0 left-0 z-50 flex flex-col">
      <OfflineBanner />
      <CookieConsentBar />
    </div>
  );
};
