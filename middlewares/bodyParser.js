var parse = require('xml2js').parseString;

module.exports = function () {
  return function (req, res, next) {
    var data = '';
    req.setEncoding('utf8');
    req.on('data', function (chunk) {
      data += chunk;
    });
    req.on('end', function () {
      if (req.get('Content-Type') === 'application/json') {        
        req.jsBody = JSON.parse(data);
      } else if (req.get('Content-Type') === 'application/xml') {
        parse(data, function (err, obj) {
          req.jsBody = obj;
        });
      }
      next();
    });
  }
}