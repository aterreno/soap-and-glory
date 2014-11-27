var express = require('express');
var v2 = express.Router();
var weather = require('../controllers/weather');

v2.use('/weather', express.Router()
  .get('/:countryName/:cityName', weather.getWeatherByCityAndCountry));

module.exports = v2;