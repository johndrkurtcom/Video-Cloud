//require nessecssary stuff
var mongoose = require('mongoose');
var express = require('express');
var session = require('express-session');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var sockets = require('./sockets');
var path = require('path');
var routes = require('./routes');
// load database info based on NODE_ENV
var config = require('./config/config.js').get(process.env.NODE_ENV);
var passport = require('passport');
require('./config/passport.js')(passport);

var port = process.env.PORT || 3000;

//connect to the database
mongoose.connect(config.database, function(err) {
  if (err) {
    console.log('Error connecting to the database');
    throw err;
  }
  app.use("/", express.static(path.join(__dirname, 'client')));

  routes(app, passport);
  app.use(passport.session);
  sockets(io);
  server.listen(port, function(err) {
    if (err) {
      console.log('Error connecting to the server');
      throw err;
    }
    console.log('server listening on: ', port);
  });
});


module.exports = app;