/** @flow */

var assign = require('react/lib/Object.assign');
var AuthStore = require('../stores/AuthStore');
var {Navigation: NavigationMixin} = require('react-router');

var ProtectedRoute: any = assign({}, NavigationMixin, {
  statics: {
    willTransitionTo(transition: Object, params: Object): void {
      if (! AuthStore.authed()) {
        transition.redirect('login');
      }
    }
  },

  componentDidMount(): void {
    AuthStore.addChangeListener(this.onChange);
  },

  componentWillUnmount(): void {
    AuthStore.removeChangeListener(this.onChange);
  },

  onChange(): void {
    if (! AuthStore.authed()) {
      this.transitionTo('login');
    }
  }
});

module.exports = ProtectedRoute;
