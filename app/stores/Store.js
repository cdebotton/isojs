/** @flow */

var {EventEmitter}  = require('events');
var assign          = require('react/lib/Object.assign');
var invariant       = require('react/lib/invariant');

var CHANGE_EVENT = 'change';

var Store = assign({}, EventEmitter.prototype, {
  find(id): Object {
    try {
      return this.getState().filter(user => user._id === id);
    }
    catch (err) {
      console.warn('Store.find(...): Can only use find when Store.getState() is an Immutable List');
    }
  },

  emitChange(): void {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback: Function): void {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback: Function): void {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

module.exports = Store;
