var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var port = process.env.PORT || 3000

var config = {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'src/index.js')
  ],
  devtool: 'eval-cheap-module-source-map',
  output: {
    path: path.resolve('./dist/'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.purs$/,
        loader: 'purs-loader',
        exclude: /node_modules/,
        query: {
          bundle: false,
          psc: 'psa',
          pscIde: false
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolveLoader: {
    modules: [
      path.join(__dirname, 'node_modules')
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      'bower_components'
    ],
    extensions: ['.purs', '.js']
  }
}

// If this file is directly run with node, start the development server
// instead of exporting the webpack config.
if (require.main === module) {
  var compiler = webpack(config)
  var express = require('express')
  var app = express()

  // Use webpack-dev-middleware and webpack-hot-middleware instead of
  // webpack-dev-server, because webpack-hot-middleware provides more reliable
  // HMR behavior, and an in-browser overlay that displays build errors
  app
    .use(express.static('./static'))
    .use(require('connect-history-api-fallback')())
    .use(require('webpack-dev-middleware')(compiler, {
      publicPath: '/',
      stats: {
        hash: false,
        timings: false,
        version: false,
        assets: false,
        errors: true,
        colors: false,
        chunks: false,
        children: false,
        cached: false,
        modules: false,
        chunkModules: false
      }
    }))
    .use(require('webpack-hot-middleware')(compiler))
    .listen(port)
} else {
  module.exports = config
}
