import type { ComponentChildren, FunctionalComponent } from "preact";

import { ScrollReveal } from "@/components/ScrollReveal";
import { classNames } from "@/utils/classNames";

interface PageHeadingProps {
  title: ComponentChildren;
  subtitle: ComponentChildren;
  class?: string;
  titleClass?: string;
  subtitleClass?: string;
}

export const PageHeading: FunctionalComponent<PageHeadingProps> = ({
  title,
  subtitle,
  class: classes = "pt-16",
  titleClass = "",
  subtitleClass = "",
}) => (
  <h1 class={classes || undefined}>
    <ScrollReveal as="span" class={titleClass}>
      {title}
    </ScrollReveal>
    <ScrollReveal
      delay={0.5}
      as="span"
      class={classNames("text-stone-800 dark:text-zinc-400", subtitleClass)}
    >
      {subtitle}
    </ScrollReveal>
  </h1>
);
