var express = require('express');
var app = express();
var weather = require('./weather');
var xml2js = require('xml2js');
var builder = new xml2js.Builder();

app.use(function (req, res, next) {
  res.sendData = function (obj) {
    if (req.accepts('json')) {
      res.header('Content-Type', 'application/json');
      res.send(obj);
    } else if (req.accepts('application/xml')) {
      res.header('Content-Type', 'text/xml');
      res.send(builder.buildObject(obj));
    } else {
      res.send(406);
    }
  };

  next();
});

app.get('/', function (req, res) {
  var result = weather.getWeatherByCityAndCountry("Torino", "Italy", res);
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});