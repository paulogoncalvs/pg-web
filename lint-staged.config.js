export default {
    '*': ['yarn format'],
    '*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}': ['yarn lint:ts'],
    '*.{css}': ['yarn lint:css'],
};
