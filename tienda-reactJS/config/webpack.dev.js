const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const helpers = require('./helpers');

const NODE_ENV = process.env.NODE_ENV;
const isProd = NODE_ENV === 'production';

var config = {
    entry: {
        'app': [
            helpers.root('client/app/index.js')
        ]
    },
    output: {
        path: helpers.root('dist'),
        filename: 'index.js',
        publicPath: '/'
    },
    devServer: {
        inline: true,
        port: 8080,
        historyApiFallback: true
    },

    module: {
        rules: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'react']
                }
            }, {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'url-loader?limit=10000',
                    'img-loader'
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    "babel-loader",
                    {
                        loader: "react-svg-loader",
                        options: {
                            svgo: {
                                plugins: [{
                                    removeTitle: false
                                }],
                                floatPrecision: 2
                            }
                        }
                    }
                ]
            }
        ],
    },

    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(NODE_ENV)
            }
        }),

        new HtmlWebpackPlugin({
            template: helpers.root('client/public/index.html'),
            inject: 'body'
        }),

        new CopyWebpackPlugin([{
            from: helpers.root('client/public')
        }])
    ]
};

module.exports = config;
