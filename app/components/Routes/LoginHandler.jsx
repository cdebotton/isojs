/** @flow */

var React = require('react/addons');
var {LinkedStateMixin} = React.addons;
var AuthActionCreators = require('../../actions/AuthActionCreators');

var LoginHandler = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState(): Object {
    return {email: null, password: null};
  },

  handleSubmit(event): void {
    event.preventDefault();
    var {email, password} = this.state;
    this.setState({email: null, password: null});

    AuthActionCreators.login(email, password);
  },

  render(): any {
    return (
      <div className="login-handler">
        <h2>Sign in</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="email" valueLink={this.linkState('email')} placeholder="Email" />
          <input type="password" valueLink={this.linkState('password')} placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
});

module.exports = LoginHandler;
