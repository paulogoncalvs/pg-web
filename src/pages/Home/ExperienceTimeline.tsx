import type { FunctionalComponent } from "preact";

import { Fade } from "@/components/Fade";
import { Link } from "@/components/Link";
import { useTranslate } from "@/modules/i18n";
import { LANGUAGE_DEFAULT, useLanguage } from "@/modules/language";
import { trackEvent } from "@/modules/tracking/ga4";

interface Experience {
  titleKey: string;
  company: string;
  start: string;
  end?: string;
}

const calculateDuration = (
  startDate: string,
  endDate: string | undefined,
  t: (key: string) => string,
): string => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0) {
    return `${months} ${months === 1 ? t("home_page_duration_month") : t("home_page_duration_months")}`;
  }

  if (months === 0) {
    return `${years} ${years === 1 ? t("home_page_duration_year") : t("home_page_duration_years")}`;
  }

  return `${years} ${years === 1 ? t("home_page_duration_year") : t("home_page_duration_years")} ${months} ${
    months === 1 ? t("home_page_duration_month") : t("home_page_duration_months")
  }`;
};

const formatDateRange = (
  start: string,
  end: string | undefined,
  duration: string,
  language: string = LANGUAGE_DEFAULT,
  t: (key: string) => string,
) => {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : null;

  const format = (date: Date) =>
    date.toLocaleDateString(language, { month: "short", year: "numeric" });

  const startLabel = format(startDate);
  const endLabel = endDate ? format(endDate) : t("home_page_experience_present");

  return `${startLabel} – ${endLabel} · ${duration}`;
};

const experiences: Experience[] = [
  {
    company: "Jumia Porto Tech Center",
    start: "2022-10-01",
    titleKey: "home_page_experience_jumia_title",
  },
  {
    company: "Jumia Porto Tech Center",
    end: "2022-09-30",
    start: "2021-04-01",
    titleKey: "home_page_experience_jumia_manager_title",
  },
  {
    company: "Jumia Porto Tech Center",
    end: "2021-03-31",
    start: "2019-10-01",
    titleKey: "home_page_experience_jumia_lead_title",
  },
  {
    company: "Jumia Porto Tech Center",
    end: "2019-09-30",
    start: "2018-04-01",
    titleKey: "home_page_experience_jumia_senior_title",
  },
  {
    company: "Rocket Internet GmbH",
    end: "2018-03-31",
    start: "2017-01-01",
    titleKey: "home_page_experience_jumia_rocket_title",
  },
  {
    company: "Rocket Internet GmbH",
    end: "2016-12-31",
    start: "2016-03-01",
    titleKey: "home_page_experience_rocket_title",
  },
  {
    company: "Myone - Comunicação Multimédia",
    end: "2016-02-28",
    start: "2015-01-01",
    titleKey: "home_page_experience_myone_title",
  },
  {
    company: "Medula - Design de Comunicação",
    end: "2014-12-31",
    start: "2014-03-01",
    titleKey: "home_page_experience_medula_title",
  },
];

const ExperienceItem: FunctionalComponent<Experience> = ({ titleKey, company, start, end }) => {
  const { t } = useTranslate();
  const { lang } = useLanguage();

  const duration = calculateDuration(start, end, t);
  const dateRange = formatDateRange(start, end, duration, lang, t);

  const isCurrent = !end;

  return (
    <div class="relative pl-8">
      <span
        class={`absolute top-1 -left-2.25 h-4 w-4 rounded-full border-2 ${
          isCurrent
            ? "border-black/20 bg-black dark:border-white/20 dark:bg-white"
            : "border-stone-300 bg-stone-100 dark:border-white/10 dark:bg-zinc-700"
        }`}
      />

      <h3 class="font-semibold text-zinc-900 dark:text-white">{t(titleKey)}</h3>

      <p class="text-sm text-stone-700 dark:text-zinc-300">{company}</p>

      <p class="mt-1 text-stone-500 text-xs dark:text-zinc-400">{dateRange}</p>
    </div>
  );
};

export const ExperienceTimeline: FunctionalComponent = () => {
  const { t } = useTranslate();

  return (
    <section class="flex flex-col items-center border-white/80 border-t bg-white/20 px-6 py-14 pb-20 text-center shadow-black/5 shadow-xs dark:border-white/15 dark:bg-zinc-900/15">
      <div class="w-full max-w-xs text-left sm:max-w-xl">
        <Fade delay={9} Element="h2" classes="text-xl sm:text-2xl mb-12 font-bold">
          {t("home_page_professional_experience")}
        </Fade>

        <Fade
          delay={9}
          Element="div"
          classes="relative border-l-2 border-stone-300 dark:border-white/10 ml-3 space-y-8"
        >
          {experiences.map((exp, index) => (
            <Fade key={exp.titleKey} delay={10 + 0.7 * index} direction="up">
              <ExperienceItem key={exp.titleKey} {...exp} />
            </Fade>
          ))}
        </Fade>

        <Fade delay={11} Element="p" classes="pt-12 text-sm">
          {t(
            "home_page_description_3",
            {
              link: (
                <Link
                  href="https://pt.linkedin.com/in/paulogoncalvs"
                  class="underline"
                  newWindow
                  onClick={() =>
                    trackEvent("link_click", {
                      link_location: "Home",
                      link_name: "LinkedIn",
                    })
                  }
                >
                  {t("home_page_description_3_link_text")}
                </Link>
              ),
            },
            false,
          )}
        </Fade>
      </div>
    </section>
  );
};
