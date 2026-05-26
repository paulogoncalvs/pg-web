import type { FunctionalComponent } from "preact";

import { useEffect, useState } from "preact/hooks";

import scrollTopIcon from "@/assets/icons/scroll_top.svg";
import { Icon } from "@/components/Icon";
import { useTranslate } from "@/modules/i18n";
import { classNames } from "@/utils/classNames";

const SCROLL_THRESHOLD = 300;

export const ScrollToTop: FunctionalComponent = () => {
  const { t } = useTranslate();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateVisibility = () => {
      frame = 0;
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    const onScroll = () => {
      if (frame) {
        return;
      }
      frame = requestAnimationFrame(updateVisibility);
    };

    updateVisibility();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);

      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  const scrollToTop = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "instant" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t("scroll_to_top")}
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      class={classNames("interactive interactive-icon fixed right-6 bottom-6 z-40 p-2", {
        "pointer-events-auto opacity-100": isVisible,
        "pointer-events-none opacity-0": !isVisible,
      })}
    >
      <Icon src={scrollTopIcon} />
    </button>
  );
};
