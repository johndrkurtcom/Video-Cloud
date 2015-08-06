var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./config.js').get(process.env.NODE_ENV);

passport.use(new FacebookStrategy({
    clientID: config.facebook.appID,
    clientSecret: config.facebook.appSecret,
    callbackURL: config.facebook.callback
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({
      profile.id: profile.id
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      done(null, user);
    });
  }
));