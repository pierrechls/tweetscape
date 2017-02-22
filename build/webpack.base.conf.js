var path = require('path')
var config = require('./config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var webpack = require('webpack')

var program = require('commander')
program
  .option('-t, --target [value]', 'bundle target.')
  .parse(process.argv)

module.exports = {
  entry: {
    app: './client/index.js'
  },
  output: {
    path: config.build.assetsRoot,
    // this causes absolute path in builds, which makes them non-distribuable on an other machine
    // we may not need this in nd at all
    // so let's remove it on august, 22th 2016 if no one complains
    //publicPath: config.build.assetsPublicPath,
    filename: '[name].js'
  },
  target: program.target || 'web',
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'client': path.resolve(__dirname, '../client'),
      'views': path.resolve(__dirname, '../client/views'),
      'utils': path.resolve(__dirname, '../client/utils'),
      'assets': path.resolve(__dirname, '../client/assets'),
      'components': path.resolve(__dirname, '../client/components'),
      'settings': path.resolve(__dirname, '../settings'),
      'locales': path.resolve(__dirname, '../locales'),
      'data': path.resolve(__dirname, '../client/data'),
      'lib': path.resolve(__dirname, '../client/lib'),
      'store': path.resolve(__dirname, '../client/store')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  vue: {
    autoprefixer: {
      browsers: ['last 2 versions']
    }
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  vue: {
    loaders: utils.cssLoaders()
  },
  plugins: [ new webpack.DefinePlugin({ 'global.GENTLY': false }) ],
  externals: [
    (function () {
      var IGNORES = [
        'electron'
      ];
      return function (context, request, callback) {
        if (IGNORES.indexOf(request) >= 0) {
          return callback(null, "require('" + request + "')");
        }
        return callback();
      };
    })()
  ]
}
