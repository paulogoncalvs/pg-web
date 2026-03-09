interface ReduxDevTools {
    connect(): ReduxDevTools;
    send(action: string, state: unknown): void;
    init(state: unknown): void;
    subscribe(listener: (message: unknown) => void): () => void;
    unsubscribe(): void;
}

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__?: () => ReduxDevTools;
    }
}

const withDevTools = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__;

const devTools = withDevTools ? window.__REDUX_DEVTOOLS_EXTENSION__!()!.connect() : null;

const debug = (type: string, state: unknown): void => {
    if (process.env.NODE_ENV !== 'development') {
        return;
    }

    console.debug('STATE', state);

    if (devTools) {
        devTools.send(type, state);
    }
};

export { debug as default };
