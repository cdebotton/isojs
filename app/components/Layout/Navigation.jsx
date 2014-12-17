/** @flow */

var React  = require('react');
var {Link} = require('react-router');
var StoreMixin = require('../../mixins/StoreMixin');
var AuthStore = require('../../stores/AuthStore');

var Navigation = React.createClass({
  mixins: [StoreMixin(getState, AuthStore)],

  render(): any {
    return (
      <nav className="navigation">
        <Link to="index"><i className="fa fa-home" /></Link>
        <Link to="posts"><i className="fa fa-tumblr" /></Link>
        {this.state.authed ? <Link to="foo"><i className="fa fa-users" /></Link> : false}
        <Link to="login"><i className="fa fa-sign-in" /></Link>
      </nav>
    );
  }
});

function getState(params: Object, query: Object) {
  return {authed: AuthStore.authed()};
}

module.exports = Navigation;
