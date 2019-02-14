/**
 * 创建时间：2016年11月14日 15:38:25
 * 创建人：JaminHuang
 * 描述：发布配置文件
 */
'use strict';
var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: false,
    debug: false,
    stats: {
        colors: true,
        reasons: false
    },
    entry: './src/index',
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '/tvadmin/public/',
        chunkFilename: '[id].chunk.js',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
                'DEBUG': false
            }
        }),
        //new webpack.optimize.CommonsChunkPlugin('shared.js'),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {test: /\.css$/, loaders: ['style/useable', 'css']},
            {test: /\.json$/, loader: "json"},
            {test: /\.js$/, loader: "babel", exclude: /node_modules/}
        ]
    }
};