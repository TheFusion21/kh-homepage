const { merge } = require("webpack-merge");
const Path = require('path');

const commonConfig = require("./common");

module.exports = merge(commonConfig, {
  mode: "production",
  output: {
    filename: "[name].min.js",
    path: Path.resolve(__dirname, "../../public/apps"),
    publicPath: "/apps/",
  },
});