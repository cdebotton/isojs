/** @flow */

var AppDispatcher   = require('../dispatchers/AppDispatcher');
var {ActionTypes}   = require('../constants/AppConstants');
var AppWebAPIUtils  = require('../utils/AppWebAPIUtils');

var AuthActionCreators: Object = {
  login(email: string, password: string): void {
    AppWebAPIUtils.login(email, password);
  },

  logout(id: number): void {
    AppDispatcher.handleViewAction({
      type: ActionTypes.AUTH_LOGOUT
    });

    AppWebAPIUtils.logout(id);
  }
};

module.exports = AuthActionCreators;
