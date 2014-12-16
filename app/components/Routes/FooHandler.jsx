/** @flow */

var React   = require('react');
var Promise = require('bluebird');
var {Link}  = require('react-router');

var UserActionCreators  = require('../../actions/UserActionCreators');
var {ActionTypes}       = require('../../constants/AppConstants');
var UsersStore          = require('../../stores/UsersStore');
var AsyncDataMixin      = require('../../mixins/AsyncDataMixin');
var StoreMixin          = require('../../mixins/StoreMixin');
var UserAPI             = require('../../utils/UserAPI');

var FooHandler = React.createClass({
  mixins: [StoreMixin(getState), AsyncDataMixin(fetchData)],

  render(): any {
    return (
      <div className="foo-handler">
        <h2>Foo Handler</h2>
        <ul>
          {getUsersList(this.state.users)}
        </ul>
      </div>
    );
  }
});

function getUsersList(users: Object): any {
  return users.toArray().map(function(user: Object, i: number) {
    var fullName = user.name.first + ' ' + user.name.last;
    var email = 'mailto:' + user.email;

    return (
      <li className="user" key={i}>
        <h3>
          <Link to="bar" params={{userId: user._id}}>{fullName}</Link>
          <span>&nbsp;</span>
          <a href={email}><i className="fa fa-envelope-o" /></a>
        </h3>
      </li>
    );
  });
};

function getState(params: Object, query: Object): Object {
  return {users: UsersStore.getState()};
}

function fetchData(params: Object, query: Object): any {
  return UserAPI.getUsers();
}

module.exports = FooHandler;
