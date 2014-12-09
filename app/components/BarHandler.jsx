/** @flow */

var React                 = require('react');
var StoreMixin            = require('../mixins/StoreMixin');
var {ActionTypes}         = require('../constants/AppConstants');
var {State: RouterState}  = require('react-router');
var UserAPI               = require('../utils/UserAPI');
var UsersStore            = require('../stores/UsersStore');
var UserActionCreators    = require('../actions/UserActionCreators');

var FooHandler = React.createClass({
  mixins: [StoreMixin(getState), RouterState],

  statics: {
    willTransitionTo(transition: Object, params: Object): void {
      if (! this.has(UsersStore.getState(), params.userId)) {
        UserActionCreators.getUserById(params.userId);
      }

      transition.wait(UserAPI.getPendingRequests([
        ActionTypes.GET_USER_BY_ID
      ]));
    },
  },

  render(): any {
    var {userId}  = this.getParams();
    var user      = getById(this.state.users, userId);

    return (
      <div className="foo-handler">
        <h2>Bar Handler</h2>
        <p>var userId = '{userId}';</p>
        <h3>Last name: {user.name.last}</h3>
        <h4>First name: {user.name.first}</h4>
        <p>Email: <a href={'mailto:'+user.email}>{user.email}</a></p>
      </div>
    );
  }
});

function getById(users, id) {
  return users.filter(user => user._id === id)[0];
};

function getState(id): Object {
  return {users: UsersStore.getState()};
}

module.exports = FooHandler;
