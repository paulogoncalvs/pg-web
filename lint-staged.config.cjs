module.exports = {
    '*.{scss,css,cjs,js,jsx,ts,tsx}': ['yarn prettify'],
    '*.{cjs,js,jsx,ts,tsx}': ['yarn lint:ts'],
    '*.{scss,css}': ['yarn lint:css'],
};
