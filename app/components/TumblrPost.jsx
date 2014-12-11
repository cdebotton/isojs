/** @flow */

var React = require('react');

var TumblrPhoto   = require('./TumblrPhoto.jsx');
var TumblrText    = require('./TumblrText.jsx');
var TumblrAnswer  = require('./TumblrAnswer.jsx');
var TumblrAudio   = require('./TumblrAudio.jsx');
var TumblrChat    = require('./TumblrChat.jsx');
var TumblrLink    = require('./TumblrLink.jsx');
var TumblrQuote   = require('./TumblrQuote.jsx');
var TumblrVideo   = require('./TumblrVideo.jsx');

var TumblrPost = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired
  },

  getPostTemplate(post: any): any {
    switch(post.type) {
      case 'photo': return <TumblrPhoto key={`post:${post.type}`} post={post} />;
      case 'link': return <TumblrLink key={`post:${post.type}`} post={post} />;
      default: return 'nope';
    }
  },

  render(): any {
    var {post} = this.props;
    var template: any = this.getPostTemplate(post);
    return (
      <div className="tumblr-post">
        {template}
      </div>
    );
  }
});

module.exports = TumblrPost;
