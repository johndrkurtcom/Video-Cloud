//require nessecssary stuff
var mongoose = require('mongoose');
var express = require('express');
var routes = require('./routes');
var morgan = require('morgan');
var config = require('./config');

// load database info based on NODE_ENV
config.db = config.db.get(process.env.NODE_ENV);

var app = express();
var port = process.env.PORT || 3000;

//connect to the database
mongoose.connect(config.db.database, function(err) {
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