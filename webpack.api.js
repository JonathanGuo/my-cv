const webpack = require('webpack');
const { resolve } = require('path');

const config = {
    devtool: 'eval-source-map-inline',

    entry: {
        api: [
            'babel-polyfill',
            './api/index.js',
        ],
    },

    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dist/api'),
        publicPath: '',
        crossOriginLoading: 'anonymous',
    },

    target: 'node',

    watch: true,

    module: {
        loaders: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    configFile: resolve(__dirname, 'api/.eslintrc'),
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },

    node: {
        __dirname: false,
        __filename: false,
    },

    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
        }),
    ],
};

module.exports = config;
