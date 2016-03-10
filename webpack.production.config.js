const path = require('path');
const webpack = require('webpack');
const config = require('./config')

module.exports = {
  devtool: 'source-map',
  entry: [
    'bootstrap-loader',
    'babel-polyfill',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: './static/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
  module: {
    loaders: [{
      test: /\.jsx$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/
    },
    {
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/
    },
    {
      test: /\.json/,
      loaders: ['json-loader'],
      exclude: /node_modules/
    },
    {
      test: /\.sass$/,
      loaders: ["style", "css", "sass?indentedSyntax&sourceMap"]
    },
    {
      test: /\.(woff2?|ttf|eot|svg)$/,
      loaders: [ 'url?limit=10000' ]
    }
  ]}
};
