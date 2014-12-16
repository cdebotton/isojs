/** @flow */

var Immutable = require('immutable');
var assign = require('react/lib/Object.assign');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var Store = require('./Store');
var {ActionTypes} = require('../constants/AppConstants');

var _page = Immutable.Map();

var PageStore = assign({}, Store, {
  getState() {
    return _page;
  }
});

PageStore.dispatcherToken = AppDispatcher.register(function(payload: Object): bool {
  var action: Object = payload.action;

  switch (action.type) {
    case ActionTypes.SET_TITLE:
      setTitle(action.title);
      PageStore.emitChange();
      break;
  }

  return true;
});

function setTitle(title: string): void {
  _page = _page.updateIn(['title'], value => title);
}

module.exports = PageStore;
