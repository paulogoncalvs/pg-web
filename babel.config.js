module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: 'auto',
                targets: {
                    esmodules: true,
                },
            },
        ],
        [
            '@babel/preset-typescript',
            {
                jsxPragma: 'h',
                allExtensions: false,
            },
        ],
        'babel-preset-preact',
    ],

    plugins: [
        ['@babel/plugin-transform-react-jsx', { pragma: 'h', pragmaFrag: 'Fragment' }],
        ['@babel/plugin-proposal-class-properties'],
        ['@babel/plugin-transform-runtime'],
        ['@babel/plugin-proposal-object-rest-spread'],
        ['@babel/plugin-proposal-nullish-coalescing-operator'],
        ['@babel/plugin-transform-async-to-generator'],
        ['@babel/plugin-proposal-optional-chaining'],
    ],
};
