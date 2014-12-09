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

  findByIdAndUpdate(id: number, params: Object): void {
    AppDispatcher.handleViewAction({
      type: ActionTypes.UPDATE_USER,
      id: id,
      response: params
    });

    UserAPI.putUsers(id, params);
  },

  createUser(username: string, password: string): void {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_USER,
      username: username
    });

    UserAPI.postUsers(username, password);
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
