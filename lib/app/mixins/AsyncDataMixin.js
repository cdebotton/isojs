/** @flow */

var Promise = require('bluebird');
var {State: RouterState} = require('react-router');

var AsyncDataMixin: any = function(cb): any {
  return {
    statics: {
      fetchData(params: Object, query: Object): any {
        return cb(params, query);
      }
    }
  };
};

module.exports = AsyncDataMixin;
