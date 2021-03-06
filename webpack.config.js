const { resolve } = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// Load dotenv
const dotenv = require('dotenv');

const dotenvResult = dotenv.config();
const dotEnvConfig = Object.keys(dotenvResult.parsed).reduce((result, key) => ({
    ...result,
    [key]: JSON.stringify(dotenvResult.parsed[key]),
}), {});

const config = {
    devtool: 'eval-source-map-inline',

    entry: {
        app: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            'raf/polyfill',
            'babel-polyfill',
            './index.js',
            './assets/css/main.css',
        ],
    },

    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dist'),
        publicPath: '',
        crossOriginLoading: 'anonymous',
    },

    context: resolve(__dirname, 'app'),

    target: 'web',

    devServer: {
        hot: true,
        contentBase: resolve(__dirname, 'build'),
        publicPath: '/',
        historyApiFallback: true,
        open: true,
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                test: /\.js$/,
                loaders: [
                    'babel-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                            },
                        },
                        'postcss-loader',
                    ],
                    publicPath: '../',
                }),
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            mimetype: 'image/png',
                            name: 'images/[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.eot(\?v=\d+.\d+.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            mimetype: 'application/font-woff',
                            name: 'fonts/[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            mimetype: 'application/octet-stream',
                            name: 'fonts/[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            mimetype: 'image/svg+xml',
                            name: 'images/[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new webpack.DefinePlugin({
            __DEV__: true,
            'process.env': {
                ...process.env,
                NODE_ENV: JSON.stringify('development'),
                ...dotEnvConfig,
            },
        }),
        new webpack.LoaderOptionsPlugin({
            test: /\.js$/,
            options: {
                eslint: {
                    configFile: resolve(__dirname, '.eslintrc'),
                    cache: false,
                },
            },
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: (module) => {
                return module.context && module.context.indexOf('node_modules') !== -1;
            },
        }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({ filename: './styles/style.css', disable: false, allChunks: true }),
        new CopyWebpackPlugin([{ from: 'vendors', to: 'vendors' }]),
        new webpack.HotModuleReplacementPlugin(),
    ],
    node: {
        fs: 'empty',
    },
};

module.exports = config;
