var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var request = require('request');
var http = require('http');
var routes = require('./routes');
var fs = require('fs');
var serveStatic= require('serve-static');

fs.realpath(__dirname + '/../', function (err, projectRoot) {

	var app = express();
	app.set('port', 3000);
	app.use(favicon(__dirname + '/public/favicon.ico'));
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	routes(app);
    app.set('views', projectRoot + '/server/views');
	app.set('view engine', 'jade');


	app.use(serveStatic(projectRoot + '/client/src'));
	app.use(serveStatic(projectRoot + '/client/vendor'));
	app.use(serveStatic(projectRoot + '/client/partials'));
	app.use(serveStatic(projectRoot + '/client/styles'));




	var server = http.createServer(app);
	server.listen(app.get('port'), function(){
	  console.log("Listening on port "+ app.get('port'));
	})

	
	console.log("Project root is:");
	console.log(projectRoot);

	console.log("currently serving:");
	console.log(projectRoot + '/client/vendor');
	console.log(projectRoot + '/client/src');
	console.log(projectRoot + '/client/partials');
	console.log(projectRoot + '/client/styles');
	console.log(projectRoot + '/client/src/controllers');

	module.exports = app;
});
















