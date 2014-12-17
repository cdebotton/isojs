/** @flow */

var Immutable = require('immutable');
var assign = require('react/lib/Object.assign');
var Store = require('./Store');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var {Request} = require('superagent');
var {isUnresolved} = require('../utils/helpers');
var {ApiStates, ActionTypes} = require('../constants/AppConstants');

var UserActionCreators = require('../actions/UserActionCreators');

var _payload: Immutable = Immutable.Map({
  status: ApiStates.READY,
  entities: Immutable.List()
});

var UserStore = assign({}, Store, {
  /**
   * Return the state of the UserStore
   * @return {object}
   */
  getState(): Object {
    return _payload;
  }
});

UserStore.dispatcherToken = AppDispatcher.register(function(payload: Payload): bool {
  var action: Action = payload.action;

  switch (action.type) {
    case ActionTypes.GET_USERS:
      if (isUnresolved(action.response)) return true;
      setUsers(action.response);
      UserStore.emitChange();
      break;

    case ActionTypes.GET_USER_BY_ID:
      if (isUnresolved(action.response)) return true;
      addUser(action.response);
      UserStore.emitChange();
      break;

    case ActionTypes.DESTROY_USER:
      destroyUser(action.id);
      UserStore.emitChange();
      break;

    case ActionTypes.CREATE_USER:
      createUser(action.params);
      UserStore.emitChange();
      break;

    case ActionTypes.UPDATE_USER:
      updateUser(action.userId, action.params);
      UserStore.emitChange();
      break;

    case ActionTypes.POST_USERS:
      postUsers(action.response);
      UserStore.emitChange();
      break;
  }

  return true;
});

function setUsers(users) {
  _payload = _payload.set('entities', Immutable.List(users));
}

function addUser(user) {
  if (_payload.get('entities').map(user => user._id).indexOf(user._id) === -1) {
    _payload = _payload.setIn(['entities'], value => value.concat(user));
  }
}

function updateUser(id, user) {
  var index = _payload.get('entities')
    .findIndex(entity => entity._id === user._id);

  _payload = _payload.setIn(['entities', index], user);
}

function destroyUser(id) {
  var index = _users.map(record => record._id)
    .toArray()
    .indexOf(id);

  _users = _users.delete(index);
};

function createUser(user) {
  if (! isUnresolved(user)) {
    _users = _users.concat(user);
  }
}

function postUsers(user) {
  if (! isUnresolved(user)) {
    _users = _users.concat([user]);
  }
}

module.exports = UserStore;
