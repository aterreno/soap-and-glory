var express = require('express');
var v1 = express.Router();
var weather = require('../controllers/weather');
var buffer = require('../controllers/buffer');

v1.use('/weather', express.Router()
  .get('/:countryName/:cityName', weather.getWeatherByCityAndCountry));

v1.use('/buffer', express.Router()
  .post('/:countryName/:cityName', buffer.save));

v1.use('/buffer', express.Router()
  .get('/', buffer.list));

v1.use('/buffer', express.Router()
  .post('/', buffer.save));

module.exports = v1;
