var React           = require('react');
var {RouteHandler}  = require('react-router');

var App = React.createClass({
  render(): any {
    return (
      <html lang="us">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>koajs test</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href='http://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic|Josefin+Slab:400,600' rel='stylesheet' />
        <link href="/stylesheets/app.css" rel="stylesheet" />
      </head>
      <body>
        <RouteHandler />
        <script src="/bundle.js" />
      </body>
      </html>
    );
  }
});

module.exports = App;
