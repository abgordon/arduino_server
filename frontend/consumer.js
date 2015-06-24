'use strict';

var db = require('./server/mongo.js').read_init('wifi_readout');
var AWS          = require('aws-sdk');
  
AWS.config.loadFromPath('./config.json');




var sqs    = new AWS.SQS();
var params = {
  QueueUrl: "https://sqs.us-west-2.amazonaws.com/282218789794/arduino_datapoints", /* required */
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