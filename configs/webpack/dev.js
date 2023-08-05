const { merge } = require("webpack-merge");
const commonConfig = require("./common");
const Path = require('path');

module.exports = merge(commonConfig, {
  mode: "development",
  devtool: "inline-source-map",
  watch: true,
  watchOptions: {
    ignored: ["**/node_modules", "**/public"],
  },
  output: {
    filename: "[name].min.js",
    path: Path.resolve(__dirname, "../../public/apps"),
    publicPath: "/apps/",
  },
});