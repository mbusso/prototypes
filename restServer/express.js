var express = require('express'),
  mongoskin = require('mongoskin'),
  bodyParser = require('body-parser')
  logger = require('morgan')

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(logger('dev'))


app.get('/', function(req, res, next) {
  res.send('please select a collection')
})

app.post('/users/', function(req, res, next) {
 console.log(req.body);
 res.send(req.body);
})

app.listen(3000, function(){
  console.log('Express server listening on port 3000')
})

