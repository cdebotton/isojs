/** @flow */

var Promise = require('bluebird');
var {State: RouterState} = require('react-router');

var AsyncDataMixin = function(cb) {
  return {
    statics: {
      fetchData(params, query) {
        return cb(params, query);
      }
    }
  };
};

module.exports = AsyncDataMixin;
