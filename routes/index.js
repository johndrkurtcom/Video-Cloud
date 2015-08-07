module.exports = function(app, passport) {
  app.get('/auth/facebook',
    passport.authenticate('facebook'),
    function(req, res) {});

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/success',
      failureRedirect: '/bad'
    }));

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  })
}