var db           = require('./mongo.js');
var Sensor_data  = db.read_init('wifi_readout');
var AWS          = require('aws-sdk');
var consumer     = require('../consumer.js');
var Producer = require('sqs-producer');
AWS.config.loadFromPath('./config.json');
var producer = Producer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/282218789794/arduino_datapoints',
  region: 'us-west-2'
});

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
  //var sqs = new AWS.SQS();

  //SQS receive message failed: Inaccessible host: `sqs.us-west-2.amazonaws.com'. This service may not be available in the `us-west-2' region.
  //  -> DUFQ?
  app.post('/postdata', function (req, res) {

    console.log("packet:");
    console.log(Object.keys(req.body)[0]);
    var split = Object.keys(req.body)[0].split(":");
    
    var username = split[0]
    var temp_val = split[1];
    var h_val = split[2];
    var co2_val = split[3];

    var JSON_string = "{\"username\" : \""+username +"\", \"timestamp\": \"" + Date.now()/1000 + "\",\"co2\":\""+co2_val+ "\",\"temp_c\":\""+temp_val + "\", \"rel_h\":\""+h_val+"\"}"


    producer.send([{
    id: "id1",
    body: JSON_string
    }], function(err) {
      if (err) console.log(err);
    });

  // sqs.sendMessage(buildParams(JSON_string), function(err, data) {
  //         if (err) console.log(err, err.stack); // an error occurred
  //         else     console.log(data);           // successful response
  //       });

  // function buildParams(message){
  //   return {
  //     MessageBody: message, /* required */
  //     QueueUrl: 'https://sqs.us-west-2.amazonaws.com/282218789794/arduino_datapoints', /* required */
  //     DelaySeconds: 0,
  //   }
  // };



 });
  
};
//basement_co2basement_co2%3A%3A28.5028.50%3A%3A38.4038.40%3A%3A451451

//curl -H "Content-Type: application/json" -X POST -d '{"username":"xyz","password":"xyz"}' http://localhost:3000/api/login
