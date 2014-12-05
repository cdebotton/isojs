/** @flow */

var {ApiStates, ActionTypes}  = require('../constants/AppConstants');
var AppDispatcher             = require('../dispatchers/AppDispatcher');

var {getQuery, putQuery, delQuery, postQuery, TIMEOUT} = require('./RequestUtils');

var API_URL: string = 'http://localhost:3000/api/v1';
var _pendingRequests: Object = {};

/**
 * Abort existing pending requests to
 * prevent duplicate calls.
 * @param  {key} key
 * @return {void}
 */
function abortPendingRequests(key: string): void {
  if (_pendingRequests[key]) {
    _pendingRequests[key]._callback = function() {};
    _pendingRequests[key].abort();
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

function digestResponse(key: string, params?: ?Object) {
  return function(err: ?Object, res: any) {
    if (err && err.timeout === TIMEOUT) {
      dispatch(key, ApiStates.TIMEOUT, params);
    }
    else if (res.status === 400) {
      dispatch(key, ApiStates.BAD_REQUEST, params);
    }
    else if (! res.ok) {
      dispatch(key, ApiStates.ERROR, params);
    }
    else {
      dispatch(key, res.body, params);
    }
  };
};

var AppWebAPIUtils: Object = {
  login(email: string, password: string): void {
    var key: string     = ActionTypes.AUTH_POST_LOGIN;
    var url: string     = makeUrl('login');
    var params: Object  = {email: email, password: password};

    abortPendingRequests(key);

    _pendingRequests[key] = postQuery(url, params)
      .end(digestResponse(key, params));


    dispatch(key, _pendingRequests[key], params);
  },

  logout(id: number): void {
    var key: string     = ActionTypes.AUTH_DEL_LOGOUT;
    var url: string     = makeUrl('logout');
    var params: Object  = { tokenKey: id };

    abortPendingRequests(key);
    dispatch(key, ApiStates.PENDING);

    _pendingRequests[key] = postQuery(url, params)
      .end(digestResponse(key));
  },

  verifySession(token: string): void {
    var key: string     = ActionTypes.AUTH_VERIFY_SESSION;
    var url: string     = makeUrl('auth/token');
    var params: Object  = { key: token };

    abortPendingRequests(key);
    dispatch(key, ApiStates.PENDING);

    _pendingRequests[key] = postQuery(url, params)
      .end(digestResponse(key));
  },

  getUsers(): void {
    var key: string = ActionTypes.GET_USERS;
    var url: string = makeUrl('users');

    abortPendingRequests(key);

    _pendingRequests[key] = getQuery(url)
      .end(digestResponse(key));

    dispatch(key, _pendingRequests[key]);
  },

  getUserById(id: number): void {
    var key: string = ActionTypes.GET_USER_BY_ID;
    var url: string = makeUrl('users', id);

    abortPendingRequests(key);
    dispatch(key, ApiStates.PENDING);

    _pendingRequests[key] = getQuery(url)
      .end(digestResponse(key));
  },

  postUsers(username: string, password: string): void {
    var key: string     = ActionTypes.POST_USERS;
    var url: string     = makeUrl('users');
    var params: Object  = {username: username, password: password};

    abortPendingRequests(key);
    dispatch(key, ApiStates.PENDING, params);

    _pendingRequests[key] = postQuery(url, params)
      .end(digestResponse(key, params));
  },

  destroyUsers(id: number): void {
    var key: string = ActionTypes.DELETE_USERS;
    var url: string = makeUrl('users', id);

    abortPendingRequests(key);
    dispatch(key, ApiStates.PENDING);

    _pendingRequests[key] = delQuery(url)
      .end(digestResponse(key));
  },

  putUsers(id: number, params: Object): void {
    var key: string = ActionTypes.PUT_USERS;
    var url: string = makeUrl('users', id);

    abortPendingRequests(key);
    dispatch(key, ApiStates.PENDING);

    _pendingRequests[key] = putQuery(url, params)
      .end(digestResponse(key));
  }
};

module.exports = AppWebAPIUtils;
