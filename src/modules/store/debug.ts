const devTools =
  typeof window !== "undefined"
    ? (window.__REDUX_DEVTOOLS_EXTENSION__?.()?.connect() ?? null)
    : null;

const debug = (type: string, state: unknown): void => {
  if (import.meta.env.DEV) {
    // oxlint-disable-next-line no-console
    console.debug("STATE", state);

    if (devTools) {
      devTools.send(type, state);
    }
  }
};

export { debug as default };
