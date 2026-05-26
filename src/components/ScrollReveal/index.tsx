import type { ComponentChildren, FunctionalComponent, JSX } from "preact";

import { useEffect, useRef, useState } from "preact/hooks";

import { useOnIntersect } from "@/hooks/useOnIntersect";
import { classNames } from "@/utils/classNames";

type Direction = "up" | "down";

interface ScrollRevealProps {
  delay?: number;
  direction?: Direction;
  class?: string;
  as?: JSX.ElementType;
  children: ComponentChildren;
  forceVisible?: boolean;
}

const animations: Record<Direction, string> = {
  up: "animate-fade-in-up",
  down: "animate-fade-in-down",
};

export const ScrollReveal: FunctionalComponent<ScrollRevealProps> = ({
  delay = 0,
  direction = "down",
  class: classes,
  as: Component = "div",
  children,
  forceVisible = false,
}) => {
  const ref = useRef<HTMLElement>(null);

  const [isVisible, setIsVisible] = useState(forceVisible);

  useOnIntersect(ref, () => {
    setIsVisible(true);
  });

  useEffect(() => {
    if (forceVisible) {
      setIsVisible(true);
    }
  }, [forceVisible]);

  return (
    <Component
      ref={ref}
      class={classNames("animate-base op-low", isVisible && animations[direction], classes)}
      style={{
        "--delay": `${delay * 100}ms`,
      }}
    >
      {children}
    </Component>
  );
};
