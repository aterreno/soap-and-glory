var buffer = {}

module.exports = {
  save: function (req, res) {
    buffer[req.params.cityName] = req.params.countryName;

    console.log(req.jsBody);

    res.sendStatus(201);
  },
  list: function (req, res) {
    res.sendData(buffer);
  }
}