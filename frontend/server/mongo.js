var mongoose    = require('mongoose');

mongoose.connect('mongodb://abgordon3:treats123@ds061747.mongolab.com:61747/data_readout');

var Any = new mongoose.Schema({ any: mongoose.Schema.Types.Mixed },{ strict: false });
function read_init(db){
  return mongoose.model('Sensor_data', Any, db);
}


exports.read_init = read_init;

