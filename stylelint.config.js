module.exports = {
    extends: ['stylelint-config-recommended', 'stylelint-config-standard-scss', 'stylelint-config-prettier'],
    rules: {
        'scss/at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['extends', 'tailwind', 'apply', 'variants', 'responsive', 'screen', 'layer'],
            },
        ],
        'declaration-block-trailing-semicolon': null,
        'no-descending-specificity': null,
        'selector-class-pattern': '^(_?-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$',
    },
};
