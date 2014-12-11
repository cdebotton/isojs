/** @flow */

var React = require('react');

var TumblrText = React.createClass({
  propTypes: {
    post: React.PropTypes.shape({
      title: React.PropTypes.string,
      body: React.PropTypes.string.isRequired
    }).isRequired
  },

  render(): any {
    var title = this.props.post.title ? (
      <h3>{this.props.post.title}</h3>
    ) : false;
    return (
      <div className="text">
        <h3>{this.props.post.title}</h3>
        <div dangerouslySetInnerHTML={{__html: this.props.post.body}} />
      </div>
    );
  }
});

module.exports = TumblrText;
