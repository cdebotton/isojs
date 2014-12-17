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
  _payload = _payload.set('entities', Immutable.fromJS(users));
}

function addUser(user) {
  var found = _payload.get('entities')
    .findIndex(entity => entity.get('_id') === user._id) > -1;

  if (found === -1) {
    var entities = _payload.get('entities').concat([user]);
    _payload = _payload.set('entities', entities);
  }
}

function updateUser(id, user) {
  var index = _payload.get('entities')
    .findIndex(entity => entity._id === user._id);

  _payload = _payload.setIn(['entities', index], user);
}

function destroyUser(id) {
  var index = _payload.get('entities')
    .findIndex(entity => entity._id === id);

  var entities = _payload.get('entities')
    .delete(index);

  _payload = _payload.set('entities', entities);
};

function createUser(user) {
  var entities = _payload.get('entities').concat([user]);
  _payload = _payload.set('entities', entities);
}

function postUsers(user) {
  if (! isUnresolved(user)) {
    var entities = _payload.get('entities').concat([user]);
    _payload = _payload.set('entities', entities);
  }
}

module.exports = UserStore;
