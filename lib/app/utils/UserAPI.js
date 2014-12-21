/** @flow */

var assign                    = require('react/lib/Object.assign');
var AppWebAPIUtils            = require('./AppWebAPIUtils');
var {ApiStates, ActionTypes}  = require('../constants/AppConstants');

var UserAPI = assign({}, AppWebAPIUtils, {
  getUsers(): void {
    var key: string = ActionTypes.GET_USERS;

    return this.get('users', key);
  },

  getUserById(id: number): void {
    var key: string = ActionTypes.GET_USER_BY_ID;

    return this.get(`users/${id}`, key);
  },

  postUsers(params: Object): void {
    var key: string     = ActionTypes.POST_USERS;

    return this.post('users', key, params);
  },

  destroyUsers(id: number): void {
    var key: string = ActionTypes.DELETE_USERS;

    return this.del(`users/${id}`, key);
  },

  putUsers(id: number, params: Object): void {
    var key: string = ActionTypes.PUT_USERS;

    return this.put(`users/${id}`, key, params);
  }
});

module.exports = UserAPI;
