/** @flow */

var React = require('react');

var TumblrText = React.createClass({
  propTypes: {
    post: React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      body: React.PropTypes.string.isRequired
    }).isRequired
  },

  render(): any {
    return (
      <div className="text">
        <h3>{this.props.post.title}</h3>
        <div dangerouslySetInnerHTML={{__html: this.props.post.body}} />
      </div>
    );
  }
});

module.exports = TumblrText;
