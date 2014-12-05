/** @flow */

var request     = require('superagent');
var AuthStore   = require('../stores/AuthStore');

var TIMEOUT: number = exports.TIMEOUT = 10000;

exports.getQuery = function(url: string): request {
  return request.get(url)
    .set('Authorization', 'Bearer ' + AuthStore.getToken())
    .set('Accept', 'application/json')
    .timeout(TIMEOUT);
};

exports.postQuery = function(url: string, params: Object): request {
  return request.post(url)
    .set('Authorization', 'Bearer ' + AuthStore.getToken())
    .set('Accept', 'application/json')
    .send(params)
    .timeout(TIMEOUT);
};

exports.delQuery = function(url: string): request {
  return request.del(url)
    .set('Authorization', 'Bearer ' + AuthStore.getToken())
    .set('Accept', 'application/json')
    .timeout(TIMEOUT);
};

exports.putQuery = function(url: string, params: Object): request {
  return request.put(url)
    .set('Authorization', 'Bearer ' + AuthStore.getToken())
    .set('Accept', 'application/json')
    .send(params)
    .timeout(TIMEOUT);
};
