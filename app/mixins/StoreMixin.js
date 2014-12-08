/** @flow */

var Store = require('../stores/Store');

var StoreMixin = function(cb: Function): Object {
  return {
    getInitialState(): Object {
      return cb();
    },

    componentDidMount(): void {
      Store.addChangeListener(this.__onChange);
    },

    componentDidUnmount(): void {
      Store.removeChangeListener(this.__onChange);
    },

    __onChange(): void {
      this.setState(cb());
    }
  };
};

module.exports = StoreMixin;
