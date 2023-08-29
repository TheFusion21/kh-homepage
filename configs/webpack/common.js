const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: {
    weather: './src/Weather/index.tsx',
    instaclone: './src/Instaclone/index.tsx',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [new TsconfigPathsPlugin({
      configFile: Path.resolve(__dirname, "../../tsconfig.json"),
    })]
  },
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
      template: './src/index.html',
      chunks: ['weather'],
      filename: 'weather.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['instaclone'],
      filename: 'instaclone.html'
    }),
  ],
};