var settings = require('../settings/default')
var Twitter = require('./twitter')
var express = require('express')
var app = express()

var port = process.env.PORT || settings.API.port
var url = process.env.PORT ? "localhost" : settings.API.port

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

app.get('/search/:hashtag', function (req, res) {
  var hashtag = req.params.hashtag
  Twitter.get('search/tweets', { q: '#' + hashtag, count: settings.app.tweet.numberPerRequest }, function(err, data, response) {
    console.log(data)
    res.send(data)
  })
})

app.listen(port, function () {
  console.log(`Listening at ${url}:${port}`)
})
