    //sample time converter
	function timeConverter(UNIX_timestamp){
	  var a = new Date(UNIX_timestamp*1000);
	  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	  var year = a.getFullYear()-2000;
	  var month = months[a.getMonth()];
	  var date = a.getDate();
	  var hour = a.getHours();
	  var min = a.getMinutes();
	  var sec = a.getSeconds();
	  var afternoon = "AM"
	  if (hour > 12){hour -= 12;afternoon = "PM"}
	  var time =  date+ '-' + month + '-' + year;
	  return time;
	}


var date = Date.now()/1000


var convert= timeConverter(date);
console.log(convert)