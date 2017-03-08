var settings = require('../settings/default')
var Twitter = require('./twitter')
var express = require('express')
var app = express()

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

app.get('/search/:hashtag', function (req, res) {
  var hashtag = req.params.hashtag
  var max_id = req.query.max_id
  var count = 60 //settings.app.tweet.numberPerRequest

  Twitter.get('search/tweets', { q: '#' + hashtag, count: count , since_id: max_id }, function(err, data, response) {
    res.send(data)
  })
})

app.listen(settings.API.port, function () {
  console.log(`Listening at ${settings.API.url}:${settings.API.port}`)
})
