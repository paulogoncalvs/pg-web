const Dotenv = require('dotenv-webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const paths = require('./paths');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    output: {
        path: paths.build,
        publicPath: '/',
        filename: 'assets/js/[name].[contenthash].bundle.js',
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
            chunkFilename: '[id].css',
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
                filename: 'assets/img/sprite.[hash].svg',
            },
        }),
    ],
    module: {
        rules: [],
    },
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
        runtimeChunk: {
            name: 'runtime',
        },
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
});
