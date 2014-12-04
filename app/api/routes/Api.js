var Router          = require('koa-router');
var passport        = require('./passport');
var usersService    = require('../services/usersService');
var tokensService   = require('../services/tokensService');
var Api             = new Router();

Api.get('/users', passport.authenticate('bearer', {session: false}),
  function *() {
    var users = yield usersService.all();
    this.body = JSON.stringify(users);
  }
);

Api.get('/users/:userId', passport.authenticate('bearer', {session: false}),
  function *() {
    var userId = this.req.params.userId;
    var user = yield usersService.findById(userId);
    this.body = JSON.stringify(user);
  }
);

Api.post('/users', passport.authenticate('bearer', {session: false}),
  function *() {
    var body = this.req.body;
    var user = yield usersService.create(body);
    this.body = JSON.stringify(user);
  }
);

Api.delete('/users/:userId', passport.authenticate('bearer', {session: false}),
  function *() {
    var userId = this.req.params.userId;
    yield usersService.destroy(userId);
  }
);

Api.get('/tokens', passport.authenticate('bearer', {session: false}),
  function *() {
    var tokens = yield tokensService.all();
    this.body = JSON.stringify(tokens);
  }
);

module.exports = Api;
