var mongoose        = require('mongoose');
var passport        = require('koa-passport');
var LocalStrategy   = require('passport-local').Strategy;
var BearerStrategy  = require('passport-http-bearer').Strategy;

var User = mongoose.model('User');
var Token = mongoose.model('Token');

passport.serializeUser(function(user, done) {
  Token.findOne({_user: user.id}, function(err, token) {
    done(null, token.key);
  });
});

passport.deserializeUser(function(id, done) {
  Token.findOne({key: id})
    .populate('_user', '-password -__v')
    .exec(function(err, token) {
      if (err) {
        done(err, null);
      }
      else if (token) {
        done(null, token._user);
      }
      else {
        done(null, null);
      }
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
