export default {
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 120,
    endOfLine: 'auto',
    tabWidth: 4,
    overrides: [
        {
            files: ['*.json', '*.yml', '.*rc'],
            options: {
                tabWidth: 2,
            },
        },
    ],
};
