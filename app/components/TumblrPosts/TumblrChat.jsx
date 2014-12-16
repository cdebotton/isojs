/** @flow */

var React = require('react');

var TumblrChat = React.createClass({
  propTypes: {
    post: React.PropTypes.shape({
      dialogue: React.PropTypes.array.isRequired
    }).isRequired
  },

  renderDialogue(dialogue, key): any {
    var key = `dialogue-item-${key}`;

    return (
      <dl key={key}>
        <dt>{dialogue.label}</dt>
        <dd>{dialogue.phrase}</dd>
      </dl>
    );
  },

  render(): any {
    return (
      <div className="tumblr-post chat">
        {this.props.post.dialogue.map(this.renderDialogue)}
      </div>
    );
  }
});

module.exports = TumblrChat;
