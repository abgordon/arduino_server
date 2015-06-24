var db           = require('./mongo.js');
var Sensor_data  = db.read_init('wifi_readout');
var AWS          = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

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






  //create SQS
  var sqs = new AWS.SQS();


  app.post('/postdata', function (req, res) {
  	//endpoint that writes to an SQS queue

  sqs.sendMessage(buildParams(JSON.stringify(req.body)), function(err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else     console.log(data);           // successful response
        });

  function buildParams(message){
    return {
      MessageBody: message, /* required */
      QueueUrl: 'https://sqs.us-west-2.amazonaws.com/282218789794/arduino_datapoints', /* required */
      DelaySeconds: 0,
    }
  };



 });
  
};

//curl -H "Content-Type: application/json" -X POST -d '{"username":"xyz","password":"xyz"}' http://localhost:3000/api/login
