/** @flow */

var keyMirror = require('react/lib/keyMirror');

var AppConstants = {
  PayloadSources: keyMirror({
    VIEW_ACTION   : null,
    SERVER_ACTION : null
  }),

  ActionTypes: keyMirror({
    AUTH_LOGOUT: null,
    AUTH_POST_LOGIN: null,
    AUTH_VERIFY_SESSION: null,
    GET_USERS: null,
    GET_USER_BY_ID: null,
    POST_USERS: null,
    PUT_USERS: null,
    DELETE_USERS: null,
    CREATE_USER: null,
    DESTROY_USER: null,
    UPDATE_USER: null,
    GET_SUBREDDIT: null,
    SET_TITLE: null,
    SET_SESSION: null,
    GET_CURRENT_USER: null
  }),

  TumblrActions: keyMirror({
    GET_POSTS: null,
    GET_BLOG_INFO: null,
    GET_AVATAR: null,
    GET_PHOTOS: null,
    GET_TEXT: null,
    GET_AUDIO: null,
    GET_VIDEO: null,
    GET_CHAT: null,
    GET_LINK: null,
    GET_ANSWER: null,
    GET_QUOTE: null
  }),

  ApiStates: keyMirror({
    READY: null,
    ERROR: null,
    BAD_REQUEST: null,
    TIMEOUT: null,
    PENDING: null
  })
};

module.exports = AppConstants;
