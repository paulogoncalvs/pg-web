import type { FunctionalComponent } from "preact";

import { useCallback, useEffect, useRef, useState } from "preact/hooks";

import arrowBackIcon from "@/assets/icons/arrow_back.svg";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useTranslate } from "@/modules/i18n";
import { classNames } from "@/utils/classNames";

interface CompetenceGroup {
  titleKey: string;
  items: string[];
}

const groups: CompetenceGroup[] = [
  {
    titleKey: "home_page_competences_frontend_architecture",
    items: [
      "System Design",
      "Micro-Frontends",
      "Module Federation",
      "SPA / SSR / CSR / SSG",
      "State Management",
      "Code Splitting",
    ],
  },
  {
    titleKey: "home_page_competences_react_ecosystem",
    items: [
      "React 19 / Next.js 15",
      "Preact",
      "TypeScript / ES6+",
      "TailwindCSS / shadcn-ui",
      "SCSS / CSS-in-JS",
      "TanStack / Zustand",
    ],
  },
  {
    titleKey: "home_page_competences_platform_engineering",
    items: [
      "Vite / Webpack / Rollup",
      "pnpm / yarn / Monorepo",
      "PWA / Offline-First",
      "Design Systems",
    ],
  },
  {
    titleKey: "home_page_competences_design_accessibility",
    items: ["A11y / Semantic HTML / SEO", "Radix UI", "Storybook", "SVG Sprites"],
  },
  {
    titleKey: "home_page_competences_performance",
    items: ["Web Vitals / Lighthouse", "Bundle Optimization", "Lazy Loading", "Tree Shaking"],
  },
  {
    titleKey: "home_page_competences_fullstack",
    items: ["Node.js", "Express.js / Prisma / PostgreSQL", "REST APIs", "Server-Side Rendering"],
  },
  {
    titleKey: "home_page_competences_devops",
    items: [
      "Docker / CI/CD",
      "GitHub Actions",
      "ESLint / oxlint",
      "Husky / lint-staged",
      "AI-Assisted Development",
    ],
  },
  {
    titleKey: "home_page_competences_observability",
    items: ["Sentry / Grafana", "Playwright / Vitest", "Error Tracking", "Monitoring"],
  },
  {
    titleKey: "home_page_competences_ecommerce",
    items: ["GA4 / GTM / Analytics", "Ad-tech Integrations", "Marketplace Platforms"],
  },
  {
    titleKey: "home_page_competences_leadership",
    items: [
      "Technical Direction",
      "Mentoring",
      "Cross-team Collaboration",
      "Agile / Scrum",
      "Architecture Decisions",
      "Incident Response",
    ],
  },
];

export const Competences: FunctionalComponent = () => {
  const { t } = useTranslate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      observer.disconnect();
    };
  }, [updateScrollState]);

  const scrollBtnBase =
    "interactive absolute top-1/2 z-20 interactive-lg opacity-0 backdrop-blur-sm transition duration-300 group-hover:opacity-100 disabled:opacity-0 max-md:hidden";

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }
    const scrollAmount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }, []);

  return (
    <section class="group relative -mx-6 my-0 border-t border-white/80 bg-white/10 pt-16 dark:border-white/15 dark:bg-zinc-900/25">
      <ScrollReveal
        as="h2"
        class="m-0 mx-auto w-full max-w-sm px-6 sm:max-w-xl sm:text-center @2xl:max-w-xl"
      >
        {t("home_page_competences_title")}
      </ScrollReveal>
      <div
        ref={scrollRef}
        class="flex snap-x snap-mandatory flex-row items-stretch overflow-x-auto py-12 pr-6 [&::-webkit-scrollbar]:h-0"
      >
        {groups.map((group) => (
          <ScrollReveal
            key={group.titleKey}
            delay={1}
            class="flex shrink-0 snap-start flex-col"
            direction="up"
          >
            <div class="ml-6 flex w-72 grow flex-col rounded-2xl border border-white/60 bg-white/30 p-4 shadow-sm dark:border-white/10 dark:bg-zinc-800/30">
              <h3 class="text-sm font-semibold tracking-wider uppercase">{t(group.titleKey)}</h3>
              <div class="mt-3 flex flex-wrap gap-1 text-xs">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    class="rounded-md border border-zinc-200 bg-white/70 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
      <Button
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        class={classNames(scrollBtnBase, "left-2")}
        ariaLabel={t("scroll_left")}
      >
        <Icon src={arrowBackIcon} class="size-4" />
      </Button>
      <Button
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        class={classNames(scrollBtnBase, "right-2")}
        ariaLabel={t("scroll_right")}
      >
        <Icon src={arrowBackIcon} class="size-4 rotate-180" />
      </Button>
    </section>
  );
};
