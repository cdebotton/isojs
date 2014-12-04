var keyMirror = require('react/lib/keyMirror');

var AppConstants = {
  PayloadSources: keyMirror({
    VIEW_ACTION   : null,
    SERVER_ACTION : null
  }),

  ActionTypes: keyMirror({

  }),

  ApiStates: keyMirror({
    READY         : null,
    ERROR         : null,
    BAD_REQUEST   : null,
    TIMEOUT       : null,
    PENDING       : null
  })
};

module.exports = AppConstants;
