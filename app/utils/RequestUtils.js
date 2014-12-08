/** @flow */

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

exports.getQuery = function(url: string): request {
  var getRequest;
  return new Promise(function(resolve: Function, reject: Function): void {
    getRequest = request.get(url)
      .set('Authorization', 'Bearer ' + AuthStore.getToken())
      .set('Accept', 'application/json')
      .timeout(TIMEOUT)
      .end(digestPromise(resolve, reject));
  })
    .cancellable()
    .catch(Promise.CancellationError, function(e) {
      getRequest._callback = function() {};
      getRequest.abort();
      getRequest = null;
    });

};

exports.postQuery = function(url: string, params: Object): request {
  var postRequest;
  return new Promise(function(resolve: Function, reject: Function): void {
    postRequest = request.post(url)
      .set('Authorization', 'Bearer ' + AuthStore.getToken())
      .set('Accept', 'application/json')
      .send(params)
      .timeout(TIMEOUT)
      .end(digestPromise(resolve, reject));
  })
    .cancellable()
    .catch(Promise.CancellationError, function(e) {
      postRequest._callback = function() {};
      postRequest.abort();
      postRequest = null;
    });
};

exports.delQuery = function(url: string): request {
  var delRequest;
  return new Promise(function(resolve: Function, reject: Function): void {
    delRequest = request.del(url)
    .set('Authorization', 'Bearer ' + AuthStore.getToken())
    .set('Accept', 'application/json')
    .timeout(TIMEOUT)
    .end(digestPromise(resolve, reject));
  })
    .cancellable()
    .catch(Promise.CancellationError, function(e) {
      delRequest._callback = function() {};
      delRequest.abort();
      delRequest = null;
    });
};

exports.putQuery = function(url: string, params: Object): request {
  var putRequest;
  return new Promise(function(resolve: Function, reject: Function): void {
    putRequest = request.put(url)
      .set('Authorization', 'Bearer ' + AuthStore.getToken())
      .set('Accept', 'application/json')
      .send(params)
      .timeout(TIMEOUT)
      .end(digestPromise(resolve, reject));
  })
    .cancellable()
    .catch(Promise.CancellationError, function(e) {
      putRequest._callback = function() {};
      putRequest.abort();
      putRequest = null;
    });
};
