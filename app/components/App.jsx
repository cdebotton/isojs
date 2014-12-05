var React            = require('react');
var {RouteHandler}   = require('react-router');
var request          = require('superagent');

var Head                = require('./Head.jsx');
var Navigation          = require('./Navigation.jsx');

var App = React.createClass({
  propTypes: {
    query: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired,
    env: React.PropTypes.string.isRequired
  },

  getBundle(env: string): any {
    var min = env === 'production' ? '.min' : '';

    return (
      <script src={'/bundle' + min + '.js'} />
    );
  },

  render(): any {
    var {env} = this.props;
    var Bundle = this.getBundle(env);

    return (
      <html lang="us">
      <Head env={env} />
      <body>
        <Navigation />
        <RouteHandler {...this.props} />
        {Bundle}
      </body>
      </html>
    );
  }
});

module.exports = App;
