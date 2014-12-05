/** @flow */

var React = require('react');

var FooHandler = React.createClass({
  render(): any {
    return (
      <div className="foo-handler">
        <h2>Foo Handler</h2>
      </div>
    );
  }
});

module.exports = FooHandler;
