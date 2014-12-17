/** @flow */

var React   = require('react');
var co      = require('co');
var Promise = require('bluebird');
var {Link, RouteHandler} = require('react-router');

var DeleteUser          = require('../common/DeleteUser.jsx');
var UserActionCreators  = require('../../actions/UserActionCreators');
var PageActionCreators  = require('../../actions/PageActionCreators');
var {ActionTypes}       = require('../../constants/AppConstants');
var UserStore       = require('../../stores/UserStore');
var PageStore           = require('../../stores/PageStore');
var AsyncDataMixin      = require('../../mixins/AsyncDataMixin');
var StoreMixin          = require('../../mixins/StoreMixin');
var UserAPI             = require('../../utils/UserAPI');


var FooHandler = React.createClass({
  mixins: [StoreMixin(getState, UserStore), AsyncDataMixin(fetchData)],

  render(): any {
    return (
      <div className="foo-handler">
        <h2>Foo Handler</h2>
        <Link to="createUser">New</Link>
        <RouteHandler {...this.props} />
        <ul>{getUsersList(this.state.users)}</ul>
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
          {user._id ?
            <Link to="bar" params={{userId: user._id}}>{fullName}</Link> :
            <span>{{fullName}}</span>}
          <span>&nbsp;</span>
          <a href={email}><i className="fa fa-envelope-o" /></a>
          {user._id ? <DeleteUser userId={user._id}>x</DeleteUser> : false}
        </h3>
      </li>
    );
  });
};

function getTitle(title) {
  return new Promise(function(resolve, reject) {
    var handleChange = function() {
      PageStore.removeChangeListener(handleChange);
      resolve(PageStore.getState().get('title'));
    };
    PageStore.addChangeListener(handleChange);
    PageActionCreators.setTitle(title);
  });
}

function getState(params: Object, query: Object): Object {
  return {users: UserStore.getState().get('entities')};
}

function fetchData(params: Object, query: Object): any {
  return co(function *() {
    yield UserAPI.getUsers();
    yield getTitle('foo')
  });
}

module.exports = FooHandler;
