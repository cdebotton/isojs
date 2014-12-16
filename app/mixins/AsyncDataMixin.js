/** @flow */

var Promise = require('bluebird');
var {State: RouterState} = require('react-router');

var AsyncDataMixin = function(cb) {
  return {
    statics: {
      fetchData(params, query) {
        return cb(params, query);
      }
    },

    componentDidMount() {
      cb(this.getParams(), this.getQuery());
    },

    componentWillReceiveProps(nextProps) {
      cb(this.getParams(), this.getQuery());
    }
  };
};

module.exports = AsyncDataMixin;
