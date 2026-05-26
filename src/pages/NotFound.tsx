import type { FunctionalComponent } from "preact";

import { Link } from "@/components/Link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useTranslate } from "@/modules/i18n";

const NotFoundPage: FunctionalComponent = () => {
  const { t } = useTranslate();

  return (
    <>
      <h1 class="px-6 pt-16">
        <ScrollReveal delay={1} as="span">
          {t("not_found_page_title")}
        </ScrollReveal>
        <ScrollReveal delay={2} as="span">
          {t("not_found_page_subtitle")}
        </ScrollReveal>
      </h1>
      <ScrollReveal delay={4} direction="up" class="px-6 pb-16">
        <Link useRouter class="interactive interactive-lg" href="/">
          {t("not_found_page_button_label")}
        </Link>
      </ScrollReveal>
    </>
  );
};

export default NotFoundPage;
