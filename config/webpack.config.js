const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:{
    index: path.resolve(__dirname, '../index.js'),
    vendors: path.resolve(__dirname, '../index.vendors.js'),
    cluster: path.resolve(__dirname, '../app/js/cluster-table.js')
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(html)$/, // Only .html files
        loader: 'html-loader' // Run html loader
      },
      {
        test: /\.txt$/,
        use: 'raw-loader'
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
        test: /\.pug$/,
        loader: 'pug-loader'
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
    new HtmlWebpackPlugin({
      title: 'index',
      chunkSortMode: 'dependency',
      filename: path.resolve(__dirname, '../views/index.html'),
      hash: false,
      alwaysWriteToDisk: true,
      inject: true,
      chunks: ['index'],
      template: path.resolve(__dirname, '../index.pug')
    }),
    new HtmlWebpackPlugin({
      title: 'cluster',
      chunkSortMode: 'dependency',
      filename: path.resolve(__dirname, '../views/cluster-table.html'),
      hash: false,
      alwaysWriteToDisk: true,
      inject: true,
      chunks: ['cluster'],
      template: path.resolve(__dirname, '../cluster-table.pug')
    }),
    new HtmlWebpackPlugin({
      title: 'validate',
      chunkSortMode: 'dependency',
      filename: path.resolve(__dirname, '../views/validate-table.html'),
      hash: false,
      alwaysWriteToDisk: true,
      inject: true,
      chunks: ['validate'],
      template: path.resolve(__dirname, '../validate-table.pug')
    }),
  ]
};

