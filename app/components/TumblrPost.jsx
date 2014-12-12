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
      case 'photo': return <TumblrPhoto key={post.id} post={post} />;
      case 'link': return <TumblrLink key={post.id} post={post} />;
      case 'answer': return <TumblrAnswer key={post.id} post={post} />;
      case 'audio': return <TumblrAudio key={post.id} post={post} />;
      case 'chat': return <TumblrChat key={post.id} post={post} />;
      case 'quote': return <TumblrQuote key={post.id} post={post} />;
      case 'text': return <TumblrText key={post.id} post={post} />;
      case 'video': return <TumblrVideo key={post.id} post={post} />;
      default: return false;
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
