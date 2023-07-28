const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './index.tsx',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    context: Path.resolve(__dirname, "../../src"),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ["babel-loader"],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: "asset/resource",
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CopyPlugin({
            patterns: [
                {from: "public", to: Path.resolve(__dirname, "../../dist")}
            ]
        })
    ]
};