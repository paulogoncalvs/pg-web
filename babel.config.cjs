module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    esmodules: true,
                },
            },
        ],
        [
            '@babel/preset-typescript',
            {
                jsxPragma: 'h',
                jsxPragmaFrag: 'Fragment',
            },
        ],
    ],

    plugins: [
        ['@babel/plugin-transform-react-jsx', { pragma: 'h', pragmaFrag: 'Fragment' }],
        ['@babel/plugin-transform-runtime'],
        ['@babel/plugin-transform-async-to-generator'],
    ],
};
