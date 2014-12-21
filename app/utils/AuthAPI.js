/** @flow */

var assign                    = require('react/lib/Object.assign');
var AppWebAPIUtils            = require('./AppWebAPIUtils');
var {ApiStates, ActionTypes}  = require('../constants/AppConstants');

var AuthAPI = assign({}, AppWebAPIUtils, {
  login(email: string, password: string): void {
    var key: string     = ActionTypes.AUTH_POST_LOGIN;
    var params: Object  = {email: email, password: password};

    return this.post('login', key, params);
  },

  logout(id: number): void {
    var key: string     = ActionTypes.AUTH_DEL_LOGOUT;
    var params: Object  = { tokenKey: id };

    return this.post('logout', key, params);
  },

  getCurrentUser(token: string): void {
    var key: string     = ActionTypes.GET_CURRENT_USER;
    var params: Object  = {key: token};

    return this.post('token', key, params);
  }
});

module.exports = AuthAPI;
