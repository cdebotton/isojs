/** @flow */

var React = require('react/addons');
var {Navigation} = require('react-router');
var {LinkedStateMixin, update} = React.addons;
var UserActionCreators = require('../../actions/UserActionCreators');
var NameInput = require('../Common/NameInput.jsx');

var CreateUserHandler = React.createClass({
  mixins: [LinkedStateMixin, Navigation],

  getInitialState(): Object {
    return {email: null, password: null, firstName: null, lastName: null};
  },

  handleSubmit(event): void {
    event.preventDefault();

    var params = {
      email: this.state.email,
      password: this.state.password,
      name: {
        first: this.state.firstName,
        last: this.state.lastName
      }
    };

    UserActionCreators.createUser(params);

    this.setState({email: null, password: null, firstName: null, lastName: null});

    this.transitionTo('foo');
  },

  handleNameChange(first: string, last: string) {
    this.setState({
      firstName: first,
      lastName: last
    });
  },

  render(): void {
    return (
      <form onSubmit={this.handleSubmit}>
        <NameInput
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          onHandleChange={this.handleNameChange} />
        <fieldset>
          <input
            placeholder="Email"
            type="email"
            valueLink={this.linkState('email')} />
          <input
            placeholder="Password"
            type="password"
            valueLink={this.linkState('password')} />
        </fieldset>
        <button type="submit">Create</button>
      </form>
    );
  }
});

module.exports = CreateUserHandler;
