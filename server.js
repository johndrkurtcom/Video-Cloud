//require nessecssary stuff
var mongoose = require('mongoose');
var express = require('express');
var routes = require('./routes');
var morgan = require('morgan');
// load database info based on NODE_ENV
var config = require('./config/config.js').get(process.env.NODE_ENV);

var app = express();
var port = process.env.PORT || 3000;

//connect to the database
// 'mongodb://127.0.0.1:27017' instead config.database don't worry about this line I need it for my environment to work properly - Ian
mongoose.connect(config.database, function(err) {
  if (err) {
    console.log('Error connecting to the database');
    throw err;
  }
  routes(app);
  app.listen(port, function(err) {
    if (err) {
      console.log('Error connecting to the server');
      throw err;
    }
    console.log('server listening on: ', port);
  });
});


module.exports = app;