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
    posts: React.PropTypes.object.isRequired
  },

  getPostTemplate(post: any): any {
    var key = 'tumblr-posts-single-' + post.type + '/' + post.id;

    switch(post.type) {
      case 'photo': return <TumblrPhoto key={key} post={post} />;
      case 'link': return <TumblrLink key={key} post={post} />;
      case 'answer': return <TumblrAnswer key={key} post={post} />;
      case 'audio': return <TumblrAudio key={key} post={post} />;
      case 'chat': return <TumblrChat key={key} post={post} />;
      case 'quote': return <TumblrQuote key={key} post={post} />;
      case 'text': return <TumblrText key={key} post={post} />;
      case 'video': return <TumblrVideo key={key} post={post} />;
      default: return false;
    }
  },

  render(): any {
    var {posts} = this.props;

    return (
      <div className="tumblr-post">
        {posts.toJS().map(this.getPostTemplate)}
      </div>
    );
  }
});

module.exports = TumblrPost;
