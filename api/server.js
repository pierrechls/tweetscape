var settings = require('../settings/default')
var Twitter = require('./twitter')
var express = require('express')
var app = express()

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*') // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE') // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type') // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Credentials', true) // Set to true if you need the website to include cookies in the requests sent
    next()
})

app.get('/search/:hashtag', function (req, res) {
  var hashtag = req.params.hashtag
  Twitter.get('search/tweets', { q: '#' + hashtag, count: settings.app.tweet.numberPerRequest }, function(err, data, response) {
    console.log(data)
    res.send(data)
  })
})

app.listen(settings.API.port, function () {
  console.log(`Listening at ${settings.API.url}:${settings.API.port}`)
})
