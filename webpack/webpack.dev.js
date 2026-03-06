import webpack from 'webpack';
import { merge } from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import SVGSpritemapPlugin from 'svg-spritemap-webpack-plugin';
import paths from './paths.js';
import common from './webpack.common.js';

export default merge(common, {
    mode: 'development',
    cache: { type: 'memory' },
    devtool: 'inline-cheap-source-map',
    infrastructureLogging: {
        level: 'warn',
    },
    devServer: {
        hot: true,
        liveReload: false,
        open: false,
        port: 4005,
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
            reconnect: true,
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
            serverSideRender: false,
            writeToDisk: true,
        },
    },
    watchOptions: {
        ignored: [
            '**/dist',
            '**/tests',
            '**/node_modules',
            '**/docs',
            '**/.vscode',
            '**/.idea',
            '**/.git',
            '**/.github',
        ],
        poll: 1000,
    },
    module: {
        rules: [
            // TypeScript / JavaScript with esbuild
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'esbuild-loader',
                        options: {
                            loader: 'tsx',
                            target: 'es2020',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.ProgressPlugin(),

        new StylelintPlugin({
            failOnError: false,
            emitErrors: false,
            syntax: 'scss',
        }),

        new MiniCssExtractPlugin({
            chunkFilename: '[id].css',
            filename: 'assets/css/[name].css',
        }),

        new SVGSpritemapPlugin(`${paths.src}/assets/icons/**/*.svg`, {
            output: {
                filename: 'assets/img/sprite.svg',
            },
        }),
    ],
});
