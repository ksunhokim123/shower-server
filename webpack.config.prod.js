var {resolve} = require('path');
var webpack =require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: [
        './index.tsx'
    ],
    output:{
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist')
    },
    resolve:{
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css']
    },
    context: resolve(__dirname, 'client'),
    module: {
        rules:[{
                test: /\.(ts|tsx)$/,
                use: ['awesome-typescript-loader']
            },{
                 test:/\.(s*)css$/,
                 use:ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'sass-loader', 'import-glob-loader'],
                }),
            },{
              test: /\.(ttf|eot|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              loader: "file-loader?name=fonts/[hash].[ext]",
            },{
              test: /\.(jpe?g|png|gif|svg)$/i,
              loader: "file-loader?name=imgs/[hash].[ext]"
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
      title: "code-shower-admin"
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      new webpack.optimize.UglifyJsPlugin(),
      new ExtractTextPlugin('bundle.css')]
};
