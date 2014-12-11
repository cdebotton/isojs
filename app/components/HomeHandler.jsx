/** @flow */

var React                 = require('react');
var Cache                 = require('../utils/Cache');
var {RouteHandler, Link}  = require('react-router');
var TumblrPost            = require('./TumblrPost.jsx');
var StoreMixin            = require('../mixins/StoreMixin');
var TumblrStore           = require('../stores/TumblrStore');
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
      var tumblrAction: string = params.postType ? params.postType : 'posts';
      var CACHE_KEY = `home:tumblr:${params.postType}`;

      if (! Cache.has(CACHE_KEY)) {
        transition.wait(
          TumblrAPI[tumblrAction]().then(function(data: any): void {
            Cache.set(CACHE_KEY, data);
          })
        );
      }
    }
  },

  renderPostData(post: any, key: number): any {
    return (
      <TumblrPost key={key} post={post} />
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
          {posts}
        </div>
      </div>
    );
  }
});

module.exports = HomeHandler;
