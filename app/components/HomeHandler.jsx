/** @flow */

var React                 = require('react');
var Cache                 = require('../utils/Cache');
var {RouteHandler, Link}  = require('react-router');
var StoreMixin            = require('../mixins/StoreMixin');
var TumblrStore           = require('../stores/TumblrStore');
var TumblrPhoto           = require('./TumblrPhoto.jsx');
var TumblrText            = require('./TumblrText.jsx');
var TumblrAnswer          = require('./TumblrAnswer.jsx');
var TumblrAudio           = require('./TumblrAudio.jsx');
var TumblrChat            = require('./TumblrChat.jsx');
var TumblrLink            = require('./TumblrLink.jsx');
var TumblrQuote           = require('./TumblrQuote.jsx');
var TumblrVideo           = require('./TumblrVideo.jsx');
var TumblrAPI             = require('../utils/TumblrAPI');

function getState(params, query): Object {
  var {postType} = params;
  var tumblr = postType ? TumblrStore.getPostType(postType) : TumblrStore.getState();

  return { tumblr: tumblr };
}

var HomeHandler = React.createClass({
  mixins: [StoreMixin(getState)],

  statics: {
    willTransitionTo(transition: Object, params: Object) {
      var {postType} = params;
      var tumblrAction: string = postType ? postType : 'posts';
      transition.wait(TumblrAPI[tumblrAction]());
    }
  },

  renderPostData(post: any): any {
    return (function(post) {
      var key: string = `${post.type}:${post.id}`;
      switch(post.type) {
        case 'photo': return <TumblrPhoto key={key} post={post} />
        case 'text': return <TumblrText key={key} post={post} />
        case 'answer': return <TumblrAnswer key={key} post={post} />
        case 'audio': return <TumblrAudio key={key} post={post} />
        case 'chat': return <TumblrChat key={key} post={post} />
        case 'link': return <TumblrLink key={key} post={post} />
        case 'quote': return <TumblrQuote key={key} post={post} />
        case 'video': return <TumblrVideo key={key} post={post} />
      }
    })(post);
  },

  render(): any {
    var tumblr = this.state.tumblr.toJS();

    return (
      <div className="home-handler">
        <header>
          <h2>{tumblr.blog.title}</h2>
          <p>{tumblr.blog.description}</p>
          <dl>
            <dt>Posts</dt>
            <dd>{tumblr.blog.posts}</dd>
            <dt>Likes</dt>
            <dd>{tumblr.blog.likes}</dd>
          </dl>
          <nav>
            <Link to="index">All</Link>
            <Link to="posts" params={{postType: 'photo'}}>Photo</Link>
            <Link to="posts" params={{postType: 'audio'}}>Audio</Link>
            <Link to="posts" params={{postType: 'video'}}>Video</Link>
            <Link to="posts" params={{postType: 'quote'}}>Quote</Link>
            <Link to="posts" params={{postType: 'link'}}>Link</Link>
            <Link to="posts" params={{postType: 'chat'}}>Chat</Link>
            <Link to="posts" params={{postType: 'answer'}}>Answer</Link>
          </nav>
        </header>
        <div className="posts">
          {tumblr.posts.map(this.renderPostData)}
        </div>
      </div>
    );
  }
});

module.exports = HomeHandler;
