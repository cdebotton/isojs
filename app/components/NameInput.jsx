/** @flow */

var React = require('react');

var NameInput = React.createClass({
  propTypes: {
    name: React.PropTypes.shape({
      first: React.PropTypes.string.isRequired,
      last: React.PropTypes.string.isRequired
    }).isRequired,
    onHandleChange: React.PropTypes.func.isRequired
  },

  getDefaultProps(): Object {
    return {onHandleChange: function() {}};
  },

  handleChange(): void {
    var first: string = this.refs.firstName.getDOMNode().value;
    var last: string = this.refs.lastName.getDOMNode().value;

    this.props.onHandleChange(first, last);
  },

  render(): any {
    return (
      <fieldset className="name-input">
        <input
          type="text"
          ref="firstName"
          placeholder="First name"
          defaultValue={this.props.name.first}
          onChange={this.handleChange} />
        <input
          type="text"
          ref="lastName"
          placeholder="Last name"
          defaultValue={this.props.name.last}
          onChange={this.handleChange} />
      </fieldset>
    );
  }
});

module.exports = NameInput;
