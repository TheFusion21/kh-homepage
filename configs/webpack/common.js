const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    weather: './Weather/index.tsx',
    modules: './SpaceXMap/index.tsx',
  },
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
      template: './index.html',
      chunks: ['weather'],
      filename: 'weather.html'
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      chunks: ['spaceXMap'],
      filename: 'spaceXMap.html'
    }),
  ],
};