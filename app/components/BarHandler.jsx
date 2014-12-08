/** @flow */

var React = require('react');
var StoreMixin = require('../mixins/StoreMixin');
var {State: RouterState} = require('react-router');

var FooHandler = React.createClass({
  mixins: [StoreMixin(getState), RouterState],

  render(): any {
    var {userId} = this.getParams();

    return (
      <div className="foo-handler">
        <h2>Bar Handler</h2>
        <p>var userId = '{userId}';</p>
      </div>
    );
  }
});

function getState(): Object {
    return {};
}

module.exports = FooHandler;
