var xml2js = require('xml2js');
var builder = new xml2js.Builder();

module.exports = function () {
  return function (req, res, next) {
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
  }
}