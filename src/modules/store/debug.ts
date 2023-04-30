const withDevTools = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__;

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        __REDUX_DEVTOOLS_EXTENSION__: any;
    }
}

const devTools = withDevTools && window.__REDUX_DEVTOOLS_EXTENSION__.connect();

const debug = (type: string, state: unknown): void => {
    if (process.env.NODE_ENV !== 'development') return;

    // eslint-disable-next-line no-console
    console.debug('STATE', state);

    if (withDevTools) {
        devTools.send(type, state);

        return;
    }
};

export { debug };
