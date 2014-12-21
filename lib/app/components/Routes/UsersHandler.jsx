/** @flow */

var React   = require('react');
var co      = require('co');
var Promise = require('bluebird');
var {Link, RouteHandler} = require('react-router');

var DeleteUser          = require('../common/DeleteUser.jsx');
var UserActionCreators  = require('../../actions/UserActionCreators');
var PageActionCreators  = require('../../actions/PageActionCreators');
var {ActionTypes}       = require('../../constants/AppConstants');
var UserStore           = require('../../stores/UserStore');
var PageStore           = require('../../stores/PageStore');
var ProtectedRouteMixin = require('../../mixins/ProtectedRouteMixin');
var AsyncDataMixin      = require('../../mixins/AsyncDataMixin');
var StoreMixin          = require('../../mixins/StoreMixin');
var UserAPI             = require('../../utils/UserAPI');


var UsersHandler = React.createClass({
  statics: {
    getPageTitle(): string {
      return 'users';
    }
  },

  mixins: [
    StoreMixin(getState, UserStore),
    AsyncDataMixin(fetchData),
    ProtectedRouteMixin
  ],

  render(): any {
    return (
      <div className="foo-handler">
        <h2>Foo Handler</h2>
        <Link to="create-user">New</Link>
        <RouteHandler {...this.props} />
        <ul>{getUsersList(this.state.users)}</ul>
      </div>
    );
  }
});

function getUsersList(users: Object): any {
  return users.toJS().map(function(user: Object, i: number) {
    var fullName = user.name.first + ' ' + user.name.last;
    var email = 'mailto:' + user.email;
    return (
      <li className="user" key={i}>
        <h3>
          {user._id ?
            <Link to="user" params={{userId: user._id}}>{fullName}</Link> :
            <span>{{fullName}}</span>}
          <span>&nbsp;</span>
          <a href={email}><i className="fa fa-envelope-o" /></a>
          {user._id ? <DeleteUser userId={user._id}>x</DeleteUser> : false}
        </h3>
      </li>
    );
  });
};

function getState(params: Object, query: Object): Object {
  return {users: UserStore.getState().get('entities')};
}

function fetchData(params: Object, query: Object): any {
  return co(function *() {
    yield UserAPI.getUsers();
  });
}

module.exports = UsersHandler;
