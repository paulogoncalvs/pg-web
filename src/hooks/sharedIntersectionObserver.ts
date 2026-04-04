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
    { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
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

export const observeElement = (element: Element, onIntersect: () => void): (() => void) => {
  callbacks.set(element, onIntersect);
  observedElements.add(element);
  scheduleObservation(element);

  return (): void => {
    callbacks.delete(element);
    observedElements.delete(element);
    getSharedObserver().unobserve(element);
  };
};

export const disconnectAll = (): void => {
  if (sharedObserver) {
    sharedObserver.disconnect();
    sharedObserver = null;
  }
  callbacks.clear();
  observedElements.clear();
};
