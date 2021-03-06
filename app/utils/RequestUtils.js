/** @flow */

var Promise     = require('bluebird');
var co          = require('co');
var request     = require('superagent');
var {ApiStates} = require('../constants/AppConstants');
var AuthStore   = require('../stores/AuthStore');

var TIMEOUT: number = exports.TIMEOUT = 10000;

function digestPromise(resolve, reject) {
  return function(err, res) {
    if (err && err.timeout === TIMEOUT) {
      reject(ApiStates.TIMEOUT);
    }
    else if (res.status >= 400 && res.status < 500) {
      reject(ApiStates.BAD_REQUEST);
    }
    else if (! res.ok) {
      reject(ApiStates.ERROR);
    }
    else {
      resolve(res.body);
    }
  };
};

function makePromise(action) {
  return new Promise(function(resolve, reject) {
    action.set('Authorization', 'Bearer ' + AuthStore.getToken())
      .set('Accept', 'application/json')
      .timeout(TIMEOUT)
      .on('error', reject)
      .end(digestPromise(resolve, reject));
  })
  .cancellable()
  .catch(Promise.CancellationError, function(e) {
    action._callback = function() {};
    action.abort();
  });
};

exports.getQuery = function(url: string): Promise {
  return co(function *() {
    var response = yield makePromise(request.get(url));

    return response;
  });
};

exports.postQuery = function(url: string, params: Object): request {
  return co(function *() {
    var response = yield makePromise(request.post(url).send(params));

    return response;
  });
};

exports.delQuery = function(url: string): request {
  return co(function *() {
    var response = yield makePromise(request.del(url));

    return response;
  });
};

exports.putQuery = function(url: string, params: Object): request {
  return co(function *() {
    var response = yield makePromise(request.put(url).send(params));

    yield response;
  });
};
