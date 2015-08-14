var passport = require('passport');
var jwt = require('jwt-simple');
var isLoggedIn = require('../middleware').isLoggedIn;


module.exports = function(app, passport) {
  app.get('/auth/facebook',
    passport.authenticate('facebook'),
    function(req, res) {});

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));

  app.get('/auth/twitter',
    passport.authenticate('twitter'),
    function(req, res) {});

  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/login'
      }
      //   function(err, user) {
      //   console.log('Twitter authentication callback, source: routes/index.js');
      //   console.log('User: ', user);
      //   var token = jwt.encode(user, 'secret');
      //   // issue: there is no res here
      //   // res.json({
      //   //   token: token
      //   // });
      // }
    ),
    function(req, res, next) {
      console.log('Request:', req);
    });

  app.get('/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  })
}
