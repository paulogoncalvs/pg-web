export default {
    '*': ['pnpm run format'],
    '*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}': ['pnpm run lint:ts'],
    '*.{css}': ['pnpm run lint:css'],
};
