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
        open: false,
        port: 4000,
        client: {
            overlay: false,
            // progress: true,
        },
        compress: true,
        historyApiFallback: {
            index: '/404',
        },
        static: {
            directory: paths.build,
            serveIndex: true,
            watch: true,
        },
        devMiddleware: {
            // serverSideRender: false,
            // writeToDisk: true,
            // ignored: /node_modules/,
        },
    },

    watchOptions: {
        ignored: ['**/dist', '**/tests', '**/node_modules', '**/.vscode'],
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
                    {
                        loader: require.resolve('babel-loader'),
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.ProgressPlugin(),

        new Dotenv({
            path: './.env.development',
        }),

        new StylelintPlugin(),

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
