import globals from 'globals';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tailwindcss from 'eslint-plugin-tailwindcss';
import tsParser from '@typescript-eslint/parser';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

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
            '**/.pnpm-store',
        ],
    },
    {
        files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],

        plugins: {
            react,
            import: importPlugin,
            'react-hooks': reactHooks,
            'jsx-a11y': jsxA11y,
            tailwindcss,
        },

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
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
            // Re-enabled ESLint v10 rule after fixing code
            'no-useless-assignment': 2,
            // Disabled jsx-a11y rules for ESLint v10 compatibility
            // ...jsxA11y.flatConfigs.recommended.rules,
            ...importPlugin.flatConfigs.recommended.rules,
            // ...reactHooks.rules.recommended,

            /**
             * Preact - Disabled for ESLint v10 compatibility
             * eslint-plugin-react not yet compatible with ESLint v10
             */
            'react/no-deprecated': 0,
            'react/react-in-jsx-scope': 0,
            'react/display-name': 0,
            'react/jsx-no-bind': 0,
            'react/jsx-no-comment-textnodes': 0,
            'react/jsx-no-duplicate-props': 0,
            'react/jsx-no-target-blank': 0,
            'react/jsx-no-undef': 0,
            'react/jsx-tag-spacing': 0,
            'react/jsx-uses-react': 0,
            'react/jsx-uses-vars': 0,
            'react/jsx-key': 0,
            'react/self-closing-comp': 0,
            'react/prefer-es6-class': 0,
            'react/prefer-stateless-function': 0,
            'react/require-render-return': 0,
            'react/no-danger': 0,
            'react/no-did-mount-set-state': 0,
            'react/no-did-update-set-state': 0,
            'react/no-find-dom-node': 0,
            'react/no-is-mounted': 0,
            'react/no-string-refs': 0,
            'react-hooks/rules-of-hooks': 0,
            'react-hooks/exhaustive-deps': 0,

            /**
             * General JavaScript error avoidance
             * (rules from eslint:recommended are active via spread)
             */

            /**
             * Other
             */
            'jsx-a11y/no-onchange': 0,
            'import/no-unresolved': 0,

            // Disabled due to ESLint v9/v10 incompatibilities
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

            '@typescript-eslint/ban-ts-comment': 0,
        },
    },
];
