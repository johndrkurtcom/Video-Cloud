//require nessecssary stuff
var mongoose = require('mongoose');
var app = require('express').createServer();
var io = require('socket.io')(app);
var routes = require('./routes');
var morgan = require('morgan');
// load database info based on NODE_ENV
var config = require('./config/config.js').get(process.env.NODE_ENV);

var port = process.env.PORT || 3000;

//connect to the database
// 'mongodb://127.0.0.1:27017' instead config.database don't worry about this line I need it for my environment to work properly - Ian
mongoose.connect(config.database, function(err) {
  if (err) {
    console.log('Error connecting to the database');
    throw err;
  }
  routes(app);
  sockets(io);
  app.listen(port, function(err) {
    if (err) {
      console.log('Error connecting to the server');
      throw err;
    }
    console.log('server listening on: ', port);
  });
});


module.exports = app;