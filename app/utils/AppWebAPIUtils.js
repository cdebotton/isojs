/** @flow */

var Promise = require('bluebird');

var {ApiStates, ActionTypes}  = require('../constants/AppConstants');
var AppDispatcher             = require('../dispatchers/AppDispatcher');

var {getQuery, putQuery, delQuery, postQuery, TIMEOUT} = require('./RequestUtils');

var API_URL: string = 'http://localhost:3000/api/v1';
var _pendingRequests: Object = {};

function digestResponse(key: string, params: Object): Function {
  return function(res: any): void {
    dispatch(key, res, params);
  }
}

/**
 * Abort existing pending requests to
 * prevent duplicate calls.
 * @param  {key} key
 * @return {void}
 */
function abortPendingRequests(key: string): void {
  if (_pendingRequests[key]) {
    _pendingRequests[key].cancel();
    _pendingRequests[key] = null;
  }
}

/**
 * Generate the URL for the API call
 * @param  {part} part
 * @param  {number} id
 * @return {string}
 */
function makeUrl(part: string, id?: number): string {
  var parts: Array<string|number> = [API_URL, part];
  if (id) parts.push(id);

  return parts.join('/');
}

/**
 * Dispatch an event to the AppDispatcher for stores
 * to responed to
 * @param  {string} key
 * @param  {any} response
 * @param  {object} params
 * @return {void}
 */
function dispatch(key: string, response: any, params?: ?Object): void {
  var action: Action = {type: key, response: response};
  if (params) {
    action.queryParams = params;
  }

  AppDispatcher.handleServerAction(action);
}

var AppWebAPIUtils: Object = {
  getPendingRequests(keys: Array<string>) {
    var promises = keys.map(key => _pendingRequests[key]);
    return Promise.all(promises);
  },

  login(email: string, password: string): void {
    var key: string     = ActionTypes.AUTH_POST_LOGIN;
    var url: string     = makeUrl('login');
    var params: Object  = {email: email, password: password};

    abortPendingRequests(key);
    dispatch(key, ApiStates.PENDING, params);

    _pendingRequests[key] = postQuery(url, params)
      .then(digestResponse(key, params));
  },

  logout(id: number): void {
    var key: string     = ActionTypes.AUTH_DEL_LOGOUT;
    var url: string     = makeUrl('logout');
    var params: Object  = { tokenKey: id };

    abortPendingRequests(key);
    dispatch(key, ApiStates.PENDING);

    _pendingRequests[key] = postQuery(url, params)
      .then(digestResponse(key));
  },

  verifySession(token: string): void {
    var key: string     = ActionTypes.AUTH_VERIFY_SESSION;
    var url: string     = makeUrl('auth/token');
    var params: Object  = { key: token };

    abortPendingRequests(key);
    dispatch(key, ApiStates.PENDING);

    _pendingRequests[key] = postQuery(url, params)
      .then(digestResponse(key));
  },

  getUsers(): void {
    var key: string = ActionTypes.GET_USERS;
    var url: string = makeUrl('users');

    abortPendingRequests(key);
    dispatch(key, ApiStates.PENDING);

    _pendingRequests[key] = getQuery(url)
      .then(digestResponse(key))
      .catch(function(err) {
        console.log(err);
      });
  },

  getUserById(id: number): void {
    var key: string = ActionTypes.GET_USER_BY_ID;
    var url: string = makeUrl('users', id);

    abortPendingRequests(key);
    dispatch(key, ApiStates.PENDING);

    _pendingRequests[key] = getQuery(url)
      .then(digestResponse(key));
  },

  postUsers(username: string, password: string): void {
    var key: string     = ActionTypes.POST_USERS;
    var url: string     = makeUrl('users');
    var params: Object  = {username: username, password: password};

    abortPendingRequests(key);
    dispatch(key, ApiStates.PENDING, params);

    _pendingRequests[key] = postQuery(url, params)
      .then(digestResponse(key, params));
  },

  destroyUsers(id: number): void {
    var key: string = ActionTypes.DELETE_USERS;
    var url: string = makeUrl('users', id);

    abortPendingRequests(key);
    dispatch(key, ApiStates.PENDING);

    _pendingRequests[key] = delQuery(url)
      .then(digestResponse(key));
  },

  putUsers(id: number, params: Object): void {
    var key: string = ActionTypes.PUT_USERS;
    var url: string = makeUrl('users', id);

    abortPendingRequests(key);
    dispatch(key, ApiStates.PENDING);

    _pendingRequests[key] = putQuery(url, params)
      .then(digestResponse(key));
  }
};

module.exports = AppWebAPIUtils;
