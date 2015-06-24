//curl -v http://52.26.172.154:49152/postdata -d "temp_f=28.40&relative_humidity=45.40"


// var x = {"fields": [{"temperature_c": "28.80", "relative_humidity": "44.40"}]}
// var y = {" body" : [{"temperature_c": "28.90"}]}
// var y = {"body":{"temperature_c":"29.00"}}


// var j = { '{"temp_f":"48.20","rel_h":"49.50"}': '' }
// var split = Object.keys(j);
// var split2 = split[0].split(",");
// var temp_val = split2[0].split(":")[1]
// var h_val = split2[1].split(":")[1]
// console.log(temp_val)

// var JSON_thing = "{\"username\" : \"abgordon\", \"temp_c\":"+temp_val + ", \"rel_h\":"+h_val
// var JSON_object = JSON.parse(JSON_thing)
// console.log(JSON_object.username);


console.log(Date.now());