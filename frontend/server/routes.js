var db        = require('./mongo.js');
var Sensor_data = db.read_init('wifi_readout');
// var moment = require('moment');

module.exports = function(app){


  app.get('/', function(req,res){

	res.render('index');

  });

  app.get('/getinfo', function(req,res){

    Sensor_data.find().exec(function(err, leads){

    	//console.log(leads[0])
    	res.send(leads)
    	//res.render('index', { title: 'Bloom', message: 'Current Reading:', json_info: leads});
    });
  });


  app.get('/retrieveUser', function(req, res){
    if(req.query.user){
      var quer = Sensor_data.find( {"username":req.query.user}).sort( {timestamp: 1});
      quer.exec(function(err, data){
        if (err) throw err
        res.status(200).send(data);
      })

      // Sensor_data.find( {"username":req.query.user} ).find(function(err, data){
      //   if(err) throw err;
      //   res.status(200).send(data)
      // });
    }
  });


  app.post('/postdata', function (req, res) {
  	//super-janky endpoint for writing to DB
  	console.log("writing following data to DB:");
	console.log("\nREQ.QUERY");
	console.log(req.query); 
	console.log("\nREQ.QUERY.KEYs*************************");
	console.log(Object.keys(req.query));

	console.log(req);
	console.log(res);
	console.log(req.body);
 });
  
};

//curl -H "Content-Type: application/json" -X POST -d '{"username":"xyz","password":"xyz"}' http://localhost:3000/api/login
