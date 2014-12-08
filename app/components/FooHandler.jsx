/** @flow */

var React = require('react');

var UserActionCreators  = require('../actions/UserActionCreators');
var UsersStore          = require('../stores/UsersStore');

var FooHandler = React.createClass({
  statics: {
    willTransitionTo(transition: Object, params: Object) {
      var users = UserActionCreators.getUsers();
      transition.wait(users);
    }
  },

  getInitialState(): Object {
    return getState();
  },

  componentDidMount(): void {
    UsersStore.addChangeListener(this.handleChange);
  },

  componentWillUnmount(): void {
    UsersStore.removeChangeListener(this.handleChange);
  },

  handleChange(): void {
    this.setState(getState());
  },

  render(): any {
    return (
      <div className="foo-handler">
        <h2>Foo Handler</h2>
        {this.state.users.map((user, i) => {
          return (
            <div className="user" key={i}>
              <h3>
                <a href={'mailto:'+user.email}>
                  {user.name.first} {user.name.last}
                </a>
              </h3>
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
