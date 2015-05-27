var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var http = require('http');
var routes = require('../routes/index');
var users = require('../routes/users');


var db = require('./mongo.js');

var Sensor_data = db.read_init('wifi_readout');

var app = express();
// view engine setup
app.set('port', 3000);
app.set('views', './views')
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log("Listening on port "+ app.get('port'));
})





app.get('/', function(req,res){

	Sensor_data.find().exec(function(err, leads){
		console.log(leads[0])
  res.render('index', { title: 'Bloom', message: 'Current Reading:', json_info: leads});
});
});













// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });




// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

