const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'bootstrap-loader',
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
      test: /\.jsx$|\.js$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/,
    },
    {
      test: /\.scss$|\.sass$/,
      loaders: ["style", "css", "sass?indentedSyntax&sourceMap"]
    },
    {
      test: /\.(woff2?|ttf|eot|svg)$/,
      loaders: [ 'url?limit=10000' ]
    }
  ]},
  postcss: [ autoprefixer ]
};
