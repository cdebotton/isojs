/** @flow */

var React = require('react');

var Head = React.createClass({
  getStylesheets(env: string) {
    var min = env === 'production' ? '.min' : '';

    return (
      <link
        href={'/stylesheets/app' + min + '.css'}
        rel="stylesheet" />
      );
  },

  render(): any {
    var {env} = this.props;
    var stylesheets = this.getStylesheets(env);

    return (
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>koajs test</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href='http://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic|Josefin+Slab:400,600' rel='stylesheet' />
        {stylesheets}
      </head>
    );
  }
});

module.exports = Head;
