/** @flow */

var React                 = require('react/addons');
var StoreMixin            = require('../mixins/StoreMixin');
var {ActionTypes}         = require('../constants/AppConstants');
var UserAPI               = require('../utils/UserAPI');
var UsersStore            = require('../stores/UsersStore');
var UserActionCreators    = require('../actions/UserActionCreators');

var {update} = React.addons;

var NameInput = require('./NameInput.jsx');

var FooHandler = React.createClass({
  mixins: [StoreMixin(getState)],

  statics: {
    willTransitionTo(transition: Object, params: Object): void {
      if (! UsersStore.getById(params.userId)) {
        UserActionCreators.getUserById(params.userId);
      }

      transition.wait(UserAPI.getPendingRequests([
        ActionTypes.GET_USER_BY_ID
      ]));
    },
  },

  handleNameChange(first, last): Function {
    var user = this.state.user
      .updateIn(['name', 'first'], value => first)
      .updateIn(['name', 'last'], value => last);

    this.setState({user: user});
  },

  handleEmailChange(event: Object): Function {
    var user = this.state.user.set('email', event.target.value);
    this.setState({user: user});
  },

  handleSubmit(event: Object): void {
    event.preventDefault();
    // var user = getById(this.state.users, this.getParams().userId);
    // console.log(user);
  },

  render(): any {
    var user = this.state.user.toJS();

    return (
      <div className="bar-handler">
        <h2>Bar Handler</h2>
        <form
          className="bar-form"
          onSubmit={this.handleSubmit}>
          <legend>var userId = {user._id}</legend>
          <NameInput
            name={user.name}
            onHandleChange={this.handleNameChange} />
          <input
            type="email"
            placeholder="Email"
            defaultValue={user.email}
            onChange={this.handleEmailChange} />
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
});

function getState(params: Object, query: Object): Object {
  return {user: UsersStore.getById(params.userId)};
}

module.exports = FooHandler;
