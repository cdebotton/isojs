var React           = require('react');
var {RouteHandler}  = require('react-router');

var App = React.createClass({
  render(): any {
    return (
      <html lang="us">
      <head>
        <title>koajs test</title>
      </head>
      <body>
        <RouteHandler />
      </body>
      </html>
    );
  }
});

module.exports = App;
