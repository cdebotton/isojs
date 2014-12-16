/** @flow */

var React                 = require('react/addons');
var request               = require('superagent');
var {CSSTransitionGroup}  = React.addons;

var Head                = require('../Layout/Head.jsx');
var Navigation          = require('../Layout/Navigation.jsx');

var {RouteHandler, State: StateMixin} = require('react-router');

var App = React.createClass({
  mixins: [StateMixin],

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
    var name = this.getRoutes().reverse()[0].name;

    return (
      <html lang="us">
      <Head env={env} />
      <body>
        <Navigation />
        <CSSTransitionGroup transitionName="page-change">
          <RouteHandler key={name} {...this.props} />
        </CSSTransitionGroup>
        {this.getBundle(env)}
      </body>
      </html>
    );
  }
});

module.exports = App;
