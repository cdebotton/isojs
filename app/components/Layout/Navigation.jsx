/** @flow */

var React   = require('react');
var {Link}  = require('react-router');

var Navigation = React.createClass({
  render(): any {
    return (
      <nav className="navigation">
        <Link to="index"><i className="fa fa-home" /></Link>
        <Link to="posts"><i className="fa fa-tumblr" /></Link>
        <Link to="foo"><i className="fa fa-users" /></Link>
        <Link to="login"><i className="fa fa-sign-in" /></Link>
      </nav>
    );
  }
});

module.exports = Navigation;
