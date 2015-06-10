angular.module('app').controller('HomeController', [
  '$scope',
  '$http',
  '$interval',

  function($scope,$http, $interval){

    $scope.sent = [0];
    $scope.check_data = []
    // $scope.query = function(){
    // 	$http({
    // 		method: 'GET',
    // 		url: '/getinfo',
    // 		params: {}
    // 	}).then(function(data_readout){
    // 		$scope.sent = data_readout;
    // 	})
    // }


    $scope.query = function(){
    	console.log("init query....");
    	$http({
    		method: 'GET',
    		url: '/retrieveUser',
    		params: {user:$scope.user}
    	}).then(function(data_readout){
    		$scope.sent = data_readout;
    	})
    }


    //sample time converter
	// function timeConverter(UNIX_timestamp){
	//   var a = new Date(UNIX_timestamp*1000);
	//   var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	//   var year = a.getFullYear()-2000;
	//   var month = months[a.getMonth()];
	//   var date = a.getDate();
	//   var hour = a.getHours();
	//   var min = a.getMinutes();
	//   var sec = a.getSeconds();
	//   var afternoon = "AM"
	//   if (hour > 12){hour -= 12;afternoon = "PM"}
	//   var time =  date+ '-' + month + '-' + year;
	//   return time;
	// }

	
	$scope.resetForm = function(){
		$scope.sent=[0];
		$scope.check_data=[];
		$( "#graph" ).empty();
		//d3.select("#graph").remove()
	}

	$scope.drawGraph = function(sent){
		var data = sent.data;
		var sorted = sent
		var tsv_data = []

		if (sent.data.length == 0){console.log("No user found!");return;}
		else if ($scope.check_data == data){console.log("stopping propogation...");return;}
		else {
			$( "#graph" ).empty();
			



			//create d3 date parser
			var parseDate = d3.time.format("%d-%b-%y").parse;


			//convert timestamp to appropriate d3 format
			data.forEach(function(d){ 
				var currObj = {}
				var timestamp= new Date(d.timestamp * 1000);
				var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
				var month = months[timestamp.getMonth()];
				var date = timestamp.getDate();
				var year = timestamp.getFullYear()-2000;
				var seconds = timestamp.getSeconds()
				var formatted_time = date + '-'+ month + '-' + year;
				var temp_f = (d.fields[0].temperature_f);
				currObj['date']= parseDate(formatted_time);
				currObj['temp']= +temp_f
				tsv_data.push(currObj);
			});


			//set bounds
			var margin = {top: 20, right: 20, bottom: 30, left: 50},
			    width = 960 - margin.left - margin.right,
			    height = 500 - margin.top - margin.bottom;

			var x = d3.time.scale()
			    .range([0, width]);

			var y = d3.scale.linear()
			    .range([height, 0]);

			var xAxis = d3.svg.axis()
			    .scale(x)
			    .orient("bottom");

			var yAxis = d3.svg.axis()
			    .scale(y)
			    .orient("left");

			var line = d3.svg.line()
			    .x(function(d) { return x(d.date); })
			    .y(function(d) { return y(d.temp); });

			var svg = d3.select("#graph").append("svg")
			    .attr("width", width + margin.left + margin.right)
			    .attr("height", height + margin.top + margin.bottom)
			  .append("g")
			    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


			//draw graph
			console.log("attempting to write from TSV....")
				tsv_data.forEach(function(d){

						  x.domain(d3.extent(tsv_data, function(d) { return d.date; }));
						  y.domain(d3.extent(tsv_data, function(d) { return d.temp; }));


						  svg.append("g")
						      .attr("class", "x axis")
						      .attr("transform", "translate(0," + height + ")")
						      .call(xAxis);

						  svg.append("g")
						      .attr("class", "y axis")
						      .call(yAxis)
						    .append("text")
						      .attr("transform", "rotate(-90)")
						      .attr("y", 6)
						      .attr("dy", ".71em")
						      .style("text-anchor", "end")
						      .text("Temp F");

						  svg.append("path")
						      .datum(tsv_data)
						      .attr("class", "line")
						      .attr("d", line);
			//end forEach()
				});
		
			$scope.check_data = data;
			}

  		

	//end drawGraph(data)
	}
   

    //end scope
   }

]);
