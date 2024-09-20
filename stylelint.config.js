/** @type {import('stylelint').Config} */
export default {
    extends: ['stylelint-config-standard', 'stylelint-config-standard-scss'],
    rules: {
        'scss/at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['extends', 'tailwind', 'apply', 'variants', 'responsive', 'screen', 'layer'],
            },
        ],
        'selector-class-pattern': '^(_?-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$',
    },
};
