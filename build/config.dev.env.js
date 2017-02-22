var merge = require('webpack-merge')
var prodEnv = require('./config.prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
