const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const HtmlWebpackDeployPlugin = require('html-webpack-deploy-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WebpackModuleNomodulePlugin = require('webpack-module-nomodule-plugin');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const paths = require('./paths');
const globalConfig = require('../global.config');

module.exports = {
    entry: [paths.src + '/index.tsx'],

    output: {
        path: paths.build,
        filename: '[name].bundle.js',
        publicPath: '/',
        clean: true,
    },

    plugins: [
        new webpack.ProgressPlugin(),

        new CleanWebpackPlugin(),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: paths.public,
                    to: ({ absoluteFilename }) => {
                        if (absoluteFilename.includes('/manifest/')) {
                            return '[path][name][ext]';
                        }

                        return `[path][name]${process.env.NODE_ENV === 'production' ? '.[fullhash]' : ''}[ext]`;
                    },
                    globOptions: {
                        ignore: ['*.DS_Store'],
                    },
                },
            ],
        }),

        new HtmlWebpackPlugin({
            favicon: paths.public + '/assets/favicon.ico',
            template: paths.src + '/templates/Html/index.tsx',
            filename: 'index.html',
            inject: 'body',
            scriptLoading: 'blocking', // set as blocking because we're using WebpackModuleNomodulePlugin
        }),

        new HtmlWebpackTagsPlugin({
            append: true,
            metas: globalConfig.metas,
            assetsPath: '/assets/',
            hash:
                process.env.NODE_ENV === 'production'
                    ? (assetName, hash) => assetName.replace(/(\.[^.]*)?$/, `.${hash}$1`)
                    : false,
            publicPath: false,
        }),

        new HtmlWebpackDeployPlugin({
            assetsPath: '/assets/',
            hash:
                process.env.NODE_ENV === 'production'
                    ? (assetName, hash) => assetName.replace(/(\.[^.]*)?$/, `.${hash}$1`)
                    : false,
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
            { test: /\.[jt]sx?$/, exclude: /node_modules/, use: ['babel-loader'] },

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
                        },
                    },
                ],
            },

            // Images: Copy images to build folder
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
                generator: {
                    //If emitting file, the file path is
                    filename: `assets/img/[name]${process.env.NODE_ENV === 'production' ? '.[hash]' : ''}[ext]`,
                },
            },

            // Fonts: Inline
            { test: /\.(woff(2)?|eot|ttf|otf|)$/, type: 'asset/inline' },

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
                generator: {
                    filename: `assets/img/[name]${process.env.NODE_ENV === 'production' ? '.[hash]' : ''}[ext]`,
                },
                use: [
                    {
                        loader: 'svgo-loader',
                        options: {
                            plugins: [
                                { removeDesc: true },
                                { removeAttrs: { attrs: 'class|style' } },
                                { removeStyleElement: true },
                                { removeRasterImages: true },
                            ],
                        },
                    },
                ],
            },
        ],
    },

    experiments: {
        topLevelAwait: true,
        asyncWebAssembly: true,
    },
};
