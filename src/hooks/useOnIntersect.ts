import { useEffect, useRef } from "preact/hooks";

let sharedObserver: IntersectionObserver | null = null;
const observedElements = new Set<Element>();
const callbacks = new Map<Element, () => void>();

const createObserver = (): IntersectionObserver => {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const callback = callbacks.get(entry.target);
          if (callback) {
            callback();
          }
          observedElements.delete(entry.target);
          sharedObserver?.unobserve(entry.target);
        }
      });
    },
    { threshold: 0, rootMargin: "0px 0px -20px 0px" },
  );
};

const getSharedObserver = (): IntersectionObserver => {
  if (!sharedObserver) {
    sharedObserver = createObserver();
  }
  return sharedObserver;
};

const scheduleObservation = (element: Element): void => {
  const observe = () => getSharedObserver().observe(element);

  if (document.readyState === "complete") {
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(observe);
    } else {
      setTimeout(observe, 0);
    }
  } else {
    window.addEventListener("load", observe, { once: true });
  }
};

export const useOnIntersect = (
  elementRef: { current: HTMLElement | null },
  onIntersect: () => void,
): void => {
  const onIntersectRef = useRef(onIntersect);
  onIntersectRef.current = onIntersect;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    const callback = () => {
      onIntersectRef.current();
    };

    callbacks.set(element, callback);
    observedElements.add(element);
    scheduleObservation(element);

    return (): void => {
      callbacks.delete(element);
      observedElements.delete(element);
      getSharedObserver().unobserve(element);
    };
  }, [elementRef]);
};
