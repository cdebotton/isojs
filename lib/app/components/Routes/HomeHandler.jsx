/** @flow */

var React          = require('react');
var config         = require('../../config');

var HomeHandler = React.createClass({
  statics: {
    getPageTitle(): string {
      return config.title;
    }
  },

  render(): any {
    return (
      <div className="home-handler">
        <h2>Isomorphic koa&ndash;js server</h2>
      </div>
    );
  }
});

function getState(params: Object, query: Object): Object {
  return {};
}

module.exports = HomeHandler;
