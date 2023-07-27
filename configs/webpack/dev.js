const { merge } = require("webpack-merge");
const commonConfig = require("./common");

module.exports = merge(commonConfig, {
  mode: "development",
  devServer: {
    hot: true,
    historyApiFallback: true,
    compress: true,
    port: 3000,
    webSocketServer: 'ws',
  },
  devtool: "inline-source-map",
});