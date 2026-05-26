import type { RefObject } from "preact";

import { useEffect, useState } from "preact/hooks";

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export const useIntersectionObserver = (
  elementRef: RefObject<HTMLElement>,
  { threshold = 0, root = null, rootMargin = "0%", freezeOnceVisible = false }: Args,
): [IntersectionObserverEntry | undefined, IntersectionObserver | undefined] => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const [observer, setObserver] = useState<IntersectionObserver>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([intersectionObserverEntry]: IntersectionObserverEntry[]): void => {
    setEntry(intersectionObserverEntry);
  };

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = Boolean(window.IntersectionObserver);

    if (!hasIOSupport || frozen || !node) {
      return;
    }

    const observerParams = { root, rootMargin, threshold };
    const intersectionObserver = new IntersectionObserver(updateEntry, observerParams);

    intersectionObserver.observe(node);
    setObserver(intersectionObserver);

    return (): void => {
      intersectionObserver.disconnect();
    };
    // oxlint-disable-next-line eslint-plugin-react-hooks/exhaustive-deps
  }, [elementRef, threshold, root, rootMargin, frozen, updateEntry]);

  return [entry, observer];
};
