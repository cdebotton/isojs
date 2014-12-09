var Promise     = require('bluebird');
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
    action.end(function(err, data) {
      return digestPromise(resolve, reject)(err, data);
    });
  })
  .cancellable()
  .catch(Promise.CancellationError, function(e) {
    action._callback = function() {};
    action.abort();
  });
};

exports.getQuery = function(url: string): request {
  var action = request.get(url)
    .set('Authorization', 'Bearer ' + AuthStore.getToken())
    .set('Accept', 'application/json')
    .timeout(TIMEOUT);

  return makePromise(action);
};

exports.postQuery = function(url: string, params: Object): request {
  var action = request.post(url)
    .set('Authorization', 'Bearer ' + AuthStore.getToken())
    .set('Accept', 'application/json')
    .send(params)
    .timeout(TIMEOUT);

  return makePromise(action);
};

exports.delQuery = function(url: string): request {
  var action = request.del(url)
    .set('Authorization', 'Bearer ' + AuthStore.getToken())
    .set('Accept', 'application/json')
    .timeout(TIMEOUT);

  return makePromise(action);
};

exports.putQuery = function(url: string, params: Object): request {
  var action = request.put(url)
    .set('Authorization', 'Bearer ' + AuthStore.getToken())
    .set('Accept', 'application/json')
    .send(params)
    .timeout(TIMEOUT);

  return makePromise(action);
};
