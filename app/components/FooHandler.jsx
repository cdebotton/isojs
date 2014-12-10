/** @flow */

var React   = require('react');
var Promise = require('bluebird');
var {Link}  = require('react-router');

var UserActionCreators  = require('../actions/UserActionCreators');
var {ActionTypes}       = require('../constants/AppConstants');
var UsersStore          = require('../stores/UsersStore');
var StoreMixin          = require('../mixins/StoreMixin');
var UserAPI             = require('../utils/UserAPI');

var ITEMS_PER_PAGE = 20;

var FooHandler = React.createClass({
  mixins: [StoreMixin(getState)],

  statics: {
    willTransitionTo(transition: Object, params: Object): void {
      var {min, max} = params;

      min || (min = 0);
      max || (max = ITEMS_PER_PAGE);

      if (! this.hasQueried('users', {min: min, max: max})) {
        UserActionCreators.getUsers();
      }

      transition.wait(UserAPI.getPendingRequests([
        ActionTypes.GET_USERS
      ]));
    }
  },

  render(): any {
    var users = this.state.users.toArray();

    return (
      <div className="foo-handler">
        <h2>Foo Handler</h2>
        <ul>
          {users.map((user, i) => {
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
          })}
        </ul>
      </div>
    );
  }
});

function getState(params, query): Object {
  return {users: UsersStore.getState()};
}

module.exports = FooHandler;
