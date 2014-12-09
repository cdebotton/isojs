/** @flow */

var Immutable       = require('immutable');
var assign          = require('react/lib/Object.assign');
var {ActionTypes}   = require('../constants/AppConstants');
var Store           = require('./Store');
var AppDispatcher   = require('../dispatchers/AppDispatcher');
var {Request}       = require('superagent');
var {isUnresolved}  = require('../utils/helpers');

var UserActionCreators        = require('../actions/UserActionCreators');

var _users: Immutable = Immutable.List();

var UsersStore = assign({}, Store, {
  /**
   * Return the state of the UsersStore
   * @return {object}
   */
  getState(): Object {
    return _users.toArray();
  }
});

UsersStore.dispatchToken = AppDispatcher.register(function(payload: Payload): bool {
  var action: Action = payload.action;

  switch (action.type) {
    case ActionTypes.GET_USERS:
      if (isUnresolved(action.response)) return true;

      _users = Immutable.List(action.response);
      UsersStore.emitChange();
      break;

    case ActionTypes.GET_USER_BY_ID:
      if (isUnresolved(action.response)) return true;

      _users = _users.concat([action.response]);
      UsersStore.emitChange();
      break;
  }

  return true;
});

module.exports = UsersStore;
