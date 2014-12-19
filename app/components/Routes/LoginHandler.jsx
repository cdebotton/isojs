/** @flow */

var React = require('react/addons');
var {Navigation} = require('react-router');
var {LinkedStateMixin} = React.addons;
var AuthStore = require('../../stores/AuthStore');
var PageTitleMixin = require('../../mixins/PageTitleMixin');
var AuthActionCreators = require('../../actions/AuthActionCreators');

var LoginHandler = React.createClass({
  mixins: [LinkedStateMixin, PageTitleMixin, Navigation],

  statics: {
    willTransitionTo(transition: Object): void {
      if (AuthStore.authed()) {
        transition.redirect('users');
      }
    }
  },

  getInitialState(): Object {
    return {email: null, password: null};
  },

  componentDidMount(): void {
    AuthStore.addChangeListener(this.onAuthChange);
  },

  componentWillUnmount(): void {
    AuthStore.removeChangeListener(this.onAuthChange);
  },

  onAuthChange(): void {
    if (AuthStore.authed()) {
      process.nextTick(function() {
        this.transitionTo('users');
      }.bind(this));
    }
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
        <h2>Login</h2>
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
