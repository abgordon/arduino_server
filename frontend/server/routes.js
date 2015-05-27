
var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log("Listening on port "+ app.get('port'));
})





app.get('/', function(req,res){


  //var dbFind = JSON.stringify(readouts.find({}));
  // console.log(dbFind)
  res.render('index', { title: 'Bloom', message: 'Current Reading:', json_info: Sensor_data.find({})});
});

