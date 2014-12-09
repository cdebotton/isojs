/** @flow */

var AuthStore = require('../stores/AuthStore');

var ProtectedRoute = {
  statics: {
    willTransitionTo(transition: Object, params: Object): void {
      if (! AuthStore.authed()) {
        transition.redirect('login');
      }
    }
  }
};

module.exports = ProtectedRoute;
