var React                   = require('react');
var {RouteHandler, State}   = require('react-router');
var request                 = require('superagent');

var Head                = require('./Head.jsx');
var Navigation          = require('./Navigation.jsx');
var UserActionCreators  = require('../actions/UserActionCreators');
var UsersStore          = require('../stores/UsersStore');

var App = React.createClass({
  mixins: [State],

  getInitialState(): Object {
    return getState();
  },

  propTypes: {
    query: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired,
    env: React.PropTypes.string.isRequired
  },

  statics: {
    willTransitionTo(transition: Object, params: Object) {
      UserActionCreators.getUsers();
      transition.wait(UsersStore.getPending());
    }
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

  getBundle(env: string): any {
    var min = env === 'production' ? '.min' : '';

    return (
      <script src={'/bundle' + min + '.js'} />
    );
  },

  render(): any {
    var {env} = this.props;
    var Bundle = this.getBundle(env);

    console.log(this.state.users);

    return (
      <html lang="us">
      <Head env={env} />
      <body>
        <Navigation />
        <RouteHandler {...this.props} />
        {Bundle}
      </body>
      </html>
    );
  }
});

function getState(): Object {
    return {users: UsersStore.getState()};
}

module.exports = App;
