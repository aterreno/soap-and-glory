var express = require('express');
var app = express();
var v1 = require('./routes/v1');
var v2 = require('./routes/v2');
var contentTypes = require('./middlewares/contentTypes');
var bodyParser = require('./middlewares/bodyParser');

app.use(contentTypes());
app.use(bodyParser());
app.use('/v1', v1);
app.use('/v2', v2);

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Server listening at http://%s:%s', host, port);
});