import type { FunctionalComponent } from "preact";

import { Link } from "@/components/Link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { socialLinks } from "@/config/global/socialLinks";
import { useTranslate } from "@/modules/i18n";
import { trackEvent } from "@/modules/tracking/ga4";

const linkedInLink = socialLinks.find((l) => l.platform === "linkedin");

export const MoreInfo: FunctionalComponent = () => {
  const { t } = useTranslate();

  return (
    <section class="m-0 -mx-6 flex flex-col items-center border-t border-white/80 bg-white/5 px-6 py-16 text-center dark:border-white/15 dark:bg-zinc-900/15">
      <ScrollReveal as="p" class="text-sm" delay={1}>
        ℹ️{" "}
        {t(
          "home_page_description_2",
          {
            link: (
              <Link
                href={linkedInLink?.url}
                class="underline"
                newWindow
                onClick={() =>
                  trackEvent("link_click", {
                    link_location: "Home",
                    link_name: "LinkedIn",
                  })
                }
              >
                {t("home_page_description_2_link_text")}
              </Link>
            ),
          },
          false,
        )}
      </ScrollReveal>
    </section>
  );
};
