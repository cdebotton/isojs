/** @flow */

var React                 = require('react');
var Cache                 = require('../utils/Cache');
var {RouteHandler, Link}  = require('react-router');
var TumblrPost            = require('./TumblrPost.jsx');
var StoreMixin            = require('../mixins/StoreMixin');
var TumblrStore           = require('../stores/TumblrStore');
var TumblrAPI             = require('../utils/TumblrAPI');

var found = [];

function getState(params, query): Object {
  var {postType} = params;
  var tumblr = postType ? TumblrStore.getPostType(postType) : TumblrStore.getState();

  console.log(TumblrStore.getPostType(params.postType).toJS());
  return { tumblr: tumblr };
}

var HomeHandler = React.createClass({
  mixins: [StoreMixin(getState)],

  statics: {
    willTransitionTo(transition: Object, params: Object) {
      transition.wait(TumblrAPI[params.postType || 'posts']());
    }
  },

  componentWillReceiveProps() {
    TumblrAPI[this.getParams().postType || 'posts']();
  },

  renderPostData(post: any, key: number): any {
    return (
      <TumblrPost key={`post-${post.id}`} post={post} />
    );
  },

  render(): any {
    var tumblr = this.state.tumblr.toJS();
    var posts = tumblr.posts.map(this.renderPostData);

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
            <Link to="post" params={{postType: 'photo'}}>Photo</Link>
            <Link to="post" params={{postType: 'audio'}}>Audio</Link>
            <Link to="post" params={{postType: 'video'}}>Video</Link>
            <Link to="post" params={{postType: 'quote'}}>Quote</Link>
            <Link to="post" params={{postType: 'link'}}>Link</Link>
            <Link to="post" params={{postType: 'chat'}}>Chat</Link>
            <Link to="post" params={{postType: 'answer'}}>Answer</Link>
          </nav>
        </header>
        <div className="posts">
          {posts}
        </div>
      </div>
    );
  }
});

module.exports = HomeHandler;
