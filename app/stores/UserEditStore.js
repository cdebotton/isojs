/** @flow */

var Immutable = require('immutable');
var assign = require('react/lib/Object.assign');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var UserListStore = require('./UserListStore');
var Store = require('./Store');
var {ApiStates, ActionTypes} = require('../constants/AppConstants');
var {isUnresolved} = require('../utils/helpers');

var _data = Immutable.Map({
  _user: {},
  _status: ApiStates.READY
});

var UserEditStore = assign({}, Store, {
  getState(): any {
    return _data;
  }
});

UserEditStore.dispatcherToken = AppDispatcher.register(function(payload: Object): bool {
  var action: Action = payload.action;

  switch (action.type) {
    case ActionTypes.GET_USER_BY_ID:
      AppDispatcher.waitFor([UserListStore.dispatcherToken]);
      setUser(action.response);
      UserEditStore.emitChange();
      break;
  }

  return true;
});

function setUser(data) {
  if (! isUnresolved(data)) {
    _data = Immutable.Map({
      user: Immutable.fromJS(data),
      status: ApiStates.READY
    });
  } else {
    _data = _data.setIn(['user', 'status'], value => data);
  }
}

module.exports = UserEditStore;
