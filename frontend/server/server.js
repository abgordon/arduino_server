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
    app.set('port', 49152);
    app.set('env', process.env.NODE_ENV || 'development');

    app.use(favicon(__dirname + '/favicon.ico'));
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



    module.exports = app;
});
















