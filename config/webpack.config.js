const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry:{
    index: path.resolve(__dirname, '../index.js'),
    vendors: path.resolve(__dirname, '../index.vendors.js'),
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].bundle.js',
  },
  devtool: "source-map", // any "source-map"-like devtool is possible

  module: {
    rules: [
      {
        test: /\.(html)$/, // Only .html files
        loader: 'html-loader' // Run html loader
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader', // Run both loaders
      },
      {
        test: /\.s[a|c]ss$/,
        use: ExtractTextPlugin.extract({
          use: [{
              loader: "css-loader"
          }, {
              loader: "sass-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
        }),
      },
      {
        test: /\.(png|jpg|jpeg|woff|woff2|eot|ttf|svg)/,
        loader: 'url-loader?limit=100000'
      },
      { 
        test: /\.(es6|js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
    noParse: [path.join(__dirname, 'node_modules/handsontable/dist/handsontable.js')]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new ExtractTextPlugin("styles.css"),
  ]
};

