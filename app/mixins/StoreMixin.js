/** @flow */

var assign = require('react/lib/Object.assign');
var Store = require('../stores/Store');
var {State: RouterState} = require('react-router');

var queryCache = {};

var StoreMixin = function(cb: Function, ...stores): any {
  return assign({}, RouterState, {
    getInitialState(): Object {
      return cb(this.getParams(), this.getQuery());
    },

    componentDidMount(): void {
      var self = this;
      if (stores) {
        stores.forEach(store => store.addChangeListener(self.__onChange));
      }
    },

    componentWillUnmount(): void {
      var self = this;
      if (stores) {
        stores.forEach(store => store.removeChangeListener(self.__onChange));
      }
    },

    componentWillReceiveProps(nextProps: Object): void {
      this.__onChange();
    },

    __onChange(): void {
      this.setState(cb(this.getParams(), this.getQuery()));
    }
  });
};

module.exports = StoreMixin;
