const { merge } = require("webpack-merge");
const Path = require('path');

const commonConfig = require("./common");

module.exports = merge(commonConfig, {
  mode: "production",
  output: {
    filename: "js/[name].[contenthash].min.js",
    path: Path.resolve(__dirname, "../../dist"),
    publicPath: "/kh-homepage/",
  },
  devtool: "source-map",
});