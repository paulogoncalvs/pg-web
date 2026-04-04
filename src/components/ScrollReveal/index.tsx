import { classNames } from "@/utils/classNames";
import type { ComponentChildren, FunctionalComponent, JSX } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { observeElement } from "@/hooks/sharedIntersectionObserver";

type Direction = "up" | "down";

interface ScrollRevealProps {
  delay?: number;
  direction?: Direction;
  classes?: string;
  Element?: JSX.ElementType;
  children: ComponentChildren;
  forceVisible?: boolean;
}

export const ScrollReveal: FunctionalComponent<ScrollRevealProps> = ({
  delay = 0,
  direction = "down",
  classes = "",
  Element = "div",
  children,
  forceVisible = false,
}) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(forceVisible);

  useEffect(() => {
    if (forceVisible) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) {
      return;
    }

    const unobserve = observeElement(element, () => {
      setIsVisible(true);
    });

    return unobserve;
  }, [forceVisible]);

  const animation = direction === "up" ? "animate-fade-in-up" : "animate-fade-in-down";
  const visibleClass = isVisible ? animation : "";
  const initialClass = "op-low";

  return (
    <Element
      ref={ref}
      class={classNames(initialClass, visibleClass, classes)}
      style={{ "--delay": `${delay * 0.1}s` }}
    >
      {children}
    </Element>
  );
};
