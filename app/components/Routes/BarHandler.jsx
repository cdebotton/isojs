/** @flow */

var React                 = require('react/addons');
var co                    = require('co');

var AsyncDataMixin        = require('../../mixins/AsyncDataMixin');
var StoreMixin            = require('../../mixins/StoreMixin');
var {ActionTypes}         = require('../../constants/AppConstants');
var UserAPI               = require('../../utils/UserAPI');
var UsersStore            = require('../../stores/UsersStore');
var PageStore             = require('../../stores/PageStore');
var PageActionCreators    = require('../../actions/PageActionCreators');
var UserActionCreators    = require('../../actions/UserActionCreators');

var NameInput = require('../Common/NameInput.jsx');

var FooHandler = React.createClass({
  mixins: [StoreMixin(getState, UsersStore), AsyncDataMixin(fetchData)],

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

function getTitle(title) {
  return new Promise(function(resolve, reject) {
    var handleChange = function() {
      PageStore.removeChangeListener(handleChange);
      resolve(PageStore.getState().get('title'));
    };
    PageStore.addChangeListener(handleChange);
    PageActionCreators.setTitle(title);
  });
}

function getState(params: Object, query?: Object): Object {
  return {user: UsersStore.getById(params.userId)};
}

function fetchData(params: Object, query: Object): any {
  return co(function* () {
    yield UserAPI.getUserById(params.userId);

    var name = UsersStore.getById(params.userId).get('name').toObject();

    yield getTitle(name.first);
  });
}

module.exports = FooHandler;
