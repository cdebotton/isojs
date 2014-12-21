var authService     = require('../../services/authService');

module.exports = function(Api, passport, config) {
  Api.post('/login', function *(next) {
    var ctx = this;

    yield passport.authenticate('local', function* (err, token, info) {
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
    yield authService.logout(this.session.passport.user || null);
    this.req.logout();
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
}
