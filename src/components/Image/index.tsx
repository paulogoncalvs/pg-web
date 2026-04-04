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
  classes?: string;

  fetchpriority?: "high" | "low" | "auto";
}

const DEFAULT_PLACEHOLDER =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

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

  classes,
  fetchpriority = "auto",

  ...props
}) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(!lazy);

  const [entry, observer] = useIntersectionObserver(imgRef, {
    threshold: 0.25,
  });

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

    const img = new window.Image();

    if (srcset) {
      img.srcset = srcset;
    }
    img.src = src;

    img.onload = () => {
      setIsLoaded(true);
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
      onLoad={() => setIsLoaded(true)}
      class={classNames(
        "transition-all duration-500 ease-out",
        {
          "opacity-100": isLoaded,
          "opacity-60": !isLoaded,
          "scale-100 blur-0": blur && isLoaded,
          "scale-105 blur-xs": blur && !isLoaded,
        },
        classes,
      )}
    />
  );
};
