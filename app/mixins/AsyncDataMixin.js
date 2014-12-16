/** @flow */

var Promise = require('bluebird');

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
