module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            modules: true,
            impliedStrict: true,
            experimentalObjectRestSpread: true,
            experimentalDecorators: true,
            jsx: true,
        },
    },
    extends: ['plugin:react-hooks/recommended', 'plugin:prettier/recommended', 'eslint:recommended'],
    plugins: ['import', 'react', 'react-hooks', 'prettier'],
    rules: {
        /**
         * Preact / JSX rules
         */
        'react/display-name': [1, { ignoreTranspilerName: false }],
        'react/prefer-stateless-function': 1,
        'react/no-danger': 1,
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
        'react/jsx-uses-react': 2,
        'react/jsx-uses-vars': 2,
        'react/jsx-key': [2, { checkFragmentShorthand: true }],
        'react/self-closing-comp': 2,
        'react/prefer-es6-class': 2,
        'react/require-render-return': 2,
        'react/no-deprecated': 2,

        // Legacy APIs not supported in Preact
        'react/no-did-mount-set-state': 2,
        'react/no-did-update-set-state': 2,
        'react/no-find-dom-node': 2,
        'react/no-is-mounted': 2,
        'react/no-string-refs': 2,

        // Other
        'no-console': 1,
        'function-call-argument-newline': [2, 'consistent'],
        'import/extensions': [
            2,
            'never',
            { svg: 'always', worker: 'always', jpg: 'always', jpeg: 'always', png: 'always', json: 'always', js: 1 },
        ],
        'no-duplicate-imports': [2, { includeExports: true }],

        // Prettier
        'prettier/prettier': 2,
    },
    overrides: [
        // typescript
        {
            files: ['*.ts', '*.tsx'],
            excludedFiles: ['*.js', '*.jsx'],
            plugins: ['@typescript-eslint'],
            extends: ['plugin:@typescript-eslint/recommended'],
            rules: {
                '@typescript-eslint/no-unused-vars': [
                    1,
                    { varsIgnorePattern: '^h$', ignoreRestSiblings: true, argsIgnorePattern: '^_' },
                ],
                '@typescript-eslint/explicit-function-return-type': 1,
                '@typescript-eslint/no-explicit-any': 1,
                '@typescript-eslint/ban-ts-comment': 0,
            },
        },
    ],
    globals: {
        browser: 'readonly',
        page: 'readonly',
        global: 'readonly',
        __STORE__: 'writable',
    },
    settings: {
        react: {
            pragma: 'h',
            version: '16',
        },
    },
};
