import type { FunctionalComponent } from "preact";

import { useMemo, useState } from "preact/hooks";

import { Button } from "@/components/Button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Switch } from "@/components/Switch";
import { Tooltip } from "@/components/Tooltip";
import { useTranslate } from "@/modules/i18n";
import { LANGUAGE_DEFAULT, useLanguage } from "@/modules/language";
import { classNames } from "@/utils/classNames";

interface Experience {
  titleKey: string;
  company?: string;
  start: string;
  end?: string;
  location?: string;
  description?: string;
}

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
    location: "Porto, Portugal",
    description:
      "Expertise in delivering scalable, high-performance applications across SPA, SSR, and CSR architectures.\n\nSpecialized in semantic HTML5, accessibility (A11y), SEO, and styling systems with SCSS, CSS-in-JS, Utility CSS, Atomic BEM, TailwindCSS, shadcn-ui, and Radix UI.\n\nExtensive experience in JavaScript (ES6+) and TypeScript, with deep knowledge of React 19, Next.js 15, and Preact for lightweight, high-performance UI development.\n\nSkilled in state and data management with Zustand, Unistore, TanStack (React Query, Router, Table), nuqs, React Hook Form, Zod, Dice Table, cmdk, and kbar.\n\nDesigned modular architectures with Module Federation, Turborepo, Turbo, Vite, Vitest, Vite-plugin-federation, Rollup, and Webpack.\n\nDelivered backend integration with Express.js, PostgreSQL, and Prisma ORM.\n\nEnsured reliability and maintainability with testing and QA: Jest, Testing Library, Puppeteer, Playwright, Vitest, Lighthouse, Axe, and Autocannon.\n\nMaintained strict code quality standards with ESLint, StyleLint, Prettier, Husky, Lint-Staged, Knip, Renovate, Dependabot, and CSpell.\n\nImplemented observability, monitoring, and logging with Sentry, Winston, Prom-client, New Relic, Grafana, and OpenSearch.\n\nAutomated CI/CD pipelines with GitHub Actions, Jenkins, Rundeck, Docker, pnpm workspaces, npm, and Yarn.\n\nValidated compatibility across browsers and devices using BrowserStack.\n\nIntegrated analytics and ad-tech ecosystems including GA4, GTM, Clarity, AdManager, MoEngage, Mabaya, Mirakl Ads, Facebook Conversions API, Google Ads, Verbolia, ThreatMetrix, Sprinklr, Modiface, Leaflet, and qeen.ai.\n\nEnhanced user experience with Recharts, Storybook, and SVG sprites, while streamlining workflows with VSCode, Windsurf, JetBrains WebStorm/PHPStorm, Sublime, Linux (Ubuntu), and AI-assisted coding (Copilot, Gemini, Cascade, Claude).\n\nProven ability to deliver modern, modular, and performant platforms with a focus on accessibility, resilience, and scalability.",
  },
  {
    company: "Jumia Porto Tech Center",
    end: "2022-10-01",
    start: "2021-09-01",
    titleKey: "home_page_experience_jumia_manager_title",
    location: "Porto, Portugal",
    description:
      "Led engineering teams across Jumia Mall — managed a full-stack team (1 FE + 2 BE + 2 Android + 1 iOS + 2 QAA + 1 PO) and a front-end team (4 FE + 1 QAE + 1 PO).\n\nDrove technical execution, code quality, and delivery timelines.",
  },
  {
    company: "Jumia Porto Tech Center",
    end: "2021-08-31",
    start: "2020-06-30",
    titleKey: "home_page_experience_jumia_lead_title",
    location: "Portugal",
    description:
      "Lead Front-End Engineer for Jumia Mall.\n\nArchitected front-end solutions, established best practices, and mentored junior engineers while delivering e-commerce features at scale.",
  },
  {
    company: "Jumia Porto Tech Center",
    end: "2020-06-30",
    start: "2016-04-30",
    titleKey: "home_page_experience_jumia_senior_web_title",
    location: "Porto, Portugal",
    description:
      "Front-end and back-end development of e-commerce solutions for desktop and mobile (including Opera Mini).\n\nBuilt micro-services clients, Jumia Blog, and Jumia Group website.\n\nWorked with JavaScript, ECMAScript 5/6, AngularJS (1/2/4), React, Redux, Preact, SSR, Webpack, PWA, Service Workers, AMP, SASS, BEM, Node, Gulp, PHP, MySQL, and Docker.",
  },
  {
    company: "Jumia Porto Tech Center",
    end: "2016-04-30",
    start: "2014-11-01",
    titleKey: "home_page_experience_jumia_senior_dev_title",
    location: "Porto, Portugal",
    description:
      "E-commerce solutions - front-end development for desktop and mobile foundation.\n\nBuilt with Node, Gulp, HTML5, SASS, BEM, JavaScript, jQuery, Ext JS, PHP, MySQL, and Solr.",
  },
  {
    company: "Rocket Internet GmbH",
    end: "2014-11-30",
    start: "2012-06-01",
    titleKey: "home_page_experience_rocket_title",
    description:
      "E-commerce solutions - front-end and back-end development.\n\nWorked with PHP, MySQL, JavaScript, jQuery, Ext JS, Zend Framework, Yii Framework, Solr, Nginx, Apache2, Memcache, and RabbitMQ.",
  },
  {
    company: "Myone - Comunicação Multimédia",
    end: "2012-05-30",
    start: "2008-10-01",
    titleKey: "home_page_experience_myone_title",
    location: "Vila Nova de Gaia",
    description:
      "Back-end and front-end development (PHP, MySQL, JSON, AJAX, JavaScript, jQuery, XML, CSS3, HTML5, Flash ActionScript 3.0).\n\nUI/UX design (Adobe Photoshop, Fireworks, Illustrator, Flash, Corel Draw).\n\nProject management.",
  },
  {
    company: "Medula - Design de Comunicação",
    end: "2008-09-30",
    start: "2007-09-01",
    titleKey: "home_page_experience_medula_title",
    location: "Vila Nova de Gaia",
    description:
      "PHP, MySQL, JavaScript, AS3 developer.\n\nInterface and web designer.\n\nProject management.",
  },
  {
    end: "2007-08-30",
    start: "2004-01-01",
    titleKey: "home_page_experience_freelancer_title",
    description:
      "Freelance web development and design projects.\n\nFull-stack development, client communication, and project delivery.",
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

let descIdCounter = 0;

const DescriptionText: FunctionalComponent<{ text: string }> = ({ text }) => {
  const { t } = useTranslate();
  const id = useMemo(() => `desc-${++descIdCounter}`, []);
  const isLong = text.length > 250;
  const preview = isLong ? `${text.slice(0, 250).trim()}...` : text;

  if (!isLong) {
    return (
      <p class="text-sm/relaxed whitespace-pre-line text-zinc-700 dark:text-zinc-300">{text}</p>
    );
  }

  return (
    <div class="group/desc">
      <input type="checkbox" id={id} class="peer sr-only" aria-label={t("show_more")} />
      <p class="text-sm/relaxed whitespace-pre-line text-zinc-700 peer-checked:hidden dark:text-zinc-300">
        {preview}
      </p>
      <p class="hidden text-sm/relaxed whitespace-pre-line text-zinc-700 peer-checked:block dark:text-zinc-300">
        {text}
      </p>
      <label for={id} class="interactive mt-4 cursor-pointer interactive-xs">
        <span class="group-has-checked/desc:hidden">{t("show_more")}</span>
        <span class="hidden group-has-checked/desc:inline">{t("show_less")}</span>
      </label>
    </div>
  );
};

const ExperienceItem: FunctionalComponent<{
  titleKey: string;
  start: string;
  end?: string;
  location?: string;
  description?: string;
  compact?: boolean;
}> = ({ titleKey, start, end, location, description, compact }) => {
  const { t } = useTranslate();
  const { lang } = useLanguage();

  const duration = calculateDuration(start, end, t);
  const dateRange = formatDateRange(start, end, duration, lang, t);

  const isCurrent = !end;

  return (
    <div class="relative pl-6">
      <span
        class={classNames(
          "absolute top-1 -left-2.25 h-4 w-4 rounded-full border-[3px] border-stone-400",
          isCurrent
            ? "bg-black dark:border-zinc-500 dark:bg-white"
            : "bg-stone-100 dark:border-white/10 dark:bg-zinc-700",
        )}
      />
      <h4 class="font-semibold text-zinc-900 dark:text-white">{t(titleKey)}</h4>
      <p class="text-xs text-stone-600 dark:text-zinc-400">{dateRange}</p>
      {!compact && location && (
        <p class="mt-1 text-xs text-stone-500 dark:text-zinc-500">{location}</p>
      )}
      {!compact && description && (
        <div class="mt-3 border-t border-white/30 pt-3 dark:border-white/5">
          <DescriptionText text={description} />
        </div>
      )}
    </div>
  );
};

const CompanySection: FunctionalComponent<CompanyGroup & { compact?: boolean }> = ({
  name,
  duration,
  experiences,
  compact,
}) => {
  return (
    <div class={compact ? "my-6 last:mb-0" : "my-12 last:mb-0"}>
      <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-200">{name}</h3>
      <p class="mb-3 text-sm text-stone-600 dark:text-zinc-400">{duration}</p>
      <div class="relative ml-3">
        <span class="absolute top-3 bottom-0 -left-0.5 w-2 -translate-x-1/3 rounded-sm bg-stone-300/50 dark:bg-white/5" />
        <div class={compact ? "space-y-2" : "space-y-6"}>
          {experiences.map((exp, index) => (
            <ScrollReveal key={exp.titleKey} delay={0.3 * index}>
              <ExperienceItem {...exp} compact={compact} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ExperienceTimeline: FunctionalComponent = () => {
  const { t } = useTranslate();
  const [compactTimeline, setCompactTimeline] = useState(false);
  const companyGroups = useMemo(() => groupByCompany(myExperience, t), [t]);

  return (
    <section class="m-0 -mx-6 flex flex-col items-center border-t border-white/80 bg-white/5 px-6 py-16 text-center dark:border-white/15 dark:bg-zinc-900/15">
      <div class="w-full max-w-sm text-left sm:max-w-2xl">
        <div class="mb-12 gap-4 sm:flex sm:items-center sm:justify-center sm:text-center">
          <ScrollReveal as="h2">{t("home_page_professional_experience")}</ScrollReveal>
          <ScrollReveal
            delay={2}
            as="span"
            class="mt-2 flex items-center gap-2 sm:mt-0"
            direction="up"
          >
            <span class="hidden text-[0px] sm:inline-block">
              <Tooltip content={t("sidedrawer_compact_timeline")}>
                <Switch
                  checked={compactTimeline}
                  onChange={setCompactTimeline}
                  label={t("sidedrawer_compact_timeline")}
                />
              </Tooltip>
            </span>
            <span class="inline text-[0px] sm:hidden">
              <Switch
                checked={compactTimeline}
                onChange={setCompactTimeline}
                label={t("sidedrawer_compact_timeline")}
              />
            </span>
            <Button
              type="button"
              class="inline-flex cursor-pointer items-center bg-transparent p-0 text-xs text-zinc-600 sm:hidden dark:text-zinc-400"
              onClick={() => setCompactTimeline(!compactTimeline)}
            >
              {t("sidedrawer_compact_timeline")}
            </Button>
          </ScrollReveal>
        </div>

        <div>
          {companyGroups.map((group) => (
            <ScrollReveal key={group.name} delay={1}>
              <CompanySection {...group} compact={compactTimeline} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
