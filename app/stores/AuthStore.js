/** @flow */

var Immutable                 = require('immutable');
var {ActionTypes, ApiStates}  = require('../constants/AppConstants');
var Store                     = require('./Store');
var AppDispatcher             = require('../dispatchers/AppDispatcher');

if (! Object.assign) {
  Object.assign = require('react/lib/Object.assign');
};

/**
 * Get the locally stored auth info
 * @param  {string} sessionName
 * @return {Immutable}
 */
function getAuthData(sessionName: string): Immutable {
  try {
    var auth: string = localStorage.getItem(sessionName);

    var data: Object = JSON.parse(auth);
    return Immutable.Map(data);
  }
  catch(e) {
    return Immutable.Map();
  }
}


var _status: string = ApiStates.READY;
var SESSION_NAME: string = 'cdb.session';
var _auth: Immutable = getAuthData(SESSION_NAME);

var AuthStore = Object.assign(Store, {
  /**
   * Return the state of the AuthStore
   * @return {object}
   */
  getState(): Object {
    return _auth.toObject();
  },

  /**
   * Return token of the
   * currently authenticated user
   * @return {string}
   */
  getToken(): string {
    return _auth.get('key');
  },

  /**
   * Return the currently
   * authenticated user.
   * @return {object}
   */
  getUser(): ?Object {
    if (_auth.get('_user')) {
      return _auth.get('_user').toObject();
    }
  },

  /**
   * Return true if the _user exists and has
   * an _id allocated
   * @return {boolean}
   */
  authed(): bool {
    return 'undefined' !== typeof _auth.getIn(['_user', '_id']);
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
  }

  return true;
});

/**
 * Return true if state is in ApiStates.
 * @param  {any} state
 * @return {bool}
 */
function haltAsync(state: any): bool {
  if (Object.keys(ApiStates).indexOf(state) > -1) {
    _status = state;
    return true;
  }
  _status = ApiStates.OK;
  return false;
}

/**
 * Save _auth state to localStorage
 */
function setLocalStorage(): void {
  var data = JSON.stringify(_auth.toJS());
  localStorage.setItem(SESSION_NAME, data);
}

/**
 * Log a user in and store the session data
 * in the browser's localStorage
 * @param  {object} session
 */
function login(session: any): ?bool {
  if (haltAsync(session)) return true;
  _auth = Immutable.fromJS(session);
  setLocalStorage();
  AuthStore.emitChange();
}

/**
 * Flush session
 * @param  {string} id
 */
function logout(): void {
  _auth = Immutable.Map();
  setLocalStorage();
  AuthStore.emitChange();
}

module.exports = AuthStore;
