module.exports = {
    extends: 'stylelint-config-recommended',
    rules: {
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['extends', 'tailwind', 'apply', 'variants', 'responsive', 'screen', 'layer'],
            },
        ],
        'declaration-block-trailing-semicolon': null,
        'no-descending-specificity': null,
    },
};
