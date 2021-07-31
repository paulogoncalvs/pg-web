const paths = require('./paths');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

const copyWebpackPlugin = () =>
    new CopyWebpackPlugin({
        patterns: [
            {
                from: paths.public,
                to: ({ absoluteFilename }) => {
                    if (absoluteFilename.includes('/manifest/')) {
                        return '[path][name][ext]';
                    }

                    return `[path][name].${process.env.NODE_ENV === 'production' ? '[fullhash]' : ''}[ext]`;
                },
                globOptions: {
                    ignore: ['*.DS_Store'],
                },
            },
        ],
    });

const svgSpritemapPlugin = () =>
    new SVGSpritemapPlugin(paths.src + '/assets/icons/**/*.svg', {
        output: {
            filename: `assets/img/sprite.[hash].svg`,
        },
    });

module.exports = {
    copyWebpackPlugin,
    svgSpritemapPlugin,
};
