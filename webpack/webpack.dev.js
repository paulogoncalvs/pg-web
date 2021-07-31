const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const { merge } = require('webpack-merge');
const PreactRefreshPlugin = require('@prefresh/webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const paths = require('./paths');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',

    devtool: 'inline-cheap-source-map',

    devServer: {
        historyApiFallback: true,
        contentBase: paths.build,
        open: false,
        compress: true,
        port: 4000,
        watchOptions: {
            ignored: /node_modules/,
        },
        hot: true,
        // writeToDisk: true,
    },

    module: {
        rules: [
            // TypeScript
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            // disable type checker - we will use it in fork plugin
                            transpileOnly: true,
                        },
                    },
                ],
            },
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: [
                    // other loaders
                    {
                        loader: require.resolve('babel-loader'),
                        options: {
                            // other options
                            plugins: [
                                // other plugins
                            ].filter(Boolean),
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new Dotenv({
            path: './.env.development',
        }),

        new StylelintPlugin(),

        new webpack.HotModuleReplacementPlugin(),

        new PreactRefreshPlugin(),

        new MiniCssExtractPlugin({
            chunkFilename: '[id].css',
            filename: 'assets/css/[name].css',
        }),

        new SVGSpritemapPlugin(paths.src + '/assets/icons/**/*.svg', {
            output: {
                filename: 'assets/img/sprite.svg',
            },
        }),
    ],
});
