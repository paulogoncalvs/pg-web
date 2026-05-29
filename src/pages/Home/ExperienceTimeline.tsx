import type { FunctionalComponent } from "preact";

import { useMemo } from "preact/hooks";

import { Link } from "@/components/Link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { socialLinks } from "@/config/global/socialLinks";
import { useTranslate } from "@/modules/i18n";
import { LANGUAGE_DEFAULT, useLanguage } from "@/modules/language";
import { trackEvent } from "@/modules/tracking/ga4";

interface Experience {
  titleKey: string;
  company?: string;
  start: string;
  end?: string;
}

const linkedInLink = socialLinks.find((l) => l.platform === "linkedin");

interface CompanyGroup {
  name: string;
  duration: string;
  experiences: Experience[];
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

const calculateCompanyDuration = (
  experiences: Experience[],
  t: (key: string) => string,
): string => {
  if (experiences.length === 0) {
    return "";
  }

  const sorted = [...experiences].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
  );
  const first = sorted[0];
  const last = sorted[sorted.length - 1];

  return calculateDuration(first.start, last.end, t);
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

const myExperience: Experience[] = [
  {
    company: "Jumia Porto Tech Center",
    start: "2022-10-02",
    titleKey: "home_page_experience_jumia_principal_title",
  },
  {
    company: "Jumia Porto Tech Center",
    end: "2022-10-01",
    start: "2021-09-01",
    titleKey: "home_page_experience_jumia_manager_title",
  },
  {
    company: "Jumia Porto Tech Center",
    end: "2021-08-31",
    start: "2020-06-30",
    titleKey: "home_page_experience_jumia_lead_title",
  },
  {
    company: "Jumia Porto Tech Center",
    end: "2020-06-30",
    start: "2016-04-30",
    titleKey: "home_page_experience_jumia_senior_web_title",
  },
  {
    company: "Jumia Porto Tech Center",
    end: "2016-04-30",
    start: "2014-11-01",
    titleKey: "home_page_experience_jumia_senior_dev_title",
  },
  {
    company: "Rocket Internet GmbH",
    end: "2014-11-30",
    start: "2012-06-01",
    titleKey: "home_page_experience_rocket_title",
  },
  {
    company: "Myone - Comunicação Multimédia",
    end: "2012-05-30",
    start: "2008-10-01",
    titleKey: "home_page_experience_myone_title",
  },
  {
    company: "Medula - Design de Comunicação",
    end: "2008-09-30",
    start: "2007-09-01",
    titleKey: "home_page_experience_medula_title",
  },
  {
    end: "2007-08-30",
    start: "2004-01-01",
    titleKey: "home_page_experience_freelancer_title",
  },
];

const groupByCompany = (exps: Experience[], t: (key: string) => string): CompanyGroup[] => {
  const groups: CompanyGroup[] = [];
  let currentGroup: CompanyGroup | null = null;

  for (const exp of exps) {
    const company = exp.company ?? "Freelance";
    if (!currentGroup || currentGroup.name !== company) {
      currentGroup = { name: company, duration: "", experiences: [] };
      groups.push(currentGroup);
    }
    currentGroup.experiences.push(exp);
  }

  for (const group of groups) {
    group.duration = calculateCompanyDuration(group.experiences, t);
  }

  return groups;
};

const ExperienceItem: FunctionalComponent<{
  titleKey: string;
  start: string;
  end?: string;
}> = ({ titleKey, start, end }) => {
  const { t } = useTranslate();
  const { lang } = useLanguage();

  const duration = calculateDuration(start, end, t);
  const dateRange = formatDateRange(start, end, duration, lang, t);

  const isCurrent = !end;

  return (
    <div class="relative pl-6">
      <span
        class={`absolute top-1 -left-[0.5625rem] h-4 w-4 rounded-full border-[3px] border-stone-400 ${
          isCurrent
            ? "bg-black dark:border-zinc-500 dark:bg-white"
            : "bg-stone-100 dark:border-white/10 dark:bg-zinc-700"
        }`}
      />
      <h4 class="font-semibold text-zinc-900 dark:text-white">{t(titleKey)}</h4>
      <p class="text-xs text-stone-600 dark:text-zinc-400">{dateRange}</p>
    </div>
  );
};

const CompanySection: FunctionalComponent<CompanyGroup> = ({ name, duration, experiences }) => {
  return (
    <div class="my-11 last:mb-0">
      <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-200">{name}</h3>
      <p class="mb-3 text-sm text-stone-600 dark:text-zinc-400">{duration}</p>
      <div class="relative ml-3">
        <span class="absolute top-3 bottom-0 -left-0.5 w-2 -translate-x-1/3 rounded bg-stone-300/60 dark:bg-white/5" />
        <div class="space-y-4">
          {experiences.map((exp, index) => (
            <ScrollReveal key={exp.titleKey} delay={0.15 * index}>
              <ExperienceItem {...exp} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ExperienceTimeline: FunctionalComponent = () => {
  const { t } = useTranslate();
  const companyGroups = useMemo(() => groupByCompany(myExperience, t), [t]);

  return (
    <section class="flex flex-col items-center border-t border-white/80 bg-white/5 px-6 py-16 text-center dark:border-white/15 dark:bg-zinc-900/15">
      <div class="w-full max-w-sm text-left sm:max-w-xl">
        <ScrollReveal delay={2} as="h2" class="mb-12">
          {t("home_page_professional_experience")}
        </ScrollReveal>

        <ScrollReveal delay={2} as="div">
          {companyGroups.map((group, index) => (
            <ScrollReveal key={group.name} delay={0.2 * index}>
              <CompanySection {...group} />
            </ScrollReveal>
          ))}
        </ScrollReveal>

        <ScrollReveal as="p" class="pt-12 text-sm italic" delay={1}>
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
      </div>
    </section>
  );
};
