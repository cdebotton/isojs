/** @flow */

var React                 = require('react/addons');
var co                    = require('co');
var Immutable             = require('immutable');

var AsyncDataMixin        = require('../../mixins/AsyncDataMixin');
var ProtectedRouteMixin   = require('../../mixins/ProtectedRouteMixin');
var StoreMixin            = require('../../mixins/StoreMixin');
var {ActionTypes}         = require('../../constants/AppConstants');
var UserAPI               = require('../../utils/UserAPI');
var UserStore             = require('../../stores/UserStore');
var PageStore             = require('../../stores/PageStore');
var PageActionCreators    = require('../../actions/PageActionCreators');
var UserActionCreators    = require('../../actions/UserActionCreators');

var NameInput = require('../Common/NameInput.jsx');

var UserHandler = React.createClass({
  statics: {
    getPageTitle(params: Object, query: Object) {
      var user = UserStore.find(params.userId).toJS();

      return `${user.name.first} ${user.name.last}`.toLowerCase();
    }
  },

  mixins: [
    StoreMixin(getState, UserStore),
    AsyncDataMixin(fetchData),
    ProtectedRouteMixin
  ],

  handleNameChange(first: string, last: string): void {
    var user = this.state.user
      .updateIn(['name', 'first'], value => first)
      .updateIn(['name', 'last'], value => last);

    this.setState({user: user});
  },

  handleEmailChange(event: Object): void {
    var user = this.state.user.set('email', event.target.value);

    this.setState({user: user});
  },

  handleSubmit(event: Object): void {
    event.preventDefault();
    var id = this.state.user.get('_id');
    var params = this.state.user.toJS();
    delete params._id;

    UserActionCreators.updateUser(id, params);
    this.transitionTo('foo');
  },

  getForm() {
    return this.state.user ? (
      <form
        className="bar-form"
        onSubmit={this.handleSubmit}>
        <legend>var userId = {this.state.user.get('_id')}</legend>
        <NameInput
          firstName={this.state.user.getIn(['name', 'first'])}
          lastName={this.state.user.getIn(['name', 'last'])}
          onHandleChange={this.handleNameChange} />
        <input
          type="email"
          placeholder="Email"
          value={this.state.user.get('email')}
          onChange={this.handleEmailChange} />
        <button type="submit">Save</button>
      </form>
    ) : <p>Loading...</p>;
  },

  render(): any {
    return (
      <div className="bar-handler">
        <h2>Bar Handler</h2>

        {this.getForm()}
      </div>
    );
  }
});

function getState(params: Object, query?: Object): Object {
  return {user: UserStore.find(params.userId)};
}

function fetchData(params: Object, query: Object): any {
  return co(function *() {
    yield UserAPI.getUserById(params.userId);
  });
}

module.exports = UserHandler;
