/** @flow */

var Immutable         = require('immutable');
var {PayloadSources}  = require('../constants/AppConstants');

var _cache = Immutable.Map();

var Cache = {
  has(key: string): bool {
    return _cache.toObject().hasOwnProperty(key);
  },

  set(key: string, value: any): void {
    _cache = _cache.set(key, value);
  },

  get(key: string): any {
    return _cache.get(key);
  }
};

module.exports = Cache;
