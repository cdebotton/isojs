/** @flow */

var React   = require('react');
var Promise = require('bluebird');

var UserActionCreators        = require('../actions/UserActionCreators');
var {ActionTypes}             = require('../constants/AppConstants');
var UsersStore                = require('../stores/UsersStore');
var StoreMixin                = require('../mixins/StoreMixin');
var AppWebAPIUtils            = require('../utils/AppWebAPIUtils');

var FooHandler = React.createClass({
  mixins: [StoreMixin(getState)],

  statics: {
    willTransitionTo(transition: Object, params: Object): void {
      UserActionCreators.getUsers();
      transition.wait(AppWebAPIUtils.getPendingRequest([
        ActionTypes.GET_USERS
      ]));
    }
  },

  render(): any {
    return (
      <div className="foo-handler">
        <h2>Foo Handler</h2>
        <ul>
          {this.state.users.map((user, i) => {
            var fullName = user.name.first + ' ' + user.name.last;
            var email = 'mailto:' + user.email;
            var url = '/users/' + user._id;

            return (
              <li className="user" key={i}>
                <h3>
                  <a href={url}>{fullName}</a>
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

function getState(): Object {
    return {users: UsersStore.getState()};
}

module.exports = FooHandler;
