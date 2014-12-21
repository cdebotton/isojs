/** @flow */

var React  = require('react');
var {Link} = require('react-router');
var StoreMixin = require('../../mixins/StoreMixin');
var AuthStore = require('../../stores/AuthStore');
var AuthActionCreators = require('../../actions/AuthActionCreators');

var Navigation = React.createClass({
  mixins: [StoreMixin(getState, AuthStore)],

  handleLogout(event: Object): void {
    event.preventDefault();
    AuthActionCreators.logout();
  },

  render(): any {
    return (
      <nav className="navigation">
        <Link to="index"><i className="fa fa-home" /></Link>
        <Link to="posts"><i className="fa fa-tumblr" /></Link>
        {this.state.authed ? <Link to="users"><i className="fa fa-users" /></Link> : false}
        {! this.state.authed ? <Link to="login"><i className="fa fa-sign-in" /></Link>: false}
        {this.state.authed ? <a href="#" onClick={this.handleLogout}><i className="fa fa-sign-out" /></a>: false}
      </nav>
    );
  }
});

function getState(params: Object, query: Object) {
  return {authed: AuthStore.authed()};
}

module.exports = Navigation;
