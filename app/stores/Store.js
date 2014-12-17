/** @flow */

var {EventEmitter}  = require('events');
var Immutable       = require('immutable');
var assign          = require('react/lib/Object.assign');
var invariant       = require('react/lib/invariant');

var CHANGE_EVENT = 'change';

var Store = assign({}, EventEmitter.prototype, {
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
