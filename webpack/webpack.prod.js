const Dotenv = require('dotenv-webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const paths = require('./paths');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    output: {
        path: paths.build,
        publicPath: '/',
        filename: 'assets/js/[name].[contenthash].bundle.js',
        assetModuleFilename: 'assets/img/[name].[contenthash:8][ext]',
        clean: true,
    },
    plugins: [
        new Dotenv({
            path: './.env.production',
        }),
        // Extracts CSS into separate files
        // style-loader -> development
        // MiniCssExtractPlugin -> production
        new MiniCssExtractPlugin({
            chunkFilename: 'assets/css/[id].[contenthash].css',
            filename: 'assets/css/[name].[contenthash].css',
        }),

        new WorkboxPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" SWs to hang around
            clientsClaim: true,
            skipWaiting: true,
        }),

        new SVGSpritemapPlugin(paths.src + '/assets/icons/**/*.svg', {
            output: {
                filename: 'assets/img/sprite.[contenthash].svg',
            },
        }),

        new BundleAnalyzerPlugin({
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
