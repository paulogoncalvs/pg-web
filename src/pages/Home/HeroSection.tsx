import type { FunctionalComponent } from "preact";

import meImgSmall from "@/assets/img/paulo-goncalves-240.jpeg";
import meImg from "@/assets/img/paulo-goncalves-400.jpeg";
import { Image } from "@/components/Image";
import { Markup } from "@/components/Markup";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useTranslate } from "@/modules/i18n";

export const HeroSection: FunctionalComponent = () => {
  const { t } = useTranslate();

  return (
    <section class="flex flex-col items-center space-y-14 pt-16">
      <h1>
        <ScrollReveal delay={1} as="span">
          {t("home_page_title")}
        </ScrollReveal>
        <ScrollReveal delay={2} as="span">
          {t("home_page_subtitle")}
        </ScrollReveal>
      </h1>
      <div class="flex flex-col items-center space-y-14 sm:flex-row sm:space-y-0">
        <ScrollReveal delay={3} direction="down" class="shrink-0">
          <Image
            class="rounded-full border border-white/20 bg-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)]"
            src={meImgSmall}
            srcset={`${meImgSmall} 1x, ${meImg} 2x`}
            sizes="(max-width: 640px) 240px, 240px"
            width="240"
            height="240"
            alt={t("home_page_portrait_alt")}
            fetchpriority="high"
            lazy={false}
          />
        </ScrollReveal>
        <ScrollReveal
          delay={4}
          class="max-w-sm text-left text-sm sm:max-w-lg sm:pl-14 sm:text-base"
        >
          <Markup html={t("home_page_description_1")} as="p" />
        </ScrollReveal>
      </div>
    </section>
  );
};
