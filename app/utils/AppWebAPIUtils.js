/** @flow */

var Promise = require('bluebird');

var {ApiStates, ActionTypes}  = require('../constants/AppConstants');
var AppDispatcher             = require('../dispatchers/AppDispatcher');

var {getQuery, putQuery, delQuery, postQuery} = require('./RequestUtils');

var API_URL: string = 'http://localhost:3000/api/v1';
var _pendingRequests: Object = {};

function digestResponse(key: string, params?: Object): Function {
  return function(res: any): void {
    dispatch(key, res, params);
  }
}

function digestError(key: string, params?: Object): Function {
  return function(err: any): void {
    dispatch(key, err, params);
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

  get: function(resource: string, key: string, params: ?Object) {
    var url = makeUrl(resource);

    abortPendingRequests(key);
    dispatch(key, ApiStates.PENDING, params);

    _pendingRequests[key] = getQuery(url, params)
      .then(digestResponse(key, params))
      .catch(digestError(key, params));

    return _pendingRequests[key];
  },

  put: function(resource: string, key: string, params: Object) {
    var url = makeUrl(resource);

    abortPendingRequests(key);
    dispatch(key, ApiStates.PENDING, params);

    _pendingRequests[key] = putQuery(url, params)
      .then(digestResponse(key, params))
      .catch(digestError(key, params));

    return _pendingRequests[key];
  },

  del: function(resource: string, key: string, params: Object) {
    var url = makeUrl(resource);

    abortPendingRequests(key);
    dispatch(key, ApiStates.PENDING, params);

    _pendingRequests[key] = delQuery(url, params)
      .then(digestResponse(key, params))
      .catch(digestError(key, params));
  },

  post: function(resource: string, key: string, params: Object) {
    var url = makeUrl(resource);

    abortPendingRequests(key);
    dispatch(key, ApiStates.PENDING, params);

    _pendingRequests[key] = postQuery(url, params)
      .then(digestResponse(key, params))
      .catch(digestError(key, params));
  }
};

module.exports = AppWebAPIUtils;
