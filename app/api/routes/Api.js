var Router          = require('koa-router');
var passport        = require('./passport');
var usersService    = require('../services/usersService');
var authService     = require('../services/authService');
var config          = require('../../config');
var Api             = new Router();

var bearer = passport.authenticate('bearer', {session: false});

Api.get('/users', bearer, function *() {
  var users = yield usersService.all();
  this.body = users;
});

Api.get('/users/:userId', bearer, function *() {
  var userId = this.params.userId;
  var user = yield usersService.findById(userId);

  this.body = user;
});

Api.put('/users/:userId', bearer, function *() {
  var id = this.params.userId;
  var body = this.request.body;

  try {
    var user = yield usersService.findByIdAndUpdate(id, body);
    this.body = user;
  }
  catch (err) {
    this.app.emit('error', err.stack, this);
  }
});

Api.post('/users', bearer, function *() {
  var body = this.request.body;
  var user = yield usersService.create(body);
  this.body = user;
});

Api.delete('/users/:userId', bearer, function *() {
  var userId = this.params.userId;

  try {
    yield usersService.destroy(userId);
    this.status = 200;
    this.body = 'OK';
  }
  catch (err) {
    this.app.emit('error', err, this);
  }

});

Api.post('/login', function *(next) {
  var ctx = this;

  yield* passport.authenticate('local', function* (err, token, info) {
    if (err) throw err;
    if (! token) {
      ctx.status = 404;
      ctx.body = {success: false};
    }
    else {
      yield ctx.login(token._user);
      ctx.body = {token: token.key};
    }
  }).call(this, next);
});

Api.post('/logout', function *(next) {
  this.req.logout();
  yield authService.logout(this.session.passport.user || null);
  this.body = {key: null};
});

Api.get('/request-token', function *(next) {
  if (this.session.passport.hasOwnProperty('user')) {
    this.body = {key: this.session.passport.user};
  }
  else {
    this.body = false;
  }
});

module.exports = Api;
