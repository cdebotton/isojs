/** @flow */

var {Dispatcher}      = require('flux');
var {PayloadSources}  = require('../constants/AppConstants');
var assign            = require('react/lib/Object.assign');

var AppDispatcher = assign({}, new Dispatcher(), {
  handleViewAction(action: ?Object): void {
    var payload: Object = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };

    this.dispatch(payload);
  },

  handleServerAction(action: ?Object): void {
    var payload: Object = {
      source: PayloadSources.SERVER_ACTION,
      action: action
    };

    this.dispatch(payload);
  }
});

module.exports = AppDispatcher;
