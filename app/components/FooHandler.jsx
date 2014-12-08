/** @flow */

var React = require('react');

var UserActionCreators  = require('../actions/UserActionCreators');
var UsersStore          = require('../stores/UsersStore');
var StoreMixin          = require('../mixins/StoreMixin');

var FooHandler = React.createClass({
  mixins: [StoreMixin(getState)],

  statics: {
    willTransitionTo(transition: Object, params: Object) {
      transition.wait(UserActionCreators.getUsers());
    }
  },

  render(): any {
    return (
      <div className="foo-handler">
        <h2>Foo Handler</h2>
        {this.state.users.map((user, i) => {
          var fullName = user.name.first + ' ' + user.name.last;
          var email = 'mailto:' + user.email;

          return (
            <div className="user" key={i}>
              <h3><a href={email}>{fullName}</a></h3>
            </div>
          );
        })}
      </div>
    );
  }
});

function getState(): Object {
    return {users: UsersStore.getState()};
}

module.exports = FooHandler;
