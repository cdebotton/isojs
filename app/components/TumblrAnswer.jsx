/** @flow */

var React = require('react');

var TumblrAnswer = React.createClass({
  propTypes: {
    post: React.PropTypes.shape({
      asking_name: React.PropTypes.string.isRequired,
      answer: React.PropTypes.string.isRequired,
      question: React.PropTypes.string.isRequired
    }).isRequired
  },

  render(): any {
    return (
      <div className="answer">
        <h3>{this.props.post.question} &mdash; {this.props.post.asking_name}</h3>
        <div dangerouslySetInnerHTML={{__html: this.props.post.answer}} />
      </div>
    );
  }
});

module.exports = TumblrAnswer;
