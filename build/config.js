const path = require('path')
const pkg = require('../package.json')
const settings = require('../settings/default')

module.exports = {
  title: 'tweet-vr',
  build: {
    env: require('./config.prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true
  },
  dev: {
    env: require('./config.dev.env'),
    port: settings.client.port,
    proxyTable: {}
  },
  client: {
    url: settings.client.url,
    port: settings.client.port
  },
  API : {
    url: settings.API.url,
    port: settings.API.port
  }
}
