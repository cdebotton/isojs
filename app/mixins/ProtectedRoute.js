/** @flow */

var AuthStore = require('../stores/AuthStore');

var ProtectedRoute: any = {
  statics: {
    willTransitionTo(transition: Object, params: Object): void {
      if (! AuthStore.authed()) {
        transition.redirect('login');
      }
    }
  }
};

module.exports = ProtectedRoute;
