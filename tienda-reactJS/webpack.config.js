const path = require('path');

var config = {
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, './'),
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
        }]
    },

    mode: 'development'
};

module.exports = config;
