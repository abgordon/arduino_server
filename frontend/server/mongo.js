var mongoose    = require('mongoose');

mongoose.connect('mongodb://agordon:treats123@ds029824.mongolab.com:29824/sensor_db');

var Any = new mongoose.Schema({ any: mongoose.Schema.Types.Mixed },{ strict: false });
function read_init(db){
  return mongoose.model('Sensor_data', Any, db);
}


exports.read_init = read_init;

