/** @flow */

var Immutable                 = require('immutable');
var assign                    = require('react/lib/Object.assign');
var {ApiStates, ActionTypes}  = require('../constants/AppConstants');
var Store                     = require('./Store');
var AppDispatcher             = require('../dispatchers/AppDispatcher');
var {isUnresolved}            = require('../utils/helpers');
var config                    = require('../config');

var _status: string = ApiStates.READY;

var _payload: Immutable = Immutable.Map({
  key: null,
  status: ApiStates.READY,
  user: Immutable.Map()
});

var AuthStore = assign({}, Store, {
  /**
   * Return the state of the AuthStore
   * @return {object}
   */
  getState(): Object {
    return _payload;
  },

  /**
   * Return token of the
   * currently authenticated user
   * @return {string}
   */
  getToken(): string {
    return _payload.get('key');
  },

  /**
   * Return the currently
   * authenticated user.
   * @return {object}
   */
  getCurrentUser(): ?Object {
    return _payload.get('user');
  },

  /**
   * Return true if the _user exists and has
   * an _id allocated
   * @return {boolean}
   */
  authed(): bool {
    return _payload.get('key') !== null;
  },

  setSession(session: string): void {
    _payload = _payload.set('key', session);
  }
});

AuthStore.dispatchToken = AppDispatcher.register(function(payload: Payload): bool {
  var action: Action = payload.action;
  switch (action.type) {
    case ActionTypes.AUTH_POST_LOGIN:
      login(action.response);
      break;

    case ActionTypes.AUTH_LOGOUT:
      logout();
      break;

    case ActionTypes.GET_CURRENT_USER:
      setAuthedUser(action.response);
      break;
  }

  return true;
});

/**
 * Log a user in and store the session data
 * in the browser's localStorage
 * @param  {object} session
 */
function login(session: any): ?bool {
  if (isUnresolved(session)) return true;
  _payload = _payload.set('key', session.token);
  AuthStore.emitChange();
}

/**
 * Flush session
 * @param  {string} id
 */
function logout(): void {
  _payload = _payload.set('key', null);
  _payload = _payload.set('user', Immutable.Map());
  AuthStore.emitChange();
}

function setAuthedUser(user: any) {
  if (isUnresolved(user)) {
    _payload = _payload.set('status', ApiStates.PENDING);
  }
  else {
    _payload = _payload.set('status', ApiStates.READY);
    _payload = _payload.set('user', Immutable.fromJS(user));
  }
  AuthStore.emitChange();
}

module.exports = AuthStore;
