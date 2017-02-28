var merge = require('webpack-merge')
var prodEnv = require('./config.prod.env')

// NODE_ENV development configuration

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
