/** @flow */

var assign                    = require('react/lib/Object.assign');
var AppWebAPIUtils            = require('./AppWebAPIUtils');
var {ApiStates, ActionTypes}  = require('../constants/AppConstants');

var AuthAPI = assign({}, AppWebAPIUtils, {
  login(email: string, password: string): void {
    var key: string     = ActionTypes.AUTH_POST_LOGIN;
    var params: Object  = {email: email, password: password};

    this.post('login', key, params);
  },

  logout(id: number): void {
    var key: string     = ActionTypes.AUTH_DEL_LOGOUT;
    var params: Object  = { tokenKey: id };

    this.post('logout', key, params);
  },

  verifySession(token: string): void {
    var key: string     = ActionTypes.AUTH_VERIFY_SESSION;
    var params: Object  = { key: token };

    this.post('auth/token', key, params);
  }
});

module.exports = AuthAPI;
