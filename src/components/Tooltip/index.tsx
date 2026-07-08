import type { FunctionalComponent, ComponentChildren } from "preact";

import { useState, useRef, useLayoutEffect, useEffect, useCallback, useId } from "preact/hooks";

import { classNames } from "@/utils/classNames";

interface TooltipProps {
  content: string;
  position?: "top" | "bottom";
  delay?: number;
  class?: string;
  children: ComponentChildren;
  hideOnOutsideClick?: boolean;
  forcedHide?: boolean;
}

export const Tooltip: FunctionalComponent<TooltipProps> = ({
  content,
  children,
  position = "bottom",
  class: classes = "",
  delay = 0,
  hideOnOutsideClick = false,
  forcedHide = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [pos, setPos] = useState<"top" | "bottom">(position);
  const [align, setAlign] = useState<"center" | "left" | "right">("center");

  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const showTimeout = useRef<number>();
  const hideTimeout = useRef<number>();
  const touchTimeout = useRef<number>();
  const rafRef = useRef<number>();
  const lastTouchTime = useRef(0);

  const id = useId();
  const idRef = useRef(`tooltip-${id}`);

  const TOUCH_DEBOUNCE = 500;
  const ANIMATION_DURATION = 300;
  const OFFSET = 8;

  const clearTimers = useCallback(() => {
    window.clearTimeout(showTimeout.current);
    window.clearTimeout(hideTimeout.current);
    window.clearTimeout(touchTimeout.current);
    cancelAnimationFrame(rafRef.current ?? 0);
  }, []);

  const updatePosition = useCallback(() => {
    if (!tooltipRef.current || !triggerRef.current) {
      return;
    }

    const trigger = triggerRef.current.getBoundingClientRect();
    const tooltip = tooltipRef.current.getBoundingClientRect();

    const spaceBelow = window.innerHeight - trigger.bottom;
    const spaceAbove = trigger.top;

    const nextVertical =
      spaceBelow < tooltip.height + OFFSET && spaceAbove > tooltip.height + OFFSET
        ? "top"
        : "bottom";

    let nextAlign: "center" | "left" | "right" = "center";

    if (trigger.left < OFFSET) {
      nextAlign = "left";
    } else if (trigger.right > window.innerWidth - OFFSET) {
      nextAlign = "right";
    }

    if (pos === nextVertical && align === nextAlign) {
      return;
    }

    setPos(nextVertical);
    setAlign(nextAlign);
  }, [pos, align]);

  const scheduleUpdate = useCallback(() => {
    cancelAnimationFrame(rafRef.current ?? 0);
    rafRef.current = requestAnimationFrame(updatePosition);
  }, [updatePosition]);

  const show = useCallback(() => {
    if (forcedHide) {
      return;
    }

    clearTimers();
    setIsMounted(true);

    showTimeout.current = window.setTimeout(() => {
      setIsVisible(true);
    }, delay);
  }, [clearTimers, delay, forcedHide]);

  const hide = useCallback(() => {
    clearTimers();
    setIsVisible(false);

    const off =
      typeof document !== "undefined" &&
      (document.documentElement.classList.contains("animations-off") ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    hideTimeout.current = window.setTimeout(
      () => {
        setIsMounted(false);
      },
      off ? 0 : ANIMATION_DURATION,
    );
  }, [clearTimers]);

  const handleTouch = useCallback(() => {
    lastTouchTime.current = Date.now();
    if (isVisible) {
      hide();
    } else {
      show();
      touchTimeout.current = window.setTimeout(hide, 2000);
    }
  }, [isVisible, show, hide]);

  const handleMouseEnter = useCallback(() => {
    if (Date.now() - lastTouchTime.current < TOUCH_DEBOUNCE) {
      return;
    }
    show();
  }, [show]);

  const handleMouseLeave = useCallback(() => {
    if (Date.now() - lastTouchTime.current < TOUCH_DEBOUNCE) {
      return;
    }
    hide();
  }, [hide]);

  useLayoutEffect(() => {
    if (!isMounted) {
      return;
    }
    updatePosition();
  }, [isMounted, updatePosition]);

  useLayoutEffect(() => {
    if (!isVisible) {
      return;
    }

    scheduleUpdate();

    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("scroll", scheduleUpdate, true);

    return () => {
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate, true);
    };
  }, [isVisible, content, scheduleUpdate]);

  useEffect(() => {
    if (!hideOnOutsideClick || !isVisible) {
      return;
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        hide();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [hideOnOutsideClick, isVisible, hide]);

  useEffect(() => {
    if (forcedHide) {
      hide();
    }
  }, [forcedHide, hide]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const alignmentClass =
    align === "center"
      ? "left-1/2 -translate-x-1/2"
      : align === "left"
        ? "left-0 translate-x-0"
        : "right-0 -translate-x-full";

  return (
    <div
      ref={triggerRef}
      class="relative inline-block text-[0px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={show}
      onBlur={hide}
      onTouchStart={handleTouch}
      aria-describedby={isVisible ? idRef.current : undefined}
    >
      {children}

      {isMounted && (
        <div
          ref={tooltipRef}
          id={idRef.current}
          role="tooltip"
          aria-hidden={!isVisible}
          class={classNames(
            "absolute z-50 rounded px-2 py-1 text-center text-xs transition-all duration-300 motion-reduce:transition-none",
            "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-800",
            "max-w-xs break-words",
            alignmentClass,
            classes,
            {
              "top-full mt-1": pos === "bottom",
              "bottom-full mb-1": pos === "top",
              "pointer-events-auto opacity-100": isVisible,
              "pointer-events-none opacity-0": !isVisible,
            },
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};
