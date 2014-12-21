/** @flow */

var React = require('react');

var NotFoundHandler = React.createClass({
  statics: {
    getPageTitle(): string {
      return 'page not found';
    }
  },

  render(): any {
    return (
      <p>404, not found</p>
    );
  }
});

module.exports = NotFoundHandler;
