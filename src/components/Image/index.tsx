import type { FunctionalComponent, JSX } from "preact";

import { useEffect, useRef, useState } from "preact/hooks";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { classNames } from "@/utils/classNames";

interface ImageProps extends JSX.HTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;

  srcset?: string;
  sizes?: string;

  width?: number | string;
  height?: number | string;

  lazy?: boolean;

  placeholder?: string;
  blur?: boolean;
  class?: string;

  fetchpriority?: "high" | "low" | "auto";
}

const DEFAULT_PLACEHOLDER =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

const OBSERVER_ARGS = { threshold: 0.25 };

export const Image: FunctionalComponent<ImageProps> = ({
  src,
  alt = "",

  srcset,
  sizes,

  width,
  height,

  lazy = true,

  placeholder = DEFAULT_PLACEHOLDER,
  blur = false,

  class: classes = "",
  fetchpriority = "auto",

  ...props
}) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(!lazy);

  const [entry, observer] = useIntersectionObserver(imgRef, OBSERVER_ARGS);

  const isVisible = Boolean(entry?.isIntersecting);

  /**
   * Trigger loading when visible
   */
  useEffect(() => {
    if (!lazy) {
      return;
    }
    if (!isVisible) {
      return;
    }

    setShouldLoad(true);

    if (entry?.target) {
      observer?.unobserve(entry.target);
    }
    // oxlint-disable-next-line eslint-plugin-react-hooks/exhaustive-deps
  }, [isVisible, entry?.target, lazy, observer?.unobserve]);

  /**
   * Preload image
   */
  useEffect(() => {
    if (!shouldLoad) {
      return;
    }

    let cancelled = false;
    const img = new window.Image();

    if (srcset) {
      img.srcset = srcset;
    }
    img.src = src;

    img.onload = () => {
      if (!cancelled) {
        setIsLoaded(true);
      }
    };

    return () => {
      cancelled = true;
      img.onload = null;
    };
  }, [shouldLoad, src, srcset]);

  const displaySrc = shouldLoad ? src : placeholder;

  return (
    <img
      ref={imgRef}
      {...props}
      alt={alt}
      width={width}
      height={height}
      src={displaySrc}
      srcset={shouldLoad ? srcset : undefined}
      sizes={shouldLoad ? sizes : undefined}
      loading={lazy ? "lazy" : "eager"}
      decoding="async"
      fetchpriority={fetchpriority}
      class={classNames(
        "transition-opacity duration-500 ease-out motion-reduce:transition-none",
        {
          "opacity-100": isLoaded,
          "opacity-60": !isLoaded,
          "blur-0 scale-100": blur && isLoaded,
          "scale-105 blur-xs": blur && !isLoaded,
        },
        classes,
      )}
    />
  );
};
