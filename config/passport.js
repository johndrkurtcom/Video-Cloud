var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var config = require('./config.js').get(process.env.NODE_ENV);
var User = require('../models').User;

module.exports = function() {
  passport.serializeUser(function(user, done) {
    console.log('serializeUser');
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log('deserializeUser');
    User.findById(id, function(err, user) {
      if (err) throw err;
      if (user) {
        done(null, user);
      }
    });
  });

  passport.use(new TwitterStrategy({
      consumerKey: config.twitter.consumerKey,
      consumerSecret: config.twitter.consumerSecret,
      callbackURL: config.twitter.callbackURL
    },
    function(token, tokenSecret, profile, done) {
      User.findOrCreate({
        'twitter.id': profile.id,
        'twitter.token': token,
        'twitter.displayName': profile.displayName,
        'twitter.username': profile.username,
        username: profile.username
      }, function(err, user, created) {
        if (err) {
          return done(err);
        }
        done(null, user);
      });
    }
  ));

  passport.use(new FacebookStrategy({
      clientID: config.facebook.appid,
      clientSecret: config.facebook.appsecret,
      callbackURL: config.facebook.callback
    },
    function(accessToken, refreshToken, profile, done) {
      console.log('FB PROFILE', profile);
      User.findOrCreate({
        'facebook.id': profile.id,
        'facebook.token': accessToken,
        'facebook.name': profile.displayName,
        username: profile.displayName
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        done(null, user);
      });
    }
  ));
}
