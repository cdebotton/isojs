var jsonp   = require('./jsonp');
var co      = require('co');
var assign  = require('react/lib/Object.assign');

var AppDispatcher = require('../dispatchers/AppDispatcher');
var {ApiStates, TumblrActions} = require('../constants/AppConstants');

var API_KEY = 'fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4';
var API_URL = 'http://api.tumblr.com/v2/blog/cbotzzz.tumblr.com';

function dispatch(key: string, res: any, params: Object) {
  AppDispatcher.handleServerAction({
    type: key,
    response: res,
    params: params
  });
}

function makeRequest(url, key, params) {
  params || (params = {});

  return co(function *() {
    var params  = assign({}, params, {api_key: API_KEY});
    dispatch(key, ApiStates.PENDING, params);

    var res = yield jsonp(url, params);
    try {
      return res.response;
    }
    catch (err) {
      throw err;
    }
  }).then(function(data) {
    dispatch(key, data, params);
    return data;
  });
};

var TumblrAPI = {
  blog(params: Object): any {
    return co(function* () {
      var key = TumblrActions.GET_BLOG_INFO;
      var res = yield makeRequest(`${API_URL}/info`, key, params);

      return res;
    });
  },

  posts(params: Object): any {
    return co(function* () {
      var key = TumblrActions.GET_POSTS;
      var res = yield makeRequest(`${API_URL}/posts`, key, params);

      return res;
    });
  },

  photos(params: Object): any {
    return co(function* () {
      var key = TumblrActions.GET_PHOTOS;
      var res = yield makeRequest(`${API_URL}/posts/photo`, key, params);

      return res;
    });
  },


  avatar(params: Object): any {
    return co(function* () {
      var key = TumblrActions.GET_AVATAR;
      var res = yield makeRequest(`${API_URL}/avatar`, key, params);

      return res;
    });
  }
};

module.exports = TumblrAPI;
