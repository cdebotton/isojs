/** @flow */

var Store = require('../stores/Store');

var queryCache = {};

var StoreMixin = function(cb: Function): any {
  return {
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
