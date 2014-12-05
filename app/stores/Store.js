/** @flow */

var {EventEmitter}  = require('events');

if (! Object.assign) {
  Object.assign = require('react/lib/Object.assign');
};

var CHANGE_EVENT = 'change';

var Store = Object.assign(EventEmitter.prototype, {
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
