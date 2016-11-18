var config  = require ('../build/config')
var Twitter = require('./twitter')
var express = require('express')
var app = express()

app.get('/banana', function (req, res) {
  Twitter.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
    console.log(data)
    res.send(data)
  })
})

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(config.apiPort, function () {
  console.log(`Listening at http://localhost:${config.apiPort}`)
})
