var AuthStore = require('../stores/AuthStore');

var ProtectedRoute = {
  statics: {
    willTransitionTo(transition, params) {
      if (! AuthStore.authed()) {
        transition.redirect('login');
      }
    }
  }
};

module.exports = ProtectedRoute;
