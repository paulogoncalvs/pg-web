import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tailwindcss from 'eslint-plugin-tailwindcss';
import tsParser from '@typescript-eslint/parser';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
    baseDirectory: path.dirname(fileURLToPath(import.meta.url)),
});

export default [
    {
        ignores: [
            'src/tests/**/results',
            'src/tests/**/report',
            'src/styles',
            '**/node_modules',
            '**/dist',
            '**/coverage',
            '**/public',
            '**/.history',
            '**/.idea',
            '**/.vscode',
            '**/.yarn',
        ],
    },
    ...fixupConfigRules(compat.extends('plugin:react-hooks/recommended')),
    {
        files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],

        plugins: {
            react,
            import: importPlugin,
            'react-hooks': fixupPluginRules(reactHooks),
            'jsx-a11y': jsxA11y,
            tailwindcss,
        },

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                browser: 'readonly',
                page: 'readonly',
                global: 'readonly',
                __STORE__: 'writable',
            },

            parser: tsParser,
            ecmaVersion: 2018,
            sourceType: 'module',

            parserOptions: {
                ecmaFeatures: {
                    modules: true,
                    impliedStrict: true,
                    experimentalObjectRestSpread: true,
                    experimentalDecorators: true,
                    jsx: true,
                },
            },
        },

        settings: {
            react: {
                pragma: 'h',
                version: '16',
            },

            'import/resolver': {
                typescript: {},
            },
        },

        rules: {
            ...eslint.configs.recommended.rules,
            ...jsxA11y.flatConfigs.recommended.rules,
            ...importPlugin.flatConfigs.recommended.rules,

            /**
             * Preact
             */
            'react/no-deprecated': 2,
            'react/react-in-jsx-scope': 0, // handled this automatically
            'react/display-name': [1, { ignoreTranspilerName: false }],
            'react/jsx-no-bind': [
                1,
                {
                    ignoreRefs: true,
                    allowFunctions: true,
                    allowArrowFunctions: true,
                },
            ],
            'react/jsx-no-comment-textnodes': 2,
            'react/jsx-no-duplicate-props': 2,
            'react/jsx-no-target-blank': 2,
            'react/jsx-no-undef': 2,
            'react/jsx-tag-spacing': [2, { beforeSelfClosing: 'always' }],
            'react/jsx-uses-react': 2, // debatable
            'react/jsx-uses-vars': 2,
            'react/jsx-key': [2, { checkFragmentShorthand: true }],
            'react/self-closing-comp': 2,
            'react/prefer-es6-class': 2,
            'react/prefer-stateless-function': 1,
            'react/require-render-return': 2,
            'react/no-danger': 1,
            // Legacy APIs not supported in Preact:
            'react/no-did-mount-set-state': 2,
            'react/no-did-update-set-state': 2,
            'react/no-find-dom-node': 2,
            'react/no-is-mounted': 2,
            'react/no-string-refs': 2,

            /**
             * Hooks
             */
            'react-hooks/rules-of-hooks': 2,
            'react-hooks/exhaustive-deps': 1,

            /**
             * General JavaScript error avoidance
             */
            'constructor-super': 2,
            'no-caller': 2,
            'no-const-assign': 2,
            'no-delete-var': 2,
            'no-dupe-class-members': 2,
            'no-dupe-keys': 2,
            'no-duplicate-imports': 2,
            'no-else-return': 1,
            'no-empty-pattern': 0,
            'no-empty': 0,
            'no-iterator': 2,
            'no-lonely-if': 2,
            'no-multi-str': 1,
            'no-new-wrappers': 2,
            'no-proto': 2,
            'no-redeclare': 2,
            'no-shadow-restricted-names': 2,
            'no-shadow': 0,
            'no-this-before-super': 2,
            'no-undef-init': 2,
            'no-unneeded-ternary': 2,
            'no-unused-vars': [
                2,
                {
                    args: 'after-used',
                    ignoreRestSiblings: true,
                },
            ],
            'no-useless-call': 1,
            'no-useless-computed-key': 1,
            'no-useless-concat': 1,
            'no-useless-constructor': 1,
            'no-useless-escape': 1,
            'no-useless-rename': 1,
            'no-var': 1,
            'no-with': 2,
            'no-console': 1,

            /**
             * Other
             */
            'jsx-a11y/no-onchange': 0,
            'import/no-unresolved': 0,

            // Disabled due to ESLint v9 incompatibilities
            'import/no-named-as-default': 0,
            'import/no-named-as-default-member': 0,
            'import/namespace': 0,
            'import/default': 0,
        },
    },
    ...tseslint.configs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
        ignores: ['**/*.cjs', '**/*.mjs', '**/*.js', '**/*.jsx'],

        plugins: {
            '@typescript-eslint': typescriptEslint,
        },

        rules: {
            '@typescript-eslint/no-unused-vars': [
                1,
                {
                    varsIgnorePattern: '^h$',
                    ignoreRestSiblings: true,
                    argsIgnorePattern: '^_',
                },
            ],

            '@typescript-eslint/explicit-function-return-type': 1,
            '@typescript-eslint/no-explicit-any': 1,
            '@typescript-eslint/ban-ts-comment': 0,
            '@typescript-eslint/no-empty-object-type': 1,
            '@typescript-eslint/no-unused-expressions': 1,
        },
    },
];
