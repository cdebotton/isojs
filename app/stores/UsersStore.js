/** @flow */

var Immutable                 = require('immutable');
var {ActionTypes, ApiStates}  = require('../constants/AppConstants');
var Store                     = require('./Store');
var AppDispatcher             = require('../dispatchers/AppDispatcher');
var {Request}                 = require('superagent');

if (! Object.assign) {
  Object.assign = require('react/lib/Object.assign');
};

var _pending: ?Request = null;
var _users: Immutable = Immutable.List();

var UsersStore = Object.assign(Store, {
  /**
   * Return the state of the UsersStore
   * @return {object}
   */
  getState(): Object {
    return _users;
  },

  getPending(): ?Request {
    return _pending;
  }
});

UsersStore.dispatchToken = AppDispatcher.register(function(payload: Payload): bool {
  var action: Action = payload.action;

  switch (action.type) {
    case ActionTypes.GET_USERS:
      if (action.response instanceof Request) {
        _pending = action.response;
      }
      else {
        _pending = null;
        _users = Immutable.List(action.response);
      }

      UsersStore.emitChange();
      break;
  }

  return true;
});
module.exports = UsersStore;
