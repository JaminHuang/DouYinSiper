/**
 * 创建时间：2016年11月14日 15:15:14
 * 创建人：JaminHuang
 * 描述：调试配置文件
 */
'use strict';
var path = require('path');
var webpack = require('webpack');

var config = {
    devtool: 'source-map',
    entry: {
        app: ['webpack-dev-server/client?http://localhost:3000', 'webpack/hot/dev-server', './src/index']
    },
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '/public/',
        //chunkFilename: '[id].chunk.js',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {test: /\.css$/, loaders: ['style/useable', 'css']},
            {test: /\.json$/, loader: "json"},
            {test: /\.js$/, loader: 'babel', include: path.join(__dirname, 'src')}
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //new webpack.optimize.CommonsChunkPlugin('shared.js'),
        new webpack.DefinePlugin({
            'process.env': {
                'DEBUG': true
            }
        })
    ]
};
module.exports = config;