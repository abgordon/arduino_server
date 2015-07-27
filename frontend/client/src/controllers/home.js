angular.module('app').controller('HomeController', [
  '$scope',
  '$http',
  '$interval',

  function($scope,$http, $interval){

    $scope.sent = [0];
    $scope.check_temp_data = []
    $scope.check_humidity_data = []



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

    $scope.getWidth = function(){
	  if (self.innerHeight) {
	    return self.innerWidth;
	  }

	  if (document.documentElement && document.documentElement.clientHeight) {
	    return document.documentElement.clientWidth;
	  }

	  if (document.body) {
	    return document.body.clientWidth;
	  }
	}


	
	$scope.resetForm = function(){
		$scope.sent=[0];
		$scope.check_data=[];
		$( "#graph" ).empty();
	}



	$scope.drawTempGraph = function(sent){
		var data = sent.data;
		var sorted = sent
		var tsv_data = []
		console.log("initializing graph with " + data.length + " data points.....");
		if (sent.data.length == 0){console.log("No user found!");return;}
		else if ($scope.check_temp_data == data){console.log("stopping propogation...");return;}
		else {
			$( "#graph" ).empty();
			



			//create d3 date parser
			var parseDate = d3.time.format("%d-%b-%y-%I-%M-%S").parse;


			//convert timestamp to appropriate d3 format
			data.forEach(function(d){ 				
				var currObj = {}
				var timestamp= new Date(d.timestamp * 1000);
				var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
				var month = months[timestamp.getMonth()];
				var date = timestamp.getDate();
				var year = timestamp.getFullYear()-2000;
			    var hour = timestamp.getHours();
			    var min = timestamp.getMinutes();
			    var sec = timestamp.getSeconds();
				var formatted_time = date + '-'+ month + '-' + year + '-' + hour + '-' + min + '-' + sec;
				var temp_c = (d.temp_c);
				var temp_f = (+temp_c)*1.8 + 32
				var h = (+(d.rel_h))*0.01;
				currObj['date']= parseDate(formatted_time);
				currObj['temp']= temp_f;
				currObj['rel_h'] = h;

				AM_PM = "AM"
				if (hour > 12){
					hour-= 12;
					AM_PM = "PM"
				}
				if (sec < 10){
					sec = "0" + sec;
				}

				var monthNum = {'Jan':'01', 'Feb':02,'Mar':03,'Apr':04,'May':05,'Jun':06,'Jul':07,'Aug':08,'Sep':09,'Oct':10,'Nov':11,'Dec':12}
				currObj['date_unparsed'] = date + '-'+ monthNum[month] + '-' + year + ', ' + hour + ':' + min + ':' + sec + " " + AM_PM;
				

				var Td = temp_f - ((100 - h)/5)
				currObj["dew_point"] = Td
				tsv_data.push(currObj);
			});

				
			//set bounds
			var margin = {top: 20, right: 20, bottom: 30, left: 50},
			    width = 960 - margin.left - margin.right,
			    height = 500 - margin.top - margin.bottom;

			var x = d3.time.scale()
			    .range([0, width]);

			var y = d3.scale.linear()
				.domain([0,100])
			    .range([height, 0]);

			var xAxis = d3.svg.axis()
			    .scale(x)
			    .orient("bottom");

			var yAxis = d3.svg.axis()
			    .scale(y)
			    .orient("left")


			var t_line = d3.svg.line()
			    .x(function(d) { return x(d.date); })
			    .y(function(d) { return y(d.temp); })
			    .interpolate("basis");

			var h_line = d3.svg.line()
			    .x(function(d) { return x(d.date); })
			    .y(function(d) { return y(d.temp* d.rel_h); })
			    .interpolate("basis");

			var dew_line = d3.svg.line()
				.x(function(d) { return x(d.date); })
			    .y(function(d) { return y(d.dew_point); })
			    .interpolate("basis");




			var tip = d3.tip()
			  .attr('class', 'd3-tip')
			  .attr('r', 50)
			  .offset([0, 0])
			  .html(function(d) {

				var coordinates = [0, 0];
				coordinates = d3.mouse(this);
				var x = coordinates[0];

				var r = d.length/width
				var i = Math.round( x*r );

				//barely working rule, this breaks the tooltip tho
				// d3.select('#graph').on('mousemove', function() {
				// 	var xpos = d3.event.pageX
				// 	var rule = d3.select('#graph').selectAll('div.rule').data([0]);
				// 	rule.enter().append('svg')
				// 		.attr('class', 'rule')
				// 		.append('span');
				// 	rule.style('left', (xpos-300) + 'px');
				// 	rule.select('span').text(xpos);
				// 						});				

			    return "Date: <span style='color:black'>" + d[i].date_unparsed + "<br></span>\n"
			    		+ "Temp: <span style='color:black'>" + d[i].temp + "˚ F  <br></span>"
			    		+ "Rel. H: <span style='color:black'>" + (d[i].rel_h)*100 + "%" + "<br></span>"
			    		+ "Dew Point: <span style='color:black'>" + d[i].dew_point + "˚ F</span><br>";

			  })
			

			var svg = d3.select("#graph").append("svg")
			    .attr("width", width + margin.left + margin.right)
			    .attr("height", height + margin.top + margin.bottom)
			  .append("g")
			    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")



			svg.call(tip);


			

			$scope.check_temp_data = data;
			}

			//draw graph
			console.log("attempting to write from TSV....")
				tsv_data.forEach(function(d){

						  x.domain(d3.extent(tsv_data, function(d) { return d.date; }));
						  y.domain(d3.extent([0,100]));
						  x.domain += 10; // incredibly stupid fix; this crashes a graph draw so it only goes once
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
						      .text("Temp F and relative humidity");

						  svg.append("path")
						      .datum(tsv_data)
						      .attr("class", "t_line")
						      .attr("d", t_line)
						      .on('mousemove', tip.show)
						      .on('mouseout', tip.hide)

						  svg.append("path")
						      .datum(tsv_data)
						      .attr("class", "h_line")
						      .attr("d", h_line)
						      .on('mousemove', tip.show)
						      .on('mouseout', tip.hide)

      					  svg.append("path")
						      .datum(tsv_data)
						      .attr("class", "d_line")
						      .attr("d", dew_line)
						      .style("stroke-dasharray", ("3, 3")) 
						      .on('mousemove', tip.show)
						      .on('mouseout', tip.hide)

							
			//end forEach()
				});

 		
	//end drawGraph(data)
	}


    //end scope
   }

]);
