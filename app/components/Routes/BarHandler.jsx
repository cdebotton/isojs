/** @flow */

var React                 = require('react/addons');
var co                    = require('co');
var Immutable             = require('immutable');

var AsyncDataMixin        = require('../../mixins/AsyncDataMixin');
var StoreMixin            = require('../../mixins/StoreMixin');
var {ActionTypes}         = require('../../constants/AppConstants');
var UserAPI               = require('../../utils/UserAPI');
var UserEditStore         = require('../../stores/UserEditStore');
var PageStore             = require('../../stores/PageStore');
var PageActionCreators    = require('../../actions/PageActionCreators');
var UserActionCreators    = require('../../actions/UserActionCreators');

var NameInput = require('../Common/NameInput.jsx');

var FooHandler = React.createClass({
  mixins: [StoreMixin(getState, UserEditStore), AsyncDataMixin(fetchData)],

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

  shouldComponentUpdate(): bool {
    return !Immutable.is(
      this.state.user,
      UserEditStore.getState().get('user')
    );
  },

  render(): any {
    return (
      <div className="bar-handler">
        <h2>Bar Handler</h2>

        <form
          className="bar-form"
          onSubmit={this.handleSubmit}>
          <legend>var userId = {this.state.user.get('_id')}</legend>
          <NameInput
            name={this.state.user.get('name').toObject()}
            onHandleChange={this.handleNameChange} />
          <input
            type="email"
            placeholder="Email"
            value={this.state.user.get('email')}
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
  var state = UserEditStore.getState();
  return {
    user: state.get('user'),
    status: state.get('status')
  };
}

function fetchData(params: Object, query: Object): any {
  return co(function* () {
    yield UserAPI.getUserById(params.userId);
    var name = UserEditStore.getState().getIn(['user', 'name']);
    yield getTitle(name.get('first') + ' ' + name.get('last'));
  });
}

module.exports = FooHandler;
