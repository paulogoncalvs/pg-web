module.exports = {
    extends: ['stylelint-config-standard', 'stylelint-config-standard-scss'],
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
