/** @flow */

var Immutable = require('immutable');
var Store = require('./Store');
var assign = require('react/lib/Object.assign');

var CollectionStore = assign({}, Store, {
  find(id: string|number): ?Object {
    try {
      var payload = this.getState().get('entities')
        .find(payload => payload.get('_id') === id);

      return Immutable.fromJS(payload);
    }
    catch (err) {
      return false;
    }
  },

  where(params: Object): ?Object {
    try {
      var payload = this.getState()
        .find(payload => {
          return Object.keys(params).reduce((memo, key) => {
            return memo && params[key] === payload[key];
          }, true);
        });

        return Immutable.fromJS(payload);
    }
    catch(err) {
      return false;
    }
  }
});

module.exports = CollectionStore;
