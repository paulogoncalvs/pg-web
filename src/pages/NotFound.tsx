import type { FunctionalComponent } from "preact";
import { Fade } from "@/components/Fade";
import { Link } from "@/components/Link";
import { useTranslate } from "@/modules/i18n";
import { useLanguage } from "@/modules/language";

const NotFoundPage: FunctionalComponent = () => {
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
          {t("not_found_page_title")}
        </Fade>
        <Fade delay={2} Element="h1" classes="text-xl lowercase sm:text-2xl pb-14">
          {t("not_found_page_subtitle")}
        </Fade>
      </div>
      <Fade delay={4} direction="up" classes="flex flex-col items-center pb-14">
        <Link useRouter class="interactive interactive-lg" href={`/${lang}/`}>
          {t("not_found_page_button_label")}
        </Link>
      </Fade>
    </div>
  );
};

export default NotFoundPage;
