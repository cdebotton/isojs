/** @flow */

var AppDispatcher   = require('../dispatchers/AppDispatcher');
var {ActionTypes}   = require('../constants/AppConstants');
var AppWebAPIUtils  = require('../utils/AppWebAPIUtils');

var AuthActionCreators: Object = {
  getUsers(): void {
    AppWebAPIUtils.getUsers();
  },

  getUserById(id: number): void {
    AppWebAPIUtils.getUserById(id);
  },

  findByIdAndUpdate(id: number, params: Object): void {
    AppDispatcher.handleViewAction({
      type: ActionTypes.UPDATE_USER,
      id: id,
      response: params
    });

    AppWebAPIUtils.putUsers(id, params);
  },

  createUser(username: string, password: string): void {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_USER,
      username: username
    });

    AppWebAPIUtils.postUsers(username, password);
  },

  destroyUser(id: number): void {
    AppDispatcher.handleViewAction({
      type: ActionTypes.DESTROY_USER,
      id: id
    });

    AppWebAPIUtils.destroyUsers(id);
  }
};

module.exports = AuthActionCreators;
