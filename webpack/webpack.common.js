import path from 'path';
import Dotenv from 'dotenv-webpack';
import WorkboxPlugin from 'workbox-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackTagsPlugin from 'html-webpack-tags-plugin';
import HtmlWebpackDeployPlugin from 'html-webpack-deploy-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import paths from './paths.js';
import config from './config.js';
import globalConfig from '../src/config/global/index.js';
const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production' || env === 'tests';

export default {
    entry: [`${paths.src}/index.tsx`],
    output: {
        path: paths.build,
        filename: '[name].bundle.js',
        assetModuleFilename: 'assets/img/[name][ext]',
        publicPath: '/',
        clean: true,
        globalObject: "(typeof self === 'undefined' ? this : self)",
    },

    plugins: [
        new Dotenv({
            path: `.env.${env}`,
        }),

        // @todo SW - WIP
        // new WorkboxPlugin.InjectManifest({
        //     swSrc: `${paths.src}/sw/index.ts`,
        //     swDest: `service-worker.js`,
        //     injectionPoint: 'self.__WB_MANIFEST',
        // }),

        new WorkboxPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" SWs to hang around
            mode: env,
            clientsClaim: true,
            skipWaiting: true,
            exclude: ['.DS_Store'],
            offlineGoogleAnalytics: isProd,
            // runtimeCaching: [
            //         {
            //         urlPattern: ({ request }) => request.mode === 'navigate',
            //         handler: 'NetworkFirst',
            //         options: {
            //             cacheName: 'pages',
            //             networkTimeoutSeconds: 3,
            //         },
            //         },
            //     ],
            // navigateFallback: '/offline/index.html',
        }),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: paths.public,
                    to: ({ absoluteFilename }) => {
                        if (config.filesWithoutHashes.some((el) => absoluteFilename.includes(el))) {
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
                        removeRedundantAttributes: false, // eg. do not remove type="text"
                        collapseWhitespace: true,
                        minifyJS: isProd,
                        minifyCSS: isProd,
                    },
                    ...globalConfig.routes[key],
                }),
        ),

        new HtmlWebpackTagsPlugin({
            append: true,
            metas: globalConfig.metas,
            assetsPath: '/assets/',
            hash: isProd ? (assetName, hash) => assetName.replace(/(\.[^.]*)?$/, `.${hash}$1`) : false,
            publicPath: false,
        }),

        new HtmlWebpackDeployPlugin({
            assetsPath: '/assets/',
            hash: isProd ? (assetName, hash) => assetName.replace(/(\.[^.]*)?$/, `.${hash}$1`) : false,
            publicPath: false,
            assets: {
                links: globalConfig.links,
            },
        }),

        new ForkTsCheckerWebpackPlugin(),
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
                        },
                    },
                ],
            },

            // Images: Copy images to build folder
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/i,
                type: 'asset/resource',
            },

            // Fonts: Copy fonts to build folder
            {
                test: /fonts\/.*\.(woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]',
                },
            },

            // SVG Icons: Content to use with preact component
            {
                test: /icons\/.*\.svg/,
                type: 'asset/inline',
                generator: {
                    dataUrl: (content, data) => {
                        const contentString = content.toString();

                        return [
                            `#sprite-${path.parse(data.filename).name}`,
                            (contentString.match(/viewBox="([^"]+)"/) || [])[1] || '',
                            // content: contentString.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)[1] || ''
                        ];
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
