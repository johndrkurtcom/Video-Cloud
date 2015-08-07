var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./config.js').get(process.env.NODE_ENV);
var User = require('../models').User;

module.exports = function() {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById({
      profile: {
        id: profile.id
      }
    }, function(err, user) {
      if (user) {
        done(null, user);
      }
    });
  });

  passport.use(new FacebookStrategy({
      clientID: config.facebook.appid,
      clientSecret: config.facebook.appsecret,
      callbackURL: config.facebook.callback
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile)
      User.findOrCreate({
        profile: {
          id: profile.id
        }
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        console.log(user);
        done(null, user);
      });
    }
  ));
}