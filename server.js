var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
      colors: true,
      hash: false,
      version: false,
      chunks: false,
      children: false
  }
}).listen(3000, 'localhost', function (err, result) {
    if (err) {
      console.log("Oops, there is an Error denis ! ", err);
    }

    console.log('Listening at localhost:3000');
  });
