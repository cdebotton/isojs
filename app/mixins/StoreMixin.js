/** @flow */

var assign = require('react/lib/Object.assign');
var Store = require('../stores/Store');
var {State: RouterState} = require('react-router');

var queryCache = {};

var StoreMixin = function(cb: Function): any {
  return assign({}, RouterState, {
    getInitialState(): Object {
      return cb(this.getParams(), this.getQuery());
    },

    componentDidMount(): void {
      Store.addChangeListener(this.__onChange);
    },

    componentWillUnmount(): void {
      Store.removeChangeListener(this.__onChange);
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
