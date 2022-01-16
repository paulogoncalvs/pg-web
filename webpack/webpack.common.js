const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const HtmlWebpackDeployPlugin = require('html-webpack-deploy-plugin');
const { default: MiniCssExtractPlugin } = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WebpackModuleNomodulePlugin = require('webpack-module-nomodule-plugin');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const paths = require('./paths');
const globalConfig = require('../src/config/global');
const env = process.env.NODE_ENV;

module.exports = {
    entry: [paths.src + '/index.tsx'],

    output: {
        path: paths.build,
        filename: '[name].bundle.js',
        assetModuleFilename: 'assets/img/[name][ext]',
        publicPath: '/',
        clean: true,
        globalObject: "(typeof self === 'undefined' ? this : self)",
    },

    plugins: [
        new webpack.ProgressPlugin(),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: paths.public,
                    to: ({ absoluteFilename }) => {
                        if (['/manifest/', 'robots.txt'].some((el) => absoluteFilename.includes(el))) {
                            return '[path][name][ext]';
                        }

                        return `[path][name]${env === 'production' ? '.[fullhash]' : ''}[ext]`;
                    },
                    globOptions: {
                        ignore: ['*.DS_Store'],
                    },
                },
            ],
        }),

        ...Object.keys(globalConfig.routes).map(
            (key) =>
                new HtmlWebpackPlugin({
                    favicon: paths.public + '/assets/favicon.ico',
                    template: paths.src + '/templates/html/index.tsx',
                    inject: 'body',
                    scriptLoading: 'blocking',
                    ...globalConfig.routes[key],
                }),
        ),

        new HtmlWebpackTagsPlugin({
            append: true,
            metas: globalConfig.metas,
            assetsPath: '/assets/',
            hash: env === 'production' ? (assetName, hash) => assetName.replace(/(\.[^.]*)?$/, `.${hash}$1`) : false,
            publicPath: false,
        }),

        new HtmlWebpackDeployPlugin({
            assetsPath: '/assets/',
            hash: env === 'production' ? (assetName, hash) => assetName.replace(/(\.[^.]*)?$/, `.${hash}$1`) : false,
            publicPath: false,
            assets: {
                links: globalConfig.links,
            },
        }),

        new ForkTsCheckerWebpackPlugin({
            eslint: {
                files: './src/**/*.{ts,tsx,js,jsx}', // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
            },
        }),

        new WebpackModuleNomodulePlugin('modern'),
    ],

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        plugins: [new TsconfigPathsPlugin()],
    },

    module: {
        rules: [
            // JavaScript / TypeScript
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },

            // Style
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                ident: 'postcss',
                                plugins: [tailwindcss, autoprefixer],
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            webpackImporter: false,
                            additionalData: `$sass-env:${env};`,
                        },
                    },
                ],
            },

            // Images: Copy images to build folder
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },

            // Fonts: Inline
            {
                test: /\.(woff(2)?|eot|ttf|otf|)$/,
                type: 'asset/inline',
            },

            // SVG Icons: Content to use with preact component
            {
                test: /icons\/.*\.svg/,
                type: 'asset/inline',
                generator: {
                    dataUrl: (content, data) => {
                        const contentString = content.toString();

                        return {
                            hash: `#sprite-${path.parse(data.filename).name}`,
                            viewBox: (contentString.match(/viewBox="([^"]+)"/) || [])[1] || '',
                            // content: contentString.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)[1] || '',
                        };
                    },
                },
            },

            // SVG Images
            {
                test: /img\/.*\.(svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 1,
                    },
                },
                use: [
                    {
                        loader: 'svgo-loader',
                        options: {
                            plugins: [
                                { name: 'removeDesc' },
                                {
                                    name: 'removeAttrs',
                                    params: {
                                        attrs: ['class', 'style'],
                                    },
                                },
                                { name: 'removeStyleElement' },
                                { name: 'removeRasterImages' },
                            ],
                        },
                    },
                ],
            },
        ],
    },
};
