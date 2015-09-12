//is this implementation correct; delegate queue to another server?


var AWS          = require('aws-sdk');
  
AWS.config.loadFromPath('./config.json');

// dotenv.load();
var sqs    = new AWS.SQS();

function buildParams(body){
  return {
    MessageBody: body, /* required */
    QueueUrl: 'https://sqs.us-west-2.amazonaws.com/282218789794/arduino_datapoints', /* required */
    DelaySeconds: 0,
    // MessageAttributes: {
    //   someKey: {
    //     DataType: 'String' /* required */
    //     StringValue: 'tweet'
    //   },
    // }
  }
};

