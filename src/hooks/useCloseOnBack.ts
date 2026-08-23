import { useEffect, useRef } from "preact/hooks";

const KEY_PREFIX = "__closeOnBack_";
let counter = 0;

const getKey = (): string => `${KEY_PREFIX}${++counter}`;

export const useCloseOnBack = (isOpen: boolean, onClose: () => void): void => {
  const keyRef = useRef(getKey());

  useEffect(() => {
    if (!isOpen) {
      if (window.history.state?.[keyRef.current]) {
        window.history.back();
      }
      return;
    }

    window.history.pushState({ [keyRef.current]: true }, "");

    const onPopState = () => {
      onClose();
    };

    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, [isOpen, onClose]);
};
