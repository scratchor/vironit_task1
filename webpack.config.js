/* eslint-disable */
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './front/src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    inline: true,
    port: 8080,
    open: 'Chrome',
    contentBase: './front/src',
    watchContentBase: true,    
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./front/src/html/index.html",
      filename: "./index.html"
    }),    
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
  ],
};