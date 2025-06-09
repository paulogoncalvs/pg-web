/** @type {import('stylelint').Config} */
export default {
    extends: ['stylelint-config-standard-scss', 'stylelint-config-tailwindcss'],
    rules: {
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['use', 'tailwind'],
            },
        ],
        'scss/at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['tailwind'],
            },
        ],
        'selector-class-pattern': '^(_?-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$',
        'at-rule-no-deprecated': null,
    },
};
