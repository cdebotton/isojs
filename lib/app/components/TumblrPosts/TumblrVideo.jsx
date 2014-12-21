/** @flow */

var React = require('react');

var TumblrVideo = React.createClass({
  propTypes: {
    post: React.PropTypes.shape({
      player: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          embed_code: React.PropTypes.string.isRequired
        })
      ).isRequired
    }).isRequired
  },

  render(): any {
    return (
      <div className="tumblr-post audio">
        <div dangerouslySetInnerHTML={{__html: this.props.post.player[2].embed_code}} />
      </div>
    );
  }
});

module.exports = TumblrVideo;
