/** @flow */

var React = require('react/addons');
var request = require('superagent');
var co = require('co');
var {RouteHandler} = require('react-router');
var {State: RouterStateMixin} = require('react-router');

var AuthAPI = require('../utils/AuthAPI');
var AsyncDataMixin = require('../mixins/AsyncDataMixin');
var {CSSTransitionGroup} = React.addons;

var Head = require('./Layout/Head.jsx');
var Navigation = require('./Layout/Navigation.jsx');

var App = React.createClass({
  mixins: [RouterStateMixin],

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

  render(): any {
    var {env, title} = this.props;
    var name = this.getRoutes().reverse()[0].name;

    return (
      <html lang="us">
      <Head env={env} title={title} />
      <body>
        <Navigation />
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

module.exports = App;
