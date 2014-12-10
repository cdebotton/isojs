/** @flow */

var assign = require('react/lib/Object.assign');
var Store = require('../stores/Store');
var {State: RouterState} = require('react-router');

var queryCache = {};

var StoreMixin = function(cb: Function): any {
  return assign({}, RouterState, {
    statics: {
      has(collection: Array<Object>, id: string): bool {
        return collection.map(doc => doc._id).indexOf(id) > -1;
      },

      hasQueried(model: string, query: Object) {
        var queryStr = `${model}:${JSON.stringify(query)}`;

        if (! queryCache[queryStr]) {
          queryCache[queryStr] = true;
          return false;
        }

        return true;
      }
    },

    getInitialState(): Object {
      return cb(this.getParams(), this.getQuery());
    },

    componentDidMount(): void {
      Store.addChangeListener(this.__onChange);
    },

    componentWillUnmount(): void {
      Store.removeChangeListener(this.__onChange);
    },

    __onChange(): void {
      this.setState(cb(this.getParams(), this.getQuery()));
    }
  });
};

module.exports = StoreMixin;
