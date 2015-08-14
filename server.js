//require nessecssary stuff
var mongoose = require('mongoose');
var express = require('express');
var session = require('express-session');


// Express middleware
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');

// Express instance
var app = express();
var server = require('http').Server(app);

// use mongo for session storage
var MongoStore = require('connect-mongo')(session);

// Setup Socket IO
var io = require('socket.io')(server);
var sockets = require('./sockets');

// Setup PassportJS
var passport = require('passport');
require('./config/passport.js')(passport);

// load configuration info based on NODE_ENV
var config = require('./config/config.js').get(process.env.NODE_ENV);

var routes = require('./routes');
var port = process.env.PORT || 3000;

//connect to the database
mongoose.connect(config.database, function(err) {
  if (err) {
    console.log('Error connecting to the database');
    throw err;
  }
  app.use("/", express.static(path.join(__dirname, 'client')));

  app.use(require('body-parser').urlencoded({
    extended: true
  }));

  // create a new session storage for express and passport
  var sessionStore = new MongoStore({
    mongooseConnection: mongoose.connection
  });

  app.use(session({
    secret: config.session.key,
    key: config.session.secret,
    store: sessionStore,
    resave: false,
    saveUninitialized: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  sockets(io, sessionStore);
  routes(app, passport);

  server.listen(port, function(err) {
    if (err) {
      console.log('Error connecting to the server');
      throw err;
    }
    console.log('Server listening on: ', port);
  });
});


module.exports = app;
