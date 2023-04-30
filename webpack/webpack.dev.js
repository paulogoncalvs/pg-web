import webpack from 'webpack';
import Dotenv from 'dotenv-webpack';
import { merge } from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import SVGSpritemapPlugin from 'svg-spritemap-webpack-plugin';
import paths from './paths.js';
import common from './webpack.common.js';

export default merge(common, {
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
                        loader: 'babel-loader',
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
