/** @flow */

var React   = require('react');
var {Link}  = require('react-router');

var Navigation = React.createClass({
  render(): any {
    return (
      <nav className="navigation">
        <Link to="index">Home</Link>
        <Link to="foo">Foo</Link>
      </nav>
    );
  }
});

module.exports = Navigation;
