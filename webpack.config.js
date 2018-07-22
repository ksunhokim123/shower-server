var {resolve} = require('path');
var webpack =require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        './index.tsx'
    ],
    output:{
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist'),
        publicPath: 'assets/'
    },
    resolve:{
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css']
    },
    context: resolve(__dirname, 'public'),
    devtool: 'cheap-module-source-map',
    devServer:{
        contentBase: resolve(__dirname, 'dist'),
        publicPath: '/assets/',
    },
    module: {
        rules:[{
                test: /\.(ts|tsx)$/,
                use: ['awesome-typescript-loader']
            },{
                 test:/\.(s*)css$/,
                 use:['style-loader','css-loader', 'sass-loader', 'import-glob-loader']
            },{
              test: /\.(ttf|eot|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              loader: "file-loader?name=fonts/[hash].[ext]",
            },{
              test: /\.(jpe?g|png|gif|svg)$/i,
              loader: "file-loader?name=imgs/[hash].[ext]"
            }
        ]
    }
};
