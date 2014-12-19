/** @flow */

var AppDispatcher   = require('../dispatchers/AppDispatcher');
var {ActionTypes}   = require('../constants/AppConstants');
var AuthAPI         = require('../utils/AuthAPI');

var AuthActionCreators: Object = {
  login(email: string, password: string): void {
    AuthAPI.login(email, password);
  },

  logout(id: number): void {
    AppDispatcher.handleViewAction({
      type: ActionTypes.AUTH_LOGOUT
    });

    AuthAPI.logout(id);
  },

  setSession(key: string): void {
    AppDispatcher.handleServerAction({
      type: ActionTypes.SET_SESSION,
      key: key
    });
  }
};

module.exports = AuthActionCreators;
