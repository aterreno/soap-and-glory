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

var v1 = express.Router();
var v2 = express.Router();
 
v1.use('/weather', express.Router()
  .get('/:countryName/:cityName', weather.getWeatherByCityAndCountry));
 
v2.use('/weather', express.Router()
  .get('/:countryName/:cityName', weather.getWeatherByCityAndCountry));
 
app.use('/v1', v1);
app.use('/v2', v2);

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Server listening at http://%s:%s', host, port)

});