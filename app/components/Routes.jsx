/** @flow */

var React       = require('react');
var App         = require('./App.jsx');
var HomeHandler = require('./Routes/HomeHandler.jsx');
var FooHandler  = require('./Routes/FooHandler.jsx');
var BarHandler  = require('./Routes/BarHandler.jsx');
var {Route, DefaultRoute, NotFoundRoute} = require('react-router');

module.exports = (
  <Route handler={App}>
    <DefaultRoute name="index" handler={HomeHandler} />
    <Route name="post" path="/posts/:postType" handler={HomeHandler} />
    <Route name="foo" handler={FooHandler} />
    <Route name="bar" path="/users/:userId" handler={BarHandler} />
  </Route>
);
