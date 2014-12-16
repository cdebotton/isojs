/** @flow */

var assign = require('react/lib/Object.assign');
var {State: RouterState} = require('react-router');

var StoreMixin: any = function(cb: Function, ...stores: Array<Object>): any {
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
      console.log(stores[0].getState().toObject());
      this.setState(cb(this.getParams(), this.getQuery()));
    }
  });
};

module.exports = StoreMixin;
