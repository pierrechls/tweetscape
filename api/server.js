var config  = require ('../build/config')
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
  Twitter.get('search/tweets', { q: '#' + hashtag, count: 100 }, function(err, data, response) {
    console.log(data)
    res.send(data)
  })
})

var stream = Twitter.stream('statuses/filter', { track: '#ALaCantineYaToujours' })

app.get('/stream', function (req, res) {
  stream.on('tweet', function (tweet) {
    console.log(tweet)
  })
})

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(config.apiPort, function () {
  console.log(`Listening at http://localhost:${config.apiPort}`)
})
