/** @flow */

var Immutable = require('immutable');
var assign = require('react/lib/Object.assign');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var Store = require('./Store');
var {ApiStates, ActionTypes} = require('../constants/AppConstants');
var {isUnresolved} = require('../utils/helpers');

var _payload = Immutable.Map({
  user: null,
  status: ApiStates.READY
});

var UserEditStore = assign({}, Store, {
  getState(): any {
    return _payload;
  }
});

UserEditStore.dispatcherToken = AppDispatcher.register(function(payload: Object): bool {
  var action: Action = payload.action;
  var UserListStore: Object = require('./UserListStore');

  switch (action.type) {
    case ActionTypes.GET_USER_BY_ID:
      AppDispatcher.waitFor([UserListStore.dispatcherToken]);
      setUser(action.response);
      UserEditStore.emitChange();
      break;

    case ActionTypes.UPDATE_USER:
      updateUser(action.userId, action.params);
      UserEditStore.emitChange();
      break;
  }

  return true;
});

function setUser(data) {
  if (! isUnresolved(data)) {
    _payload = Immutable.Map({
      user: Immutable.fromJS(data),
      status: ApiStates.READY
    });
  } else {
    _payload = _payload.setIn(['status'], value => data);
  }
}

function updateUser(userId, params) {
  params._id = userId;
  _payload = _payload.mergeDeep({
    status: ApiStates.READY,
    user: params
  });
}

module.exports = UserEditStore;
