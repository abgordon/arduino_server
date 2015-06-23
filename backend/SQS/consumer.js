'use strict';

var db = require('../../frontend/server/mongo.js').read_init('wifi_readout');
var AWS          = require('aws-sdk');
  
AWS.config.loadFromPath('../config.json');

// var client = new Client('localhost:2181');
// var topics = [
//         {topic: topic, partition: 0}
//     ],
//     options = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024*1024 };

// var consumer = new Consumer(client, topics, options);
// var offset = new Offset(client);

// consumer.on('message', function (message) {


  var sqs    = new AWS.SQS();
var params = {
  QueueUrl: "ec2-52-26-172-154.us-west-2.compute.amazonaws.com/postdata", /* required */
  AttributeNames: [
    'All'
  ],
  MessageAttributeNames: [
    'message',
  ],
  VisibilityTimeout: 0,
  WaitTimeSeconds: 0
};

sqs.receiveMessage(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});