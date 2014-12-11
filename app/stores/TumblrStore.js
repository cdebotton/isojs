/** @flow */

var Immutable = require('immutable');
var assign  = require('react/lib/Object.assign');
var Store   = require('./Store');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var {TumblrActions} = require('../constants/AppConstants');
var {isUnresolved} = require('../utils/helpers');

var _tumblr = Immutable.Map({
  blog: Immutable.Map(),
  posts: Immutable.List()
});

var TumblrStore = assign({}, Store, {
  getState(): any {
    return _tumblr;
  }
});

TumblrStore.dispatchToken = AppDispatcher.register(function(payload: Payload): bool {
  var action: Action = payload.action;

  switch (action.type) {
    case TumblrActions.GET_TEXT:
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

function doesntExist(post) {
  var keys = _tumblr.get('posts').map(post => post.id);

  return keys.indexOf(post.id) === -1;
};

function storePosts(data) {
  var newPosts = data.posts.filter(doesntExist);

  _tumblr = _tumblr.updateIn(['blog'], (blog) => data.blog);
  _tumblr = _tumblr.updateIn(['posts'], (list) => list.concat(newPosts));
};

module.exports = TumblrStore;
