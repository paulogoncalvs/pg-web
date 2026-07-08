import type { ComponentChildren, FunctionalComponent } from "preact";

import { Link } from "@/components/Link";
import { PageHeading } from "@/components/PageHeading";
import { ScrollReveal } from "@/components/ScrollReveal";

interface ErrorPageLayoutProps {
  title: string;
  subtitle: string;
  buttonLabel: string;
  href?: string;
  children?: ComponentChildren;
}

export const ErrorPageLayout: FunctionalComponent<ErrorPageLayoutProps> = ({
  title,
  subtitle,
  buttonLabel,
  href = "/",
  children,
}) => (
  <>
    <PageHeading title={title} subtitle={subtitle} />
    {children}
    <ScrollReveal delay={1} direction="up" class="pb-16">
      <Link useRouter class="interactive interactive-lg" href={href}>
        {buttonLabel}
      </Link>
    </ScrollReveal>
  </>
);
