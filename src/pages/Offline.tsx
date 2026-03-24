import type { FunctionalComponent } from "preact";
import { Fade } from "@/components/Fade";
import { Link } from "@/components/Link";
import { Markup } from "@/components/Markup";
import { useTranslate } from "@/modules/i18n";
import { useLanguage } from "@/modules/language";

const OfflinePage: FunctionalComponent = () => {
  const { t } = useTranslate();
  const { lang } = useLanguage();

  return (
    <div class="flex flex-col items-center p-6 pt-20 pb-20 text-center">
      <div class="flex flex-col items-center p-6">
        <Fade
          delay={1}
          Element="h1"
          classes="text-3xl tracking-tight font-bold sm:my-2 sm:text-5xl"
        >
          {t("offline_page_title")}
        </Fade>
        <Fade delay={2} Element="h1" classes="text-xl lowercase sm:text-2xl pb-14">
          {t("offline_page_subtitle")}
        </Fade>
      </div>
      <Fade delay={4}>
        <Markup data={t("offline_page_description")} Element="p" classes="text-l pb-20" />
      </Fade>
      <Fade delay={6} direction="up" classes="flex flex-col items-center pb-14">
        <Link useRouter class="interactive interactive-lg" href={`/${lang}/`}>
          {t("offline_page_button_label")}
        </Link>
      </Fade>
    </div>
  );
};

export default OfflinePage;
