/** @flow */

var React = require('react');

var TumblrAnswer = React.createClass({
  propTypes: {

  },

  render(): any {
    console.log(this.props.post);
    return (
      <div className="answer">

      </div>
    );
  }
});

module.exports = TumblrAnswer;
