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

  forceLogin(user: Object): void {
    AppDispatcher.handleServerAction({
      type: ActionTypes.FORCE_LOGIN,
      user: user
    });
  }
};

module.exports = AuthActionCreators;
