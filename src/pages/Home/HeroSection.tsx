import type { FunctionalComponent } from "preact";

import mailIcon from "@/assets/icons/mail.svg";
import meImg from "@/assets/img/paulo-goncalves-400.jpeg";
import meImgSmall from "@/assets/img/paulo-goncalves-240.jpeg";
import { Icon } from "@/components/Icon";
import { Image } from "@/components/Image";
import { Link } from "@/components/Link";
import { Markup } from "@/components/Markup";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useTranslate } from "@/modules/i18n";
import { useLanguage } from "@/modules/language";
import { trackEvent } from "@/modules/tracking/ga4";

export const HeroSection: FunctionalComponent = () => {
  const { t } = useTranslate();
  const { lang } = useLanguage();

  const handleContactClick = () =>
    trackEvent("link_click", {
      link_location: "Home",
      link_name: "Contact Me",
    });

  return (
    <section class="flex flex-col items-center px-6 py-20">
      <ScrollReveal
        delay={1}
        Element="h1"
        classes="text-3xl sm:text-5xl font-bold tracking-tight text-center sm:my-2"
      >
        {t("home_page_title")}
      </ScrollReveal>
      <ScrollReveal delay={2} Element="h1" classes="text-xl sm:text-2xl lowercase text-center">
        {t("home_page_subtitle")}
      </ScrollReveal>
      <div class="flex flex-col items-center space-y-8 pt-14 sm:flex-row sm:space-y-0">
        <ScrollReveal delay={3} direction="down" classes="shrink-0">
          <Image
            classes="rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] bg-white/30 border border-white/20"
            src={meImgSmall}
            srcset={`${meImgSmall} 1x, ${meImg} 2x`}
            sizes="(max-width: 640px) 200px, 200px"
            width="200"
            height="200"
            alt={t("home_page_portrait_alt")}
            fetchpriority="high"
            lazy={false}
          />
        </ScrollReveal>
        <ScrollReveal
          delay={4}
          direction="down"
          classes="max-w-xs sm:max-w-md sm:pl-14 text-sm sm:text-base"
        >
          <p>{t("home_page_description_1")}</p>
          <Markup data={t("home_page_description_2")} Element="p" />
        </ScrollReveal>
      </div>
      <ScrollReveal delay={6} direction="up">
        <Link
          useRouter
          href={`/${lang}/contact/`}
          class="interactive interactive-icon sm:interactive-lg interactive-md mt-14"
          onClick={handleContactClick}
        >
          <Icon src={mailIcon} ariaHidden />
          {t("home_page_contact_button_label")}
        </Link>
      </ScrollReveal>
    </section>
  );
};
