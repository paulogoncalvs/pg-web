module.exports = {
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 120,
    endOfLine: 'auto',
    tabWidth: 4,
    overrides: [
        {
            files: ['*.json', '*.yml'],
            options: {
                tabWidth: 2,
            },
        },
    ],
};
