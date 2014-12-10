/** @flow */

var Immutable = require('immutable');
var assign  = require('react/lib/Object.assign');
var Store   = require('./Store');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var {TumblrActions} = require('../constants/AppConstants');
var {isUnresolved} = require('../utils/helpers');

var _tumblr = Immutable.Map({

});

var TumblrStore = assign({}, Store, {
  getState(): any {
    return _tumblr;
  }
});

TumblrStore.dispatchToken = AppDispatcher.register(function(payload: Payload): bool {
  var action: Action = payload.action;

  switch (action.type) {
    case TumblrActions.GET_PHOTOS:
    case TumblrActions.GET_POSTS:
      if (! isUnresolved(action.response)) {
        storePosts(action.response);
        TumblrStore.emitChange();
      }
      break;
    case TumblrActions.GET_BLOG_INFO:
      break;
    case TumblrActions.GET_AVATAR:
      break;
  }

  return true;
});

function storePosts(posts) {
  _tumblr = Immutable.fromJS(posts);
};

module.exports = TumblrStore;
