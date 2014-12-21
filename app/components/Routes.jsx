/** @flow */

var React             = require('react');
var App               = require('./App.jsx');
var HomeHandler       = require('./Routes/HomeHandler.jsx');
var PostsHandler      = require('./Routes/PostsHandler.jsx');
var UsersHandler      = require('./Routes/UsersHandler.jsx');
var UserHandler       = require('./Routes/UserHandler.jsx');
var NotFoundHandler   = require('./Routes/NotFoundHandler.jsx');
var LoginHandler      = require('./Routes/LoginHandler.jsx');
var CreateUserHandler = require('./Routes/CreateUserHandler.jsx');

var {Route, DefaultRoute, NotFoundRoute} = require('react-router');

module.exports = (
  <Route handler={App}>
    <DefaultRoute name="index" handler={HomeHandler} />
    <Route name="posts" path="/posts" handler={PostsHandler}>
      <Route name="post" path=":postType" handler={PostsHandler} />
    </Route>
    <Route name="users" handler={UsersHandler}>
      <Route name="create-user" path="create" handler={CreateUserHandler} />
      <Route name="user" path=":userId" handler={UserHandler} />
    </Route>
    <Route name="login" handler={LoginHandler} />
    <NotFoundRoute handler={NotFoundHandler} />
  </Route>
);
