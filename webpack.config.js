const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const config = require('./config')

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:' + config.server.port,
    'webpack/hot/only-dev-server',
    'bootstrap-loader',
    'babel-polyfill',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx$/,
      loaders: ['babel'],
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
  ]},
  postcss: [ autoprefixer ]
};
