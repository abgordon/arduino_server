var db = require('./mongo.js');
var Sensor_data = db.read_init('wifi_readout');


module.exports = function(app){



	// app.get('/', function(req,res){

	// 	Sensor_data.find().exec(function(err, leads){
	// 		//console.log(leads[0])
	//   res.render('index', { title: 'Bloom', message: 'Current Reading:', json_info: leads});
	// 	});
	// });

  app.get('/', function(req, res) {
    res.render('index');
  });






	// ***** default stuff ***** //

	// catch 404 and forward to error handler
	// app.use(function(req, res, next) {
	//   var err = new Error('Not Found');
	//   err.status = 404;
	//   next(err);
	// });

	// error handlers

	// development error handler
	// will print stacktrace
	// if (app.get('env') === 'development') {
	//   app.use(function(err, req, res, next) {
	//     res.status(err.status || 500);
	//     res.render('error', {
	//       message: err.message,
	//       error: err
	//     });
	//   });
	// }

	// production error handler
	// no stacktraces leaked to user
	// app.use(function(err, req, res, next) {
	//   res.status(err.status || 500);
	//   res.render('error', {
	//     message: err.message,
	//     error: {}
	//   });
	// });
}





// old index.js

// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

