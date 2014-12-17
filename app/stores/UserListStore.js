/** @flow */

var Immutable       = require('immutable');
var assign          = require('react/lib/Object.assign');
var {ActionTypes}   = require('../constants/AppConstants');
var UserEditStore   = require('./UserEditStore');
var Store           = require('./Store');
var AppDispatcher   = require('../dispatchers/AppDispatcher');
var {Request}       = require('superagent');
var {isUnresolved}  = require('../utils/helpers');

var UserActionCreators = require('../actions/UserActionCreators');

var _users: Immutable = Immutable.List();

var UserListStore = assign({}, Store, {
  /**
   * Return the state of the UserListStore
   * @return {object}
   */
  getState(): Object {
    return _users;
  },

  getById(id: string): ?Object {
    try {
      var user = _users.filter(user => user._id === id).first();
      return Immutable.fromJS(user);
    }
    catch (e) {
      return null;
    }
  }
});

UserListStore.dispatcherToken = AppDispatcher.register(function(payload: Payload): bool {
  var action: Action = payload.action;

  switch (action.type) {
    case ActionTypes.GET_USERS:
      if (isUnresolved(action.response)) return true;
      AppDispatcher.waitFor([UserEditStore.dispatcherToken]);
      _users = Immutable.List(action.response);
      UserListStore.emitChange();
      break;

    case ActionTypes.GET_USER_BY_ID:
      if (isUnresolved(action.response)) return true;
      addUser(action.response);
      UserListStore.emitChange();
      break;

    case ActionTypes.UPDATE_USER:
      AppDispatcher.waitFor([UserEditStore.dispatcherToken]);
      updateUser(UserEditStore.getState().get('user'));
      UserListStore.emitChange();
      break;
  }

  return true;
});

function addUser(user) {
  if (_users.map(user => user._id).indexOf(user._id) === -1) {
    _users = _users.concat([user]);
  }
}

function updateUser(user) {
  var index = _users.map(record => record._id)
    .toArray()
    .indexOf(user.get('_id'));

  _users = _users.set(index, user.toJS());
}

module.exports = UserListStore;
