/** @flow */

var React             = require('react');
var App               = require('./App.jsx');
var HomeHandler       = require('./Routes/HomeHandler.jsx');
var PostsHandler      = require('./Routes/PostsHandler.jsx');
var UsersHandler      = require('./Routes/UsersHandler.jsx');
var UserHandler       = require('./Routes/UserHandler.jsx');
var LoginHandler      = require('./Routes/LoginHandler.jsx');
var CreateUserHandler = require('./Routes/CreateUserHandler.jsx');

var {Route, DefaultRoute, NotFoundRoute} = require('react-router');

module.exports = (
  <Route handler={App} addHandlerKey={true}>
    <DefaultRoute name="index" handler={HomeHandler} addHandlerKey={true} />
    <Route name="posts" path="/posts" handler={PostsHandler} addHandlerKey={true}>
      <Route name="post" path=":postType" handler={PostsHandler} addHandlerKey={true} />
    </Route>
    <Route name="users" handler={UsersHandler} addHandlerKey={true}>
      <Route name="create-user" path="create" handler={CreateUserHandler} addHandlerKey={true} />
      <Route name="user" path=":userId" handler={UserHandler} addHandlerKey={true} />
    </Route>
    <Route name="login" handler={LoginHandler} addHandlerKey={true} />
  </Route>
);
