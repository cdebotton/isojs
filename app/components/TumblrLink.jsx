/** @flow */

var React = require('react');

var TumblrLink = React.createClass({
  propTypes: {
    post: React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      url: React.PropTypes.string.isRequired
    }).isRequired
  },

  render(): any {
    return (
      <div className="quote">
        <a href={this.props.post.url}>{this.props.post.title}</a>
      </div>
    );
  }
});

module.exports = TumblrLink;
