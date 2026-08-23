import { useEffect, useRef } from "preact/hooks";

function useIsFirstRender(): boolean {
  const isFirst = useRef(true);

  useEffect(() => {
    isFirst.current = false;
  }, []);

  return isFirst.current;
}

export { useIsFirstRender };
