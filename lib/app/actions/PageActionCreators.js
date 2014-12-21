/** @flow */

var AppDispatcher   = require('../dispatchers/AppDispatcher');
var {ActionTypes}   = require('../constants/AppConstants');

var PageActionCreators: Object = {
  setTitle(title: string): void {
    AppDispatcher.handleViewAction({
      type: ActionTypes.SET_TITLE,
      title: title
    });
  }
};

module.exports = PageActionCreators;
