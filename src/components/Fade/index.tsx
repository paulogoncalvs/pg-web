import type { ComponentChildren, FunctionalComponent, JSX } from "preact";

import { classNames } from "@/utils/classNames";

type Direction = "up" | "down";

interface FadeProps {
  delay?: number;
  direction?: Direction;
  class?: string;
  Element?: JSX.ElementType;
  children: ComponentChildren;
}

export const Fade: FunctionalComponent<FadeProps> = ({
  delay = 0,
  direction = "down",
  class: classes = "",
  Element = "div",
  children,
}) => {
  const animation = direction === "up" ? "animate-fade-in-up" : "animate-fade-in-down";

  return (
    <Element
      class={classNames(`animation-base op-low`, animation, classes)}
      style={{ "--delay": `${delay * 0.1}s` }}
    >
      {children}
    </Element>
  );
};
