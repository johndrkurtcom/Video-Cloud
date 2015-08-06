//require nessecssary stuff
var mongoose = require('mongoose');
var express = require('express');
var routes = require('routes');
var morgan = require('morgan');

var app = express();

var host = 'http://127.0.0.1';
var port = process.env.PORT || 3000; 

//connect to the database
mongoose.connect('mongodb://127.0.0.1/videoCloud', function(err){
  if(err){
    console.log('Error connecting to the database')
    throw err;
  }
  routes(app);
  app.listen(port, host, function(err){
    if(err){
      console.log('Error connecting to the server');
      throw err;
    }
    console.log('server listening on http//%/%', host, port);
  });
});


module.exports = app;