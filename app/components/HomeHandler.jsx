/** @flow */

var React           = require('react');
var {RouteHandler}  = require('react-router');
var StoreMixin      = require('../mixins/StoreMixin');

function getState(): Object {
  return {};
}

var HomeHandler = React.createClass({
  mixins: [StoreMixin(getState)],

  render(): any {
    return (
      <div className="home-handler">
        <h2>Home Handler</h2>
      </div>
    );
  }
});

module.exports = HomeHandler;
