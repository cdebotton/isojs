/** @flow */

var React       = require('react');
var App         = require('./App.jsx');
var HomeHandler = require('./Routes/HomeHandler.jsx');
var PostsHandler = require('./Routes/PostsHandler.jsx');
var FooHandler  = require('./Routes/FooHandler.jsx');
var BarHandler  = require('./Routes/BarHandler.jsx');

var {Route, DefaultRoute, NotFoundRoute} = require('react-router');

module.exports = (
  <Route handler={App}>
    <DefaultRoute name="index" handler={HomeHandler} />
    <Route name="posts" path="/posts" handler={PostsHandler}>
      <Route name="post" path=":postType" handler={PostsHandler} />
    </Route>
    <Route name="foo" handler={FooHandler}>
      <Route name="bar" path=":userId" handler={BarHandler} />
    </Route>
  </Route>
);
