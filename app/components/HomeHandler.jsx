var React           = require('react');
var {RouteHandler}  = require('react-router');

var HomeHandler = React.createClass({
  render(): any {
    return (
      <div className="home-handler">
        <h2>Home Handler</h2>
      </div>
    );
  }
});

module.exports = HomeHandler;
