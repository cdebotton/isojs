/** @flow */

var React       = require('react');
var App         = require('./App.jsx');
var HomeHandler = require('./Routes/HomeHandler.jsx');
var PostsHandler = require('./Routes/PostsHandler.jsx');
var FooHandler  = require('./Routes/FooHandler.jsx');
var BarHandler  = require('./Routes/BarHandler.jsx');

var {Route, DefaultRoute, NotFoundRoute} = require('react-router');

module.exports = (
  <Route handler={App} addHandlerKey={true}>
    <DefaultRoute name="index" handler={HomeHandler} addHandlerKey={true} />
    <Route name="posts" path="/posts" handler={PostsHandler} addHandlerKey={true}>
      <Route name="post" path=":postType" handler={PostsHandler} addHandlerKey={true} />
    </Route>
    <Route name="foo" handler={FooHandler} addHandlerKey={true}>
      <Route name="bar" path=":userId" handler={BarHandler} addHandlerKey={true} />
    </Route>
  </Route>
);
