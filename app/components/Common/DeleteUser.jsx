/** @flow */

var React = require('react');
var UserActionCreators = require('../../actions/UserActionCreators');

var DeleteUser = React.createClass({
  propTypes: {
    userId: React.PropTypes.string.isRequired
  },

  onClick(event: Object): void {
    event.preventDefault();
    UserActionCreators.destroyUser(this.props.userId);
  },

  render(): any {
    var {className, ...rest} = this.props;

    return (
      <button
        type="button"
        className="delete-user"
        onClick={this.onClick} rest>
        Delete
      </button>
    );
  }
});

module.exports = DeleteUser;
