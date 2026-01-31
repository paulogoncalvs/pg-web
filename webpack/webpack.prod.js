import { merge } from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import SVGSpritemapPlugin from 'svg-spritemap-webpack-plugin';
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';
import paths from './paths.js';
import common from './webpack.common.js';

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
        // style-loader -> development
        // MiniCssExtractPlugin -> production
        new MiniCssExtractPlugin({
            chunkFilename: 'assets/css/[id].[contenthash].css',
            filename: 'assets/css/[name].[contenthash].css',
        }),

        new SVGSpritemapPlugin(`${paths.src}/assets/icons/**/*.svg`, {
            output: {
                filename: 'assets/img/sprite.[contenthash].svg',
            },
        }),

        new BundleAnalyzerPlugin.BundleAnalyzerPlugin({
            openAnalyzer: false,
            analyzerMode: 'static',
            defaultSizes: 'gzip',
        }),
    ],
    module: {
        rules: [],
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
