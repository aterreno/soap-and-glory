var express = require('express');
var app = express();
var v1 = require('./routes/v1');
var v2 = require('./routes/v2');
var contentTypes = require('./middlewares/contentTypes');
var bodyParser = require('./middlewares/bodyParser');
var cluster = require('cluster');

if (cluster.isMaster) {
  var cpuCount = require('os').cpus().length;

  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }
} else {
  app.use(contentTypes());
  app.use(bodyParser());
  app.use('/v1', v1);
  app.use('/v2', v2);

  var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Server listening at http://%s:%s - cluster.worker.id:%s', host, port, cluster.worker.id);
  });
}

cluster.on('exit', function (worker) {
  console.log('Worker ' + worker.id + ' died :(');
  cluster.fork();
});