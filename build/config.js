'use strict'
const pkg = require('../package')
const settings = require('../settings/default')

module.exports = {
  title: 'tweet-vr',
  client: {
    url: settings.client.url,
    port: settings.client.port
  },
  API : {
    url: settings.API.url,
    port: settings.API.port
  },
  vendor: Object.keys(pkg.dependencies),
  babel: {
    babelrc: false,
    presets: [
      ['es2015', {modules: false}],
      'stage-1'
    ],
    plugins: [
      'transform-vue-jsx'
    ]
  },
  postcss: [
    require('autoprefixer')({
      // Vue does not support ie 8 and below
      browsers: ['last 2 versions', 'ie > 8']
    }),
    require('postcss-nested')
  ],
  cssModules: true,
}
