/** @flow */

var React = require('react');

var UserActionCreators  = require('../actions/UserActionCreators');
var UsersStore          = require('../stores/UsersStore');

var FooHandler = React.createClass({
  statics: {
    willTransitionTo(transition: Object, params: Object) {
      // transition.wait(UsersStore.getPending());
    }
  },

  getInitialState(): Object {
    return getState();
  },

  // componentDidMount(): void {
  //   UsersStore.addChangeListener(this.handleChange);
  // },

  // componentWillUnmount(): void {
  //   UsersStore.removeChangeListener(this.handleChange);
  // },

  // handleChange(): void {
  //   this.setState(getState());
  // },

  render(): any {
    var users = this.state.users.map((user, i) => {
      return (
        <div className="user" key={'users:'+i}>
          <h2>{user.name.first} {user.name.last}</h2>
          <h3>{user.email}</h3>
        </div>
      );
    });

    return (
      <div className="foo-handler">
        <h2>Foo Handler</h2>
        {users}
      </div>
    );
  }
});

function getState(): Object {
    return {users: UsersStore.getState()};
}

module.exports = FooHandler;
