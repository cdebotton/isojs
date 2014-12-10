/** @flow */

var Promise     = require('bluebird');
var co          = require('co');
var request     = require('superagent');
var {ApiStates} = require('../constants/AppConstants');
var AuthStore   = require('../stores/AuthStore');

var jsonp = require('./jsonp');

jsonp('http://api.tumblr.com/v2/blog/pitchersandpoets.tumblr.com/posts/photo', {
  api_key: 'fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4'
})
  .then(function(data) {
    console.log(data);
  });

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

    yield response;
  });
};

exports.delQuery = function(url: string): request {
  return co(function *() {
    var response = yield makePromise(request.del(url));

    return response;
  });
};

exports.postQuery = function(url: string, params: Object): request {
  return co(function *() {
    var response = yield makePromise(request.put(url).send(params));

    yield response;
  });
};
