/** @flow */

var React                 = require('react/addons');
var request               = require('superagent');
var co                    = require('co');
var AuthAPI               = require('../utils/AuthAPI');
var AuthStore             = require('../stores/AuthStore');
var StoreMixin            = require('../mixins/StoreMixin');
var AsyncDataMixin        = require('../mixins/AsyncDataMixin');
var {CSSTransitionGroup}  = React.addons;

var Head                = require('./Layout/Head.jsx');
var Navigation          = require('./Layout/Navigation.jsx');

var {RouteHandler} = require('react-router');

var App = React.createClass({
  mixins: [StoreMixin(getState, AuthStore)],

  propTypes: {
    query: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired,
    env: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired
  },

  getBundle(env: string): any {
    var min = env === 'production' ? '.min' : '';

    return (
      <script src={'/bundle' + min + '.js'} />
    );
  },

  getMessage(): any {
    var {user} = this.state;
    return AuthStore.authed() ? (
      <p>{`Hello, ${user.getIn(['name', 'first'])} ${user.getIn(['name', 'last'])}`}</p>
    ) : false;
  },

  render(): any {
    var {env, title} = this.props;
    var name = this.getRoutes().reverse()[0].name;

    return (
      <html lang="us">
      <Head env={env} title={title} />
      <body>
        <Navigation />
        {this.getMessage()}
        <CSSTransitionGroup
          className="router"
          transitionName="route"
          component="div">
          <RouteHandler key={name} {...this.props} />
        </CSSTransitionGroup>
        {this.getBundle(env)}
      </body>
      </html>
    );
  }
});

function getState(params: Object, query: Object): Object {
  return {user: AuthStore.getCurrentUser()};
}

module.exports = App;
