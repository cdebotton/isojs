/** @flow */

var React = require('react');

var TumblrQuote = React.createClass({
  propTypes: {
    post: React.PropTypes.shape({
      text: React.PropTypes.string.isRequired
    }).isRequired
  },

  render(): any {
    return (
      <div className="quote">
        <h4 dangerouslySetInnerHTML={{__html: this.props.post.text}} />
      </div>
    );
  }
});

module.exports = TumblrQuote;
