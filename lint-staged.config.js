export default {
    '*': ['yarn prettify'],
    '*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}': ['yarn lint:ts'],
    '*.{scss,css}': ['yarn lint:css'],
};
