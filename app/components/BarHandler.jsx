/** @flow */

var React                 = require('react/addons');
var StoreMixin            = require('../mixins/StoreMixin');
var {ActionTypes}         = require('../constants/AppConstants');
var {State: RouterState}  = require('react-router');
var UserAPI               = require('../utils/UserAPI');
var UsersStore            = require('../stores/UsersStore');
var UserActionCreators    = require('../actions/UserActionCreators');

var {update} = React.addons;

var NameInput = require('./NameInput.jsx');

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

  handleNameChange(id: string): Function {
    var {users} = this.state;
    var index   = this.state.users.map(user => user._id).indexOf(id);

    return function(first: string, last: string): void {
      var updateObject: Object = {};
      updateObject[index] = {name: {first: { $set: first}}};
      var state = update(this.state.users, updateObject);

      this.setState({users: state});
    }.bind(this)
  },

  handleEmailChange(id: string): Function {
    var {users} = this.state;
    var index   = this.state.users.map(user => user._id).indexOf(id);

    return function(event: Object): void {
      var updateObject: Object = {};

      updateObject[index] = {email: { $set: event.target.value}};
      var state = update(this.state.users, updateObject);

      this.setState({users: state});
    }.bind(this)
  },

  handleSubmit(event: Object): void {
    event.preventDefault();

    var user = getById(this.state.users, this.getParams().userId);

    console.log(user);
  },

  render(): any {
    var {userId}  = this.getParams();
    var user      = getById(this.state.users, userId);

    return (
      <div className="bar-handler">
        <h2>Bar Handler</h2>
        <form
          className="bar-form"
          onSubmit={this.handleSubmit}>
          <legend>var userId = '{userId}';</legend>
          <NameInput
            name={user.name}
            onHandleChange={this.handleNameChange(userId)} />
          <input
            type="email"
            placeholder="Email"
            defaultValue={user.email}
            onChange={this.handleEmailChange(userId)} />
          <button type="submit">Save</button>
        </form>
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
