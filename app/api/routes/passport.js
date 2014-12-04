var mongoose        = require('mongoose');
var passport        = require('koa-passport');
var LocalStrategy   = require('passport-local').Strategy;
var BearerStrategy  = require('passport-http-bearer').Strategy;

var User = mongoose.model('User');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  {usernameField: 'email', passwordField: 'password'},
  function(email, password, done) {
    var query = User.findOne({ email: email });

    query.select('password');
    query.exec(function(err, user) {
      if (err) return done(err);
      if (!user) return done(null, false);

      user.comparePassword(password, function(err, isMatch) {
        if (err) {
          return done(err);
        }
        else if (isMatch) {
          Token.findOrCreate({_user: user}, function(err, token) {
            if (err) done(err);
            return done(null, token);
          });
        }
        else {
          return done(null, false, {message: 'Invalid password' });
        }
      });
    });
  }
));

passport.use(new BearerStrategy(function(token, done) {
  Token.findOne({key: token}, function(err, token) {
    if (err) return done(err);
    if (! token) return done(null, false);

    User.findById(token._user, function(err, user) {
      return done(null, user, {scope: 'all'});
    });
  });
}));

module.exports = passport;
