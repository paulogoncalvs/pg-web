import path from 'node:path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import StylelintPlugin from 'stylelint-webpack-plugin';
import paths from './paths.js';
import common from './webpack.common.js';
import { SpritePlugin } from './plugins/spritePlugin.js';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type { Configuration } from 'webpack';

type WebpackConfig = Configuration & {
    devServer?: DevServerConfiguration;
};

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
        host: '0.0.0.0',
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
        onListening(): void {
            console.log('\n🚀 Dev server running at http://localhost:4005\n');
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

        // new StylelintPlugin({
        //     files: '**/*.{css,scss}',
        //     failOnError: false,
        //     emitErrors: false,
        //     syntax: 'scss',
        // }),

        new MiniCssExtractPlugin({
            chunkFilename: '[id].css',
            filename: 'assets/css/[name].css',
        }),

        new SpritePlugin({
            icons: path.join(paths.src, 'assets', 'icons'),
            output: 'assets/img/sprite.svg',
        }),
    ],
} as WebpackConfig);
