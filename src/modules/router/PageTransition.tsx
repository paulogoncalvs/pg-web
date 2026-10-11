import type { FunctionalComponent, JSX } from "preact";

import { useContext, useEffect, useRef, useState } from "preact/hooks";

import routesConfig from "@/config/routes";
import { pageCache, preloadPage } from "@/modules/router/pages";
import { StoreContext } from "@/modules/store";
import { classNames } from "@/utils/classNames";

const FADE_MS = 300;

/* Scroll only after the fade-out finished, when the new content is swapped in */
const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: "instant" });
};

interface PageTransitionProps {
  path: string;
  render: (path: string) => JSX.Element;
}

type TransitionPhase = "idle" | "exiting" | "loading" | "entering";

const viewOf = (path: string): string | undefined =>
  routesConfig[path.replace("index.html", "")]?.templateParameters?.View;

/* Strips the language prefix so `/pt/blog/x` and `/blog/x` compare equal */
const stripLangPrefix = (path: string): string => path.replace(/^\/[a-zA-Z]{2}(?=\/|$)/, "");

const needsLoading = (path: string): boolean => {
  const view = viewOf(path);
  return Boolean(view && !pageCache[view]);
};

export const PageTransition: FunctionalComponent<PageTransitionProps> = ({ path, render }) => {
  const { animationsEnabled, dispatch } = useContext(StoreContext);
  const [displayPath, setDisplayPath] = useState(path);
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const prevPath = useRef(path);
  const targetRef = useRef(path);
  const preloadRef = useRef<Promise<void> | null>(null);
  const keepScrollRef = useRef(false);

  /* Jumping to the top only makes sense when the destination is a different
     page. Same-view navigations (blog pagination) keep the scroll position and
     let the page component scroll to its own content. */
  const scrollTopUnlessKept = (): void => {
    if (!keepScrollRef.current) {
      scrollToTop();
    }
  };

  useEffect(() => {
    if (path === prevPath.current) {
      return;
    }
    /* Same page, only the language changed: swap instantly — the store already
       flipped all translated text, so fading out/in would replay the animation
       over identical content */
    const isLocaleSwitch = stripLangPrefix(path) === stripLangPrefix(prevPath.current);
    /* Same view under a different path, e.g. `/blog/` → `/blog/page/2/`:
       BlogList owns the scroll position for its own filters and pagination */
    keepScrollRef.current = !isLocaleSwitch && viewOf(path) === viewOf(prevPath.current);
    prevPath.current = path;

    if (!animationsEnabled || isLocaleSwitch) {
      setDisplayPath(path);
      setPhase("idle");
      scrollTopUnlessKept();
      dispatch({ type: "UPDATE", payload: { isNavigating: needsLoading(path) } });
      return;
    }

    targetRef.current = path;
    const view = viewOf(path);
    if (view && !pageCache[view]) {
      preloadRef.current = preloadPage(view);
    }
    setPhase("exiting");
  }, [path, animationsEnabled, dispatch]);

  useEffect(() => {
    if (phase !== "exiting") {
      return;
    }

    const timer = window.setTimeout(() => {
      if (needsLoading(path)) {
        dispatch({ type: "UPDATE", payload: { isNavigating: true } });
        setPhase("loading");
      } else {
        scrollTopUnlessKept();
        dispatch({ type: "UPDATE", payload: { isNavigating: false } });
        setDisplayPath(path);
        setPhase("entering");
      }
    }, FADE_MS);

    return () => window.clearTimeout(timer);
  }, [phase, path, dispatch]);

  useEffect(() => {
    if (phase !== "loading") {
      return;
    }

    let current = true;
    const target = targetRef.current;

    const finish = (): void => {
      if (!current || targetRef.current !== target) {
        return;
      }
      scrollTopUnlessKept();
      dispatch({ type: "UPDATE", payload: { isNavigating: false } });
      setDisplayPath(target);
      setPhase("entering");
    };

    void (preloadRef.current ?? Promise.resolve()).then(finish).catch(finish);

    return () => {
      current = false;
    };
  }, [phase, dispatch]);

  useEffect(() => {
    if (phase !== "entering") {
      return;
    }
    const timer = window.setTimeout(() => setPhase("idle"), FADE_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  return (
    <div
      class={classNames(
        "flex flex-1 flex-col space-y-16",
        "transition-opacity duration-200 ease-out motion-reduce:transition-none",
        phase === "idle" || phase === "entering" ? "opacity-100" : "opacity-0",
      )}
    >
      {render(displayPath)}
    </div>
  );
};
