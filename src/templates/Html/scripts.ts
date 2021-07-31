export const initStore = (store: PageStore = {}): string => `window.__STORE__=${JSON.stringify(store)};`;

export const initialScript = (): void => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const ct = window.localStorage.getItem('color-theme');
        ct && window.document.documentElement.classList.add(ct);
    }
};
