import type { ComponentChildren, FunctionalComponent } from "preact";
import { Link as WLink } from "wouter-preact";
import { useTranslate } from "@/modules/i18n";

interface LinkComponentProps {
  href?: string;
  class?: string;
  newWindow?: boolean;
  ariaLabel?: string;
  onClick?(): void;
  useRouter?: boolean;
  children?: ComponentChildren;
}

export const Link: FunctionalComponent<LinkComponentProps> = ({
  href = "",
  newWindow,
  ariaLabel,
  children,
  useRouter,
  ...otherProps
}) => {
  const { t } = useTranslate();
  const Comp = useRouter ? WLink : "a";

  return (
    <Comp
      href={href}
      aria-label={
        ariaLabel
          ? newWindow
            ? t("accessibility_new_window", { text: ariaLabel })
            : ariaLabel
          : undefined
      }
      {...(newWindow ? { rel: "noopener noreferrer", target: "_blank" } : {})}
      {...(otherProps as Record<string, unknown>)}
    >
      {children}
    </Comp>
  );
};
