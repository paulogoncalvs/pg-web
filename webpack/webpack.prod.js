import path from 'path';
import { merge } from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';
import paths from './paths.js';
import common from './webpack.common.js';
import { SpritePlugin } from './plugins/spritePlugin.js';

export default merge(common, {
    mode: 'production',
    devtool: false,
    output: {
        path: paths.build,
        publicPath: '/',
        filename: 'assets/js/[name].bundle.[contenthash].js',
        assetModuleFilename: 'assets/resources/[name].[contenthash][ext]',
    },
    plugins: [
        // Extracts CSS into separate files
        new MiniCssExtractPlugin({
            chunkFilename: 'assets/css/[id].[contenthash].css',
            filename: 'assets/css/[name].[contenthash].css',
        }),

        new SpritePlugin({
            icons: path.join(paths.src, 'assets', 'icons'),
            output: 'assets/img/sprite.[contenthash].svg',
        }),

        new BundleAnalyzerPlugin.BundleAnalyzerPlugin({
            openAnalyzer: false,
            analyzerMode: 'static',
            defaultSizes: 'gzip',
        }),
    ],
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
    optimization: {
        minimize: true,
        minimizer: ['...', new CssMinimizerPlugin()],
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
});
