/** @flow */

var React   = require('react');
var {Link}  = require('react-router');

var Navigation = React.createClass({
  render(): any {
    return (
      <nav className="navigation">
        <Link to="index"><i className="fa fa-home" /></Link>
        <Link to="foo"><i className="fa fa-users" /></Link>
      </nav>
    );
  }
});

module.exports = Navigation;
