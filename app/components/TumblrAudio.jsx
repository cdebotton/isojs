/** @flow */

var React = require('react');

var TumblrAudio = React.createClass({
  propTypes: {
    post: React.PropTypes.shape({
      player: React.PropTypes.string.isRequired
    }).isRequired
  },

  render(): any {
    return (
      <div className="audio">
        <div dangerouslySetInnerHTML={{__html: this.props.post.player}} />
      </div>
    );
  }
});

module.exports = TumblrAudio;
