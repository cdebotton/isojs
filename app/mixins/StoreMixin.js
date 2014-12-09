/** @flow */

var Store = require('../stores/Store');

var StoreMixin = function(cb: Function): any {
  return {
    getInitialState(): Object {
      return cb();
    },

    componentDidMount(): void {
      Store.addChangeListener(this.__onChange);
    },

    componentWillUnmount(): void {
      Store.removeChangeListener(this.__onChange);
    },

    __onChange(): void {
      this.setState(cb());
    }
  };
};

module.exports = StoreMixin;
