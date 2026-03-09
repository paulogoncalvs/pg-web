import path from 'node:path';
import Dotenv from 'dotenv-webpack';
import WorkboxPlugin from 'workbox-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackTagsPlugin from 'html-webpack-tags-plugin';
import HtmlWebpackDeployPlugin from 'html-webpack-deploy-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import type { Configuration } from 'webpack';
import paths from './paths.js';
import config from './config.js';
import globalConfig from '../src/config/global';

const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production' || env === 'tests';

const webpackConfig: Configuration = {
    entry: [`${paths.src}/index.tsx`],
    output: {
        path: paths.build,
        filename: '[name].bundle.js',
        assetModuleFilename: 'assets/resources/[name][ext]',
        publicPath: '/',
        clean: true,
        globalObject: "(typeof self === 'undefined' ? this : self)",
    },

    plugins: [
        new Dotenv({
            path: `.env.${env}`,
        }),

        isProd
            ? new WorkboxPlugin.GenerateSW({
                  mode: env,
                  clientsClaim: true,
                  skipWaiting: true,
                  exclude: ['.DS_Store'],
                  offlineGoogleAnalytics: isProd,
              })
            : null,

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: paths.public,
                    to: ({ absoluteFilename }) => {
                        if (
                            !absoluteFilename ||
                            config.filesWithoutHashes.some((el) => absoluteFilename.includes(el))
                        ) {
                            return '[path][name][ext]';
                        }

                        return `[path][name]${isProd ? '.[fullhash]' : ''}[ext]`;
                    },
                    globOptions: {
                        ignore: ['*.DS_Store', '**/.DS_Store'],
                    },
                },
            ],
        }),

        ...Object.keys(globalConfig.routes).map(
            (key) =>
                new HtmlWebpackPlugin({
                    favicon: `${paths.public}/assets/favicon.ico`,
                    template: `${paths.src}/templates/html/index.tsx`,
                    minify: {
                        removeRedundantAttributes: false,
                        collapseWhitespace: true,
                        minifyJS: isProd,
                        minifyCSS: isProd,
                    },
                    ...globalConfig.routes[key],
                }),
        ),

        new HtmlWebpackTagsPlugin({
            append: true,
            metas: globalConfig.metas as unknown as Array<Record<string, string>>,
            assetsPath: '/assets/',
            hash: isProd ? (assetName: string, hash: string) => assetName.replace(/(\.[^.]*)?$/, `.${hash}$1`) : false,
            publicPath: false,
        }),

        new HtmlWebpackDeployPlugin({
            assetsPath: '/assets/',
            hash: isProd ? (assetName: string, hash: string) => assetName.replace(/(\.[^.]*)?$/, `.${hash}$1`) : false,
            publicPath: false,
            assets: {
                links: globalConfig.links as unknown as Array<{ rel: string; type?: string; href: string }>,
            },
        }),
    ],

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        plugins: [new TsconfigPathsPlugin()],
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },

            {
                test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/i,
                type: 'asset/resource',
            },

            {
                test: /fonts\/.*\.(woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]',
                },
            },

            {
                test: /[\\/]icons[\\/].*\.svg$/,
                type: 'asset/inline',
                generator: {
                    dataUrl: (content: Buffer, data: { filename: string }) => {
                        const contentString = content.toString();

                        return [
                            `#sprite-${path.parse(data.filename).name}`,
                            (contentString.match(/viewBox="([^"]+)"/) || [])[1] || '',
                        ];
                    },
                },
            },

            {
                test: /[\\/]img[\\/].*\.svg$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 1,
                    },
                },
            },
        ],
    },
};

export default webpackConfig;
