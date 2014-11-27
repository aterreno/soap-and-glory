var soap = require('soap');
var parse = require('xml2js').parseString;
var url = 'http://www.webservicex.net/globalweather.asmx?WSDL';

module.exports = {
  getWeatherByCityAndCountry: function (req, res) {
    soap.createClient(url, {}, function (err, client) {
      client.GetWeather({
        CityName: req.params.cityName,
        CountryName: req.params.countryName
      }, function (err, result) {
        parse(result.GetWeatherResult, function (err, obj) {
          res.sendData(obj);
        });
      });
    });
  }
};