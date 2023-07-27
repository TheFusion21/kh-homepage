const { merge } = require("webpack-merge");
const Path = require('path');

const commonConfig = require("./common");

module.exports = merge(commonConfig, {
  mode: "production",
  output: {
    filename: "js/bundle.[contenthash].min.js",
    path: Path.resolve(__dirname, "../../dist"),
    publicPath: "/",
  },
  devtool: "source-map",
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
});