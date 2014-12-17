/** @flow */

var AppDispatcher   = require('../dispatchers/AppDispatcher');
var {ActionTypes}   = require('../constants/AppConstants');
var UserAPI         = require('../utils/UserAPI');

var AuthActionCreators: Object = {
  getUsers(): void {
    UserAPI.getUsers();
  },

  getUserById(id: number): void {
    UserAPI.getUserById(id);
  },

  createUser(username: string, password: string): void {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_USER,
      username: username
    });

    UserAPI.postUsers(username, password);
  },

  updateUser(userId: number, params: Object): void {
    AppDispatcher.handleViewAction({
      type: ActionTypes.UPDATE_USER,
      userId: userId,
      params: params
    });

    UserAPI.putUsers(userId, params);
  },

  destroyUser(id: number): void {
    AppDispatcher.handleViewAction({
      type: ActionTypes.DESTROY_USER,
      id: id
    });

    UserAPI.destroyUsers(id);
  }
};

module.exports = AuthActionCreators;
