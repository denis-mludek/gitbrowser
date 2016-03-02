const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('./webpack.config')
const config = require('./config')

new WebpackDevServer(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    hash: false,
    version: false,
    chunks: false,
    children: false
  }
}).listen(config.server.port, 'localhost', function (err, result) {
  if (err) {
    console.warn("Oops, there is an Error denis ! ", err)
  }
  console.log('Listening at localhost:', config.server.port)
})
