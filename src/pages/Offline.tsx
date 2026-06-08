import type { FunctionalComponent } from "preact";

import { Link } from "@/components/Link";
import { Markup } from "@/components/Markup";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useTranslate } from "@/modules/i18n";

const OfflinePage: FunctionalComponent = () => {
  const { t } = useTranslate();

  return (
    <>
      <h1 class="pt-16">
        <ScrollReveal delay={1} as="span">
          {t("offline_page_title")}
        </ScrollReveal>
        <ScrollReveal delay={2} as="span">
          {t("offline_page_subtitle")}
        </ScrollReveal>
      </h1>
      <ScrollReveal delay={4}>
        <Markup html={t("offline_page_description")} as="p" />
      </ScrollReveal>
      <ScrollReveal delay={6} direction="up" class="pb-16">
        <Link useRouter class="interactive interactive-lg" href="/">
          {t("offline_page_button_label")}
        </Link>
      </ScrollReveal>
    </>
  );
};

export default OfflinePage;
